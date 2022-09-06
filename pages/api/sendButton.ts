import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, GatewayIntentBits, TextChannel } from "discord.js";
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
  
  await client.guilds.fetch();
  const channel = client.channels.cache.get(channelId) as TextChannel;
  
  let test = await channel.send({ content: 'Click here!', components: [button] });

  console.debug(test);

  res.status(200).json({ status: test });
}