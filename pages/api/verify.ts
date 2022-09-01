// import { PrismaClient } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { Client, GatewayIntentBits } from 'discord.js';
import { NextApiRequest, NextApiResponse } from 'next';
import makeNickname from '../../lib/makeNickName';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const prisma = new PrismaClient();
  const discord = new Client({ intents: [GatewayIntentBits.Guilds] });
  await discord.login(process.env.BOT_TOKEN);
  discord.user?.setStatus('invisible');
  const code: string = (req.query['verificationCode'] as string) ?? '';

  try {
    const user = await prisma.user.findFirst({
      where: {
        verificationCode: code,
      },
    });

    if (!user) throw 'Invalid or expired token';
    await prisma.user.updateMany({
      where: {
        verificationCode: code,
      },
      data: {
        verificationCode: 'verified',
      },
    });

    const guild = await discord.guilds.fetch(process.env.GUILD_ID ?? '');
    const role = await guild.roles.fetch(process.env.VERIFICATION_ROLE ?? '');
    const member = await guild.members.fetch(user?.id ?? '');
    // check if user already has role
    if (role) {
      if (member.roles.cache.some((role) => role.id == process.env.GUILD_ID))
        await member.roles.add(role);
    }
    const nickName = makeNickname(user.firstName, user.lastName, user.pronouns);
    await member.setNickname(nickName);
  } catch (error) {
    console.error(`Failed to verify UUID: ${req.query['verificationCode']}`);
    console.error(`Error: ${JSON.stringify(error)}`);
    console.debug(`Request query: ${JSON.stringify(req.query)}`);
    let base64 = Buffer.from(
      JSON.stringify({ query: req.query, error: error })
    ).toString('base64');
    return res.redirect(`/error?code=${base64}`);
  } finally {
    discord.destroy();
  }
  return res.redirect('/success');
}
