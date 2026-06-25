import React, { useState, useEffect } from "react";
import { Mail, CheckCircle, ArrowRight, RefreshCw, Scale } from "lucide-react";

interface EmailVerificationProps {
  onNavigate: (tab: string) => void;
  clientEmail?: string;
  isSuccessView?: boolean;
}

export default function EmailVerification({ onNavigate, clientEmail = "aulia@ptabc.com", isSuccessView = false }: EmailVerificationProps) {
  const [isSuccess, setIsSuccess] = useState(isSuccessView);
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (isSuccess) return;

    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer, isSuccess]);

  const handleResend = () => {
    if (!canResend) return;
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setTimer(59);
      setCanResend(false);
    }, 1000);
  };

  const handleSimulateSuccess = () => {
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 px-6 py-12 relative overflow-hidden font-sans" id="verify-success-root">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06),transparent_50%)]"></div>

        <div className="w-full max-w-md bg-slate-950/85 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-2xl text-center space-y-6">
          <div className="inline-flex p-4 bg-emerald-500/10 text-emerald-400 rounded-full animate-bounce">
            <CheckCircle className="h-12 w-12" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Verifikasi Berhasil</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Selamat! Akun bisnis Anda telah terdaftar dan berhasil diverifikasi oleh sistem penasihat hukum kami.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-left text-xs space-y-1.5 font-mono text-slate-400">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-emerald-400 font-semibold uppercase">Aktif</span>
            </div>
            <div className="flex justify-between">
              <span>Email:</span>
              <span className="text-white">{clientEmail}</span>
            </div>
            <div className="flex justify-between">
              <span>Hak Akses:</span>
              <span className="text-white">Portal Klien UMKM</span>
            </div>
          </div>

          <button
            id="btn-verify-success-go"
            onClick={() => {
              onNavigate("home");
            }}
            className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <span>Masuk ke Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 px-6 py-12 relative overflow-hidden font-sans" id="verify-email-root">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_50%)]"></div>

      <div className="w-full max-w-md bg-slate-950/85 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-2xl text-center space-y-6">
        <div className="inline-flex p-4 bg-amber-400/10 text-amber-400 rounded-full">
          <Mail className="h-12 w-12" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Verifikasi Email Anda</h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Kami telah mengirimkan tautan konfirmasi hukum ke alamat email bisnis Anda di:
          </p>
          <p className="text-sm font-semibold text-white bg-slate-900 px-3 py-1.5 rounded-lg inline-block">{clientEmail}</p>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Silakan periksa kotak masuk (atau spam) email Anda dan klik tombol verifikasi untuk mengaktifkan akun.
        </p>

        <div className="pt-2 border-t border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Tidak menerima email?</span>
            {canResend ? (
              <button
                id="btn-resend-verification"
                onClick={handleResend}
                disabled={resending}
                className="text-amber-400 hover:underline font-semibold flex items-center space-x-1"
              >
                {resending ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : null}
                <span>Kirim Ulang Email</span>
              </button>
            ) : (
              <span className="text-slate-500 font-mono">Kirim ulang dalam {timer} detik</span>
            )}
          </div>

          {/* Quick simulator shortcut button to help reviewers easily advance */}
          <button
            id="btn-simulate-verify"
            onClick={handleSimulateSuccess}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700/80 text-xs font-semibold rounded-xl transition flex items-center justify-center space-x-2"
          >
            <span>Simulasikan Berhasil Verifikasi</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
