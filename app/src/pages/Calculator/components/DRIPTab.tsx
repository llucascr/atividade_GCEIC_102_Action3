import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { api, type DRIPResult } from "../../../lib/api";

export default function DRIPTab() {
  const [form, setForm] = useState({
    initialInvestment: "",
    annualDividendYield: "",
    years: "",
    frequency: "12",
    annualDividendGrowth: "",
    annualShareGrowth: "",
    monthlyContribution: "",
  });
  const [result, setResult] = useState<DRIPResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function field(key: string) {
    return {
      value: form[key as keyof typeof form],
      onChange: (e: any) => setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  async function handleCalc() {
    const initialInvestment = Number(form.initialInvestment);
    const annualDividendYield = Number(form.annualDividendYield);
    const years = Number(form.years);
    const frequency = Number(form.frequency);
    if (!initialInvestment || !annualDividendYield || !years) return;

    setError("");
    setLoading(true);
    try {
      const data = await api.calculateDRIP({
        initialInvestment,
        annualDividendYield,
        years,
        frequency,
        annualDividendGrowth: Number(form.annualDividendGrowth) || 0,
        annualShareGrowth: Number(form.annualShareGrowth) || 0,
        monthlyContribution: Number(form.monthlyContribution) || 0,
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao simular.");
    } finally {
      setLoading(false);
    }
  }

  const fmt = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Simulação DRIP</CardTitle>
        <CardDescription>
          Reinvestimento automático de dividendos ao longo do tempo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Investimento inicial (R$)</Label>
            <Input
              id="drip-initial"
              type="number"
              placeholder="10000"
              {...field("initialInvestment")}
            />
          </div>
          <div className="space-y-2">
            <Label>Dividend Yield anual (%)</Label>
            <Input
              id="drip-yield"
              type="number"
              placeholder="8"
              {...field("annualDividendYield")}
            />
          </div>
          <div className="space-y-2">
            <Label>Anos</Label>
            <Input
              id="drip-years"
              type="number"
              placeholder="10"
              {...field("years")}
            />
          </div>
          <div className="space-y-2">
            <Label>Frequência de pagamento</Label>
            <select
              id="drip-frequency"
              className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              value={form.frequency}
              onChange={(e) =>
                setForm((f) => ({ ...f, frequency: e.target.value }))
              }
            >
              <option value="1">Anual</option>
              <option value="4">Trimestral</option>
              <option value="12">Mensal</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>
              Crescimento anual do dividendo (%){" "}
              <span className="text-slate-400 font-normal">opcional</span>
            </Label>
            <Input
              id="drip-growth"
              type="number"
              placeholder="0"
              {...field("annualDividendGrowth")}
            />
          </div>
          <div className="space-y-2">
            <Label>
              Crescimento anual da cota (%){" "}
              <span className="text-slate-400 font-normal">opcional</span>
            </Label>
            <Input
              id="drip-share-growth"
              type="number"
              placeholder="0"
              {...field("annualShareGrowth")}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>
              Aporte mensal (R$){" "}
              <span className="text-slate-400 font-normal">opcional</span>
            </Label>
            <Input
              id="drip-monthly"
              type="number"
              placeholder="0"
              {...field("monthlyContribution")}
            />
          </div>
        </div>

        <Button
          id="drip-simular"
          className="w-full bg-emerald-600 hover:bg-emerald-700"
          onClick={handleCalc}
          disabled={loading}
        >
          {loading ? "Simulando..." : "Simular"}
        </Button>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {result && (
          <div id="drip-result" className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-slate-400">Valor futuro</p>
                <p
                  id="drip-future-value"
                  className="text-xl font-bold text-emerald-700"
                >
                  {fmt(result.futureValue)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Total aportado</p>
                <p className="text-xl font-bold text-slate-700">
                  {fmt(result.totalContributed)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Dividendos recebidos</p>
                <p className="text-xl font-bold text-slate-700">
                  {fmt(result.totalDividendsReceived)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Retorno total</p>
                <p className="text-xl font-bold text-emerald-600">
                  +{result.totalReturn}%
                </p>
              </div>
            </div>

            <div className="rounded-xl border overflow-hidden">
              <table id="drip-table" className="w-full text-sm">
                <thead className="bg-slate-100 text-slate-500">
                  <tr>
                    <th className="px-4 py-2 text-left">Ano</th>
                    <th className="px-4 py-2 text-right">Valor</th>
                    <th className="px-4 py-2 text-right">Dividendos</th>
                    <th className="px-4 py-2 text-right">Aportado</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearByYear.map((row) => (
                    <tr
                      key={row.year}
                      className="border-t hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-2 font-medium">{row.year}</td>
                      <td className="px-4 py-2 text-right text-emerald-700 font-medium">
                        {fmt(row.value)}
                      </td>
                      <td className="px-4 py-2 text-right text-slate-600">
                        {fmt(row.dividends)}
                      </td>
                      <td className="px-4 py-2 text-right text-slate-500">
                        {fmt(row.contributed)}
                      </td>
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
