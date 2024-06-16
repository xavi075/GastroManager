// pages/api/liniesMenu/add.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const { idComanda, idMenu, idPrimerPlat, idSegonPlat, idPostres } = req.body;
            const createdLiniaMenu = await prisma.liniaMenu.create({
                data: {
                    idComanda: Number(idComanda),
                    idMenu: Number(idMenu),
                    idPrimerPlat: Number(idPrimerPlat),
                    idSegonPlat: Number(idSegonPlat),
                    idPostres: Number(idPostres),
                }
            });
            res.status(200).json(createdLiniaMenu);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}