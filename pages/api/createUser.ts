import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import * as EmailValidator from "email-validator";
import { randomUUID } from "crypto";
const Filter = require("bad-words");

async function sendResponse(token: string, message: string) {
  const url = `https://discord.com/api/v10/webhooks/${process.env.APPLICATION_ID}/${token}/messages/@original`;
  await axios.patch(url, { content: message });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  console.debug(body);

  // Check if this is a valid request from ourself first
  if (body["botToken"] != process.env.DISCORD_TOKEN)
    return res.status(401).json({ status: "Unauthorized" });

  console.info("Handling user registration request");
  const prisma = new PrismaClient();

  const id = body["id"].trim();
  const firstName = body["firstName"].trim();
  const lastName = body["lastName"].trim();
  const email = body["email"].trim();
  const discordUser = body["discordUser"].trim();
  const pronouns = body["pronouns"].trim();

  const token = body["interactionToken"];

  // Valid email check
  const validEmail = EmailValidator.validate(body.email);
  if (!validEmail || !body.email.endsWith("fullerton.edu")) {
    const message = `Invalid CSUF email: ${email}`;
    console.error(message);
    await sendResponse(token, message);
    return res.status(400).json({ status: `Bad Request` });
  }

  // Existing discord user check
  const userExists = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  if (userExists) {
    const message = `Discord user with ID: ${id} appears to already be registered, check your email for a verification link or contact an administrator if you believe this is a mistake`;
    console.error(message);
    await sendResponse(token, message);
    return res.status(400).json({ status: `Bad Request` });
  }

  // Existing CSUF email check
  const emailExists = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (emailExists) {
    const message = `Email: ${email} appears to be already registered, check your email for a verification link or contact an administrator if you believe this is a mistake`;
    console.error(message);
    console.debug(`Email ${email} is currently mapped to ${emailExists.id}`);
    await sendResponse(token, message);
    return res.status(400).json({ status: `Bad Request` });
  }

  // Profanity check
  const fullName = `${firstName} ${lastName} ${pronouns}`;
  const filter = new Filter();
  if (filter.clean(fullName) != fullName) {
    const message = `Profanity isnt allowed in your name, contact an administrator if you believe this is a mistake`;
    console.error(message);
    console.debug(`Profanity detected in: ${fullName}`);
    await sendResponse(token, message);
    return res.status(400).json({ status: `Bad Request` });
  }

  // Everything looks good now, go ahead and send the email
  const verificationCode = randomUUID();
  await prisma.user.create({
    data: {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      discordUser: discordUser,
      pronouns: pronouns,
      verificationCode: verificationCode,
    },
  });
  const message = `I've sent an email to ${email} with a verification link. It doesn't expire but it can only be used once. Check your email to complete the verification process DEBUG: ${verificationCode}`;
  sendResponse(token, message);

  res.status(200).json({ status: "OK" });
}
