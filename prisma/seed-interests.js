const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultInterests = [
  { 
    name: 'Photography',
    icon: 'camera' // ou o path do SVG
  },
  { 
    name: 'Cooking',
    icon: 'cooking'
  },
  { 
    name: 'Travel',
    icon: 'globe'
  },
  { 
    name: 'Music',
    icon: 'music'
  },
  { 
    name: 'Sports',
    icon: 'sports'
  },
  { 
    name: 'Reading',
    icon: 'book'
  },
  { 
    name: 'Art',
    icon: 'art'
  },
  { 
    name: 'Technology',
    icon: 'computer'
  }
];

async function seedInterests() {
  console.log('Starting interests seed...');
  
  for (const interest of defaultInterests) {
    console.log(`Processing interest: ${interest.name}`);
    try {
      const result = await prisma.defaultInterest.upsert({
        where: { name: interest.name },
        update: { 
          icon: interest.icon,
          active: true 
        },
        create: {
          name: interest.name,
          icon: interest.icon,
          active: true
        }
      });
      console.log(`Successfully processed interest: ${result.name}`);
    } catch (error) {
      console.error(`Error processing interest ${interest.name}:`, error);
    }
  }
  
  // Verificar se os interesses foram salvos
  const savedInterests = await prisma.defaultInterest.findMany();
  console.log('Total interests saved:', savedInterests.length);
  console.log('Saved interests:', savedInterests);
}

module.exports = seedInterests; 