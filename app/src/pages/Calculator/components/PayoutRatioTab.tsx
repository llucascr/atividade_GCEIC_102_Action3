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
import { api, type PayoutRatioResult } from "../../../lib/api";

export default function PayoutRatioTab() {
  const [dps, setDps] = useState("");
  const [eps, setEps] = useState("");
  const [result, setResult] = useState<PayoutRatioResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCalc() {
    setError("");
    setResult(null);
    const d = Number(dps);
    const e = Number(eps);
    if (!d || !e || e <= 0) {
      setError("EPS deve ser positivo.");
      return;
    }
    setLoading(true);
    try {
      const data = await api.calculatePayout(d, e);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao calcular.");
    } finally {
      setLoading(false);
    }
  }

  const riskColor: Record<string, string> = {
    low: "text-emerald-600",
    moderate: "text-yellow-600",
    high: "text-red-500",
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Payout Ratio</CardTitle>
        <CardDescription>
          Proporção do lucro distribuída como dividendo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Dividendo por ação (DPS)</Label>
            <Input
              id="payout-dps"
              type="number"
              placeholder="2.50"
              value={dps}
              onChange={(e) => setDps(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Lucro por ação (EPS)</Label>
            <Input
              id="payout-eps"
              type="number"
              placeholder="4.00"
              value={eps}
              onChange={(e) => setEps(e.target.value)}
            />
          </div>
        </div>

        <Button
          id="payout-calcular"
          className="w-full bg-emerald-600 hover:bg-emerald-700"
          onClick={handleCalc}
          disabled={loading}
        >
          {loading ? "Calculando..." : "Calcular"}
        </Button>

        {error && (
          <p id="payout-error" className="text-sm text-red-500">
            {error}
          </p>
        )}

        {result && (
          <div
            id="payout-result"
            className="rounded-xl bg-slate-50 p-6 space-y-3"
          >
            <p className="text-sm text-slate-500">Resultado</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400">Payout Ratio</p>
                <p
                  id="payout-value"
                  className="text-3xl font-bold text-emerald-700"
                >
                  {result.payoutRatio}%
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Retention Ratio</p>
                <p
                  id="payout-retention"
                  className="text-3xl font-bold text-slate-700"
                >
                  {result.retentionRatio}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <span
                id="payout-risk"
                className={`text-sm font-medium capitalize ${riskColor[result.risk]}`}
              >
                Risco: {result.risk}
              </span>
              <span
                id="payout-status"
                className={`text-sm font-medium ${result.isSustainable ? "text-emerald-600" : "text-red-500"}`}
              >
                • {result.isSustainable ? "Sustentável" : "Insustentável"}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
