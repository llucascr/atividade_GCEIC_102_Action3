import { ChartLine } from "lucide-react";

type SplashPageProps = {
    onFinish: () => void;
};

export default function SplashPage({
    onFinish,
}: SplashPageProps) {
    setTimeout(() => {
        onFinish();
    }, 1800);

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0f1117] flex items-center justify-center">
            <div className="relative z-10 w-[420px] bg-[#181c24]/80 border border-white/[0.07] backdrop-blur-xl rounded-3xl p-10 shadow-2xl">
                <div className="flex flex-col items-center text-center">
                    <div className="bg-emerald-600 p-5 rounded-2xl shadow-lg shadow-emerald-500/20 animate-pulse">
                        <ChartLine className="w-12 h-12 text-white" />
                    </div>

                    <h1 className="mt-6 text-3xl font-bold text-white">
                        DividendoApp
                    </h1>

                    <p className="mt-2 text-gray-400 text-sm">
                        Dashboard Financeiro
                    </p>

                    <div className="mt-8 w-full">
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-emerald-500" />
                        </div>
                    </div>

                    <p className="mt-4 text-xs text-gray-500">
                        Carregando sistema...
                    </p>
                </div>
            </div>
        </div>
    );
}