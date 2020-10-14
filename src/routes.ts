import { Router } from 'express';
import orphanagesController from './controllers/OrphanagesController';

const router = Router();

router.get('/orphanages', orphanagesController.index);

router.get('/orphanages/:id', orphanagesController.show);

router.post('/orphanages', orphanagesController.create);

export default router;
