import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export default function DividendYieldTab() {
  const [dividend, setDividend] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState<{ value: number; classification: string } | null>(null);

  function handleCalc() {
    const d = Number(dividend);
    const p = Number(price);
    if (!d || !p || p <= 0) return;
    const value = parseFloat(((d / p) * 100).toFixed(2));
    const classification = value >= 6 ? "high" : value >= 3 ? "moderate" : "low";
    setResult({ value, classification });
  }

  const classColor: Record<string, string> = {
    high: "text-emerald-600", moderate: "text-yellow-600", low: "text-red-500",
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Dividend Yield</CardTitle>
        <CardDescription>Relação entre dividendos e preço da ação</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Dividendo anual</Label>
            <Input type="number" placeholder="2.80" value={dividend} onChange={e => setDividend(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Preço da ação</Label>
            <Input type="number" placeholder="32.50" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
        </div>

        <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleCalc}>
          Calcular
        </Button>

        {result && (
          <div className="rounded-xl bg-slate-50 p-6 space-y-1">
            <p className="text-sm text-slate-500">Resultado</p>
            <h2 className="text-4xl font-bold text-emerald-700">{result.value}%</h2>
            <p className={`text-sm font-medium capitalize ${classColor[result.classification]}`}>
              Classificação: {result.classification}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}