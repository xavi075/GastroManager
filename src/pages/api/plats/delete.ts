import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { idPlat } = req.body;

  if (!idPlat) {
    return res.status(400).json({ message: 'idPlat is required' });
  }

  try {
    // Desasociar el grupo del plat sin eliminar el plat
    const updatedPlat = await prisma.plat.update({
      where: { id: idPlat },
      data: {
        idGrup: null,
      },
    });

    res.status(200).json(updatedPlat);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while disassociating the grup from the plat', details: error });
  } finally {
    await prisma.$disconnect();
  }
}
