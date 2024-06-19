// pages/api/plats/add.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { idRestaurant, nomPlat, preu, idGrup } = req.body;

    if (!idRestaurant || !nomPlat || !preu || !idGrup) {
        return res.status(400).json({ error: 'Missing idRestaurant, nomPlat, preu or idGrup' });
    }

    try {
        const newPlat = await prisma.plat.create({
            data: {
                nom: nomPlat,
                preu: preu,
                // idGrup: idGrup,
                grupPlat: {
                    connect: { id: idGrup },
                },
            },
        });
        res.status(201).json(newPlat);
    } catch (error) {
        console.error('Error adding plat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
