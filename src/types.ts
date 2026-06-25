export type UserRole = "client" | "consultant" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  businessName?: string;
  businessType?: string; // e.g., PT, CV, UMKM
  businessSector?: string; // e.g., F&B, Retail, Tech
  avatar?: string;
  joinDate?: string;
}

export interface Project {
  id: string;
  name: string;
  type: string; // e.g., "Pendirian PT", "Pendaftaran HKI"
  clientName: string;
  status: "active" | "completed" | "pending";
  progress: number; // percentage (0 - 100)
  dateCreated: string;
  description: string;
  category: "Notaris" | "Law Firm" | "HKI" | "Compliance" | "Pajak";
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  dueDate: string;
  assignedTo: string;
}

export interface ProjectDocument {
  id: string;
  projectId: string;
  name: string;
  type: string; // e.g., "PDF", "Doc", "Image"
  size: string;
  status: "approved" | "pending" | "rejected";
  dateUploaded: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "client" | "consultant" | "system";
  content: string;
  timestamp: string;
  attachments?: { name: string; size: string; type: string }[];
}

export interface ChatRoom {
  id: string;
  title: string;
  lastMessage: string;
  unreadCount: number;
  consultantName: string;
  consultantRole: string;
  avatar?: string;
  messages: ChatMessage[];
}

export interface TicketResponse {
  id: string;
  senderName: string;
  senderRole: "client" | "consultant";
  content: string;
  timestamp: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  title: string;
  category: string;
  projectId?: string;
  description: string;
  status: "active" | "resolved";
  dateSubmitted: string;
  responses: TicketResponse[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
