import { useState, FC } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQ: FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Con cuánto tiempo de anticipación debo apartar la fecha?',
      a: 'Recomendamos apartar con 6 a 12 meses de anticipación para bodas y XV años en temporada alta (viernes y sábados de primavera y otoño). Para eventos entre semana o graduaciones, con 2 a 4 meses es suficiente. Puedes apartar tu fecha tentativa agendando una cita desde esta página web.'
    },
    {
      q: '¿Ofrecen degustación previa de los platillos del evento?',
      a: '¡Sí! Al concretar tu cita y pre-reserva, programamos una degustación formal de hasta 4 opciones de menú para 4 personas, donde podrás probar nuestras opciones de banquete (incluyendo la carne, platillo 1, platillo 2 o snacks como los chilidogs) y afinar los detalles gastronómicos con nuestro chef ejecutivo.'
    },
    {
      q: '¿Puedo contratar el salón solo o forzosamente con banquete?',
      a: 'Ofrecemos total flexibilidad. Contamos con paquetes "Todo Incluido" que optimizan tu presupuesto, o bien puedes rentar únicamente el recinto base y añadir los platillos y servicios adicionales que tú prefieras utilizando nuestro cotizador en línea.'
    },
    {
      q: '¿Qué facilidades de pago y anticipos manejan?',
      a: 'Puedes apartar tu fecha con un anticipo inicial desde $5,000 MXN. El saldo restante se divide en cómodas mensualidades sin intereses hasta liquidar 15 días antes de la fecha de tu evento. Aceptamos transferencias, tarjetas de crédito, débito y efectivo.'
    },
    {
      q: '¿Se permite el ingreso de bebidas alcohólicas externas (descorche)?',
      a: 'Sí, manejamos política de descorche libre en la contratación de cualquiera de nuestros paquetes de servicio de banquete o barra libre. Nuestro equipo de meseros se encargará del enfriado, servicio y cristalería sin cobro adicional por botella.'
    },
    {
      q: '¿Cómo funciona la opción de "Agendar Cita"?',
      a: 'Al presionar "Agendar Cita", seleccionas el evento, la fecha tentativa, tus platillos preferidos y tus datos de contacto. El sistema genera un folio único y pre-reserva tu turno. Además, puedes enviar el resumen directamente a nuestro WhatsApp oficial para atención inmediata.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-stone-50 text-stone-900 border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-semibold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            Resolvemos tus Dudas
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Preguntas Frecuentes
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Todo lo que necesitas saber antes de contratar tu evento en Casa del Obrero.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-amber-500 text-slate-950 font-bold' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
