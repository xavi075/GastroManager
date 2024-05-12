import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {
            const { email, nom, contrasenya, dataCreacioUsuari, idRol} = req.body;
            const contrasenya_hash = await bcrypt.hash(contrasenya, 10);

            const nuevoUsuario = await prisma.usuari.create({
                data: {
                    email,
                    nom,
                    contrasenya_hash,
                    dataCreacioUsuari,
                    idRol
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

