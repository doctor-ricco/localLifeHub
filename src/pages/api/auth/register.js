import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, name, phone, address, bio, userType } = req.body;

    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criar novo usuário
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
        phone,
        address,
        bio,
        userType,
      },
    });

    res.status(200).json({ message: 'Usuário criado com sucesso' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
} 