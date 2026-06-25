import { Project, Task, ProjectDocument, ChatRoom, Ticket, FAQItem } from "./types";

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-pt-abc",
    name: "Pendirian PT ABC",
    type: "Pendirian PT Biasa (UMKM)",
    clientName: "Aulia Adela",
    status: "active",
    progress: 60,
    dateCreated: "2026-06-01",
    description: "Proses pendirian Perseroan Terbatas untuk usaha perdagangan umum dan ekspor-impor kelapa sawit PT ABC.",
    category: "Notaris"
  },
  {
    id: "proj-merek-kopi",
    name: "Pendaftaran Merek Kopi Kita",
    type: "Pendaftaran Hak Kekayaan Intelektual",
    clientName: "Aulia Adela",
    status: "active",
    progress: 35,
    dateCreated: "2026-06-10",
    description: "Perlindungan merek dagang kelas 30 untuk produk bubuk kopi premium lokal asli Sumatra.",
    category: "HKI"
  },
  {
    id: "proj-audit-nusantara",
    name: "Audit Kepatuhan Hukum PT Nusantara Makmur",
    type: "Legal Compliance Audit",
    clientName: "Aulia Adela",
    status: "pending",
    progress: 10,
    dateCreated: "2026-06-18",
    description: "Peninjauan kepatuhan perizinan lingkungan, keselamatan kerja (K3), dan regulasi ketenagakerjaan daerah.",
    category: "Compliance"
  }
];

export const INITIAL_TASKS: Task[] = [
  // PT ABC Tasks
  {
    id: "task-1",
    projectId: "proj-pt-abc",
    title: "Pengecekan & Pemesanan Nama PT",
    description: "Mengajukan nama PT ABC ke sistem SABH Kemenkumham untuk memastikan ketersediaan dan memesannya.",
    status: "done",
    dueDate: "2026-06-05",
    assignedTo: "Esa Unggul (Legal Consultant)"
  },
  {
    id: "task-2",
    projectId: "proj-pt-abc",
    title: "Penyusunan Draft Akta Pendirian",
    description: "Penyusunan Anggaran Dasar lengkap dengan modal dasar, modal disetor, dan susunan direksi/komisaris.",
    status: "done",
    dueDate: "2026-06-12",
    assignedTo: "Budi Santoso (Notaris)"
  },
  {
    id: "task-3",
    projectId: "proj-pt-abc",
    title: "Tanda Tangan Akta Pendirian di Hadapan Notaris",
    description: "Penandatanganan akta resmi oleh seluruh pendiri PT secara fisik atau menggunakan e-signature resmi.",
    status: "in_progress",
    dueDate: "2026-06-28",
    assignedTo: "Aulia Adela (Klien)"
  },
  {
    id: "task-4",
    projectId: "proj-pt-abc",
    title: "Pengesahan SK Kemenkumham",
    description: "Pendaftaran akta pendirian ke Kemenkumham untuk memperoleh status badan hukum resmi.",
    status: "todo",
    dueDate: "2026-07-05",
    assignedTo: "Budi Santoso (Notaris)"
  },
  {
    id: "task-5",
    projectId: "proj-pt-abc",
    title: "Pengurusan NPWP Badan & NIB",
    description: "Pendaftaran NPWP badan hukum dan pengurusan Nomor Induk Berusaha melalui portal OSS RBA.",
    status: "todo",
    dueDate: "2026-07-12",
    assignedTo: "Esa Unggul (Legal Consultant)"
  },

  // Merek Kopi Kita Tasks
  {
    id: "task-m1",
    projectId: "proj-merek-kopi",
    title: "Penelusuran Merek (Trademark Search)",
    description: "Analisis kemiripan substantif merek 'Kopi Kita' pada database DJKI untuk meminimalisir risiko penolakan.",
    status: "done",
    dueDate: "2026-06-15",
    assignedTo: "Esa Unggul (Legal Consultant)"
  },
  {
    id: "task-m2",
    projectId: "proj-merek-kopi",
    title: "Penyiapan Etiket Merek & Deskripsi Kelas",
    description: "Mempersiapkan berkas gambar logo resolusi tinggi dan merumuskan deskripsi produk kelas 30.",
    status: "in_progress",
    dueDate: "2026-06-24",
    assignedTo: "Aulia Adela (Klien)"
  },
  {
    id: "task-m3",
    projectId: "proj-merek-kopi",
    title: "Pembayaran PNBP & Submit DJKI",
    description: "Melakukan penyetoran PNBP pendaftaran merek dan pengisian formulir pendaftaran online DJKI.",
    status: "todo",
    dueDate: "2026-07-02",
    assignedTo: "Esa Unggul (Legal Consultant)"
  }
];

