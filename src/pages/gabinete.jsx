(function () {
  const { useState, useEffect, useRef } = React;
  const { Reveal, Boton, PageHero, TituloSeccion, BandaCita, Icono } = window.UI;
  const SITE = window.SITE;

  const IMPLICA = [
    { icono: "escudo", titulo: "Centro sanitario privado", texto: "Somos un centro sanitario de psicología con profesionales colegiados que ejercen bajo su propia responsabilidad deontológica." },
    { icono: "calendario", titulo: "Sin listas de espera", texto: "Te damos cita en pocos días. Cuando se trata de adicciones, cada semana cuenta." },
    { icono: "libro", titulo: "Financiación por honorarios", texto: "La atención se financia con los honorarios de cada sesión, que te explicamos con claridad antes de empezar. Sin sorpresas." },
    { icono: "corazon", titulo: "Confidencialidad reforzada", texto: "Consultas privadas, historia clínica protegida y secreto profesional. Nadie sabrá que vienes si tú no quieres." }
  ];

  const OBJETIVOS = [
    { icono: "objetivo", titulo: "Evaluar con rigor", texto: "Conocer a fondo cada caso: qué hace el adolescente, cuánto, cuándo y para qué, y qué factores de riesgo lo mantienen." },
    { icono: "cerebro", titulo: "Tratar con eficacia", texto: "Aplicar intervenciones psicológicas con respaldo científico para reducir la conducta adictiva, adaptadas a cada persona." },
    { icono: "familia", titulo: "Mejorar la convivencia familiar", texto: "Dar a madres y padres estrategias educativas y de comunicación para recuperar el respeto y la confianza en casa." },
    { icono: "escudo", titulo: "Prevenir recaídas", texto: "Anticipar las situaciones de riesgo y entrenar respuestas para mantener el cambio en el tiempo." },
    { icono: "grupo", titulo: "Prevenir en la comunidad", texto: "Colaborar con institutos para ofrecer talleres a adolescentes y a sus familias antes de que haya un problema." },
    { icono: "microfono", titulo: "Divulgar sin alarmismo", texto: "Concienciar sobre las adicciones digitales con información fiable, sin culpar a las familias ni asustar." }
  ];

  /* Qué nos diferencia (fortalezas del análisis DAFO del gabinete) */
  const DIFERENCIAL = [
    { icono: "pantalla", titulo: "Especialización en adicciones digitales", texto: "Videojuegos, apuestas online y uso problemático de redes sociales: es lo que mejor conocemos y en lo que nos formamos." },
    { icono: "familia", titulo: "Doble intervención", texto: "Trabajamos con el adolescente y con sus padres a la vez. Cambiar la conducta y mejorar el clima de casa van de la mano." },
    { icono: "objetivo", titulo: "Evaluación dirigida", texto: "Exploramos factores de riesgo conocidos, como la impulsividad, la búsqueda de sensaciones y las distorsiones cognitivas, para ajustar el tratamiento." },
    { icono: "libro", titulo: "Enfoque basado en la evidencia", texto: "Elegimos las técnicas por su respaldo científico y revisamos contigo los avances con objetivos medibles." }
  ];

  /* Datos de contexto citados en el plan del gabinete (OEDA, 2025) */
  const CONTEXTO = [
    { cifra: "15,3 %", texto: "de los estudiantes de 14 a 18 años presenta un posible uso problemático de las redes sociales." },
    { cifra: "43,5 %", texto: "de 2.167 intervenciones con jóvenes se relacionó con un mal uso de la tecnología." }
  ];

  const TRIANGULO = [
    {
      id: "pensamiento", etiqueta: "Pensamiento", icono: "cerebro",
      titulo: "Lo que nos decimos",
      texto: "Las interpretaciones y creencias que tenemos sobre lo que ocurre influyen en cómo nos sentimos. En las adicciones aparecen ideas como «solo una vez no pasa nada» o «lo necesito para relajarme».",
      ejemplo: "«Hoy ha sido un día horrible, me merezco una copa.»"
    },
    {
      id: "emocion", etiqueta: "Emoción", icono: "corazon",
      titulo: "Lo que sentimos",
      texto: "Estrés, tristeza, aburrimiento, ansiedad o incluso alegría pueden convertirse en señales que activan el deseo de consumir o de jugar. Aprendemos a reconocerlas y a regularlas.",
      ejemplo: "Tensión en el cuerpo, cansancio y ganas de desconectar."
    },
    {
      id: "conducta", etiqueta: "Conducta", icono: "objetivo",
      titulo: "Lo que hacemos",
      texto: "La conducta se mantiene por sus consecuencias: alivio inmediato a corto plazo, problemas a largo plazo. Entrenamos alternativas que sí te acercan a lo que valoras.",
      ejemplo: "Servirse una copa. Alivio rápido, culpa después."
    }
  ];

  const BASES = [
    { titulo: "Análisis funcional", texto: "Entendemos qué precede y qué sigue a cada conducta para saber qué la mantiene." },
    { titulo: "Objetivos medibles", texto: "Pactamos metas concretas que podemos revisar sesión a sesión." },
    { titulo: "Participación activa", texto: "Trabajas con tareas entre sesiones: el cambio ocurre sobre todo en tu vida diaria." },
    { titulo: "Colaboración", texto: "Decidimos contigo el ritmo, las técnicas y los plazos." }
  ];

  const INSTALACIONES = [
    { icono: "sol", titulo: "Dos despachos de terapia", texto: "Dos despachos de 16 y 14 m², insonorizados, para sesiones individuales, de pareja y familiares." },
    { icono: "chat", titulo: "Recepción y sala de espera", texto: "Una sala de espera amplia (31 m²) junto al ventanal, con citas escalonadas para que no te cruces con otras personas." },
    { icono: "grupo", titulo: "Espacio para grupos y talleres", texto: "La sala de espera se transforma en sala de grupos para talleres con familias y sesiones formativas, también los sábados." },
    { icono: "ubicacion", titulo: "Accesibilidad", texto: "Local a pie de calle, sin escalones, con baño accesible. Cerca del metro y de varias líneas de autobús." },
    { icono: "pantalla", titulo: "Atención online", texto: "Sesiones por videollamada en una plataforma segura, con el mismo profesional y el mismo rigor." },
    { icono: "reloj", titulo: "Horarios amplios", texto: "Atendemos por la mañana y por la tarde para que puedas compaginarlo con tu trabajo o tus estudios." }
  ];

  /* ---------- Galería con visor ---------- */
  function Galeria() {
    const fotos = (SITE.fotos && SITE.fotos.gabinete) || [];
    const [indice, setIndice] = useState(null);
    const ultimo = useRef(null);
    const botonCerrar = useRef(null);
    const abierto = indice !== null;

    function ir(delta) {
      setIndice((i) => (i === null ? i : (i + delta + fotos.length) % fotos.length));
    }

    useEffect(() => {
      if (!abierto) return;
      const overflowPrevio = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      if (botonCerrar.current) botonCerrar.current.focus();

      function alTeclear(e) {
        if (e.key === "Escape") { e.preventDefault(); setIndice(null); }
        else if (e.key === "ArrowRight") { e.preventDefault(); ir(1); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); ir(-1); }
        else if (e.key === "Tab") {
          const caja = document.querySelector(".gabinete-visor");
          if (!caja) return;
          const foco = caja.querySelectorAll("button:not([disabled])");
          if (!foco.length) return;
          const primero = foco[0];
          const ultimoEl = foco[foco.length - 1];
          if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimoEl.focus(); }
          else if (!e.shiftKey && document.activeElement === ultimoEl) { e.preventDefault(); primero.focus(); }
        }
      }
      document.addEventListener("keydown", alTeclear);
      return () => {
        document.removeEventListener("keydown", alTeclear);
        document.body.style.overflow = overflowPrevio;
        if (ultimo.current && ultimo.current.focus) ultimo.current.focus();
      };
    }, [abierto]);

    if (!fotos.length) return null;
    const actual = abierto ? fotos[indice] : null;

    return (
      <section className="seccion">
        <div className="contenedor">
          <TituloSeccion
            sobretitulo="El gabinete"
            titulo="Un espacio pensado para que te sientas en calma"
            texto="90 m² a pie de calle, con mucha luz natural, madera y plantas. Las primeras imágenes recrean cómo quedará el gabinete amueblado; las demás muestran el local en su estado actual. Pulsa cualquiera para verla en grande."
          />
          <div className="gabinete-galeria">
            {fotos.map((f, i) => (
              <Reveal key={f.src} retraso={i * 80} className={"gabinete-galeria__celda gabinete-galeria__celda--" + (i + 1)}>
                <button
                  type="button"
                  className="gabinete-foto"
                  onClick={(e) => { ultimo.current = e.currentTarget; setIndice(i); }}
                  aria-label={"Ampliar foto: " + f.pie}
                >
                  <img src={f.src} alt={f.alt} loading="lazy" />
                  <span className="gabinete-foto__pie">
                    <span>{f.pie}</span>
                    <Icono nombre="flecha" tam={18} />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        {abierto && (
          <div className="gabinete-visor" role="dialog" aria-modal="true" aria-label="Visor de fotografías" onClick={() => setIndice(null)}>
            <button type="button" className="gabinete-visor__cerrar" ref={botonCerrar} onClick={() => setIndice(null)} aria-label="Cerrar visor">
              <Icono nombre="cerrar" tam={24} />
            </button>
            <button type="button" className="gabinete-visor__nav gabinete-visor__nav--ant" onClick={(e) => { e.stopPropagation(); ir(-1); }} aria-label="Foto anterior">
              <Icono nombre="flecha" tam={26} />
            </button>
            <figure className="gabinete-visor__figura" onClick={(e) => e.stopPropagation()}>
              <img key={actual.src} src={actual.src} alt={actual.alt} />
              <figcaption>
                <strong>{actual.pie}</strong>
                <span>{indice + 1} / {fotos.length}</span>
              </figcaption>
            </figure>
            <button type="button" className="gabinete-visor__nav gabinete-visor__nav--sig" onClick={(e) => { e.stopPropagation(); ir(1); }} aria-label="Foto siguiente">
              <Icono nombre="flecha" tam={26} />
            </button>
          </div>
        )}
      </section>
    );
  }

  /* ---------- Triángulo cognitivo-conductual ---------- */
  function Triangulo() {
    const [activo, setActivo] = useState("pensamiento");
    const item = TRIANGULO.find((t) => t.id === activo) || TRIANGULO[0];
    const pos = TRIANGULO.findIndex((t) => t.id === activo);

    return (
      <div className="gabinete-triangulo" style={{ "--pos": pos }}>
        <div className="gabinete-triangulo__botones" role="group" aria-label="Pensamiento, emoción y conducta">
          {TRIANGULO.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={activo === t.id}
              className={"gabinete-nodo" + (activo === t.id ? " gabinete-nodo--activo" : "")}
              onClick={() => setActivo(t.id)}
            >
              <span className="gabinete-nodo__icono"><Icono nombre={t.icono} tam={24} /></span>
              <span>{t.etiqueta}</span>
            </button>
          ))}
          <span className="gabinete-triangulo__indicador" aria-hidden="true"></span>
        </div>
        <div className="gabinete-triangulo__panel" aria-live="polite" key={item.id}>
          <h3>{item.titulo}</h3>
          <p>{item.texto}</p>
          <p className="gabinete-triangulo__ejemplo"><span>Ejemplo</span>{item.ejemplo}</p>
        </div>
      </div>
    );
  }

  /* ---------- Planos: estado actual / tras la reforma ---------- */
  function Planos() {
    const planos = SITE.fotos && SITE.fotos.planos;
    const [vista, setVista] = useState("reforma");
    if (!planos) return null;
    const plano = planos[vista];
    const opciones = [
      { id: "actual", etiqueta: "Plano actual" },
      { id: "reforma", etiqueta: "Tras la reforma" }
    ];

    return (
      <section className="seccion seccion--primario">
        <div className="contenedor">
          <TituloSeccion
            sobretitulo="El proyecto"
            titulo="Del plano actual a la clínica que queremos"
            texto={"Partimos de una oficina diáfana de " + planos.superficie + " con un despacho. Con una reforma ligera la convertimos en un centro con recepción, sala de espera, dos despachos y baño accesible."}
          />
          <div className="gabinete-planos">
            <Reveal className="gabinete-planos__visor">
              <div className="gabinete-planos__selector" role="group" aria-label="Elegir plano">
                {opciones.map((o) => (
                  <button key={o.id} type="button"
                    className={"gabinete-planos__opcion" + (vista === o.id ? " activo" : "")}
                    aria-pressed={vista === o.id}
                    onClick={() => setVista(o.id)}>
                    {o.etiqueta}
                  </button>
                ))}
              </div>
              <figure className="gabinete-planos__figura" key={vista}>
                <img src={plano.src} alt={plano.alt} loading="lazy" />
                <figcaption>{plano.pie}</figcaption>
              </figure>
            </Reveal>
            <Reveal retraso={120} className="tarjeta gabinete-planos__estancias">
              <h3>Distribución tras la reforma</h3>
              <ul>
                {planos.estancias.map((e) => (
                  <li key={e.nombre}>
                    <span>
                      <strong>{e.nombre}</strong>
                      <small className="texto-suave">{e.medidas}</small>
                    </span>
                    <span className="pildora">{e.m2}</span>
                  </li>
                ))}
              </ul>
              <p className="gabinete-planos__total">Superficie total: <strong>{planos.superficie}</strong></p>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  function Gabinete() {
    return (
      <React.Fragment>
        <PageHero
          sobretitulo="El centro"
          titulo="Un gabinete cálido, privado y cercano"
          texto="Un centro sanitario privado en València, especializado en adicciones digitales en adolescentes y en el acompañamiento a sus familias."
        />

        <section className="seccion">
          <div className="contenedor">
            <TituloSeccion
              sobretitulo="Nuestra especialización"
              titulo="Adolescentes, pantallas y familias"
              texto="Nos dedicamos a los problemas con los videojuegos, las apuestas online y las redes sociales en adolescentes, y trabajamos siempre también con sus madres y padres."
            />
            <div className="rejilla rejilla--4">
              {DIFERENCIAL.map((d, i) => (
                <Reveal key={d.titulo} retraso={i * 90} className="tarjeta tarjeta--elevable">
                  <div className="tarjeta__icono"><Icono nombre={d.icono} /></div>
                  <h3>{d.titulo}</h3>
                  <p className="texto-suave">{d.texto}</p>
                </Reveal>
              ))}
            </div>
            <div className="gabinete-contexto">
              {CONTEXTO.map((c, i) => (
                <Reveal key={c.cifra} retraso={i * 120} className="gabinete-contexto__dato">
                  <strong>{c.cifra}</strong>
                  <span>{c.texto}</span>
                </Reveal>
              ))}
              <p className="gabinete-contexto__fuente texto-suave">
                Fuente: Observatorio Español de las Drogas y las Adicciones (2025). Informe sobre adicciones comportamentales y otros trastornos adictivos 2025. Ministerio de Sanidad.
              </p>
            </div>
          </div>
        </section>

        <Galeria />

        <Planos />

        <section className="seccion seccion--alt">
          <div className="contenedor gabinete-centro">
            <div className="gabinete-centro__texto">
              <TituloSeccion
                sobretitulo="Tipo de centro"
                titulo="Un centro sanitario privado"
                texto="Esto es lo que implica para ti que seamos un centro sanitario de psicología de carácter privado."
              />
              <div className="gabinete-implica">
                {IMPLICA.map((c, i) => (
                  <Reveal key={c.titulo} retraso={i * 100} className="gabinete-implica__item">
                    <span className="gabinete-implica__icono"><Icono nombre={c.icono} tam={24} /></span>
                    <div>
                      <h3>{c.titulo}</h3>
                      <p className="texto-suave">{c.texto}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal retraso={150} className="gabinete-centro__imagen">
              <img src={SITE.fotos.calma} alt="Ambiente sereno con luz natural" loading="lazy" />
            </Reveal>
          </div>
        </section>

        <section className="seccion">
          <div className="contenedor">
            <TituloSeccion
              sobretitulo="Objetivos"
              titulo="Para qué existe este centro"
              texto="Seis compromisos que orientan lo que hacemos dentro y fuera de la consulta."
            />
            <ol className="gabinete-objetivos">
              {OBJETIVOS.map((o, i) => (
                <Reveal como="li" key={o.titulo} retraso={(i % 3) * 100} className="gabinete-objetivo">
                  <span className="gabinete-objetivo__num">{i + 1}</span>
                  <span className="gabinete-objetivo__icono"><Icono nombre={o.icono} tam={24} /></span>
                  <h3>{o.titulo}</h3>
                  <p>{o.texto}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="seccion seccion--primario">
          <div className="contenedor">
            <TituloSeccion
              sobretitulo="Nuestra orientación"
              titulo="Terapia cognitivo-conductual"
              texto="Es el enfoque psicológico con más evidencia científica en el tratamiento de las adicciones. Parte de una idea sencilla: lo que pensamos, sentimos y hacemos está conectado, y podemos intervenir en cada punto."
            />
            <div className="gabinete-cbt">
              <Reveal className="gabinete-cbt__interactivo">
                <p className="gabinete-cbt__guia">Pulsa en cada vértice para ver cómo se relacionan.</p>
                <Triangulo />
              </Reveal>
              <Reveal retraso={120} className="gabinete-cbt__porque">
                <h3>¿Por qué la elegimos?</h3>
                <p>
                  Porque es práctica, está orientada a objetivos y ofrece herramientas que te llevas contigo. No se queda en entender por qué ocurre: te ayuda a cambiar lo que quieres cambiar y a mantenerlo.
                </p>
                <h3>¿En qué se basa?</h3>
                <ul className="gabinete-bases">
                  {BASES.map((b) => (
                    <li key={b.titulo}>
                      <strong>{b.titulo}</strong>
                      <span>{b.texto}</span>
                    </li>
                  ))}
                </ul>
                <Boton a="#/tratamientos" variante="secundario">Ver las técnicas que usamos</Boton>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="seccion">
          <div className="contenedor">
            <TituloSeccion
              sobretitulo="Instalaciones y servicios"
              titulo="Todo lo que necesitas, cerca de ti"
              texto="Presencial o por videollamada, en horario de mañana y de tarde."
            />
            <div className="rejilla rejilla--3">
              {INSTALACIONES.map((s, i) => (
                <Reveal key={s.titulo} retraso={(i % 3) * 100}>
                  <div className="tarjeta tarjeta--elevable gabinete-servicio">
                    <span className="tarjeta__icono"><Icono nombre={s.icono} tam={26} /></span>
                    <h3>{s.titulo}</h3>
                    <p className="texto-suave">{s.texto}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="gabinete-ubicacion">
              <Icono nombre="ubicacion" tam={22} />
              <p>
                <strong>{SITE.contacto.direccion}</strong>, {SITE.contacto.cp} {SITE.contacto.ciudad}.{" "}
                <a href="#/contacto">Cómo llegar</a>
              </p>
            </Reveal>
          </div>
        </section>

        <BandaCita />
      </React.Fragment>
    );
  }

  window.Pages["gabinete"] = Gabinete;
})();
