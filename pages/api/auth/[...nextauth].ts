import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import dotenv from "dotenv"
dotenv.config()

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "GITHUB_ID",
      clientSecret: process.env.GITHUB_SECRET || "GITHUB_SECRET",
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)