// pages/api/grupplats/update.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { idGrup, nomGrup } = req.body;

    if (!idGrup || !nomGrup) {
        return res.status(400).json({ error: 'Missing idGrup or nomGrup' });
    }

    try {
        const updatedGrup = await prisma.grupPlat.update({
            where: { id: Number(idGrup) },
            data: { nomGrup: nomGrup },
        });
        res.status(200).json(updatedGrup);
    } catch (error) {
        console.error('Error updating grupPlat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
