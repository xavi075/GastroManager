// pages/api/usuaris/updatePassword.ts
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

    if (req.method == "PUT") {
        try {
            const { email, currentPwd, newPwd } = req.body;
            if (email && currentPwd && newPwd) {
                const usuari = await prisma.usuari.findUnique({
                    where: {
                        email: email,
                    },
                });
                if (usuari) {
                    // if (usuari.contrasenya_hash == currentPwd) {
                    if (await bcrypt.compare(currentPwd, usuari.contrasenya_hash)) {   
                        const hashedPassword = await bcrypt.hash(newPwd, 10);
                        await prisma.usuari.update({
                            where: {
                                email: email,
                            },
                            data: {
                                contrasenya_hash: hashedPassword,
                            },
                        });
                        res.status(200).json({ message: "Password Updated" });
                        return;
                    } else {
                        res.status(400).json({ error: "The provided password does not match the user's password." });
                        return;
                    }
                } else {
                    res.status(404).json({ error: "User Not Found" });
                    return;
                }
            } else {
                res.status(400).json({ error: "Missing data" });
                return;
            }
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}