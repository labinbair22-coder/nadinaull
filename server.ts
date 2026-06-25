import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side Gemini client initialization (lazy initialized on first request to prevent crashes)
  let aiClient: GoogleGenAI | null = null;

  function getAiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("GEMINI_API_KEY is not configured or still holds placeholder value");
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Justitia Partners Backend is operational" });
  });

  app.post("/api/gemini/consult", async (req, res) => {
    const { prompt, history, contextDocumentName, contextDocumentContent } = req.body;

    if (!prompt) {
      res.status(400).json({ error: "Prompt is required" });
      return;
    }

    try {
      const ai = getAiClient();

      // Setup system instructions for high-quality Indonesian legal assistance
      const systemInstruction = `
You are Justitia AI, an elite virtual legal assistant developed by Justitia Partners, a premier full-service law and notary firm in Indonesia. 
Your target audience consists of Indonesian small-medium enterprises (UMKMs), corporate clients, and individual entrepreneurs.
Your purpose is to provide highly precise, practical, and constructive legal consultations, explanations, agreement drafts, and risk analysis in the Indonesian language (Bahasa Indonesia).

Guidelines:
1. Always base your advice on applicable Indonesian laws (e.g., UU Cipta Kerja, Kitab Undang-Undang Hukum Perdata, Peraturan Pemerintah, etc.).
2. Use professional, polite, and reassuring legal terminology (Bahasa Hukum yang santun dan formal namun mudah dipahami pelaku usaha).
3. If analyzing an uploaded document (provided in the context document fields), examine its components, point out potential loopholes or clauses that might harm the client, and suggest amendments.
4. Structure your response clearly using markdown, bullet points, and headings.
5. Emphasize that while your AI advice is highly accurate and verified, they should consult with Justitia Partners' certified advocates and Notaries (like Esa Unggul, S.H., M.H. or Budi Santoso, S.H., M.Kn.) for formal legal opinions and notarization.
      `;

      // Build contents array incorporating history and current prompt
      const contents: any[] = [];

      // Translate history into Gemini structure
      if (history && Array.isArray(history)) {
        history.forEach((msg: any) => {
          contents.push({
            role: msg.senderRole === "client" ? "user" : "model",
            parts: [{ text: msg.content }]
          });
        });
      }

      // Prepare context block
      let currentPromptWithContext = "";
      if (contextDocumentName && contextDocumentContent) {
        currentPromptWithContext += `[KONTEKS DOKUMEN DIUNGGAH: ${contextDocumentName}]\n`;
        currentPromptWithContext += `Isi Dokumen / Ekstrak:\n${contextDocumentContent}\n\n`;
        currentPromptWithContext += `Pertanyaan Klien tentang Dokumen ini:\n`;
      }
      currentPromptWithContext += prompt;

      contents.push({
        role: "user",
        parts: [{ text: currentPromptWithContext }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || "Mohon maaf, terjadi kendala saat memproses jawaban hukum Anda.";
      res.json({ responseText });

    } catch (error: any) {
      console.error("Gemini API Error:", error.message);

      // Graceful fallback for missing or placeholder API Key
      if (
        error.message.includes("GEMINI_API_KEY") ||
        error.message.includes("API key not valid") ||
        error.message.includes("apiKey")
      ) {
        // Return highly realistic mock answers customized to Indonesian law to provide an amazing experience!
        let simulatedReply = "";
        const lowerPrompt = prompt.toLowerCase();

        if (lowerPrompt.includes("pt") || lowerPrompt.includes("pendirian") || lowerPrompt.includes("syarat")) {
          simulatedReply = `### Panduan Singkat Pendirian PT di Indonesia (Penyesuaian UU Cipta Kerja)

Terima kasih atas pertanyaan Anda kepada **Justitia AI**. Berikut adalah syarat dan langkah pendirian Perseroan Terbatas (PT) di Indonesia untuk UMKM:

1. **Pendiri PT**: Minimal dilakukan oleh 2 orang pemegang saham (bisa perorangan WNI atau badan hukum). Kecuali untuk **PT Perorangan (PT UMK)** yang bisa didirikan oleh 1 orang dengan batasan modal tertentu.
2. **Modal Dasar**: Tidak ada ketentuan modal minimum Rp50 Juta secara mutlak lagi. Besaran modal ditentukan oleh kesepakatan pendiri, namun dianjurkan minimal Rp50 Juta agar kredibilitas perusahaan terjaga di mata perbankan dan mitra usaha. Minimal **25%** dari modal dasar harus disetor penuh.
3. **Organ Perusahaan**: Harus ditunjuk minimal 1 orang Direktur dan 1 orang Komisaris. Jika pemegang saham hanya 2 orang, keduanya bisa masing-masing menjabat sebagai Direktur dan Komisaris.
4. **Dokumen Persyaratan**:
   * Salinan KTP & KK seluruh pendiri/pemegang saham.
   * NPWP Pribadi seluruh pengurus dan pemegang saham.
   * Bukti alamat/domisili usaha (sewa/milik sendiri).
   * Pilihan nama PT (minimal 3 suku kata, dalam Bahasa Indonesia jika kepemilikan 100% lokal).
5. **Proses Hukum**:
   * Pengecekan dan booking nama PT oleh Notaris di Kemenkumham.
   * Pembuatan **Akta Pendirian** di hadapan Notaris rekanan (seperti Bapak Budi Santoso, S.H., M.Kn.).
   * Pengesahan status Badan Hukum PT berupa **SK Menteri Hukum dan HAM**.
   * Pengurusan **NPWP Badan Usaha**.
   * Registrasi Nomor Induk Berusaha (NIB) melalui sistem **OSS RBA**.

*Catatan: Jawaban ini adalah simulasi karena kunci API Gemini belum dikonfigurasi. Anda dapat mengonfigurasi kunci API riil di panel Settings > Secrets di AI Studio untuk mengaktifkan kecerdasan penuh.*`;
        } else if (lowerPrompt.includes("nda") || lowerPrompt.includes("perjanjian") || lowerPrompt.includes("non-disclosure")) {
          simulatedReply = `### Analisis & Panduan Non-Disclosure Agreement (NDA)

Halo! Sebagai **Justitia AI**, berikut adalah poin-poin krusial yang wajib ada dalam dokumen Perjanjian Kerahasiaan (NDA) Anda agar terlindung secara hukum di Indonesia:

1. **Definisi Informasi Rahasia (Confidential Information)**: Harus ditulis secara spesifik. Apakah mencakup kode sumber (source code), data keuangan, daftar klien, atau rahasia dagang formula produk?
2. **Batasan Penggunaan**: Cantumkan klausul bahwa informasi rahasia *hanya* boleh digunakan untuk kepentingan evaluasi kerja sama bisnis yang disepakati, bukan untuk dikembangkan secara mandiri atau dibagikan ke pihak ketiga.
3. **Jangka Waktu Kerahasiaan (Term of Confidentiality)**: Biasanya berkisar antara 2 s.d. 5 tahun setelah hubungan kerja sama berakhir.
4. **Ganti Rugi & Sanksi Pelanggaran**: Tegaskan ganti rugi materil dan imateril jika terjadi kebocoran data, serta pilihan penyelesaian sengketa (misalnya melalui Pengadilan Negeri setempat atau BANI - Badan Arbitrase Nasional Indonesia).
5. **Kewajiban Pengembalian Data**: Klausul yang mewajibkan pihak penerima informasi untuk mengembalikan atau memusnahkan seluruh data rahasia setelah masa kerja sama berakhir.

*Rekomendasi Kami: Silakan unggah draft NDA Anda pada panel kanan (Konteks Dokumen) untuk kami bedah pasalnya secara langsung jika API Key sudah aktif.*`;
        } else {
          simulatedReply = `### Konsultasi Hukum Justitia AI

Terima kasih atas pertanyaan Anda mengenai: **"${prompt}"**

Kami memahami pentingnya kejelasan hukum bagi jalannya operasional bisnis Anda. Sebagai asisten hukum Justitia Partners, kami siap mendampingi Anda menganalisis aspek regulasi, kepatuhan, serta penyusunan kontrak usaha di Indonesia.

Untuk membantu Anda dengan jawaban yang sangat spesifik dan kontekstual, Anda dapat berkonsultasi mengenai:
* Prosedur pendirian badan hukum (PT, CV, Yayasan).
* Analisis klausul kontrak dagang dan dokumen perizinan (NIB, BPOM, Sertifikasi Halal).
* Perlindungan hak kekayaan intelektual (Merek, Paten, Hak Cipta).
* Kepatuhan ketenagakerjaan dan regulasi sektoral.

*Catatan: Saat ini sistem menggunakan simulasi respons hukum yang dirancang khusus. Harap aktifkan GEMINI_API_KEY Anda di Settings > Secrets untuk berdiskusi secara real-time dengan kecerdasan buatan kami yang sesungguhnya.*`;
        }

        res.json({
          responseText: simulatedReply,
          isSimulated: true,
          message: "Respons disimulasikan secara lokal untuk kelancaran presentasi tanpa API Key."
        });
      } else {
        res.status(500).json({ error: "Terjadi kesalahan internal pada layanan AI.", details: error.message });
      }
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Justitia Partners] Server running on http://localhost:${PORT}`);
  });
}

startServer();
