import { PrismaClient } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { Client, GatewayIntentBits } from "discord.js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const discord = new Client({ intents: [GatewayIntentBits.Guilds] });
  await discord.login(process.env.BOT_TOKEN);
  const code: string = (req.query["verificationCode"] as string) ?? "";
  try {
    const user = await prisma.user.findFirst({
      where: {
        verificationCode: code,
      },
    });
    await prisma.user.updateMany({
      where: {
        verificationCode: code,
      },
      data: {
        verificationCode: "verified",
      },
    });
    discord.guilds.cache
      .get(process.env.GUILD_ID ?? "")
      ?.members.cache.get(user?.id ?? "")
      ?.roles.add(process.env.VERIFICATION_ROLE ?? "");

    // const url = `https://discord.com/api/v10/guilds/${process.env.GUILD_ID}/members/${user}`;
    // await axios.patch(
    //   url,
    //   {
    //     nick: `${user?.firstName} ${user?.lastName} (${user?.pronouns})`,
    //     roles: [process.env.VERIFICATION_ROLE],
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bot ${process.env.BOT_TOKEN}`,
    //     },
    //   }
    // );
  } catch (error) {
    console.error(`Failed to verify UUID: ${req.query["verificationCode"]}`);
    console.error(`Error: ${JSON.stringify(error)}`);
    console.debug(`Request query: ${JSON.stringify(req.query)}`);
    let base64 = Buffer.from(
      JSON.stringify({ query: req.query, error: error })
    ).toString("base64");
    return res.redirect(`/error?code=${base64}`);
  }
  return res.redirect("/success");
}
