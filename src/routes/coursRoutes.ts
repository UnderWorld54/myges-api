import { Router } from 'express';
import { CoursController } from '../controllers/coursController';

const router = Router();
const coursController = new CoursController();

router.get('/', coursController.getAllCours);
router.get('/:id', coursController.getCoursById);
router.post('/', coursController.createCours);
router.put('/:id', coursController.updateCours);
router.delete('/:id', coursController.deleteCours);

export default router; 