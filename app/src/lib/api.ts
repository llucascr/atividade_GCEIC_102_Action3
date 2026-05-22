// O objeto ENV é injetado pelo servidor app/index.js na rota /env.js
const apiUrl = (window as any).ENV?.API_URL || 'http://localhost:3001';
const BASE = apiUrl + '/api';

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || data?.erro || 'Erro desconhecido');
  return data as T;
}

export interface DividendYieldResult {
  dividendYield: number;
  classification: 'low' | 'moderate' | 'high' | 'very_high';
}

export interface PayoutRatioResult {
  payoutRatio: number;
  retentionRatio: number;
  isSustainable: boolean;
  risk: 'low' | 'moderate' | 'high';
}

export interface DRIPResult {
  futureValue: number;
  totalContributed: number;
  totalDividendsReceived: number;
  totalReturn: number;
  yearByYear: Array<{ year: number; value: number; dividends: number; contributed: number }>;
}

export const api = {
  login: (login: string, password: string) =>
    post<string>('/cdd/login', { login, password }),

  calculateYield: (annualDividendPerShare: number, sharePrice: number) =>
    post<DividendYieldResult>('/cdd/calculate/yield', { annualDividendPerShare, sharePrice }),

  calculatePayout: (dividendPerShare: number, earningsPerShare: number) =>
    post<PayoutRatioResult>('/cdd/calculate/payout', { dividendPerShare, earningsPerShare }),

  calculateDRIP: (params: {
    initialInvestment: number;
    annualDividendYield: number;
    years: number;
    frequency: number;
    annualDividendGrowth?: number;
    annualShareGrowth?: number;
    monthlyContribution?: number;
  }) => post<DRIPResult>('/cdd/calculate/drip', params),
};