export const INITIAL_DOCUMENTS: ProjectDocument[] = [
  {
    id: "doc-1",
    projectId: "proj-pt-abc",
    name: "KTP Seluruh Pendiri PT.pdf",
    type: "PDF",
    size: "1.2 MB",
    status: "approved",
    dateUploaded: "2026-06-02"
  },
  {
    id: "doc-2",
    projectId: "proj-pt-abc",
    name: "Kartu Keluarga Pendiri PT.pdf",
    type: "PDF",
    size: "850 KB",
    status: "approved",
    dateUploaded: "2026-06-02"
  },
  {
    id: "doc-3",
    projectId: "proj-pt-abc",
    name: "NPWP Pribadi Pengurus.pdf",
    type: "PDF",
    size: "920 KB",
    status: "pending",
    dateUploaded: "2026-06-15"
  },
  {
    id: "doc-4",
    projectId: "proj-pt-abc",
    name: "Draft Akta Anggaran Dasar - PT ABC.docx",
    type: "Doc",
    size: "340 KB",
    status: "pending",
    dateUploaded: "2026-06-18"
  },
  {
    id: "doc-m1",
    projectId: "proj-merek-kopi",
    name: "Logo Kopi Kita - Warna Premium.png",
    type: "Image",
    size: "2.4 MB",
    status: "approved",
    dateUploaded: "2026-06-12"
  }
];

