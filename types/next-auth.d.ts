import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
      firstName: string | null
      lastName: string | null
      email: string | null
      }


  interface Session {
  user: User
  token: {
    firstName: string
    lastName: string
  }
}

}