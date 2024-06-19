import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const { idRestaurant, idMenu } = req.query;
            if (idRestaurant) {
                if (idMenu) {
                    const menu = await prisma.menu.findUnique({
                        where: {
                            id: Number(idMenu),
                            idRestaurant: Number(idRestaurant),
                        },
                        include: {
                            grupPlat_menu_idGrupPrimerPlatTogrupPlat: {
                                include: {
                                    plat: true,
                                }
                            },
                            grupPlat_menu_idGrupSegonPlatTogrupPlat: {
                                include: {
                                    plat: true,
                                }
                            },
                            grupPlat_menu_idGrupPostresTogrupPlat: {
                                include: {
                                    plat: true,
                                }
                            },
                        },
                    });
                    res.status(200).json(menu);
                    return;
                } else {
                    const grupsPlats = await prisma.menu.findMany({
                        where: {
                            idRestaurant: Number(idRestaurant),
                        },
                        include: {
                            grupPlat_menu_idGrupPrimerPlatTogrupPlat: {
                                include: {
                                    plat: true,
                                }
                            },
                            grupPlat_menu_idGrupSegonPlatTogrupPlat: {
                                include: {
                                    plat: true,
                                }
                            },
                            grupPlat_menu_idGrupPostresTogrupPlat: {
                                include: {
                                    plat: true,
                                }
                            },
                        },
                    });
                    res.status(200).json(grupsPlats);
                    return;
                }
            } 
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}