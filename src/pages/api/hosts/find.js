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

    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ message: 'City parameter is required' });
    }

    // Buscar o usuário atual (guest) com seus interesses
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { interests: true }
    });

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extrair os IDs dos interesses do usuário atual
    const userInterestIds = currentUser.interests.map(interest => interest.id);

    // Buscar hosts na cidade especificada
    // Não precisamos mais dividir a string, pois removemos o país
    const cityName = city.trim();

    console.log('Buscando hosts na cidade:', cityName);
    console.log('Tipo de usuário atual:', currentUser.userType);

    // Buscar hosts com correspondência exata ou parcial na cidade
    const hosts = await prisma.user.findMany({
      where: {
        userType: 'HOST',
        city: {
          contains: cityName,
          mode: 'insensitive'
        }
      },
      include: {
        interests: true,
        country: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    console.log('Hosts encontrados:', hosts.length);

    // Calcular a pontuação de correspondência para cada host
    // com base em interesses compartilhados
    const hostsWithMatchScore = hosts.map(host => {
      // Contar interesses em comum
      const sharedInterests = host.interests.filter(interest => 
        userInterestIds.includes(interest.id)
      );
      
      // Calcular a porcentagem de match
      // Cada interesse vale 12.5% (100% / 8)
      const matchPercentage = parseFloat(((sharedInterests.length / 8) * 100).toFixed(2));
      
      return {
        id: host.id,
        name: host.name,
        email: host.email,
        city: host.city,
        country: host.country,
        bio: host.bio,
        profileImage: host.profileImage,
        interests: host.interests,
        matchScore: sharedInterests.length,
        matchPercentage,
        sharedInterests
      };
    });

    // Filtrar hosts que têm pelo menos 50% de match
    const filteredHosts = hostsWithMatchScore.filter(host => host.matchPercentage >= 50);

    // Ordenar hosts por pontuação de correspondência (do maior para o menor)
    filteredHosts.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json({ hosts: filteredHosts });
  } catch (error) {
    console.error('Error finding hosts:', error);
    res.status(500).json({ message: 'Error finding hosts', error: error.message });
  }
} 