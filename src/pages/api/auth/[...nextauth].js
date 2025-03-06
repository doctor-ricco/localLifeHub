import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../lib/prisma';
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log("1. Iniciando autenticação");
          
          if (!credentials?.email || !credentials?.password) {
            console.log("2. Credenciais faltando");
            throw new Error("Email e senha são necessários");
          }

          console.log("3. Buscando usuário");
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email.toLowerCase().trim()
            }
          });
          console.log("4. Usuário encontrado:", !!user);

          if (!user || !user.hashedPassword) {
            console.log("5. Usuário não encontrado ou sem senha");
            throw new Error("Credenciais inválidas");
          }

          console.log("6. Verificando senha");
          const isPasswordValid = await compare(
            credentials.password,
            user.hashedPassword
          );
          console.log("7. Senha válida:", isPasswordValid);

          if (!isPasswordValid) {
            console.log("8. Senha inválida");
            throw new Error("Credenciais inválidas");
          }

          console.log("9. Autenticação bem sucedida");
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            userType: user.userType
          };
        } catch (error) {
          console.error("10. Erro na autenticação:", error);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: '/signin',
    error: '/signin'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userType = user.userType;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.userType = token.userType;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};

export default NextAuth(authOptions); 