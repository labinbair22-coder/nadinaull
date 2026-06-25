import React, { useState } from "react";
import { FolderKanban, ShieldCheck, AlertCircle, ArrowRight, Clock, Scale, MessageSquare, Send } from "lucide-react";
import { Project, Task, ProjectDocument } from "../types";

interface HomeDashboardProps {
  projects: Project[];
  tasks: Task[];
  documents: ProjectDocument[];
  user: { name: string; email: string };
  onNavigateToTab: (tab: string, arg?: string) => void;
  onSendMessageToEsa: (text: string) => void;
}

export default function HomeDashboard({
  projects,
  tasks,
  documents,
  user,
  onNavigateToTab,
  onSendMessageToEsa
}: HomeDashboardProps) {
  const [quickReply, setQuickReply] = useState("");

  const activeProjects = projects.filter((p) => p.status === "active");
  const completedProjects = projects.filter((p) => p.status === "completed");
  const approvedDocs = documents.filter((d) => d.status === "approved");
  const pendingTasks = tasks.filter((t) => t.status !== "done" && t.assignedTo.includes("Aulia"));

  const handleQuickSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickReply.trim()) return;
    onSendMessageToEsa(quickReply);
    setQuickReply("");
    onNavigateToTab("messages");
  };

  return (
    <div className="space-y-8 font-sans" id="home-dashboard-root">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl shadow-xl">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Selamat Datang, {user.name}</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Semua progres perizinan, pendirian badan hukum, dan HKI Anda terpantau aman dan terverifikasi secara hukum di platform Justitia Partners.
          </p>
        </div>
        <button
          onClick={() => onNavigateToTab("ai-assistant")}
          className="px-5 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl hover:bg-amber-300 transition text-xs sm:text-sm w-fit shadow-md shrink-0 self-start md:self-auto"
        >
          Konsultasi Justitia AI
        </button>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex items-center space-x-5">
          <div className="p-4 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl">
            <FolderKanban className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 font-bold">Proyek Berjalan</span>
            <span className="block text-3xl font-extrabold text-slate-950 dark:text-white mt-1">{activeProjects.length} Proyek</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex items-center space-x-5">
          <div className="p-4 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 font-bold">Butuh Perhatian Anda</span>
            <span className="block text-3xl font-extrabold text-slate-950 dark:text-white mt-1">{pendingTasks.length} Tindakan</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex items-center space-x-5 col-span-1 sm:col-span-2 lg:col-span-1">
          <div className="p-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 font-bold">Dokumen Disetujui</span>
            <span className="block text-3xl font-extrabold text-slate-950 dark:text-white mt-1">{approvedDocs.length} Berkas</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Projects Table & Timeline Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Projects Progress Table */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Proyek Legal Terdaftar</h3>
              <p className="text-xs text-slate-500 mt-0.5">Pantau kemajuan pemrosesan dokumen secara langsung</p>
            </div>
            <button
              onClick={() => onNavigateToTab("projects")}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:opacity-80 flex items-center space-x-1"
            >
              <span>Selengkapnya</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Nama Proyek</th>
                  <th className="pb-3 font-semibold hidden sm:table-cell">Layanan</th>
                  <th className="pb-3 font-semibold">Progres</th>
                  <th className="pb-3 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {projects.map((proj) => (
                  <tr key={proj.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition">
                    <td className="py-4 pr-3">
                      <span className="font-bold text-slate-900 dark:text-white block group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                        {proj.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{proj.id.toUpperCase()}</span>
                    </td>
                    <td className="py-4 pr-3 hidden sm:table-cell">
                      <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-850 text-slate-700 dark:text-slate-300 rounded-lg font-medium text-[10px]">
                        {proj.type}
                      </span>
                    </td>
                    <td className="py-4 pr-3">
                      <div className="flex items-center space-x-3 w-32 sm:w-40">
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-400 h-full rounded-full transition-all duration-500"
                            style={{ width: `${proj.progress}%` }}
                          ></div>
                        </div>
                        <span className="font-bold font-mono text-[10px]">{proj.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => onNavigateToTab("projects", proj.id)}
                        className="p-1.5 bg-slate-100 hover:bg-amber-400 dark:bg-slate-800 dark:hover:bg-amber-400 hover:text-slate-950 rounded-lg transition"
                        title="Buka detail proyek"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right timeline side column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Chat Preview with Consultant */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-4">
            <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"
                  alt="Esa Unggul"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-950 dark:text-white">Esa Unggul, S.H., M.H.</h4>
                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Konsultan Hukum Utama</p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-850 rounded-xl space-y-1.5 text-xs">
              <span className="font-bold text-amber-600 dark:text-amber-400 font-mono text-[9px] uppercase tracking-wider">Pesan Terakhir</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "Bagaimana draft akta pendirian PT ABC? Apakah ada revisi dari Ibu Aulia?"
              </p>
            </div>

            <form onSubmit={handleQuickSend} className="flex gap-2">
              <input
                type="text"
                placeholder="Balas pesan konsultasi..."
                value={quickReply}
                onChange={(e) => setQuickReply(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-amber-400 transition"
              />
              <button
                type="submit"
                className="p-2 bg-slate-950 dark:bg-amber-400 text-white dark:text-slate-950 rounded-xl hover:opacity-90 transition shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Activity Logs Timeline */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-5">
            <div>
              <h3 className="text-sm font-extrabold text-slate-950 dark:text-white uppercase tracking-wider font-mono">Aktivitas Terkini</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Riwayat legalitas dan perubahan draf kontrak</p>
            </div>

            <div className="relative border-l-2 border-slate-100 dark:border-slate-800 pl-4 space-y-6 text-xs">
              {/* Event 1 */}
              <div className="relative">
                <span className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900"></span>
                <div>
                  <span className="font-mono text-[9px] text-slate-400">Hari ini, 10:15 WIB</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-1">Pengecekan Nama PT ABC Berhasil</p>
                  <p className="text-slate-500 mt-0.5 leading-relaxed text-[11px]">
                    Sistem kemenkumham menyatakan nama PT ABC disetujui untuk pemesanan oleh Notaris Budi Santoso.
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative">
                <span className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-blue-500 border-4 border-white dark:border-slate-900"></span>
                <div>
                  <span className="font-mono text-[9px] text-slate-400">Kemarin, 14:10 WIB</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-1">Draft Anggaran Dasar Diunggah</p>
                  <p className="text-slate-500 mt-0.5 leading-relaxed text-[11px]">
                    Consultant Esa Unggul menyelesaikan dan mengunggah berkas 'Draft Akta Anggaran Dasar - PT ABC.docx'.
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative">
                <span className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 border-4 border-white dark:border-slate-900"></span>
                <div>
                  <span className="font-mono text-[9px] text-slate-400">12 Juni 2026, 11:00 WIB</span>
                  <p className="font-bold text-slate-900 dark:text-white mt-1">Logo Merek Kopi Kita Terunggah</p>
                  <p className="text-slate-500 mt-0.5 leading-relaxed text-[11px]">
                    Klien Aulia Adela melampirkan berkas gambar logo untuk pelacakan orisinalitas di DJKI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
