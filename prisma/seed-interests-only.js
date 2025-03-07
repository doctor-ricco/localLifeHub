const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Interesses mais relevantes para viajantes e experiências locais
  const interests = [
    { name: 'Local Cuisine', icon: 'restaurant' },
    { name: 'Cultural Events', icon: 'event' },
    { name: 'Outdoor Activities', icon: 'hiking' },
    { name: 'Historical Sites', icon: 'landmark' },
    { name: 'Photography', icon: 'camera' },
    { name: 'Art & Museums', icon: 'palette' },
    { name: 'Music & Concerts', icon: 'music_note' },
    { name: 'Local Markets', icon: 'shopping_cart' },
    { name: 'Nature & Parks', icon: 'park' },
    { name: 'Urban Exploration', icon: 'explore' },
    { name: 'Nightlife', icon: 'nightlife' },
    { name: 'Sports', icon: 'sports' }
  ];

  console.log('Seeding additional interests...');

  // Verificar interesses existentes
  const existingInterests = await prisma.interest.findMany();
  console.log(`Found ${existingInterests.length} existing interests`);

  // Contar quantos novos interesses serão adicionados
  let newInterestsCount = 0;

  for (const interest of interests) {
    // Verificar se o interesse já existe
    const exists = existingInterests.some(
      existing => existing.name.toLowerCase() === interest.name.toLowerCase()
    );

    if (!exists) {
      newInterestsCount++;
      console.log(`Adding new interest: ${interest.name}`);
      
      // Criar na tabela Interest
      const baseInterest = await prisma.interest.create({
        data: {
          name: interest.name
        }
      });

      // Criar na tabela DefaultInterest
      await prisma.defaultInterest.create({
        data: {
          name: interest.name,
          icon: interest.icon,
          active: true
        }
      });
    } else {
      console.log(`Interest already exists: ${interest.name}`);
      
      // Atualizar o ícone se o interesse já existir
      await prisma.defaultInterest.upsert({
        where: { name: interest.name },
        update: { icon: interest.icon },
        create: {
          name: interest.name,
          icon: interest.icon,
          active: true
        }
      });
    }
  }

  console.log(`Added ${newInterestsCount} new interests`);
  
  const allInterests = await prisma.interest.findMany();
  console.log(`Total interests in database: ${allInterests.length}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 