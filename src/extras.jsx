/* Extras: historia con scroll-scrubbing (la animación avanza con el desplazamiento)
   y aviso de cookies. Se exportan en window.UI. */
(function () {
  const { useState, useEffect, useRef } = React;
  const { Boton, Icono } = window.UI;

  const limitar = (v) => Math.max(0, Math.min(1, v));

  /* ---------- Historia con scroll-scrubbing ---------- */
  const PASOS = [
    {
      titulo: "Empieza como un juego",
      texto: "Una partida más, una apuesta pequeña con los amigos, un rato de scroll antes de dormir. Nada que llame la atención."
    },
    {
      titulo: "Poco a poco ocupa más espacio",
      texto: "Las notificaciones llaman, las horas se alargan y lo demás (amigos, deporte, estudios, sueño) se va quedando fuera."
    },
    {
      titulo: "Pedir ayuda cambia la dirección",
      texto: "Con apoyo profesional, el adolescente y su familia entienden qué mantiene la conducta y empiezan a recuperar el control."
    },
    {
      titulo: "Y la vida vuelve a tener sitio",
      texto: "No se trata de prohibir, sino de que cada cosa vuelva a ocupar su lugar. Ese es el camino que recorremos contigo."
    }
  ];

  const AVISOS = ["Nueva partida", "Bono de 50 €", "128 me gusta", "Racha de 12 días", "¡Última oportunidad!", "3 mensajes", "Cuota 2,40", "Nivel 40"];
  const VIDA = [
    { texto: "Amigos", icono: "grupo" },
    { texto: "Deporte", icono: "corazon" },
    { texto: "Dormir bien", icono: "luna" },
    { texto: "Familia", icono: "familia" },
    { texto: "Estudios", icono: "libro" },
    { texto: "Tiempo libre", icono: "sol" }
  ];

  /* Reparte n elementos en un círculo; devuelve factores x, y entre -1 y 1 */
  function enCirculo(i, n, desfase) {
    const a = (i / n) * Math.PI * 2 + (desfase || 0);
    return { x: Math.cos(a).toFixed(3), y: Math.sin(a).toFixed(3) };
  }

  function HistoriaScroll() {
    const seccion = useRef(null);
    const horas = useRef(null);
    const [paso, setPaso] = useState(0);
    const [sinMovimiento] = useState(() =>
      typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    useEffect(() => {
      if (sinMovimiento) return;
      const el = seccion.current;
      if (!el) return;
      let pendiente = false;

      function actualizar() {
        pendiente = false;
        const r = el.getBoundingClientRect();
        const recorrido = r.height - window.innerHeight;
        const p = recorrido > 0 ? limitar(-r.top / recorrido) : 0;
        /* Tres fases: 1) llegan los avisos, 2) todo se oscurece y crece, 3) se despeja */
        const p1 = limitar(p / 0.3);
        const p2 = limitar((p - 0.3) / 0.25);
        const p3 = limitar((p - 0.58) / 0.32);
        el.style.setProperty("--p", p.toFixed(4));
        el.style.setProperty("--p1", p1.toFixed(4));
        el.style.setProperty("--p2", p2.toFixed(4));
        el.style.setProperty("--p3", p3.toFixed(4));
        el.style.setProperty("--dist", (1.25 - 0.5 * p1 + 1.1 * p3).toFixed(4));
        el.style.setProperty("--carga", (p2 * (1 - p3)).toFixed(4));
        if (horas.current) {
          const h = 1 + 3 * p1 + 5 * p2 - 7.5 * p3;
          horas.current.textContent = h.toFixed(1).replace(".", ",");
        }
        const nuevo = p < 0.27 ? 0 : p < 0.55 ? 1 : p < 0.8 ? 2 : 3;
        setPaso((actual) => (actual === nuevo ? actual : nuevo));
      }

      function alScroll() {
        if (pendiente) return;
        pendiente = true;
        window.requestAnimationFrame(actualizar);
      }

      actualizar();
      window.addEventListener("scroll", alScroll, { passive: true });
      window.addEventListener("resize", alScroll);
      return () => {
        window.removeEventListener("scroll", alScroll);
        window.removeEventListener("resize", alScroll);
      };
    }, [sinMovimiento]);

    /* Versión estática para quien prefiere menos movimiento */
    if (sinMovimiento) {
      return (
        <section className="seccion seccion--alt">
          <div className="contenedor">
            <p className="sobretitulo">Cómo ocurre</p>
            <h2>De una partida más a recuperar tu tiempo</h2>
            <ol className="historia-estatica">
              {PASOS.map((p) => (
                <li key={p.titulo} className="tarjeta"><h3>{p.titulo}</h3><p className="texto-suave">{p.texto}</p></li>
              ))}
            </ol>
          </div>
        </section>
      );
    }

    return (
      <section className="historia" ref={seccion} aria-label="Cómo una conducta va ocupando espacio y cómo se recupera">
        <div className="historia__fija">
          <div className="contenedor historia__rejilla">
            <div className="historia__texto">
              <p className="sobretitulo">Cómo ocurre · desliza</p>
              <div className="historia__pasos">
                {PASOS.map((p, i) => (
                  <div key={p.titulo} className={"historia__paso" + (i === paso ? " activo" : "")} aria-hidden={i !== paso}>
                    <span className="historia__num">{"0" + (i + 1)}</span>
                    <h2>{p.titulo}</h2>
                    <p>{p.texto}</p>
                    {i === PASOS.length - 1 && <Boton a="#/pedir-cita" tabIndex={i === paso ? 0 : -1}>Pedir cita</Boton>}
                  </div>
                ))}
              </div>
              <ol className="historia__puntos" aria-hidden="true">
                {PASOS.map((p, i) => <li key={p.titulo} className={i <= paso ? "hecho" : ""}></li>)}
              </ol>
            </div>

            <div className="historia__escena" aria-hidden="true">
              <div className="historia__halo"></div>
              <svg className="historia__anillo" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="92" className="historia__anillo-fondo" />
                <circle cx="100" cy="100" r="92" className="historia__anillo-avance" pathLength="1" />
              </svg>

              {AVISOS.map((t, i) => {
                const c = enCirculo(i, AVISOS.length, -1.2);
                return <span key={t} className="historia__aviso" style={{ "--x": c.x, "--y": c.y, "--i": i }}>{t}</span>;
              })}

              {VIDA.map((v, i) => {
                const c = enCirculo(i, VIDA.length, -0.6);
                return (
                  <span key={v.texto} className="historia__vida" style={{ "--x": c.x, "--y": c.y, "--i": i }}>
                    <Icono nombre={v.icono} tam={18} /> {v.texto}
                  </span>
                );
              })}

              <div className="historia__movil">
                <div className="historia__pantalla">
                  <span className="historia__etiqueta">Hoy, delante de la pantalla</span>
                  <strong><span ref={horas}>1,0</span> h</strong>
                  <div className="historia__barras">
                    <i></i><i></i><i></i><i></i><i></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- Aviso de cookies ---------- */
  const CLAVE = "corts-cookies";

  function leerPreferencia() {
    try { return JSON.parse(localStorage.getItem(CLAVE) || "null"); } catch (e) { return null; }
  }

  function CookieBanner() {
    const [visible, setVisible] = useState(() => leerPreferencia() === null);
    const [configurando, setConfigurando] = useState(false);
    const [analiticas, setAnaliticas] = useState(false);

    /* Permite reabrir el panel desde la página de cookies */
    useEffect(() => {
      const abrir = () => {
        const p = leerPreferencia();
        setAnaliticas(!!(p && p.analiticas));
        setConfigurando(true);
        setVisible(true);
      };
      window.addEventListener("corts:cookies", abrir);
      return () => window.removeEventListener("corts:cookies", abrir);
    }, []);

    function guardar(valorAnaliticas) {
      try {
        localStorage.setItem(CLAVE, JSON.stringify({ necesarias: true, analiticas: !!valorAnaliticas, fecha: new Date().toISOString() }));
      } catch (e) {}
      setVisible(false);
      setConfigurando(false);
    }

    if (!visible) return null;

    return (
      <div className="cookies" role="dialog" aria-modal="false" aria-labelledby="cookies-titulo">
        <div className="cookies__caja">
          <h2 id="cookies-titulo">Tu privacidad</h2>
          <p>
            Usamos almacenamiento técnico para recordar tus preferencias (como el tema claro u oscuro) y, solo si lo aceptas,
            cookies analíticas para saber cuántas personas visitan la web. Más información en la <a href="#/cookies">política de cookies</a>.
          </p>

          {configurando && (
            <div className="cookies__opciones">
              <label className="cookies__opcion">
                <input type="checkbox" checked disabled readOnly />
                <span><strong>Técnicas (siempre activas)</strong>Necesarias para que la web funcione y para guardar esta elección.</span>
              </label>
              <label className="cookies__opcion">
                <input type="checkbox" checked={analiticas} onChange={(e) => setAnaliticas(e.target.checked)} />
                <span><strong>Analíticas</strong>Estadísticas de visitas anónimas (Google Analytics). En esta web simulada no se instalan realmente.</span>
              </label>
            </div>
          )}

          <div className="cookies__acciones">
            {configurando ? (
              <Boton className="btn--pequeno" onClick={() => guardar(analiticas)}>Guardar selección</Boton>
            ) : (
              <Boton variante="fantasma" className="btn--pequeno" onClick={() => setConfigurando(true)}>Configurar</Boton>
            )}
            <Boton variante="secundario" className="btn--pequeno" onClick={() => guardar(false)}>Rechazar</Boton>
            <Boton className="btn--pequeno" onClick={() => guardar(true)}>Aceptar todas</Boton>
          </div>
        </div>
      </div>
    );
  }

  window.UI.HistoriaScroll = HistoriaScroll;
  window.UI.CookieBanner = CookieBanner;
})();
