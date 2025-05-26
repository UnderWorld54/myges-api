import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export async function seedUsers(prisma: PrismaClient) {
  const users = [
    {
      email: 'prof1@esgi.fr',
      password: await bcrypt.hash('password123', 10),
      nom: 'Dupont',
      prenom: 'Jean',
      role: 'PROFESSEUR',
    },
    {
      email: 'prof2@esgi.fr',
      password: await bcrypt.hash('password123', 10),
      nom: 'Martin',
      prenom: 'Sophie',
      role: 'PROFESSEUR',
    },
    {
      email: 'admin@esgi.fr',
      password: await bcrypt.hash('admin123', 10),
      nom: 'Admin',
      prenom: 'Admin',
      role: 'ADMIN',
    },
    {
      email: 'etudiant1@esgi.fr',
      password: await bcrypt.hash('student123', 10),
      nom: 'Dubois',
      prenom: 'Marie',
      role: 'ETUDIANT',
    },
  ];

  console.log('🌱 Seeding des utilisateurs...');

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('✅ Utilisateurs créés avec succès!');
} 