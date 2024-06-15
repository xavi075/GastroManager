// pages/api/liniesComanda/add.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const { idComanda, idPlat, quantitat } = req.body;
            const createdLiniaComanda = await prisma.liniaComanda.create({
                data: {
                    idComanda: Number(idComanda),
                    idPlat: Number(idPlat),
                    quantitat: Number(quantitat),
                }
            });
            res.status(200).json(createdLiniaComanda);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}