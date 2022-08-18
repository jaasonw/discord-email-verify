import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { ephemeralMessageReply } from "../../lib/message";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  console.log(body);
  const url = `https://discord.com/api/v10/interactions/${req.body["interactionId"]}/${req.body["interactionToken"]}/@original`;
  const prisma = new PrismaClient();

  await prisma.user.create({
    data: {
      id: body["id"],
      firstName: body["firstName"],
      lastName: body["lastName"],
      email: body["email"],
      discordUser: body["discordUser"],
      pronouns: body["pronouns"],
    },
  });
  await axios.patch(url, ephemeralMessageReply("Created entry in db"));
  res.status(200);
}
