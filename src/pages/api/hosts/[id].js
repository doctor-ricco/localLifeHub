import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Host ID is required' });
    }

    // Buscar o host pelo ID
    const host = await prisma.user.findUnique({
      where: { id: id },
      include: {
        interests: true,
        country: true
      }
    });

    if (!host) {
      return res.status(404).json({ message: 'Host not found' });
    }

    // Buscar o usuário atual (guest) com seus interesses
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { interests: true }
    });

    // Calcular a porcentagem de match com base nos interesses compartilhados
    let matchPercentage = 0;
    let sharedInterests = [];
    
    if (currentUser.interests && currentUser.interests.length > 0 && 
        host.interests && host.interests.length > 0) {
      const userInterestIds = currentUser.interests.map(interest => interest.id);
      sharedInterests = host.interests.filter(interest => 
        userInterestIds.includes(interest.id)
      );
      
      // Calcular a porcentagem de match (cada interesse vale 12.5% - 100% / 8)
      matchPercentage = Math.min(
        100, 
        Math.round((sharedInterests.length / 8) * 100)
      );
    }

    // Retornar os dados do host com informações adicionais
    res.status(200).json({
      host: {
        id: host.id,
        name: host.name,
        email: host.email,
        city: host.city,
        country: host.country,
        bio: host.bio,
        profileImage: host.profileImage,
        interests: host.interests,
        matchPercentage,
        sharedInterests
      }
    });
  } catch (error) {
    console.error('Error fetching host:', error);
    res.status(500).json({ message: 'Error fetching host', error: error.message });
  }
} 