// pages/api/rols/update.ts
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
            const { nomRol } = req.body;
            const updatedRol = await prisma.rol.update({
                where: {
                    id: Number(id),
                },
                data: {
                    nomRol,
                },
            });
            res.status(200).json(updatedRol);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}