export const INITIAL_CHAT_ROOMS: ChatRoom[] = [
  {
    id: "room-esa",
    title: "Esa Unggul",
    lastMessage: "Bagaimana draft akta pendirian PT ABC? Apakah ada revisi dari Ibu Aulia?",
    unreadCount: 2,
    consultantName: "Esa Unggul, S.H., M.H.",
    consultantRole: "Senior Legal Consultant",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
    messages: [
      {
        id: "m-1",
        senderId: "esa-consultant",
        senderName: "Esa Unggul",
        senderRole: "consultant",
        content: "Selamat siang Ibu Aulia. Saya telah berhasil membooking nama 'PT ABC' di portal Kemenkumham.",
        timestamp: "10:15"
      },
      {
        id: "m-2",
        senderId: "client-aulia",
        senderName: "Aulia Adela",
        senderRole: "client",
        content: "Alhamdulillah, terima kasih banyak Pak Esa! Kabar luar biasa.",
        timestamp: "10:30"
      },
      {
        id: "m-3",
        senderId: "esa-consultant",
        senderName: "Esa Unggul",
        senderRole: "consultant",
        content: "Sama-sama Ibu. Sekarang, saya sudah mengirimkan Draft Akta Anggaran Dasar di panel Dokumen. Silakan diunduh untuk dikoordinasikan kembali dengan rekan pendiri lainnya.",
        timestamp: "14:10"
      },
      {
        id: "m-4",
        senderId: "esa-consultant",
        senderName: "Esa Unggul",
        senderRole: "consultant",
        content: "Bagaimana draft akta pendirian PT ABC? Apakah ada revisi dari Ibu Aulia?",
        timestamp: "14:12"
      }
    ]
  },
  {
    id: "room-budi",
    title: "Budi Santoso",
    lastMessage: "Jadwal penandatanganan akta secara luring bisa kita agendakan Kamis depan pukul 10:00 WIB.",
    unreadCount: 0,
    consultantName: "Budi Santoso, S.H., M.Kn.",
    consultantRole: "Notaris Rekanan Justitia",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    messages: [
      {
        id: "b-1",
        senderId: "budi-notaris",
        senderName: "Budi Santoso",
        senderRole: "consultant",
        content: "Selamat siang Ibu Aulia, salam kenal. Saya Notaris rekanan Justitia yang ditunjuk untuk akta pendirian PT ABC.",
        timestamp: "Kemarin, 11:00"
      },
      {
        id: "b-2",
        senderId: "client-aulia",
        senderName: "Aulia Adela",
        senderRole: "client",
        content: "Selamat siang Pak Budi. Salam kenal kembali. Mohon bimbingannya agar proses tanda tangan akta berjalan lancar.",
        timestamp: "Kemarin, 11:20"
      },
      {
        id: "b-3",
        senderId: "budi-notaris",
        senderName: "Budi Santoso",
        senderRole: "consultant",
        content: "Jadwal penandatanganan akta secara luring bisa kita agendakan Kamis depan pukul 10:00 WIB.",
        timestamp: "Kemarin, 15:45"
      }
    ]
  }
];

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: "tick-1",
    ticketNumber: "TKT-2026-089",
    title: "Kesulitan Mengunggah File NPWP Pribadi",
    category: "Masalah Teknis Dokumen",
    projectId: "proj-pt-abc",
    description: "Sistem memberikan error format tidak valid, padahal berkas saya sudah dalam bentuk PDF resolusi tinggi.",
    status: "active",
    dateSubmitted: "2026-06-20",
    responses: [
      {
        id: "tr-1",
        senderName: "Aulia Adela",
        senderRole: "client",
        content: "Tolong bantu cek mengapa berkas PDF berukuran 920 KB tidak mau terupload sempurna.",
        timestamp: "2026-06-20 09:30"
      },
      {
        id: "tr-2",
        senderName: "Esa Unggul",
        senderRole: "consultant",
        content: "Halo Ibu Aulia, kendala tersebut biasanya dikarenakan adanya karakter spasial khusus pada nama file PDF Anda. Harap coba ganti nama file menjadi sederhana seperti 'NPWP_Aulia.pdf' dan coba kembali. Kami pantau dari sini.",
        timestamp: "2026-06-20 11:15"
      }
    ]
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Apa syarat utama mendirikan PT Biasa di Indonesia?",
    answer: "Sesuai regulasi terbaru, syarat utama mencakup: minimal 2 orang pendiri (bisa suami istri namun dianjurkan minimal ada pemegang saham lain jika tidak ada perjanjian kawin), pengisian susunan Direktur dan Komisaris, penetapan Modal Dasar (minimum tidak dipatok keras namun disesuaikan kemampuan, dianjurkan mulai dari Rp50 Juta untuk UMKM), serta penetapan domisili usaha dan bidang usaha berbasis KBLI 2020.",
    category: "Corporate"
  },
  {
    id: "faq-2",
    question: "Berapa lama proses pembuatan akta hingga terbit SK Kemenkumham?",
    answer: "Melalui platform Justitia Partners, proses validasi berkas memakan waktu 1-2 hari kerja. Setelah draft disepakati dan ditandatangani, proses pengesahan di sistem Kemenkumham biasanya selesai dalam waktu 3-5 hari kerja jika tidak ada kendala antrean sistem kementerian.",
    category: "Notaris"
  },
  {
    id: "faq-3",
    question: "Apa itu Kelas Merek dan bagaimana cara menentukannya?",
    answer: "Kelas merek adalah klasifikasi jenis barang atau jasa dari merek yang didaftarkan berdasarkan Klasifikasi Internasional (Nice Classification). Contohnya, Kelas 30 untuk kopi, teh, kue kering, sedangkan Kelas 43 untuk jasa restoran/kafe. Memilih kelas yang salah bisa membuat perlindungan merek Anda tidak efektif.",
    category: "HKI"
  },
  {
    id: "faq-4",
    question: "Apakah UMKM wajib memiliki NIB (Nomor Induk Berusaha)?",
    answer: "Ya, wajib. NIB berfungsi sebagai identitas pelaku usaha sekaligus izin dasar/legalitas operasional pengganti SIUP dan TDP lama. Pengurusan NIB dapat dilakukan secara mandiri via OSS-RBA, atau didelegasikan melalui proses konsultasi di Justitia.",
    category: "Compliance"
  }
];
