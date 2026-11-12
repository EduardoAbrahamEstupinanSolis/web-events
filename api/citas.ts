// POST /api/citas — saves a booking (cita) in Supabase and notifies the venue owner on WhatsApp.
// Runs as a Vercel Node.js function in the demo and through the Vite dev middleware locally.
import { createClient } from '@supabase/supabase-js';
import type { BookingRecord, BookingScheduleForm } from '../src/types/index.js';
import { EVENTS_DATA, VENUE_INFO } from '../src/data/eventsData.js';
import {
  calculateBookingQuote,
  generateReferenceCode,
  buildWhatsAppMessage,
} from '../src/services/bookingService.js';

const json = (status: number, body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

class ValidationError extends Error {}

const text = (value: unknown, field: string, max: number, required = true): string => {
  const v = typeof value === 'string' ? value.trim() : '';
  if (required && !v) throw new ValidationError(`El campo "${field}" es obligatorio.`);
  if (v.length > max) throw new ValidationError(`El campo "${field}" es demasiado largo.`);
  return v;
};

function parseForm(body: unknown): BookingScheduleForm {
  if (!body || typeof body !== 'object') throw new ValidationError('Solicitud inválida.');
  const b = body as Record<string, unknown>;

  const clientName = text(b.clientName, 'nombre', 120);
  const clientPhone = text(b.clientPhone, 'teléfono', 30);
  if (clientPhone.replace(/\D/g, '').length < 8) throw new ValidationError('Teléfono o WhatsApp inválido.');
  const clientEmail = text(b.clientEmail, 'correo', 160);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) throw new ValidationError('Correo electrónico inválido.');

  const eventType = text(b.eventType, 'tipo de evento', 60);
  const category = EVENTS_DATA.find((e) => e.id === eventType);
  if (!category) throw new ValidationError('Tipo de evento desconocido.');

  const eventDate = text(b.eventDate, 'fecha', 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || Number.isNaN(Date.parse(eventDate))) {
    throw new ValidationError('Fecha inválida.');
  }

  const timeSlot = text(b.timeSlot, 'horario', 120);
  if (!VENUE_INFO.scheduleSlots.some((s) => s.label === timeSlot)) throw new ValidationError('Horario inválido.');

  const guestCount = Number(b.guestCount);
  if (!Number.isInteger(guestCount) || guestCount < 20 || guestCount > 600) {
    throw new ValidationError('El número de invitados debe estar entre 20 y 600.');
  }

  // Only keep items that belong to the chosen event, with sane quantities
  const selectedItems: Record<string, number> = {};
  const rawItems = b.selectedItems && typeof b.selectedItems === 'object' ? (b.selectedItems as Record<string, unknown>) : {};
  for (const item of category.items) {
    const qty = Number(rawItems[item.id]);
    if (Number.isInteger(qty) && qty > 0 && qty <= 10000) selectedItems[item.id] = qty;
  }

  const additionalNotes = text(b.additionalNotes, 'comentarios', 2000, false);

  return { clientName, clientPhone, clientEmail, eventType, eventDate, timeSlot, guestCount, selectedItems, additionalNotes };
}

// Demo WhatsApp delivery through CallMeBot (free; the owner authorises their own number once).
async function notifyOwnerOnWhatsApp(message: string): Promise<boolean> {
  const phone = process.env.WHATSAPP_OWNER_PHONE;
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!phone || !apiKey) {
    console.warn('[citas] WhatsApp no configurado (WHATSAPP_OWNER_PHONE / CALLMEBOT_API_KEY).');
    return false;
  }
  const url = new URL('https://api.callmebot.com/whatsapp.php');
  url.searchParams.set('phone', phone);
  url.searchParams.set('text', message);
  url.searchParams.set('apikey', apiKey);
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    const body = await res.text();
    if (!res.ok || /error|invalid/i.test(body)) {
      console.error('[citas] CallMeBot rechazó el mensaje:', res.status, body.slice(0, 300));
      return false;
    }
    return true;
  } catch (err) {
    console.error('[citas] Error enviando WhatsApp:', err);
    return false;
  }
}

export async function POST(request: Request): Promise<Response> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('[citas] Faltan SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.');
    return json(500, { error: 'El servidor no está configurado. Inténtalo más tarde.' });
  }

  let form: BookingScheduleForm;
  try {
    form = parseForm(await request.json());
  } catch (err) {
    const msg = err instanceof ValidationError ? err.message : 'Solicitud inválida.';
    return json(400, { error: msg });
  }

  // Prices are always recalculated on the server, never trusted from the browser
  const quote = calculateBookingQuote(form.eventType, form.guestCount, form.selectedItems);
  const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

  let row: Record<string, unknown> | null = null;
  for (let attempt = 0; attempt < 3 && !row; attempt++) {
    const { data, error } = await supabase
      .from('citas')
      .insert({
        reference_code: generateReferenceCode(form.eventType),
        client_name: form.clientName,
        client_phone: form.clientPhone,
        client_email: form.clientEmail,
        event_type: form.eventType,
        event_date: form.eventDate,
        time_slot: form.timeSlot,
        guest_count: form.guestCount,
        selected_items: form.selectedItems,
        formatted_items: quote.formattedItems,
        additional_notes: form.additionalNotes,
        venue_base_price: quote.venueBasePrice,
        items_subtotal: quote.itemsSubtotal,
        total_estimated: quote.totalEstimated,
      })
      .select('id, reference_code, status, created_at')
      .single();
    if (error) {
      if (error.code === '23505') continue; // duplicated folio, try another one
      console.error('[citas] Error guardando en Supabase:', error);
      return json(500, { error: 'No pudimos guardar tu cita. Inténtalo de nuevo.' });
    }
    row = data;
  }
  if (!row) return json(500, { error: 'No pudimos generar un folio. Inténtalo de nuevo.' });

  const record: BookingRecord = {
    ...form,
    id: String(row.id),
    referenceCode: String(row.reference_code),
    status: row.status as BookingRecord['status'],
    createdAt: String(row.created_at),
    venueBasePrice: quote.venueBasePrice,
    itemsSubtotal: quote.itemsSubtotal,
    totalEstimated: quote.totalEstimated,
    formattedItems: quote.formattedItems,
  };

  record.whatsappNotified = await notifyOwnerOnWhatsApp(buildWhatsAppMessage(record));
  if (record.whatsappNotified) {
    const { error } = await supabase.from('citas').update({ whatsapp_notified: true }).eq('id', record.id);
    if (error) console.error('[citas] No se pudo marcar whatsapp_notified:', error);
  }

  return json(201, record);
}
