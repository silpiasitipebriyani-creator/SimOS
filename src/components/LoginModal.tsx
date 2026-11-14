import React from "react";
import AuthView from "./AuthView";

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

export function LoginModal({ onClose, onLoginSuccess }: LoginModalProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-[550px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 cursor-default"
      >
        <AuthView onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
}
