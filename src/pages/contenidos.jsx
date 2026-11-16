(function () {
  const { useState, useEffect, useRef } = React;
  const { Reveal, Boton, PageHero, TituloSeccion, BandaCita, Icono } = window.UI;
  const SITE = window.SITE;

  /* ---------- Utilidades (toleran datos ausentes o con otra forma) ---------- */
  function texto(v) {
    return v === undefined || v === null ? "" : String(v).trim();
  }

  function aLista(v, separador) {
    if (Array.isArray(v)) return v.map(texto).filter(Boolean);
    const t = texto(v);
    return t ? (separador ? t.split(separador).filter(Boolean) : [t]) : [];
  }

  function normalizar(p, i) {
    const pieza = p || {};
    return {
      clave: pieza.id !== undefined && pieza.id !== null ? String(pieza.id) : "pieza-" + i,
      orden: i,
      tipo: texto(pieza.tipo),
      red: texto(pieza.red),
      pilar: texto(pieza.pilar),
      titulo: texto(pieza.titulo) || "Sin título",
      resumen: texto(pieza.resumen),
      fecha: texto(pieza.fecha),
      formato: texto(pieza.formato),
      cuerpo: aLista(pieza.cuerpo),
      etiquetas: aLista(pieza.etiquetas, /[\s,]+/)
    };
  }

  function unicos(lista) {
    const salida = [];
    lista.forEach((x) => { if (x && salida.indexOf(x) === -1) salida.push(x); });
    return salida;
  }

  /* "2026-11-03" -> "3 de noviembre de 2026". Si no se puede interpretar, devuelve el texto tal cual. */
  function formatearFecha(f) {
    if (!f) return "";
    const m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(f);
    const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(f);
    if (isNaN(d.getTime())) return f;
    return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
  }

  function marcaTiempo(f) {
    if (!f) return null;
    const m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(f);
    const d = m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : new Date(f);
    return isNaN(d.getTime()) ? null : d.getTime();
  }

  /* Tono (0-359) estable a partir de un texto, para colorear cada red sin fijar valores */
  function tonoDe(t) {
    const s = texto(t).toLowerCase();
    if (!s) return 165;
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
    return h;
  }

  function iconoDe(tipo) {
    const t = texto(tipo).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    if (/video|reel|directo|live/.test(t)) return "pantalla";
    if (/articulo|blog|lectura|texto/.test(t)) return "libro";
    if (/podcast|audio|charla/.test(t)) return "microfono";
    if (/infograf|carrusel|imagen|cartel/.test(t)) return "objetivo";
    return "chat";
  }

  function datosRed(red) {
    if (!red) return null;
    const redes = (SITE.contacto && SITE.contacto.redes) || [];
    return redes.find((r) => texto(r.red).toLowerCase() === red.toLowerCase()) || null;
  }

  function inicialesCentro() {
    const n = texto(SITE.nombreCorto) || texto(SITE.nombre) || "C";
    return n.split(/\s+/).map((w) => w.charAt(0)).join("").slice(0, 2).toUpperCase();
  }

  /* ---------- Vista ampliada ---------- */
  function Visor({ pieza, anterior, siguiente, onCerrar, onIr }) {
    const botonCerrar = useRef(null);
    const caja = useRef(null);
    const red = datosRed(pieza.red);

    useEffect(() => {
      const previo = document.activeElement;
      const overflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      if (botonCerrar.current) botonCerrar.current.focus();
      return () => {
        document.body.style.overflow = overflow;
        if (previo && previo.focus) previo.focus();
      };
    }, []);

    useEffect(() => {
      function alTeclear(e) {
        if (e.key === "Escape") { onCerrar(); return; }
        if (e.key === "ArrowLeft" && anterior) { onIr(anterior); return; }
        if (e.key === "ArrowRight" && siguiente) { onIr(siguiente); return; }
        if (e.key === "Tab" && caja.current) {
          const foco = caja.current.querySelectorAll("button, a[href], [tabindex]:not([tabindex='-1'])");
          if (!foco.length) return;
          const primero = foco[0];
          const ultimo = foco[foco.length - 1];
          if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
          else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
        }
      }
      document.addEventListener("keydown", alTeclear);
      return () => document.removeEventListener("keydown", alTeclear);
    }, [anterior, siguiente, onCerrar, onIr]);

    const fecha = formatearFecha(pieza.fecha);

    return (
      <div className="cont-visor" onMouseDown={(e) => { if (e.target === e.currentTarget) onCerrar(); }}>
        <div className="cont-visor__caja" role="dialog" aria-modal="true" aria-labelledby="cont-visor-titulo" ref={caja}>
          <button type="button" className="cont-visor__cerrar" ref={botonCerrar} onClick={onCerrar} aria-label="Cerrar vista ampliada">
            <Icono nombre="cerrar" tam={22} />
          </button>
          <div className="cont-visor__media" style={{ "--tono": tonoDe(pieza.red || pieza.tipo) }}>
            <Icono nombre={iconoDe(pieza.tipo)} tam={44} />
            {pieza.formato && <span className="cont-visor__formato">{pieza.formato}</span>}
          </div>
          <div className="cont-visor__cuerpo">
            <div className="pildoras">
              {pieza.tipo && <span className="pildora">{pieza.tipo}</span>}
              {pieza.red && <span className="pildora pildora--acento">{pieza.red}</span>}
              {pieza.pilar && <span className="pildora">{pieza.pilar}</span>}
            </div>
            <h2 id="cont-visor-titulo">{pieza.titulo}</h2>
            <p className="cont-visor__meta texto-suave">
              {fecha && <span>{fecha}</span>}
              {fecha && red && red.usuario && <span aria-hidden="true"> · </span>}
              {red && red.usuario && <span>{red.usuario}</span>}
            </p>
            {pieza.resumen && <p className="cont-visor__resumen">{pieza.resumen}</p>}
            {pieza.cuerpo.map((par, i) => <p key={i}>{par}</p>)}
            {pieza.etiquetas.length > 0 && (
              <ul className="cont-etiquetas">
                {pieza.etiquetas.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            )}
          </div>
          <div className="cont-visor__nav">
            <button type="button" className="btn btn--secundario btn--pequeno" disabled={!anterior} onClick={() => anterior && onIr(anterior)}>Anterior</button>
            <button type="button" className="btn btn--secundario btn--pequeno" disabled={!siguiente} onClick={() => siguiente && onIr(siguiente)}>Siguiente</button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Estrategia: objetivos, plataformas y medición (opcional, desde los datos) ---------- */
  function Estrategia({ C }) {
    const objetivos = Array.isArray(C.objetivos) ? C.objetivos : [];
    const plataformas = Array.isArray(C.plataformas) ? C.plataformas : [];
    const [activa, setActiva] = useState(0);
    if (!objetivos.length && !plataformas.length) return null;
    const p = plataformas[activa] || plataformas[0];

    return (
      <section className="seccion seccion--alt">
        <div className="contenedor">
          {objetivos.length > 0 && (
            <React.Fragment>
              <TituloSeccion
                sobretitulo="Estrategia"
                titulo="Para qué comunicamos"
                texto="Tres objetivos de comunicación y cómo sabremos si los estamos cumpliendo."
              />
              <div className="rejilla rejilla--3 cont-objetivos">
                {objetivos.map((o, i) => (
                  <Reveal key={o.nombre} retraso={i * 100} className="tarjeta tarjeta--elevable cont-objetivo">
                    <span className="cont-objetivo__num" aria-hidden="true">{"0" + (i + 1)}</span>
                    <h3>{o.nombre}</h3>
                    <p>{o.texto}</p>
                    {o.medicion && (
                      <p className="cont-objetivo__medicion texto-suave"><strong>Cómo lo medimos:</strong> {o.medicion}</p>
                    )}
                  </Reveal>
                ))}
              </div>
            </React.Fragment>
          )}

          {plataformas.length > 0 && p && (
            <Reveal className="cont-plataformas">
              <h3 className="cont-plataformas__titulo">Un canal para cada público</h3>
              <div className="cont-plataformas__tabs" role="tablist" aria-label="Plataformas del plan">
                {plataformas.map((pl, i) => (
                  <button key={pl.nombre} type="button" role="tab"
                    id={"cont-plat-tab-" + i}
                    aria-selected={i === activa}
                    aria-controls="cont-plat-panel"
                    className={"cont-chip" + (i === activa ? " cont-chip--activo" : "")}
                    onClick={() => setActiva(i)}>
                    {pl.nombre}
                  </button>
                ))}
              </div>
              <div className="tarjeta cont-plataformas__panel" role="tabpanel" id="cont-plat-panel"
                aria-labelledby={"cont-plat-tab-" + activa} key={p.nombre}>
                <dl>
                  <div><dt>¿A quién se dirige?</dt><dd>{p.publico}</dd></div>
                  <div><dt>¿Qué buscamos que hagan?</dt><dd>{p.accion}</dd></div>
                  <div><dt>Sinergias con otros canales</dt><dd>{p.sinergias}</dd></div>
                  <div><dt>¿Para qué sirve?</dt><dd>{p.objetivo}</dd></div>
                </dl>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    );
  }

  /* ---------- Página ---------- */
  function Contenidos() {
    const C = SITE.contenidos || {};
    const piezas = (Array.isArray(C.piezas) ? C.piezas : []).map(normalizar);

    /* Opciones de filtro derivadas de los datos: primero el orden de C.pilares, luego los que solo aparezcan en piezas */
    const pilaresEnPiezas = unicos(piezas.map((p) => p.pilar));
    const pilares = unicos(aLista(C.pilares).filter((p) => pilaresEnPiezas.indexOf(p) !== -1).concat(pilaresEnPiezas));
    const redes = unicos(piezas.map((p) => p.red));
    const tipos = unicos(piezas.map((p) => p.tipo));

    const [pilar, setPilar] = useState("");
    const [red, setRed] = useState("");
    const [orden, setOrden] = useState("plan");
    const [abierta, setAbierta] = useState(null);

    let visibles = piezas.filter((p) => (!pilar || p.pilar === pilar) && (!red || p.red === red));
    if (orden === "recientes") {
      visibles = visibles.slice().sort((a, b) => {
        const ta = marcaTiempo(a.fecha);
        const tb = marcaTiempo(b.fecha);
        if (ta === null && tb === null) return a.orden - b.orden;
        if (ta === null) return 1;
        if (tb === null) return -1;
        return tb - ta || a.orden - b.orden;
      });
    }

    const indiceAbierta = abierta ? visibles.findIndex((p) => p.clave === abierta) : -1;
    const piezaAbierta = indiceAbierta >= 0 ? visibles[indiceAbierta] : null;
    const hayFiltros = !!(pilar || red);

    function contar(campo, valor) {
      return piezas.filter((p) => p[campo] === valor && (campo === "pilar" ? (!red || p.red === red) : (!pilar || p.pilar === pilar))).length;
    }

    const textoHero = texto(C.intro) || "Divulgamos sobre adicciones con rigor y sin estigma.";
    const centro = texto(SITE.nombreCorto) || texto(SITE.nombre);

    return (
      <React.Fragment>
        <PageHero sobretitulo="Contenidos" titulo="Divulgar también es cuidar" texto={textoHero}>
          <ul className="cont-resumen" aria-label="Resumen del plan de contenidos">
            <li><strong>{piezas.length}</strong> {piezas.length === 1 ? "pieza" : "piezas"}</li>
            {pilares.length > 0 && <li><strong>{pilares.length}</strong> {pilares.length === 1 ? "pilar" : "pilares"}</li>}
            {redes.length > 0 && <li><strong>{redes.length}</strong> {redes.length === 1 ? "canal" : "canales"}</li>}
          </ul>
        </PageHero>

        <Estrategia C={C} />

        <section className="seccion">
          <div className="contenedor">
            <TituloSeccion
              sobretitulo="Plan de contenidos"
              titulo="Lo que compartimos y dónde"
              texto="Filtra por pilar temático o por red y pulsa cualquier publicación para leerla completa."
            />

            {piezas.length === 0 ? (
              <Reveal className="cont-vacio tarjeta">
                <h3>Estamos preparando los contenidos</h3>
                <p className="texto-suave">Muy pronto publicaremos aquí nuestro plan de contenidos. Mientras tanto, puedes escribirnos si tienes dudas.</p>
                <Boton a="#/contacto" variante="secundario">Ir a contacto</Boton>
              </Reveal>
            ) : (
              <React.Fragment>
                <div className="cont-filtros">
                  {pilares.length > 0 && (
                    <div className="cont-grupo">
                      <p className="cont-grupo__titulo" id="cont-f-pilar">Pilar</p>
                      <div className="cont-chips" role="group" aria-labelledby="cont-f-pilar">
                        <button type="button" className={"cont-chip" + (!pilar ? " cont-chip--activo" : "")} aria-pressed={!pilar} onClick={() => setPilar("")}>
                          Todos
                        </button>
                        {pilares.map((p) => (
                          <button key={p} type="button" className={"cont-chip" + (pilar === p ? " cont-chip--activo" : "")} aria-pressed={pilar === p} onClick={() => setPilar(pilar === p ? "" : p)}>
                            {p} <span className="cont-chip__n">{contar("pilar", p)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {redes.length > 0 && (
                    <div className="cont-grupo">
                      <p className="cont-grupo__titulo" id="cont-f-red">Red</p>
                      <div className="cont-chips" role="group" aria-labelledby="cont-f-red">
                        <button type="button" className={"cont-chip" + (!red ? " cont-chip--activo" : "")} aria-pressed={!red} onClick={() => setRed("")}>
                          Todas
                        </button>
                        {redes.map((r) => (
                          <button key={r} type="button" className={"cont-chip" + (red === r ? " cont-chip--activo" : "")} aria-pressed={red === r} style={{ "--tono": tonoDe(r) }} onClick={() => setRed(red === r ? "" : r)}>
                            <span className="cont-chip__punto" aria-hidden="true"></span>
                            {r} <span className="cont-chip__n">{contar("red", r)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="cont-barra">
                  <p className="texto-suave" aria-live="polite">
                    {visibles.length === 1 ? "1 publicación" : visibles.length + " publicaciones"}
                    {hayFiltros && (
                      <button type="button" className="cont-limpiar" onClick={() => { setPilar(""); setRed(""); }}>Quitar filtros</button>
                    )}
                  </p>
                  <div className="cont-orden" role="group" aria-label="Ordenar publicaciones">
                    <button type="button" className={"cont-orden__op" + (orden === "plan" ? " cont-orden__op--activo" : "")} aria-pressed={orden === "plan"} onClick={() => setOrden("plan")}>Orden del plan</button>
                    <button type="button" className={"cont-orden__op" + (orden === "recientes" ? " cont-orden__op--activo" : "")} aria-pressed={orden === "recientes"} onClick={() => setOrden("recientes")}>Más recientes</button>
                  </div>
                </div>

                {visibles.length === 0 ? (
                  <div className="cont-vacio tarjeta">
                    <h3>Ninguna publicación con esos filtros</h3>
                    <p className="texto-suave">Prueba con otra combinación de pilar y red.</p>
                    <button type="button" className="btn btn--secundario btn--pequeno" onClick={() => { setPilar(""); setRed(""); }}>Quitar filtros</button>
                  </div>
                ) : (
                  <ul className="cont-rejilla">
                    {visibles.map((p, i) => {
                      const infoRed = datosRed(p.red);
                      return (
                        <li key={p.clave}>
                          <Reveal retraso={(i % 3) * 80} className="cont-reveal">
                            <article className="cont-post" style={{ "--tono": tonoDe(p.red || p.tipo) }}>
                              <header className="cont-post__cabecera">
                                <span className="cont-avatar" aria-hidden="true">{inicialesCentro()}</span>
                                <span className="cont-post__quien">
                                  <strong>{centro}</strong>
                                  <small>{[p.red, infoRed && infoRed.usuario].filter(Boolean).join(" · ") || p.tipo}</small>
                                </span>
                                {p.tipo && <span className="pildora cont-post__tipo">{p.tipo}</span>}
                              </header>
                              <div className="cont-post__media" aria-hidden="true">
                                <Icono nombre={iconoDe(p.tipo)} tam={38} />
                                {p.formato && <span className="cont-post__formato">{p.formato}</span>}
                              </div>
                              <div className="cont-post__cuerpo">
                                {(p.fecha || p.pilar) && (
                                  <p className="cont-post__meta">
                                    {p.fecha && <time dateTime={p.fecha}>{formatearFecha(p.fecha)}</time>}
                                    {p.fecha && p.pilar && <span aria-hidden="true"> · </span>}
                                    {p.pilar && <span>{p.pilar}</span>}
                                  </p>
                                )}
                                <h3 className="cont-post__titulo">
                                  <button type="button" className="cont-post__abrir" aria-haspopup="dialog" onClick={() => setAbierta(p.clave)}>{p.titulo}</button>
                                </h3>
                                {p.resumen && <p className="cont-post__resumen">{p.resumen}</p>}
                                {p.etiquetas.length > 0 && (
                                  <ul className="cont-etiquetas">
                                    {p.etiquetas.map((e, k) => <li key={k}>{e}</li>)}
                                  </ul>
                                )}
                                <span className="cont-post__mas" aria-hidden="true">
                                  {p.cuerpo.length > 0 ? "Leer completa" : "Ver ampliada"}
                                  <Icono nombre="flecha" tam={16} />
                                </span>
                              </div>
                            </article>
                          </Reveal>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {tipos.length > 0 && (
                  <p className="cont-tipos texto-suave">
                    Formatos del plan: {tipos.join(", ")}.
                  </p>
                )}
              </React.Fragment>
            )}
          </div>
        </section>

        {piezaAbierta && ReactDOM.createPortal(
          <Visor
            pieza={piezaAbierta}
            anterior={indiceAbierta > 0 ? visibles[indiceAbierta - 1].clave : null}
            siguiente={indiceAbierta < visibles.length - 1 ? visibles[indiceAbierta + 1].clave : null}
            onCerrar={() => setAbierta(null)}
            onIr={(clave) => setAbierta(clave)}
          />,
          document.body
        )}

        {aLista(C.fuentes).length > 0 && (
          <div className="contenedor cont-fuentes texto-suave">
            <h2 className="cont-plataformas__titulo">Fuentes</h2>
            <ul>
              {aLista(C.fuentes).map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        )}

        <BandaCita />
      </React.Fragment>
    );
  }

  window.Pages["contenidos"] = Contenidos;
})();
