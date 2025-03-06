import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const prisma = new PrismaClient();

  try {
    // Encontrar todos os usuários sem senha
    const usersWithoutPassword = await prisma.user.findMany({
      where: {
        hashedPassword: null
      }
    });

    // Criar uma senha padrão temporária
    const tempPassword = await hash('ChangeMe123!', 10);

    // Atualizar cada usuário
    for (const user of usersWithoutPassword) {
      await prisma.user.update({
        where: { id: user.id },
        data: { hashedPassword: tempPassword }
      });
    }

    res.status(200).json({ 
      message: `${usersWithoutPassword.length} usuários atualizados` 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
} 