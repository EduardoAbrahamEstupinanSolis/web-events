import { useState, useEffect, useMemo, FC, FormEvent } from 'react';
import { X, Calendar, Clock, Users, Utensils, User, Phone, Mail, FileText, CheckCircle2, MessageSquare, ArrowRight, ArrowLeft, Loader2, Download, AlertCircle } from 'lucide-react';
import { EVENTS_DATA, VENUE_INFO } from '../data/eventsData';
import { BookingScheduleForm, BookingRecord } from '../types';
import { submitBookingAppointment, formatCurrency, buildWhatsAppLink, calculateBookingQuote } from '../services/bookingService';

interface ScheduleBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEventType?: string;
  initialGuestCount?: number;
  initialSelectedItems?: Record<string, number>;
  onBookingCreated?: (record: BookingRecord) => void;
}

export const ScheduleBookingModal: FC<ScheduleBookingModalProps> = ({
  isOpen,
  onClose,
  initialEventType = 'bodas',
  initialGuestCount = 150,
  initialSelectedItems = {},
  onBookingCreated,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdBooking, setCreatedBooking] = useState<BookingRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [eventType, setEventType] = useState<string>(initialEventType);
  const [eventDate, setEventDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>(VENUE_INFO.scheduleSlots[2].label); // default Nocturno
  const [guestCount, setGuestCount] = useState<number>(initialGuestCount);
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>(initialSelectedItems);

  // Contact State
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  // Sync state when props change
  useEffect(() => {
    if (isOpen) {
      if (initialEventType) setEventType(initialEventType);
      if (initialGuestCount) setGuestCount(initialGuestCount);
      if (initialSelectedItems && Object.keys(initialSelectedItems).length > 0) {
        setSelectedItems(initialSelectedItems);
      }
      // Set min date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      if (!eventDate) setEventDate(`${yyyy}-${mm}-${dd}`);
      setStep(1);
      setCreatedBooking(null);
      setErrorMsg(null);
    }
  }, [isOpen, initialEventType, initialGuestCount, initialSelectedItems]);

  const currentCategory = useMemo(() => {
    return EVENTS_DATA.find((e) => e.id === eventType) || EVENTS_DATA[0];
  }, [eventType]);

  const quote = useMemo(() => {
    return calculateBookingQuote(eventType, guestCount, selectedItems);
  }, [eventType, guestCount, selectedItems]);

  if (!isOpen) return null;

  // Toggle item in modal
  const handleToggleItem = (itemId: string, unit: string) => {
    setSelectedItems((prev) => {
      const current = prev[itemId] || 0;
      if (current > 0) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      } else {
        const defaultQty = unit === 'servicio completo' ? 1 : guestCount;
        return { ...prev, [itemId]: defaultQty };
      }
    });
  };

  const handleUpdateItemQty = (itemId: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  // Step 1 Validation
  const validateStep1 = () => {
    if (!eventDate) {
      setErrorMsg('Por favor selecciona una fecha para tu evento o cita.');
      return false;
    }
    if (!timeSlot) {
      setErrorMsg('Por favor selecciona un horario preferido.');
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  // Step 3 Validation & Submit
  const handleSubmitBooking = async (e: FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setErrorMsg('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!clientPhone.trim() || clientPhone.length < 8) {
      setErrorMsg('Por favor proporciona un número de teléfono o WhatsApp válido.');
      return;
    }
    if (!clientEmail.trim() || !clientEmail.includes('@')) {
      setErrorMsg('Por favor proporciona un correo electrónico válido.');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const payload: BookingScheduleForm = {
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        clientPhone: clientPhone.trim(),
        eventType,
        eventDate,
        timeSlot,
        guestCount,
        selectedItems,
        additionalNotes: additionalNotes.trim(),
      };

      const record = await submitBookingAppointment(payload);
      setCreatedBooking(record);
      setStep(4); // Success screen
      if (onBookingCreated) {
        onBookingCreated(record);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Ocurrió un error al agendar la cita. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Export JSON file for backend verification
  const handleDownloadJSON = () => {
    if (!createdBooking) return;
    const blob = new Blob([JSON.stringify(createdBooking, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cita_${createdBooking.referenceCode}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-950 text-stone-100 rounded-3xl max-w-3xl w-full border border-amber-500/30 shadow-2xl overflow-hidden relative my-auto animate-fade-in">
        {/* Top Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
                Agendar Cita & Presupuesto
              </h3>
              <p className="text-xs text-amber-400 font-medium">
                Salón de Casa del Obrero
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (Steps 1 to 3) */}
        {step < 4 && (
          <div className="px-6 pt-4 pb-2 bg-slate-900/60 border-b border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-400 mb-2">
              <span className={step >= 1 ? 'text-amber-400' : ''}>1. Evento & Fecha</span>
              <span className={step >= 2 ? 'text-amber-400' : ''}>2. Platillos & Menú</span>
              <span className={step >= 3 ? 'text-amber-400' : ''}>3. Datos de Contacto</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* ----------------- PASO 1: EVENTO, FECHA Y HORARIO ----------------- */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  Tipo de Celebración
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {EVENTS_DATA.map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => {
                        setEventType(event.id);
                        setSelectedItems({}); // Reset when changing category
                      }}
                      className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all ${
                        eventType === event.id
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                          : 'bg-slate-900 text-stone-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {event.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Fecha Deseada del Evento o Cita
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    Invitados Estimados ({guestCount} personas)
                  </label>
                  <input
                    type="number"
                    min="20"
                    max="600"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Math.max(20, parseInt(e.target.value) || 20))}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Horario de Interés
                </label>
                <div className="space-y-2">
                  {VENUE_INFO.scheduleSlots.map((slot) => (
                    <label
                      key={slot.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        timeSlot === slot.label
                          ? 'bg-amber-500/10 border-amber-500/60'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="scheduleSlot"
                        checked={timeSlot === slot.label}
                        onChange={() => setTimeSlot(slot.label)}
                        className="mt-1 text-amber-500 focus:ring-0 accent-amber-500"
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">{slot.label}</p>
                        <p className="text-xs text-stone-400">{slot.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ----------------- PASO 2: PLATILLOS Y EXTRAS ----------------- */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-amber-400" />
                    Selecciona Platillos para {currentCategory.name}
                  </h4>
                  <p className="text-xs text-stone-400">
                    Opcional: puedes seleccionarlos ahora o definirlos durante tu cita presencial.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase">Subtotal Actual</span>
                  <p className="font-mono font-bold text-amber-400 text-base">
                    {formatCurrency(quote.totalEstimated)}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                {currentCategory.items.map((item) => {
                  const qty = selectedItems[item.id] || 0;
                  const isChecked = qty > 0;

                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500/60'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleItem(item.id, item.unit)}
                          className="w-4 h-4 rounded text-amber-500 focus:ring-0 accent-amber-500"
                        />
                        <div>
                          <p className="text-sm font-bold text-white capitalize">{item.name}</p>
                          <p className="text-xs text-amber-400">
                            {formatCurrency(item.price)}{' '}
                            <span className="text-stone-400 text-[10px]">({item.unit})</span>
                          </p>
                        </div>
                      </div>

                      {isChecked && (
                        <div className="flex items-center gap-2 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                          <button
                            type="button"
                            onClick={() => handleUpdateItemQty(item.id, -10)}
                            className="px-1.5 py-0.5 text-xs text-stone-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono font-bold text-amber-300">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateItemQty(item.id, 10)}
                            className="px-1.5 py-0.5 text-xs text-stone-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ----------------- PASO 3: DATOS DEL CLIENTE ----------------- */}
          {step === 3 && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Roberto Morales / Sofía Martínez"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    Teléfono o WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 844 123 4567"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contacto@ejemplo.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Comentarios o Requerimientos Especiales (Opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="¿Deseas degustación de platillos, música en vivo o algún detalle especial?"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Quick Summary Pill */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-300">Total preliminar:</span>
                  <span className="font-serif font-bold text-amber-400 text-sm ml-2">
                    {formatCurrency(quote.totalEstimated)}
                  </span>
                </div>
                <span className="text-stone-400">{guestCount} invitados | {eventDate}</span>
              </div>
            </form>
          )}

          {/* ----------------- PASO 4: CONFIRMACIÓN EXITOSA ----------------- */}
          {step === 4 && createdBooking && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                  Folio: {createdBooking.referenceCode}
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-3">
                  ¡Cita Agendada con Éxito!
                </h4>
                <p className="text-stone-300 text-sm max-w-md mx-auto mt-2">
                  Hemos registrado tu solicitud para el <strong>{createdBooking.eventDate}</strong> en <strong>Salón de Casa del Obrero</strong>. Nuestro coordinador se comunicará contigo.
                </p>
                <p className={`text-xs mt-2 ${createdBooking.whatsappNotified ? 'text-emerald-400' : 'text-stone-400'}`}>
                  {createdBooking.whatsappNotified
                    ? 'El salón ya recibió tu solicitud por WhatsApp.'
                    : 'Si lo deseas, confirma también tu cita por WhatsApp con el botón de abajo.'}
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-left text-xs space-y-2.5 max-w-lg mx-auto">
                <div className="flex justify-between">
                  <span className="text-stone-400">Cliente:</span>
                  <span className="font-semibold text-white">{createdBooking.clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Evento:</span>
                  <span className="font-semibold text-amber-400">{currentCategory.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Horario:</span>
                  <span className="font-semibold text-white">{createdBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Invitados:</span>
                  <span className="font-semibold text-white">{createdBooking.guestCount} personas</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold">
                  <span className="text-stone-200">Total Cotizado:</span>
                  <span className="text-amber-400 font-mono">
                    {formatCurrency(createdBooking.totalEstimated)}
                  </span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
                <a
                  href={buildWhatsAppLink(createdBooking, VENUE_INFO.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Confirmar por WhatsApp</span>
                </a>

                <button
                  onClick={handleDownloadJSON}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-all"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Descargar Payload JSON</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>
          ) : (
            <div />
          )}

          {step === 1 && (
            <button
              type="button"
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ml-auto"
            >
              <span>Continuar a Menús</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>Continuar a Contacto</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 3 && (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmitBooking}
              className="px-8 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Confirmar y Agendar Cita</span>
                </>
              )}
            </button>
          )}

          {step === 4 && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all ml-auto"
            >
              Listo, cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
