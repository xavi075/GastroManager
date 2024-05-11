// pages/api/usuaris/updatePassword.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
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
                    if (usuari.contrasenya_hash == currentPwd) {
                        await prisma.usuari.update({
                            where: {
                                email: email,
                            },
                            data: {
                                contrasenya_hash: newPwd,
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