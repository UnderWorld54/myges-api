import { PrismaClient } from '@prisma/client';

export async function seedCours(prisma: PrismaClient) {
  // Récupérer les IDs des matières et groupes créés précédemment
  const matiere = await prisma.matiere.findFirst({
    where: { nom: 'Informatique' },
  });

  const groupe = await prisma.groupe.findFirst({
    where: { nom: 'B3 Info' },
  });

  const professeur = await prisma.user.findFirst({
    where: { email: 'prof1@esgi.fr' },
  });

  if (!matiere || !groupe || !professeur) {
    throw new Error('Données requises non trouvées pour la création des cours');
  }

  const cours = [
    {
      date: new Date('2024-03-20T09:00:00Z'),
      duree: 120,
      matiereId: matiere.id,
      groupeId: groupe.id,
      professeurId: professeur.id,
      salle: 'Salle 101',
    },
    {
      date: new Date('2024-03-21T14:00:00Z'),
      duree: 180, 
      matiereId: matiere.id,
      groupeId: groupe.id,
      professeurId: professeur.id,
      salle: 'Salle 102',
    },
  ];

  console.log('🌱 Seeding des cours...');

  for (const cour of cours) {
    await prisma.cours.create({
      data: cour,
    });
  }

  console.log('✅ Cours créés avec succès!');
} 