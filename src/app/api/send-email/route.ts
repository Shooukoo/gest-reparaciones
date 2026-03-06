import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Transporte de Nodemailer (Gmail SMTP) ────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ─── Helpers HTML ─────────────────────────────────────────────────────────────
function badge(text: string, color: string) {
  return `<span style="display:inline-block;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:700;background:${color};color:#fff;">${text}</span>`;
}

function estadoBadge(estado: string) {
  const colors: Record<string, string> = {
    Pendiente: "#d97706",
    "En Proceso": "#7c3aed",
    Terminado: "#059669",
  };
  return badge(estado, colors[estado] ?? "#6b7280");
}

function buildNuevoTicketHtml(data: EmailPayload) {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:'Segoe UI',Arial,sans-serif;color:#e4e4e7;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="560" style="max-width:560px;background:#18181b;border-radius:16px;overflow:hidden;border:1px solid #27272a;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#7c3aed,#6d28d9);padding:28px 32px;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#c4b5fd;letter-spacing:2px;text-transform:uppercase;">Un Ingeniero Más</p>
          <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#fff;">🛠️ Nueva Solicitud de Servicio</h1>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:28px 32px;">
          <p style="margin:0 0 20px;font-size:14px;color:#a1a1aa;">Se ha recibido una nueva solicitud a través del formulario.</p>

          <!-- Ticket Code -->
          <div style="background:#09090b;border:1px solid #7c3aed;border-radius:12px;padding:16px 20px;margin-bottom:24px;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Código de Ticket</p>
            <p style="margin:0;font-size:24px;font-weight:900;color:#a78bfa;letter-spacing:4px;font-family:monospace;">${data.ticketCode}</p>
          </div>

          <!-- Data table -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${row("👤 Cliente", data.cliente ?? "—")}
            ${row("📱 WhatsApp", data.whatsapp ?? "—")}
            ${row("💻 Dispositivo", data.dispositivo ?? "—")}
            ${row("🔧 Servicio", data.servicio ?? "—")}
          </table>

          <!-- Descripción -->
          <div style="margin-top:20px;background:#09090b;border-radius:12px;padding:16px 20px;border:1px solid #27272a;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#71717a;text-transform:uppercase;letter-spacing:1px;">Descripción del problema</p>
            <p style="margin:0;font-size:14px;color:#d4d4d8;line-height:1.6;">${data.descripcion ?? "Sin descripción."}</p>
          </div>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:20px 32px;border-top:1px solid #27272a;">
          <p style="margin:0;font-size:12px;color:#52525b;text-align:center;">Este aviso fue generado automáticamente · Un Ingeniero Más</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildCambioEstadoHtml(data: EmailPayload) {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:'Segoe UI',Arial,sans-serif;color:#e4e4e7;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="560" style="max-width:560px;background:#18181b;border-radius:16px;overflow:hidden;border:1px solid #27272a;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1e1b4b,#312e81);padding:28px 32px;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#a5b4fc;letter-spacing:2px;text-transform:uppercase;">Un Ingeniero Más</p>
          <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#fff;">📋 Ticket Actualizado</h1>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:28px 32px;">
          <!-- Ticket Code -->
          <div style="background:#09090b;border:1px solid #3730a3;border-radius:12px;padding:14px 20px;margin-bottom:24px;text-align:center;">
            <p style="margin:0 0 4px;font-size:11px;color:#a1a1aa;text-transform:uppercase;letter-spacing:1px;">Código de Ticket</p>
            <p style="margin:0;font-size:22px;font-weight:900;color:#818cf8;letter-spacing:4px;font-family:monospace;">${data.ticketCode}</p>
          </div>

          <!-- New state -->
          <div style="text-align:center;margin-bottom:24px;">
            <p style="margin:0 0 10px;font-size:13px;color:#a1a1aa;">Nuevo estado:</p>
            ${estadoBadge(data.nuevoEstado ?? "")}
          </div>

          <!-- Data table -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${row("👤 Cliente", data.cliente ?? "—")}
            ${row("📱 WhatsApp", data.whatsapp ?? "—")}
            ${row("💻 Dispositivo", data.dispositivo ?? "—")}
            ${row("🔧 Servicio", data.servicio ?? "—")}
          </table>
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:20px 32px;border-top:1px solid #27272a;">
          <p style="margin:0;font-size:12px;color:#52525b;text-align:center;">Este aviso fue generado automáticamente · Un Ingeniero Más</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string) {
  return `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #27272a;font-size:12px;font-weight:600;color:#71717a;width:40%;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #27272a;font-size:14px;color:#e4e4e7;vertical-align:top;">${value}</td>
  </tr>`;
}

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface EmailPayload {
  tipo: "nuevo_ticket" | "cambio_estado";
  ticketCode: string;
  cliente?: string;
  dispositivo?: string;
  servicio?: string;
  descripcion?: string;
  whatsapp?: string;
  nuevoEstado?: string;
}

// ─── Handler POST ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const data: EmailPayload = await req.json();

    if (!data.tipo || !data.ticketCode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const isNuevo = data.tipo === "nuevo_ticket";

    const mailOptions = {
      from: `"Un Ingeniero Más 🛠️" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: isNuevo
        ? `🛠️ Nueva Solicitud de Servicio — ${data.ticketCode}`
        : `📋 Actualización de Ticket — ${data.ticketCode} → ${data.nuevoEstado}`,
      html: isNuevo ? buildNuevoTicketHtml(data) : buildCambioEstadoHtml(data),
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[send-email] Error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
