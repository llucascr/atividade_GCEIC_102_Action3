import { Request, Response } from 'express';

interface DividendYieldInput {
  annualDividendPerShare: number;
  sharePrice: number;
}

interface DividendYieldResult {
  dividendYield: number;
  classification: 'low' | 'moderate' | 'high' | 'very_high';
}

function computeDividendYield(input: DividendYieldInput): DividendYieldResult {
  const { annualDividendPerShare, sharePrice } = input;

  if (sharePrice <= 0) throw new Error('Share price must be positive');
  if (annualDividendPerShare < 0) throw new Error('Dividend cannot be negative');

  const dividendYield = (annualDividendPerShare / sharePrice) * 100;

  const classification =
    dividendYield < 3 ? 'low' :
    dividendYield < 6 ? 'moderate' :
    dividendYield < 10 ? 'high' : 'very_high';

  return { dividendYield: parseFloat(dividendYield.toFixed(2)), classification };
}

export function calculateDividendYield(req: Request, res: Response): void {
  try {
    const result = computeDividendYield(req.body);
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
}
