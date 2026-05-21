import { ChartLine } from "lucide-react";
import { useState } from "react";

const MOCK_USER = { login: "usuario1", password: "1234" };

interface Props { onLogin: () => void; }

export default function LoginPage({ onLogin }: Props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (login === MOCK_USER.login && password === MOCK_USER.password) {
            setError("");
            onLogin();
        } else {
            setError("Usuário ou senha invalidos.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#262a34] px-4 relative overflow-hidden">
            <div className="relative z-10 w-full max-w-sm bg-[#181c24] border border-white/[0.08] rounded-2xl p-8 shadow-xl shadow-white/10">

                <div className="flex flex-col items-center gap-3 mb-7 ">
                    <div className="bg-emerald-600 p-2 rounded-[14px]">
                        <ChartLine className="w-13 h-13 text-white" />
                    </div>
                    <p className="text-xl font-medium text-white">DividendoApp</p>
                    <p className="text-[15px] text-gray-500">Plataforma de cálculos financeiros</p>
                </div>

                <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 text-left">
                            Usuário
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"></span>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Digite seu usuário..."
                                value={login}
                                onChange={e => setLogin(e.target.value)}
                                className="w-full bg-[#0f1117] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-200 placeholder-gray-700 focus:outline-none focus:border-emerald-600 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 text-left">
                            Senha
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-[#0f1117] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-200 placeholder-gray-700 focus:outline-none focus:border-emerald-600 transition-colors"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="erro flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2 text-[13px] text-red-300">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-lg py-2.5 text-sm font-medium transition-all"
                    >
                        Entrar
                    </button>
                </form>

                <div className="mt-5 bg-[#0f1117] border border-white/[0.06] rounded-lg px-3 py-2.5 flex gap-4">
                    <span className="text-[12px] text-gray-600">Usuário: <span className="text-gray-500 font-medium">usuario1</span></span>
                    <span className="text-[12px] text-gray-600">Senha: <span className="text-gray-500 font-medium">1234</span></span>
                </div>
            </div>
        </div>
    );
}