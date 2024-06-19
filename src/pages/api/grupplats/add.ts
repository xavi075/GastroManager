// pages/api/grupplats/add.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idRestaurant, nomGrup } = req.body;

    if (!idRestaurant || !nomGrup) {
      res.status(400).json({ error: 'idRestaurant and nomGrup are required' });
      return;
    }

    try {
      const newGrupPlat = await prisma.grupPlat.create({
        data: {
          nomGrup: nomGrup,
          idRestaurant: idRestaurant,
        },
      });

      res.status(200).json(newGrupPlat);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create GrupPlat' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
