// pages/api/grupPlats/get.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const { idRestaurant } = req.query;
            const { idGrup } = req.query;
            console.log("Id Restaurant", idRestaurant, " idGrup", idGrup)
            
            if (idRestaurant) {
                let grupsPlats;
                if (idGrup) {
                    grupsPlats = await prisma.grupPlat.findUnique({
                        where: {
                            id: Number(idGrup),
                            idRestaurant: Number(idRestaurant),
                        },
                        include: {
                            plat: true,
                        },
                    });
                } else {
                    grupsPlats = await prisma.grupPlat.findMany({
                        where: {
                            idRestaurant: Number(idRestaurant),
                        },
                        include: {
                            plat: true,
                        },
                    });
                }
              } else if (idRestaurant && idGrup != undefined && idGrup != null) {
                console.log("Obtenir un sol grup")
                const grupPlat = await prisma.grupPlat.findMany({
                    where: {
                        // idRestaurant: Number(idRestaurant),
                        id: Number(idGrup),
                    },
                    include: {
                        plat: true,
                    },
                });
                res.status(200).json(grupPlat);
                return;
              } else if (idRestaurant) {
                  console.log("Obtenir tots els grups")
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
            } else {
                res.status(405).json({ error: "Method not allowed" });
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}