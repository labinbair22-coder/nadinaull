import React from "react";
import { Scale, FileText, ShieldCheck, Briefcase, Coins, ChevronRight, CheckCircle2, Star, Users, Building } from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onNavigate: (tab: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const services = [
    {
      title: "Notaris & Akta",
      desc: "Pendirian PT, CV, Yayasan, perubahan anggaran dasar, dan pembuatan akta otentik oleh Notaris rekanan resmi.",
      icon: FileText,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400",
      tag: "Populer"
    },
    {
      title: "Law Firm & Litigasi",
      desc: "Penyelesaian sengketa bisnis, peninjauan kontrak komersial, somasi, dan pendampingan hukum oleh advokat bersertifikat.",
      icon: Scale,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400",
    },
    {
      title: "Hak Kekayaan Intelektual (HKI)",
      desc: "Pendaftaran merek dagang, paten, hak cipta, dan perlindungan rahasia dagang untuk mengamankan aset orisinal bisnis Anda.",
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400",
      tag: "Penting"
    },
    {
      title: "Kepatuhan Hukum & OSS",
      desc: "Sertifikasi Halal, perizinan BPOM, pemenuhan standar lingkungan, dan pemeliharaan NIB berbasis risiko lewat OSS RBA.",
      icon: Briefcase,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30 dark:text-purple-400",
    },
    {
      title: "Konsultasi Pajak Usaha",
      desc: "Pelaporan SPT badan hukum, perencanaan pajak UMKM, kepatuhan PPN, serta pendampingan audit perpajakan resmi.",
      icon: Coins,
      color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans" id="landing-page-root">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-900 text-amber-400 dark:bg-amber-400 dark:text-slate-950 rounded-lg">
              <Scale className="h-6 w-6" id="logo-icon" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight font-sans block text-slate-950 dark:text-white">JUSTITIA PARTNERS</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono block -mt-1">Legal Tech Suite</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#layanan" className="text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition">Layanan Kami</a>
            <a href="#statistik" className="text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition">Tentang Kami</a>
            <a href="#testimoni" className="text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition">Testimoni</a>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate("login")}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition"
              id="btn-nav-login"
            >
              Masuk
            </button>
            <button
              onClick={() => onNavigate("register")}
              className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300 rounded-lg shadow-sm transition"
              id="btn-nav-register"
            >
              Daftar Klien
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 px-6 bg-radial from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 dark:bg-amber-400/10 text-amber-700 dark:text-amber-400 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-600 dark:bg-amber-400 animate-pulse"></span>
              <span>Integrasi Artificial Intelligence & Legal Advocates Indonesia</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1] font-sans">
              Solusi Hukum Terintegrasi untuk <span className="text-amber-600 dark:text-amber-400">UMKM</span> dan Bisnis Indonesia
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Justitia Partners hadir sebagai platform hukum tepercaya. Kami memadukan keahlian praktisi hukum senior dengan teknologi AI untuk mempermudah perizinan, pendirian badan hukum, perlindungan HKI, dan kepatuhan regulasi bisnis Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => onNavigate("register")}
                className="px-6 py-3 bg-slate-950 text-white dark:bg-amber-400 dark:text-slate-950 font-semibold rounded-lg shadow-md hover:bg-slate-800 dark:hover:bg-amber-300 flex items-center justify-center space-x-2 group transition"
                id="hero-btn-consult"
              >
                <span>Mulai Konsultasi Baru</span>
                <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition" />
              </button>
              <a
                href="#layanan"
                className="px-6 py-3 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition"
                id="hero-btn-services"
              >
                Pelajari Layanan
              </a>
            </div>

            {/* Micro proof badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800">
              <div>
                <span className="block text-2xl font-bold text-slate-950 dark:text-white">10.000+</span>
                <span className="text-xs text-slate-500 font-mono">UMKM Terbantu</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-slate-950 dark:text-white">99.4%</span>
                <span className="text-xs text-slate-500 font-mono">Pengesahan Berhasil</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-slate-950 dark:text-white">50+</span>
                <span className="text-xs text-slate-500 font-mono">Advokat & Notaris</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero Side Panel Visual Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-amber-500/10 dark:bg-amber-400/5 blur-3xl rounded-full"></div>
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-950 text-amber-400 dark:bg-amber-400 dark:text-slate-950 flex items-center justify-center font-bold font-mono">
                    J
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Justitia AI Chat</h3>
                    <p className="text-[10px] text-emerald-500 font-medium">● Online • Siap Membantu</p>
                  </div>
                </div>
                <div className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  v2.5
                </div>
              </div>

              <div className="space-y-4 text-xs font-sans h-56 overflow-y-auto mb-4 pr-1">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg max-w-[85%]">
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                    Halo! Saya Justitia AI. Ada berkas pendirian PT atau draf kontrak kerja sama (NDA) yang perlu saya periksa keseuaiannya dengan hukum Indonesia?
                  </p>
                </div>
                <div className="bg-amber-100 dark:bg-amber-950/50 p-3 rounded-lg max-w-[85%] ml-auto text-slate-900 dark:text-amber-100">
                  <p className="leading-relaxed">
                    Bagaimana syarat pendirian PT Biasa untuk pemula bisnis kuliner?
                  </p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg max-w-[85%]">
                  <p className="font-semibold text-slate-950 dark:text-white mb-1">Justitia AI:</p>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                    Berdasarkan UU Cipta Kerja terbaru, Anda membutuhkan minimal 2 pemegang saham, menyepakati nilai modal disetor (disarankan minimal Rp50 Juta), dan menentukan kode KBLI 2020 yang sesuai dengan usaha F&B Anda (misal 56101 untuk Restoran).
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik pertanyaan hukum..."
                  disabled
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs flex-1 cursor-not-allowed"
                />
                <button
                  onClick={() => onNavigate("login")}
                  className="bg-slate-950 dark:bg-amber-400 text-white dark:text-slate-950 px-3 py-2 rounded-lg text-xs font-medium hover:opacity-90 transition"
                >
                  Coba AI
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="layanan" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-12">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Layanan Hukum Komprehensif Kami</h2>
          <p className="text-slate-600 dark:text-slate-300">
            Dari legalitas dasar hingga perlindungan aset tingkat lanjut, tim ahli kami bersama asisten AI memproses perizinan Anda secara transparan dan aman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl hover:border-amber-500/50 dark:hover:border-amber-400/50 hover:shadow-lg transition-all group duration-300 relative"
              id={`service-card-${idx}`}
            >
              {svc.tag && (
                <span className="absolute top-4 right-4 text-[10px] font-bold tracking-wider uppercase px-2 py-1 bg-amber-500/15 text-amber-700 dark:text-amber-400 rounded-md">
                  {svc.tag}
                </span>
              )}
              <div className={`p-4 rounded-xl w-fit ${svc.color} mb-6`}>
                <svc.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                {svc.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                {svc.desc}
              </p>
              <button
                onClick={() => onNavigate("register")}
                className="text-sm font-semibold flex items-center space-x-1 text-slate-900 dark:text-amber-400 hover:opacity-80 transition group/link"
              >
                <span>Ajukan Pengurusan</span>
                <ChevronRight className="h-4 w-4 transform group-hover/link:translate-x-1 transition" />
              </button>
            </div>
          ))}

          {/* Quick AI Assist Card */}
          <div className="bg-slate-900 dark:bg-amber-950/20 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between text-white lg:col-span-1 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10">
              <Scale className="w-64 h-64 -mr-16 -mb-16" />
            </div>
            <div className="relative">
              <div className="inline-block px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider rounded-md mb-4">
                Asisten Virtual
              </div>
              <h3 className="text-2xl font-extrabold mb-3">Justitia AI Chat</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Ingin menganalisis draf surat perjanjian kerja, membandingkan pasal, atau mengecek kepatuhan legalitas usaha dalam hitungan detik? Coba asisten hukum virtual bertenaga Gemini model sekarang.
              </p>
            </div>
            <button
              onClick={() => onNavigate("login")}
              className="w-full py-3 bg-amber-400 text-slate-950 font-bold rounded-xl text-center hover:bg-amber-300 transition shadow-md block"
              id="landing-btn-try-ai"
            >
              Mulai Tanya Justitia AI
            </button>
          </div>
        </div>
      </section>

      {/* Proof and Trust Section */}
      <section id="statistik" className="bg-slate-100 dark:bg-slate-900/50 py-16 px-6 border-y border-slate-200 dark:border-slate-800 scroll-mt-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-xl space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight">Kenapa Pelaku Usaha Indonesia Memilih Justitia Partners?</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              Kami menyederhanakan birokrasi hukum Indonesia yang berbelit-belit. Melalui platform digital, setiap perkembangan dokumen dipantau langsung dalam status kanban, berkas diunggah secara terpusat, dan divalidasi langsung oleh Notaris & Pengacara rekanan terpilih.
            </p>
            <div className="space-y-3 pt-2 text-sm">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="font-medium">Keamanan Data Terjamin dengan enkripsi militer</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="font-medium">Notifikasi berkala via Whatsapp dan Email klien</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="font-medium">Harga transparan tanpa biaya tersembunyi</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 w-full lg:max-w-md">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <Users className="h-8 w-8 text-amber-500 mb-3" />
              <h4 className="text-3xl font-bold">12 Menit</h4>
              <p className="text-xs text-slate-500 font-mono mt-1">Rata-rata respons konsultasi awal</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <Building className="h-8 w-8 text-amber-500 mb-3" />
              <h4 className="text-3xl font-bold">34 Provinsi</h4>
              <p className="text-xs text-slate-500 font-mono mt-1">Cakupan pendirian badan hukum nasional</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <Scale className="h-8 w-8 text-amber-500 mb-3" />
              <h4 className="text-3xl font-bold">100%</h4>
              <p className="text-xs text-slate-500 font-mono mt-1">Legalitas sah Kemenkumham & OSS</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
              <ShieldCheck className="h-8 w-8 text-amber-500 mb-3" />
              <h4 className="text-3xl font-bold">99.4%</h4>
              <p className="text-xs text-slate-500 font-mono mt-1">Tingkat kepuasan & keberhasilan HKI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimoni" className="py-20 px-6 max-w-7xl mx-auto text-center scroll-mt-12">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">Dipercaya oleh Pemimpin Usaha Terbaik</h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-16">
          Berikut pendapat para pelaku bisnis dan pendiri UMKM Indonesia yang mendelegasikan kebutuhan legalitas perusahaan mereka kepada kami.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl">
            <div className="flex text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
              "Mendirikan PT ABC kemarin lewat Justitia Partners sangat lancar. Diskusi draft akta pendirian bisa dilakukan luring dengan Notaris dan dipantau transparan lewat papan kanban aplikasi. Sangat direkomendasikan untuk startup!"
            </p>
            <div>
              <span className="block font-bold text-slate-900 dark:text-white">Aulia Adela</span>
              <span className="text-xs text-slate-500 font-mono">CEO, PT ABC</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl">
            <div className="flex text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
              "Fitur Justitia AI sangat membantu usaha kedai kopi saya ketika mendraf kontrak kemitraan waralaba baru. Pasalnya dianalisis, lalu draf diperbaiki otomatis. Begitu ditinjau pengacara rekanan Justitia, langsung klop!"
            </p>
            <div>
              <span className="block font-bold text-slate-900 dark:text-white">Budi Setiawan</span>
              <span className="text-xs text-slate-500 font-mono">Founder, Kopi Kita Premium</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl">
            <div className="flex text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400" />)}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
              "Sebelumnya pusing mengurus sertifikasi BPOM dan Halal untuk UMKM F&B saya. Dengan pendampingan dari tim kepatuhan hukum Justitia Partners, semua dokumen persyaratan tersusun rapi dalam 1 minggu."
            </p>
            <div>
              <span className="block font-bold text-slate-900 dark:text-white">Siti Rahma</span>
              <span className="text-xs text-slate-500 font-mono">Pemilik, Dapur Rahma Nusantara</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-400 text-slate-950 rounded-lg">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-white tracking-tight">JUSTITIA PARTNERS</span>
              <span className="block text-[10px] text-slate-500 font-mono">Solusi Hukum Terintegrasi</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-mono text-center md:text-right">
            <p>© 2026 Justitia Partners. Dilindungi Undang-Undang.</p>
            <p className="mt-1">Advocates, Legal Advisors & Notary Public Network Indonesia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
