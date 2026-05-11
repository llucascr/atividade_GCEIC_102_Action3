import { Router } from 'express';
import { calculateDividendYield } from '../controllers/dividendYield';
import { calculatePayoutRatio } from '../controllers/payoutRatio';
import { calculateDRIP } from '../controllers/drip';

const router = Router();

router.post('/calculate/yield', calculateDividendYield);
router.post('/calculate/payout', calculatePayoutRatio);
router.post('/calculate/drip', calculateDRIP);

export default router;
