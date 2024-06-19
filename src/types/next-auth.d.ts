import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface User extends DefaultUser {
        name: string
    }

  interface Session {
    user: User & {
        name: string
    }
    token: {
        name: string
    }
  }
}