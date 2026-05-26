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
import { api, type DividendYieldResult } from "../../../lib/api";

export default function DividendYieldTab() {
  const [dividend, setDividend] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState<DividendYieldResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCalc() {
    const d = Number(dividend);
    const p = Number(price);
    if (!d || !p || p <= 0) return;
    setError("");
    setLoading(true);
    try {
      const data = await api.calculateYield(d, p);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao calcular.");
    } finally {
      setLoading(false);
    }
  }

  const classColor: Record<string, string> = {
    very_high: "text-emerald-600",
    high: "text-emerald-600",
    moderate: "text-yellow-600",
    low: "text-red-500",
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Dividend Yield</CardTitle>
        <CardDescription>
          Relação entre dividendos e preço da ação
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Dividendo anual</Label>
            <Input
              id="dy-dividend"
              type="number"
              placeholder="2.80"
              value={dividend}
              onChange={(e) => setDividend(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Preço da ação</Label>
            <Input
              id="dy-price"
              type="number"
              placeholder="32.50"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <Button
          id="dy-calcular"
          className="w-full bg-emerald-600 hover:bg-emerald-700"
          onClick={handleCalc}
          disabled={loading}
        >
          {loading ? "Calculando..." : "Calcular"}
        </Button>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {result && (
          <div id="dy-result" className="rounded-xl bg-slate-50 p-6 space-y-1">
            <p className="text-sm text-slate-500">Resultado</p>
            <p
              id="dy-result-value"
              className="text-4xl font-bold text-slate-800"
            >
              {result.dividendYield}%
            </p>
            <p
              id="dy-result-class"
              className={`text-sm font-medium capitalize ${classColor[result.classification]}`}
            >
              Classificação: {result.classification.replace("_", " ")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
