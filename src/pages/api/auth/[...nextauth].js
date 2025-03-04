import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from '../../../lib/prisma';
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Credenciais incompletas");
          return null;
        }

        try {
          console.log(`Buscando usuário com email: ${credentials.email}`);
          
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email.toLowerCase().trim()
            }
          });

          console.log("Usuário encontrado:", user);

          if (!user || !user.hashedPassword) {
            console.log("Usuário não encontrado ou sem senha");
            return null;
          }

          const isPasswordValid = await compare(
            credentials.password,
            user.hashedPassword
          );

          console.log("Senha válida:", isPasswordValid);

          if (!isPasswordValid) {
            console.log("Senha inválida");
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name
          };
        } catch (error) {
          console.error("Erro durante autenticação:", error);
          return null;
        }
      }
    })
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
}); 