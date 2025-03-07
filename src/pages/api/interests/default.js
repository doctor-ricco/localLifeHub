import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  console.log('API route hit: /api/interests/default');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const interests = await prisma.interest.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    console.log('Raw interests from database:', interests);

    // Garantir que retornamos um array
    const response = interests || [];
    console.log('Processed response:', response);

    res.status(200).json(response);
  } catch (error) {
    console.error('API Error:', error);
    res.status(200).json([]);
  }
} 