// pages/api/liniesMenu/get.js
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const { idComanda } = req.query;
            if (idComanda) {
                const liniesMenu = await prisma.liniaMenu.findMany({
                    where: {
                        idComanda: Number(idComanda)
                    },
                    include: {
                        menu: true,
                        plat_liniaMenu_idPrimerPlatToplat: true,
                        plat_liniaMenu_idSegonPlatToplat: true,
                        plat_liniaMenu_idPostresToplat: true,
                    }
                });
                res.status(200).json(liniesMenu);
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