import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, GatewayIntentBits, TextChannel } from "discord.js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function name(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body);

  const channelId = body['channelId'].trim();
  const buttonMessage = body['message']?.trim() ?? "";

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  await client.login(process.env.BOT_TOKEN);

  console.debug('Creating button');

  const button = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
          .setCustomId('registration_modal')
          .setLabel('Register')
          .setEmoji('✅')
          .setStyle(ButtonStyle.Primary),
    );
  
  await client.guilds.fetch();
  const channel = client.channels.cache.get(channelId) as TextChannel;
  let message = await channel.send({
    content: buttonMessage,
    components: [button],
  });

  res.status(200).json({ status: message });
}