import prisma from '../../../lib/prisma';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, name, userType = 'GUEST' } = req.body;

    console.log('Dados recebidos:', { email, name, userType }); // Log para debug

    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await hash(password, 10);

    // Criar novo usuário sem o campo country
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        hashedPassword,
        userType: userType?.toUpperCase() === 'HOST' ? 'HOST' : 'GUEST',
      },
    });

    console.log('Usuário criado:', user); // Log para debug

    res.status(200).json({ 
      message: 'Usuário criado com sucesso', 
      user: { id: user.id, email: user.email } 
    });
  } catch (error) {
    console.error('Erro detalhado:', error);
    res.status(500).json({ 
      message: 'Erro ao criar usuário', 
      error: error.message,
      stack: error.stack 
    });
  }
} 