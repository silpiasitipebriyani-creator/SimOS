import React from "react";
import { ArrowLeft, BookmarkCheck } from "lucide-react";

interface SimulatorTopBarProps {
  accentColor: "blue" | "emerald";
  savedNotice: string | null;
  onBack: () => void;
  onSave: () => void;
}

const ACCENT_STYLES = {
  blue: {
    backHover: "hover:text-blue-600 dark:hover:text-blue-400",
    saveButton:
      "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/60",
  },
  emerald: {
    backHover: "hover:text-emerald-600 dark:hover:text-emerald-400",
    saveButton:
      "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60",
  },
} as const;

export function SimulatorTopBar({
  accentColor,
  savedNotice,
  onBack,
  onSave,
}: SimulatorTopBarProps) {
  const styles = ACCENT_STYLES[accentColor];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <button
        onClick={onBack}
        className={`inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 transition-colors ${styles.backHover}`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Pilihan Modul</span>
      </button>

      <div className="flex items-center gap-2">
        {savedNotice && (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {savedNotice}
          </span>
        )}
        <button
          onClick={onSave}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${styles.saveButton}`}
        >
          <BookmarkCheck className="w-3.5 h-3.5" />
          <span>Simpan ke Riwayat Profil</span>
        </button>
      </div>
    </div>
  );
}
