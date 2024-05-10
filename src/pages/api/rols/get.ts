// pages/api/rols/get.js
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        try {
            const { id } = req.query;
            if (id) {
                const rol = await prisma.rol.findUnique({
                    where: {
                        id: Number(id),
                    },
                });
                res.status(200).json(rol);
                return;
            } else {
                const roles = await prisma.rol.findMany();
                res.status(200).json(roles);
                return;
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
