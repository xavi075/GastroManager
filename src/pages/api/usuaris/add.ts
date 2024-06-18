import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "../../../lib/auth";
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, options)

    if (!session) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    if (req.method === "POST") {
        try {
            const { email, nom, contrasenya, nomRol, nifRestaurant } = req.body;

            // comprova si l'email ja existeix
            const existingEmail = await prisma.usuari.findUnique({
                where: {email: email}
            });
            if (existingEmail) {
                return res.status(409).json({ error: "Email already exists" })
            }

            const hashedPassword = await bcrypt.hash(contrasenya, 10);

            const newRol = await prisma.rol.findUnique({
                where: { nomRol: nomRol }
            });
            if (!newRol) {
                return res.status(404).json({ error: "Role not found" });
            }

            const newRestaurant = await prisma.restaurant.findUnique({
                where: { nif: nifRestaurant }
            });
            if (!newRestaurant) {
                return res.status(404).json({ error: "Restaurant not found" });
            }

            const newUser = await prisma.usuari.create({
                data: {
                    email: email,
                    nom: nom,
                    contrasenya_hash: hashedPassword,
                    idRol: newRol.id,
                    idRestaurant: newRestaurant.id
                },
            });
            const { contrasenya_hash: newUserPassword, ...rest } = newUser;

            res.status(200).json(rest);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

