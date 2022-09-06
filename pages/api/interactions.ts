import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions';
import { ButtonBuilder } from 'discord.js';
import { NextRequest } from 'next/server';
import { ephemeralMessageReply, loadingMessage } from '../../lib/message';
import { ModalBuilder, TextInputBuilder } from '../../lib/modal';

const REGISTER_COMMAND = {
  name: 'register',
  description: 'Get a registration link to register for the club',
};

const CONFIGURE_COMMAND = {
  name: 'configure',
  description: 'Set bot channel',
};

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return send(405, 'Method not allowed');
  }
  
  const signature = req.headers.get('x-signature-ed25519') ?? '';
  const timestamp = req.headers.get('x-signature-timestamp') ?? '';
  const body = await req.clone().arrayBuffer();
  console.log(body);
  const isValidRequest = verifyKey(
    body,
    signature,
    timestamp,
    process.env.DISCORD_TOKEN ?? ''
  );
  if (!isValidRequest) {
    console.error('Bad request signature');
    return new Response('Bad request signature', { status: 401 });
  }
  const message = JSON.parse(await req.text());
  console.log(message);
  // ACK pings from Discord
  if (message.type === InteractionType.PING) {
    console.log('Handling Ping request');
    return send(200, {
      type: InteractionResponseType.PONG,
    });
  }
  
  if (message.type == InteractionType.APPLICATION_COMMAND) {
    switch (message.data.name.toLowerCase()) {
      case REGISTER_COMMAND.name.toLowerCase():
        console.log('Handling register command');
        return send(
          200,
          new ModalBuilder()
            .setCustomId('registration_modal')
            .setTitle('Register for access to the server!')
            .addComponent(
              new TextInputBuilder()
                .setCustomId('first_name')
                .setLabel('First Name')
                .setMinLength(2)
                .setMaxLength(32)
                .setPlaceholder('frank')
                .setRequired(true)
            )
            .addComponent(
              new TextInputBuilder()
                .setCustomId('last_name')
                .setLabel('Last Name')
                .setMinLength(2)
                .setMaxLength(32)
                .setPlaceholder('Bot')
                .setRequired(true)
            )
            .addComponent(
              new TextInputBuilder()
                .setCustomId('email')
                .setLabel('CSUF Email')
                .setMinLength(2)
                .setMaxLength(320)
                .setPlaceholder('frankBot@csu.fullerton.edu')
                .setRequired(true)
            )
            .addComponent(
              new TextInputBuilder()
                .setCustomId('pronouns')
                .setLabel('Preferred Pronouns')
                .setMinLength(2)
                .setPlaceholder('He/Him, She/Her, They/Them, etc')
                .setRequired(false)
            )
        );
      case CONFIGURE_COMMAND.name.toLowerCase():
        const url = `${process.env.DEPLOYMENT_URL}/api/sendButton`;
        const channelId = message.data.components[0].components[0].value;

        fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            channelId: channelId
          }),
        });
        return send(200, loadingMessage());
    }
  }

  if (message.type == InteractionType.APPLICATION_MODAL_SUBMIT) {
    // Handle modal responses
    console.info(message);
    console.info(message.data.components[0]);
    const url = `${process.env.DEPLOYMENT_URL}/api/createUser`;
    const firstName = message.data.components[0].components[0].value;
    const lastName = message.data.components[1].components[0].value;
    const email = message.data.components[2].components[0].value;
    const pronouns = message.data.components[3].components[0].value;
    console.info(`First Name: ${firstName}`);
    console.info(`Last Name: ${lastName}`);
    console.info(`Email: ${email}`);
    console.info(`Pronouns: ${pronouns}`);
    console.info(`URL: ${url}`);

    // const validEmail = EmailValidator.validate(email);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        botToken: process.env.DISCORD_TOKEN,
        interactionId: message.id,
        interactionToken: message.token,
        id: message.member.user.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        discordUser: `${message.member.user.username}#${message.member.user.discriminator}`,
        pronouns: pronouns,
      }),
    });
    return send(200, loadingMessage());
  }

  return send(400, 'Invalid request');
}

function send(statusCode: number, body: Object) {
  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: {
      'content-type': 'application/json',
    },
  });
}

export const config = {
  runtime: 'experimental-edge',
};
