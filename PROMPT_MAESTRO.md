# PROMPT MAESTRO — Web «Psicología de adicciones Corts»

Este documento es el encargo completo para construir la web. Lo ejecutan varios agentes en paralelo: cada uno recibe **un lote** de páginas (ver «Lotes») y debe leer este documento entero antes de escribir nada.

## 1. Qué estamos construyendo y para quién

Una web pública y gratuita que **simula** la página de un gabinete privado de psicología especializado en adicciones, situado en València (zona de Les Corts Valencianes). Es un trabajo de máster de cuatro estudiantes que, en la simulación, son psicólogos generales sanitarios colegiados. Lo evaluará profesorado universitario: valorarán que parezca la web real de una clínica seria, que el contenido psicológico sea riguroso y que la parte técnica (React, CSS dinámico, interactividad) se note.

Referencias de estilo que le gustan a la clienta: Psikos, Gabinete Psicológico Párraga y el Centro de Psicoterapia Breve de Málaga. De ellas tomamos: tono cercano y cálido que tutea al lector, lenguaje sencillo sin jerga clínica innecesaria, mucha fotografía de espacios luminosos, llamadas a «Pedir cita» repetidas, el equipo con cara y nombre, y un diseño sobrio y limpio.

**Tono del texto:** español de España, tuteo, cálido, sin juicios ni estigma («persona con un problema de adicción», nunca «adicto», «drogadicto» ni «ludópata»). Frases claras. Nada de promesas de curación ni porcentajes de éxito inventados. El contenido clínico debe ser correcto según la evidencia (terapia cognitivo-conductual, prevención de recaídas de Marlatt, entrevista motivacional, manejo de contingencias, CRAFT para familias, etc.).

**Datos simulados:** dirección, teléfono, correo y números de colegiación son ficticios y ya están en `src/data.js`. No inventes otros datos de contacto, precios cerrados con apariencia oficial, premios, convenios con instituciones reales ni testimonios atribuidos a personas reales. Si incluyes testimonios, que sean anónimos («M., 34 años») y marcados como «testimonio simulado».

## 2. Arquitectura técnica (ya construida: no la cambies)

No hay Node ni compilación. Es un sitio estático que se publicará en GitHub Pages:

- `index.html` carga React 18 (UMD) y Babel Standalone desde CDN y después, en orden: `src/data.js`, `src/contenidos-data.js`, `src/core.jsx`, las páginas de `src/pages/*.jsx` y `src/app.jsx`.
- **No hay módulos ES**: nada de `import` ni `export`. Cada archivo `.jsx` va envuelto en una IIFE y se comunica por objetos globales.
- `window.SITE` (en `src/data.js`): todos los datos — `nombre`, `rutas`, `contacto`, `equipo`, `fotos`, y `contenidos` (en `src/contenidos-data.js`). **Lee los datos de aquí; no los dupliques en el JSX.**
- `window.UI` (en `src/core.jsx`): `Reveal`, `Boton`, `PageHero`, `TituloSeccion`, `BandaCita`, `Icono`, `useEnPantalla`, `useHashRoute`. Lee `src/core.jsx` para ver sus props exactas y la lista de iconos disponibles.
- `window.Pages`: registro de páginas. La clave es el id de la ruta.
- Rutas por hash: `#/inicio`, `#/quienes-somos`, `#/gabinete`, `#/tratamientos`, `#/ponencias-talleres`, `#/contenidos`, `#/contacto`, `#/pedir-cita`. Los enlaces internos son `<a href="#/gabinete">`.
- `css/base.css`: tokens (variables CSS), tema claro/oscuro y clases compartidas (`.contenedor`, `.seccion`, `.seccion--alt`, `.rejilla--2/3/4`, `.tarjeta`, `.tarjeta--elevable`, `.tarjeta__icono`, `.pildora`, `.lista-check`, `.btn`, `.campo`, `.sobretitulo`, `.texto-suave`). **Léelo y reutiliza estas clases.**

Plantilla obligatoria de cada archivo de página:

```jsx
(function () {
  const { useState, useEffect, useRef } = React;
  const { Reveal, Boton, PageHero, TituloSeccion, BandaCita, Icono } = window.UI;
  const SITE = window.SITE;

  function Gabinete() {
    return (
      <React.Fragment>
        <PageHero sobretitulo="El centro" titulo="…" texto="…" />
        <section className="seccion"><div className="contenedor">…</div></section>
        <BandaCita />
      </React.Fragment>
    );
  }

  window.Pages["gabinete"] = Gabinete;
})();
```

### Reglas técnicas

