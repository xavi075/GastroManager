import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { idGrup } = req.body;

  if (!idGrup) {
    return res.status(400).json({ message: 'idGrup is required' });
  }

  try {
    await prisma.plat.updateMany({
      where: { idGrup },
      data: { idGrup: null },
    });

    await prisma.menu.updateMany({
      where: {
        OR: [
          { idGrupPrimerPlat: idGrup },
          { idGrupSegonPlat: idGrup },
          { idGrupPostres: idGrup },
        ],
      },
      data: {
        idGrupPrimerPlat: { set: null },
        idGrupSegonPlat: { set: null },
        idGrupPostres: { set: null },
      },
    });

    const deletedGrup = await prisma.grupPlat.delete({
      where: { id: idGrup },
    });

    res.status(200).json(deletedGrup);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the grupPlat', details: error });
  } finally {
    await prisma.$disconnect();
  }
}
