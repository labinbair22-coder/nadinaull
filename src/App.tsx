import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import EmailVerification from "./components/EmailVerification";
import Sidebar from "./components/Sidebar";
import HomeDashboard from "./components/HomeDashboard";
import ProjectDetail from "./components/ProjectDetail";
import JustitiaAIAssistant from "./components/JustitiaAIAssistant";
import MessagingPortal from "./components/MessagingPortal";
import ResolutionCenter from "./components/ResolutionCenter";
import UserProfile from "./components/UserProfile";
import AddUserAdmin from "./components/AddUserAdmin";

import {
  INITIAL_PROJECTS,
  INITIAL_TASKS,
  INITIAL_DOCUMENTS,
  INITIAL_CHAT_ROOMS,
  INITIAL_TICKETS,
  INITIAL_FAQS
} from "./data";
import { Project, Task, ProjectDocument, ChatRoom, Ticket, FAQItem, UserRole } from "./types";

export default function App() {
  // Navigation Routing Tab State
  const [currentTab, setCurrentTab] = useState<string>("landing");

  // Authentication State
  const [user, setUser] = useState<{ name: string; email: string; role: UserRole } | null>(null);

  // Global Records State (Hydrate from localStorage with default fallbacks)
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [documents, setDocuments] = useState<ProjectDocument[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  // Dark/Light Theme state
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Initial Data Load & Sync
  useEffect(() => {
    // 1. Projects
    const localProjects = localStorage.getItem("justitia_projects");
    if (localProjects) {
      setProjects(JSON.parse(localProjects));
    } else {
      setProjects(INITIAL_PROJECTS);
      localStorage.setItem("justitia_projects", JSON.stringify(INITIAL_PROJECTS));
    }

    // 2. Tasks
    const localTasks = localStorage.getItem("justitia_tasks");
    if (localTasks) {
      setTasks(JSON.parse(localTasks));
    } else {
      setTasks(INITIAL_TASKS);
      localStorage.setItem("justitia_tasks", JSON.stringify(INITIAL_TASKS));
    }

    // 3. Documents
    const localDocs = localStorage.getItem("justitia_documents");
    if (localDocs) {
      setDocuments(JSON.parse(localDocs));
    } else {
      setDocuments(INITIAL_DOCUMENTS);
      localStorage.setItem("justitia_documents", JSON.stringify(INITIAL_DOCUMENTS));
    }

    // 4. Chat Rooms
    const localRooms = localStorage.getItem("justitia_rooms");
    if (localRooms) {
      setChatRooms(JSON.parse(localRooms));
    } else {
      setChatRooms(INITIAL_CHAT_ROOMS);
      localStorage.setItem("justitia_rooms", JSON.stringify(INITIAL_CHAT_ROOMS));
    }

    // 5. Tickets
    const localTickets = localStorage.getItem("justitia_tickets");
    if (localTickets) {
      setTickets(JSON.parse(localTickets));
    } else {
      setTickets(INITIAL_TICKETS);
      localStorage.setItem("justitia_tickets", JSON.stringify(INITIAL_TICKETS));
    }

    // 6. FAQs
    setFaqs(INITIAL_FAQS);

    // Load theme setting
    const savedTheme = localStorage.getItem("justitia_dark_mode");
    if (savedTheme !== null) {
      setDarkMode(savedTheme === "true");
    }
  }, []);

  // Update states helper functions with localStorage sync
  const handleUpdateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem("justitia_tasks", JSON.stringify(updatedTasks));
  };

  const handleUpdateDocuments = (updatedDocs: ProjectDocument[]) => {
    setDocuments(updatedDocs);
    localStorage.setItem("justitia_documents", JSON.stringify(updatedDocs));
  };

  const handleUpdateRooms = (updatedRooms: ChatRoom[]) => {
    setChatRooms(updatedRooms);
    localStorage.setItem("justitia_rooms", JSON.stringify(updatedRooms));
  };

  const handleUpdateTickets = (updatedTickets: Ticket[]) => {
    setTickets(updatedTickets);
    localStorage.setItem("justitia_tickets", JSON.stringify(updatedTickets));
  };

  // Quick action from dashboard to send message to consultant
  const handleSendMessageToEsa = (text: string) => {
    const updated = chatRooms.map((r) => {
      if (r.id === "room-esa") {
        const newMsg = {
          id: `m-client-dash-${Date.now()}`,
          senderId: "client-aulia",
          senderName: user?.name || "Aulia Adela",
          senderRole: "client" as const,
          content: text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...r,
          lastMessage: text,
          messages: [...r.messages, newMsg]
        };
      }
      return r;
    });
    handleUpdateRooms(updated);
  };

  const handleAddUserAdminSuccess = (newUser: any) => {
    console.log("Newly registered internal user:", newUser);
    // Real-time integration simulation: can append user to some roster
  };

  const handleToggleDarkMode = () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    localStorage.setItem("justitia_dark_mode", String(newVal));
  };

  const handleLoginSuccess = (loginData: { name: string; email: string; role: "client" | "admin" }) => {
    setUser(loginData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentTab("landing");
  };

  const handleRegisterSubmit = (formData: any) => {
    // Optionally create a provisional user on register
    console.log("Provisional User Created:", formData);
  };

  // State parameter for opening a specific project detail
  const [focusedProjectId, setFocusedProjectId] = useState<string | undefined>(undefined);

  const handleNavigateToTab = (tab: string, argumentId?: string) => {
    if (tab === "projects" && argumentId) {
      setFocusedProjectId(argumentId);
    } else {
      setFocusedProjectId(undefined);
    }
    setCurrentTab(tab);
  };

  // Renders the active layout depending on the router tab
  const renderTabContent = () => {
    if (!user) {
      switch (currentTab) {
        case "landing":
          return <LandingPage onNavigate={handleNavigateToTab} />;
        case "login":
          return <Login onNavigate={handleNavigateToTab} onLoginSuccess={handleLoginSuccess} />;
        case "register":
          return <Register onNavigate={handleNavigateToTab} onRegisterSubmit={handleRegisterSubmit} />;
        case "verify-email":
          return <EmailVerification onNavigate={handleNavigateToTab} clientEmail="aulia@ptabc.com" />;
        default:
          return <LandingPage onNavigate={handleNavigateToTab} />;
      }
    }

    // If logged in, provide layout wrapper with Sidebar
    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Sidebar
          currentTab={currentTab}
          onTabChange={handleNavigateToTab}
          user={user}
          onLogout={handleLogout}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />

        {/* Content canvas with responsive margins */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 lg:max-w-[calc(100vw-256px)] overflow-x-hidden">
          {(() => {
            switch (currentTab) {
              case "home":
                return (
                  <HomeDashboard
                    projects={projects}
                    tasks={tasks}
                    documents={documents}
                    user={user}
                    onNavigateToTab={handleNavigateToTab}
                    onSendMessageToEsa={handleSendMessageToEsa}
                  />
                );
              case "projects":
                return (
                  <ProjectDetail
                    projects={projects}
                    tasks={tasks}
                    documents={documents}
                    initialProjectId={focusedProjectId}
                    onUpdateTasks={handleUpdateTasks}
                    onUpdateDocuments={handleUpdateDocuments}
                  />
                );
              case "ai-assistant":
                return <JustitiaAIAssistant documents={documents} />;
              case "messages":
                return <MessagingPortal chatRooms={chatRooms} user={user} onUpdateRooms={handleUpdateRooms} />;
              case "tickets":
                return (
                  <ResolutionCenter
                    tickets={tickets}
                    projects={projects}
                    faqs={faqs}
                    user={user}
                    onUpdateTickets={handleUpdateTickets}
                  />
                );
              case "profile":
                return <UserProfile user={user} onUpdateUser={setUser} />;
              case "admin-add-user":
                return <AddUserAdmin onAddUserSuccess={handleAddUserAdminSuccess} />;
              default:
                return (
                  <HomeDashboard
                    projects={projects}
                    tasks={tasks}
                    documents={documents}
                    user={user}
                    onNavigateToTab={handleNavigateToTab}
                    onSendMessageToEsa={handleSendMessageToEsa}
                  />
                );
            }
          })()}
        </main>
      </div>
    );
  };

  return (
    <div className={darkMode ? "dark" : ""} id="app-theme-wrapper">
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-150">
        {renderTabContent()}
      </div>
    </div>
  );
}
