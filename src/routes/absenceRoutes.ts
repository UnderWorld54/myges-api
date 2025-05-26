import { Router } from 'express';
import { AbsenceController } from '../controllers/absenceController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
const absenceController = new AbsenceController();

router.use(authenticate);

router.get('/', authorize('admin'), absenceController.getAllAbsences);
router.get('/:id', absenceController.getAbsenceById);
router.post('/', authorize('admin'), absenceController.createAbsence);
router.put('/:id', authorize('admin'), absenceController.updateAbsence);
router.delete('/:id', authorize('admin'), absenceController.deleteAbsence);

export default router; 