import { Router } from 'express';
import { NoteController } from '../controllers/noteController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
const noteController = new NoteController();

router.use(authenticate);

router.get('/', authorize('admin'), noteController.getAllNotes);
router.get('/:id', noteController.getNoteById);
router.post('/', authorize('admin'), noteController.createNote);
router.put('/:id', authorize('admin'), noteController.updateNote);
router.delete('/:id', authorize('admin'), noteController.deleteNote);

export default router; 