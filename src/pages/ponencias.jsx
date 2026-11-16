(function () {
  const { useState } = React;
  const { Reveal, Boton, PageHero, TituloSeccion, BandaCita, Icono } = window.UI;
  const SITE = window.SITE;

  /* Agenda SIMULADA. Los ponentes se enlazan por id con SITE.equipo. */
  const ACTIVIDADES = [
    {
      id: "a1", tipo: "Taller para familias", fecha: "2026-11-28", hora: "10:30 – 12:30",
      titulo: "Pantallas en casa: pactar sin guerras",
      lugar: "Centro cívico de València (sala por confirmar)", ponente: "jesus-sierra",
      publico: "Madres, padres y tutores de niños y adolescentes", plazas: 25, ocupadas: 17,
      detalle: [
        "Cómo distinguir un uso intensivo de un uso problemático: pérdida de control, abandono de otras actividades y malestar al no poder conectarse.",
        "Cómo pactar horarios y normas con los hijos e hijas, dar ejemplo y ofrecer alternativas de ocio.",
        "Práctica en pequeños grupos: ensayo de conversaciones difíciles."
      ]
    },
    {
      id: "a2", tipo: "Taller en institutos", fecha: "2026-12-10", hora: "Horario lectivo (50 min)",
      titulo: "Cannabis: mitos, riesgos y decisiones",
      lugar: "Instituto de Educación Secundaria (València)", ponente: "jesus-sierra",
      publico: "Alumnado de 3.º y 4.º de ESO", plazas: 60, ocupadas: 60,
      detalle: [
        "Dinámica participativa sobre mitos frecuentes y efectos reales en el cerebro adolescente.",
        "Presión de grupo y habilidades para decir que no sin quedar fuera del grupo.",
        "Información sobre dónde pedir ayuda de forma confidencial."
      ]
    },
    {
      id: "a3", tipo: "Ponencia en jornadas", fecha: "2027-01-21", hora: "16:30 – 17:15",
      titulo: "Apuestas online en jóvenes adultos: detección e intervención",
      lugar: "Jornadas de salud mental (sede por confirmar)", ponente: "jose-siles",
      publico: "Profesionales sanitarios, sociales y de la educación", plazas: 120, ocupadas: 64,
      detalle: [
        "Características de las apuestas online: accesibilidad, rapidez, publicidad y sesgos cognitivos que las mantienen.",
        "Señales de alarma y cribado breve en consulta.",
        "Visión general de la intervención cognitivo-conductual y de las medidas de control de acceso."
      ]
    },
    {
      id: "a4", tipo: "Formación para profesionales", fecha: "2027-02-11", hora: "17:00 – 19:30",
      titulo: "Detección e intervención breve con adolescentes que consumen",
      lugar: "Aula de formación (València, por confirmar)", ponente: "laura-sanchez-beato",
      publico: "Orientadores, personal sanitario y de servicios sociales", plazas: 30, ocupadas: 21,
      detalle: [
        "Cómo abrir la conversación sobre consumo con un o una adolescente sin ponerle a la defensiva.",
        "Principios de la entrevista motivacional aplicados a intervenciones breves.",
        "Criterios para derivar y coordinarse con otros recursos."
      ]
    },
    {
      id: "a5", tipo: "Taller para familias", fecha: "2027-03-06", hora: "10:00 – 13:00",
      titulo: "CRAFT: cómo ayudar a un ser querido que consume",
      lugar: "Sala de talleres del centro, Av. de les Corts Valencianes", ponente: "laura-sampedro",
      publico: "Familiares y parejas de personas con problemas de adicción", plazas: 16, ocupadas: 9,
      detalle: [
        "Qué es el programa CRAFT y qué evidencia tiene frente a la confrontación.",
        "Análisis funcional de las situaciones de consumo desde la mirada de la familia.",
        "Comunicación positiva, cuidado de quien cuida y cómo proponer tratamiento."
      ]
    },
    {
      id: "a6", tipo: "Formación para profesionales", fecha: "2027-04-15", hora: "16:00 – 20:00",
      titulo: "Prevención de recaídas: del modelo de Marlatt a la práctica clínica",
      lugar: "Aula de formación (València, por confirmar)", ponente: "jose-siles",
      publico: "Psicólogos y psicólogas, personal de enfermería y trabajo social", plazas: 24, ocupadas: 11,
      detalle: [
        "Situaciones de alto riesgo, autoeficacia y efecto de violación de la abstinencia.",
        "Elaboración de un plan de prevención de recaídas con casos prácticos.",
        "Cómo integrar la prevención de recaídas desde el inicio del tratamiento."
      ]
    },
    {
      id: "a7", tipo: "Taller en institutos", fecha: "2027-05-13", hora: "Horario lectivo (50 min)",
      titulo: "Videojuegos y redes: jugar sin que el juego te juegue a ti",
      lugar: "Instituto de Educación Secundaria (València)", ponente: "jesus-sierra",
      publico: "Alumnado de 1.º y 2.º de ESO", plazas: 60, ocupadas: 25,
      detalle: [
        "Cómo funcionan los diseños que invitan a seguir jugando y por qué cuesta parar.",
        "Autorregistro del propio uso y alternativas de ocio.",
        "Cuándo y cómo pedir ayuda."
      ]
    },
    {
      id: "a8", tipo: "Taller para familias", fecha: "2027-06-12", hora: "10:30 – 12:30",
      titulo: "Hablar de alcohol con tu hijo o hija adolescente",
      lugar: "Sala de talleres del centro, Av. de les Corts Valencianes", ponente: "laura-sanchez-beato",
      publico: "Madres, padres y tutores de adolescentes de 12 a 17 años", plazas: 20, ocupadas: 6,
      detalle: [
        "Qué dicen los datos sobre el inicio del consumo de alcohol y por qué retrasarlo importa.",
        "Cómo hablar con claridad, sin sermones y sin tabúes.",
        "Normas familiares y qué hacer si ya hay consumo."
      ]
    }
  ];

  const DESTINATARIOS = [
    {
      id: "instituto", nombre: "Institutos y colegios", icono: "libro",
      texto: "Talleres para el alumnado adaptados a cada etapa, charlas para el profesorado y sesiones para las familias.",
      temas: ["Cannabis y alcohol en la adolescencia", "Videojuegos, redes y apuestas", "Presión de grupo y habilidades sociales"],
      formato: "Sesiones de 50 a 60 minutos, con dinámicas participativas."
    },
    {
      id: "familias", nombre: "Asociaciones de familias", icono: "familia",
      texto: "Charlas y talleres prácticos para AMPA, asociaciones vecinales y entidades de familias.",
      temas: ["Pautas de uso de pantallas", "Cómo detectar señales de alarma", "Comunicación familiar y límites"],
      formato: "De 1,5 a 3 horas, presencial u online."
    },
    {
      id: "empresas", nombre: "Empresas y entidades", icono: "grupo",
      texto: "Sesiones de sensibilización para responsables de equipos y servicios de prevención de riesgos laborales.",
      temas: ["Alcohol y otras sustancias en el trabajo", "Cómo acompañar sin señalar", "Recursos de ayuda disponibles"],
      formato: "Sesiones de 1 a 2 horas, adaptadas a la entidad."
    },
    {
      id: "profesionales", nombre: "Colegios y equipos profesionales", icono: "microfono",
      texto: "Formación especializada para profesionales sanitarios, sociales y educativos.",
      temas: ["Entrevista motivacional", "Prevención de recaídas", "Adicciones comportamentales"],
      formato: "Cursos y ponencias de 2 a 8 horas, con casos prácticos."
    }
  ];

  const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

  function partesFecha(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    if (!m) return null;
    const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return {
      dia: String(Number(m[3])),
      mes: MESES[Number(m[2]) - 1],
      anio: m[1],
      larga: d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    };
  }

  function buscarPonente(id) {
    return (SITE.equipo || []).find((p) => p.id === id) || null;
  }

  function Actividades() {
    const [filtro, setFiltro] = useState("todas");
    const [abierta, setAbierta] = useState(null);
    const [interes, setInteres] = useState({});

    const tipos = [];
    ACTIVIDADES.forEach((a) => { if (tipos.indexOf(a.tipo) === -1) tipos.push(a.tipo); });
    const visibles = ACTIVIDADES
      .filter((a) => filtro === "todas" || a.tipo === filtro)
      .slice()
      .sort((a, b) => (a.fecha < b.fecha ? -1 : 1));

    function alternarInteres(id) {
      setInteres((prev) => Object.assign({}, prev, { [id]: !prev[id] }));
    }

    return (
      <div>
        <div className="pon-filtros" role="group" aria-label="Filtrar por tipo de actividad">
          <button type="button" className={"pon-filtro" + (filtro === "todas" ? " pon-filtro--activo" : "")} aria-pressed={filtro === "todas"} onClick={() => setFiltro("todas")}>
            Todas <span className="pon-filtro__n">{ACTIVIDADES.length}</span>
          </button>
          {tipos.map((t) => (
            <button key={t} type="button" className={"pon-filtro" + (filtro === t ? " pon-filtro--activo" : "")} aria-pressed={filtro === t} onClick={() => setFiltro(t)}>
              {t} <span className="pon-filtro__n">{ACTIVIDADES.filter((a) => a.tipo === t).length}</span>
            </button>
          ))}
        </div>
        <p className="pon-contador texto-suave" aria-live="polite">
          {visibles.length === 1 ? "1 actividad" : visibles.length + " actividades"} entre noviembre de 2026 y junio de 2027
        </p>

        <ul className="pon-agenda">
          {visibles.map((a, i) => {
            const f = partesFecha(a.fecha);
            const p = buscarPonente(a.ponente);
            const marcada = !!interes[a.id];
            const libres = Math.max(0, a.plazas - a.ocupadas - (marcada ? 1 : 0));
            const ocupacion = Math.min(100, Math.round(((a.plazas - libres) / a.plazas) * 100));
            const completo = a.plazas - a.ocupadas <= 0;
            const desplegada = abierta === a.id;
            return (
              <li key={a.id}>
                <Reveal retraso={(i % 4) * 70}>
                  <article className={"pon-actividad tarjeta" + (desplegada ? " pon-actividad--abierta" : "")} style={{ "--ocupacion": ocupacion + "%" }}>
                    <div className="pon-fecha" aria-hidden="true">
                      <span className="pon-fecha__dia">{f ? f.dia : "·"}</span>
                      <span className="pon-fecha__mes">{f ? f.mes : ""}</span>
                      {f && <span className="pon-fecha__anio">{f.anio}</span>}
                    </div>
                    <div className="pon-actividad__cuerpo">
                      <span className="pildora pildora--acento">{a.tipo}</span>
                      <h3>{a.titulo}</h3>
                      <ul className="pon-meta">
                        {f && <li><Icono nombre="calendario" tam={18} /><span className="pon-fecha-larga">{f.larga}</span>{a.hora ? ", " + a.hora : ""}</li>}
                        <li><Icono nombre="ubicacion" tam={18} /><span>{a.lugar}</span></li>
                        <li><Icono nombre="grupo" tam={18} /><span>{a.publico}</span></li>
                      </ul>
                      {p && (
                        <div className="pon-ponente">
                          <img src={p.foto} alt={"Fotografía de " + p.nombre} loading="lazy" />
                          <span><strong>{p.nombre}</strong><br /><small>{p.tratamiento}</small></span>
                        </div>
                      )}
                      <div className="pon-plazas">
                        <div className="pon-plazas__texto">
                          <span>{completo && !marcada ? "Completo" : libres + " de " + a.plazas + " plazas libres"}</span>
                        </div>
                        <div className="pon-plazas__barra" aria-hidden="true"><div className="pon-plazas__relleno"></div></div>
                      </div>
                      <div className="pon-acciones">
                        <button
                          type="button"
                          className={"btn btn--pequeno " + (marcada ? "btn--primario" : "btn--secundario")}
                          aria-pressed={marcada}
                          disabled={completo && !marcada}
                          onClick={() => alternarInteres(a.id)}
                        >
                          {marcada ? "Plaza reservada (simulado)" : completo ? "Sin plazas" : "Me interesa"}
                        </button>
                        <button
                          type="button"
                          className="btn btn--fantasma btn--pequeno"
                          aria-expanded={desplegada}
                          aria-controls={"pon-detalle-" + a.id}
                          onClick={() => setAbierta(desplegada ? null : a.id)}
                        >
                          {desplegada ? "Ocultar contenido" : "Ver contenido"}
                        </button>
                      </div>
                      <div className="pon-detalle" id={"pon-detalle-" + a.id} hidden={!desplegada}>
                        <ul className="lista-check">
                          {a.detalle.map((d, k) => <li key={k}>{d}</li>)}
                        </ul>
                        {marcada && <p className="pon-simulado texto-suave">Reserva simulada: no se guarda ni se envía ningún dato.</p>}
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  function Ponencias() {
    const [destId, setDestId] = useState(DESTINATARIOS[0].id);
    const dest = DESTINATARIOS.find((d) => d.id === destId) || DESTINATARIOS[0];
    const fotoTaller = SITE.fotos && SITE.fotos.taller;

    return (
      <React.Fragment>
        <PageHero
          sobretitulo="Ponencias y talleres"
          titulo="Prevenir también es hablar en voz alta"
          texto="Además de la consulta, llevamos la psicología de las adicciones a institutos, familias, jornadas y equipos profesionales. Esta es la agenda de actividades de la temporada (simulada)."
        />

        <section className="seccion">
          <div className="contenedor">
            <TituloSeccion
              sobretitulo="Agenda"
              titulo="Próximas actividades"
              texto="Filtra por tipo de actividad. Puedes marcar «Me interesa» para simular la reserva de una plaza."
            />
            <Actividades />
          </div>
        </section>

        <section className="seccion seccion--alt">
          <div className="contenedor pon-llevanos">
            <Reveal className="pon-llevanos__texto">
              <p className="sobretitulo">Llévanos a tu centro</p>
              <h2>¿Quieres una ponencia o un taller en tu entorno?</h2>
              <p className="texto-suave">Adaptamos contenido, duración y formato a quien nos escucha. Elige tu caso y te mostramos qué solemos ofrecer.</p>
              <div className="pon-dest__chips" role="group" aria-label="Tipo de entidad">
                {DESTINATARIOS.map((d) => (
                  <button key={d.id} type="button" className={"pon-filtro" + (d.id === destId ? " pon-filtro--activo" : "")} aria-pressed={d.id === destId} onClick={() => setDestId(d.id)}>
                    <Icono nombre={d.icono} tam={18} />
                    {d.nombre}
                  </button>
                ))}
              </div>
              <div className="pon-dest__panel tarjeta" key={dest.id}>
                <p>{dest.texto}</p>
                <h4>Temas habituales</h4>
                <ul className="lista-check">
                  {dest.temas.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
                <p className="texto-suave"><strong>Formato:</strong> {dest.formato}</p>
              </div>
              <Boton a="#/contacto">Solicitar una ponencia</Boton>
            </Reveal>
            <Reveal retraso={120} className="pon-llevanos__foto">
              {fotoTaller && <img src={fotoTaller} alt="Espacio de taller y formación preparado para una actividad grupal" loading="lazy" />}
              <div className="pon-llevanos__sello" aria-hidden="true"><Icono nombre="microfono" tam={30} /></div>
            </Reveal>
          </div>
        </section>

        <BandaCita />
      </React.Fragment>
    );
  }

  window.Pages["ponencias-talleres"] = Ponencias;
})();
