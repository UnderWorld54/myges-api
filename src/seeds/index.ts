import { PrismaClient } from '@prisma/client';
import { seedMatieres } from './matieres';
import { seedGroupes } from './groupes';
import { seedUsers } from './users';
import { seedCours } from './cours';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🌱 Début du seeding...');

    // Seed dans l'ordre pour respecter les dépendances
    await seedMatieres(prisma);
    await seedGroupes(prisma);
    await seedUsers(prisma);
    await seedCours(prisma);

    console.log('✅ Seeding terminé avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 