- JSX compatible con Babel Standalone y el preset `react`: `className`, `htmlFor`, etiquetas cerradas, `key` en listas. Sin TypeScript. Usa `<React.Fragment>` en lugar de `<>` para evitar sorpresas.
- Solo React y CSS propios. No añadas librerías, CDNs ni fuentes nuevas, ni toques `index.html`, `base.css`, `core.jsx`, `app.jsx` ni `data.js`. Si echas en falta algo en ellos, dilo en tu informe final en lugar de modificarlos (otros agentes trabajan a la vez sobre la misma base).
- Estilos de tus páginas solo en **tu** archivo CSS del lote. Prefija las clases con el nombre de la página (`.inicio-…`, `.gabinete-…`) para no chocar con otros lotes.
- Colores **siempre** con las variables (`var(--color-primario)`, etc.): así el modo oscuro funciona solo. Comprueba mentalmente cada bloque en ambos temas; nada de texto oscuro fijo sobre fondo que cambia.
- Responsive desde 360 px de ancho hasta escritorio. Usa las rejillas `auto-fit` de la base y `clamp()`.
- Accesibilidad: jerarquía de títulos correcta (un solo `h1`, que ya pone `PageHero`; en Inicio lo pones tú), `alt` en imágenes, botones reales para acciones, `aria-expanded` en acordeones, foco visible.
- Imágenes: solo las de `SITE.fotos` y `SITE.equipo[].foto`. Usa `loading="lazy"` y `object-fit: cover`. No inventes URLs de imágenes.
- **CSS dinámico e interactividad son un requisito evaluable.** Cada página debe tener al menos dos elementos interactivos reales con estado de React (pestañas, acordeones, filtros, carrusel, contadores animados, galería con visor, tarjetas que se giran, formulario por pasos…) y microinteracciones CSS (hover, transiciones, `@keyframes`, variables CSS modificadas desde JS con `style={{ "--x": valor }}`). Envuelve los bloques en `<Reveal>` para que entren al hacer scroll, con `retraso` escalonado en las rejillas. Respeta `prefers-reduced-motion` (la base ya lo neutraliza).
- Cada página termina con `<BandaCita />`, salvo «Pedir cita».

## 3. Contenido obligatorio de cada sección

1. **Inicio** (`inicio`): portada con `h1`, lema, foto `SITE.fotos.hero` y dos botones (Pedir cita / Conoce el gabinete); franja de datos clave (centro privado, orientación cognitivo-conductual, primera valoración gratuita, atención presencial y online); «¿En qué podemos ayudarte?» con las áreas (alcohol, cannabis, cocaína y otras sustancias, juego y apuestas, videojuegos y pantallas, tabaco y vapeo, familias); cómo trabajamos en 4 pasos; avance del equipo con las 4 fotos enlazando a Quiénes somos; avance de contenidos (3 piezas de `SITE.contenidos.piezas`); preguntas frecuentes en acordeón.
2. **Quiénes somos** (`quienes-somos`): presentación del equipo y sus valores; ficha profesional de cada miembro desde `SITE.equipo` (foto, nombre, tratamiento, n.º de colegiación, área, resumen, formación completa y especialidades). La formación debe poder desplegarse o verse en una ficha ampliada (modal o panel) accesible. Añade un bloque breve sobre compromiso deontológico (secreto profesional, práctica basada en la evidencia, formación continua).
3. **Gabinete** (`gabinete`): galería interactiva con `SITE.fotos.gabinete` (visor ampliado con anterior/siguiente y cierre con Escape); qué tipo de centro es (**centro sanitario privado**: qué implica, financiación por honorarios, sin listas de espera, confidencialidad); **objetivos** del centro (lista clara: evaluar, tratar, prevenir recaídas, acompañar a las familias, prevenir en la comunidad, divulgar); **orientación cognitivo-conductual** (qué es, por qué la elegimos, en qué se basa: relación entre pensamiento, emoción y conducta, análisis funcional, objetivos medibles); instalaciones y servicios (salas, accesibilidad, atención online).
4. **Intervenciones y tratamientos** (`tratamientos`): la **terapia cognitivo-conductual** como eje. Explica con pestañas o acordeón las técnicas: análisis funcional de la conducta, entrevista motivacional, entrenamiento en habilidades de afrontamiento, reestructuración cognitiva, control de estímulos y exposición con prevención de respuesta, manejo de contingencias, prevención de recaídas (Marlatt y Gordon), activación conductual y, para familias, CRAFT. Programas por problema (alcohol, cannabis, cocaína, juego, pantallas y videojuegos, tabaco) con a quién va dirigido, formato y duración orientativa. Itinerario del tratamiento en fases (acogida y evaluación → devolución y plan → intervención → prevención de recaídas → seguimiento) como línea de tiempo interactiva. Modalidades: individual, grupal, familiar, online.
5. **Ponencias y talleres** (`ponencias-talleres`): agenda simulada de 6–8 actividades (ponencias en jornadas, talleres para familias, talleres en institutos, formación para profesionales) con fecha (entre noviembre de 2026 y junio de 2027), lugar genérico, ponente del equipo (coherente con su perfil: Jesús coordina los talleres educativos, José rehabilitación en adultos, las dos Lauras infantojuvenil y familias), público y plazas. Filtro por tipo de actividad. Bloque «Llévanos a tu centro» para solicitar una ponencia (enlace a Contacto). Usa `SITE.fotos.taller`.
6. **Contenidos** (`contenidos`): muestra el plan de contenidos de `SITE.contenidos` (intro, pilares, piezas). Debe ser **totalmente dirigida por datos**: el plan definitivo llegará después y sustituirá ese archivo sin tocar el JSX. Filtros por pilar y por red; tarjetas con aspecto de publicación de red social (tipo, red, fecha formateada en español, título, resumen, etiquetas); al pulsar, vista ampliada con el `cuerpo`. Soporta campos opcionales ausentes sin romperse.
7. **Contacto** (`contacto`): dirección, teléfono, WhatsApp, correo, horario y cómo llegar desde `SITE.contacto`; mapa con `<iframe>` de `SITE.contacto.mapaEmbed` (con `title` y `loading="lazy"`); formulario de consulta rápida con validación (nombre, correo, asunto, mensaje, aceptación de privacidad) que **no envía nada**: muestra confirmación en pantalla indicando que es una simulación; redes sociales.
8. **Pedir cita** (`pedir-cita`): asistente por pasos con barra de progreso: (1) motivo de consulta y para quién (yo, familiar, hijo/a menor), (2) profesional (o «sin preferencia») con foto desde `SITE.equipo`, y modalidad presencial/online, (3) día y franja horaria con un calendario propio de las próximas 3 semanas (solo días laborables, respetando el horario del centro) y (4) datos personales con validación y consentimiento. Pantalla final con resumen de la cita. **No se envía ni se guarda nada en servidor**: guarda la solicitud solo en el estado de React y deja claro que es una simulación. Incluye aviso: si hay una urgencia, llamar al 112; línea 024 de atención a la conducta suicida.

