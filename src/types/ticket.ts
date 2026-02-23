import { Timestamp } from "firebase/firestore";

export type TicketEstado = "Pendiente" | "En Proceso" | "Terminado";

export type TipoDispositivo =
  | "Laptop"
  | "PC de Escritorio"
  | "Consola"
  | "Celular"
  | "Tablet"
  | "Otro";

export type TipoServicio =
  | "Mantenimiento Preventivo"
  | "Mantenimiento Correctivo"
  | "Formateo e Instalación de SO"
  | "Instalación de Software"
  | "Reparación de Hardware"
  | "Reparación de Consola"
  | "Asesoría Técnica"
  | "Otro";

export interface Ticket {
  id: string;
  clienteNombre: string;
  whatsapp: string;
  tipoDispositivo: TipoDispositivo;
  tipoServicio: TipoServicio;
  descripcionProblema: string;
  estado: TicketEstado;
  fecha: Timestamp;
}

export type NuevoTicket = Omit<Ticket, "id" | "fecha" | "estado">;
