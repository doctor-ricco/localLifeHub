import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../lib/prisma';
import { validatePhone } from '../../../utils/validation';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { phone, address, city, countryId, bio, interests } = req.body;

    // Valida o telefone se fornecido
    if (phone) {
      try {
        validatePhone(phone);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }

    // Se temos interesses para atualizar
    if (Array.isArray(interests)) {
      // Atualiza o usuário e seus interesses em uma única operação
      const updatedUser = await prisma.user.update({
        where: {
          email: session.user.email
        },
        data: {
          phone,
          address,
          city,
          countryId,
          bio,
          interests: {
            // Primeiro desconecta todos os interesses existentes
            set: [],
            // Depois conecta ou cria os novos interesses
            connectOrCreate: interests.map(name => ({
              where: { name },
              create: { name }
            }))
          }
        },
        include: {
          interests: true,
          country: true
        }
      });

      return res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    }

    // Se não temos interesses para atualizar, apenas atualiza os outros campos
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        phone,
        address,
        city,
        countryId,
        bio
      },
      include: {
        interests: true,
        country: true
      }
    });

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: error.message });
  }
} 