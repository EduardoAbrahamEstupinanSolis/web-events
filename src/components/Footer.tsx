import { FC } from 'react';
import { Landmark, MapPin, Phone, Mail, Clock, MessageSquare, Heart, Shield, Code } from 'lucide-react';
import { VENUE_INFO } from '../data/eventsData';

interface FooterProps {
  onOpenSchedule: () => void;
  onOpenAdminDrawer: () => void;
}

export const Footer: FC<FooterProps> = ({ onOpenSchedule, onOpenAdminDrawer }) => {
  return (
    <footer className="bg-slate-950 text-stone-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wide text-white block leading-tight">
                  Salón de Casa del Obrero
                </span>
                <span className="text-[10px] tracking-widest text-amber-400 uppercase font-medium">
                  Eventos Salón de Eventos & Banquetes Banquetes
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              El recinto predilecto para bodas inolvidables, XV años de ensueño, graduaciones y banquetes ejecutivos. Tradición, prestigio y alta cocina.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenSchedule}
                className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md"
              >
                Agendar Cita Presencial
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4 border-l-2 border-amber-500 pl-2.5">
              Navegación Rápida
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">
                  Inicio & Salón
                </a>
              </li>
              <li>
                <a href="#eventos" className="hover:text-amber-400 transition-colors">
                  Precios y Catálogo de Eventos
                </a>
              </li>
              <li>
                <a href="#cotizador" className="hover:text-amber-400 transition-colors">
                  Cotizador Interactivo en Línea
                </a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-amber-400 transition-colors">
                  Galería de Instalaciones
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-amber-400 transition-colors">
                  Servicios y Amenidades Incluidas
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAdminDrawer}
                  className="text-amber-400 hover:text-amber-300 font-semibold underline flex items-center gap-1 mt-1"
                >
                  <Code className="w-3.5 h-3.5" />
                  Ver Citas & Datos para Backend
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4 border-l-2 border-amber-500 pl-2.5">
              Contacto & Ubicación
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{VENUE_INFO.address}, {VENUE_INFO.city}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${VENUE_INFO.phone}`} className="hover:text-amber-300">
                  {VENUE_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${VENUE_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  WhatsApp Oficial de Atención
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${VENUE_INFO.email}`} className="hover:text-amber-300">
                  {VENUE_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Horarios & Compromiso */}
          <div>
            <h4 className="font-serif text-base font-bold text-white mb-4 border-l-2 border-amber-500 pl-2.5">
              Horario de Atención
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-200">Oficinas y Visitas Guiadas:</p>
                  <p>{VENUE_INFO.hours}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Garantía de Satisfacción
                </span>
                <p className="text-stone-400">
                  Contratos avalados y fechas reservadas por escrito con recibo fiscal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Salón de Casa del Obrero. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1">
            Diseñado con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> para celebraciones inolvidables
          </p>
        </div>
      </div>
    </footer>
  );
};
