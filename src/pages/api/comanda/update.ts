// pages/api/comanda/update.ts
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
            const updatedComanda = await prisma.comanda.update({
                where: {
                    id: Number(id),
                },
                data: {
                    pagat: true,
                    dataFi: new Date(),
                },
            });
            res.status(200).json(updatedComanda);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}