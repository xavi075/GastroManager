import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "PUT") {
        try {
            const userId = req.query.id as string; // Obtener el ID del usuario de la URL
            const { email, nom, contrasenya_hash, dataCreacioUsuari, idRol, idRestaurant } = req.body;

            // Verificar si idRol se proporciona y si existe en la tabla rol
            if (idRol) {
                const existingRol = await prisma.rol.findUnique({
                    where: {
                        id: Number(idRol),
                    },
                });
                if (!existingRol) {
                    return res.status(400).json({ error: "El ID del rol proporcionado no es válido" });
                }
            }

            const updatedUser = await prisma.usuari.update({
                where: {
                    id: Number(userId),
                },
                data: {
                    email,
                    nom,
                    contrasenya_hash,
                    dataCreacioUsuari: new Date(dataCreacioUsuari),
                    idRol,
                    idRestaurant,
                },
            });
            res.status(200).json(updatedUser);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: "Método no permitido" });
    }
}

