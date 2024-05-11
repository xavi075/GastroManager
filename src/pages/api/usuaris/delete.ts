import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "DELETE") {
        try {
            const { id } = req.query; // Usamos req.query para obtener los parámetros de la URL
            const deletedUser = await prisma.usuari.delete({ // Usamos prisma.usuari en lugar de prisma.rol
                where: {
                    id: Number(id),
                },
            });
            res.status(200).json(deletedUser);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
