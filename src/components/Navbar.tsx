import React from "react";
import { Moon, Sun, Cpu, ShieldAlert, LogIn, LogOut, User } from "lucide-react";
import { ActiveModule } from "../types";

interface NavbarProps {
  activeModule: ActiveModule;
  onSelectModule: (module: ActiveModule) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentUser: string | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export function Navbar({
  activeModule,
  onSelectModule,
  isDarkMode,
  onToggleDarkMode,
  currentUser,
  onOpenLogin,
  onLogout,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={() => onSelectModule("home")}
            className="flex items-center gap-2.5 text-left group"
            title="Kembali ke Beranda"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white block leading-tight">
                SimOS
              </span>
              <span className="text-[10px] text-slate-400 font-medium block">
                Simulator CPU & Deadlock
              </span>
            </div>
          </button>

          <nav className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80">
            <button
              onClick={() => onSelectModule("home")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeModule === "home"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Pilih Modul
            </button>

            <button
              onClick={() => onSelectModule("cpu")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeModule === "cpu" || activeModule === "cpu-quiz"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Penjadwalan CPU</span>
            </button>

            <button
              onClick={() => onSelectModule("deadlock")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeModule === "deadlock" || activeModule === "deadlock-quiz"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Deadlock</span>
            </button>

            <button
              onClick={() => onSelectModule("about")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeModule === "about"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              About Us
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDarkMode}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 shadow-xs"
            title="Ganti Mode Gelap / Terang"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="hidden sm:inline">Terang</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                <span className="hidden sm:inline">Gelap</span>
              </>
            )}
          </button>

          {currentUser ? (
            <div className="pl-2 ml-1 border-l border-slate-300 dark:border-slate-700 flex items-center gap-3">
              <button
                onClick={() => onSelectModule("profile")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {currentUser}
                </span>
              </button>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 transition-colors border border-red-200 dark:border-red-800/50"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="pl-2 ml-1 border-l border-slate-300 dark:border-slate-700">
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
