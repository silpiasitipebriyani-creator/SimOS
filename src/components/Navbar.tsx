import React, { useState } from "react";
import {
  Moon,
  Sun,
  Cpu,
  ShieldAlert,
  LogIn,
  LogOut,
  User,
  Menu,
  X,
  LayoutGrid,
  Users,
} from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (module: ActiveModule) => {
    onSelectModule(module);
    setIsMobileMenuOpen(false);
  };

  const isCpuActive = activeModule === "cpu" || activeModule === "cpu-quiz";
  const isDeadlockActive =
    activeModule === "deadlock" || activeModule === "deadlock-quiz";

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-3 lg:gap-6">
          <button
            type="button"
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-2.5 text-left group"
            title="Kembali ke Beranda"
          >
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-from to-to flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-ink leading-tight block">
                SimOS
              </span>
              <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Simulator CPU &amp; Deadlock
              </span>
            </div>
          </button>

          {/* Desktop Nav (Hidden on Mobile) */}
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80"
          >
            <button
              type="button"
              onClick={() => handleNavigate("home")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeModule === "home"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Pilih Modul
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("cpu")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                isCpuActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Penjadwalan CPU</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("deadlock")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                isDeadlockActive
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Deadlock</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("about")}
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

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="flex items-center gap-2 px-2.5 sm:px-3.5 py-2 sm:py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all border border-slate-200 dark:border-slate-700 shadow-xs"
            title="Ganti Mode Gelap / Terang"
            aria-label="Ganti Mode Gelap atau Terang"
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

          {/* Desktop Auth Controls */}
          <div className="hidden md:flex items-center">
            {currentUser ? (
              <div className="pl-2 ml-1 border-l border-slate-300 dark:border-slate-700 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleNavigate("profile")}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[120px] truncate">
                    {currentUser}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  className="p-1.5 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 transition-colors border border-red-200 dark:border-red-800/50"
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="pl-2 ml-1 border-l border-slate-300 dark:border-slate-700">
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
            className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-3 animate-fadeIn"
        >
          <nav aria-label="Navigasi mobile" className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => handleNavigate("home")}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeModule === "home"
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-slate-500" />
              <span>Pilih Modul</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("cpu")}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                isCpuActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Penjadwalan CPU</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("deadlock")}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                isDeadlockActive
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Deadlock</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavigate("about")}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                activeModule === "about"
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
            >
              <Users className="w-4 h-4 text-slate-500" />
              <span>About Us</span>
            </button>
          </nav>

          {/* Mobile Auth Section */}
          <div className="pt-2.5 border-t border-slate-200/80 dark:border-slate-800">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleNavigate("profile")}
                  className="flex-1 flex items-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {currentUser}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-bold transition-colors border border-red-200 dark:border-red-800/50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
