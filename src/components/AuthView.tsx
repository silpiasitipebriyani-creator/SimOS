import React, { useState } from "react";

interface AuthViewProps {
  onLoginSuccess: (username: string) => void;
}

export default function AuthView({ onLoginSuccess }: AuthViewProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const baseUrl = import.meta.env.VITE_API_URL;
    const endpoint = isLogin ? `${baseUrl}/login` : `${baseUrl}/register`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          onLoginSuccess(username);
        } else {
          setMessage("Registrasi berhasil! Silakan login.");
          setIsLogin(true);
          setPassword("");
        }
      } else {
        setMessage(data.error || "Terjadi kesalahan");
      }
    } catch (error) {
      setMessage("Gagal terhubung ke server");
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-800 overflow-hidden">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-black bg-slate-900 backdrop-blur-md p-8 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
            {isLogin ? "Login SimOS" : "Daftar SimOS"}
          </h2>

          <p className="text-center text-slate-400 text-sm mb-6">
            Anda harus login terlebih dahulu untuk mengakses simulator.
          </p>

          {message && (
            <div className="mb-4 p-3 rounded bg-slate-800 border border-slate-700 text-blue-400 text-sm text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-slate-600 transition-colors"
                placeholder="Masukkan username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-slate-600 transition-colors"
                placeholder="Masukkan password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-colors duration-200 shadow-lg shadow-cyan-900/20"
            >
              {isLogin ? "Masuk" : "Daftar"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
              className="text-blue-600 hover:text-blue-500 font-medium hover:underline focus:outline-none"
            >
              {isLogin ? "Daftar sekarang" : "Login di sini"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
