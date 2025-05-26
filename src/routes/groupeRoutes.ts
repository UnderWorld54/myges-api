import { Router } from 'express';
import { GroupeController } from '../controllers/groupeController';

const router = Router();
const groupeController = new GroupeController();

router.get('/', groupeController.getAllGroupes);
router.get('/:id', groupeController.getGroupeById);
router.post('/', groupeController.createGroupe);
router.put('/:id', groupeController.updateGroupe);
router.delete('/:id', groupeController.deleteGroupe);

export default router; 