import { useState, FC } from 'react';
import { Camera, Eye, X } from 'lucide-react';
import { VENUE_GALLERY } from '../data/eventsData';

export const VenueGallery: FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('Todos');
  const [selectedImage, setSelectedImage] = useState<typeof VENUE_GALLERY[0] | null>(null);

  const categories = ['Todos', 'Salón', 'Banquete', 'Montaje', 'Exterior', 'Fiesta'];

  const filteredItems = activeFilter === 'Todos'
    ? VENUE_GALLERY
    : VENUE_GALLERY.filter((item) => item.category === activeFilter);

  return (
    <section id="galeria" className="py-20 bg-stone-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-3 border border-amber-500/30">
            <Camera className="w-3.5 h-3.5" />
            Nuestras Instalaciones
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Galería del Salón Casa del Obrero
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base">
            Descubre los amplios espacios, la elegancia de nuestra duela pulida, candiles coloniales y montajes de gala listos para tu celebración.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === cat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg'
                    : 'bg-slate-800 text-stone-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(item)}
              className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-white/5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/60 backdrop-blur-md text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="h-96 sm:h-[480px]">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 bg-slate-900">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {selectedImage.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                {selectedImage.title}
              </h3>
              <p className="text-stone-300 text-sm mt-2">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
