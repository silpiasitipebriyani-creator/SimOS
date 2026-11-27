import React, { useState } from "react";

interface AuthViewProps {
  onLoginSuccess: (username: string) => void;
}

export default function AuthView({ onLoginSuccess }: AuthViewProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const rawBaseUrl =
      import.meta.env.VITE_API_URL ||
      "https://backend-simos-production.up.railway.app";
    const baseUrl = rawBaseUrl.replace(/\/+$/, "");
    const endpoint = isLogin ? `${baseUrl}/login` : `${baseUrl}/register`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        if (isLogin) {
          onLoginSuccess(username);
        } else {
          setMessage("Registrasi berhasil! Silakan login.");
          setIsLogin(true);
          setPassword("");
        }
      } else {
        setMessage(data.error || `Terjadi kesalahan (${response.status})`);
      }
    } catch (error) {
      console.error("Detail error fetch:", error);
      setMessage("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-ink bg-surface backdrop-blur-md p-8 rounded-2xl border border-line shadow-2xl w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-secondary-ink">
        {isLogin ? "Login SimOS" : "Daftar SimOS"}
      </h2>

      <p className="text-center text-muted text-sm mb-6">
        Anda harus login terlebih dahulu untuk mengakses simulator.
      </p>

      {message && (
        <div className="mb-4 p-3 rounded-xl bg-accent-soft border border-accent-border text-accent text-sm text-center">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-muted mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 bg-elevated border border-line rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-ink placeholder-muted transition-colors"
            placeholder="Masukkan username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 bg-elevated border border-line rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-ink placeholder-muted transition-colors"
            placeholder="Masukkan password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white rounded-xl font-semibold transition-colors duration-200 shadow-lg shadow-accent/20"
        >
          {loading ? "Memproses..." : isLogin ? "Masuk" : "Daftar"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted">
        {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}
          className="text-secondary-ink hover:text-accent font-medium hover:underline focus:outline-none"
        >
          {isLogin ? "Daftar sekarang" : "Login di sini"}
        </button>
      </div>
    </div>
  );
}