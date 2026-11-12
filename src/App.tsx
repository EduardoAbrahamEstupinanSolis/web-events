import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventsCatalog } from './components/EventsCatalog';
import { BudgetCalculator } from './components/BudgetCalculator';
import { VenueGallery } from './components/VenueGallery';
import { ServicesSection } from './components/ServicesSection';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ScheduleBookingModal } from './components/ScheduleBookingModal';
import { AdminBookingsDrawer } from './components/AdminBookingsDrawer';
import { getStoredBookings } from './services/bookingService';
import { BookingRecord, EventItem } from './types';
import { Calendar, ArrowUp } from 'lucide-react';

export function App() {
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState<boolean>(false);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);

  // Prepopulation state for the modal
  const [modalEventType, setModalEventType] = useState<string>('bodas');
  const [modalGuestCount, setModalGuestCount] = useState<number>(150);
  const [modalSelectedItems, setModalSelectedItems] = useState<Record<string, number>>({});

  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Load existing bookings on mount
  useEffect(() => {
    setBookings(getStoredBookings());

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers to open modal with prefilled data
  const handleOpenScheduleDefault = () => {
    setModalEventType('bodas');
    setModalGuestCount(150);
    setModalSelectedItems({});
    setIsScheduleOpen(true);
  };

  const handleSelectEventForBooking = (eventTypeId: string, preselectedItem?: EventItem) => {
    setModalEventType(eventTypeId);
    if (preselectedItem) {
      const defaultQty = preselectedItem.unit === 'servicio completo' ? 1 : 150;
      setModalSelectedItems({ [preselectedItem.id]: defaultQty });
    } else {
      setModalSelectedItems({});
    }
    setIsScheduleOpen(true);
  };

  const handleProceedToBookingFromCalculator = (
    eventType: string,
    guestCount: number,
    selectedItems: Record<string, number>
  ) => {
    setModalEventType(eventType);
    setModalGuestCount(guestCount);
    setModalSelectedItems(selectedItems);
    setIsScheduleOpen(true);
  };

  const handleOpenCalculatorWithEvent = (eventTypeId: string) => {
    setModalEventType(eventTypeId);
    const element = document.getElementById('cotizador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingCreated = (newRecord: BookingRecord) => {
    setBookings((prev) => [newRecord, ...prev]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation */}
      <Navbar
        onOpenSchedule={handleOpenScheduleDefault}
        onOpenAdminDrawer={() => setIsAdminDrawerOpen(true)}
        bookingsCount={bookings.length}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onOpenSchedule={handleOpenScheduleDefault}
          onOpenCalculator={() => {
            const el = document.getElementById('cotizador');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Catalog of Events with Prices (Bodas, 15 años, chilidogs, carne, platillo 1, platillo 2, etc.) */}
        <EventsCatalog
          onSelectEventForBooking={handleSelectEventForBooking}
          onOpenCalculatorWithEvent={handleOpenCalculatorWithEvent}
        />

        {/* Live Interactive Budget Calculator */}
        <BudgetCalculator
          initialEventType={modalEventType}
          onProceedToBooking={handleProceedToBookingFromCalculator}
        />

        {/* Venue Gallery */}
        <VenueGallery />

        {/* Venue Services & Amenities */}
        <ServicesSection />

        {/* Client Testimonials */}
        <Testimonials />

        {/* FAQs */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer
        onOpenSchedule={handleOpenScheduleDefault}
        onOpenAdminDrawer={() => setIsAdminDrawerOpen(true)}
      />

      {/* "Agendar Cita" Interactive Booking Modal */}
      <ScheduleBookingModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        initialEventType={modalEventType}
        initialGuestCount={modalGuestCount}
        initialSelectedItems={modalSelectedItems}
        onBookingCreated={handleBookingCreated}
      />

      {/* Admin Bookings Drawer (Preview for developer backend connection) */}
      <AdminBookingsDrawer
        isOpen={isAdminDrawerOpen}
        onClose={() => setIsAdminDrawerOpen(false)}
        bookings={bookings}
        onBookingsUpdated={setBookings}
      />

      {/* Floating CTA Button (Mobile & Desktop) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="w-11 h-11 rounded-full bg-slate-900/90 text-amber-400 hover:text-white border border-slate-700 shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={handleOpenScheduleDefault}
          className="px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-amber-600/50 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 border border-amber-400/40"
        >
          <Calendar className="w-4 h-4 text-slate-950" />
          <span className="hidden sm:inline">Agendar Cita</span>
          <span className="sm:hidden">Agendar</span>
        </button>
      </div>
    </div>
  );
}

export default App;
