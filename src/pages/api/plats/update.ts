// pages/api/plats/update.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { idRestaurant, idPlat, nomPlat, preu, idGrup } = req.body;

    if (!idRestaurant || !idPlat || !nomPlat || preu === undefined || !idGrup) {
      res.status(400).json({ error: 'Todos los campos son requeridos' });
      return;
    }

    try {
      const updatedPlat = await prisma.plat.update({
        where: { id: idPlat },
        data: {
          nom: nomPlat,
          preu: preu,
          idGrup: idGrup,
        },
      });

      res.status(200).json(updatedPlat);
    } catch (error) {
      console.error('Error updating plat:', error);
      res.status(500).json({ error: 'Failed to update plat' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
