import { useState, FC } from 'react';
import { Sparkles, Utensils, CheckCircle2, Calendar, Plus, Code, Copy, Check } from 'lucide-react';
import { EVENTS_DATA, RAW_PRICING_CONFIG } from '../data/eventsData';
import { formatCurrency } from '../services/bookingService';
import { EventItem } from '../types';

interface EventsCatalogProps {
  onSelectEventForBooking: (eventTypeId: string, preselectedItem?: EventItem) => void;
  onOpenCalculatorWithEvent: (eventTypeId: string) => void;
}

export const EventsCatalog: FC<EventsCatalogProps> = ({
  onSelectEventForBooking,
  onOpenCalculatorWithEvent,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>('bodas');
  const [showRawJsonModal, setShowRawJsonModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentCategory = EVENTS_DATA.find((e) => e.id === activeTabId) || EVENTS_DATA[0];

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(RAW_PRICING_CONFIG, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="eventos" className="py-20 bg-stone-100 text-stone-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Catálogo Oficial de Eventos & Tarifas
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Precios y Menús por Tipo de Evento
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg">
            Transparencia total en cada platillo y servicio. Diseña tu paquete a la medida o agenda una cita personalizada con nuestros asesores.
          </p>

          {/* Quick link to see JSON structure requested by user */}
          <div className="mt-4 inline-flex items-center gap-3">
            <button
              onClick={() => setShowRawJsonModal(true)}
              className="inline-flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100 transition-colors shadow-sm"
            >
              <Code className="w-3.5 h-3.5 text-amber-700" />
              <span>Ver Estructura de Precios (Formato JSON para Backend)</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {EVENTS_DATA.map((event) => {
            const isActive = event.id === activeTabId;
            return (
              <button
                key={event.id}
                onClick={() => setActiveTabId(event.id)}
                className={`px-5 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 border shadow-sm ${
                  isActive
                    ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-lg scale-105'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50 hover:border-amber-400'
                }`}
              >
                <span>{event.name}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
              </button>
            );
          })}
        </div>

        {/* Active Event Showcase Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-stone-200/80 overflow-hidden">
          {/* Header Banner */}
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={currentCategory.imageUrl}
              alt={currentCategory.name}
              className="w-full h-full object-cover filter brightness-[0.75] transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
                  {currentCategory.recommendedGuests}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold mt-2">
                  {currentCategory.name}
                </h3>
                <p className="text-stone-300 text-sm sm:text-base max-w-xl mt-1">
                  {currentCategory.tagline}
                </p>
              </div>

              <div className="flex flex-col sm:items-end bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <span className="text-xs text-amber-300 uppercase tracking-wider font-medium">
                  Renta base del salón desde
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {formatCurrency(currentCategory.baseVenuePrice)}
                </span>
                <button
                  onClick={() => onSelectEventForBooking(currentCategory.id)}
                  className="mt-2 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Agendar cita para este evento</span>
                </button>
              </div>
            </div>
          </div>

          {/* Details & Items Grid */}
          <div className="p-6 sm:p-10">
            {/* Description & Included Features */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10 border-b border-stone-200">
              <div className="lg:col-span-1">
                <h4 className="font-serif text-xl font-bold text-stone-900 mb-2">
                  Experiencia Exclusiva
                </h4>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {currentCategory.description}
                </p>
                <div className="mt-5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <p className="text-xs font-semibold text-amber-900">
                    💡 ¿Quieres calcular el total con invitados y platillos?
                  </p>
                  <button
                    onClick={() => onOpenCalculatorWithEvent(currentCategory.id)}
                    className="mt-2 text-xs font-bold text-amber-700 hover:text-amber-900 underline flex items-center gap-1"
                  >
                    Abrir cotizador interactivo &rarr;
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2">
                <h4 className="font-serif text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                  Amenidades y Servicios Incluidos en el Salón
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentCategory.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Menu Items & Prices Grid */}
            <div className="mt-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-amber-600" />
                    Platillos y Opciones de Menú Disponibles
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Precios fijados por unidad para <strong>{currentCategory.name}</strong>
                  </p>
                </div>

                <div className="text-xs font-medium text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
                  {currentCategory.items.length} opciones gastronómicas y extras
                </div>
              </div>

              {/* Items Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCategory.items.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white rounded-2xl border border-stone-200 hover:border-amber-400/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Image thumbnail if present */}
                      {item.image && (
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 font-extrabold text-sm border border-amber-500/40">
                              {formatCurrency(item.price)}
                            </span>
                          </div>
                          {item.isPopular && (
                            <div className="absolute top-3 left-3">
                              <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px] uppercase tracking-wider shadow">
                                Muy Solicitado
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-serif text-lg font-bold text-stone-900 capitalize">
                            {item.name}
                          </h5>
                          {!item.image && (
                            <span className="text-amber-600 font-extrabold text-base whitespace-nowrap">
                              {formatCurrency(item.price)}
                            </span>
                          )}
                        </div>

                        <span className="inline-block mt-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wider">
                          {item.unit}
                        </span>

                        <p className="mt-3 text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <button
                        onClick={() => onSelectEventForBooking(currentCategory.id, item)}
                        className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-amber-500 text-stone-800 hover:text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 group-hover:bg-amber-500 group-hover:text-slate-950"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Agendar Cita con este Platillo</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Raw JSON Structure Modal (for Developer / Backend reference) */}
      {showRawJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-950 text-stone-100 rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-amber-500/30 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif text-xl font-bold text-white">
                  Estructura de Precios (Formato Backend)
                </h3>
              </div>
              <button
                onClick={() => setShowRawJsonModal(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-xs text-stone-300">
              Estructura de datos exacta implementada en el frontend para cada categoría solicitada:
            </p>

            <div className="mt-3 relative">
              <pre className="bg-slate-900 p-4 rounded-xl text-amber-300 font-mono text-xs overflow-x-auto max-h-72 border border-slate-800">
                {JSON.stringify(RAW_PRICING_CONFIG, null, 2)}
              </pre>

              <button
                onClick={handleCopyJson}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiado!' : 'Copiar JSON'}</span>
              </button>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
              <strong>Nota de integración:</strong> Este objeto se encuentra en <code>src/data/eventsData.ts</code> y está vinculado a las llamadas del servicio <code>bookingService.ts</code>.
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowRawJsonModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
