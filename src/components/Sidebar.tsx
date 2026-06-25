import React, { useState } from "react";
import {
  Scale,
  LayoutDashboard,
  FolderKanban,
  Bot,
  MessageSquare,
  LifeBuoy,
  User,
  UserPlus,
  Sun,
  Moon,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { UserRole } from "../types";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  user: { name: string; email: string; role: UserRole };
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Sidebar({
  currentTab,
  onTabChange,
  user,
  onLogout,
  darkMode,
  onToggleDarkMode
}: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const clientNavigation = [
    { id: "home", label: "Beranda", icon: LayoutDashboard },
    { id: "projects", label: "Proyek Saya", icon: FolderKanban },
    { id: "ai-assistant", label: "Justitia AI", icon: Bot, highlight: true },
    { id: "messages", label: "Pesan Konsultan", icon: MessageSquare },
    { id: "tickets", label: "Pusat Resolusi", icon: LifeBuoy },
    { id: "profile", label: "Profil Pengguna", icon: User }
  ];

  const adminNavigation = [
    { id: "admin-add-user", label: "Tambah Pengguna", icon: UserPlus },
    { id: "projects", label: "Proyek Saya", icon: FolderKanban },
    { id: "ai-assistant", label: "Justitia AI", icon: Bot, highlight: true },
    { id: "messages", label: "Pesan Konsultan", icon: MessageSquare },
    { id: "tickets", label: "Pusat Resolusi", icon: LifeBuoy },
    { id: "profile", label: "Profil Pengguna", icon: User }
  ];

  const navigation = user.role === "admin" ? adminNavigation : clientNavigation;

  const handleNavClick = (id: string) => {
    onTabChange(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-6 h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 bg-slate-900 text-amber-400 dark:bg-amber-400 dark:text-slate-950 rounded-lg">
            <Scale className="h-5 w-5" />
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-950 dark:text-white uppercase">JUSTITIA</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 rounded-lg transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900 rounded-lg transition"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation Panel (Dual Drawer for Desktop & Mobile) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 lg:z-auto w-64 bg-slate-950 text-slate-100 border-r border-slate-800 flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:relative"
        }`}
        id="sidebar-container"
      >
        <div className="p-6 space-y-6">
          {/* Brand/Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-400 text-slate-950 rounded-lg">
                <Scale className="h-6 w-6" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">JUSTITIA</span>
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono block -mt-0.5">Partners Suite</span>
              </div>
            </div>
            <button onClick={() => setMobileOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Profile Summary */}
          <div className="flex items-center space-x-3.5 p-3.5 bg-slate-900/60 border border-slate-800 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-sm select-none shrink-0">
              {user.name.split(" ")[0].substring(0, 2).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-xs text-white truncate">{user.name}</h4>
              <p className="text-[9px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                {user.role === "admin" ? "Legal Consultant" : "Client Akun"}
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5 pt-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`sidebar-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold rounded-xl transition duration-150 ${
                    isActive
                      ? "bg-amber-400 text-slate-950"
                      : item.highlight
                      ? "bg-slate-900 border border-amber-400/10 text-amber-400 hover:bg-slate-850"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.id === "messages" && (
                    <span className="bg-rose-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">2</span>
                  )}
                  {item.highlight && !isActive && (
                    <span className="bg-amber-400/20 text-amber-400 text-[8px] tracking-wide font-extrabold uppercase px-1.5 py-0.5 rounded-md font-mono">
                      AI
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer (Theme controls + Logout) */}
        <div className="p-6 border-t border-slate-900 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Tema Aplikasi</span>
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg transition"
              title="Ganti tema"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
            id="sidebar-logout"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>
    </>
  );
}
