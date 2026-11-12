import { useState, useEffect, FC } from 'react';
import { Calendar, Menu, X, Landmark, Phone, Database } from 'lucide-react';
import { VENUE_INFO } from '../data/eventsData';

interface NavbarProps {
  onOpenSchedule: () => void;
  onOpenAdminDrawer: () => void;
  bookingsCount: number;
}

export const Navbar: FC<NavbarProps> = ({
  onOpenSchedule,
  onOpenAdminDrawer,
  bookingsCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Eventos & Precios', href: '#eventos' },
    { label: 'Cotizador en Vivo', href: '#cotizador' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Preguntas', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 py-3 shadow-xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Landmark className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wide text-white block leading-tight">
                Salón de Casa del Obrero
              </span>
              <span className="text-[10px] tracking-widest text-amber-400 uppercase font-medium">
                Eventos & Banquetes
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-200 hover:text-amber-400 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Admin / Bookings Preview Button */}
            <button
              onClick={onOpenAdminDrawer}
              title="Ver citas guardadas y datos para backend"
              className="relative px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-stone-300 hover:text-white text-xs font-medium flex items-center gap-2 transition-all"
            >
              <Database className="w-4 h-4 text-amber-400" />
              <span>Citas ({bookingsCount})</span>
              {bookingsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {bookingsCount}
                </span>
              )}
            </button>

            {/* Agendar Cita Button */}
            <button
              onClick={onOpenSchedule}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white font-semibold text-sm shadow-lg shadow-amber-600/30 hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Cita</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSchedule}
              className="px-3 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 text-stone-200 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-amber-500/20 shadow-2xl">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-stone-200 hover:text-amber-400 hover:bg-slate-800/50 rounded-lg text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminDrawer();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 text-stone-300 text-sm font-medium flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-amber-400" />
                    Citas registradas
                  </span>
                  <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full text-xs">
                    {bookingsCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSchedule();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  Agendar Cita Presencial o Virtual
                </button>

                <a
                  href={`tel:${VENUE_INFO.phone}`}
                  className="w-full py-2 text-stone-400 text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  {VENUE_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
