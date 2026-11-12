import type { EventCategory } from '../types';

export const RAW_PRICING_CONFIG: Record<string, Record<string, number>> = {
  "Evento de bodas": {
    "chilidogs": 200,
    "Carne": 400,
    "Banquete 3 Tiempos Gourmet": 650,
    "Mesa de Postres Finos": 180,
    "Barra Libre Internacional": 250,
    "Decoración Floral y Ceremonial": 4500,
    "DJ, Audio Profesional y Luces Robóticas": 5200,
  },
  "15 años": {
    "platillo 1": 1000,
    "platillo 2": 2000,
    "chilidogs": 200,
    "Barra de Mocktails Sin Alcohol": 140,
    "Cabina de Fotos 360° y Pista LED": 3500,
    "Letras Gigantes Iluminadas 'XV'": 1800,
    "Show Robot LED con Bazuca de Humo CO2": 2800,
  },
  "Graduaciones": {
    "Buffet Juvenil de Graduación": 350,
    "Banquete de Gala 2 Tiempos": 490,
    "Brindis de Honor con Copa Grabada": 95,
    "Pista de Baile y Dj de Gala": 4800,
    "Paquete Fotográfico y Video": 3200,
  },
  "Bautizos y Primeras Comuniones": {
    "Banquete Familiar Tradicional": 320,
    "Menú Infantil (Hamburguesa o Nuggets)": 160,
    "Mesa de Dulces Temática": 1500,
    "Inflable Gigante y Animación": 2200,
  },
  "Eventos Empresariales y Conferencias": {
    "Coffee Break Continuo Premium": 150,
    "Comida Buffet Ejecutiva": 390,
    "Proyector HD, Microfonía y Pantalla": 2600,
    "Mobiliario Ejecutivo y Estrado": 1900,
  }
};

