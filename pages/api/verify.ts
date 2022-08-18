import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
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
    const url = `https://discord.com/api/v10/guilds/${process.env.GUILD_ID}/members/${user}`;
    await axios.patch(url, {
      nick: `${user?.firstName} ${user?.lastName} (${user?.pronouns})`,
      roles: [process.env.VERIFICATION_ROLE],
    });
  } catch (error) {
    console.error(`Failed to verify UUID: ${req.query["verificationCode"]}`);
    console.error(`Error: ${error}`);
    console.debug(`Request query: ${JSON.stringify(req.query)}`);
    let base64 = Buffer.from(
      JSON.stringify({ query: req.query, error: error })
    ).toString("base64");
    res.redirect(`/error?code=${base64}`);
  }
  res.redirect("/success");
}
