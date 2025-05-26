import { PrismaClient } from '@prisma/client';

export async function seedGroupes(prisma: PrismaClient) {
  const groupes = [
    {
      nom: 'B3 Info',
      niveau: 'Bachelor 3',
      specialite: 'Informatique',
    },
    {
      nom: 'M1 Info',
      niveau: 'Master 1',
      specialite: 'Informatique',
    },
    {
      nom: 'B3 Réseaux',
      niveau: 'Bachelor 3',
      specialite: 'Réseaux',
    },
    {
      nom: 'M2 Cybersécurité',
      niveau: 'Master 2',
      specialite: 'Cybersécurité',
    },
  ];

  console.log('🌱 Seeding des groupes...');

  for (const groupe of groupes) {
    await prisma.groupe.upsert({
      where: { nom: groupe.nom },
      update: {},
      create: groupe,
    });
  }

  console.log('✅ Groupes créés avec succès!');
} 