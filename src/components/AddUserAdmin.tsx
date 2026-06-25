import React, { useState } from "react";
import { UserPlus, ShieldCheck, Mail, User, Phone, Key, HelpCircle, Check, AlertCircle } from "lucide-react";

interface AddUserAdminProps {
  onAddUserSuccess: (newUser: any) => void;
}

export default function AddUserAdmin({ onAddUserSuccess }: AddUserAdminProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("client");
  const [password, setPassword] = useState("");
  const [sendVerifyMail, setSendVerifyMail] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleGeneratePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let generated = "";
    for (let i = 0; i < 10; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !name || !phone) {
      setError("Silakan lengkapi bidang email, nama lengkap, dan nomor telepon pengurus.");
      return;
    }

    if (!password) {
      setError("Silakan klik tombol 'Hasilkan Sandi Acak' untuk menjamin keamanan akses awal pengguna.");
      return;
    }

    // Success action
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      role,
      password,
      joinDate: new Date().toISOString().split("T")[0]
    };

    onAddUserSuccess(newUser);
    setSuccess(`Klien/Konsultan '${name}' berhasil didaftarkan! Tautan verifikasi serta kredensial akun rahasia telah berhasil diantrekan untuk dikirim ke: ${email}`);

    // Reset Form
    setEmail("");
    setName("");
    setPhone("");
    setRole("client");
    setPassword("");
  };

  return (
    <div className="space-y-8 font-sans" id="add-user-admin-root">
      {/* Top Banner */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">Tambah Pengguna Baru</h2>
        <p className="text-xs text-slate-500 mt-1">Daftarkan akun klien baru, rekan Notaris, atau pengacara asosiasi ke dalam portal manajemen Justitia Partners.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Create User Form (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-xs uppercase tracking-wider font-mono text-slate-950 dark:text-white flex items-center space-x-2">
              <UserPlus className="h-4.5 w-4.5 text-amber-500" />
              <span>Formulir Pendaftaran Akun Internal & Klien</span>
            </h3>
          </div>

          {error && <div className="p-3 bg-rose-500/15 border border-rose-500/20 text-rose-400 text-xs rounded-lg">{error}</div>}
          {success && <div className="p-3 bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-lg">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 uppercase tracking-wider block" htmlFor="adm-name">
                  Nama Lengkap Pengguna
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    id="adm-name"
                    type="text"
                    required
                    placeholder="Misal: Budi Santoso, S.H."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 uppercase tracking-wider block" htmlFor="adm-email">
                  Alamat Email Resmi
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    id="adm-email"
                    type="email"
                    required
                    placeholder="nama@perusahaan.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 uppercase tracking-wider block" htmlFor="adm-phone">
                  Nomor Kontak WhatsApp
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Phone className="h-4 w-4" />
                  </span>
                  <input
                    id="adm-phone"
                    type="tel"
                    required
                    placeholder="0812XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 uppercase tracking-wider block" htmlFor="adm-role">
                  Hak Akses & Peran Sistem
                </label>
                <select
                  id="adm-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400 font-medium cursor-pointer"
                >
                  <option value="client">Client (Pemilik UMKM/Korporasi)</option>
                  <option value="consultant">Legal Consultant (Advokat Senior)</option>
                  <option value="admin">Notaris Rekanan / Administrator</option>
                </select>
              </div>
            </div>

            {/* Password security generation */}
            <div className="p-4 bg-slate-50 dark:bg-slate-850/60 rounded-2xl border border-slate-200/50 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-8 space-y-1">
                <label className="font-bold text-slate-500 uppercase tracking-wider block">Kata Sandi Akses Rahasia</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                    <Key className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    readOnly
                    placeholder="Hasilkan sandi acak di bawah..."
                    value={password}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-slate-900 dark:text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="sm:col-span-4 self-end">
                <button
                  type="button"
                  onClick={handleGeneratePassword}
                  className="w-full py-2 bg-slate-950 text-white dark:bg-slate-850 dark:hover:bg-slate-800 border border-slate-800 hover:border-slate-600 rounded-xl font-bold transition text-[11px]"
                >
                  Hasilkan Sandi Acak
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-1.5">
              <input
                id="adm-verify-toggle"
                type="checkbox"
                checked={sendVerifyMail}
                onChange={(e) => setSendVerifyMail(e.target.checked)}
                className="w-4.5 h-4.5 accent-amber-400 bg-slate-50 border-slate-200 dark:border-slate-800 rounded cursor-pointer"
              />
              <label htmlFor="adm-verify-toggle" className="text-xs text-slate-400 leading-none select-none cursor-pointer font-medium">
                Kirimkan email aktivasi hukum & salinan sandi sekarang juga secara otomatis.
              </label>
            </div>

            <button
              id="btn-admin-add-user"
              type="submit"
              className="w-full py-3 bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md hover:bg-amber-300 transition"
            >
              Daftar Pengguna Baru
            </button>
          </form>
        </div>

        {/* Right Side: Info Guidelines (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-950 text-white border border-slate-800 rounded-2xl p-6 space-y-5 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.06),transparent_40%)]"></div>
            <div className="relative">
              <div className="p-3 bg-amber-400/10 text-amber-400 rounded-full w-fit mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-extrabold uppercase tracking-wider font-mono">Keamanan Data Terjamin</h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-2.5">
                Portal Justitia Partners beroperasi di bawah standar keamanan digital nasional yang diawasi langsung oleh Dewan Kehormatan Notaris Indonesia:
              </p>

              <div className="space-y-4 pt-5 text-xs">
                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0 mt-2"></div>
                  <div>
                    <h5 className="font-bold text-slate-200">Sandi Terenkripsi Satu Arah</h5>
                    <p className="text-slate-400">Kata sandi yang dihasilkan otomatis diacak secara kriptografis menggunakan algoritma SHA-256 sebelum disimpan di basis data aman kami.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0 mt-2"></div>
                  <div>
                    <h5 className="font-bold text-slate-200">Kebijakan Zero-Trust Access</h5>
                    <p className="text-slate-400">Masing-masing hak akses dibatasi secara ketat berdasarkan klasifikasi penugasan proyek. Klien tidak dapat melihat berkas milik klien korporasi lain.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
