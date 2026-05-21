import {
  Card,
  CardContent,
} from "../../components/ui/card";

import {
  ArrowUpRight,
} from "lucide-react";

const mockHistory = [
  {
    type: "Dividend Yield",
    input: "PETR4 — R$28 / R$32,50",
    result: "DY: 8.62% (high)",
    date: "19/05/2026",
  },
  {
    type: "Payout Ratio",
    input: "DPS: R$2,50 / EPS: R$4,00",
    result: "62.50% — moderate",
    date: "18/05/2026",
  },
  {
    type: "DRIP",
    input: "R$10.000 por 10 anos, DY 8%",
    result: "Futuro: R$48.320,00",
    date: "17/05/2026",
  },
];

export default function DashboardPage() {
  return (
    <main className="space-y-8">
      <section className="rounded-[32px] border bg-[#0f172a] p-8 md:p-10 shadow-2xl overflow-hidden relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 p-8 md:p-10">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-slate-200 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Sistema online
            </div>

            <h1 className="text-5xl font-bold text-white leading-tight">
              Dashboard Financeiro
            </h1>

            <p className="text-slate-300 text-lg mt-5 leading-relaxed">
              Visualize dividendos, payout ratios e
              projeções DRIP com uma interface moderna
              e intuitiva.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 min-w-[260px]">
            <p className="text-emerald-100 text-sm">
              Retorno total médio
            </p>

            <h2 className="text-5xl font-bold text-white mt-2">
              +183%
            </h2>

            <div className="flex items-center gap-2 mt-4 text-sm text-emerald-100">
              <ArrowUpRight className="w-4 h-4" />
              Crescimento nos últimos cálculos
            </div>
          </div>
        </div>
      </section>

      <Card
        className="border-0 rounded-[32px] bg-white/80 backdrop-blur-xl overflow-hidden"
      >
        <CardContent className="p-0">
          <div className="px-8 py-7 border-b border-slate-100 bg-white/60">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Histórico de cálculos
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Últimas simulações realizadas no
                  sistema
                </p>
              </div>

              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Atualizado agora
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {mockHistory.map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-slate-100 bg-gradient-to-r from-white to-slate-50/60 p-5 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-xl">
                      📈
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg">
                        {item.type}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {item.input}
                      </p>
                    </div>
                  </div>

                  <div className="md:text-right">
                    <p className="font-bold text-emerald-600 text-lg">
                      {item.result}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      {item.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}