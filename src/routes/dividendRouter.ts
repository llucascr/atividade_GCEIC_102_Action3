import { Router } from 'express';
import { calculateDividendYield } from '../controllers/dividendYield';
import { calculatePayoutRatio } from '../controllers/payoutRatio';

const router = Router();

router.post('/calculate/yield', calculateDividendYield);
router.post('/calculate/payout', calculatePayoutRatio);

export default router;
