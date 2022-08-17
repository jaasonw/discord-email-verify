import {
  InteractionResponseFlags,
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";
import type { NextApiRequest, NextApiResponse } from "next";

const REGISTER_COMMAND = {
  name: "register",
  description: "Get a registration link to register for the club",
};

type Data = {
  type: InteractionResponseType;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const signature = req.headers["x-signature-ed25519"] as string;
    const timestamp = req.headers["x-signature-timestamp"] as string;
    const rawBody = JSON.stringify(req.body);
    const isValidRequest = verifyKey(
      rawBody,
      signature,
      timestamp,
      process.env.DISCORD_TOKEN ?? ""
    );
    if (!isValidRequest) {
      return res.status(401).end("Bad request signature");
    }
    const message = req.body;
    // ACK pings from Discord
    if (message.type === InteractionType.PING) {
      console.log("Handling Ping request");
      res.send({
        type: InteractionResponseType.PONG,
        data: {},
      });
    } else if (message.type == InteractionType.APPLICATION_COMMAND) {
      switch (message.data.name.toLowerCase()) {
        case REGISTER_COMMAND.name.toLowerCase():
          console.log("Handling register command");
          res.status(200).send({
            type: InteractionResponseType.APPLICATION_MODAL,
            data: {
              title: "Register for access to the server!",
              custom_id: "registration_modal",
              components: [
                {
                  type: 1,
                  components: [
                    {
                      type: 4,
                      custom_id: "first_name",
                      label: "First Name",
                      style: 1,
                      min_length: 1,
                      max_length: 4000,
                      placeholder: "frank",
                      required: true,
                    },
                  ],
                },
                {
                  type: 1,
                  components: [
                    {
                      type: 4,
                      custom_id: "last_name",
                      label: "Last Name",
                      style: 1,
                      min_length: 1,
                      max_length: 4000,
                      placeholder: "Bot",
                      required: true,
                    },
                  ],
                },
                {
                  type: 1,
                  components: [
                    {
                      type: 4,
                      custom_id: "email",
                      label: "CSUF Email",
                      style: 1,
                      min_length: 1,
                      max_length: 4000,
                      placeholder: "frankBot@csu.fullerton.edu",
                      required: true,
                    },
                  ],
                },
                {
                  type: 1,
                  components: [
                    {
                      type: 4,
                      custom_id: "pronouns",
                      label: "Preferred Pronouns",
                      style: 1,
                      min_length: 1,
                      max_length: 4000,
                      placeholder: "They/Them",
                      required: false,
                    },
                  ],
                },
              ],
            },
          });
          break;
      }
    } else if (message.type == InteractionType.APPLICATION_MODAL_SUBMIT) {
      // Handle modal responses
      console.debug(message);
      console.debug(message.data.components[0]);
      switch (message.data.custom_id) {
        case "registration_modal":
          const firstName = message.data.components[0].components[0].value;
          const lastName = message.data.components[1].components[0].value;
          const email = message.data.components[2].components[0].value;
          const pronouns = message.data.components[3].components[0].value;
          console.debug(`First Name: ${firstName}`);
          console.debug(`Last Name: ${lastName}`);
          console.debug(`Email: ${email}`);
          console.debug(`Pronouns: ${pronouns}`);

          res.status(200).send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `
                First name: ${firstName}
                Last name: ${lastName}
                Email: ${email}
                Pronouns: ${pronouns}
              `,
              flags: InteractionResponseFlags.EPHEMERAL,
            },
          });
          break;
      }
    }
  } else {
    return res.status(405).end("Method not allowed");
  }
}

export const config = {
  runtime: "experimental-edge",
};
