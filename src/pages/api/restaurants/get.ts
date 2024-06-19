import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.query;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid email parameter' });
  }

  try {
    const user = await prisma.usuari.findUnique({
      where: { email: email },
      include: { restaurant: true },
    });

    if (!user || !user.restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const { id, nom } = user.restaurant;
    return res.status(200).json({ id, nom });

  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
