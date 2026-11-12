import { useState, useMemo, FC } from 'react';
import { Calculator, Users, Plus, Minus, Check, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { EVENTS_DATA } from '../data/eventsData';
import { formatCurrency, calculateBookingQuote } from '../services/bookingService';

interface BudgetCalculatorProps {
  initialEventType?: string;
  onProceedToBooking: (eventType: string, guestCount: number, selectedItems: Record<string, number>) => void;
}

export const BudgetCalculator: FC<BudgetCalculatorProps> = ({
  initialEventType = 'bodas',
  onProceedToBooking,
}) => {
  const [selectedEventType, setSelectedEventType] = useState<string>(initialEventType);
  const [guestCount, setGuestCount] = useState<number>(150);
  const [selectedItemsMap, setSelectedItemsMap] = useState<Record<string, number>>({});

  const currentCategory = useMemo(() => {
    return EVENTS_DATA.find((e) => e.id === selectedEventType) || EVENTS_DATA[0];
  }, [selectedEventType]);

  // Recalculate totals
  const quote = useMemo(() => {
    return calculateBookingQuote(selectedEventType, guestCount, selectedItemsMap);
  }, [selectedEventType, guestCount, selectedItemsMap]);

  // Helper to toggle item selection: if checked, defaults to guestCount (or 1 for service)
  const handleToggleItem = (itemId: string, unit: string) => {
    setSelectedItemsMap((prev) => {
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

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setSelectedItemsMap((prev) => {
      const current = prev[itemId] || 0;
      const nextVal = Math.max(0, current + delta);
      if (nextVal === 0) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return { ...prev, [itemId]: nextVal };
    });
  };

  // Sync quantities of per-person items when guest count changes if user wants
  const handleGuestCountChange = (newCount: number) => {
    const validCount = Math.max(20, Math.min(600, newCount));
    setGuestCount(validCount);
  };

  const costPerPerson = guestCount > 0 ? Math.round(quote.totalEstimated / guestCount) : 0;

  return (
    <section id="cotizador" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            Cotizador Interactivo en Tiempo Real
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Calcula tu Presupuesto al Instante
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base">
            Selecciona el tipo de evento, número de invitados y los platillos deseados (como chilidogs, cortes de carne o platillos especiales) para obtener tu presupuesto aproximado.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (8 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl backdrop-blur-xl">
            {/* Step 1: Select Event Type */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                1. Selecciona el Tipo de Evento
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {EVENTS_DATA.map((event) => {
                  const isSelected = event.id === selectedEventType;
                  return (
                    <button
                      key={event.id}
                      onClick={() => {
                        setSelectedEventType(event.id);
                        setSelectedItemsMap({}); // Reset selection for clean experience
                      }}
                      className={`p-3 rounded-2xl text-left border transition-all text-xs sm:text-sm font-semibold flex flex-col justify-between h-20 ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 font-bold'
                          : 'bg-slate-800/80 text-stone-300 border-slate-700 hover:border-amber-400/50 hover:bg-slate-800'
                      }`}
                    >
                      <span>{event.name}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-slate-900' : 'text-stone-400'}`}>
                        Salón: {formatCurrency(event.baseVenuePrice)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Guest Count Selector */}
            <div className="mb-8 p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  2. Número Estimado de Invitados
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="20"
                    max="600"
                    value={guestCount}
                    onChange={(e) => handleGuestCountChange(parseInt(e.target.value) || 50)}
                    className="w-20 px-2 py-1 bg-slate-900 text-amber-400 font-bold text-center rounded-lg border border-amber-500/40 text-sm focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-xs text-stone-400 font-medium">personas</span>
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={guestCount}
                onChange={(e) => handleGuestCountChange(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-2 font-mono">
                <span>30 invitados</span>
                <span>250 recomendados</span>
                <span>500 capacidad máx.</span>
              </div>
            </div>

            {/* Step 3: Food & Service Items */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  3. Agrega Platillos y Servicios ({currentCategory.name})
                </label>
                <span className="text-[11px] text-stone-400">
                  Haz clic para incluir o ajustar cantidad
                </span>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {currentCategory.items.map((item) => {
                  const currentQty = selectedItemsMap[item.id] || 0;
                  const isChecked = currentQty > 0;

                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500/60 shadow-md'
                          : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleItem(item.id, item.unit)}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                            isChecked
                              ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold'
                              : 'border-slate-600 hover:border-amber-400 text-transparent'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </button>

                        <div>
                          <p className="text-sm font-bold text-white capitalize flex items-center gap-2">
                            {item.name}
                            {item.isPopular && (
                              <span className="text-[10px] bg-rose-600/80 text-white px-2 py-0.2 rounded-full font-normal">
                                Popular
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-amber-400/90 font-medium">
                            {formatCurrency(item.price)} <span className="text-stone-400 text-[10px]">/ {item.unit}</span>
                          </p>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      {isChecked && (
                        <div className="flex items-center gap-2 self-end sm:self-auto bg-slate-900/80 px-2.5 py-1.5 rounded-xl border border-slate-700">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, -10)}
                            className="p-1 text-stone-400 hover:text-white rounded hover:bg-slate-800"
                            title="Restar 10"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-12 text-center text-xs font-mono font-bold text-amber-300">
                            {currentQty} {item.unit.includes('persona') ? 'pax' : 'u'}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, 10)}
                            className="p-1 text-stone-400 hover:text-white rounded hover:bg-slate-800"
                            title="Sumar 10"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quote Summary Column (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Resumen Estimado
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {currentCategory.name}
                  </h3>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Itemized list */}
              <div className="py-4 space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-stone-300">
                  <span>Renta Base del Recinto:</span>
                  <span className="font-semibold text-white">
                    {formatCurrency(quote.venueBasePrice)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-stone-300">
                  <span>Invitados Calculados:</span>
                  <span className="font-semibold text-white">{guestCount} personas</span>
                </div>

                {/* Selected menu items summary */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400/80">
                    Servicios y Menú Agregados ({quote.formattedItems.length})
                  </p>
                  {quote.formattedItems.length === 0 ? (
                    <p className="text-xs text-stone-500 italic">
                      No has agregado platillos aún. Selecciona de la lista de la izquierda.
                    </p>
                  ) : (
                    quote.formattedItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs text-stone-300">
                        <span className="truncate max-w-[170px] capitalize">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-mono text-amber-200">
                          {formatCurrency(item.subtotal)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Total Card */}
              <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                    Total Estimado:
                  </span>
                  <span className="font-serif text-3xl font-extrabold text-amber-400">
                    {formatCurrency(quote.totalEstimated)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-stone-400 pt-2 border-t border-amber-500/20">
                  <span>Inversión aprox. por persona:</span>
                  <span className="font-bold text-amber-200 font-mono">
                    {formatCurrency(costPerPerson)} / persona
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => onProceedToBooking(selectedEventType, guestCount, selectedItemsMap)}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-amber-600/40 hover:shadow-amber-500/60 transition-all flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Cita con este Presupuesto</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-center text-stone-400">
                  * Precios en pesos mexicanos (MXN). No compromete a pago, sujeto a disponibilidad de fecha.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
