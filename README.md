# Salón de Casa del Obrero (DEMO)

Landing page desarrollada en **React 19.3**, **TypeScript**, **Tailwind CSS** y **Vite**, gestionada con **pnpm**.
Backend en **Node.js 26** (función serverless TypeScript en `api/`), datos en **Supabase** y aviso por **WhatsApp** al salón en cada cita.

---

## 🌟 Características Principales

1. **Catálogo de Precios por Evento (Requerimiento Exacto)**:
   - Configuración de precios por categoría:
     ```json
     {
       "Evento de bodas": {
         "chilidogs": 200,
         "Carne": 400,
         "Banquete 3 Tiempos Gourmet": 650,
         "Mesa de Postres Finos": 180,
         "Barra Libre Internacional": 250,
         "Decoración Floral y Ceremonial": 4500,
         "DJ, Audio Profesional y Luces Robóticas": 5200
       },
       "15 años": {
         "platillo 1": 1000,
         "platillo 2": 2000,
         "chilidogs": 200,
         "Barra de Mocktails Sin Alcohol": 140,
         "Cabina de Fotos 360° y Pista LED": 3500,
         "Letras Gigantes Iluminadas 'XV'": 1800,
         "Show Robot LED con Bazuca de Humo CO2": 2800
       },
       "Graduaciones": { ... },
       "Bautizos y Primeras Comuniones": { ... },
       "Eventos Empresariales y Conferencias": { ... }
     }
     ```
   - Visualización por pestañas con tarjetas de platillos, fotografías, descripción detallada y botón para ver el JSON sin procesar.

2. **Cotizador Interactivo en Tiempo Real**:
   - Selector dinámico de evento.
   - Ajuste de número de invitados (slider e input numérico de 30 a 500 personas).
   - Selección interactiva de platillos (chilidogs, carnes, platillo 1, platillo 2, etc.) con ajuste de cantidades.
   - Desglose instantáneo: Renta base del recinto, subtotal de alimentos y servicios, total general e inversión estimada por persona.
   - Botón directo para transferir la cotización al asistente de "Agendar Cita".

3. **Módulo de "Agendar Cita"**:
   - Flujo guiado en 3 sencillos pasos:
     - **Paso 1**: Selección de fecha tentativa, turno de horario (Matutino, Vespertino, Nocturno de Gala, Cita presencial) y número de invitados.
     - **Paso 2**: Selección y ajuste de platillos y extras.
     - **Paso 3**: Datos del cliente (Nombre, Teléfono/WhatsApp, Correo, Notas).
     - **Paso 4**: Confirmación con **Folio Único** (ej. `CDO-BOD-8421`), enlace directo para confirmar por WhatsApp al salón, y botón para descargar el payload JSON.

4. **Bandeja de Citas para Pruebas y Desarrollo ("Panel de Citas")**:
   - Accesible desde el Navbar y Footer.
   - Muestra las citas guardadas, contador de citas en tiempo real, desglose, botón para copiar el payload JSON del backend y opción para exportar todo a un archivo `.json`.

5. **Galería, Servicios y Preguntas Frecuentes**:
   - Galería fotográfica con filtro por zonas del salón y visualizador lightbox a pantalla completa.
   - Grid de servicios incluidos (planta de luz, clima, seguridad, duela, etc.).
   - Acordeón interactivo de Preguntas Frecuentes.

---

## 🚀 Cómo Ejecutar el Proyecto con `pnpm`

### 1. Instalar dependencias
```bash
pnpm install
```

### 2. Iniciar servidor de desarrollo
```bash
pnpm run dev
```
La aplicación estará disponible en `http://localhost:3000` (o el puerto asignado por Vite).

### 3. Compilar para producción
```bash
pnpm run build
```

### 4. Previsualizar la versión compilada
```bash
pnpm run preview
```

---

## 🔌 Backend (Supabase + WhatsApp)

Cuando el usuario confirma una cita, el frontend envía `POST /api/citas` ([api/citas.ts](api/citas.ts)). El servidor:

1. Valida los datos y **recalcula el precio** (no confía en el navegador).
2. Guarda la cita en la tabla `citas` de **Supabase** y genera el folio (ej. `CDO-BOD-4821`).
3. Envía un **WhatsApp al dueño del salón** con todos los datos de la cita.
4. Responde con la cita creada; la pantalla de éxito indica si el salón ya recibió el WhatsApp.

### 1. Supabase
1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor** ejecuta [supabase/schema.sql](supabase/schema.sql).
3. En **Project Settings > API** copia la `URL` y la `service_role key`.

### 2. WhatsApp (demo con CallMeBot)
1. Desde el WhatsApp del dueño del salón, sigue las instrucciones de [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) para obtener su `apikey`.
2. Para producción se recomienda migrar a la API oficial de WhatsApp Business (Meta).

### 3. Variables de entorno
Copia `.env.example` a `.env` y llénalo (y las mismas variables en Vercel). **`.env` nunca se sube a GitHub.**

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
WHATSAPP_OWNER_PHONE=+528441234567
CALLMEBOT_API_KEY=...
```

`pnpm run dev` ya sirve `/api/citas` localmente (middleware en `vite.config.ts`), no necesitas otro servidor.

---

## 📁 Estructura del Código Fuente

```text
api/
└── citas.ts                      # POST /api/citas: Supabase + WhatsApp
supabase/
└── schema.sql                    # Tabla citas
src/
├── components/
│   ├── AdminBookingsDrawer.tsx   # Bandeja de citas guardadas y exportador JSON
│   ├── BudgetCalculator.tsx      # Cotizador interactivo en tiempo real
│   ├── EventsCatalog.tsx         # Catálogo de precios y platillos (Bodas, 15 años, etc.)
│   ├── FAQ.tsx                   # Preguntas frecuentes con acordeón
│   ├── Footer.tsx                # Pie de página con información de contacto y enlaces
│   ├── Hero.tsx                  # Portada principal con botones de acción rápida
│   ├── Navbar.tsx                # Barra de navegación fija con contador de citas
│   ├── ScheduleBookingModal.tsx  # Asistente multi-paso para "Agendar Cita"
│   ├── ServicesSection.tsx       # Amenidades del recinto
│   ├── Testimonials.tsx          # Reseñas de clientes
│   └── VenueGallery.tsx          # Galería de fotos con lightbox
├── data/
│   └── eventsData.ts             # Precios exactos de los eventos y catálogo
├── services/
│   └── bookingService.ts         # Cotizaciones, llamada a /api/citas y mensaje de WhatsApp
├── types/
│   └── index.ts                  # Interfaces y modelos TypeScript
├── App.tsx                       # Componente principal integrador
├── index.css                     # Estilos globales y Tailwind CSS
├── main.tsx                      # Punto de entrada de React
└── vite-env.d.ts                 # Declaraciones de tipos para Vite
```
