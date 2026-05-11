import { Router } from 'express';
import { teste } from '../controllers/dividendosController';

const router = Router();

router.get('/teste', teste);

export default router;
