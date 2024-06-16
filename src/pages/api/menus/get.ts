import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const { idRestaurant } = req.query;
            const { idMenu } = req.query;
            if (idMenu) {
                const menu = await prisma.menu.findMany({
                    where: {
                        id: Number(idMenu),
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
            } else if (idRestaurant) {
                const menus = await prisma.menu.findMany({
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
                res.status(200).json(menus);
                return;
            } else {
                res.status(405).json({ error: "Method not allowed" });
                return;
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}