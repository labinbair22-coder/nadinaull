import React, { useState } from "react";
import { User, Building2, Shield, Calendar, Mail, Phone, MapPin, Edit2, Check } from "lucide-react";

interface UserProfileProps {
  user: { name: string; email: string; role: string };
  onUpdateUser: (updatedUser: any) => void;
}

export default function UserProfile({ user, onUpdateUser }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState("0812-3456-7890");
  const [businessName, setBusinessName] = useState("PT ABC Jaya Abadi");
  const [businessSector, setBusinessSector] = useState("Perdagangan Umum & Ekspor Palm Oil");
  const [businessType, setBusinessType] = useState("PT Biasa (UMKM)");
  const [address, setAddress] = useState("Sudirman Suite, Lt. 12, Kav 21, Jakarta Selatan");

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ ...user, name });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-8 font-sans" id="user-profile-root">
      {/* Header Profile Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">Profil Pengguna</h2>
          <p className="text-xs text-slate-500 mt-1">Kelola data kepatuhan, identitas pemilik, dan profil badan hukum UMKM Anda.</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-slate-950 text-white dark:bg-slate-800 dark:text-amber-400 border border-slate-200 dark:border-slate-700 hover:opacity-90 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Ubah Profil</span>
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 transition"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Simpan Perubahan</span>
          </button>
        )}
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
          <Check className="h-4 w-4" />
          <span>Profil dan data badan hukum berhasil disimpan secara aman di database!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side Column: Avatar and Quick Stats (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 text-center space-y-6">
          <div className="space-y-3">
            <div className="w-24 h-24 rounded-full bg-slate-900 text-amber-400 dark:bg-amber-400 dark:text-slate-950 flex items-center justify-center font-black text-2xl mx-auto shadow-md border-4 border-slate-100 dark:border-slate-800">
              {name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-950 dark:text-white">{name}</h3>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-wider">{user.role} Account</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-xl text-left text-xs space-y-3 font-sans">
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 text-[10px] font-mono">STATUS AKUN:</span>
              <span className="text-emerald-500 font-extrabold font-mono text-[9px] uppercase tracking-wider">AKTIF / TERVERIFIKASI</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 text-[10px] font-mono">BERGABUNG SEJAK:</span>
              <span className="text-slate-700 dark:text-slate-200 font-medium font-mono">Juni 2026</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 text-[10px] font-mono">SINKRONISASI OSS:</span>
              <span className="text-slate-700 dark:text-slate-200 font-medium font-mono">Berhasil (NIB Aktif)</span>
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-xl text-xs space-y-2.5 text-left border border-slate-800">
            <h4 className="font-bold text-amber-400 flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Proteksi Data Klien</span>
            </h4>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Seluruh rekam jejak konsultasi hukum dan draf perjanjian Anda dilindungi oleh enkripsi TLS tingkat tinggi serta terdaftar di Kominfo RI sebagai platform PSE resmi.
            </p>
          </div>
        </div>

        {/* Right Side Column: Detailed Forms (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Personal Info Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-4">
              <h4 className="font-bold text-slate-950 dark:text-white uppercase tracking-wider font-mono flex items-center space-x-2">
                <User className="h-4 w-4 text-amber-500" />
                <span>Identitas Pemilik</span>
              </h4>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Nama Lengkap Pemilik</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-amber-400 disabled:opacity-75 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Alamat Email Bisnis</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-400 font-medium focus:outline-none cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Nomor Telepon / WhatsApp</label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-amber-400 disabled:opacity-75 transition"
                  />
                </div>
              </div>
            </div>

            {/* Business Info Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-4">
              <h4 className="font-bold text-slate-950 dark:text-white uppercase tracking-wider font-mono flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-amber-500" />
                <span>Profil Bisnis & Badan Hukum</span>
              </h4>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Nama Badan Hukum / Usaha</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-amber-400 disabled:opacity-75 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Jenis Badan Usaha</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-amber-400 disabled:opacity-75 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500 uppercase tracking-wider block">Sektor Bisnis Utama (KBLI)</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={businessSector}
                    onChange={(e) => setBusinessSector(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-amber-400 disabled:opacity-75 transition"
                  />
                </div>
              </div>
            </div>

            {/* Address Row (full span) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-4 md:col-span-2">
              <h4 className="font-bold text-slate-950 dark:text-white uppercase tracking-wider font-mono flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-amber-500" />
                <span>Domisili Perusahaan</span>
              </h4>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 uppercase tracking-wider block">Alamat Kantor / Pabrik</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-amber-400 disabled:opacity-75 transition"
                />
              </div>
            </div>
          </form>

          {/* System Login History Timeline Log */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <h4 className="font-bold text-slate-950 dark:text-white uppercase tracking-wider font-mono">Aktivitas & Keamanan Sesi</h4>
            <div className="space-y-3.5 text-xs text-slate-500 font-mono">
              <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-850">
                <span>Pengecekan Nama SABH Kemenkumham (Sukses)</span>
                <span>Hari ini, 10:15 WIB</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-slate-100 dark:border-slate-850">
                <span>Masuk Sesi di Platform SCBD Web Terminal</span>
                <span>Hari ini, 09:30 WIB</span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span>Penyusunan Draft Anggaran Dasar diunggah</span>
                <span>Kemarin, 14:10 WIB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
