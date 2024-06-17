import { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from "@prisma/client";

const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
    pages: {
        signIn: '/signIn'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: "Correu electrònic",
                    type: "email",
                    placeholder: "Introdueix el correu electrònic",
                },
                password: {
                    label: "Contrasenya",
                    type: "password",
                    placeholder: "Introdueix la contrasenya",
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const existingUser = await prisma.usuari.findUnique({
                    where: { email: credentials.email }
                });
                if (!existingUser) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(credentials.password, existingUser.contrasenya_hash);
                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: existingUser.id.toString(),
                    email: existingUser.email,
                    name: existingUser.nom
                };
            } 
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                return {
                    ...token,
                    name: user.name,
                }
            }
            return token;
        },
        async session({session, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    name: token.name
                }
            }
        }
    }
}