// pages/api/liniesComanda/update.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT") {
        try {
            const { id } = req.query;
            const { novaQuantitat } = req.body;
            const updatedLiniaComanda = await prisma.liniaComanda.update({
                where: {
                    id: Number(id),
                },
                data: {
                    quantitat: Number(novaQuantitat),
                },
            });
            res.status(200).json(updatedLiniaComanda);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}