import React, { useState } from "react";
import { Scale, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react";

interface LoginProps {
  onNavigate: (tab: string) => void;
  onLoginSuccess: (user: { name: string; email: string; role: "client" | "admin" }) => void;
}

export default function Login({ onNavigate, onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Silakan isi semua bidang formulir.");
      return;
    }

    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      // Demo credentials logic
      if (email === "admin@justitia.com" || password === "admin123") {
        onLoginSuccess({
          name: "Adv. Esa Unggul, S.H.",
          email: "admin@justitia.com",
          role: "admin",
        });
        onNavigate("admin-add-user");
      } else {
        // Default to Client Aulia Adela
        onLoginSuccess({
          name: "Aulia Adela",
          email: email || "aulia@ptabc.com",
          role: "client",
        });
        onNavigate("home");
      }
    }, 800);
  };

  const handleQuickLogin = (type: "client" | "admin") => {
    if (type === "client") {
      setEmail("aulia@ptabc.com");
      setPassword("password123");
    } else {
      setEmail("admin@justitia.com");
      setPassword("admin123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 px-6 py-12 relative overflow-hidden font-sans" id="login-screen-root">
      {/* Decorative vector background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_50%)]"></div>
      <div className="absolute top-12 left-12 flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate("landing")}>
        <div className="p-2 bg-slate-800 text-amber-400 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </div>
        <span className="text-sm font-medium text-slate-400 hover:text-white transition">Kembali ke Beranda</span>
      </div>

      <div className="w-full max-w-md relative bg-slate-950/80 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex p-3 bg-amber-400/10 text-amber-400 rounded-xl mb-2">
            <Scale className="h-8 w-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Selamat Datang Kembali</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Silakan masuk untuk melanjutkan konsultasi hukum dan memantau progres legalitas bisnis Anda secara real-time.
          </p>
        </div>

        {error && (
          <div className="flex items-start space-x-2.5 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg mb-6">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="login-email">
              Email Bisnis
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <Mail className="h-4 w-4" />
              </span>
              <input
                id="login-email"
                type="email"
                placeholder="aulia@ptabc.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider" htmlFor="login-password">
                Kata Sandi
              </label>
              <a href="#" className="text-xs text-amber-400 hover:underline">Lupa Sandi?</a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <Lock className="h-4 w-4" />
              </span>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            id="btn-submit-login"
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md hover:bg-amber-300 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <span>Masuk Sekarang</span>
            )}
          </button>
        </form>

        {/* Demo Fast Logins Grid */}
        <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
          <p className="text-[10px] text-center font-mono uppercase tracking-widest text-slate-500">
            Akses Peninjauan Cepat (Demo Mode)
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleQuickLogin("client")}
              className="py-2 px-3 bg-slate-900 border border-slate-800 hover:border-amber-400/50 rounded-lg text-xs font-semibold text-amber-400 flex flex-col items-center justify-center transition"
            >
              <span>Aulia Adela</span>
              <span className="text-[9px] text-slate-500 font-normal">Klien Pendirian PT</span>
            </button>
            <button
              onClick={() => handleQuickLogin("admin")}
              className="py-2 px-3 bg-slate-900 border border-slate-800 hover:border-amber-400/50 rounded-lg text-xs font-semibold text-amber-400 flex flex-col items-center justify-center transition"
            >
              <span>Adv. Esa Unggul</span>
              <span className="text-[9px] text-slate-500 font-normal">Consultant / Admin</span>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Belum terdaftar sebagai klien?{" "}
          <button onClick={() => onNavigate("register")} className="text-amber-400 hover:underline font-semibold bg-transparent border-none cursor-pointer">
            Daftar Akun Baru
          </button>
        </p>
      </div>
    </div>
  );
}
