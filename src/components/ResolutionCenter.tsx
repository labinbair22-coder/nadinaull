import React, { useState } from "react";
import {
  LifeBuoy,
  Plus,
  Send,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Folder,
  Tag,
  Paperclip
} from "lucide-react";
import { Ticket, FAQItem, Project } from "../types";

interface ResolutionCenterProps {
  tickets: Ticket[];
  projects: Project[];
  faqs: FAQItem[];
  user: { name: string; email: string };
  onUpdateTickets: (updatedTickets: Ticket[]) => void;
}

export default function ResolutionCenter({
  tickets,
  projects,
  faqs,
  user,
  onUpdateTickets
}: ResolutionCenterProps) {
  // Ticket Form States
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketCategory, setTicketCategory] = useState("Masalah Teknis Dokumen");
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || "");
  const [ticketDesc, setTicketDesc] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Accordion active index
  const [activeFaqId, setActiveFaqId] = useState<string | null>("faq-1");

  // Selected Active Ticket Chat Room
  const [activeTicketId, setActiveTicketId] = useState<string | null>(tickets[0]?.id || null);
  const [ticketReply, setTicketReply] = useState("");

  const activeTicket = tickets.find((t) => t.id === activeTicketId);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!ticketTitle.trim() || !ticketDesc.trim()) {
      setError("Silakan isi judul pengaduan dan deskripsi kronologi masalah secara lengkap.");
      return;
    }

    const newTicket: Ticket = {
      id: `tick-${Date.now()}`,
      ticketNumber: `TKT-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: ticketTitle,
      category: ticketCategory,
      projectId: selectedProjectId,
      description: ticketDesc,
      status: "active",
      dateSubmitted: new Date().toISOString().split("T")[0],
      responses: [
        {
          id: `tr-${Date.now()}`,
          senderName: user.name,
          senderRole: "client",
          content: ticketDesc,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16)
        }
      ]
    };

    const updated = [newTicket, ...tickets];
    onUpdateTickets(updated);
    setActiveTicketId(newTicket.id);

    // Reset Form
    setTicketTitle("");
    setTicketDesc("");
    setSuccess("Aduan legalitas berhasil dikirim! Tim Kepatuhan Hukum Justitia Partners akan memproses dan memberikan solusi dalam waktu maksimal 2 jam.");

    setTimeout(() => {
      setSuccess("");
    }, 4000);
  };

  const handleTicketReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketReply.trim() || !activeTicket) return;

    const newResponse = {
      id: `tr-rep-${Date.now()}`,
      senderName: user.name,
      senderRole: "client" as const,
      content: ticketReply,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16)
    };

    const updatedTickets = tickets.map((t) => {
      if (t.id === activeTicket.id) {
        return {
          ...t,
          responses: [...t.responses, newResponse]
        };
      }
      return t;
    });

    onUpdateTickets(updatedTickets);
    setTicketReply("");

    // Simulate Notary/Consultant reply after 1.2s
    setTimeout(() => {
      const simulatedAdminResponse = {
        id: `tr-admin-${Date.now()}`,
        senderName: "Esa Unggul (Legal Consultant)",
        senderRole: "consultant" as const,
        content: "Baik, berkas sengketa/aduan Anda sudah diteruskan ke divisi pengawasan Notaris rekanan. Kami akan menyelesaikan sinkronisasi data ini segera.",
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 16)
      };

      const finalTickets = updatedTickets.map((t) => {
        if (t.id === activeTicket.id) {
          return {
            ...t,
            responses: [...t.responses, simulatedAdminResponse]
          };
        }
        return t;
      });
      onUpdateTickets(finalTickets);
    }, 1200);
  };

  const handleCloseTicket = (ticketId: string) => {
    const updated = tickets.map((t) => {
      if (t.id === ticketId) {
        return { ...t, status: "resolved" as const };
      }
      return t;
    });
    onUpdateTickets(updated);
  };

  return (
    <div className="space-y-8 font-sans" id="resolution-center-root">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">Pusat Resolusi & Pengaduan</h2>
        <p className="text-xs text-slate-500 mt-1">Kami berkomitmen menjaga transparansi hukum. Ajukan resolusi atas kendala administrasi dokumen Anda di sini.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Submit New Ticket (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-5 h-fit">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-xs uppercase tracking-wider font-mono text-slate-950 dark:text-white flex items-center space-x-2">
              <Plus className="h-4 w-4 text-amber-500" />
              <span>Buat Tiket Pengaduan Baru</span>
            </h3>
          </div>

          {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg">{error}</div>}
          {success && <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-lg">{success}</div>}

          <form onSubmit={handleSubmitTicket} className="space-y-4 text-xs font-sans">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-500 uppercase tracking-wider block" htmlFor="tick-sub">
                Subjek / Masalah Singkat
              </label>
              <input
                id="tick-sub"
                type="text"
                required
                placeholder="Misal: Kendala pemrosesan NIB di sistem OSS"
                value={ticketTitle}
                onChange={(e) => setTicketTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 uppercase tracking-wider block" htmlFor="tick-proj">
                  Kaitkan Proyek
                </label>
                <div className="relative">
                  <select
                    id="tick-proj"
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400 appearance-none cursor-pointer"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 uppercase tracking-wider block" htmlFor="tick-cat">
                  Kategori Kendala
                </label>
                <div className="relative">
                  <select
                    id="tick-cat"
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400 appearance-none cursor-pointer"
                  >
                    <option value="Masalah Teknis Dokumen">Masalah Teknis Dokumen</option>
                    <option value="Revisi Anggaran Dasar">Revisi Anggaran Dasar</option>
                    <option value="Pembayaran PNBP">Kendala Pembayaran PNBP</option>
                    <option value="Regulasi & Birokrasi">Sengketa Birokrasi / OSS</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-500 uppercase tracking-wider block" htmlFor="tick-desc">
                Deskripsi & Kronologi Masalah
              </label>
              <textarea
                id="tick-desc"
                required
                rows={4}
                placeholder="Tuliskan secara jelas kendala dan data spesifik yang Anda temukan agar tim kami langsung melakukan koreksi berkas..."
                value={ticketDesc}
                onChange={(e) => setTicketDesc(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
              ></textarea>
            </div>

            <button
              id="btn-submit-ticket"
              type="submit"
              className="w-full py-3 bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md hover:bg-amber-300 transition"
            >
              Kirim Tiket Solusi
            </button>
          </form>
        </div>

        {/* Center/Right Panel: Ticket Dialogue (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Ticket dialog panel */}
          {activeTicket ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col h-[480px]">
              {/* Ticket header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/25 shrink-0">
                <div className="overflow-hidden mr-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-xs text-amber-600 dark:text-amber-400">{activeTicket.ticketNumber}</span>
                    <span className="text-[10px] uppercase font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 font-mono">
                      {activeTicket.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-950 dark:text-white truncate mt-1">{activeTicket.title}</h4>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {activeTicket.status === "active" ? (
                    <span className="text-[9px] uppercase font-bold tracking-wider font-mono text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                      Diproses
                    </span>
                  ) : (
                    <span className="text-[9px] uppercase font-bold tracking-wider font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      Selesai
                    </span>
                  )}
                  {activeTicket.status === "active" && (
                    <button
                      onClick={() => handleCloseTicket(activeTicket.id)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-[10px] font-bold rounded-lg transition"
                    >
                      Selesaikan
                    </button>
                  )}
                </div>
              </div>

              {/* Chat replies list */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs bg-slate-50/30 dark:bg-slate-950/10">
                {activeTicket.responses.map((rep) => {
                  const isClient = rep.senderRole === "client";
                  return (
                    <div key={rep.id} className={`flex flex-col max-w-[85%] ${isClient ? "ml-auto items-end" : "items-start"}`}>
                      <span className="text-[9px] text-slate-400 font-mono mb-1">{rep.senderName}</span>
                      <div
                        className={`p-3 rounded-2xl leading-relaxed text-xs ${
                          isClient
                            ? "bg-slate-950 text-white dark:bg-amber-400 dark:text-slate-950 font-medium rounded-tr-none"
                            : "bg-white dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800 text-slate-850 dark:text-slate-100 rounded-tl-none"
                        }`}
                      >
                        <p>{rep.content}</p>
                      </div>
                      <span className="text-[8px] text-slate-400 font-mono mt-1">{rep.timestamp}</span>
                    </div>
                  );
                })}
              </div>

              {/* Chat input form */}
              {activeTicket.status === "active" ? (
                <form onSubmit={handleTicketReply} className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0 flex items-center gap-2 bg-white dark:bg-slate-900">
                  <input
                    type="text"
                    placeholder="Kirim tanggapan atau bukti penunjang..."
                    value={ticketReply}
                    onChange={(e) => setTicketReply(e.target.value)}
                    className="flex-1 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400 text-slate-900 dark:text-white transition"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-slate-950 dark:bg-amber-400 text-white dark:text-slate-950 rounded-xl hover:opacity-90 transition shrink-0 animate-pulse"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-500/5 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  Tiket resolusi ini telah ditandai selesai. Terima kasih atas kerja sama Anda.
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400">
              <LifeBuoy className="h-10 w-10 text-slate-300 mx-auto mb-2" />
              <span className="text-xs">Pilih salah satu tiket aktif pengaduan untuk membuka ruang koordinasi solusi.</span>
            </div>
          )}

          {/* List of current tickets for selection */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">Daftar Tiket Pengaduan Anda</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tickets.map((t) => {
                const isSelected = activeTicketId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTicketId(t.id)}
                    className={`p-3 border rounded-xl text-left block transition ${
                      isSelected
                        ? "border-amber-400 bg-amber-500/5 text-slate-950 dark:text-white"
                        : "border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/40 text-slate-700 hover:border-slate-200 dark:text-slate-300"
                    }`}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">{t.ticketNumber}</span>
                      <span className="text-[8px] font-mono text-slate-400">{t.dateSubmitted}</span>
                    </div>
                    <span className="font-bold text-xs truncate block text-slate-900 dark:text-white">{t.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Accordion Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">Pusat Informasi Regulasi & FAQ</h3>
          <p className="text-xs text-slate-500 mt-0.5">Penjelasan lengkap mengenai aturan Notariat, Perizinan OSS, dan pendaftaran merek DJKI</p>
        </div>

        <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((faq) => {
            const isOpen = activeFaqId === faq.id;
            return (
              <div key={faq.id} className="pt-4 first:pt-0">
                <button
                  onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="space-y-1 pr-4">
                    <span className="text-[9px] uppercase font-bold tracking-widest font-mono text-amber-600 dark:text-amber-400">
                      {faq.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{faq.question}</h4>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
                    <p className="bg-slate-50 dark:bg-slate-850 p-3.5 rounded-xl border border-slate-150/40 dark:border-slate-800">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
