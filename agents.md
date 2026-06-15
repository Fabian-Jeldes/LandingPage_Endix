# Registro del Asistente de Desarrollo (agents.md)

Este documento registra los detalles del desarrollo, decisiones de arquitectura y el estado de la implementación del proyecto del sitio web de **Arriaza & Ramírez Asociados**.

## 🤖 Información del Asistente
*   **Nombre del Agente**: Antigravity
*   **Modelo de Lenguaje**: Gemini de Google DeepMind
*   **Rol**: Asistente de Desarrollo Web (Frontend) y Programación en Pareja (Pair Programming).

## ⚙️ Tecnologías Utilizadas (Tech Stack)
*   **HTML5**: Estructura de marcado semántica y accesible.
*   **CSS3**: Estilos personalizados (Vanilla CSS) utilizando variables personalizadas (sistema HSL), CSS Grid para diseños bidimensionales, Flexbox para alineaciones unidimensionales y animaciones fluidas.
*   **JavaScript (ES6+)**: Interactividad del lado del cliente, manipulación del DOM, APIs de navegador (como `IntersectionObserver`) y animaciones de progreso personalizadas.

## 🧠 Decisiones de Diseño y Arquitectura

### 1. Enfoque "No-Framework" (Vanilla JS/CSS)
*   **Decisión**: Se optó por no utilizar frameworks complejos como React o Vue, manteniendo el proyecto en HTML, CSS y JS puro.
*   **Justificación**: Una página de aterrizaje (landing page) requiere un rendimiento óptimo, tiempos de carga mínimos y un SEO excelente. Los frameworks modernos de frontend agregan complejidad innecesaria y sobrecarga de bytes al cliente. Mantener el proyecto sin dependencias externas asegura la máxima compatibilidad, velocidad e indexación en motores de búsqueda.

### 2. Estructura de Componentes en CSS
*   **Decisión**: Creación de un sistema de diseño basado en variables HSL en `:root` para gestionar de forma centralizada la paleta de colores (tonos corporativos de azul marino, crema y dorado).
*   **Justificación**: Esto permite realizar cambios temáticos globales de manera instantánea y asegura la consistencia de color a lo largo de toda la interfaz.

### 3. Animaciones e Interactividad Gradual
*   **Decisión**: Uso de `IntersectionObserver` para revelar elementos gradualmente al hacer scroll.
*   **Justificación**: Aporta dinamismo a la navegación sin degradar el rendimiento del navegador ni la experiencia del usuario (UX) en dispositivos de gama baja.

### 4. Modularización e Integridad de Recursos
*   **Decisión**: Separación limpia del código en tres archivos clave (`index.html`, `style.css` y `script.js`) y almacenamiento de recursos gráficos locales en la carpeta `media/`.
*   **Justificación**: Permite reducir radicalmente el tamaño del archivo `index.html` (de ~530KB a ~15KB), lo que agiliza la transferencia de red, el parseo del DOM en el navegador y mejora los tiempos de carga (LCP/Speed Index).

## 📋 Estado del Proyecto
*   [x] **Modularización del Proyecto**: Código dividido limpiamente en `index.html`, `style.css` y `script.js`.
*   [x] **Incorporación de fotos reales de equipo**: Se enlazaron las imágenes de los abogados y la administradora desde el directorio `media/`.
*   [x] **Rediseño de la sección "Nuestro Equipo"**: Tarjetas de equipo de 3 columnas estilo mockup con fotos oficiales de fondo, gradiente de contraste y efectos hover de zoom y brillo dorado (responsivo en móviles).
*   [x] **Sección "Más que un abogado" a formato Grid 2x2**: Elementos convertidos a tarjetas interactivas con efectos Hover.
*   [x] **Línea de tiempo interactiva**: Efecto de barra de carga e interactividad al hacer clic.
*   [x] **Sistema de Ventanas Modales**: Modales fluidos en el pie de página para políticas legales.
*   [x] **Sección de Testimonios Reales**: Integración de las 3 reseñas de Google reales de los clientes (Isabella Z., Luis M. y Fernanda M.) junto con las respuestas oficiales de la abogada Francisca R.
*   [x] **Identidad Oficial**: Logo oficial integrado en la barra de navegación (responsivo y adaptado) y configurado como favicon del sitio.
*   [x] **Formulario de Contacto Real**: Preparación e integración con Google Apps Script (Opción 2) para el envío directo a `contacto@ayrlegal.cl`.
*   [x] **Configuración Git**: Creación de un archivo `.gitignore` estándar para ignorar dependencias, temporales y configuraciones de IDEs.
*   [x] **Documentación**: Creación y actualización de `README.md` y `agents.md`.