## 4. Lotes

| Lote | Archivos que crea | Páginas |
|------|-------------------|---------|
| A | `src/pages/inicio.jsx`, `src/pages/quienes-somos.jsx`, `src/pages/gabinete.jsx`, `css/pages-a.css` | Inicio, Quiénes somos, Gabinete |
| B | `src/pages/tratamientos.jsx`, `src/pages/ponencias.jsx`, `src/pages/contenidos.jsx`, `css/pages-b.css` | Tratamientos, Ponencias y talleres, Contenidos |
| C | `src/pages/contacto.jsx`, `src/pages/pedir-cita.jsx`, `css/pages-c.css` | Contacto, Pedir cita |

Cada agente crea **solo** los archivos de su lote. La página de ponencias se registra como `window.Pages["ponencias-talleres"]`.

## 5. Qué significa «terminado»

- Todos los archivos del lote existen, con la plantilla IIFE y el registro en `window.Pages`.
- Has releído cada `.jsx` buscando errores de sintaxis JSX (etiquetas sin cerrar, `class` en vez de `className`, llaves desbalanceadas, comillas tipográficas dentro de atributos): un solo error deja la web en blanco y no tienes navegador para comprobarlo.
- Cada clase usada en el JSX existe en tu CSS o en `base.css`.
- Informe final breve: archivos creados, elementos interactivos de cada página y cualquier cosa que no hayas podido resolver o que necesite un cambio en los archivos compartidos.

## 6. Prompt para Google Stitch (exploración visual opcional)

> Sitio web de escritorio para «Psicología de adicciones Corts», gabinete privado de psicología especializado en adicciones en València. Estilo sobrio, cálido y luminoso, como una clínica boutique: fondo crema (#faf6ef), verde azulado profundo (#1f5c57) como color principal y terracota suave (#d98a5b) como acento; títulos en serif (Fraunces) y texto en Inter; esquinas redondeadas, mucha fotografía de salas de terapia con luz natural y plantas. Página de inicio con: cabecera con menú (Inicio, Quiénes somos, Gabinete, Intervenciones y tratamientos, Ponencias y talleres, Contenidos, Contacto) y botón «Pedir cita»; portada con titular «Recuperar tu vida empieza por pedir ayuda»; franja de datos clave; tarjetas de áreas de ayuda (alcohol, cannabis, cocaína, juego, pantallas, tabaco, familias); proceso en 4 pasos; equipo de 4 psicólogos con foto; preguntas frecuentes; pie con contacto. Tono cercano y sin estigma.
