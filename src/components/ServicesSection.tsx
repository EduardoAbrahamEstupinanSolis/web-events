import { FC } from 'react';
import { ShieldCheck, Wind, Zap, UtensilsCrossed, Sparkles, Car, Music, UserCheck } from 'lucide-react';

export const ServicesSection: FC = () => {
  const services = [
    {
      icon: UtensilsCrossed,
      title: 'Banquete & Cocina de Alto Nivel',
      desc: 'Desde los tradicionales chilidogs y snacks festivos hasta cortes selectos y banquetes de 3 tiempos preparados al momento por chefs certificados.',
    },
    {
      icon: Wind,
      title: 'Climatización Integral',
      desc: 'Aire acondicionado y calefacción industrial de alto rendimiento para garantizar el confort total de tus invitados en cualquier estación del año.',
    },
    {
      icon: Zap,
      title: 'Planta de Luz de Emergencia',
      desc: 'Generador eléctrico propio de respaldo automático que asegura que la música, iluminación y refrigeración nunca se detengan.',
    },
    {
      icon: Car,
      title: 'Estacionamiento Privado',
      desc: 'Área cerrada con capacidad para más de 120 vehículos con servicio de valet parking opcional y circuito cerrado de vigilancia.',
    },
    {
      icon: ShieldCheck,
      title: 'Seguridad y Logística 24/7',
      desc: 'Personal de seguridad uniformado en accesos, salidas y perímetro, además de paramédico y botiquín de primeros auxilios.',
    },
    {
      icon: Music,
      title: 'Acústica y Duela Profesional',
      desc: 'Salón diseñado con aislamiento acústico superior y pista de madera fina con amortiguación ideal para bailar toda la noche.',
    },
    {
      icon: UserCheck,
      title: 'Coordinador Personal de Evento',
      desc: 'Un wedding planner y supervisor dedicado a coordinar tiempos del protocolo, brindis, vals, salida de platillos y proveedores.',
    },
    {
      icon: Sparkles,
      title: 'Suite Privada de Gala',
      desc: 'Espacio exclusivo para novios o quinceañeras con tocador con luces Hollywood, baño privado, perchero de gala y refrigerio.',
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-stone-50 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Excelencia en Cada Detalle
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-stone-900">
            ¿Por qué elegir Salón Casa del Obrero?
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg">
            Combinamos décadas de prestigio con equipamiento moderno para que tú solo te ocupes de disfrutar tu momento especial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200/80 hover:border-amber-400 shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
