(function () {
  const { useState, useEffect, useRef } = React;
  const { Reveal, Boton, TituloSeccion, BandaCita, Icono } = window.UI;
  const SITE = window.SITE;

  /* ---------- Contenido propio de la página ---------- */
  const DATOS_CLAVE = [
    { icono: "escudo", titulo: "Centro sanitario privado", texto: "Autorizado y con profesionales colegiados" },
    { icono: "cerebro", titulo: "Enfoque cognitivo-conductual", texto: "Basado en la evidencia científica" },
    { icono: "calendario", titulo: "Primera valoración gratuita", texto: "Sin compromiso y a tu ritmo" },
    { icono: "chat", titulo: "Presencial y online", texto: "Elige cómo te resulta más cómodo" }
  ];

  const AREAS = [
    {
      id: "alcohol", icono: "copa", titulo: "Alcohol",
      texto: "Beber más de lo que querías, notar que cuesta parar o que el alcohol empieza a pasar factura en tu trabajo, tu salud o tu familia.",
      puntos: ["Evaluación del patrón de consumo", "Estrategias para reducir o dejar de beber", "Prevención de recaídas desde el primer día"]
    },
    {
      id: "cannabis", icono: "hoja", titulo: "Cannabis",
      texto: "Cuando fumar o vapear cannabis deja de ser ocasional y afecta al ánimo, la motivación, los estudios o las relaciones.",
      puntos: ["Análisis de para qué y cuándo consumes", "Manejo del malestar y del deseo de consumir", "Atención específica a jóvenes y adolescentes"]
    },
    {
      id: "cocaina", icono: "cerebro", titulo: "Cocaína y otras sustancias",
      texto: "Cocaína, anfetaminas, opioides, benzodiacepinas u otras sustancias: un espacio seguro para hablar de ello sin etiquetas.",
      puntos: ["Evaluación individualizada y coordinación sanitaria si hace falta", "Control de estímulos y habilidades de afrontamiento", "Trabajo con las emociones que sostienen el consumo"]
    },
    {
      id: "juego", icono: "dado", titulo: "Juego y apuestas",
      texto: "Apuestas deportivas, casino online, tragaperras u otros juegos que generan deudas, mentiras o angustia.",
      puntos: ["Reestructuración de creencias sobre el azar", "Pautas para el control del dinero y de los accesos", "Acompañamiento a la familia"]
    },
    {
      id: "pantallas", icono: "pantalla", titulo: "Videojuegos y pantallas",
      texto: "Cuando el móvil, los videojuegos o las redes desplazan el sueño, los estudios, el ocio o la convivencia.",
      puntos: ["Distinguir uso, abuso y adicción", "Pactos de uso y alternativas de ocio", "Trabajo conjunto con adolescentes y familias"]
    },
    {
      id: "tabaco", icono: "objetivo", titulo: "Tabaco y vapeo",
      texto: "Dejar de fumar o de vapear es posible con un plan personalizado y apoyo psicológico durante las primeras semanas.",
      puntos: ["Preparación y fijación de la fecha de abandono", "Técnicas para el craving y las situaciones de riesgo", "Seguimiento para consolidar el cambio"]
    },
    {
      id: "familias", icono: "familia", titulo: "Familias",
      texto: "Si convives con alguien que tiene un problema de adicción, tú también necesitas orientación y apoyo.",
      puntos: ["Pautas de comunicación y límites (enfoque CRAFT)", "Cómo motivar al cambio sin confrontar", "Cuidar de ti mientras acompañas"]
    }
  ];

  const PASOS = [
    { n: "01", titulo: "Primera valoración", texto: "Una conversación gratuita y sin compromiso para conocernos, escuchar tu situación y resolver tus dudas." },
    { n: "02", titulo: "Evaluación y plan", texto: "Estudiamos tu caso con calma y te devolvemos un plan con objetivos claros y medibles, pactados contigo." },
    { n: "03", titulo: "Intervención", texto: "Sesiones semanales con técnicas de eficacia probada, adaptadas a ti y, si quieres, a tu familia." },
    { n: "04", titulo: "Prevención de recaídas", texto: "Preparamos las situaciones de riesgo y hacemos seguimiento para que lo logrado se mantenga." }
  ];

  const PREGUNTAS = [
    {
      p: "¿Qué pasa en la primera sesión?",
      r: "Hablamos con calma de lo que te preocupa, te explicamos cómo trabajamos y, si encaja, acordamos juntos los siguientes pasos. Es gratuita, no te compromete a nada y nadie te va a juzgar."
    },
    {
      p: "¿Lo que cuento es confidencial?",
      r: "Sí. Somos psicólogos generales sanitarios colegiados y estamos sujetos al secreto profesional y a la normativa de protección de datos. Nada de lo que hablamos sale de la consulta sin tu consentimiento, salvo las excepciones previstas por la ley."
    },
    {
      p: "¿Tengo que estar decidido a dejarlo para venir?",
      r: "No. Muchas personas llegan con dudas y con sentimientos encontrados. Trabajar esa ambivalencia, con técnicas como la entrevista motivacional, es parte del tratamiento."
    },
    {
      p: "¿Cuánto dura un tratamiento?",
      r: "Depende de cada persona, de la sustancia o conducta y de los objetivos. Después de la evaluación te damos una estimación orientativa y la vamos revisando contigo. No hay plazos ni resultados garantizados: cada proceso es distinto."
    },
    {
      p: "¿Puedo acudir si quien tiene el problema es un familiar?",
      r: "Claro. Atendemos a familias aunque la persona afectada todavía no quiera venir. Hay pautas basadas en la evidencia, como el enfoque CRAFT, que ayudan a mejorar la convivencia y a facilitar que pida ayuda."
    },
    {
      p: "¿Hay sesiones online?",
      r: "Sí. Ofrecemos atención presencial en el centro y también por videollamada, según lo que mejor te encaje y lo que recomiende el profesional en tu caso."
    }
  ];

  function formatearFecha(f) {
    if (!f) return "";
    const d = new Date(f + "T00:00:00");
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
  }

  /* ---------- Portada ---------- */
  function Portada() {
    const ref = useRef(null);

    function alMover(e) {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5).toFixed(3);
      const y = ((e.clientY - r.top) / r.height - 0.5).toFixed(3);
      el.style.setProperty("--mx", x);
      el.style.setProperty("--my", y);
    }

    function alSalir() {
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--mx", 0);
      el.style.setProperty("--my", 0);
    }

    return (
      <section className="inicio-portada" ref={ref} onMouseMove={alMover} onMouseLeave={alSalir}>
        <span className="inicio-forma inicio-forma--1" aria-hidden="true"></span>
        <span className="inicio-forma inicio-forma--2" aria-hidden="true"></span>
        <span className="inicio-forma inicio-forma--3" aria-hidden="true"></span>

        <div className="contenedor inicio-portada__rejilla">
          <div className="inicio-portada__texto">
            <p className="sobretitulo inicio-ent" style={{ "--i": 0 }}>{SITE.tipoCentro} · València</p>
            <h1 className="inicio-portada__titulo inicio-ent" style={{ "--i": 1 }}>{SITE.lema}</h1>
            <p className="inicio-portada__lead inicio-ent" style={{ "--i": 2 }}>
              En Corts te acompañamos, sin juicios y a tu ritmo, cuando el alcohol, otras sustancias, el juego o las pantallas han empezado a ocupar demasiado espacio en tu vida o en la de alguien a quien quieres.
            </p>
            <div className="inicio-portada__botones inicio-ent" style={{ "--i": 3 }}>
              <Boton a="#/pedir-cita">Pedir cita <Icono nombre="flecha" tam={18} /></Boton>
              <Boton a="#/gabinete" variante="secundario">Conoce el gabinete</Boton>
            </div>
            <ul className="inicio-portada__avales inicio-ent" style={{ "--i": 4 }}>
              <li><Icono nombre="check" tam={18} /> Primera valoración gratuita</li>
              <li><Icono nombre="check" tam={18} /> Confidencialidad total</li>
              <li><Icono nombre="check" tam={18} /> Sin listas de espera</li>
            </ul>
          </div>

          <div className="inicio-portada__visual inicio-ent inicio-ent--foto" style={{ "--i": 2 }}>
            <div className="inicio-foto">
              <img src={SITE.fotos.hero} alt="Psicóloga atendiendo con cercanía en una sala luminosa del gabinete" />
            </div>
            <div className="inicio-chip inicio-chip--1">
              <span className="inicio-chip__icono"><Icono nombre="corazon" tam={20} /></span>
              <span><strong>Trato cercano</strong><small>Sin etiquetas ni juicios</small></span>
            </div>
            <div className="inicio-chip inicio-chip--2">
              <span className="inicio-chip__icono"><Icono nombre="escudo" tam={20} /></span>
              <span><strong>Secreto profesional</strong><small>Tu historia está protegida</small></span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- Franja de datos clave ---------- */
  function Franja() {
    return (
      <section className="inicio-franja" aria-label="Datos clave del centro">
        <div className="contenedor">
          <ul className="inicio-franja__lista">
            {DATOS_CLAVE.map((d, i) => (
              <Reveal como="li" key={d.titulo} retraso={i * 90} className="inicio-dato">
                <span className="inicio-dato__icono"><Icono nombre={d.icono} tam={26} /></span>
                <span>
                  <strong>{d.titulo}</strong>
                  <small>{d.texto}</small>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  /* ---------- Áreas de ayuda (selector interactivo) ---------- */
  function Areas() {
    const [activa, setActiva] = useState(AREAS[0].id);
    const area = AREAS.find((a) => a.id === activa) || AREAS[0];

    return (
      <section className="seccion">
        <div className="contenedor">
          <TituloSeccion
            sobretitulo="Áreas de ayuda"
            titulo="¿En qué podemos ayudarte?"
            texto="Elige un área para saber cómo trabajamos. Si no encuentras la tuya, escríbenos: lo importante es que des el primer paso."
          />
          <div className="inicio-areas">
            <div className="inicio-areas__lista" role="group" aria-label="Áreas de ayuda">
              {AREAS.map((a, i) => (
                <Reveal key={a.id} retraso={i * 60}>
                  <button
                    type="button"
                    aria-pressed={a.id === activa}
                    aria-controls="area-panel"
                    className={"inicio-area" + (a.id === activa ? " inicio-area--activa" : "")}
                    onClick={() => setActiva(a.id)}
                  >
                    <span className="inicio-area__icono"><Icono nombre={a.icono} tam={22} /></span>
                    <span className="inicio-area__titulo">{a.titulo}</span>
                    <Icono nombre="flecha" tam={18} className="inicio-area__flecha" />
                  </button>
                </Reveal>
              ))}
            </div>

            <div className="inicio-areas__panel" id="area-panel" aria-live="polite">
              <div className="inicio-panel" key={area.id}>
                <span className="inicio-panel__icono"><Icono nombre={area.icono} tam={34} /></span>
                <h3>{area.titulo}</h3>
                <p className="inicio-panel__texto">{area.texto}</p>
                <ul className="lista-check">
                  {area.puntos.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <div className="inicio-panel__acciones">
                  <Boton a="#/tratamientos" variante="secundario" className="btn--pequeno">Ver cómo lo tratamos</Boton>
                  <Boton a="#/pedir-cita" variante="fantasma">Pedir cita <Icono nombre="flecha" tam={16} /></Boton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- Cómo trabajamos ---------- */
  function Pasos() {
    return (
      <section className="seccion seccion--alt">
        <div className="contenedor">
          <TituloSeccion
            sobretitulo="Cómo trabajamos"
            titulo="Un camino claro, en cuatro pasos"
            texto="Sabrás en todo momento dónde estás y hacia dónde vamos. Los ritmos los marcas tú."
          />
          <ol className="inicio-pasos">
            {PASOS.map((p, i) => (
              <Reveal como="li" key={p.n} retraso={i * 120} className="inicio-paso">
                <span className="inicio-paso__num">{p.n}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  /* ---------- Avance del equipo ---------- */
  function Equipo() {
    return (
      <section className="seccion">
        <div className="contenedor">
          <TituloSeccion
            sobretitulo="El equipo"
            titulo="Cuatro psicólogos, un mismo compromiso"
            texto="Profesionales colegiados con formación específica en adicciones, infancia y adolescencia, prevención y trabajo con familias."
          />
          <div className="rejilla rejilla--4">
            {SITE.equipo.map((m, i) => (
              <Reveal key={m.id} retraso={i * 100}>
                <a href="#/quienes-somos" className="inicio-miembro">
                  <span className="inicio-miembro__foto">
                    <img src={m.foto} alt={"Retrato de " + m.nombre} loading="lazy" />
                  </span>
                  <span className="inicio-miembro__datos">
                    <strong>{m.nombre}</strong>
                    <small>{m.tratamiento}</small>
                    <span className="inicio-miembro__area">{m.area}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="inicio-seccion__pie">
            <Boton a="#/quienes-somos" variante="secundario">Conoce al equipo <Icono nombre="flecha" tam={18} /></Boton>
          </Reveal>
        </div>
      </section>
    );
  }

  /* ---------- Avance de contenidos ---------- */
  function Contenidos() {
    const c = SITE.contenidos || {};
    const piezas = (c.piezas || []).slice(0, 3);
    if (!piezas.length) return null;
    return (
      <section className="seccion seccion--alt">
        <div className="contenedor">
          <TituloSeccion
            sobretitulo="Contenidos"
            titulo="Aprende y compartimos lo que sabemos"
            texto={c.intro}
          />
          <div className="rejilla rejilla--3">
            {piezas.map((p, i) => (
              <Reveal key={p.id} retraso={i * 120}>
                <a href="#/contenidos" className="tarjeta tarjeta--elevable inicio-pieza">
                  <span className="inicio-pieza__meta">
                    <span className="pildora">{p.tipo}</span>
                    {p.red && <span className="pildora pildora--acento">{p.red}</span>}
                  </span>
                  <h3>{p.titulo}</h3>
                  <p className="texto-suave">{p.resumen}</p>
                  <span className="inicio-pieza__pie">
                    <span>{formatearFecha(p.fecha)}</span>
                    <span className="inicio-pieza__leer">Leer más <Icono nombre="flecha" tam={16} /></span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal className="inicio-seccion__pie">
            <Boton a="#/contenidos" variante="secundario">Ver todos los contenidos</Boton>
          </Reveal>
        </div>
      </section>
    );
  }

  /* ---------- Preguntas frecuentes ---------- */
  function Preguntas() {
    const [abierta, setAbierta] = useState(0);
    return (
      <section className="seccion">
        <div className="contenedor inicio-faq">
          <div className="inicio-faq__intro">
            <TituloSeccion
              sobretitulo="Preguntas frecuentes"
              titulo="Lo que muchas personas se preguntan antes de venir"
              texto="Si te queda alguna duda, llámanos o escríbenos. Te respondemos sin compromiso."
            />
            <Boton a="#/contacto" variante="secundario">Contactar</Boton>
          </div>
          <div className="inicio-faq__lista">
            {PREGUNTAS.map((q, i) => {
              const esta = abierta === i;
              return (
                <Reveal key={q.p} retraso={i * 60} className={"inicio-faq__item" + (esta ? " inicio-faq__item--abierto" : "")}>
                  <h3 className="inicio-faq__pregunta">
                    <button
                      type="button"
                      id={"faq-b-" + i}
                      aria-expanded={esta}
                      aria-controls={"faq-p-" + i}
                      onClick={() => setAbierta(esta ? -1 : i)}
                    >
                      <span>{q.p}</span>
                      <span className="inicio-faq__mas" aria-hidden="true"></span>
                    </button>
                  </h3>
                  <div className="inicio-faq__respuesta" id={"faq-p-" + i} role="region" aria-labelledby={"faq-b-" + i}>
                    <div><p>{q.r}</p></div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  function Inicio() {
    return (
      <React.Fragment>
        <Portada />
        <Franja />
        <Areas />
        <Pasos />
        <Equipo />
        <Contenidos />
        <Preguntas />
        <BandaCita />
      </React.Fragment>
    );
  }

  window.Pages["inicio"] = Inicio;
})();
