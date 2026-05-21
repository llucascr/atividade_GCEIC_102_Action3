import { useState } from "react";

import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import CalculatorsPage from "./pages/Calculator";
import AboutPage from "./pages/About";
import HelpPage from "./pages/Help";
import { ChartLine } from "lucide-react";

type Page = "login" | "dashboard" | "calculators" | "about" | "help";

const navItems: { id: Page; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "calculators", label: "Calculadoras" },
  { id: "about", label: "Sobre" },
  { id: "help", label: "Ajuda" },
];

export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPage("login");
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-full bg-[#0f1117]">
      <header className="sticky top-0 z-50 bg-[#181c24]/80 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <button
            id="logo-home"
            onClick={() => setPage("dashboard")}
            className="flex items-center gap-3"
          >
            <div className="bg-emerald-600 p-2 rounded-[10px]">
              <ChartLine className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-[#f0f0ee] leading-none pb-1">DividendoApp</p>
              <p className="text-[13px] text-gray-500 leading-none mt-0.5">Dashboard Financeiro</p>
            </div>
          </button>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setPage(item.id)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150
                  ${page === item.id
                    ? "bg-emerald-600 text-white"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.06]"
                  }
                `}
              >
                {item.label}
              </button>
            ))}

            <button
              id="nav-logout"
              onClick={handleLogout}
              className="ml-2 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        {page === "dashboard" && <DashboardPage />}
        {page === "calculators" && <CalculatorsPage />}
        {page === "about" && <AboutPage />}
        {page === "help" && <HelpPage />}
      </main>
    </div>
  );
}