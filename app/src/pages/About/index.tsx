import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function AboutPage() {

  // TODO: não esquecer de colocar as fotos
  const integrantes = [
    { nome: "Letícia Sumida", cargo: "Desenvolvedora", foto: "/react.svg" },
    { nome: "Lucas Ranzani", cargo: "Desenvolvedor", foto: "/react.svg" },
    { nome: "Luis Silva", cargo: "Desenvolvedor", foto: "/react.svg" },
  ];

  return (
    <main className="space-y-6">
      <div>
        <h1 id="about-heading" className="text-3xl font-bold text-slate-800">Sobre</h1>
        <p className="text-slate-500">Informações do projeto</p>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Sobre o sistema</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-slate-600">
          <p>O DividendoApp é uma aplicação para cálculos financeiros baseada em dividendos.</p>
          <p>Desenvolvido utilizando React, TypeScript e shadcn/ui.</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>
            Equipe
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {integrantes.map((item, index) => (
              <Card key={index} className="border bg-slate-50">
                <CardContent className="pt-6 text-center">
                  <img
                    src={item.foto}
                    alt={item.nome}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-slate-800">{item.nome}</h3>
                  <p className="text-sm text-slate-500">{item.cargo}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}