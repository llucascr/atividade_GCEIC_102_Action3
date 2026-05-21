import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export default function DRIPTab() {
  const [form, setForm] = useState({
    initialInvestment: "", annualDividendYield: "", years: "",
    frequency: "12", annualDividendGrowth: "", annualShareGrowth: "", monthlyContribution: "",
  });
  const [result, setResult] = useState<{
    futureValue: number; totalContributed: number;
    totalDividendsReceived: number; totalReturn: number;
    yearByYear: Array<{ year: number; value: number; dividends: number; contributed: number }>;
  } | null>(null);

  function field(key: string) {
    return {
      value: form[key as keyof typeof form],
      onChange: (e: any) => setForm(f => ({ ...f, [key]: e.target.value })),
    };
  }

  function handleCalc() {
    const initialInvestment = Number(form.initialInvestment);
    const annualDividendYield = Number(form.annualDividendYield);
    const years = Number(form.years);
    const frequency = Number(form.frequency) as 1 | 4 | 12;
    const annualDividendGrowth = Number(form.annualDividendGrowth) || 0;
    const annualShareGrowth = Number(form.annualShareGrowth) || 0;
    const monthlyContribution = Number(form.monthlyContribution) || 0;

    if (!initialInvestment || !annualDividendYield || !years) return;

    let currentValue = initialInvestment;
    let currentYield = annualDividendYield / 100;
    let totalDividends = 0;
    let totalContributed = initialInvestment;
    const contributionPerPeriod = monthlyContribution * (12 / frequency);
    const yearByYear = [];

    for (let year = 1; year <= years; year++) {
      const periodYield = currentYield / frequency;
      let yearDivs = 0;
      for (let p = 0; p < frequency; p++) {
        currentValue += contributionPerPeriod;
        totalContributed += contributionPerPeriod;
        const periodDivs = currentValue * periodYield;
        currentValue += periodDivs;
        yearDivs += periodDivs;
      }
      currentValue *= (1 + annualShareGrowth / 100);
      currentYield *= (1 + annualDividendGrowth / 100);
      totalDividends += yearDivs;
      yearByYear.push({
        year,
        value: parseFloat(currentValue.toFixed(2)),
        dividends: parseFloat(yearDivs.toFixed(2)),
        contributed: parseFloat(totalContributed.toFixed(2)),
      });
    }

    setResult({
      futureValue: parseFloat(currentValue.toFixed(2)),
      totalContributed: parseFloat(totalContributed.toFixed(2)),
      totalDividendsReceived: parseFloat(totalDividends.toFixed(2)),
      totalReturn: parseFloat(((currentValue / totalContributed - 1) * 100).toFixed(2)),
      yearByYear,
    });
  }

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Simulação DRIP</CardTitle>
        <CardDescription>Reinvestimento automático de dividendos ao longo do tempo</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Investimento inicial (R$)</Label>
            <Input type="number" placeholder="10000" {...field("initialInvestment")} />
          </div>
          <div className="space-y-2">
            <Label>Dividend Yield anual (%)</Label>
            <Input type="number" placeholder="8" {...field("annualDividendYield")} />
          </div>
          <div className="space-y-2">
            <Label>Anos</Label>
            <Input type="number" placeholder="10" {...field("years")} />
          </div>
          <div className="space-y-2">
            <Label>Frequência de pagamento</Label>
            <select
              className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              value={form.frequency}
              onChange={e => setForm(f => ({ ...f, frequency: e.target.value }))}
            >
              <option value="1">Anual</option>
              <option value="4">Trimestral</option>
              <option value="12">Mensal</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Crescimento anual do dividendo (%) <span className="text-slate-400 font-normal">opcional</span></Label>
            <Input type="number" placeholder="0" {...field("annualDividendGrowth")} />
          </div>
          <div className="space-y-2">
            <Label>Crescimento anual da cota (%) <span className="text-slate-400 font-normal">opcional</span></Label>
            <Input type="number" placeholder="0" {...field("annualShareGrowth")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Aporte mensal (R$) <span className="text-slate-400 font-normal">opcional</span></Label>
            <Input type="number" placeholder="0" {...field("monthlyContribution")} />
          </div>
        </div>

        <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleCalc}>
          Simular
        </Button>

        {result && (
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-slate-400">Valor futuro</p>
                <p className="text-xl font-bold text-emerald-700">{fmt(result.futureValue)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Total aportado</p>
                <p className="text-xl font-bold text-slate-700">{fmt(result.totalContributed)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Dividendos recebidos</p>
                <p className="text-xl font-bold text-slate-700">{fmt(result.totalDividendsReceived)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Retorno total</p>
                <p className="text-xl font-bold text-emerald-600">+{result.totalReturn}%</p>
              </div>
            </div>

            <div className="rounded-xl border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 text-slate-500">
                  <tr>
                    <th className="px-4 py-2 text-left">Ano</th>
                    <th className="px-4 py-2 text-right">Valor</th>
                    <th className="px-4 py-2 text-right">Dividendos</th>
                    <th className="px-4 py-2 text-right">Aportado</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearByYear.map(row => (
                    <tr key={row.year} className="border-t hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-2 font-medium">{row.year}</td>
                      <td className="px-4 py-2 text-right text-emerald-700 font-medium">{fmt(row.value)}</td>
                      <td className="px-4 py-2 text-right text-slate-600">{fmt(row.dividends)}</td>
                      <td className="px-4 py-2 text-right text-slate-500">{fmt(row.contributed)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}