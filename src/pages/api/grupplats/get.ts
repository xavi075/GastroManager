// pages/api/grupPlats/get.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const { idRestaurant } = req.query;
            if (idRestaurant) {
                const grupsPlats = await prisma.grupPlat.findMany({
                    where: {
                        idRestaurant: Number(idRestaurant),
                    },
                    include: {
                        plat: true,
                    },
                });
                res.status(200).json(grupsPlats);
                return;
            } 
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}