// pages/api/liniesComanda/delete.js
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "DELETE") {
        try {
            const { id } = req.body;
            const deletedLiniaComanda = await prisma.liniaComanda.deleteMany({
                where: {
                    id,
                },
            });
            res.status(200).json(deletedLiniaComanda);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}