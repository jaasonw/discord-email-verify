import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await prisma.user.findMany({ take: 1 });
  } catch (error) {
    res.status(500).json({ status: 'NOT OK' });
  }
  return res.status(200).json({ status: 'OK' });
}
