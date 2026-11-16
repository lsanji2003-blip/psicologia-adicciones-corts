(function () {
  const { useState, useEffect, useRef } = React;
  const { Reveal, Boton, TituloSeccion, BandaCita, Icono } = window.UI;
  const HistoriaScroll = window.UI.HistoriaScroll;
  const SITE = window.SITE;

  /* ---------- Contenido propio de la página ---------- */
  const DATOS_CLAVE = [
    { icono: "escudo", titulo: "Centro sanitario privado", texto: "Profesionales colegiados con experiencia en adolescencia" },
    { icono: "cerebro", titulo: "Enfoque cognitivo-conductual", texto: "Basado en la evidencia y adaptado a adolescentes" },
    { icono: "calendario", titulo: "Primera valoración gratuita", texto: "Sin compromiso, para el adolescente y su familia" },
    { icono: "chat", titulo: "Presencial y online", texto: "También atendemos a personas adultas" }
  ];

  const AREAS = [
    {
      id: "pantallas", icono: "pantalla", titulo: "Videojuegos y pantallas",
      texto: "Cuando las partidas se alargan, el móvil se lleva las horas de sueño o los videojuegos pasan por delante de los estudios, los amigos y la convivencia en casa. Los estudios recientes (Paterna et al., 2026) asocian el uso problemático de videojuegos en adolescentes con un rendimiento académico algo menor; el efecto es pequeño y es una asociación, no una causa.",
      puntos: ["Distinguir entre uso, abuso y problema, sin alarmismo", "Pactos de uso, rutinas y alternativas de ocio", "Trabajo con el adolescente y con su familia"]
    },
    {
      id: "juego", icono: "dado", titulo: "Apuestas y juego online",
      texto: "Apuestas deportivas en el móvil, casinos online u otros juegos con dinero que generan deudas, mentiras o angustia. La evidencia sobre intervenciones eficaces en apuestas deportivas todavía es limitada (Snaychuk et al., 2026), por eso medimos la evolución y ajustamos el plan contigo.",
      puntos: ["Reestructuración de creencias sobre el azar", "Pautas para el control del dinero y de los accesos", "Acompañamiento a la familia"]
    },
    {
      id: "redes", icono: "chat", titulo: "Redes sociales",
      texto: "Cuando cuesta soltar el móvil, se mira de madrugada o las redes dejan al adolescente más nervioso, triste o comparándose con los demás. El Observatorio Español de las Drogas y las Adicciones (2025) indica que el 15,3 % de los estudiantes de 14 a 18 años presenta un posible uso problemático de las redes sociales.",
      puntos: ["Entender para qué usa las redes y qué le aportan", "Manejo de la ansiedad y del miedo a quedarse fuera", "Acuerdos familiares realistas sobre el móvil"]
    },
    {
      id: "cannabis", icono: "hoja", titulo: "Cannabis",
      texto: "Cuando fumar o vapear cannabis con amigos deja de ser ocasional y se nota en el ánimo, la motivación, las notas o las relaciones.",
      puntos: ["Análisis de para qué y cuándo consume", "Manejo del malestar y del deseo de consumir", "Atención específica a adolescentes y jóvenes, con la familia"]
    },
    {
      id: "alcohol", icono: "copa", titulo: "Alcohol",
      texto: "Consumo intensivo en botellones y fines de semana, o beber para desinhibirse o encajar en el grupo. También atendemos a personas adultas cuando beber empieza a pasar factura a su salud, su trabajo o su familia.",
      puntos: ["Evaluación del patrón de consumo", "Estrategias para reducir o dejar de beber", "Prevención de recaídas desde el primer día"]
    },
    {
      id: "tabaco", icono: "objetivo", titulo: "Vapeo y tabaco",
      texto: "Vapear en el recreo, con los amigos o a escondidas, y notar que cuesta parar. Dejarlo es posible con un plan personalizado y apoyo psicológico durante las primeras semanas.",
      puntos: ["Preparación y fijación de la fecha de abandono", "Técnicas para el craving y las situaciones de riesgo", "Seguimiento para consolidar el cambio"]
    },
    {
      id: "otras", icono: "cerebro", titulo: "Otras sustancias",
      texto: "Cocaína, drogas de síntesis, benzodiacepinas u otras sustancias: un espacio seguro para hablar de ello sin etiquetas, tanto si el consumo es de un adolescente o joven como de una persona adulta.",
      puntos: ["Evaluación individualizada y coordinación sanitaria si hace falta", "Control de estímulos y habilidades de afrontamiento", "Trabajo con las emociones que sostienen el consumo"]
    },
    {
      id: "familias", icono: "familia", titulo: "Familias",
      texto: "Si eres madre o padre de un adolescente con un problema de adicción, tú también necesitas orientación y apoyo. No tienes la culpa, y tu papel puede marcar la diferencia.",
      puntos: ["Pautas de comunicación y límites (enfoque CRAFT)", "Cómo motivar al cambio sin confrontar ni discutir", "Cuidar de ti mientras acompañas"]
    }
  ];

  const PASOS = [
    { n: "01", titulo: "Primera valoración", texto: "Una conversación gratuita y sin compromiso con la familia y, si quiere, con el adolescente, para escuchar la situación y resolver dudas." },
    { n: "02", titulo: "Evaluación y plan", texto: "Estudiamos el caso con calma y os devolvemos un plan con objetivos claros y medibles, pactados con el adolescente y con vosotros." },
    { n: "03", titulo: "Intervención con ambos", texto: "Sesiones con el adolescente y sesiones con madre, padre o tutores (pautas educativas, comunicación, CRAFT), con técnicas de eficacia probada." },
    { n: "04", titulo: "Prevención de recaídas", texto: "Preparamos las situaciones de riesgo y hacemos seguimiento para que lo logrado se mantenga en casa, en el instituto y con los amigos." }
  ];

  const PREGUNTAS = [
    {
      p: "¿Qué pasa en la primera sesión?",
      r: "Hablamos con calma de lo que os preocupa, os explicamos cómo trabajamos y, si encaja, acordamos juntos los siguientes pasos. Es gratuita, no os compromete a nada y nadie va a juzgar ni al adolescente ni a la familia."
    },
    {
      p: "Mi hijo o hija no quiere venir, ¿qué hago?",
      r: "Es muy habitual, y no hace falta que esté decidido a dejarlo para empezar. Podéis venir primero madre o padre: trabajamos pautas de comunicación basadas en la evidencia, como el enfoque CRAFT, que ayudan a mejorar la convivencia y a que el adolescente se acerque a pedir ayuda. Cuando viene, usamos la entrevista motivacional para trabajar sus dudas, sin sermones."
    },
    {
      p: "¿Lo que cuenta mi hijo o hija es confidencial? ¿Hace falta mi consentimiento?",
      r: "Estamos sujetos al secreto profesional y a la normativa de protección de datos. Con menores cuidamos la confianza del adolescente: lo que cuenta en sesión se trata con reserva, y acordamos con él o ella qué compartimos con la familia, salvo situaciones de riesgo para su salud o seguridad. En menores de 16 años hace falta el consentimiento de los progenitores o tutores para iniciar la atención."
    },
    {
      p: "¿Participamos los padres en las sesiones?",
      r: "Sí, de forma planificada. La intervención es doble: sesiones con el adolescente y sesiones con la familia, para acordar normas, mejorar la comunicación y aprender a acompañar. No siempre estaréis en la misma sesión, y no es para buscar culpables: la familia es una parte importante de la solución."
    },
    {
      p: "¿Cuánto dura un tratamiento?",
      r: "Depende de cada adolescente, de la sustancia o conducta y de los objetivos. Después de la evaluación os damos una estimación orientativa y la vamos revisando con vosotros. No hay plazos ni resultados garantizados: cada proceso es distinto."
    },
    {
      p: "¿Atendéis también a personas adultas?",
      r: "Sí. Nuestro trabajo se centra en adolescentes y sus familias, pero las personas adultas con un problema de adicción, con o sin sustancia, también pueden pedir cita. Hacemos la misma evaluación y un plan a su medida."
    },
    {
      p: "¿Hay sesiones online?",
      r: "Sí. Ofrecemos atención presencial en el centro y también por videollamada, según lo que mejor os encaje y lo que recomiende el profesional en cada caso."
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
              En Corts acompañamos a adolescentes y a sus familias, sin juicios y a su ritmo, cuando los videojuegos, las apuestas online, las redes sociales o el consumo de sustancias empiezan a ocupar demasiado espacio. Si eres madre o padre y no sabes por dónde empezar, escríbenos. También atendemos a personas adultas.
            </p>
            <div className="inicio-portada__botones inicio-ent" style={{ "--i": 3 }}>
              <Boton a="#/pedir-cita">Pedir cita <Icono nombre="flecha" tam={18} /></Boton>
              <Boton a="#/gabinete" variante="secundario">Conoce el gabinete</Boton>
            </div>
            <ul className="inicio-portada__avales inicio-ent" style={{ "--i": 4 }}>
              <li><Icono nombre="check" tam={18} /> Primera valoración gratuita</li>
              <li><Icono nombre="check" tam={18} /> Confidencialidad cuidada</li>
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
              <span><strong>Secreto profesional</strong><small>Su historia está protegida</small></span>
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
            titulo="¿En qué podemos ayudar a tu familia?"
            texto="Elige un área para saber cómo trabajamos con adolescentes y con sus familias. También atendemos a personas adultas. Si no encuentras tu caso, escríbenos: lo importante es dar el primer paso."
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
            texto="Sabréis en todo momento dónde estáis y hacia dónde vamos. Los ritmos los marcáis vosotros."
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
            titulo="Aprende con lo que compartimos"
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
              titulo="Lo que suelen preguntarnos las familias antes de venir"
              texto="Si os queda alguna duda, llamadnos o escribidnos. Os respondemos sin compromiso."
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
        {HistoriaScroll && <HistoriaScroll />}
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
