import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";
import type { NextApiRequest, NextApiResponse } from "next";
import getRawBody from "raw-body";

const REGISTER_COMMAND = {
  name: "Register",
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
    const signature = req.headers["X-Signature-Ed25519"] as string;
    const timestamp = req.headers["X-Signature-Timestamp"] as string;
    const rawBody = await getRawBody(req);
    const isValidRequest = verifyKey(
      req.body,
      signature,
      timestamp,
      process.env.DISCORD_TOKEN ?? ""
    );
    if (!isValidRequest) {
      return res.status(401).end("Bad request signature");
    }
    // const { type, data } = req.body;
    const message = req.body;
    /**
     * Handle slash command requests
     */
    if (message.type == InteractionType.APPLICATION_COMMAND) {
      switch (message.data.name.toLowerCase()) {
        case REGISTER_COMMAND.name.toLowerCase():
          res.status(200).send({
            type: 4,
            data: {
              content: "Hello!",
            },
          });
          console.log("Ping command");
          break;
      }
    }
  } else {
    // Handle any other HTTP method
  }
}