export const EVENTS_DATA: EventCategory[] = [
  {
    id: 'bodas',
    name: 'Evento de bodas',
    slug: 'bodas',
    tagline: 'El inicio de tu historia de amor en el escenario más distinguido',
    description: 'Espacio mágico y elegante para hacer de tu boda un recuerdo inolvidable. Atención personalizada, mantelería de lujo y gastronomía de primer nivel.',
    baseVenuePrice: 12000,
    recommendedGuests: '100 a 450 personas',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-amber-600 to-rose-700',
    features: [
      'Capacidad hasta 450 personas cómodamente sentadas',
      'Suite privada nupcial climatizada',
      'Pista de baile de duela pulida con iluminación cenital',
      'Planta eléctrica de respaldo y aire acondicionado industrial',
      'Mobiliario tiffany, mantelería fina y cristalería de lujo',
      'Seguridad privada y estacionamiento vigilado para 120 autos'
    ],
    rawPriceMap: RAW_PRICING_CONFIG["Evento de bodas"],
    items: [
      {
        id: 'boda-chilidogs',
        name: 'chilidogs',
        price: 200,
        unit: 'por persona',
        category: 'comida',
        description: 'Deliciosos chilidogs estilo gourmet con chili casero, queso cheddar derretido, cebollitas salteadas y jalapeños. ¡Ideal para el tornaboda o trasnochadores!',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'boda-carne',
        name: 'Carne',
        price: 400,
        unit: 'por persona',
        category: 'comida',
        description: 'Corte selecto de res a la parrilla en salsa de champiñones o chimichurri artesanal, acompañado de guarnición de puré rústico y verduras glaseadas.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'boda-platillo-tres-tiempos',
        name: 'Banquete 3 Tiempos Gourmet',
        price: 650,
        unit: 'por persona',
        category: 'comida',
        description: 'Entrada de crema de tres quesos con nuez, plato fuerte pechuga rellena o lomo fino, y postre de autor.',
        isPopular: false,
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'boda-postres',
        name: 'Mesa de Postres Finos',
        price: 180,
        unit: 'por persona',
        category: 'comida',
        description: 'Selección de tartaletas, macarons franceses, trufas de chocolate belga y mini cheesecakes artesanales.',
        isPopular: false,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'boda-barra-libre',
        name: 'Barra Libre Internacional',
        price: 250,
        unit: 'por persona',
        category: 'bebida',
        description: '5 horas continuas con bartenders certificados, licores premium, mezcladores ilimitados y hielo cristalino.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'boda-dj-luces',
        name: 'DJ, Audio Profesional y Luces Robóticas',
        price: 5200,
        unit: 'servicio completo',
        category: 'musica',
        description: 'Sistema acústico JBL, iluminación inteligente, cabezas robóticas, máquina de niebla y DJ con repertorio a medida.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'boda-flores',
        name: 'Decoración Floral y Ceremonial',
        price: 4500,
        unit: 'servicio completo',
        category: 'decoracion',
        description: 'Arco floral para ceremonia civil, centros de mesa con rosas y follajes naturales finos, velas y telas flotantes.',
        isPopular: false,
        image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'xv-anos',
    name: '15 años',
    slug: '15-anos',
    tagline: 'Una noche de ensueño para brillar y festejar tus quince primaveras',
    description: 'Transformamos tu fiesta de XV en una experiencia inolvidable. Espacio para coreografías, vals con pirotecnia fría, iluminación moderna y menú que fascina a jóvenes y adultos.',
    baseVenuePrice: 10000,
    recommendedGuests: '120 a 500 personas',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-pink-600 to-purple-800',
    features: [
      'Espacio amplio para entrada triunfal y vals principal',
      'Pista interactiva iluminada de cristal templado',
      'Área lounge juvenil para fotos de Instagram y TikTok',
      'Efectos especiales de pirotecnia fría no inflamable para el vals',
      'Cabina de DJ elevada con pantallas panorámicas de video',
      'Vestidor privado para cambios de vestido de la quinceañera'
    ],
    rawPriceMap: RAW_PRICING_CONFIG["15 años"],
    items: [
      {
        id: 'xv-platillo-1',
        name: 'platillo 1',
        price: 1000,
        unit: 'por platillo',
        category: 'comida',
        description: 'Pollo relleno a la Cordon Bleu bañado en suave crema de chipotle o finas hierbas, acompañado de pasta al burro y ensalada tropical.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'xv-platillo-2',
        name: 'platillo 2',
        price: 2000,
        unit: 'por platillo',
        category: 'comida',
        description: 'Medallones de lomo en reducción de vino tinto y frutos rojos, con papa gratinada dauphinoise y atado de espárragos frescos con tocino crujiente.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'xv-chilidogs',
        name: 'chilidogs',
        price: 200,
        unit: 'por persona',
        category: 'comida',
        description: 'Snack festivo nocturno con salchicha jumbo de pavo o res, salsa chili con carne sazonada, queso fundido y papitas crujientes.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'xv-mocktails',
        name: 'Barra de Mocktails Sin Alcohol',
        price: 140,
        unit: 'por persona',
        category: 'bebida',
        description: 'Mojitos de fresa, piñas coladas virgen, frappés de mora azul y margaritas sin alcohol servidas en copas luminosas.',
        isPopular: false,
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'xv-cabina-360',
        name: 'Cabina de Fotos 360° y Pista LED',
        price: 3500,
        unit: 'servicio completo',
        category: 'extra',
        description: 'Plataforma de video 360° con cámara lenta, luces LED, accesorios temáticos y descarga instantánea vía QR para redes sociales.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'xv-letras-xv',
        name: "Letras Gigantes Iluminadas 'XV'",
        price: 1800,
        unit: 'servicio completo',
        category: 'decoracion',
        description: 'Letras de madera blanca de 1.80m de altura con focos vintage cálidos, ideales para sesión de fotos principal.',
        isPopular: false,
        image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'xv-robot-led',
        name: 'Show Robot LED con Bazuca de Humo CO2',
        price: 2800,
        unit: 'servicio completo',
        category: 'musica',
        description: 'Animación de alta energía durante la hora loca con robot gigante de 2.5 metros, lásers y bazuca de gas frío CO2.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'graduaciones',
    name: 'Graduaciones',
    slug: 'graduaciones',
    tagline: 'Celebra la meta cumplida con una noche de gala inolvidable',
    description: 'El cierre de una gran etapa merece la mejor fiesta. Banquete para egresados, familias e invitados con producción audiovisual de vanguardia.',
    baseVenuePrice: 9500,
    recommendedGuests: '150 a 500 personas',
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-blue-700 to-indigo-900',
    features: [
      'Escenario amplio para entrega de reconocimientos y fotografías',
      'Pantallas gigantes para proyección de videos de generación',
      'Protocolo formal de brindis y pase de estafeta',
      'Espacio para bandas en vivo o grupos musicales'
    ],
    rawPriceMap: RAW_PRICING_CONFIG["Graduaciones"],
    items: [
      {
        id: 'grad-buffet',
        name: 'Buffet Juvenil de Graduación',
        price: 350,
        unit: 'por persona',
        category: 'comida',
        description: 'Variedad de pastas italianas, cortes marinados, ensaladas mixtas y guarniciones con barras libres de ensaladas.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'grad-banquete-gala',
        name: 'Banquete de Gala 2 Tiempos',
        price: 490,
        unit: 'por persona',
        category: 'comida',
        description: 'Lomo mechado en salsa de ciruela pasa o pechuga rellena de queso gouda con espinacas y puré perfumado con ajo.',
        isPopular: false,
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'grad-brindis',
        name: 'Brindis de Honor con Copa Grabada',
        price: 95,
        unit: 'por persona',
        category: 'bebida',
        description: 'Champagne o sidra espumosa con copa de cristal conmemorativa serigrafiada con la generación.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'grad-pista-dj',
        name: 'Pista de Baile y Dj de Gala',
        price: 4800,
        unit: 'servicio completo',
        category: 'musica',
        description: 'Audio envolvente, show de luces computarizadas, pirotecnia de bienvenida y dinámicas con souvenirs.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'bautizos-comuniones',
    name: 'Bautizos y Primeras Comuniones',
    slug: 'bautizos-comuniones',
    tagline: 'Momentos de fe y convivencia en un ambiente cálido y familiar',
    description: 'Eventos diurnos llenos de luz, detalles angelicales, áreas seguras para niños y un servicio esmerado para consentir a tus seres queridos.',
    baseVenuePrice: 7500,
    recommendedGuests: '60 a 250 personas',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-emerald-600 to-teal-800',
    features: [
      'Iluminación natural con ventanales hacia jardines',
      'Área segura para niños con supervisión opcional',
      'Montaje de mesas con detalles en colores pastel y blanco puro',
      'Horarios flexibles para festejos matutinos o vespertinos'
    ],
    rawPriceMap: RAW_PRICING_CONFIG["Bautizos y Primeras Comuniones"],
    items: [
      {
        id: 'bautizo-familiar',
        name: 'Banquete Familiar Tradicional',
        price: 320,
        unit: 'por persona',
        category: 'comida',
        description: 'Tradicional comida mexicana gourmet: mole poblano con pollo de rancho, arroz rojo esponjado, frijoles refritos y tortillas calientes hechas al comal.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'bautizo-infantil',
        name: 'Menú Infantil (Hamburguesa o Nuggets)',
        price: 160,
        unit: 'por persona',
        category: 'comida',
        description: 'Mini hamburguesa con queso o crujientes tiras de pollo empanizado, papas a la francesa y jugo natural de fruta.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'bautizo-mesa-dulces',
        name: 'Mesa de Dulces Temática',
        price: 1500,
        unit: 'servicio completo',
        category: 'decoracion',
        description: 'Montaje con jarrones de cristal, bombones, galletas decoradas, paletas personalizadas y cupcakes angelicales.',
        isPopular: false,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'bautizo-inflable',
        name: 'Inflable Gigante y Animación',
        price: 2200,
        unit: 'servicio completo',
        category: 'extra',
        description: 'Castillo inflable interactivo con tobogán, pintacaritas profesional y animador de juegos tradicionales.',
        isPopular: false,
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  {
    id: 'empresariales',
    name: 'Eventos Empresariales y Conferencias',
    slug: 'empresariales',
    tagline: 'Profesionalismo y tecnología para tus convenciones y congresos',
    description: 'El recinto perfecto para asambleas sindicales, congresos de negocios, capacitaciones corporativas y cenas de fin de año con total seriedad y confort.',
    baseVenuePrice: 8500,
    recommendedGuests: '80 a 500 personas',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    accentColor: 'from-slate-700 to-zinc-900',
    features: [
      'Conexión a internet dedicada simétrica de alta velocidad (Wi-Fi 6)',
      'Escenario con pódium, atril y pantallas de retorno para oradores',
      'Aire acondicionado central para conferencias multitudinarias',
      'Facturación fiscal directa (CFDI) para empresas e instituciones'
    ],
    rawPriceMap: RAW_PRICING_CONFIG["Eventos Empresariales y Conferencias"],
    items: [
      {
        id: 'emp-coffee-break',
        name: 'Coffee Break Continuo Premium',
        price: 150,
        unit: 'por persona',
        category: 'bebida',
        description: 'Café de grano recién tostado, variedad de tés gourmet, galletas finas, panes mini daneses y fruta fresca de temporada.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'emp-buffet-ejecutivo',
        name: 'Comida Buffet Ejecutiva',
        price: 390,
        unit: 'por persona',
        category: 'comida',
        description: 'Bocadillos ejecutivos, dos opciones de carne y pollo, barra de ensaladas orgánicas, guarniciones calientes y postre.',
        isPopular: true,
        image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'emp-audiovisual',
        name: 'Proyector HD, Microfonía y Pantalla',
        price: 2600,
        unit: 'servicio completo',
        category: 'extra',
        description: 'Proyector láser de 6000 lúmenes, pantalla gigante de 150 pulgadas, 4 micrófonos inalámbricos Shure y técnico en cabina.',
        isPopular: false,
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80'
      }
    ]
  }
];

export const VENUE_GALLERY = [
  {
    title: 'Salón Principal Gran Obrero',
    caption: 'Capacidad modulable para hasta 500 personas con techos altos y candiles venecianos.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
    category: 'Salón'
  },
  {
    title: 'Pista de Baile y Montaje Nupcial',
    caption: 'Pista de madera y cristal con iluminación perimetral programable.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80',
    category: 'Montaje'
  },
  {
    title: 'Banquete & Mantelería de Gala',
    caption: 'Centros de mesa altos, vajilla de porcelana fina y copas de cristal cortado.',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=80',
    category: 'Banquete'
  },
  {
    title: 'Terraza y Jardín de Bienvenida',
    caption: 'Espacio al aire libre con fuentes y vegetación para cóctel de recepción.',
    image: 'https://images.unsplash.com/photo-1510076857177-7470076d4198?auto=format&fit=crop&w=1000&q=80',
    category: 'Exterior'
  },
  {
    title: 'Suite Nupcial y Área Lounge',
    caption: 'Espacio climatizado y privado para descanso, retoques y fotografías íntimas.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    category: 'Lounge'
  },
  {
    title: 'Espectáculo de Iluminación y Fiesta',
    caption: 'Robótica de última generación, cabina de DJ y efectos para la hora cumbre.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    category: 'Fiesta'
  }
];

export const VENUE_INFO = {
  name: 'Salón de Casa del Obrero',
  fullName: 'Salón de Casa del Obrero',
  slogan: 'Donde las grandes celebraciones cobran vida',
  address: 'Av. Melchor Ocampo 1920, Zona Centro',
  city: 'Ciudad de México / Coahuila / Monterrey',
  phone: '+52 844 123 4567',
  whatsappNumber: '528441234567',
  email: 'eventos@casadelobrero.com.mx',
  hours: 'Lunes a Sábado: 09:00 - 20:00 hrs | Domingos: Con cita previa',
  scheduleSlots: [
    { id: 'matutino', label: 'Horario Matutino (10:00 hrs - 15:00 hrs)', description: 'Ideal para Bautizos, Comuniones y Conferencias' },
    { id: 'vespertino', label: 'Horario Vespertino (15:00 hrs - 20:00 hrs)', description: 'Excelente para Comidas de Aniversario y Graduaciones' },
    { id: 'nocturno', label: 'Horario Nocturno de Gala (19:00 hrs - 02:00 hrs)', description: 'El favorito para Bodas y Fiestas de XV Años' },
    { id: 'visita_recorrido', label: 'Cita para Recorrido Presencial (11:00 o 17:00 hrs)', description: 'Conoce las instalaciones antes de contratar' }
  ]
};
