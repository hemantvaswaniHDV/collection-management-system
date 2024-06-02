import { Router } from 'express';
import { casesController } from '../controllers/casesController';

const router = Router();

router.get('/cases', casesController.getCasesByCity);

export default router;
