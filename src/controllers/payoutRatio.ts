import { Request, Response } from 'express';

interface PayoutRatioInput {
  dividendPerShare: number;
  earningsPerShare: number;
}

interface PayoutRatioResult {
  payoutRatio: number;
  retentionRatio: number;
  isSustainable: boolean;
  risk: 'low' | 'moderate' | 'high';
}

function computePayoutRatio(
  input: PayoutRatioInput
): PayoutRatioResult {
  const { dividendPerShare, earningsPerShare } = input;

  if (earningsPerShare <= 0) throw new Error('EPS must be positive');

  const payoutRatio = (dividendPerShare / earningsPerShare) * 100;
  const retentionRatio = 100 - payoutRatio;
  const isSustainable = payoutRatio <= 75;
  const risk = payoutRatio <= 50 ? 'low' : payoutRatio <= 75 ? 'moderate' : 'high';

  return {
    payoutRatio: parseFloat(payoutRatio.toFixed(2)),
    retentionRatio: parseFloat(retentionRatio.toFixed(2)),
    isSustainable,
    risk,
  };
}

export function calculatePayoutRatio(req: Request, res: Response): void {
    try {
        const result = computePayoutRatio(req.body);
        res.status(200).json(result);
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        res.status(400).json({ error: message });
    }
}