const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const seedInterests = require('./seed-interests');

const countries = [
  // Europe
  { name: 'Portugal', code: 'PT', newName: 'Portugal' },
  { name: 'Espanha', code: 'ES', newName: 'Spain' },
  { name: 'França', code: 'FR', newName: 'France' },
  { name: 'Itália', code: 'IT', newName: 'Italy' },
  { name: 'Alemanha', code: 'DE', newName: 'Germany' },
  { name: 'Reino Unido', code: 'GB', newName: 'United Kingdom' },
  { name: 'Holanda', code: 'NL', newName: 'Netherlands' },
  { name: 'Bélgica', code: 'BE', newName: 'Belgium' },
  { name: 'Suíça', code: 'CH', newName: 'Switzerland' },
  { name: 'Grécia', code: 'GR', newName: 'Greece' },
  { name: 'Irlanda', code: 'IE', newName: 'Ireland' },
  
  // North America
  { name: 'Estados Unidos', code: 'US', newName: 'United States' },
  { name: 'Canadá', code: 'CA', newName: 'Canada' },
  { name: 'México', code: 'MX', newName: 'Mexico' },

  // South America
  { name: 'Brasil', code: 'BR', newName: 'Brazil' },
  { name: 'Argentina', code: 'AR', newName: 'Argentina' },
  { name: 'Chile', code: 'CL', newName: 'Chile' },
  { name: 'Colômbia', code: 'CO', newName: 'Colombia' },
  { name: 'Peru', code: 'PE', newName: 'Peru' },
  { name: 'Uruguai', code: 'UY', newName: 'Uruguay' },

  // Asia
  { name: 'Japão', code: 'JP', newName: 'Japan' },
  { name: 'Coreia do Sul', code: 'KR', newName: 'South Korea' },
  { name: 'China', code: 'CN', newName: 'China' },
  { name: 'Singapura', code: 'SG', newName: 'Singapore' },
  { name: 'Tailândia', code: 'TH', newName: 'Thailand' },
  { name: 'Vietnã', code: 'VN', newName: 'Vietnam' },
  { name: 'Índia', code: 'IN', newName: 'India' },

  // Oceania
  { name: 'Austrália', code: 'AU', newName: 'Australia' },
  { name: 'Nova Zelândia', code: 'NZ', newName: 'New Zealand' },

  // Africa
  { name: 'África do Sul', code: 'ZA', newName: 'South Africa' },
  { name: 'Marrocos', code: 'MA', newName: 'Morocco' },
  { name: 'Egito', code: 'EG', newName: 'Egypt' }
];

async function main() {
  // Atualizar nomes mantendo as relações existentes
  for (const country of countries) {
    await prisma.country.update({
      where: { code: country.code },
      data: { name: country.newName }
    });
  }
  
  console.log('Countries updated successfully!');
  
  // Seed dos interesses
  await seedInterests();
}

main()
  .catch((e) => {
    console.error('Error updating countries:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 