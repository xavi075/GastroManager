import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { idMenu } = req.body;

  if (!idMenu) {
    return res.status(400).json({ message: 'idMenu is required' });
  }

  try {
    // Desasociar los grups del menú
    await prisma.menu.update({
      where: { id: idMenu },
      data: {
        idGrupPrimerPlat: null,
        idGrupSegonPlat: null,
        idGrupPostres: null,
      },
    });

    // Eliminar el menú
    const deletedMenu = await prisma.menu.delete({
      where: { id: idMenu },
    });

    res.status(200).json(deletedMenu);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the menu', details: error });
  } finally {
    await prisma.$disconnect();
  }
}
