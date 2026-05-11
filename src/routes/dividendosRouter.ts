import { Router } from 'express';
import { calculateDividendYield } from '../controllers/dividendoYield';

const router = Router();

router.post('/calcular/yield', calculateDividendYield);

export default router;
