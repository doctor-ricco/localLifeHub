const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const countries = [
  // Europa
  { name: 'Portugal', code: 'PT' },
  { name: 'Espanha', code: 'ES' },
  { name: 'França', code: 'FR' },
  { name: 'Itália', code: 'IT' },
  { name: 'Alemanha', code: 'DE' },
  { name: 'Reino Unido', code: 'GB' },
  { name: 'Holanda', code: 'NL' },
  { name: 'Bélgica', code: 'BE' },
  { name: 'Suíça', code: 'CH' },
  { name: 'Grécia', code: 'GR' },
  { name: 'Irlanda', code: 'IE' },
  
  // América do Norte
  { name: 'Estados Unidos', code: 'US' },
  { name: 'Canadá', code: 'CA' },
  { name: 'México', code: 'MX' },

  // América do Sul
  { name: 'Brasil', code: 'BR' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Chile', code: 'CL' },
  { name: 'Colômbia', code: 'CO' },
  { name: 'Peru', code: 'PE' },
  { name: 'Uruguai', code: 'UY' },

  // Ásia
  { name: 'Japão', code: 'JP' },
  { name: 'Coreia do Sul', code: 'KR' },
  { name: 'China', code: 'CN' },
  { name: 'Singapura', code: 'SG' },
  { name: 'Tailândia', code: 'TH' },
  { name: 'Vietnã', code: 'VN' },
  { name: 'Índia', code: 'IN' },

  // Oceania
  { name: 'Austrália', code: 'AU' },
  { name: 'Nova Zelândia', code: 'NZ' },

  // África
  { name: 'África do Sul', code: 'ZA' },
  { name: 'Marrocos', code: 'MA' },
  { name: 'Egito', code: 'EG' }
];

async function main() {
  for (const country of countries) {
    await prisma.country.upsert({
      where: { code: country.code },
      update: {},
      create: country,
    });
  }
  
  console.log('Países adicionados com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro ao adicionar países:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 