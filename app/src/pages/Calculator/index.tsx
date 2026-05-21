import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import DividendYieldTab from "./components/DividendYieldTab";
import DRIPTab from "./components/DRIPTab";
import PayoutRatioTab from "./components/PayoutRatioTab";

export default function CalculatorsPage() {
  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Calculadoras</h1>
        <p className="text-slate-500">Realize cálculos financeiros</p>
      </div>

      <Tabs defaultValue="yield">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger id="tab-yield" value="yield">Dividend Yield</TabsTrigger>
          <TabsTrigger id="tab-payout" value="payout">Payout</TabsTrigger>
          <TabsTrigger id="tab-drip" value="drip">DRIP</TabsTrigger>
        </TabsList>
        <TabsContent value="yield"><DividendYieldTab /></TabsContent>
        <TabsContent value="payout"><PayoutRatioTab /></TabsContent>
        <TabsContent value="drip"><DRIPTab /></TabsContent>
      </Tabs>
    </main>
  );
}