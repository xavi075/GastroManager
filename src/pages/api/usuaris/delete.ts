// pages/api/usuaris/delete.js
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
            const deletedUsuari = await prisma.usuari.delete({
                where: {
                    id: Number(id),
                },
            });
            res.status(200).json(deletedUsuari);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}