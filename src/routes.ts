import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import orphanagesController from './controllers/OrphanagesController';

const router = Router();
const upload = multer(uploadConfig);

router.get('/orphanages', orphanagesController.index);

router.get('/orphanages/:id', orphanagesController.show);

router.post('/orphanages', upload.array('images'), orphanagesController.create);

export default router;
