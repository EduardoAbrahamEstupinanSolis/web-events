export type ItemUnit = 'por persona' | 'por platillo' | 'servicio completo' | 'por paquete' | 'por hora';

export type ItemCategory = 'comida' | 'bebida' | 'decoracion' | 'musica' | 'mobiliario' | 'extra';

export interface EventItem {
  id: string;
  name: string;
  price: number;
  unit: ItemUnit;
  category: ItemCategory;
  description: string;
  isPopular?: boolean;
  image?: string;
}

export interface EventCategory {
  id: string;
  name: string; // e.g. "Evento de bodas", "15 años"
  slug: string;
  tagline: string;
  description: string;
  baseVenuePrice: number;
  recommendedGuests: string;
  imageUrl: string;
  accentColor: string;
  features: string[];
  items: EventItem[];
  // Raw key-value representation matching user prompt: {"chilidogs": 200, "Carne": 400}
  rawPriceMap: Record<string, number>;
}

export interface SelectedItemSummary {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: ItemUnit;
  subtotal: number;
}

export interface BookingScheduleForm {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  eventDate: string;
  timeSlot: string;
  guestCount: number;
  selectedItems: Record<string, number>; // itemId -> quantity
  additionalNotes: string;
}

export interface BookingRecord extends BookingScheduleForm {
  id: string;
  referenceCode: string;
  createdAt: string;
  status: 'pendiente' | 'confirmada' | 'en_revision' | 'cancelada';
  venueBasePrice: number;
  itemsSubtotal: number;
  totalEstimated: number;
  formattedItems: SelectedItemSummary[];
  whatsappNotified?: boolean; // true when the backend delivered the WhatsApp notice to the venue
}
