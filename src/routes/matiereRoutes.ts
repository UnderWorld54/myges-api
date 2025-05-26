import { Router } from 'express';
import { MatiereController } from '../controllers/matiereController';

const router = Router();
const matiereController = new MatiereController();

router.get('/', matiereController.getAllMatieres);
router.get('/:id', matiereController.getMatiereById);
router.post('/', matiereController.createMatiere);
router.put('/:id', matiereController.updateMatiere);
router.delete('/:id', matiereController.deleteMatiere);

export default router; 