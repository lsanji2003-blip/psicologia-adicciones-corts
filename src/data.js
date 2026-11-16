/* Datos globales del sitio (SIMULADOS con fines académicos).
   Cambia aquí cualquier dato y se actualiza en toda la web. */
(function () {
  var img = function (id, w) {
    return "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=" + (w || 1200) + "&q=75";
  };

  window.SITE = {
    nombre: "Psicología de adicciones Corts",
    nombreCorto: "Adicciones Corts",
    lema: "Recuperar tu vida empieza por pedir ayuda",
    tipoCentro: "Centro sanitario privado de psicología",
    orientacion: "Cognitivo-conductual",
    aviso: "Web simulada con fines académicos. El centro, los datos de contacto y los números de colegiación son ficticios.",

    rutas: [
      { id: "inicio", etiqueta: "Inicio" },
      { id: "quienes-somos", etiqueta: "Quiénes somos" },
      { id: "gabinete", etiqueta: "Gabinete" },
      { id: "tratamientos", etiqueta: "Intervenciones y tratamientos" },
      { id: "ponencias-talleres", etiqueta: "Ponencias y talleres" },
      { id: "contenidos", etiqueta: "Contenidos" },
      { id: "contacto", etiqueta: "Contacto" },
      { id: "pedir-cita", etiqueta: "Pedir cita", destacado: true }
    ],

    contacto: {
      direccion: "Avinguda de les Corts Valencianes, 58, bajo",
      cp: "46015",
      ciudad: "València",
      telefono: "960 000 000",
      whatsapp: "600 000 000",
      email: "contacto@psicologiaadiccionescorts.es",
      horario: [
        { dias: "Lunes a jueves", horas: "9:30 – 14:00 y 16:00 – 20:30" },
        { dias: "Viernes", horas: "9:30 – 15:00" },
        { dias: "Sábados", horas: "Talleres y grupos (consultar)" }
      ],
      transporte: [
        "Metro: Beniferri (líneas 1 y 2), a 4 minutos a pie",
        "EMT: líneas 62, 63 y 99",
        "Aparcamiento público en el Palacio de Congresos"
      ],
      mapaEmbed: "https://www.openstreetmap.org/export/embed.html?bbox=-0.4135%2C39.4905%2C-0.3935%2C39.5005&layer=mapnik&marker=39.4955%2C-0.4035",
      redes: [
        { red: "Instagram", usuario: "@adiccionescorts", url: "#/contenidos" },
        { red: "TikTok", usuario: "@adiccionescorts", url: "#/contenidos" },
        { red: "LinkedIn", usuario: "Psicología de adicciones Corts", url: "#/contenidos" }
      ]
    },

    equipo: [
      {
        id: "laura-sampedro",
        nombre: "Laura Sampedro Viso",
        tratamiento: "Psicóloga General Sanitaria",
        colegiada: "N.º col. CV-S0001",
        foto: "assets/equipo/laura-sampedro.jpg",
        area: "Infantojuvenil, intervención familiar y drogodependencias",
        resumen: "Especializada en población infantojuvenil e intervención familiar, con experiencia en drogodependencias. Acompaña a adolescentes y a sus familias cuando el consumo o las pantallas empiezan a ocupar demasiado espacio.",
        formacion: [
          "Grado en Psicología — Universidad de Córdoba",
          "Máster en Psicología General Sanitaria — Universidad Autónoma de Madrid",
          "Máster Universitario en Investigación, Tratamiento y Patologías Asociadas en Drogodependencias — Universitat de València",
          "Especialización en psicología infantojuvenil e intervención familiar"
        ],
        especialidades: ["Adolescentes", "Familias", "Drogodependencias", "Patología dual"]
      },
      {
        id: "laura-sanchez-beato",
        nombre: "Laura Sánchez-Beato Jiménez",
        tratamiento: "Psicóloga General Sanitaria",
        colegiada: "N.º col. CV-S0002",
        foto: "assets/equipo/laura-sanchez-beato.jpg",
        area: "Psicología infantojuvenil y adicciones",
        resumen: "Trabaja con niños, niñas, adolescentes y personas adultas con problemas de adicción con y sin sustancia. Su trabajo combina la evaluación rigurosa con un trato cercano y sin juicios.",
        formacion: [
          "Grado en Psicología — Universidad Pontificia Comillas",
          "Máster en Psicología General Sanitaria — Universidad de Navarra",
          "Máster Universitario en Psicología Infantojuvenil — UDIMA",
          "Máster en Drogodependencias y otras Adicciones — Universidad de Deusto"
        ],
        especialidades: ["Infantojuvenil", "Adicciones con sustancia", "Adicciones comportamentales", "Regulación emocional"]
      },
      {
        id: "jesus-sierra",
        nombre: "Jesús Alberto Sierra Guerrero",
        tratamiento: "Psicólogo General Sanitario",
        colegiada: "N.º col. CV-S0003",
        foto: "assets/equipo/jesus-sierra.jpg",
        area: "Prevención de conductas adictivas en niños y adolescentes",
        resumen: "Centrado en la prevención y la atención educativa de las conductas adictivas en la infancia y la adolescencia. Coordina los talleres para centros educativos y familias.",
        formacion: [
          "Grado en Psicología — Universidad Pontificia Comillas",
          "Máster en Psicología General Sanitaria — Universidad de Santiago de Compostela",
          "Máster Universitario en Atención Educativa y Prevención de Conductas Adictivas en Niños y Adolescentes — UNIR"
        ],
        especialidades: ["Prevención", "Ámbito educativo", "Videojuegos y pantallas", "Talleres"]
      },
      {
        id: "jose-siles",
        nombre: "José Siles Blanco",
        tratamiento: "Psicólogo General Sanitario",
        colegiada: "N.º col. CV-S0004",
        foto: "assets/equipo/jose-siles.jpg",
        area: "Tratamiento y rehabilitación de conductas adictivas",
        resumen: "Especialista en tratamiento, educación y rehabilitación de conductas adictivas en personas adultas: alcohol, cocaína, cannabis y juego. Trabaja la prevención de recaídas desde el primer día.",
        formacion: [
          "Grado en Psicología — Universidad de Málaga",
          "Máster en Psicología General Sanitaria — Universidad Loyola",
          "Máster de Formación Permanente en Prevención y Tratamiento de Conductas Adictivas — Universitat de València",
          "Máster Universitario en Educación y Rehabilitación de Conductas Adictivas — Universidad Católica de Valencia"
        ],
        especialidades: ["Adultos", "Alcohol y cocaína", "Juego patológico", "Prevención de recaídas"]
      }
    ],

    /* Fotos libres de Unsplash (enlace directo, sin descarga) */
    fotos: {
      hero: img("photo-1573497491208-6b1acb260507", 1400),
      /* Fotos reales del local (estado actual, antes de la reforma) */
      gabinete: [
        { src: "assets/gabinete/sala-2.jpg", alt: "Sala principal diáfana con suelo de madera y luces empotradas", pie: "Sala principal, hoy diáfana" },
        { src: "assets/gabinete/entrada.jpg", alt: "Puerta de entrada acristalada a pie de calle", pie: "Entrada a pie de calle" },
        { src: "assets/gabinete/ventanal.jpg", alt: "Ventanal de suelo a techo con vistas a la calle", pie: "Ventanal: luz natural todo el día" },
        { src: "assets/gabinete/sala-5.jpg", alt: "Vista de la sala hacia el ventanal", pie: "Futura sala de espera" },
        { src: "assets/gabinete/sala-7.jpg", alt: "Vista de la sala hacia la zona de despachos", pie: "Zona de recepción y despachos" },
        { src: "assets/gabinete/despacho-1.jpg", alt: "Despacho con ventana interior hacia la sala", pie: "Despacho con ventana interior" },
        { src: "assets/gabinete/despacho-3.jpg", alt: "Despacho interior con suelo de madera", pie: "Despacho" },
        { src: "assets/gabinete/aseo-1.jpg", alt: "Aseo amplio alicatado", pie: "Aseo (se adaptará como baño accesible)" },
        { src: "assets/gabinete/fachada-2.jpg", alt: "Fachada del local con escaparate acristalado", pie: "Fachada, antes de la nueva rotulación" }
      ],
      planos: {
        actual: { src: "assets/gabinete/plano-actual.jpg", alt: "Plano actual del local: una oficina diáfana, un despacho y un baño", pie: "Plano actual: oficina diáfana, un despacho y un baño" },
        reforma: { src: "assets/gabinete/plano-reforma.jpg", alt: "Plano en color de la clínica tras la reforma: recepción, sala de espera, dos despachos y baño accesible", pie: "Propuesta tras la reforma" },
        superficie: "90 m²",
        estancias: [
          { nombre: "Sala de espera", medidas: "6,00 × 5,20 m", m2: "31,20 m²" },
          { nombre: "Despacho 1", medidas: "4,00 × 4,00 m", m2: "16,00 m²" },
          { nombre: "Despacho 2", medidas: "3,50 × 4,00 m", m2: "14,00 m²" },
          { nombre: "Baño accesible", medidas: "3,40 × 3,00 m", m2: "10,20 m²" },
          { nombre: "Recepción", medidas: "3,00 × 2,80 m", m2: "8,40 m²" }
        ]
      },
      sesion: img("photo-1573497491208-6b1acb260507"),
      taller: img("photo-1616740795271-abd6ce1a5a5a"),
      calma: img("photo-1546387903-6d82d96ccca6")
    }
  };
})();
