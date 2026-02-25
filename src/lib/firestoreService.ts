import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { NuevoTicket, Ticket, TicketEstado } from "@/types/ticket";

const COLLECTION = "tickets";

/**
 * Crea un nuevo ticket de reparación en Firestore.
 */
export async function addTicket(data: NuevoTicket): Promise<string> {
  // Generar código único: UIM-XXXXX (5 dígitos aleatorios)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const rand = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const code = `UIM-${rand}`;
  const docRef = doc(db, COLLECTION, code);
  await setDoc(docRef, {
    ...data,
    estado: "Pendiente" as TicketEstado,
    fecha: serverTimestamp(),
    ticketCode: code,
  });
  return code;
}

/**
 * Escucha tickets en tiempo real, ordenados por fecha descendente.
 * Retorna la función unsubscribe de onSnapshot.
 */
export function subscribeToTickets(
  callback: (tickets: Ticket[]) => void
): () => void {
  const q = query(
    collection(db, COLLECTION),
    orderBy("fecha", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const tickets: Ticket[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Ticket, "id">),
    }));
    callback(tickets);
  });
}

/**
 * Actualiza el estado de un ticket existente.
 */
export async function updateTicketStatus(ticketId: string, estado: TicketEstado): Promise<void> {
  const ticketRef = doc(db, COLLECTION, ticketId);
  await updateDoc(ticketRef, { estado });
}

export async function getTicketByCode(code: string): Promise<Ticket | null> {
  const docRef = doc(db, COLLECTION, code);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...(docSnap.data() as Omit<Ticket, 'id'>) };
}


/**
 * Obtiene todos los tickets de un número de WhatsApp (consulta pública).
 * Requiere índice compuesto en Firestore: whatsapp ASC + fecha DESC.
 */
export async function getTicketsByWhatsapp(whatsapp: string): Promise<Ticket[]> {
  const q = query(
    collection(db, COLLECTION),
    where("whatsapp", "==", whatsapp),
    orderBy("fecha", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Ticket, "id">),
  }));
}

// ─── Portfolio Contacts ───────────────────────────────────────────────────────

export interface PortfolioContact {
  id: string;
  name: string;
  whatsapp: string;
  subject: string;
  message: string;
  createdAt?: { toDate: () => Date } | null;
}

/**
 * Escucha contactos del portafolio en tiempo real.
 */
export function subscribeToPortfolioContacts(
  callback: (contacts: PortfolioContact[]) => void
): () => void {
  const q = query(
    collection(db, "portfolio_contacts"),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snapshot) => {
    const contacts: PortfolioContact[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<PortfolioContact, "id">),
    }));
    callback(contacts);
  });
}

/**
 * Elimina un contacto del portafolio.
 */
export async function deletePortfolioContact(id: string): Promise<void> {
  await deleteDoc(doc(db, "portfolio_contacts", id));
}
