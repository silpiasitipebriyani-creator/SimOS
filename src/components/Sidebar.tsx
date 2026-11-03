import React from 'react';
import {
  LayoutDashboard,
  Cpu,
  ShieldAlert,
  GraduationCap,
  Moon,
  Sun,
  Database,
  RefreshCw,
  X,
  Sparkles,
} from 'lucide-react';

export type NavTab = 'dashboard' | 'cpu' | 'deadlock' | 'quiz';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenBackupModal: () => void;
  onResetAllData: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isDarkMode,
  onToggleDarkMode,
  onOpenBackupModal,
  onResetAllData,
  isMobileOpen,
  onCloseMobile,
}) => {
  const menuItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Dashboard & Konsep',
      description: 'Ringkasan & Matriks Teori',
      icon: LayoutDashboard,
      badge: 'Utama',
    },
    {
      id: 'cpu' as NavTab,
      label: 'Penjadwalan CPU',
      description: 'FCFS, SJF, SRTF, RR & Gantt',
      icon: Cpu,
      badge: '4 Algoritma',
    },
    {
      id: 'deadlock' as NavTab,
      label: 'Penanganan Deadlock',
      description: 'Banker\'s Algorithm & Safe State',
      icon: ShieldAlert,
      badge: 'Banker',
    },
    {
      id: 'quiz' as NavTab,
      label: 'Kuis Interaktif',
      description: 'Evaluasi & Auto-grading',
      icon: GraduationCap,
      badge: '12 Soal',
    },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Brand Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                    SimOS
                  </h1>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                    v2.5
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
                  Simulator CPU & Deadlock
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center: Navigation Menus */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Modul Utama
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full group flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50/90 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 shadow-xs border border-blue-200/80 dark:border-blue-800/80 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div
                  className={`mt-0.5 p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold truncate">
                      {item.label}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                        isActive
                          ? 'bg-blue-200/60 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}

          <div className="pt-4 px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Fitur Cepat
          </div>

          <div className="px-1 space-y-1">
            <button
              onClick={onOpenBackupModal}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Ekspor / Impor JSON</span>
            </button>
            <button
              onClick={onResetAllData}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Muat Ulang Standar Preset</span>
            </button>
          </div>
        </div>

        {/* Bottom: Progres & Theme Toggle */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          {/* Quick Tip Pill */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/80 dark:to-slate-800/40 border border-blue-100 dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 dark:text-blue-300 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Auto-Save Aktif</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Semua data proses dan matriks tersimpan otomatis di penyimpanan lokal (Local Storage).
            </p>
          </div>

          {/* Theme & Profile Bar */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={onToggleDarkMode}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Ganti Mode Gelap / Terang"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Mode Terang</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>Mode Gelap</span>
                </>
              )}
            </button>

            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              Client-side SPA
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
