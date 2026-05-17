import { Request, Response } from 'express';

interface DividendYieldInput {
  annualDividendPerShare: number;
  sharePrice: number;
}

interface DividendYieldResult {
  dividendYield: number;
  classification: 'low' | 'moderate' | 'high' | 'very_high';
}

/**
 * Calcula o Dividend Yield (DY) de uma ação a partir do dividendo anual por ação
 * e do preço atual da ação, e classifica o resultado em: low, moderate, high
 * ou very_high. Lança erro se o preço for não-positivo ou o dividendo negativo.
 */
export function computeDividendYield(input: DividendYieldInput): DividendYieldResult {
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

/**
 * Handler HTTP do endpoint de Dividend Yield. Lê os dados de `req.body`,
 * delega o cálculo para `computeDividendYield` e responde com 200 + resultado
 * em caso de sucesso, ou 400 + mensagem de erro em caso de entrada inválida.
 */
export function calculateDividendYield(req: Request, res: Response): void {
  try {
    const result = computeDividendYield(req.body);
    res.status(200).json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
}
