# 📚 Librería éter: Plataforma de Gamificación y Gestión Editorial

¡Bienvenido a la nueva generación de gestión de librerías! Este proyecto no es solo un gestor de inventario; es una plataforma completa diseñada para maximizar la retención de usuarios a través de la gamificación y ofrecer herramientas críticas de negocio para equipos corporativos.

---

## 🚀 Características Principales

### 1. Sistema de Gamificación  (Trivial)
Diseñado para incentivar la lealtad y el registro de usuarios:
*   **Anti-Trampas Estricto**: Penalizaciones de 1 hora por fallos o tiempo agotado (15s por pregunta).
*   **Control de Abandono**: Registro automático de partidas al inicio, al salir de la página cuenta como intento fallido.
*   **Economía de Recompensas**: Acumulación de puntos en el Dashboard personal y generación automática de cupones de descuento de un solo uso (3€) al alcanzar hitos (100 puntos).
*   **Límites de Uso**: Restricción de 10 partidas por cada 24 horas para mantener el equilibrio del sistema.

### 2. Motor de Inventario Optimizado
Arquitectura escalable que maneja miles de títulos con latencia mínima:
*   **Server-Side Processing**: Todo el filtrado, ordenación y paginación se realiza en la base de datos (Supabase), no en el navegador.
*   **Vistas Inteligentes**: Uso de vistas de base de datos (`books_with_stats`, `promo_performance`) para cálculos de ventas y rendimiento en tiempo real sin sobrecargar el servidor.
*   **Búsqueda Avanzada**: Motor de búsqueda integrado por título, ISBN, autor y categorías.

### 3. Panel de Administración 
Herramientas potentes para la gestión del día a día:
*   **Marketing Analytics**: Seguimiento detallado del rendimiento de cada cupón (usos, ingresos generados, ahorro total para clientes).
*   **Alertas de Stock**: Indicadores visuales de stock bajo ("Crítico" vs "Saludable").
*   **Agenda Cultural**: Gestión completa de eventos (firmas de libros, clubes de lectura) con seguimiento de asistentes.

### 4. Experiencia de Usuario Premium
*   **Diseño State-of-the-art**: Interfaz moderna con efectos de cristal (Glassmorphism), micro-animaciones y modo oscuro.
*   **Privacidad Integrada**: Banner de consentimiento de cookies premium y legalmente conforme.
*   **SEO & Performance**: Optimización de carga y metadatos para motores de búsqueda.

---

## 🏢 Valor para la Empresa (Equipos)

### 📣 Equipo de Marketing
*   **Retención**: El sistema de Trivial convierte la visita casual en una rutina diaria.
*   **Análisis de Campañas**: Pueden ver en tiempo real qué códigos promocionales están funcionando y cuántos ingresos netos están generando.
*   **Fidelización**: Automatización de recompensas que reduce el costo de adquisición de clientes (CAC).
*   **Social Media Ready**: Soporte nativo para cupones vía URL (`/books?promo=CODIGO`), ideal para lanzar campañas directas en Instagram, Twitter o a través de influencers, eliminando la fricción del proceso de compra.

### 📦 Equipo de Operaciones / Logística
*   **Gestión de Stock**: Visibilidad clara de qué libros necesitan reposición inmediata.
*   **Popularidad**: Identificación de "Best Sellers" basada en datos reales para optimizar las compras.

### ⚖️ Equipo Legal / Compliance
*   **Privacidad**: Sistema de gestión de cookies y manejo seguro de perfiles de usuario conforme a normativas.

### 💻 Equipo de Ingeniería
*   **Escalabilidad**: El uso de Server Components (Next.js 15) y lógica en base de datos asegura que la web no se ralentice al crecer el catálogo.
*   **Mantenibilidad**: Código modular y acciones de servidor que separan claramente la interfaz de la lógica de negocio.

---

## 🛠️ Stack Tecnológico
*   **Framework**: Next.js 15 (App Router)
*   **Lenguaje**: TypeScript
*   **Estilos**: Tailwind CSS
*   **Base de Datos & Auth**: Supabase (PostgreSQL)
*   **Estado & Caché**: React Query & Server Actions
*   **UI Components**: Radix UI & Lucide Icons

---

## ⚙️ Configuración Rápida

1.  Instala las dependencias: `pnpm install`
2.  Configura tus variables de entorno (.env): `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3.  Ejecuta en desarrollo: `pnpm dev`

---
