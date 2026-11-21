import React, { useEffect, useState } from "react";
import { ArrowLeft, BookmarkCheck, Clock, Loader2 } from "lucide-react";

interface SimulatorTopBarProps {
  currentUser?: string | null;
  savedNotice: string | null;
  onBack: () => void;
  onSave: () => void | Promise<void>;
  cooldownSeconds?: number;
}

export function SimulatorTopBar({
  currentUser,
  savedNotice,
  onBack,
  onSave,
  cooldownSeconds = 5,
}: SimulatorTopBarProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const isLoggedIn = Boolean(currentUser);

  useEffect(() => {
    if (!isLoggedIn) {
      setCooldown(0);
      setIsSaving(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = window.setInterval(() => {
      setCooldown((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [cooldown]);

  const isDisabled = isSaving || cooldown > 0;

  const handleSave = async () => {
    if (!isLoggedIn || isDisabled) return;

    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
      setCooldown(cooldownSeconds);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Pilihan Modul</span>
      </button>

      {isLoggedIn && (
        <div className="flex items-center gap-2">
          {savedNotice && (
            <span
              className={`text-xs font-semibold ${
                savedNotice.toLowerCase().startsWith("gagal")
                  ? "text-rose-500"
                  : "text-accent"
              }`}
            >
              {savedNotice}
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={isDisabled}
            aria-busy={isSaving}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-accent-soft text-accent border border-accent-border hover:bg-accent hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-accent-soft disabled:hover:text-accent"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : cooldown > 0 ? (
              <>
                <Clock className="w-3.5 h-3.5" />
                <span>Tunggu {cooldown}d...</span>
              </>
            ) : (
              <>
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>Simpan ke Riwayat Profil</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
