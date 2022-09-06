import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, TextChannel } from "discord.js";
import { APIActionRowComponent, APIMessageActionRowComponent, APITextInputComponent, GatewayIntentBits } from 'discord-api-types/v10';
import { NextApiRequest, NextApiResponse } from "next";

export default async function name(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);

  const channelId = body['channelId'].trim();

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  await client.login(process.env.BOT_TOKEN);

  console.debug('Creating button');

  const button = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
          .setCustomId('registerButton')
          .setLabel('Register')
          .setEmoji('✅')
          .setStyle(ButtonStyle.Primary),
    );
  
  console.debug('Send button');

  let test = await (client.channels.cache.get(channelId) as TextChannel)
    .send({ content: 'Click here!', components: [button] });

  console.debug(test);

  res.status(200).json({ status: test });
}