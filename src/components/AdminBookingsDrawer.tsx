import { useState, FC } from 'react';
import { X, Database, Trash2, Download, Copy, Check, Calendar, Code } from 'lucide-react';
import { BookingRecord } from '../types';
import { formatCurrency, deleteStoredBooking, API_BASE_URL } from '../services/bookingService';

interface AdminBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onBookingsUpdated: (updated: BookingRecord[]) => void;
}

export const AdminBookingsDrawer: FC<AdminBookingsDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  onBookingsUpdated,
}) => {
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showCurlSnippet, setShowCurlSnippet] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDelete = (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar esta cita de prueba?')) {
      const remaining = deleteStoredBooking(id);
      onBookingsUpdated(remaining);
      if (selectedBooking?.id === id) {
        setSelectedBooking(null);
      }
    }
  };

  const handleExportAll = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(bookings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `citas_casa_del_obrero_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyRecord = (record: BookingRecord) => {
    navigator.clipboard.writeText(JSON.stringify(record, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-slate-950 text-stone-100 h-full flex flex-col shadow-2xl border-l border-amber-500/20">
        {/* Drawer Header */}
        <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Bandeja de Citas Agendadas
              </h3>
              <p className="text-xs text-amber-400">
                {bookings.length} cita(s) registradas localmente (Listo para Backend)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Developer Backend Integration Note */}
        <div className="p-4 bg-amber-500/10 border-b border-amber-500/20 text-xs text-stone-300">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-amber-300 flex items-center gap-1">
              <Code className="w-3.5 h-3.5" />
              Integración con tu Backend:
            </span>
            <button
              onClick={() => setShowCurlSnippet(!showCurlSnippet)}
              className="text-[11px] underline text-amber-400 hover:text-amber-200"
            >
              {showCurlSnippet ? 'Ocultar código de ejemplo' : 'Ver endpoint sugerido'}
            </button>
          </div>
          <p className="text-[11px] text-stone-400">
            Servicio configurado en <code>src/services/bookingService.ts</code> con URL: <code className="text-amber-300">{API_BASE_URL}</code>
          </p>

          {showCurlSnippet && (
            <div className="mt-2 p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-[11px] text-amber-300 overflow-x-auto">
              <p className="text-stone-400">// Endpoint esperado en tu backend:</p>
              <p>POST /api/citas</p>
              <p className="text-stone-400">// Body esperado: JSON con campos clientName, clientPhone, eventType, etc.</p>
            </div>
          )}
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16 text-stone-400">
              <Calendar className="w-12 h-12 text-slate-800 mx-auto mb-3" />
              <p className="text-sm font-semibold text-stone-300">Aún no hay citas agendadas</p>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Usa el botón "Agendar Cita" en la página principal para crear citas de prueba y verificar el payload.
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className={`p-4 rounded-2xl border transition-all ${
                  selectedBooking?.id === booking.id
                    ? 'bg-amber-500/10 border-amber-500'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="font-mono text-[11px] text-amber-400 font-bold bg-amber-500/20 px-2 py-0.5 rounded">
                      {booking.referenceCode}
                    </span>
                    <h4 className="font-serif text-base font-bold text-white mt-1">
                      {booking.clientName}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-amber-300 text-sm">
                      {formatCurrency(booking.totalEstimated)}
                    </span>
                    <span className="block text-[10px] text-stone-400">
                      {new Date(booking.createdAt).toLocaleDateString('es-MX')}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-stone-300 space-y-1 mb-3">
                  <p>
                    <strong className="text-stone-400">Evento:</strong>{' '}
                    <span className="capitalize">{booking.eventType}</span> ({booking.guestCount} invitados)
                  </p>
                  <p>
                    <strong className="text-stone-400">Fecha solicitada:</strong> {booking.eventDate} ({booking.timeSlot})
                  </p>
                  <p>
                    <strong className="text-stone-400">Teléfono:</strong> {booking.clientPhone}
                  </p>
                  <p>
                    <strong className="text-stone-400">Email:</strong> {booking.clientEmail}
                  </p>
                  {booking.formattedItems.length > 0 && (
                    <p className="text-amber-200/90 text-[11px]">
                      <strong>Platillos:</strong>{' '}
                      {booking.formattedItems.map((i) => `${i.name} (${i.quantity})`).join(', ')}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  <button
                    onClick={() => handleCopyRecord(booking)}
                    className="flex items-center gap-1 text-stone-400 hover:text-amber-300"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copiar JSON</span>
                  </button>

                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="flex items-center gap-1 text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {bookings.length > 0 && (
          <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-stone-400">Total: {bookings.length} registros</span>
            <button
              onClick={handleExportAll}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow"
            >
              <Download className="w-4 h-4" />
              <span>Exportar Todo a JSON</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
