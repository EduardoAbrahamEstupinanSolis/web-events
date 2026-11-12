import { FC } from 'react';
import { Calendar, Calculator, ChevronRight, Award, Users, ShieldCheck, Clock } from 'lucide-react';

interface HeroProps {
  onOpenSchedule: () => void;
  onOpenCalculator: () => void;
}

export const Hero: FC<HeroProps> = ({ onOpenSchedule, onOpenCalculator }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Image with Rich Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85"
          alt="Salón de Casa del Obrero"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow filter brightness-[0.45]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-6">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md">
          <Award className="w-4 h-4 text-amber-400" />
          <span>El Salón Más Emblemático y Exclusivo de la Región</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight max-w-4xl mx-auto leading-[1.15] drop-shadow-md">
          Salón de <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">Casa del Obrero</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
          Bodas de ensueño, XV años mágicos, graduaciones y banquetes inolvidables.
          Precios transparentes, gastronomía gourmet y la atención que tú y tus invitados merecen.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onOpenSchedule}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white font-bold text-base shadow-2xl shadow-amber-600/40 hover:shadow-amber-500/60 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            <Calendar className="w-5 h-5 text-amber-100" />
            <span>Agendar Cita</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenCalculator}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-amber-500/40 text-stone-100 hover:text-white font-semibold text-base backdrop-blur-md shadow-xl hover:border-amber-400 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <Calculator className="w-5 h-5 text-amber-400" />
            <span>Cotizar en Línea</span>
          </button>
        </div>

        {/* Highlight Metrics */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-3.5 bg-white/5 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">500</p>
              <p className="text-xs text-stone-400">Capacidad Máxima</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/5 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">+15 Años</p>
              <p className="text-xs text-stone-400">De Experiencia</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/5 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">100%</p>
              <p className="text-xs text-stone-400">Seguridad & Parking</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/5 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">Cita Rápida</p>
              <p className="text-xs text-stone-400">Reserva Inmediata</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
