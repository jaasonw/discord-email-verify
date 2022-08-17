import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { ephemeralMessageReply } from "../../lib/message";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const url = `https://discord.com/api/v10/interactions/${req.body["interactionId"]}/${req.body["interactionToken"]}/callback`;
  const prisma = new PrismaClient();

  await prisma.user.create({
    data: {
      id: req.body["id"],
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
      email: req.body["email"],
      discordUser: req.body["discordUser"],
      pronouns: req.body["pronouns"],
    },
  });
  axios.patch(url, ephemeralMessageReply("Created entry in db"));
}
