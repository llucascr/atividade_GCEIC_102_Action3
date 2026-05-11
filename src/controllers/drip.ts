import { Request, Response } from 'express';

interface DRIPInput {
  initialInvestment: number; 
  annualDividendYield: number; 
  years: number; 
  frequency: 1 | 4 | 12;
  annualDividendGrowth?: number; 
  annualShareGrowth?: number;
}

interface DRIPResult {
  futureValue: number;
  totalDividendsReceived: number;
  totalReturn: number;
  yearByYear: Array<{ year: number; value: number; dividends: number }>;
}

function computeDRIP(input: DRIPInput): DRIPResult {
  const { initialInvestment, annualDividendYield, years, frequency,
          annualDividendGrowth = 0, annualShareGrowth = 0 } = input;

  let currentValue = initialInvestment;
  let currentYield = annualDividendYield / 100;
  let totalDividends = 0;
  const yearByYear = [];

  for (let year = 1; year <= years; year++) {
    const periodYield = currentYield / frequency;
    const yearDivs = currentValue * currentYield;
    currentValue = currentValue * Math.pow(1 + periodYield, frequency);
    currentValue *= (1 + annualShareGrowth / 100);
    currentYield *= (1 + annualDividendGrowth / 100);
    totalDividends += yearDivs;
    yearByYear.push({ year, value: parseFloat(currentValue.toFixed(2)), dividends: parseFloat(yearDivs.toFixed(2)) });
  }

  return {
    futureValue: parseFloat(currentValue.toFixed(2)),
    totalDividendsReceived: parseFloat(totalDividends.toFixed(2)),
    totalReturn: parseFloat(((currentValue / initialInvestment - 1) * 100).toFixed(2)),
    yearByYear,
  };
}

export function calculateDRIP(req: Request, res: Response) {
  try {
    const input: DRIPInput = req.body;
    const result = computeDRIP(input);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input data' });
  }
}