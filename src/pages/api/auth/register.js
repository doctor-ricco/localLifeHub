import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const prisma = new PrismaClient();

  try {
    const { email, password, name, userType = 'GUEST' } = req.body;

    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await hash(password, 10);

    // Criar novo usuário com todos os campos obrigatórios
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        userType: userType.toUpperCase(), // Converter para maiúsculas para garantir que seja 'HOST' ou 'GUEST'
      },
    });

    res.status(200).json({ message: 'Usuário criado com sucesso', user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
} 