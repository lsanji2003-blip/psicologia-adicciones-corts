(function () {
  const { useState, useRef } = React;
  const { Reveal, Boton, PageHero, TituloSeccion, BandaCita, Icono } = window.UI;
  const SITE = window.SITE;

  /* ---------- Contenido clínico ---------- */
  const TECNICAS = [
    {
      id: "funcional", nombre: "Análisis funcional de la conducta", icono: "objetivo",
      resumen: "Es el punto de partida de todo el tratamiento: entender qué función cumple el consumo, el juego o el uso de pantallas en la vida del adolescente y qué lo mantiene.",
      que: [
        "Reconstruimos con el adolescente, con ejemplos reales recientes, el esquema A-B-C: antecedentes (dónde estaba, con quién, qué sentía o pensaba), conducta (qué consumió, apostó o jugó y cuánto) y consecuencias (lo que ocurrió después, a corto y a largo plazo).",
        "Identificamos los desencadenantes externos (el grupo de amigos, el recreo, la noche del viernes, la paga o el dinero disponible, las notificaciones del móvil) e internos (aburrimiento, ansiedad, tristeza, miedo a quedarse fuera, pensamientos como «una partida más y lo dejo»).",
        "Distinguimos el refuerzo positivo (buscar diversión, emoción o pertenencia al grupo) del refuerzo negativo (aliviar malestar, nervios o abstinencia), porque piden estrategias distintas.",
        "Entre sesiones se usan autorregistros sencillos (a veces en el propio móvil) con momento, situación, emoción, intensidad del deseo y qué hizo, para que el análisis se apoye en datos y no solo en el recuerdo."
      ],
      para: "Para elegir las técnicas que de verdad se necesitan y fijar objetivos medibles. Dos adolescentes con el mismo problema pueden consumir o jugar por motivos muy distintos y, por tanto, necesitan tratamientos distintos.",
      ejemplo: "Un chico que apuesta en el móvil sobre todo cuando se aburre solo en casa no necesita lo mismo que otro que lo hace para sentirse parte del grupo de amigos: en el primer caso trabajaremos el aburrimiento y las rutinas; en el segundo, el rechazo asertivo y la presión del grupo."
    },
    {
      id: "motivacional", nombre: "Entrevista motivacional", icono: "chat",
      resumen: "Un estilo de conversación colaborativo (Miller y Rollnick) para ayudar al adolescente a resolver sus propias dudas sobre el cambio, sin presiones ni sermones.",
      que: [
        "Partimos de que sentir ambivalencia («quiero dejarlo, pero también me gusta») es normal, no una falta de compromiso. Muchos adolescentes llegan porque los han traído, y eso no impide trabajar.",
        "Usamos preguntas abiertas, afirmaciones, escucha reflexiva y resúmenes para que sea el propio adolescente quien exprese las razones para cambiar (el llamado discurso de cambio).",
        "Exploramos la balanza decisional (ventajas e inconvenientes de seguir igual y de cambiar) y la distancia entre lo que hace y lo que valora: sus amistades, el deporte, los estudios, la libertad en casa.",
        "Evitamos la confrontación y la discusión directa: cuando alguien se siente empujado, tiende a defender su postura. Trabajamos desde la autonomía y la compasión."
      ],
      para: "Para aumentar la motivación y la confianza en uno mismo antes y durante el tratamiento, y para reducir los abandonos. Es especialmente útil al inicio y con adolescentes que acuden presionados por su familia o por el centro educativo.",
      ejemplo: "En lugar de decir «tienes que dejar los porros», preguntamos: «¿Qué te gustaría que fuera distinto en tus estudios o con tus amigos dentro de un año?». La respuesta marca el rumbo de la intervención."
    },
    {
      id: "afrontamiento", nombre: "Entrenamiento en habilidades de afrontamiento", icono: "escudo",
      resumen: "Aprender y practicar, con ensayo real, las respuestas alternativas a las situaciones en las que antes aparecía el consumo, el juego o el uso excesivo de pantallas.",
      que: [
        "Rechazo asertivo: cómo decir que no a un porro, a un vapeador que pasa de mano en mano o a una invitación a apostar, con frases concretas, tono y lenguaje corporal, practicado mediante role-playing en consulta.",
        "Manejo del craving: reconocer el deseo intenso como una ola que sube, alcanza un pico y baja; estrategias de demora, distracción, respiración y recuerdo de los motivos personales.",
        "Resolución de problemas y regulación emocional: identificar el problema, generar alternativas, valorar consecuencias y elegir; tolerar emociones difíciles (un suspenso, una discusión, sentirse excluido) sin recurrir a la conducta problema.",
        "Habilidades de comunicación y de ocio: pedir ayuda, expresar emociones, y recuperar o construir actividades gratificantes sin consumo ni pantalla."
      ],
      para: "Para que, cuando aparezca una situación de riesgo, el adolescente tenga ya ensayada una respuesta distinta. Se aprende como cualquier otra destreza: modelado, ensayo, retroalimentación y tareas entre sesiones.",
      ejemplo: "Ensayamos en sesión qué responder cuando, en el recreo, un compañero ofrece su vapeador: qué decir, qué plan alternativo proponer y cómo actuar si insiste."
    },
    {
      id: "reestructuracion", nombre: "Reestructuración cognitiva", icono: "cerebro",
      resumen: "Detectar y poner a prueba los pensamientos y creencias que facilitan el consumo, el juego o el uso excesivo del móvil, para sustituirlos por otros más realistas.",
      que: [
        "Registramos pensamientos automáticos y creencias permisivas: «solo una calada no pasa nada», «lo hacen todos», «ya que he fallado, da igual».",
        "En las apuestas trabajamos sesgos concretos: la ilusión de control («sé de fútbol, puedo ganar»), la falacia del jugador («ya toca que salga») y la persecución de pérdidas («tengo que recuperar lo perdido»).",
        "Mediante el diálogo socrático contrastamos cada pensamiento con la evidencia y buscamos alternativas más útiles, no necesariamente «positivas».",
        "Revisamos también las expectativas sobre los efectos de la sustancia o del juego (que suelen ser mayores que los reales) y creencias sobre uno mismo («sin esto no encajo», «sin el móvil me pierdo todo»)."
      ],
      para: "Porque lo que pensamos en la situación de riesgo influye en lo que sentimos y hacemos. Cambiar la interpretación reduce el malestar y la probabilidad de caer en la conducta.",
      ejemplo: "Ante «ya he vuelto a apostar, así que lo he echado todo a perder», trabajamos la alternativa: «ha sido un desliz; puedo parar ahora y aprender de lo ocurrido»."
    },
    {
      id: "estimulos", nombre: "Control de estímulos y exposición con prevención de respuesta", icono: "pantalla",
      resumen: "Dos estrategias complementarias: reducir al principio la exposición a las señales de riesgo y, más adelante, aprender a tolerarlas sin responder con la conducta.",
      que: [
        "Control de estímulos: modificar el entorno para dificultar el acceso. Por ejemplo, dejar el móvil cargando fuera del dormitorio por la noche, desinstalar o bloquear aplicaciones de apuestas, quitar métodos de pago y tarjetas vinculadas, no guardar vapeadores en la mochila, o cambiar rutas y horarios. En apuestas, también la autoexclusión.",
        "Exposición a señales (cue exposure): de forma gradual, y siempre en un contexto seguro y pactado, nos exponemos a estímulos asociados a la conducta (la notificación de la app, el grupo de la partida, el olor, el lugar), construyendo una jerarquía de menor a mayor dificultad.",
        "Prevención de respuesta: durante la exposición no se realiza la conducta. El deseo sube y, sin consumo ni juego, baja por sí solo: el estímulo pierde fuerza como desencadenante (extinción de la respuesta condicionada).",
        "Registramos la intensidad del deseo antes, durante y después para que el adolescente vea la curva con sus propios datos."
      ],
      para: "Para proteger los primeros momentos del cambio (control de estímulos) y para reducir de forma duradera la reactividad a las señales (exposición). Los acuerdos sobre móviles y accesos se pactan con la familia. No sustituye a la valoración médica cuando hay riesgo por abstinencia física.",
      ejemplo: "Un adolescente con problemas de apuestas online instala bloqueadores, acuerda con sus padres que no tenga tarjetas asociadas y, semanas después, practica en consulta ver un anuncio de casa de apuestas sin abrir la app."
    },
    {
      id: "contingencias", nombre: "Manejo de contingencias", icono: "calendario",
      resumen: "Reforzar de manera planificada los logros objetivos (por ejemplo, semanas sin consumo verificadas) para que cambiar resulte más gratificante a corto plazo.",
      que: [
        "Pactamos con el adolescente y con su familia la conducta objetivo (asistir a las sesiones, mantener la abstinencia confirmada con controles, cumplir las tareas) y cómo se comprueba.",
        "Acordamos refuerzos significativos para él o ella, de bajo coste y no relacionados con el consumo: actividades, privilegios acordados con la familia, reconocimiento explícito de cada avance.",
        "La respuesta se aplica de forma inmediata y consistente; un incumplimiento no se castiga, simplemente no se refuerza, y se revisa el plan.",
        "Se reduce gradualmente el sistema de refuerzos a medida que aparecen los refuerzos naturales de la nueva vida."
      ],
      para: "Porque el consumo da recompensas inmediatas y el beneficio de dejarlo llega tarde. Es uno de los procedimientos con mayor respaldo empírico, sobre todo en estimulantes como la cocaína y en la implicación de adolescentes.",
      ejemplo: "En un programa con una familia, acordamos que cada semana con controles negativos se recupera un permiso de ocio pactado de antemano, como salir con los amigos un sábado más."
    },
    {
      id: "recaidas", nombre: "Prevención de recaídas (Marlatt y Gordon)", icono: "hoja",
      resumen: "Un modelo cognitivo-conductual para anticipar las situaciones de riesgo y aprender qué hacer si ocurre un desliz, sin que se convierta en una recaída completa.",
      que: [
        "Identificamos las situaciones de alto riesgo (emociones negativas, conflictos, presión del grupo, fines de semana y momentos de ocio) y la autoeficacia que siente ante cada una.",
        "Entrenamos respuestas de afrontamiento específicas y un plan de emergencia por escrito con los pasos a seguir si el deseo aumenta.",
        "Trabajamos el efecto de violación de la abstinencia: la culpa y el pensamiento de «todo o nada» tras un desliz son los que empujan a seguir. Un desliz es un hecho puntual del que se aprende, no un fracaso total.",
        "Revisamos las decisiones aparentemente irrelevantes que acercan al riesgo y fomentamos un estilo de vida equilibrado (sueño, deporte, relaciones, ocio) para reducir la necesidad de escape."
      ],
      para: "Porque la recaída forma parte del proceso en muchas personas. Preparar el terreno disminuye su probabilidad y su gravedad, y se trabaja desde la primera sesión, no solo al final.",
      ejemplo: "Tras un desliz en una fiesta de cumpleaños, el adolescente aplica su plan: avisa a su apoyo de confianza, analiza qué pasó con el esquema A-B-C y retoma el programa esa misma semana, sin esconderlo."
    },
    {
      id: "activacion", nombre: "Activación conductual", icono: "sol",
      resumen: "Recuperar actividades gratificantes y con sentido para que el consumo, el juego o la pantalla dejen de ser la principal fuente de refuerzo.",
      que: [
        "Registramos la semana actual (qué hace, con quién y cómo se siente) para ver cómo se ha ido estrechando su vida alrededor de la conducta problema.",
        "Elegimos con el adolescente actividades alineadas con sus valores (deporte, estudios, música, amistades, ocio) y las programamos de forma gradual y concreta, de menos a más exigentes.",
        "Revisamos el efecto de cada actividad sobre el ánimo para comprobar que actuar precede a sentirse mejor, no al revés.",
        "Se aplica con especial interés cuando hay síntomas depresivos o aislamiento asociados, que son frecuentes y aumentan el riesgo de recaída."
      ],
      para: "Para llenar el vacío que deja la conducta y reconstruir una vida con refuerzos naturales. Es un componente central cuando las partidas o el consumo ocupaban casi todo el tiempo libre.",
      ejemplo: "Un chico que dejó el fútbol por las partidas nocturnas programa dos entrenamientos semanales con un compañero y anota cómo cambia su ánimo esos días."
    },
    {
      id: "craft", nombre: "Intervención con padres y madres: CRAFT y pautas educativas", icono: "familia",
      resumen: "Es la otra mitad de la doble intervención. Entrenamiento para familiares (Community Reinforcement and Family Training, de Meyers y Smith), junto con pautas educativas y de comunicación, para ayudar a un hijo o hija que aún no ha pedido ayuda.",
      que: [
        "Aprendéis a analizar, con el mismo esquema funcional, cuándo y cómo se da el consumo, el juego o el uso de pantallas y cómo reacciona la familia (a veces, sin querer, lo mantiene). No se trata de buscar culpables.",
        "Entrenamos comunicación positiva y no confrontativa, con frases concretas y momentos adecuados para hablar (no durante una discusión ni bajo los efectos).",
        "Pautas educativas: normas claras y consensuadas, límites coherentes entre los adultos de casa, supervisión adaptada a la edad y acuerdos sobre móviles, dinero y salidas.",
        "Se refuerzan las conductas de no consumo y se evita proteger de las consecuencias naturales, siempre cuidando la seguridad de todos; se prepara el mejor momento para proponer el tratamiento y se atiende el bienestar de quien cuida."
      ],
      para: "Porque cuando el adolescente aún no quiere tratamiento, la familia puede influir. Los estudios muestran que CRAFT logra que más personas acepten iniciar un tratamiento que los enfoques basados en la confrontación o en esperar a que toque fondo.",
      ejemplo: "Una madre cambia el reproche diario por una frase pactada en sesión y programa tiempo de calidad con su hijo cuando no ha consumido, en lugar de discutir cuando llega tarde."
    }
  ];

  const PROGRAMAS = [
    {
      id: "pantallas", nombre: "Videojuegos y pantallas", icono: "pantalla",
      dirigido: "Adolescentes y jóvenes con uso problemático de videojuegos o del móvil: partidas que se alargan, sueño que se resiente, estudios y amistades que pasan a un segundo plano. Siempre con la familia.",
      formato: "Sesiones con el adolescente y sesiones con la familia para acordar normas, rutinas y alternativas de ocio.",
      duracion: "Entre 2 y 3 meses.", min: 8, max: 14,
      tecnicas: ["craft", "motivacional", "activacion", "contingencias"],
      nota: "Valoramos antes si el uso excesivo es la causa o la consecuencia de otro malestar (ansiedad, aislamiento, problemas escolares). Los estudios recientes (Paterna et al., 2026) asocian el uso problemático de videojuegos con un rendimiento académico algo menor en adolescentes; es una asociación pequeña, no una relación causal."
    },
    {
      id: "juego", nombre: "Apuestas y juego online", icono: "dado",
      dirigido: "Adolescentes y jóvenes con problemas con apuestas deportivas en el móvil, casinos online u otros juegos con dinero, y sus familias.",
      formato: "Individual y familiar. Se acuerdan medidas de control económico y de acceso (autoexclusión, bloqueo de apps, sin tarjetas asociadas) desde las primeras semanas.",
      duracion: "Entre 4 y 6 meses.", min: 16, max: 26,
      tecnicas: ["reestructuracion", "estimulos", "funcional", "recaidas"],
      nota: "La evidencia sobre intervenciones eficaces en apuestas deportivas todavía es limitada (Snaychuk et al., 2026): por eso medimos el progreso en cada fase y ajustamos el plan. Abordamos también las deudas y su impacto familiar y, cuando procede, derivamos a asesoramiento económico o jurídico."
    },
    {
      id: "redes", nombre: "Redes sociales", icono: "chat",
      dirigido: "Adolescentes con un posible uso problemático de redes sociales: no poder soltar el móvil, mirarlo de madrugada, malestar al compararse o miedo a quedarse fuera.",
      formato: "Sesiones con el adolescente y sesiones con la familia para acordar normas, rutinas de sueño y alternativas de ocio.",
      duracion: "Entre 2 y 3 meses.", min: 8, max: 14,
      tecnicas: ["motivacional", "reestructuracion", "afrontamiento", "craft"],
      nota: "Según el Observatorio Español de las Drogas y las Adicciones (2025), el 15,3 % de los estudiantes de 14 a 18 años presenta un posible uso problemático de las redes sociales. Un posible uso problemático no es un diagnóstico: lo valoramos caso a caso."
    },
    {
      id: "cannabis", nombre: "Cannabis", icono: "hoja",
      dirigido: "Adolescentes y jóvenes con uso frecuente de cannabis (fumado o vapeado, a menudo con amigos) que afecta a los estudios, el ánimo o las relaciones.",
      formato: "Individual, con participación de la familia. Es habitual una primera fase de motivación.",
      duracion: "Entre 3 y 4 meses.", min: 12, max: 18,
      tecnicas: ["motivacional", "contingencias", "afrontamiento", "activacion"],
      nota: "En menores de 16 años hace falta el consentimiento de madres, padres o tutores, y cuidamos la confidencialidad de lo que el adolescente comparte en consulta."
    },
    {
      id: "alcohol", nombre: "Alcohol", icono: "copa",
      dirigido: "Adolescentes y jóvenes con consumo intensivo de alcohol (botellón, fines de semana) y personas adultas con consumo de riesgo o dependencia.",
      formato: "Individual, con sesiones semanales al inicio y quincenales después. Sesiones con la familia, y posibilidad de apoyo grupal.",
      duracion: "Entre 4 y 6 meses de intervención, más seguimiento.", min: 16, max: 26,
      tecnicas: ["motivacional", "funcional", "afrontamiento", "recaidas"],
      nota: "Si hay dependencia física importante, la retirada del alcohol puede tener riesgos médicos: pedimos valoración médica previa y coordinamos el trabajo con el médico o la médica."
    },
    {
      id: "tabaco", nombre: "Vapeo y tabaco", icono: "reloj",
      dirigido: "Adolescentes y jóvenes que vapean o fuman y quieren dejarlo (en el recreo, con amigos o a escondidas), y también personas adultas.",
      formato: "Individual o grupal, con una fecha de abandono pactada y sesiones frecuentes alrededor de ella.",
      duracion: "Entre 6 y 10 semanas.", min: 6, max: 12,
      tecnicas: ["motivacional", "estimulos", "afrontamiento", "recaidas"],
      nota: "Si se valora un tratamiento farmacológico para la dependencia de la nicotina, lo prescribe un médico o médica y lo coordinamos con el tratamiento psicológico."
    },
    {
      id: "cocaina", nombre: "Otras sustancias", icono: "cerebro",
      dirigido: "Adolescentes y jóvenes con consumo de cocaína, drogas de síntesis, benzodiacepinas u otras sustancias, o con policonsumo.",
      formato: "Individual con sesiones frecuentes al principio, controles de consumo pactados y trabajo con la familia.",
      duracion: "Entre 5 y 8 meses de intervención, con seguimiento prolongado.", min: 20, max: 34,
      tecnicas: ["contingencias", "estimulos", "recaidas", "reestructuracion"],
      nota: "Cuando existe patología dual (por ejemplo ansiedad o depresión) o hay riesgo médico, coordinamos el tratamiento con psiquiatría o medicina de familia."
    },
    {
      id: "adultos", nombre: "Personas adultas", icono: "grupo",
      dirigido: "Personas adultas con un problema de adicción, con o sin sustancia (alcohol, cocaína, apuestas, tabaco u otras). Nuestro trabajo se centra en la adolescencia, pero también atendemos a adultos.",
      formato: "Individual, con posibilidad de sesiones con la pareja o la familia si la persona lo desea. Misma evaluación y plan a medida.",
      duracion: "Entre 4 y 8 meses, según el problema y los objetivos.", min: 16, max: 30,
      tecnicas: ["funcional", "motivacional", "afrontamiento", "recaidas"],
      nota: "Con dependencia de alcohol o cocaína, o con patología dual, pedimos valoración médica y coordinamos el tratamiento con medicina de familia o psiquiatría."
    }
  ];

  const FASES = [
    {
      id: "acogida", nombre: "Acogida y evaluación", sesiones: "1 a 3 sesiones",
      texto: "Empezamos con una primera valoración gratuita y sin compromiso. Escuchamos al adolescente y a su familia, resolvemos dudas y explicamos cómo trabajamos.",
      puntos: [
        "Entrevista clínica con el adolescente y con la familia: historia del consumo, del juego o del uso de pantallas, salud física y mental, situación escolar, familiar y social.",
        "Cuestionarios validados (por ejemplo AUDIT para alcohol o CAST para cannabis) y registros de conducta.",
        "Valoración de riesgos y de la necesidad de coordinación médica.",
        "Primer análisis funcional de las situaciones de consumo o de uso."
      ]
    },
    {
      id: "devolucion", nombre: "Devolución y plan", sesiones: "1 sesión",
      texto: "Os explicamos con claridad qué hemos entendido del caso y diseñamos el plan con el adolescente y con vosotros, no para vosotros.",
      puntos: [
        "Devolución de resultados en lenguaje sencillo, sin etiquetas innecesarias.",
        "Objetivos medibles y realistas (abstinencia o reducción de daños, según el caso y la decisión del adolescente).",
        "Técnicas elegidas, número orientativo de sesiones, normas de confidencialidad y consentimiento informado (en menores de 16 años, de los progenitores o tutores)."
      ]
    },
    {
      id: "intervencion", nombre: "Intervención", sesiones: "8 a 20 sesiones",
      texto: "Es la fase central: la doble intervención, con el adolescente y con sus padres. Aplicamos las técnicas del plan y revisamos de forma periódica si se avanza hacia los objetivos.",
      puntos: [
        "Sesiones semanales o quincenales con el adolescente, con tareas breves entre sesiones.",
        "Sesiones con madre, padre o tutores: pautas educativas, comunicación y CRAFT.",
        "Medición del progreso (registros, controles pactados, escalas) y ajuste del plan si hace falta."
      ]
    },
    {
      id: "prevencion", nombre: "Prevención de recaídas", sesiones: "4 a 6 sesiones",
      texto: "Consolidamos lo aprendido y nos preparamos para las situaciones difíciles que seguirán apareciendo en el instituto, en casa y con los amigos.",
      puntos: [
        "Mapa de situaciones de alto riesgo y plan de emergencia personalizado.",
        "Entrenamiento ante deslices: qué hacer en las primeras horas.",
        "Estilo de vida equilibrado y red de apoyo, también en la familia."
      ]
    },
    {
      id: "seguimiento", nombre: "Seguimiento", sesiones: "Sesiones espaciadas durante 12 meses",
      texto: "El alta no es un punto final. Mantenemos el contacto para detectar a tiempo cualquier señal de alarma.",
      puntos: [
        "Revisiones espaciadas (por ejemplo al mes, a los 3, 6 y 12 meses).",
        "Posibilidad de sesiones de refuerzo si surge una situación de riesgo.",
        "Puerta siempre abierta para volver sin juicios."
      ]
    }
  ];

  const MODALIDADES = [
    { id: "individual", nombre: "Individual", icono: "corazon", texto: "Sesiones de unos 50 minutos con el psicólogo o la psicóloga. Es la modalidad base: el plan se diseña a medida a partir del análisis funcional." },
    { id: "grupal", nombre: "Grupal", icono: "grupo", texto: "Grupos reducidos y estructurados de adolescentes o jóvenes para entrenar habilidades, compartir experiencias y sentirse acompañados. Complementan, no sustituyen, la atención individual cuando hace falta." },
    { id: "familiar", nombre: "Familiar", icono: "familia", texto: "Sesiones con madre, padre o tutores: psicoeducación, pautas educativas, comunicación y programas como CRAFT. Es la otra mitad de la doble intervención y es imprescindible en menores." },
    { id: "online", nombre: "Online", icono: "pantalla", texto: "Videollamada a través de una plataforma segura. Útil para seguimiento, para quien vive lejos o tiene horarios difíciles. No es la mejor opción en una crisis: en ese caso preferimos la atención presencial." }
  ];

  /* ---------- Página ---------- */
  function Tratamientos() {
    const [tecnicaId, setTecnicaId] = useState(TECNICAS[0].id);
    const [programaId, setProgramaId] = useState(PROGRAMAS[0].id);
    const [faseIdx, setFaseIdx] = useState(0);
    const tecnicasRef = useRef(null);

    const tecnica = TECNICAS.find((t) => t.id === tecnicaId) || TECNICAS[0];
    const programa = PROGRAMAS.find((p) => p.id === programaId) || PROGRAMAS[0];
    const fase = FASES[faseIdx];

    /* Navegación con flechas en grupos de pestañas (patrón WAI-ARIA) */
    function teclasPestanas(e, lista, actualId, cambiar, prefijo) {
      const i = lista.findIndex((x) => x.id === actualId);
      let n = -1;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (i + 1) % lista.length;
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = (i - 1 + lista.length) % lista.length;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = lista.length - 1;
      if (n < 0) return;
      e.preventDefault();
      cambiar(lista[n].id);
      const el = document.getElementById(prefijo + lista[n].id);
      if (el) el.focus();
    }

    function irATecnica(id) {
      setTecnicaId(id);
      if (tecnicasRef.current) tecnicasRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const avance = FASES.length > 1 ? faseIdx / (FASES.length - 1) : 0;

    return (
      <React.Fragment>
        <PageHero
          sobretitulo="Intervenciones y tratamientos"
          titulo="Terapia cognitivo-conductual, paso a paso"
          texto="Trabajamos con técnicas con apoyo científico, adaptadas a adolescentes, y con una doble intervención: con el adolescente y con sus padres. Os explicamos qué hacemos en cada momento y para qué, porque entender el tratamiento forma parte del tratamiento."
        >
          <div className="trat-hero__acciones">
            <Boton a="#/pedir-cita">Pedir cita</Boton>
            <Boton variante="fantasma" type="button" onClick={() => { if (tecnicasRef.current) tecnicasRef.current.scrollIntoView({ behavior: "smooth" }); }}>
              Ver las técnicas
              <Icono nombre="flecha" tam={18} />
            </Boton>
          </div>
        </PageHero>

        {/* Eje: TCC */}
        <section className="seccion">
          <div className="contenedor trat-eje">
            <Reveal className="trat-eje__texto">
              <p className="sobretitulo">El eje de todo</p>
              <h2>Por qué la terapia cognitivo-conductual</h2>
              <p>
                La terapia cognitivo-conductual (TCC) parte de una idea sencilla: lo que pensamos, lo que sentimos y lo que hacemos se influyen entre sí, y una conducta problemática (vapear en el recreo, apostar desde el móvil, alargar las partidas, fumar porros con amigos) se aprende y se mantiene por sus consecuencias. Si se aprende, se puede aprender otra cosa.
              </p>
              <p>
                Es el enfoque con más respaldo científico en el tratamiento de los problemas de consumo de sustancias y de las adicciones comportamentales. Se caracteriza por ser estructurada, orientada a objetivos medibles y activa: no basta con hablar en consulta, también se practica fuera de ella.
              </p>
              <p>
                <strong>Doble intervención.</strong> Trabajamos a la vez con el adolescente y con sus padres: con él o ella, las técnicas de la terapia; con la familia, pautas educativas, comunicación y CRAFT. Los padres no sois los culpables, sois una parte clave de la solución. También atendemos a personas adultas con el mismo método.
              </p>
              <p className="texto-suave">
                No prometemos curaciones ni plazos garantizados: cada persona tiene su ritmo. Lo que sí ofrecemos es un método claro, evaluable y respetuoso con las decisiones del adolescente y de su familia.
              </p>
            </Reveal>
            <Reveal retraso={120} className="trat-eje__modelo">
              <div className="trat-triangulo" aria-label="Relación entre pensamiento, emoción y conducta">
                <span className="trat-triangulo__nodo trat-triangulo__nodo--a">Pensamiento</span>
                <span className="trat-triangulo__nodo trat-triangulo__nodo--b">Emoción</span>
                <span className="trat-triangulo__nodo trat-triangulo__nodo--c">Conducta</span>
                <span className="trat-triangulo__centro">Tú</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Técnicas */}
        <section className="seccion seccion--alt" id="trat-tecnicas" ref={tecnicasRef}>
          <div className="contenedor">
            <TituloSeccion
              sobretitulo="Las técnicas"
              titulo="Qué hacemos y para qué"
              texto="Nueve herramientas que combinamos según el análisis funcional de cada adolescente, con ejemplos de situaciones reales. Elige una para ver en qué consiste."
            />
            <Reveal className="trat-tecnicas">
              <div className="trat-tecnicas__lista" role="tablist" aria-label="Técnicas de intervención" aria-orientation="vertical">
                {TECNICAS.map((t, i) => (
                  <button
                    key={t.id}
                    id={"tec-tab-" + t.id}
                    role="tab"
                    type="button"
                    aria-selected={t.id === tecnicaId}
                    aria-controls="tec-panel"
                    tabIndex={t.id === tecnicaId ? 0 : -1}
                    className={"trat-tab" + (t.id === tecnicaId ? " trat-tab--activa" : "")}
                    onClick={() => setTecnicaId(t.id)}
                    onKeyDown={(e) => teclasPestanas(e, TECNICAS, tecnicaId, setTecnicaId, "tec-tab-")}
                  >
                    <span className="trat-tab__num">{i + 1}</span>
                    <span className="trat-tab__nombre">{t.nombre}</span>
                  </button>
                ))}
              </div>
              <div className="trat-tecnicas__panel tarjeta" role="tabpanel" id="tec-panel" aria-labelledby={"tec-tab-" + tecnica.id} key={tecnica.id}>
                <div className="trat-panel__cabecera">
                  <div className="tarjeta__icono"><Icono nombre={tecnica.icono} tam={26} /></div>
                  <h3>{tecnica.nombre}</h3>
                </div>
                <p className="trat-panel__resumen">{tecnica.resumen}</p>
                <h4 className="trat-panel__sub">Qué se hace</h4>
                <ul className="lista-check">
                  {tecnica.que.map((q, i) => <li key={i}>{q}</li>)}
                </ul>
                <div className="trat-panel__duo">
                  <div className="trat-nota trat-nota--para">
                    <h4>Para qué sirve</h4>
                    <p>{tecnica.para}</p>
                  </div>
                  <div className="trat-nota trat-nota--ejemplo">
                    <h4>Un ejemplo</h4>
                    <p>{tecnica.ejemplo}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Programas */}
        <section className="seccion">
          <div className="contenedor">
            <TituloSeccion
              sobretitulo="Programas"
              titulo="Un programa para cada problema"
              texto="Programas pensados para adolescentes y jóvenes, empezando por lo digital, y uno para personas adultas. La duración es orientativa: se ajusta a la evolución y a los objetivos. Cada programa combina las técnicas que mejor funcionan para ese problema e incluye trabajo con la familia."
            />
            <Reveal>
              <div className="trat-programas__chips" role="tablist" aria-label="Programas por problema">
                {PROGRAMAS.map((p) => (
                  <button
                    key={p.id}
                    id={"prog-tab-" + p.id}
                    role="tab"
                    type="button"
                    aria-selected={p.id === programaId}
                    aria-controls="prog-panel"
                    tabIndex={p.id === programaId ? 0 : -1}
                    className={"trat-chip" + (p.id === programaId ? " trat-chip--activo" : "")}
                    onClick={() => setProgramaId(p.id)}
                    onKeyDown={(e) => teclasPestanas(e, PROGRAMAS, programaId, setProgramaId, "prog-tab-")}
                  >
                    <Icono nombre={p.icono} tam={18} />
                    {p.nombre}
                  </button>
                ))}
              </div>
            </Reveal>
            <div className="trat-programa tarjeta" role="tabpanel" id="prog-panel" aria-labelledby={"prog-tab-" + programa.id} key={programa.id}>
              <div className="trat-programa__rejilla">
                <div>
                  <h3>{programa.nombre}</h3>
                  <h4 className="trat-panel__sub">A quién va dirigido</h4>
                  <p>{programa.dirigido}</p>
                  <h4 className="trat-panel__sub">Formato</h4>
                  <p>{programa.formato}</p>
                </div>
                <div>
                  <h4 className="trat-panel__sub">Duración orientativa</h4>
                  <p>{programa.duracion}</p>
                  <div className="trat-duracion" style={{ "--ini": (programa.min / 36 * 100) + "%", "--fin": (programa.max / 36 * 100) + "%" }}>
                    <div className="trat-duracion__pista" aria-hidden="true">
                      <div className="trat-duracion__tramo"></div>
                    </div>
                    <p className="trat-duracion__leyenda">Aprox. {programa.min}–{programa.max} sesiones</p>
                  </div>
                  <h4 className="trat-panel__sub">Técnicas principales</h4>
                  <div className="pildoras">
                    {programa.tecnicas.map((id) => {
                      const t = TECNICAS.find((x) => x.id === id);
                      if (!t) return null;
                      return (
                        <button key={id} type="button" className="trat-pildora-boton" onClick={() => irATecnica(id)} title="Ver esta técnica">
                          {t.nombre}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <p className="trat-programa__nota"><Icono nombre="escudo" tam={20} /> <span>{programa.nota}</span></p>
            </div>
          </div>
        </section>

        {/* Itinerario */}
        <section className="seccion seccion--alt">
          <div className="contenedor">
            <TituloSeccion
              sobretitulo="Itinerario"
              titulo="Así avanza un tratamiento"
              texto="Cinco fases. Pulsa en cada una para ver qué ocurre. Los tiempos son orientativos."
            />
            <Reveal className="trat-linea" style={{ "--avance": avance }}>
              <div className="trat-linea__pista" aria-hidden="true">
                <div className="trat-linea__relleno"></div>
              </div>
              <ol className="trat-linea__pasos">
                {FASES.map((f, i) => (
                  <li key={f.id} className={"trat-paso" + (i < faseIdx ? " trat-paso--hecho" : "") + (i === faseIdx ? " trat-paso--activo" : "")}>
                    <button type="button" aria-expanded={i === faseIdx} aria-controls="fase-detalle" onClick={() => setFaseIdx(i)}>
                      <span className="trat-paso__punto">{i + 1}</span>
                      <span className="trat-paso__nombre">{f.nombre}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </Reveal>
            <div className="trat-fase tarjeta" id="fase-detalle" aria-live="polite" key={fase.id}>
              <div className="trat-fase__cabecera">
                <h3>{fase.nombre}</h3>
                <span className="pildora pildora--acento">{fase.sesiones}</span>
              </div>
              <p>{fase.texto}</p>
              <ul className="lista-check">
                {fase.puntos.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
              <div className="trat-fase__nav">
                <button type="button" className="btn btn--secundario btn--pequeno" disabled={faseIdx === 0} onClick={() => setFaseIdx(faseIdx - 1)}>Fase anterior</button>
                <button type="button" className="btn btn--primario btn--pequeno" disabled={faseIdx === FASES.length - 1} onClick={() => setFaseIdx(faseIdx + 1)}>Fase siguiente</button>
              </div>
            </div>
          </div>
        </section>

        {/* Modalidades */}
        <section className="seccion">
          <div className="contenedor">
            <TituloSeccion
              sobretitulo="Modalidades"
              titulo="Elegid cómo preferís trabajar"
              texto="Las modalidades se pueden combinar a lo largo del proceso."
            />
            <div className="rejilla rejilla--4">
              {MODALIDADES.map((m, i) => (
                <Reveal key={m.id} retraso={i * 90}>
                  <article className="tarjeta tarjeta--elevable trat-modalidad">
                    <div className="tarjeta__icono"><Icono nombre={m.icono} tam={26} /></div>
                    <h3>{m.nombre}</h3>
                    <p className="texto-suave">{m.texto}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal className="trat-aviso">
              <p>
                <strong>Si estáis en una situación de urgencia</strong> o tu hijo o hija (o tú) tiene pensamientos de hacerse daño, llama al 112. La línea 024 atiende la conducta suicida las 24 horas. Este centro no es un servicio de urgencias.
              </p>
            </Reveal>
          </div>
        </section>

        <BandaCita />
      </React.Fragment>
    );
  }

  window.Pages["tratamientos"] = Tratamientos;
})();
