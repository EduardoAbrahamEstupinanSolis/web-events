// Shared by the browser and the backend (api/citas.ts), so imports use explicit .js extensions
import type { BookingScheduleForm, BookingRecord, SelectedItemSummary } from '../types';
import { EVENTS_DATA } from '../data/eventsData.js';

const STORAGE_KEY = 'casa_del_obrero_bookings_v1';

// Same-origin serverless API by default (Vercel /api or the Vite dev middleware)
export const API_BASE_URL: string = import.meta.env?.VITE_API_URL || '/api';

/**
 * Calculates item totals, base venue fee, and total estimate
 */
export function calculateBookingQuote(
  eventTypeId: string,
  _guestCount: number,
  selectedItemsMap: Record<string, number>
) {
  const eventCategory = EVENTS_DATA.find((e) => e.id === eventTypeId) || EVENTS_DATA[0];
  const venueBasePrice = eventCategory.baseVenuePrice;

  const formattedItems: SelectedItemSummary[] = [];
  let itemsSubtotal = 0;

  // Process selected items from this event category
  eventCategory.items.forEach((item) => {
    const qty = selectedItemsMap[item.id] || 0;
    if (qty > 0) {
      // If it's "por persona" or "por platillo", multiply by quantity
      const subtotal = item.price * qty;
      itemsSubtotal += subtotal;
      formattedItems.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: qty,
        unit: item.unit,
        subtotal
      });
    }
  });

  const totalEstimated = venueBasePrice + itemsSubtotal;

  return {
    eventCategory,
    venueBasePrice,
    formattedItems,
    itemsSubtotal,
    totalEstimated
  };
}

/**
 * Format currency in MXN
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Generates an elegant booking reference code (e.g. CDO-BOD-8492)
 */
export function generateReferenceCode(eventType: string): string {
  const prefix = eventType.includes('boda')
    ? 'BOD'
    : eventType.includes('15')
    ? 'XV'
    : eventType.includes('grad')
    ? 'GRD'
    : 'CDO';
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `CDO-${prefix}-${randomNum}`;
}

/**
 * Submits a new booking/appointment to the backend (POST /api/citas).
 * The backend recalculates the quote, saves it in Supabase and notifies the venue by WhatsApp.
 * A copy is cached in localStorage so the "Panel de Citas" in this browser can show it.
 */
export async function submitBookingAppointment(form: BookingScheduleForm): Promise<BookingRecord> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/citas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
  } catch {
    throw new Error('No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.');
  }

  const data = await response.json().catch(() => null);
  if (!response.ok || !data) {
    throw new Error(data?.error || 'Ocurrió un error al agendar la cita. Inténtalo de nuevo.');
  }

  const newRecord = data as BookingRecord;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newRecord, ...getStoredBookings()]));
  } catch (err) {
    console.error('No se pudo guardar en localStorage', err);
  }

  return newRecord;
}

/**
 * Retrieve all local bookings
 */
export function getStoredBookings(): BookingRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Delete a booking (useful for testing/admin view)
 */
export function deleteStoredBooking(id: string): BookingRecord[] {
  const current = getStoredBookings();
  const filtered = current.filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
}

/**
 * Build a WhatsApp direct messaging URL with booking information
 */
export function buildWhatsAppLink(booking: BookingRecord, phoneNumber: string = '528441234567'): string {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(buildWhatsAppMessage(booking))}`;
}

/**
 * Plain-text WhatsApp message with the booking details (used by the link and by the backend notification)
 */
export function buildWhatsAppMessage(booking: BookingRecord): string {
  const eventName = EVENTS_DATA.find((e) => e.id === booking.eventType)?.name || booking.eventType;
  
  const itemsText = booking.formattedItems.length > 0
    ? booking.formattedItems.map((i) => ` • ${i.name} (${i.quantity}x ${formatCurrency(i.price)}) = ${formatCurrency(i.subtotal)}`).join('\n')
    : ' • Ningún platillo o extra seleccionado aún';

  return `✨ *NUEVA CITA Y COTIZACIÓN - SALÓN DE CASA DEL OBRERO* ✨
📋 *Folio:* ${booking.referenceCode}
👤 *Cliente:* ${booking.clientName}
📱 *Teléfono:* ${booking.clientPhone}
📧 *Email:* ${booking.clientEmail}
🎉 *Evento:* ${eventName}
📅 *Fecha Solicitada:* ${booking.eventDate}
⏰ *Horario:* ${booking.timeSlot}
👥 *Invitados Estimados:* ${booking.guestCount} personas

🍽️ *Platillos y Servicios Seleccionados:*
${itemsText}

💰 *Subtotal Servicios:* ${formatCurrency(booking.itemsSubtotal)}
🏛️ *Renta Base del Salón:* ${formatCurrency(booking.venueBasePrice)}
💵 *Estimado Total:* ${formatCurrency(booking.totalEstimated)}

💬 *Notas del cliente:* ${booking.additionalNotes || 'Sin notas adicionales'}

_Enviado desde el portal web de Salón de Casa del Obrero_`;
}
