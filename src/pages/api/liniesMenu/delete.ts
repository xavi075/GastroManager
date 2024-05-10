// pages/api/liniesMenu/delete.js
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
            const deletedLiniaMenu = await prisma.liniaMenu.deleteMany({
                where: {
                    id,
                },
            });
            res.status(200).json(deletedLiniaMenu);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}