import { useState } from "react";

const calculators = [
  {
    id: "yield",
    icon: "ti-trending-up",
    title: "Dividend Yield",
    color: "#059669",
    colorBg: "#d1fae5",
    colorText: "#065f46",
    tagline: "Quanto a ação paga em relação ao seu preço",
    what: "O Dividend Yield (DY) mede o retorno em dividendos de uma ação em relação ao seu preço atual. É expresso em porcentagem.",
    formula: "DY = (Dividendo Anual ÷ Preço da Ação) × 100",
    howTo: [
      "Informe o valor total de dividendos pagos no ano",
      "Informe o preço atual da ação",
      "O sistema calcula e classifica o resultado",
    ],
    classifications: [
      { label: "Alto (≥ 6%)", color: "#059669", bg: "#d1fae5" },
      { label: "Moderado (3–6%)", color: "#b45309", bg: "#fef3c7" },
      { label: "Baixo (< 3%)", color: "#dc2626", bg: "#fee2e2" },
    ],
    facts: [
      "Um DY muito alto pode indicar queda no preço da ação, não necessariamente generosidade da empresa.",
      "FIIs costumam ter DY entre 8% e 12% ao ano.",
      "Warren Buffett prefere empresas com DY sustentável de 2–4% com crescimento consistente.",
    ],
  },
  {
    id: "payout",
    icon: "ti-wallet",
    title: "Payout Ratio",
    color: "#d97706",
    colorBg: "#fef3c7",
    colorText: "#92400e",
    tagline: "Quanto do lucro a empresa distribui",
    what: "O Payout Ratio indica qual percentual do lucro líquido a empresa distribui como dividendos. O restante é retido para reinvestimento.",
    formula: "Payout = (DPS ÷ EPS) × 100",
    howTo: [
      "Informe o dividendo por ação (DPS)",
      "Informe o lucro por ação (EPS)",
      "O sistema calcula payout, retention e risco",
    ],
    classifications: [
      { label: "Baixo risco (≤ 50%)", color: "#059669", bg: "#d1fae5" },
      { label: "Moderado (50–75%)", color: "#b45309", bg: "#fef3c7" },
      { label: "Alto risco (> 75%)", color: "#dc2626", bg: "#fee2e2" },
    ],
    facts: [
      "Um payout acima de 100% significa que a empresa paga mais do que lucra — insustentável.",
      "Empresas em crescimento tendem a ter payout baixo para reinvestir no negócio.",
      "Utilities e REITs geralmente têm payouts altos por serem setores maduros.",
    ],
  },
  {
    id: "drip",
    icon: "ti-plant",
    title: "DRIP",
    color: "#0891b2",
    colorBg: "#e0f2fe",
    colorText: "#0c4a6e",
    tagline: "Reinvestimento automático de dividendos",
    what: "DRIP simula o efeito dos juros compostos quando dividendos são reinvestidos automaticamente ao longo do tempo.",
    formula: "Valor Futuro = f(investimento, DY, frequência, anos)",
    howTo: [
      "Informe o investimento inicial e o DY anual",
      "Defina o período e a frequência de pagamento",
      "Adicione aportes mensais opcionais",
      "Veja a projeção ano a ano",
    ],
    classifications: [
      { label: "Frequência anual", color: "#6366f1", bg: "#eef2ff" },
      { label: "Frequência trimestral", color: "#0891b2", bg: "#e0f2fe" },
      { label: "Frequência mensal", color: "#059669", bg: "#d1fae5" },
    ],
    facts: [
      "Reinvestir mensalmente gera mais retorno que anualmente — os dividendos entram em composição mais cedo.",
      "R$ 10.000 com DY de 8% por 20 anos viram mais de R$ 46.000 sem nenhum aporte adicional.",
      "Einstein teria chamado os juros compostos de 'a oitava maravilha do mundo'.",
    ],
  },
];

export default function HelpPage() {
  const [active, setActive] = useState("yield");
  const [factIdx, setFactIdx] = useState<Record<string, number>>({ yield: 0, payout: 0, drip: 0 });

  const calc = calculators.find(c => c.id === active)!;

  function nextFact() {
    setFactIdx(prev => ({ ...prev, [calc.id]: (prev[calc.id] + 1) % calc.facts.length }));
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 id="help-heading" className="text-3xl font-bold text-slate-800">Central de Ajuda</h1>
        <p className="text-slate-500">Entenda como cada calculadora funciona</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {calculators.map(c => (
          <button
            key={c.id}
            id={`help-tab-${c.id}`}
            onClick={() => setActive(c.id)}
            className={`rounded-2xl border p-4 text-left transition-all ${
              active === c.id
                ? "border-emerald-300 bg-emerald-50 shadow-sm"
                : "border-slate-200 bg-slate-50 hover:bg-white hover:shadow-sm"
            }`}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 text-lg"
              style={{ backgroundColor: c.colorBg, color: c.color }}
            >
              <i className={`ti ${c.icon}`} />
            </div>
            <p className="font-semibold !text-black text-sm">{c.title}</p>
            <p className="text-xs text-slate-500 mt-0.5 leading-snug">{c.tagline}</p>
          </button>
        ))}
      </div>
      
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3">
        <h2 className="font-semibold !text-black">O que é?</h2>
        <p className="text-sm text-slate-600 leading-relaxed">{calc.what}</p>
        <div className="rounded-xl px-4 py-3" style={{ backgroundColor: calc.colorBg }}>
          <p className="text-xs font-semibold mb-1" style={{ color: calc.colorText }}>Fórmula</p>
          <p id="help-formula" className="text-sm font-mono font-bold" style={{ color: calc.color }}>{calc.formula}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3">
        <h2 className="font-semibold !text-black">Como usar</h2>
        <ol className="space-y-2">
          {calc.howTo.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <span
                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                style={{ backgroundColor: calc.colorBg, color: calc.colorText }}
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3">
        <h2 className="font-semibold !text-black">Classificações</h2>
        <div className="flex flex-wrap gap-2">
          {calc.classifications.map((cl, i) => (
            <span
              key={i}
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: cl.bg, color: cl.color }}
            >
              {cl.label}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 text-lg">💡</span>
            <h2 className="font-semibold !text-black">Você sabia?</h2>
          </div>
          <button
            id="help-next-fact"
            onClick={nextFact}
            className="text-xs text-slate-500 border border-slate-200 bg-white rounded-lg px-3 py-1 hover:bg-slate-100 transition-colors"
          >
            próxima →
          </button>
        </div>
        <p id="help-fact-text" className="text-sm text-slate-600 leading-relaxed">
          {calc.facts[factIdx[calc.id]]}
        </p>
        <div className="flex gap-1 mt-3">
          {calc.facts.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all"
              style={{
                width: i === factIdx[calc.id] ? 20 : 6,
                backgroundColor: i === factIdx[calc.id] ? calc.color : "#cbd5e1",
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}