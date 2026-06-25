import React, { useState } from "react";
import { Scale, Mail, User, Phone, Briefcase, FileText, ArrowLeft, Shield } from "lucide-react";

interface RegisterProps {
  onNavigate: (tab: string) => void;
  onRegisterSubmit: (formData: any) => void;
}

export default function Register({ onNavigate, onRegisterSubmit }: RegisterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState("PT");
  const [service, setService] = useState("Pendirian PT");
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !phone) {
      setError("Silakan lengkapi bidang nama, email, dan nomor telepon.");
      return;
    }

    if (!checkedTerms) {
      setError("Anda wajib menyetujui Ketentuan Layanan Justitia Partners.");
      return;
    }

    // Save registration form and transition to Email Verification
    onRegisterSubmit({ name, email, phone, businessType, service });
    onNavigate("verify-email");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-950 text-slate-100 font-sans" id="register-screen-root">
      {/* Left side: Information branding section (35%) */}
      <div className="lg:col-span-4 bg-slate-900 border-r border-slate-800 p-8 flex flex-col justify-between relative overflow-hidden hidden lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.06),transparent_40%)]"></div>
        <div className="relative">
          <div className="flex items-center space-x-3 cursor-pointer mb-12" onClick={() => onNavigate("landing")}>
            <div className="p-2 bg-slate-800 text-amber-400 rounded-lg">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-white block">JUSTITIA PARTNERS</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Legal Tech</span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold tracking-tight">Kemitraan Hukum Tanpa Hambatan</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Mulai pendaftaran badan usaha, pelaporan compliance, atau pendaftaran merek dagang Anda hari ini. Nikmati kemudahan pengelolaan berbasis digital:
            </p>

            <div className="space-y-4 pt-4 text-xs">
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-amber-400/10 text-amber-400 rounded-lg shrink-0">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Privasi Tingkat Militer</h4>
                  <p className="text-slate-400">Seluruh draf perjanjian kerahasiaan dan data identitas Anda dilindungi dengan enkripsi tinggi.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-amber-400/10 text-amber-400 rounded-lg shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Dasbor Real-Time</h4>
                  <p className="text-slate-400">Pantau progres pekerjaan, status akta kemenkumham, dan checklist tugas langsung lewat papan kanban.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 font-mono">
          Justitia Partners is a certified digital legal service provider in Indonesia.
        </div>
      </div>

      {/* Right side: Register Form (65%) */}
      <div className="lg:col-span-8 flex items-center justify-center p-8 relative">
        <div className="absolute top-12 left-12 flex items-center space-x-3 cursor-pointer lg:hidden" onClick={() => onNavigate("landing")}>
          <div className="p-2 bg-slate-800 text-amber-400 rounded-lg">
            <ArrowLeft className="h-4 w-4" />
          </div>
          <span className="text-xs text-slate-400">Kembali</span>
        </div>

        <div className="w-full max-w-xl bg-slate-900/40 border border-slate-800/80 p-8 rounded-2xl shadow-xl">
          <div className="space-y-2 mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Daftar Akun Client</h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Lengkapi data legalitas dasar Anda untuk mendaftarkan perizinan, membuat akun perusahaan, dan memulai pendampingan hukum terintegrasi.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-500/15 border border-rose-500/20 text-rose-400 text-xs rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider" htmlFor="reg-name">
                  Nama Lengkap Pemilik
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    id="reg-name"
                    type="text"
                    placeholder="Aulia Adela"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider" htmlFor="reg-email">
                  Email Bisnis
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="aulia@ptabc.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider" htmlFor="reg-phone">
                  Nomor Telepon / WhatsApp
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Phone className="h-4 w-4" />
                  </span>
                  <input
                    id="reg-phone"
                    type="tel"
                    placeholder="0812XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider" htmlFor="reg-businesstype">
                  Jenis Badan Usaha
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Briefcase className="h-4 w-4" />
                  </span>
                  <select
                    id="reg-businesstype"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition appearance-none cursor-pointer"
                  >
                    <option value="PT">PT (Perseroan Terbatas)</option>
                    <option value="CV">CV (Persekutuan Komanditer)</option>
                    <option value="PT Perorangan">PT Perorangan (UMK)</option>
                    <option value="Yayasan">Yayasan</option>
                    <option value="Perorangan">Usaha Dagang Perorangan</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider" htmlFor="reg-service">
                Layanan Hukum yang Dibutuhkan
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <FileText className="h-4 w-4" />
                </span>
                <select
                  id="reg-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition appearance-none cursor-pointer"
                >
                  <option value="Pendirian PT">Pendirian Badan Hukum (PT/CV)</option>
                  <option value="Pendaftaran Merek HKI">Pendaftaran Merek Dagang & HKI</option>
                  <option value="Legal Compliance & OSS">Audit Kepatuhan Hukum & OSS RBA</option>
                  <option value="Konsultasi Pajak Usaha">Konsultasi Pajak Usaha & SPT Badan</option>
                  <option value="Lainnya">Lainnya / Belum Yakin (Konsultasi Terbuka)</option>
                </select>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <input
                id="reg-terms"
                type="checkbox"
                checked={checkedTerms}
                onChange={(e) => setCheckedTerms(e.target.checked)}
                className="w-4.5 h-4.5 accent-amber-400 bg-slate-900 border-slate-800 rounded text-slate-950 mt-0.5 cursor-pointer"
              />
              <label htmlFor="reg-terms" className="text-xs text-slate-400 leading-relaxed select-none cursor-pointer">
                Saya menyatakan kebenaran informasi hukum di atas dan menyetujui <a href="#" className="text-amber-400 hover:underline">Ketentuan Layanan</a> serta <a href="#" className="text-amber-400 hover:underline">Kebijakan Privasi</a> dari Justitia Partners.
              </label>
            </div>

            <button
              id="btn-submit-register"
              type="submit"
              className="w-full py-3 bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md hover:bg-amber-300 transition-all flex items-center justify-center"
            >
              Daftar Sekarang
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Sudah terdaftar sebagai klien?{" "}
            <button onClick={() => onNavigate("login")} className="text-amber-400 hover:underline font-semibold bg-transparent border-none cursor-pointer">
              Masuk Akun Anda
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
