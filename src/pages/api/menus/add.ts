// pages/api/grupplats/add.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { idRestaurant, nomMenu, preu, primers, segons, postres } = req.body;

    if (!idRestaurant || !nomMenu || !preu || !primers || !segons || !postres) {
      res.status(400).json({ error: 'idRestaurant,  nomMenu and preu are required' });
      return;
    }

    try {
      const newMenu = await prisma.menu.create({
        data: {
          nom: nomMenu,
          preu: preu,
          idRestaurant: idRestaurant,
          idGrupPrimerPlat: primers,
          idGrupSegonPlat: segons,
          idGrupPostres: postres
        },
      });

      res.status(200).json(newMenu);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create Menu' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
