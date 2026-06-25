import React, { useState } from "react";
import {
  Search,
  Check,
  CheckCheck,
  Send,
  Paperclip,
  Phone,
  Video,
  Info,
  ChevronRight,
  ShieldAlert,
  Download,
  Mail,
  MapPin,
  Briefcase
} from "lucide-react";
import { ChatRoom, ChatMessage } from "../types";

interface MessagingPortalProps {
  chatRooms: ChatRoom[];
  user: { name: string; email: string };
  onUpdateRooms: (updatedRooms: ChatRoom[]) => void;
}

export default function MessagingPortal({ chatRooms, user, onUpdateRooms }: MessagingPortalProps) {
  const [selectedRoomId, setSelectedRoomId] = useState(chatRooms[0]?.id || "");
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const activeRoom = chatRooms.find((r) => r.id === selectedRoomId) || chatRooms[0];

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    // Mark room as read
    const updated = chatRooms.map((r) => {
      if (r.id === roomId) {
        return { ...r, unreadCount: 0 };
      }
      return r;
    });
    onUpdateRooms(updated);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeRoom) return;

    const newMessage: ChatMessage = {
      id: `m-client-${Date.now()}`,
      senderId: "client-aulia",
      senderName: user.name,
      senderRole: "client",
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedRooms = chatRooms.map((r) => {
      if (r.id === activeRoom.id) {
        const updatedMessages = [...r.messages, newMessage];
        return {
          ...r,
          lastMessage: inputText,
          messages: updatedMessages
        };
      }
      return r;
    });

    onUpdateRooms(updatedRooms);
    setInputText("");

    // Simulate realistic consultant response after 1.5 seconds to make the app feel alive!
    setTimeout(() => {
      let replyText = "";
      if (activeRoom.id === "room-esa") {
        replyText = "Terima kasih responnya, Ibu Aulia. Saya catat drafnya. Mengenai revisi Pasal 5 Anggaran Dasar, mari kita finalisasi dan jadwalkan luring bersama Bapak Budi Santoso hari Kamis depan.";
      } else {
        replyText = "Baik Ibu Aulia, jadwal luring penandatanganan akta resmi sudah saya bukukan di kantor kami. Harap seluruh pemegang saham membawa dokumen KTP asli masing-masing.";
      }

      const consultantMessage: ChatMessage = {
        id: `m-esa-${Date.now()}`,
        senderId: activeRoom.id === "room-esa" ? "esa-consultant" : "budi-notaris",
        senderName: activeRoom.title,
        senderRole: "consultant",
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const finalRooms = updatedRooms.map((r) => {
        if (r.id === activeRoom.id) {
          return {
            ...r,
            lastMessage: replyText,
            messages: [...r.messages, consultantMessage]
          };
        }
        return r;
      });
      onUpdateRooms(finalRooms);
    }, 1500);
  };

  // Filter chat rooms based on search query
  const filteredRooms = chatRooms.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.consultantRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm h-[650px] overflow-hidden grid grid-cols-1 md:grid-cols-12 font-sans" id="messaging-hub-panel">
      {/* Left Column: Chat Room Threads List (4 cols) */}
      <div className="md:col-span-4 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/25">
        {/* Search header bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3 shrink-0">
          <h3 className="font-bold text-sm text-slate-950 dark:text-white uppercase tracking-wider font-mono">Pesan Konsultasi</h3>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Cari konsultan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs focus:outline-none focus:border-amber-400 text-slate-900 dark:text-white transition"
            />
          </div>
        </div>

        {/* Room List scroll container */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-2 space-y-1">
          {filteredRooms.map((room) => {
            const isSelected = room.id === selectedRoomId;
            return (
              <button
                key={room.id}
                onClick={() => handleSelectRoom(room.id)}
                className={`w-full flex items-start space-x-3.5 p-3.5 rounded-xl transition text-left block ${
                  isSelected
                    ? "bg-amber-400/10 border border-amber-400/20 text-slate-900 dark:text-white"
                    : "border border-transparent hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="relative shrink-0 mt-0.5">
                  <img
                    src={room.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                    alt={room.title}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950"></span>
                </div>

                <div className="overflow-hidden flex-1 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-extrabold text-xs block truncate text-slate-900 dark:text-white">{room.consultantName}</span>
                    {room.messages.length > 0 && (
                      <span className="text-[9px] font-mono text-slate-400">{room.messages[room.messages.length - 1].timestamp}</span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 block truncate font-medium">{room.consultantRole}</span>
                  <p className="text-[11px] text-slate-400 truncate leading-normal italic mt-0.5">
                    {room.lastMessage}
                  </p>
                </div>

                {room.unreadCount > 0 && (
                  <span className="bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 mt-2">
                    {room.unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Center Column: Message Bubble Stream (5 cols on desktop) */}
      <div className="md:col-span-5 flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
        {/* Active room header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/10 shrink-0">
          <div>
            <h4 className="font-bold text-xs text-slate-950 dark:text-white">{activeRoom?.consultantName}</h4>
            <p className="text-[10px] text-emerald-500 mt-0.5 font-medium">● Online • Siap Mendampingi</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg transition">
              <Phone className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg transition">
              <Video className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs bg-slate-50/30 dark:bg-slate-950/10">
          {activeRoom?.messages.map((msg) => {
            const isClient = msg.senderRole === "client";
            return (
              <div key={msg.id} className={`flex flex-col max-w-[85%] ${isClient ? "ml-auto items-end" : "items-start"}`}>
                <span className="text-[9px] text-slate-400 font-mono mb-1">{msg.senderName}</span>
                <div
                  className={`p-3 rounded-2xl leading-relaxed text-xs ${
                    isClient
                      ? "bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 font-medium rounded-tr-none"
                      : "bg-white dark:bg-slate-850 border border-slate-200/55 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
                <span className="text-[8px] text-slate-400 font-mono mt-1">{msg.timestamp}</span>
              </div>
            );
          })}
        </div>

        {/* Reply form console */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0 flex items-center gap-2.5 bg-white dark:bg-slate-900">
          <button
            type="button"
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl transition"
            onClick={() => alert("Lampirkan dokumen hukum pendukung di halaman Proyek Saya.")}
          >
            <Paperclip className="h-4.5 w-4.5" />
          </button>
          <input
            type="text"
            placeholder="Tulis balasan pesan konsultasi..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-amber-400 text-slate-900 dark:text-white transition"
          />
          <button
            type="submit"
            className="p-2.5 bg-slate-950 dark:bg-amber-400 text-white dark:text-slate-950 rounded-xl hover:opacity-90 transition shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Right Column: Consultant Profile Drawer (3 cols on desktop) */}
      <div className="md:col-span-3 bg-slate-50/50 dark:bg-slate-950/20 p-5 flex flex-col justify-between overflow-y-auto h-full hidden md:flex">
        <div className="space-y-6">
          <div className="text-center space-y-3 pb-5 border-b border-slate-200 dark:border-slate-800">
            <img
              src={activeRoom?.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"}
              alt={activeRoom?.title}
              className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-slate-200 dark:border-slate-800 shadow-sm"
            />
            <div>
              <h4 className="font-extrabold text-xs text-slate-950 dark:text-white">{activeRoom?.consultantName}</h4>
              <p className="text-[10px] text-amber-600 dark:text-amber-400 font-mono uppercase tracking-wider font-bold mt-0.5">
                {activeRoom?.consultantRole}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300">
              <Mail className="h-4.5 w-4.5 text-slate-400 shrink-0" />
              <div className="overflow-hidden">
                <span className="block font-semibold text-[10px] text-slate-400">EMAIL RESMI</span>
                <span className="truncate block">{activeRoom?.id === "room-esa" ? "esa.unggul@justitia.com" : "budi.notaris@justitia.com"}</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300">
              <MapPin className="h-4.5 w-4.5 text-slate-400 shrink-0" />
              <div>
                <span className="block font-semibold text-[10px] text-slate-400">KANTOR REKANAN</span>
                <span>Sudirman Central Business District (SCBD) Tower B, Lt. 14, Jakarta</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-300">
              <Briefcase className="h-4.5 w-4.5 text-slate-400 shrink-0" />
              <div>
                <span className="block font-semibold text-[10px] text-slate-400">PROYEK TERKAIT</span>
                <span className="block font-bold text-slate-900 dark:text-amber-400 mt-1">PT ABC (Pendirian PT)</span>
                <span className="block text-[10px] text-slate-400">Audit Kepatuhan PT Nusantara</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/15 p-3.5 rounded-xl flex items-start space-x-2.5 text-[10px] text-amber-700 dark:text-amber-400 mt-4">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <p className="leading-relaxed">
            Notaris Budi Santoso & Adv. Esa Unggul tunduk resmi pada Kode Etik Advokat & Ikatan Notaris Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
}
