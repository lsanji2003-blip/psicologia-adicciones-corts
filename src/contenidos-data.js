/* Plan de contenidos del gabinete (SIMULADO), basado en el plan de comunicación del Equipo C6.
   Objetivos, plataformas, medición y fuentes proceden del plan; las piezas son ejemplos
   de publicaciones coherentes con él.
   Cada pieza: { id, tipo, red, titulo, resumen, pilar, fecha, formato, cuerpo: [párrafos], etiquetas: [] } */
window.SITE.contenidos = {
  intro: "Hablamos de videojuegos, apuestas online y redes sociales con adolescentes y con sus madres y padres: con rigor, sin alarmismo y sin culpar a nadie.",

  objetivos: [
    {
      nombre: "Notoriedad",
      texto: "Aumentar el conocimiento del gabinete entre la población joven y adulta de nuestro entorno a través de Facebook, Instagram y TikTok.",
      medicion: "visitas a la web (Google Analytics) y nuevos seguidores en Instagram y TikTok (estadísticas de cada red)."
    },
    {
      nombre: "Repetición",
      texto: "Fortalecer la relación de confianza con las personas atendidas tras la primera cita, mostrando cercanía y cuidado.",
      medicion: "porcentaje de pacientes que reservan una segunda sesión, pacientes activos cada mes y abandonos tras la segunda sesión, según la agenda del gabinete."
    },
    {
      nombre: "Recomendación",
      texto: "Aumentar la visibilidad y la reputación del gabinete gracias a las recomendaciones voluntarias de las personas atendidas, facilitando que compartan su experiencia.",
      medicion: "número de valoraciones en Google y su puntuación media, y nuevos pacientes que llegan recomendados (preguntamos a cada persona cómo nos conoció)."
    }
  ],

  plataformas: [
    {
      nombre: "Web",
      publico: "Padres y profesionales a los que se deriva.",
      accion: "Pedir cita y descargar o leer alguna noticia o guía importante para entender mejor las adicciones.",
      sinergias: "Las redes sociales llevan escrita la página web y la ficha de Google lleva directamente a ella.",
      objetivo: "Captación de pacientes, credibilidad y posicionamiento en buscadores."
    },
    {
      nombre: "Instagram",
      publico: "Adolescentes y padres.",
      accion: "Interactuar con los reels y las noticias, escribirnos por mensaje si tienen dudas y apuntarse a los talleres gratuitos para padres.",
      sinergias: "En los reels está escrita la web; parte del contenido procede de Facebook.",
      objetivo: "Generar profesionalidad y confianza."
    },
    {
      nombre: "TikTok",
      publico: "Adolescentes.",
      accion: "Ver y sentirse identificados con situaciones de apuestas, videojuegos y redes sociales.",
      sinergias: "Los vídeos llevan escrita la web.",
      objetivo: "Prevención y promoción de buenos hábitos digitales."
    },
    {
      nombre: "Facebook",
      publico: "Padres.",
      accion: "Unirse a grupos donde se informa sobre talleres y se dan técnicas de comunicación parental.",
      sinergias: "Algunos vídeos se suben también a Instagram y llevan escrita la web.",
      objetivo: "Compartir experiencias entre padres para que vean que no son los únicos, y promover una buena parentalidad y educación digital."
    },
    {
      nombre: "Google para empresas",
      publico: "Padres.",
      accion: "Llamar a consulta, ver dónde está la clínica y leer o dejar reseñas.",
      sinergias: "Desde la ficha se llega a la página web y a la reserva de cita.",
      objetivo: "Captación y reputación de la clínica a través de las reseñas."
    }
  ],

  pilares: ["Apuestas online", "Videojuegos", "Redes sociales", "Familias", "El gabinete por dentro"],

  piezas: [
    {
      id: "c1", tipo: "Vídeo corto", red: "TikTok", pilar: "Apuestas online", fecha: "2026-11-03", formato: "Vídeo de 40 s",
      titulo: "«Solo es la Fantasy»: cuando apostar deja de ser un juego",
      resumen: "Sigues toda la Liga, juegas a la Fantasy con dinero y de vez en cuando apuestas en el móvil. ¿Dónde está el límite?",
      cuerpo: [
        "Apostar entre amigos puede parecer parte del fútbol, pero hay señales que conviene mirar: apostar más de lo que pensabas, intentar recuperar lo perdido o esconderlo en casa.",
        "La publicidad y lo que hacen los amigos normalizan el juego online. Que lo haga todo el mundo no significa que no te esté pasando factura.",
        "Si te suena, no estás haciendo «algo malo»: te está pasando algo que tiene solución. Escríbenos."
      ],
      etiquetas: ["#apuestas", "#fantasy", "#adolescentes"]
    },
    {
      id: "c2", tipo: "Reel", red: "Instagram", pilar: "Videojuegos", fecha: "2026-11-06", formato: "Reel de 45 s",
      titulo: "Videojuegos y notas: lo que dice la evidencia (sin alarmismo)",
      resumen: "Un metaanálisis de 2026 encuentra una relación pequeña entre uso problemático de videojuegos y rendimiento académico. Te contamos cómo leerlo.",
      cuerpo: [
        "En adolescentes, un mayor riesgo de uso problemático de videojuegos se asocia con un rendimiento académico algo menor, aunque el efecto es pequeño.",
        "Es una asociación: no demuestra que los videojuegos causen peores notas. Los autores señalan que la relación puede ir en ambos sentidos.",
        "Conclusión práctica: mejor observar y hablar que prohibir por miedo.",
        "Fuente: Paterna, Alcaraz-Ibáñez, Diaz-Carrasco y Griffiths (2026), Educational Research Review, 53, 100835."
      ],
      etiquetas: ["#videojuegos", "#evidencia", "#familias"]
    },
    {
      id: "c3", tipo: "Vídeo corto", red: "TikTok", pilar: "Redes sociales", fecha: "2026-11-10", formato: "Vídeo de 30 s",
      titulo: "¿Cuántas horas llevas hoy? Señales de que las redes te están ganando",
      resumen: "No es cuestión de minutos exactos, sino de lo que dejas de hacer por estar conectado.",
      cuerpo: [
        "Según el Observatorio Español de las Drogas y las Adicciones (2025), el 15,3 % de los estudiantes de 14 a 18 años presenta un posible uso problemático de las redes sociales.",
        "Señales: te cuesta parar, dejas de quedar o de hacer deporte, y te pones de mal humor cuando no puedes conectarte.",
        "Prueba una tarde sin notificaciones y observa cómo te sientes. Si te cuesta mucho, cuéntaselo a alguien."
      ],
      etiquetas: ["#redessociales", "#hábitosdigitales"]
    },
    {
      id: "c4", tipo: "Publicación", red: "Facebook", pilar: "Familias", fecha: "2026-11-13", formato: "Texto + imagen",
      titulo: "Un cargo de 1.000 € en la cuenta: qué hacer (y qué no) si sospechas de tu hijo",
      resumen: "Antes de la bronca, respira. Cómo abrir una conversación que no acabe en portazo.",
      cuerpo: [
        "Descubrir un gasto que nadie reconoce asusta y enfada. Es normal. Pero empezar con acusaciones suele cerrar la conversación.",
        "Describe lo que has visto sin juzgar, pregunta y escucha. «Mano dura» sin entender qué está pasando rara vez funciona.",
        "No es un fallo vuestro como padres, y no sois los únicos. Pedir ayuda profesional a tiempo es cuidar de toda la familia."
      ],
      etiquetas: ["#familias", "#apuestas", "#comunicación"]
    },
    {
      id: "c5", tipo: "Grupo", red: "Facebook", pilar: "Familias", fecha: "2026-11-17", formato: "Grupo privado",
      titulo: "Madres y padres en la era digital: no sois los únicos",
      resumen: "Un grupo para compartir experiencias, enterarse de los talleres y aprender técnicas de comunicación parental.",
      cuerpo: [
        "Cada semana compartimos una pauta práctica de comunicación con adolescentes y resolvemos dudas.",
        "Aquí se anuncian primero los talleres gratuitos para familias.",
        "Normas del grupo: respeto, confidencialidad y nada de juzgar la forma de educar de otras familias."
      ],
      etiquetas: ["#parentalidad", "#educacióndigital"]
    },
    {
      id: "c6", tipo: "Carrusel", red: "Instagram", pilar: "Familias", fecha: "2026-11-20", formato: "6 diapositivas",
      titulo: "Taller gratuito para padres: pantallas en casa sin guerras",
      resumen: "Sábado por la mañana en el gabinete. Plazas limitadas: escríbenos por mensaje para apuntarte.",
      cuerpo: [
        "Qué veremos: por qué se mantiene una conducta adictiva, cómo pactar normas y cómo acercarte a tu hijo o hija sin sermones.",
        "Lo imparte nuestro equipo de psicólogos especializados en adicciones en adolescentes.",
        "Toda la información y la reserva, en la web."
      ],
      etiquetas: ["#taller", "#familias", "#pantallas"]
    },
    {
      id: "c7", tipo: "Guía", red: "Web", pilar: "Familias", fecha: "2026-11-24", formato: "Lectura de 6 min",
      titulo: "¿Qué es una adicción y por qué se mantiene? Guía para familias",
      resumen: "Una explicación clara para entender qué le pasa a tu hijo o hija y qué medidas educativas ayudan.",
      cuerpo: [
        "Hablamos de adicción cuando hay pérdida de control, la conducta ocupa cada vez más espacio y continúa a pesar de sus consecuencias.",
        "Se mantiene porque a corto plazo alivia o entretiene, aunque a largo plazo traiga problemas. Entender esa función es el primer paso para cambiarla.",
        "También existen dependencias sin sustancia: videojuegos, apuestas, redes sociales o compras.",
        "Qué ayuda en casa: normas claras y pactadas, alternativas de ocio, coherencia entre los adultos y una comunicación que no humille."
      ],
      etiquetas: ["#guía", "#adicciones", "#familias"]
    },
    {
      id: "c8", tipo: "Artículo", red: "Web", pilar: "Apuestas online", fecha: "2026-11-27", formato: "Lectura de 4 min",
      titulo: "Apuestas deportivas en jóvenes: qué sabemos hoy",
      resumen: "Resumen divulgativo de una revisión reciente sobre apuestas deportivas, pensado para familias y profesionales que derivan.",
      cuerpo: [
        "Las apuestas deportivas online han crecido entre los jóvenes, sobre todo entre los chicos, impulsadas por la publicidad y por el grupo de iguales.",
        "La evidencia sobre qué intervenciones funcionan mejor en apuestas deportivas todavía es limitada, por lo que evaluamos cada caso con detalle.",
        "Fuente: Snaychuk, Vieira, Picco y Kim (2026). Beyond the bet: An updated scoping review on sports gambling. Canadian Journal of Addiction, 17(3), 6-32."
      ],
      etiquetas: ["#apuestasdeportivas", "#evidencia"]
    },
    {
      id: "c9", tipo: "Reel", red: "Instagram", pilar: "El gabinete por dentro", fecha: "2026-12-01", formato: "Reel de 30 s",
      titulo: "Así es una primera cita en Corts",
      resumen: "Qué pasa cuando venís por primera vez: escuchamos al adolescente y a la familia, sin juicios.",
      cuerpo: [
        "En la primera sesión recogemos la historia, resolvemos dudas y acordamos objetivos con el adolescente y con sus padres.",
        "Después de la primera cita seguimos en contacto: nos importa cómo estáis entre sesiones.",
        "Todo lo que se cuenta en consulta está protegido por el secreto profesional."
      ],
      etiquetas: ["#primeracita", "#psicología"]
    },
    {
      id: "c10", tipo: "Publicación", red: "Google para empresas", pilar: "El gabinete por dentro", fecha: "2026-12-04", formato: "Novedad en la ficha",
      titulo: "Dónde estamos, cómo pedir cita y cómo dejarnos tu opinión",
      resumen: "Si nuestra ayuda te ha servido, tu reseña puede animar a otra familia a dar el paso.",
      cuerpo: [
        "Desde la ficha de Google puedes llamarnos, ver cómo llegar y reservar cita en la web.",
        "Las reseñas son voluntarias y pueden ser anónimas: basta con contar cómo fue el trato."
      ],
      etiquetas: ["#reseñas", "#valència"]
    }
  ],

  fuentes: [
    "Observatorio Español de las Drogas y las Adicciones. (2025). Informe sobre adicciones comportamentales y otros trastornos adictivos 2025: Resumen ejecutivo. Ministerio de Sanidad.",
    "Paterna, A., Alcaraz-Ibáñez, M., Diaz-Carrasco, A. F., y Griffiths, M. D. (2026). Problematic videogame use and academic achievement: A systematic review and meta-analysis. Educational Research Review, 53, 100835.",
    "Snaychuk, L., Vieira, J., Picco, C., y Kim, H. S. (2026). Beyond the bet: An updated scoping review on sports gambling. Canadian Journal of Addiction, 17(3), 6-32."
  ]
};
