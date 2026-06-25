import React, { useState } from "react";
import {
  Folder,
  Calendar,
  CheckCircle2,
  FileText,
  FileCode,
  Image,
  Download,
  UploadCloud,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Check,
  Briefcase
} from "lucide-react";
import { Project, Task, ProjectDocument } from "../types";

interface ProjectDetailProps {
  projects: Project[];
  tasks: Task[];
  documents: ProjectDocument[];
  initialProjectId?: string;
  onUpdateTasks: (updatedTasks: Task[]) => void;
  onUpdateDocuments: (updatedDocs: ProjectDocument[]) => void;
}

export default function ProjectDetail({
  projects,
  tasks,
  documents,
  initialProjectId,
  onUpdateTasks,
  onUpdateDocuments
}: ProjectDetailProps) {
  // Fallback to the first active project if none specified
  const [selectedProjectId, setSelectedProjectId] = useState(
    initialProjectId || projects[0]?.id || ""
  );

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  // Modals / forms state
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("Aulia Adela (Klien)");

  // Simulated drag and drop state
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadingFileName, setUploadingFileName] = useState("");

  if (!selectedProject) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl" id="no-project-root">
        <Folder className="h-12 w-12 text-slate-400 mx-auto mb-4 animate-pulse" />
        <h3 className="font-bold text-lg">Tidak ada proyek aktif</h3>
        <p className="text-sm text-slate-500 mt-1">Silakan mendaftarkan pengurusan legalitas di halaman utama.</p>
      </div>
    );
  }

  // Filter tasks and documents for this specific project
  const projectTasks = tasks.filter((t) => t.projectId === selectedProject.id);
  const projectDocuments = documents.filter((d) => d.projectId === selectedProject.id);

  // Kanban separation
  const todoTasks = projectTasks.filter((t) => t.status === "todo");
  const inProgressTasks = projectTasks.filter((t) => t.status === "in_progress");
  const doneTasks = projectTasks.filter((t) => t.status === "done");

  // Move task state
  const moveTask = (taskId: string, newStatus: "todo" | "in_progress" | "done") => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, status: newStatus };
      }
      return t;
    });

    onUpdateTasks(updated);
    recalculateProgress(selectedProject.id, updated);
  };

  // Automatically recalculate project progress based on completed tasks
  const recalculateProgress = (projId: string, currentTasks: Task[]) => {
    const projTasks = currentTasks.filter((t) => t.projectId === projId);
    if (projTasks.length === 0) return;
    const completed = projTasks.filter((t) => t.status === "done").length;
    const percentage = Math.round((completed / projTasks.length) * 100);

    // Update project object progress field in state indirectly
    selectedProject.progress = percentage;
  };

  // Add task handler
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      projectId: selectedProject.id,
      title: newTaskTitle,
      description: newTaskDesc,
      status: "todo",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 1 week from now
      assignedTo: newTaskAssignee
    };

    const updated = [...tasks, newTask];
    onUpdateTasks(updated);
    recalculateProgress(selectedProject.id, updated);

    // Clear form
    setNewTaskTitle("");
    setNewTaskDesc("");
    setNewTaskAssignee("Aulia Adela (Klien)");
    setShowAddTaskModal(false);
  };

  const handleDeleteTask = (taskId: string) => {
    const updated = tasks.filter((t) => t.id !== taskId);
    onUpdateTasks(updated);
    recalculateProgress(selectedProject.id, updated);
  };

  // File Upload Simulators
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateFileUpload(e.target.files[0]);
    }
  };

  const simulateFileUpload = (file: File) => {
    setUploadingFileName(file.name);
    setUploadProgress(10);

    // Simulated progress tick
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Add new document to project
            const newDoc: ProjectDocument = {
              id: `doc-${Date.now()}`,
              projectId: selectedProject.id,
              name: file.name,
              type: file.name.split(".").pop()?.toUpperCase() || "PDF",
              size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
              status: "pending",
              dateUploaded: new Date().toISOString().split("T")[0]
            };
            onUpdateDocuments([...documents, newDoc]);
            setUploadProgress(null);
            setUploadingFileName("");
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const getDocIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-5 w-5 text-rose-500" />;
      case "doc":
      case "docx":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "png":
      case "jpg":
      case "jpeg":
        return <Image className="h-5 w-5 text-emerald-500" />;
      default:
        return <FileCode className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-8 font-sans" id={`project-detail-panel-${selectedProject.id}`}>
      {/* Top Selector Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
        <div className="flex items-center space-x-3">
          <Briefcase className="h-5 w-5 text-amber-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">Pilih Proyek Aktif:</span>
        </div>
        <select
          id="project-selector-dropdown"
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-400 transition cursor-pointer appearance-none min-w-[240px]"
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Project Banner Info */}
      <div className="p-6 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/10 dark:border-amber-400/10 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold tracking-widest font-mono bg-amber-500/20 text-amber-800 dark:text-amber-400 px-2 py-0.5 rounded">
                {selectedProject.category}
              </span>
              <span className="text-xs text-slate-500 font-mono flex items-center space-x-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Terdaftar: {selectedProject.dateCreated}</span>
              </span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">
              Detail Proyek - {selectedProject.name}
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">{selectedProject.description}</p>
          </div>

          <div className="space-y-1.5 min-w-[140px] bg-white dark:bg-slate-900/80 p-3 rounded-xl border border-slate-200 dark:border-slate-850">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Pekerjaan Selesai</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black font-mono tracking-tight">{selectedProject.progress}%</span>
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                {selectedProject.progress === 100 ? <Check className="h-4.5 w-4.5" /> : <Folder className="h-4 w-4" />}
              </div>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${selectedProject.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white">Papan Aktivitas Legal (Kanban)</h3>
            <p className="text-xs text-slate-500">Pindahkan kartu aktivitas untuk memperbarui berkas dan verifikasi proyek</p>
          </div>
          <button
            onClick={() => setShowAddTaskModal(true)}
            className="px-4.5 py-2 bg-slate-950 hover:bg-slate-800 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition shadow-xs"
            id="btn-trigger-add-task"
          >
            <Plus className="h-4.5 w-4.5" />
            <span>Tambah Tugas</span>
          </button>
        </div>

        {/* Kanban Board Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Todo */}
          <div className="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col h-[520px]">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <span className="font-extrabold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">Belum Dimulai</span>
              </div>
              <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                {todoTasks.length}
              </span>
            </div>

            <div className="space-y-4 overflow-y-auto flex-1 pr-1 pb-2">
              {todoTasks.map((t) => (
                <div
                  key={t.id}
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-4 rounded-xl shadow-xs hover:border-amber-400/50 dark:hover:border-amber-400/40 transition group space-y-3"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-slate-950 dark:text-white leading-snug">{t.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-3">{t.description}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-900 pt-2.5">
                    <div className="overflow-hidden">
                      <span className="block text-[8px] uppercase tracking-wider font-mono font-semibold text-slate-400">PIC</span>
                      <span className="block text-[10px] text-slate-600 dark:text-slate-300 font-medium truncate">{t.assignedTo}</span>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => moveTask(t.id, "in_progress")}
                        className="p-1 bg-slate-100 hover:bg-amber-400 dark:bg-slate-800 dark:hover:bg-amber-400 hover:text-slate-950 rounded-md transition"
                        title="Proses tugas"
                      >
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(t.id)}
                        className="p-1 hover:text-rose-500 rounded-md transition"
                        title="Hapus tugas"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {todoTasks.length === 0 && (
                <div className="h-full flex items-center justify-center p-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  <span className="text-[11px] text-slate-400">Papan Kosong</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col h-[520px]">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="font-extrabold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">Dalam Proses</span>
              </div>
              <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                {inProgressTasks.length}
              </span>
            </div>

            <div className="space-y-4 overflow-y-auto flex-1 pr-1 pb-2">
              {inProgressTasks.map((t) => (
                <div
                  key={t.id}
                  className="bg-white dark:bg-slate-950 border border-amber-500/20 dark:border-amber-400/20 p-4 rounded-xl shadow-xs hover:border-amber-400/50 transition group space-y-3"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-slate-950 dark:text-white leading-snug">{t.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-3">{t.description}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-900 pt-2.5">
                    <div className="overflow-hidden">
                      <span className="block text-[8px] uppercase tracking-wider font-mono font-semibold text-slate-400">PIC</span>
                      <span className="block text-[10px] text-slate-600 dark:text-slate-300 font-medium truncate">{t.assignedTo}</span>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => moveTask(t.id, "todo")}
                        className="p-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 rounded-md transition"
                        title="Kembalikan tugas"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => moveTask(t.id, "done")}
                        className="p-1 bg-slate-100 hover:bg-emerald-500 hover:text-white dark:bg-slate-850 dark:hover:bg-emerald-500 rounded-md transition"
                        title="Selesaikan tugas"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {inProgressTasks.length === 0 && (
                <div className="h-full flex items-center justify-center p-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  <span className="text-[11px] text-slate-400">Papan Kosong</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Selesai (Done) */}
          <div className="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col h-[520px]">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4 shrink-0">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-extrabold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">Selesai</span>
              </div>
              <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                {doneTasks.length}
              </span>
            </div>

            <div className="space-y-4 overflow-y-auto flex-1 pr-1 pb-2">
              {doneTasks.map((t) => (
                <div
                  key={t.id}
                  className="bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-850 p-4 rounded-xl shadow-xs opacity-85 space-y-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-500 dark:text-slate-400 line-through leading-snug">{t.title}</h4>
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-3">{t.description}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-900 pt-2.5">
                    <div className="overflow-hidden">
                      <span className="block text-[8px] uppercase tracking-wider font-mono font-semibold text-slate-400">PIC</span>
                      <span className="block text-[10px] text-slate-500 truncate">{t.assignedTo}</span>
                    </div>

                    <button
                      onClick={() => moveTask(t.id, "in_progress")}
                      className="p-1 bg-slate-100 hover:bg-amber-400 dark:bg-slate-850 dark:hover:bg-amber-400 hover:text-slate-950 rounded-md transition"
                      title="Kembalikan ke Progress"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              {doneTasks.length === 0 && (
                <div className="h-full flex items-center justify-center p-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  <span className="text-[11px] text-slate-400">Papan Kosong</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Documents & File Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* List of current project documents */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 space-y-5">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-950 dark:text-white font-mono">
              Dokumen Proyek Terunggah
            </h3>
            <p className="text-xs text-slate-500">Berkas pendaftaran, verifikasi identitas, dan draf akta</p>
          </div>

          <div className="space-y-3.5 max-h-[340px] overflow-y-auto pr-1">
            {projectDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 border border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/40 rounded-xl hover:border-amber-400/25 transition"
              >
                <div className="flex items-center space-x-3.5 overflow-hidden">
                  <div className="p-2.5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg shrink-0">
                    {getDocIcon(doc.type)}
                  </div>
                  <div className="overflow-hidden">
                    <span className="block font-bold text-xs text-slate-900 dark:text-white truncate">{doc.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono flex items-center space-x-2 mt-0.5">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  {/* Status Badge */}
                  {doc.status === "approved" ? (
                    <span className="text-[9px] uppercase font-bold tracking-wider font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Disetujui
                    </span>
                  ) : doc.status === "pending" ? (
                    <span className="text-[9px] uppercase font-bold tracking-wider font-mono text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                      Menunggu
                    </span>
                  ) : (
                    <span className="text-[9px] uppercase font-bold tracking-wider font-mono text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">
                      Ditolak
                    </span>
                  )}

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Melakukan pengunduhan berkas: ${doc.name}`);
                    }}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-850 dark:hover:text-white transition"
                    title="Unduh berkas"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}

            {projectDocuments.length === 0 && (
              <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400">
                <FileText className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                <span className="text-[11px]">Belum ada dokumen yang terupload untuk proyek ini.</span>
              </div>
            )}
          </div>
        </div>

        {/* Drag and Drop File Uploader */}
        <div
          className={`bg-white dark:bg-slate-900 border-2 border-dashed rounded-2xl shadow-sm p-6 flex flex-col justify-center items-center text-center transition ${
            dragActive
              ? "border-amber-400 bg-amber-500/5"
              : "border-slate-200 dark:border-slate-800"
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          id="document-drag-drop-zone"
        >
          <div className="max-w-xs space-y-4">
            <div className="p-4 bg-amber-400/10 text-amber-500 rounded-full w-fit mx-auto">
              <UploadCloud className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-sm text-slate-950 dark:text-white">
                Unggah Berkas Persyaratan Baru
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tarik & letakkan file persyaratan Anda di sini, atau cari berkas di komputer Anda.
              </p>
            </div>

            <div className="relative">
              <input
                id="hidden-file-input"
                type="file"
                onChange={handleFileInput}
                className="hidden"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              />
              <label
                htmlFor="hidden-file-input"
                className="px-4 py-2 bg-slate-950 text-white dark:bg-amber-400 dark:text-slate-950 font-bold rounded-xl text-xs cursor-pointer hover:opacity-90 transition block"
              >
                Pilih Berkas Lokal
              </label>
            </div>

            <p className="text-[10px] text-slate-400">
              Format yang didukung: PDF, Word (Docx), JPEG, atau PNG hingga 10MB
            </p>

            {/* Simulating upload progress bar */}
            {uploadProgress !== null && (
              <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-xl space-y-2 border border-slate-100 dark:border-slate-800 text-left">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[140px]">
                    {uploadingFileName}
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task Creation Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs px-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-5 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm sm:text-base uppercase tracking-wider font-mono">Tambah Tugas Baru</h3>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4 text-xs font-sans">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 uppercase tracking-wider block">Judul Aktivitas</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Revisi Anggaran Dasar"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 uppercase tracking-wider block">Deskripsi Tugas</label>
                <textarea
                  placeholder="Deskripsikan berkas atau persyaratan yang perlu dilengkapi..."
                  rows={3}
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-500 uppercase tracking-wider block">Penanggung Jawab (PIC)</label>
                <select
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Aulia Adela (Klien)">Aulia Adela (Klien)</option>
                  <option value="Esa Unggul (Legal Consultant)">Esa Unggul (Legal Consultant)</option>
                  <option value="Budi Santoso (Notaris)">Budi Santoso (Notaris)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 font-bold rounded-xl text-center transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-slate-950 text-white dark:bg-amber-400 dark:text-slate-950 font-bold rounded-xl text-center hover:opacity-90 transition"
                >
                  Simpan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
