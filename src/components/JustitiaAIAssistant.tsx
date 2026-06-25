import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Paperclip,
  CheckCircle,
  FileText,
  AlertCircle,
  HelpCircle,
  Clock,
  Trash2,
  Bookmark
} from "lucide-react";
import { ProjectDocument } from "../types";

interface Message {
  id: string;
  senderRole: "client" | "consultant";
  content: string;
  timestamp: string;
}

interface JustitiaAIAssistantProps {
  documents: ProjectDocument[];
}

export default function JustitiaAIAssistant({ documents }: JustitiaAIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "ai-m1",
      senderRole: "consultant",
      content: `Selamat datang di **Justitia AI**, Asisten Hukum Virtual Anda. 

Saya dilatih khusus menggunakan basis regulasi hukum, undang-undang, serta tata laksana perizinan usaha di Indonesia. Anda dapat berkonsultasi mengenai:
* Prosedur formal pendirian perusahaan (PT, CV, Yayasan).
* Pemeriksaan kelemahan klausul kontrak (NDA, Kontrak Kerja Sama).
* Alur pendaftaran Hak Kekayaan Intelektual (Merek Dagang, Hak Cipta).
* Kepatuhan legalitas bisnis sektoral (NIB, BPOM, Sertifikasi Halal).

*Gunakan tombol pintas di bawah ini atau ketikkan pertanyaan hukum Anda secara langsung.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Document context state
  const [attachedDocName, setAttachedDocName] = useState<string | null>(null);
  const [attachedDocContent, setAttachedDocContent] = useState<string | null>(null);

  // Previous analyses state
  const [previousAnalyses, setPreviousAnalyses] = useState([
    {
      id: "pa-1",
      title: "Review NDA Kemitraan Kopi Kita",
      date: "22 Jun 2026",
      summary: "Analisis potensi kelemahan ganti rugi sepihak."
    },
    {
      id: "pa-2",
      title: "Checklist Persyaratan PT ABC",
      date: "15 Jun 2026",
      summary: "Rincian dokumen pendiri dan setoran modal dasar."
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() && !attachedDocName) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      senderRole: "client",
      content: textToSend || `Tinjau dokumen terlampir: ${attachedDocName}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      // Call real server-side API `/api/gemini/consult`
      const response = await fetch("/api/gemini/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend || "Analisis draf ini dan berikan rekomendasi revisinya.",
          history: messages.slice(-5), // Pass recent conversation for context
          contextDocumentName: attachedDocName,
          contextDocumentContent: attachedDocContent
        })
      });

      const data = await response.json();

      if (response.ok) {
        const aiMessage: Message = {
          id: `msg-${Date.now() + 1}`,
          senderRole: "consultant",
          content: data.responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMessage]);

        // Add to previous analyses if document was reviewed or substantial query was made
        if (attachedDocName || textToSend.length > 25) {
          const newAnalysis = {
            id: `pa-${Date.now()}`,
            title: attachedDocName ? `Analisis Dokumen: ${attachedDocName}` : textToSend.substring(0, 30) + "...",
            date: "Hari ini",
            summary: "Laporan rekomendasi kepatuhan hukum Justitia AI."
          };
          setPreviousAnalyses((prev) => [newAnalysis, ...prev.slice(0, 4)]);
        }
      } else {
        throw new Error(data.error || "Gagal mendapatkan saran hukum.");
      }
    } catch (err: any) {
      console.error(err);
      const errorMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        senderRole: "consultant",
        content: `### Kendala Koneksi Asisten Hukum
Mohon maaf, sistem gagal memproses saran hukum Anda: **"${err.message}"**.

Silakan hubungi Bapak Esa Unggul di halaman Pesan Konsultan untuk peninjauan kontrak secara manual.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      // Reset document attachment after prompt sends
      setAttachedDocName(null);
      setAttachedDocContent(null);
    }
  };

  const selectPromptTemplate = (type: "pt" | "nda" | "bpom") => {
    let prompt = "";
    if (type === "pt") {
      prompt = "Apa saja checklist dokumen, syarat modal, dan proses pendirian PT biasa untuk pelaku usaha pemula di Indonesia?";
    } else if (type === "nda") {
      prompt = "Draf NDA kemitraan komersial apa saja klausul yang krusial yang harus saya masukkan untuk melindungi kerahasiaan kekayaan intelektual?";
    } else {
      prompt = "Bagaimana alur dan persyaratan pengurusan perizinan edar BPOM dan Sertifikasi Halal bagi produk makanan kemasan UMKM?";
    }
    setInputMessage(prompt);
  };

  const handleAttachProjectDoc = (doc: ProjectDocument) => {
    setAttachedDocName(doc.name);
    // Inject realistic contract content for simulation analysis based on file name
    let fakeContent = `PERJANJIAN KERAHASIAN (NON-DISCLOSURE AGREEMENT)\nAntara PT Kopi Nusantara dan Klien.\n\nKLAUSUL GANTI RUGI:\nApabila terjadi kebocoran informasi oleh Pihak Kedua, maka Pihak Kedua wajib membayar ganti rugi mutlak sebesar Rp10.000.000.000 (Sepuluh Miliar Rupiah) tanpa melalui pembuktian kerugian di pengadilan.\n\nJANGKA WAKTU:\nKewajiban kerahasiaan ini berlaku untuk selamanya (abadi) meskipun kerja sama telah berakhir.`;
    if (doc.name.toLowerCase().includes("ktp")) {
      fakeContent = `KARTU TANDA PENDUDUK REPUBLIK INDONESIA\nNIK: 317203XXXXXXXXXX\nNama: Aulia Adela\nAlamat: Jalan Jenderal Sudirman No 12, Jakarta Selatan`;
    }
    setAttachedDocContent(fakeContent);
  };

  const loadPastAnalysis = (title: string) => {
    let text = "";
    if (title.includes("NDA")) {
      text = `### Hasil Tinjauan NDA Kemitraan Kopi Kita (Simpanan)

Tinjauan dilakukan pada draf NDA kerja sama distributor. Berikut poin kelemahan hukum yang berhasil diidentifikasi:

1. **Klausul Ganti Rugi Sepihak (Pasal 6.2)**: 
   * *Temuan*: Penerima informasi dikenai denda Rp10 Miliar tanpa pembuktian kerugian nyata. Hal ini berisiko sangat merugikan posisi UMKM Anda jika terjadi kebocoran tidak sengaja oleh karyawan.
   * *Rekomendasi*: Ubah kalimat menjadi: *"Ganti rugi dibayarkan sebesar nilai kerugian nyata yang diderita dan dibuktikan oleh pihak yang dirugikan di hadapan arbitrase/pengadilan."*

2. **Jangka Waktu Tidak Terbatas (Pasal 3.1)**:
   * *Temuan*: Kerahasiaan diatur berlaku selamanya (forever). Dalam standar hukum komersial, ini tidak wajar.
   * *Rekomendasi*: Batasi jangka waktu kerahasiaan menjadi **3 s.d. 5 tahun** setelah kerja sama dinyatakan berakhir.`;
    } else {
      text = `### Hasil Tinjauan Checklist Persyaratan PT ABC (Simpanan)

Persyaratan lengkap pendirian Perseroan Terbatas sesuai UU Cipta Kerja:

1. **Nama PT**: PT ABC Jaya Abadi (Pemesanan disetujui).
2. **KTP & KK**: Telah lengkap dan terverifikasi untuk pemegang saham: Aulia Adela dan Budi Setiawan.
3. **Modal Dasar**: Disepakati Rp100 Juta, dengan Modal Disetor Rp25 Juta (25% dari modal dasar) dibayarkan ke rekening badan hukum setelah akta disahkan.
4. **Susunan Direksi**:
   * Direktur: Ibu Aulia Adela
   * Komisaris: Bapak Budi Setiawan`;
    }

    const loadedMsg: Message = {
      id: `msg-${Date.now()}`,
      senderRole: "consultant",
      content: text,
      timestamp: "Rekaman Sesi"
    };
    setMessages((prev) => [...prev, loadedMsg]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans" id="ai-assistant-panel-root">
      {/* Left Chat Console (8 cols on desktop) */}
      <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col h-[650px] relative overflow-hidden">
        {/* Chat Console Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20 shrink-0">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl">
              <Bot className="h-5.5 w-5.5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-bold text-sm text-slate-950 dark:text-white">Justitia AI Legal Advisor</h3>
                <span className="text-[9px] uppercase tracking-wider font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded">
                  v2.5 (Gemini)
                </span>
              </div>
              <p className="text-[10px] text-emerald-500 font-medium">● Online • Penasihat Hukum Virtual Aktif</p>
            </div>
          </div>

          <button
            onClick={() => setMessages(messages.slice(0, 1))}
            className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
            title="Bersihkan percakapan"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Chat Message Lists Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {messages.map((msg) => {
            const isAI = msg.senderRole === "consultant";
            return (
              <div
                key={msg.id}
                className={`flex gap-4 max-w-[85%] ${isAI ? "" : "ml-auto flex-row-reverse"}`}
              >
                {isAI && (
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 font-mono">
                    AI
                  </div>
                )}
                <div className="space-y-1.5">
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap text-xs font-sans ${
                      isAI
                        ? "bg-slate-100 dark:bg-slate-850 text-slate-850 dark:text-slate-100 border border-slate-200/40 dark:border-slate-800"
                        : "bg-amber-400 text-slate-950 font-medium rounded-tr-none"
                    }`}
                  >
                    {/* Simplified markdown formatter for bullet points, bolding, headings */}
                    {msg.content.split("\n").map((line, idx) => {
                      if (line.startsWith("### ")) {
                        return <h4 key={idx} className="font-extrabold text-xs sm:text-sm mt-3 mb-1.5 block text-amber-700 dark:text-amber-400">{line.replace("### ", "")}</h4>;
                      }
                      if (line.startsWith("* ")) {
                        return <li key={idx} className="ml-3 list-disc mt-1 text-slate-600 dark:text-slate-300">{line.replace("* ", "")}</li>;
                      }
                      if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ") || line.startsWith("5. ")) {
                        return <div key={idx} className="ml-2 mt-1.5 text-slate-700 dark:text-slate-200">{line}</div>;
                      }

                      // Bold text match inside line
                      let formattedLine = line;
                      const boldMatch = line.match(/\*\*(.*?)\*\*/g);
                      if (boldMatch) {
                        return (
                          <p key={idx} className="mt-1">
                            {line.split("**").map((chunk, cIdx) => 
                              cIdx % 2 === 1 ? <strong key={cIdx} className="font-bold text-amber-700 dark:text-amber-400">{chunk}</strong> : chunk
                            )}
                          </p>
                        );
                      }

                      return <p key={idx} className="mt-1">{line}</p>;
                    })}
                  </div>
                  <span className={`block text-[8px] text-slate-400 font-mono ${isAI ? "" : "text-right"}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-4 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 animate-pulse font-mono">
                AI
              </div>
              <div className="space-y-1.5">
                <div className="p-3.5 bg-slate-100 dark:bg-slate-850 rounded-2xl flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[10px] text-slate-400 font-medium pl-1">Justitia AI sedang menyusun analisis hukum...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Console Footer & Attached Badge */}
        <div className="p-4 border-t border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 space-y-3">
          {/* Active Document Context Attachment Indicator */}
          {attachedDocName && (
            <div className="flex items-center justify-between px-3 py-1.5 bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/25 dark:border-amber-400/20 text-[10px] rounded-xl text-amber-700 dark:text-amber-400">
              <div className="flex items-center space-x-2">
                <Paperclip className="h-3.5 w-3.5 shrink-0" />
                <span className="font-bold font-mono">Konteks Aktif:</span>
                <span className="truncate max-w-[200px]">{attachedDocName}</span>
              </div>
              <button
                onClick={() => {
                  setAttachedDocName(null);
                  setAttachedDocContent(null);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>
          )}

          {/* Quick Recommend Buttons Row (Only if no messages or simplified layout) */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pt-1 pb-2">
              <button
                onClick={() => selectPromptTemplate("pt")}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 transition"
              >
                📋 Checklist Pendirian PT
              </button>
              <button
                onClick={() => selectPromptTemplate("nda")}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 transition"
              >
                📄 Analisis NDA Kemitraan
              </button>
              <button
                onClick={() => selectPromptTemplate("bpom")}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800 rounded-lg text-[10px] font-bold text-slate-700 dark:text-slate-300 transition"
              >
                🥣 Izin BPOM & Halal F&B
              </button>
            </div>
          )}

          {/* Prompt Form */}
          <div className="flex gap-2.5">
            <input
              type="text"
              placeholder="Tanyakan mengenai perizinan, pasal kontrak, sanksi UU, atau draf surat usaha..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              className="flex-1 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-amber-400 text-slate-900 dark:text-white transition placeholder-slate-400"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || (!inputMessage.trim() && !attachedDocName)}
              className="px-4.5 py-3 bg-slate-950 text-white dark:bg-amber-400 dark:text-slate-950 font-bold rounded-xl text-center hover:opacity-95 transition shrink-0 disabled:opacity-40"
              id="ai-send-btn"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 dark:text-slate-500 pt-1 font-sans justify-center">
            <AlertCircle className="h-3.5 w-3.5 text-slate-400" />
            <span>Justitia AI adalah asisten hukum virtual bertenaga AI. Selalu verifikasi draf akta dengan Advokat utama kami.</span>
          </div>
        </div>
      </div>

      {/* Right Sidebar Cabinet (4 cols on desktop) */}
      <div className="lg:col-span-4 space-y-6">
        {/* Document Context Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-950 dark:text-white">
              Konteks Dokumen (Rujukan AI)
            </h3>
            <p className="text-[10px] text-slate-400">Lampirkan draf kontrak proyek ke dalam rujukan pertanyaan AI</p>
          </div>

          <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
            {documents.map((doc) => {
              const isAttached = attachedDocName === doc.name;
              return (
                <button
                  key={doc.id}
                  onClick={() => handleAttachProjectDoc(doc)}
                  className={`w-full flex items-center justify-between p-2.5 border rounded-xl text-left transition ${
                    isAttached
                      ? "border-amber-400 bg-amber-500/5 text-amber-600 dark:text-amber-400"
                      : "border-slate-100 dark:border-slate-850 hover:border-slate-300 bg-slate-50/50 dark:bg-slate-950/40 text-slate-800 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center space-x-2.5 overflow-hidden text-xs">
                    <FileText className={`h-4.5 w-4.5 shrink-0 ${isAttached ? "text-amber-500" : "text-slate-400"}`} />
                    <span className="font-semibold truncate max-w-[140px]">{doc.name}</span>
                  </div>
                  {isAttached ? (
                    <span className="text-[9px] uppercase font-bold tracking-wider font-mono bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded shrink-0">
                      Rujukan
                    </span>
                  ) : (
                    <span className="text-[8px] font-mono text-slate-400 shrink-0">Lampirkan</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Previous Analysis log */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-950 dark:text-white">
              Analisis Terakhir
            </h3>
            <p className="text-[10px] text-slate-400">Sesi peninjauan draf dan tanya jawab sebelumnya</p>
          </div>

          <div className="space-y-3">
            {previousAnalyses.map((pa) => (
              <button
                key={pa.id}
                onClick={() => loadPastAnalysis(pa.title)}
                className="w-full text-left p-3 border border-slate-150 dark:border-slate-850 rounded-xl hover:border-amber-400/30 transition bg-slate-50/30 dark:bg-slate-950/20 block space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] text-slate-900 dark:text-white truncate max-w-[160px]">{pa.title}</span>
                  <span className="text-[9px] font-mono text-slate-400">{pa.date}</span>
                </div>
                <p className="text-[10px] text-slate-500 line-clamp-1">{pa.summary}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
