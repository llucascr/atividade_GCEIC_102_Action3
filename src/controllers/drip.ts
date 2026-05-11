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

/**
 * Simula um plano DRIP (Dividend Reinvestment Plan) ao longo de N anos com
 * pagamentos na frequência indicada (anual, trimestral ou mensal), aplicando
 * opcionalmente crescimento anual de dividendos e de número de cotas.
 * Retorna o valor futuro, total de dividendos recebidos, retorno total (%) e
 * a evolução ano a ano.
 */
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

/**
 * Handler HTTP do endpoint DRIP. Lê os dados de `req.body`, delega a simulação
 * para `computeDRIP` e responde com o resultado em JSON, ou 400 + mensagem
 * de erro em caso de entrada inválida.
 */
export function calculateDRIP(req: Request, res: Response) {
  try {
    const input: DRIPInput = req.body;
    const result = computeDRIP(input);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input data' });
  }
}