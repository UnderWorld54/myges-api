import { PrismaClient } from '@prisma/client';

export async function seedMatieres(prisma: PrismaClient) {
  const matieres = [
    {
      nom: 'Mathématiques',
      description: 'Cours de mathématiques avancées',
      coefficient: 4,
    },
    {
      nom: 'Informatique',
      description: 'Programmation et algorithmique',
      coefficient: 5,
    },
    {
      nom: 'Anglais',
      description: 'Anglais technique et business',
      coefficient: 2,
    },
    {
      nom: 'Base de données',
      description: 'Conception et gestion de bases de données',
      coefficient: 3,
    },
    {
      nom: 'Réseaux',
      description: 'Architecture réseau et protocoles',
      coefficient: 3,
    },
  ];

  console.log('🌱 Seeding des matières...');

  for (const matiere of matieres) {
    await prisma.matiere.upsert({
      where: { nom: matiere.nom },
      update: {},
      create: matiere,
    });
  }

  console.log('✅ Matières créées avec succès!');
} 