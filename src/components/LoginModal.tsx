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
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-md p-4 cursor-pointer"
    >
      <div onClick={(e) => e.stopPropagation()}>
        <AuthView onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
}
