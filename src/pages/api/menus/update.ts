// pages/api/grupplats/update.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { idMenu, nomMenu, preu, primers, segons, postres } = req.body;

    if (!idMenu || !nomMenu || !preu || !primers || !segons || !postres) {
        return res.status(400).json({ error: 'Missing idGrup or nomGrup' });
    }

    try {
        const updatedMenu = await prisma.menu.update({
            where: { id: Number(idMenu) },
            data: { preu: preu,
                    nom: nomMenu,
                    idGrupPrimerPlat: { set: primers },
                    idGrupSegonPlat: { set: segons },
                    idGrupPostres: { set: postres }
             },
        });
        res.status(200).json(updatedMenu);
    } catch (error) {
        console.error('Error updating menu:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
