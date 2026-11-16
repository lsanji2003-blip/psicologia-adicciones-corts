(function () {
  const { useState, useEffect, useRef } = React;
  const { Reveal, Boton, PageHero, TituloSeccion, BandaCita, Icono } = window.UI;
  const SITE = window.SITE;

  const VALORES = [
    { icono: "corazon", titulo: "Cercanía sin juicios", texto: "Hablamos de personas con un problema de adicción, no de «adictos». Escuchamos primero y nunca culpabilizamos." },
    { icono: "cerebro", titulo: "Rigor y evidencia", texto: "Usamos tratamientos con respaldo científico y los adaptamos a cada persona, sin soluciones milagrosas." },
    { icono: "familia", titulo: "Contar con la familia", texto: "La adicción afecta a todo el entorno. Cuando la persona quiere, incluimos a quienes la acompañan." },
    { icono: "hoja", titulo: "Compromiso con la comunidad", texto: "Prevenimos en institutos y centros, y divulgamos para que pedir ayuda sea cada vez más fácil." }
  ];

  const DEONTOLOGIA = [
    { icono: "escudo", titulo: "Secreto profesional", texto: "Todo lo que compartes en consulta está protegido por el secreto profesional y por la normativa de protección de datos." },
    { icono: "libro", titulo: "Práctica basada en la evidencia", texto: "Elegimos las técnicas según la investigación disponible y los resultados que vamos midiendo contigo." },
    { icono: "objetivo", titulo: "Formación continua", texto: "Nos actualizamos de forma permanente y supervisamos nuestros casos en equipo para mejorar la calidad de la atención." }
  ];

  /* Filtros por palabra clave sobre el texto de cada ficha */
  const FILTROS = [
    { id: "todos", etiqueta: "Todo el equipo", patron: null },
    { id: "infantojuvenil", etiqueta: "Infancia y adolescencia", patron: /infanto|adolescen|niñ/i },
    { id: "adultos", etiqueta: "Personas adultas", patron: /adult/i },
    { id: "familias", etiqueta: "Familias", patron: /familia/i },
    { id: "prevencion", etiqueta: "Prevención", patron: /prevenci/i }
  ];

  function textoDe(m) {
    return [m.area, m.resumen].concat(m.especialidades || []).join(" ");
  }

  /* ---------- Ficha ampliada (modal accesible) ---------- */
  function FichaAmpliada({ miembro, alCerrar }) {
    const botonCerrar = useRef(null);
    const caja = useRef(null);

    useEffect(() => {
      const previo = document.activeElement;
      const overflowPrevio = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      if (botonCerrar.current) botonCerrar.current.focus();

      function alTeclear(e) {
        if (e.key === "Escape") { e.preventDefault(); alCerrar(); return; }
        if (e.key === "Tab" && caja.current) {
          const foco = caja.current.querySelectorAll("a[href], button:not([disabled])");
          if (!foco.length) return;
          const primero = foco[0];
          const ultimo = foco[foco.length - 1];
          if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
          else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
        }
      }
      document.addEventListener("keydown", alTeclear);
      return () => {
        document.removeEventListener("keydown", alTeclear);
        document.body.style.overflow = overflowPrevio;
        if (previo && previo.focus) previo.focus();
      };
    }, []);

    return (
      <div className="qs-modal" onClick={alCerrar}>
        <div
          className="qs-modal__caja"
          ref={caja}
          role="dialog"
          aria-modal="true"
          aria-labelledby="qs-modal-titulo"
          onClick={(e) => e.stopPropagation()}
        >
          <button type="button" className="qs-modal__cerrar" ref={botonCerrar} onClick={alCerrar} aria-label="Cerrar ficha">
            <Icono nombre="cerrar" tam={22} />
          </button>
          <div className="qs-modal__foto">
            <img src={miembro.foto} alt={"Retrato de " + miembro.nombre} />
          </div>
          <div className="qs-modal__cuerpo">
            <p className="sobretitulo">{miembro.tratamiento}</p>
            <h2 id="qs-modal-titulo">{miembro.nombre}</h2>
            <p className="qs-modal__col">{miembro.colegiada}</p>
            <p className="texto-suave">{miembro.resumen}</p>

            <h3>Formación</h3>
            <ul className="lista-check">
              {(miembro.formacion || []).map((f) => <li key={f}>{f}</li>)}
            </ul>

            <h3>Especialidades</h3>
            <div className="pildoras">
              {(miembro.especialidades || []).map((e) => <span key={e} className="pildora">{e}</span>)}
            </div>

            <div className="qs-modal__acciones">
              <Boton a="#/pedir-cita">Pedir cita con {miembro.nombre.split(" ")[0]}</Boton>
              <button type="button" className="btn btn--fantasma" onClick={alCerrar}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Tarjeta de profesional ---------- */
  function Ficha({ miembro, alAbrir }) {
    const [verMas, setVerMas] = useState(false);
    const idPanel = "qs-formacion-" + miembro.id;
    return (
      <article className="tarjeta qs-ficha">
        <div className="qs-ficha__foto">
          <img src={miembro.foto} alt={"Retrato de " + miembro.nombre} loading="lazy" />
          <span className="qs-ficha__col">{miembro.colegiada}</span>
        </div>
        <div className="qs-ficha__cuerpo">
          <p className="qs-ficha__trat">{miembro.tratamiento}</p>
          <h3>{miembro.nombre}</h3>
          <p className="qs-ficha__area">{miembro.area}</p>
          <p className="texto-suave">{miembro.resumen}</p>
          <div className="pildoras qs-ficha__pildoras">
            {(miembro.especialidades || []).map((e) => <span key={e} className="pildora">{e}</span>)}
          </div>

          <button
            type="button"
            className="qs-ficha__toggle"
            aria-expanded={verMas}
            aria-controls={idPanel}
            onClick={() => setVerMas(!verMas)}
          >
            <span>{verMas ? "Ocultar formación" : "Ver formación"}</span>
            <span className="qs-ficha__mas" aria-hidden="true"></span>
          </button>
          <div className={"qs-ficha__panel" + (verMas ? " qs-ficha__panel--abierto" : "")} id={idPanel}>
            <div>
              <ul className="qs-ficha__formacion">
                {(miembro.formacion || []).map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
          </div>

          <button type="button" className="btn btn--secundario btn--pequeno qs-ficha__ampliar" onClick={() => alAbrir(miembro)}>
            Abrir ficha completa
          </button>
        </div>
      </article>
    );
  }

  function QuienesSomos() {
    const [filtro, setFiltro] = useState("todos");
    const [abierto, setAbierto] = useState(null);

    const filtroActivo = FILTROS.find((f) => f.id === filtro) || FILTROS[0];
    const visibles = SITE.equipo.filter((m) => !filtroActivo.patron || filtroActivo.patron.test(textoDe(m)));

    return (
      <React.Fragment>
        <PageHero
          sobretitulo="Quiénes somos"
          titulo="Personas que te escuchan, profesionales que te acompañan"
          texto="Somos un equipo de cuatro psicólogos generales sanitarios que comparte una convicción: nadie debería afrontar una adicción en soledad ni sentirse juzgado por pedir ayuda."
        />

        <section className="seccion">
          <div className="contenedor qs-presentacion">
            <Reveal className="qs-presentacion__texto">
              <p className="sobretitulo">Nuestra historia</p>
              <h2>Un equipo, una forma de trabajar</h2>
              <p>
                Psicología de adicciones Corts nace de la suma de cuatro trayectorias complementarias: la intervención con adultos, el trabajo con la infancia y la adolescencia, la prevención en los centros educativos y el acompañamiento a las familias.
              </p>
              <p>
                Trabajamos de forma coordinada: revisamos los casos en equipo, compartimos criterios y derivamos entre nosotros cuando otro compañero puede ayudarte mejor. Así, la persona que te atiende cuenta siempre con la experiencia de todo el centro.
              </p>
              <p className="texto-suave">Nuestra orientación es {SITE.orientacion.toLowerCase()}, con evidencia científica y mucha humanidad.</p>
            </Reveal>
            <Reveal retraso={150} className="qs-presentacion__imagen">
              <img src={SITE.fotos.taller} alt="Reunión de trabajo del equipo en una sala luminosa" loading="lazy" />
              <div className="qs-presentacion__sello">
                <strong>{SITE.equipo.length}</strong>
                <span>psicólogos colegiados</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="seccion seccion--alt">
          <div className="contenedor">
            <TituloSeccion
              sobretitulo="Nuestros valores"
              titulo="Lo que guía cada sesión"
              texto="Son pocas ideas, pero las aplicamos todos los días."
            />
            <div className="rejilla rejilla--4">
              {VALORES.map((v, i) => (
                <Reveal key={v.titulo} retraso={i * 100}>
                  <div className="tarjeta tarjeta--elevable qs-valor">
                    <span className="tarjeta__icono qs-valor__icono"><Icono nombre={v.icono} tam={26} /></span>
                    <h3>{v.titulo}</h3>
                    <p className="texto-suave">{v.texto}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="seccion" id="equipo">
          <div className="contenedor">
            <TituloSeccion
              sobretitulo="El equipo"
              titulo="Conoce a quienes te van a atender"
              texto="Cada ficha incluye la formación completa y las áreas de trabajo. Puedes filtrar por el tipo de ayuda que buscas."
            />

            <div className="qs-filtros" role="group" aria-label="Filtrar profesionales por área">
              {FILTROS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filtro === f.id}
                  className={"qs-filtro" + (filtro === f.id ? " qs-filtro--activo" : "")}
                  onClick={() => setFiltro(f.id)}
                >
                  {f.etiqueta}
                </button>
              ))}
            </div>
            <p className="qs-contador texto-suave" aria-live="polite">
              {visibles.length === 1 ? "1 profesional" : visibles.length + " profesionales"}
            </p>

            <div className="rejilla rejilla--2 qs-equipo" key={filtro}>
              {visibles.map((m, i) => (
                <div className="qs-equipo__item" key={m.id} style={{ "--i": i }}>
                  <Ficha miembro={m} alAbrir={(mm) => setAbierto(mm)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="seccion seccion--primario">
          <div className="contenedor">
            <TituloSeccion
              sobretitulo="Compromiso deontológico"
              titulo="Tu confianza es lo primero"
              texto="Ejercemos conforme al código deontológico de la profesión."
              centrado
            />
            <div className="rejilla rejilla--3">
              {DEONTOLOGIA.map((d, i) => (
                <Reveal key={d.titulo} retraso={i * 120}>
                  <div className="qs-deonto">
                    <span className="qs-deonto__icono"><Icono nombre={d.icono} tam={28} /></span>
                    <h3>{d.titulo}</h3>
                    <p>{d.texto}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <BandaCita />

        {abierto && <FichaAmpliada miembro={abierto} alCerrar={() => setAbierto(null)} />}
      </React.Fragment>
    );
  }

  window.Pages["quienes-somos"] = QuienesSomos;
})();
