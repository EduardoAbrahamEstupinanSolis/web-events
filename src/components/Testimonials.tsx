import { FC } from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: FC = () => {
  const reviews = [
    {
      name: 'Lic. Mariana & Carlos R.',
      event: 'Boda Civil & Religiosa (280 invitados)',
      text: '¡Nuestra boda en Casa del Obrero superó todas las expectativas! Los cortes de carne estaban en su punto perfecto, y los chilidogs para el tornaboda en la madrugada fueron el éxito absoluto de la fiesta. ¡Todos los invitados siguen hablando de ello!',
      rating: 5,
      date: 'Octubre 2026',
    },
    {
      name: 'Sra. Patricia Mendoza',
      event: 'XV Años de Valeria (320 invitados)',
      text: 'Agendamos la cita por la página web y en menos de 20 minutos ya teníamos fecha y degustación. Elegimos el platillo 2 para los adultos y los chicos quedaron fascinados con los mocktails y la cabina 360. La duela y la iluminación son de primer nivel.',
      rating: 5,
      date: 'Agosto 2026',
    },
    {
      name: 'Ing. Fernando Garza',
      event: 'Cena Anual de Empresa (180 invitados)',
      text: 'Excelente recinto para eventos corporativos. La acústica es inmejorable, el servicio de meseros es impecable y la factura llegó en tiempo. Sin duda volveremos a reservar nuestras próximas convenciones aquí.',
      rating: 5,
      date: 'Septiembre 2026',
    },
  ];

  return (
    <section className="py-20 bg-stone-100 text-stone-900 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            Opiniones de Clientes
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 mt-3">
            Historias Inolvidables en Casa del Obrero
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base">
            Cientos de familias y parejas confían en nosotros año con año para sus momentos más importantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl border border-stone-200/90 shadow-md hover:shadow-xl transition-all relative flex flex-col justify-between"
            >
              <div className="absolute top-6 right-6 text-amber-200">
                <Quote className="w-8 h-8" />
              </div>

              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-stone-700 text-sm leading-relaxed italic mb-6">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <h4 className="font-bold text-stone-900 text-sm">{rev.name}</h4>
                <p className="text-xs text-amber-700 font-medium">{rev.event}</p>
                <p className="text-[11px] text-stone-400 mt-0.5">{rev.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
