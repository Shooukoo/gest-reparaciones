import { Timestamp } from "firebase/firestore";

export type TicketEstado = "Pendiente" | "En Proceso" | "Terminado";

export type TipoDispositivo =
  | "Laptop"
  | "PC de Escritorio"
  | "Celular / Smartphone"
  | "Tablet"
  | "Consola"
  | "Otro";

export type TipoServicio =
  | "Mantenimiento y Limpieza"
  | "Eliminación de Virus y Malware"
  | "Formateo e Instalación de Windows/Linux"
  | "Instalación de Software"
  | "Respaldo de Información"
  | "Recuperación de Datos"
  | "Actualización de Hardware (RAM/SSD)"
  | "Actualización de Hardware (Consola)"
  | "Armado de PC a la Medida"
  | "Mantenimiento de Celular"
  | "Formateo de Celular"
  | "Eliminación de Cuenta Google/KNOX"
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
  esEstudiante?: boolean;
}

export type NuevoTicket = Omit<Ticket, "id" | "fecha" | "estado">;
