/* Núcleo compartido: hooks, componentes de interfaz, cabecera y pie.
   Todo se exporta en window.UI. Las páginas se registran en window.Pages. */
(function () {
  const { useState, useEffect, useRef } = React;
  const SITE = window.SITE;
  window.Pages = window.Pages || {};

  /* ---------- Hooks ---------- */
  function leerRuta() {
    const h = window.location.hash.replace(/^#\/?/, "").split("?")[0];
    return h || "inicio";
  }

  function useHashRoute() {
    const [ruta, setRuta] = useState(leerRuta());
    useEffect(() => {
      const alCambiar = () => {
        setRuta(leerRuta());
        window.scrollTo({ top: 0, behavior: "instant" });
      };
      window.addEventListener("hashchange", alCambiar);
      return () => window.removeEventListener("hashchange", alCambiar);
    }, []);
    return ruta;
  }

  /* Devuelve [ref, visible]: visible pasa a true cuando el elemento entra en pantalla */
  function useEnPantalla(opciones) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      if (!("IntersectionObserver" in window)) { setVisible(true); return; }
      const obs = new IntersectionObserver((entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
        });
      }, Object.assign({ threshold: 0.12 }, opciones || {}));
      obs.observe(el);
      return () => obs.disconnect();
    }, []);
    return [ref, visible];
  }

  /* ---------- Componentes ---------- */
  /* Aparece con animación al hacer scroll. retraso en ms. */
  function Reveal({ children, retraso = 0, como = "div", className = "", style, ...resto }) {
    const [ref, visible] = useEnPantalla();
    const Etiqueta = como;
    return (
      <Etiqueta
        ref={ref}
        className={"reveal " + (visible ? "reveal--visible " : "") + className}
        style={Object.assign({ "--retraso": retraso + "ms" }, style || {})}
        {...resto}
      >
        {children}
      </Etiqueta>
    );
  }

  /* Enlace con aspecto de botón. variante: "primario" | "secundario" | "fantasma" */
  function Boton({ a, variante = "primario", children, className = "", ...resto }) {
    const clases = "btn btn--" + variante + " " + className;
    if (a) return <a href={a} className={clases} {...resto}>{children}</a>;
    return <button className={clases} {...resto}>{children}</button>;
  }

  /* Cabecera de cada página interior */
  function PageHero({ sobretitulo, titulo, texto, children }) {
    return (
      <header className="page-hero">
        <div className="contenedor">
          {sobretitulo && <p className="sobretitulo">{sobretitulo}</p>}
          <h1 className="page-hero__titulo">{titulo}</h1>
          {texto && <p className="page-hero__texto">{texto}</p>}
          {children}
        </div>
        <div className="page-hero__forma" aria-hidden="true"></div>
      </header>
    );
  }

  /* Título de bloque dentro de una página */
  function TituloSeccion({ sobretitulo, titulo, texto, centrado = false }) {
    return (
      <Reveal className={"titulo-seccion" + (centrado ? " titulo-seccion--centrado" : "")}>
        {sobretitulo && <p className="sobretitulo">{sobretitulo}</p>}
        <h2>{titulo}</h2>
        {texto && <p className="titulo-seccion__texto">{texto}</p>}
      </Reveal>
    );
  }

  /* Banda final de llamada a la acción, reutilizable en todas las páginas */
  function BandaCita({ titulo = "¿Damos el primer paso?", texto = "La primera sesión de valoración es gratuita y sin compromiso. Te respondemos en menos de 24 horas." }) {
    return (
      <section className="banda-cita">
        <Reveal className="contenedor banda-cita__interior">
          <div>
            <h2>{titulo}</h2>
            <p>{texto}</p>
          </div>
          <div className="banda-cita__acciones">
            <Boton a="#/pedir-cita" variante="claro">Pedir cita</Boton>
            <a className="banda-cita__tel" href={"tel:+34" + SITE.contacto.telefono.replace(/\s/g, "")}>o llámanos: {SITE.contacto.telefono}</a>
          </div>
        </Reveal>
      </section>
    );
  }

  /* Iconos de línea (SVG). nombre: ver objeto TRAZOS */
  const TRAZOS = {
    corazon: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.600-7 10-7 10z",
    cerebro: "M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 0V7a3 3 0 0 0-3-3zm6 0a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 0",
    familia: "M8 8a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5zm8 0a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5zM3 20v-4a5 5 0 0 1 10 0v4m0-4a4 4 0 0 1 8 0v4",
    escudo: "M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6l8-3zm-3 9l2 2 4-4",
    calendario: "M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm-1 5h16M8 3v4m8-4v4",
    telefono: "M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z",
    correo: "M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm-1 1l9 6 9-6",
    ubicacion: "M12 21s-7-6.200-7-11a7 7 0 0 1 14 0c0 4.800-7 11-7 11zm0-8.500a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5z",
    reloj: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-14v5l3 2",
    check: "M5 12.500l4.500 4.500L19 7.500",
    flecha: "M5 12h14m-6-6l6 6-6 6",
    hoja: "M5 19c0-8 5-14 15-14 0 10-6 15-14 14zm0 0c2-5 5-8 9-10",
    grupo: "M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7 9v-2a7 7 0 0 1 14 0v2M4.500 10.500a2.500 2.500 0 1 1 2-4m13 4a2.500 2.500 0 1 0-2-4",
    microfono: "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm-6-3a6 6 0 0 0 12 0m-6 6v3m-3 0h6",
    libro: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5zm0 14a2 2 0 0 1 2-2h13",
    pantalla: "M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm4 15h8m-4-3v3",
    dado: "M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3 5h.010M15 9h.010M12 12h.010M9 15h.010M15 15h.010",
    copa: "M7 3h10l-1 7a4 4 0 0 1-8 0L7 3zm5 11v6m-4 1h8",
    objetivo: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
    chat: "M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-7l-5 4v-4H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
    sol: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-14v2m0 16v2M2 12h2m16 0h2M5 5l1.500 1.500m11 11L19 19M5 19l1.500-1.500m11-11L19 5",
    luna: "M20 14.500A8 8 0 0 1 9.500 4 8 8 0 1 0 20 14.500z",
    menu: "M4 7h16M4 12h16M4 17h16",
    cerrar: "M6 6l12 12M18 6L6 18"
  };

  function Icono({ nombre, tam = 24, className = "" }) {
    return (
      <svg className={"icono " + className} width={tam} height={tam} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={TRAZOS[nombre] || TRAZOS.hoja} />
      </svg>
    );
  }

  function Logo() {
    return (
      <a href="#/inicio" className="logo" aria-label={SITE.nombre + " — inicio"}>
        <svg className="logo__marca" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
          <circle cx="20" cy="20" r="19" fill="var(--color-primario)" />
          <path d="M27 13.500a9 9 0 1 0 0 13" fill="none" stroke="var(--color-fondo)" strokeWidth="2.600" strokeLinecap="round" />
          <path d="M20 26c0-5 2.500-8.500 7-9.500 0 5-2.500 8.500-7 9.500z" fill="var(--color-acento)" />
        </svg>
        <span className="logo__texto">
          <small>Psicología de adicciones</small>
          <strong>Corts</strong>
        </span>
      </a>
    );
  }

  /* ---------- Cabecera ---------- */
  function Navbar({ ruta, tema, alternarTema }) {
    const [abierto, setAbierto] = useState(false);
    const [compacta, setCompacta] = useState(false);

    useEffect(() => {
      const alScroll = () => {
        setCompacta(window.scrollY > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progreso = max > 0 ? window.scrollY / max : 0;
        document.documentElement.style.setProperty("--progreso", progreso.toFixed(4));
      };
      alScroll();
      window.addEventListener("scroll", alScroll, { passive: true });
      return () => window.removeEventListener("scroll", alScroll);
    }, []);

    useEffect(() => { setAbierto(false); }, [ruta]);

    return (
      <header className={"nav" + (compacta ? " nav--compacta" : "") + (abierto ? " nav--abierta" : "")}>
        <div className="nav__progreso" aria-hidden="true"></div>
        <div className="contenedor nav__interior">
          <Logo />
          <nav className="nav__menu" aria-label="Principal">
            {SITE.rutas.map((r) => (
              <a key={r.id} href={"#/" + r.id}
                className={(r.destacado ? "btn btn--primario btn--pequeno" : "nav__enlace") + (ruta === r.id ? " activo" : "")}
                aria-current={ruta === r.id ? "page" : undefined}>
                {r.etiqueta}
              </a>
            ))}
          </nav>
          <div className="nav__utilidades">
            <button className="nav__tema" onClick={alternarTema}
              aria-label={tema === "claro" ? "Activar modo oscuro" : "Activar modo claro"} title="Cambiar tema">
              <Icono nombre={tema === "claro" ? "luna" : "sol"} tam={20} />
            </button>
            <button className="nav__hamburguesa" onClick={() => setAbierto(!abierto)}
              aria-expanded={abierto} aria-label="Abrir o cerrar menú">
              <Icono nombre={abierto ? "cerrar" : "menu"} />
            </button>
          </div>
        </div>
      </header>
    );
  }

  /* ---------- Pie ---------- */
  function Footer() {
    const c = SITE.contacto;
    return (
      <footer className="pie">
        <div className="contenedor pie__rejilla">
          <div>
            <Logo />
            <p className="pie__lema">{SITE.tipoCentro} especializado en conductas adictivas. Orientación {SITE.orientacion.toLowerCase()}.</p>
          </div>
          <div>
            <h3>Secciones</h3>
            <ul>
              {SITE.rutas.map((r) => <li key={r.id}><a href={"#/" + r.id}>{r.etiqueta}</a></li>)}
            </ul>
          </div>
          <div>
            <h3>Contacto</h3>
            <ul>
              <li>{c.direccion}</li>
              <li>{c.cp} {c.ciudad}</li>
              <li><a href={"tel:+34" + c.telefono.replace(/\s/g, "")}>{c.telefono}</a></li>
              <li><a href={"mailto:" + c.email}>{c.email}</a></li>
            </ul>
          </div>
          <div>
            <h3>Horario</h3>
            <ul>
              {c.horario.map((h) => <li key={h.dias}><strong>{h.dias}:</strong> {h.horas}</li>)}
            </ul>
          </div>
        </div>
        <div className="pie__legal">
          <div className="contenedor">
            <nav className="pie__legales" aria-label="Información legal">
              <a href="#/aviso-legal">Aviso legal</a>
              <a href="#/privacidad">Política de privacidad</a>
              <a href="#/cookies">Política de cookies</a>
              <button type="button" onClick={() => window.dispatchEvent(new Event("corts:cookies"))}>Configurar cookies</button>
            </nav>
            <p><strong>Aviso:</strong> {SITE.aviso}</p>
            <p>© {new Date().getFullYear()} {SITE.nombre} · Proyecto de máster · Fotos del local: anuncio inmobiliario (idealista); recreaciones amuebladas generadas con IA · Imágenes de ambiente: Unsplash</p>
          </div>
        </div>
      </footer>
    );
  }

  window.UI = { useHashRoute, useEnPantalla, Reveal, Boton, PageHero, TituloSeccion, BandaCita, Icono, Logo, Navbar, Footer };
})();
