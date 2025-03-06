import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    res.status(200).json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ message: 'Error fetching countries' });
  }
} 