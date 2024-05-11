import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const { email, nom, contrasenya_hash, dataCreacioUsuari, idRol, idRestaurant } = req.body;
            const nuevoUsuario = await prisma.usuari.create({
                data: {
                    email,
                    nom,
                    contrasenya_hash,
                    dataCreacioUsuari,
                    idRol,
                    idRestaurant
                },
            });
            res.status(200).json(nuevoUsuario);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
