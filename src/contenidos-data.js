/* Plan de contenidos (SIMULADO). PROVISIONAL: se sustituirá por el plan real del Canva.
   Cada pieza: { id, tipo, red, titulo, resumen, pilar, fecha, formato, cuerpo: [párrafos], etiquetas: [] } */
window.SITE.contenidos = {
  intro: "Divulgamos sobre adicciones con rigor y sin estigma. Estas son algunas de las piezas de nuestro plan de contenidos.",
  pilares: ["Psicoeducación", "Mitos y realidades", "Familias", "Prevención", "El centro por dentro"],
  piezas: [
    {
      id: "c1", tipo: "Carrusel", red: "Instagram", pilar: "Mitos y realidades", fecha: "2026-11-03", formato: "5 diapositivas",
      titulo: "5 mitos sobre las adicciones que hacen daño",
      resumen: "«Es cuestión de fuerza de voluntad» y otras frases que alejan a las personas del tratamiento.",
      cuerpo: [
        "Mito 1: «Quien quiere, puede dejarlo». La adicción modifica los circuitos de recompensa y autocontrol; la voluntad sola no basta.",
        "Mito 2: «Hay que tocar fondo para pedir ayuda». Cuanto antes se interviene, mejor pronóstico.",
        "Mito 3: «Una recaída significa que el tratamiento ha fracasado». La recaída forma parte del proceso y se trabaja en terapia."
      ],
      etiquetas: ["#adicciones", "#saludmental", "#sinestigma"]
    },
    {
      id: "c2", tipo: "Vídeo corto", red: "TikTok", pilar: "Psicoeducación", fecha: "2026-11-06", formato: "Reel de 45 s",
      titulo: "¿Qué es el craving y cuánto dura?",
      resumen: "El deseo intenso de consumir sube, llega a un pico y baja. Te enseñamos a «surfear la ola».",
      cuerpo: [
        "El craving es un deseo intenso y pasajero. Suele durar entre 15 y 30 minutos.",
        "Técnica: retrasa, distráete, respira y recuerda tus motivos. La ola siempre termina bajando."
      ],
      etiquetas: ["#craving", "#terapiacognitivoconductual"]
    },
    {
      id: "c3", tipo: "Artículo", red: "Blog", pilar: "Familias", fecha: "2026-11-10", formato: "Lectura de 4 min",
      titulo: "Mi hijo no suelta el móvil: ¿uso, abuso o adicción?",
      resumen: "Señales de alarma y pautas prácticas para madres y padres.",
      cuerpo: [
        "No todo uso intensivo es una adicción. Nos fijamos en la pérdida de control, el abandono de otras actividades y el malestar al no poder conectarse.",
        "Pactar horarios, dar ejemplo y ofrecer alternativas de ocio funciona mejor que prohibir sin explicar."
      ],
      etiquetas: ["#familias", "#pantallas", "#adolescencia"]
    },
    {
      id: "c4", tipo: "Infografía", red: "Instagram", pilar: "Prevención", fecha: "2026-11-13", formato: "Imagen única",
      titulo: "Apuestas deportivas: lo que la publicidad no te cuenta",
      resumen: "Sesgos cognitivos que mantienen el juego: ilusión de control y falacia del jugador.",
      cuerpo: [
        "La ilusión de control nos hace creer que «sabiendo de fútbol» se gana. La casa siempre tiene ventaja matemática.",
        "Si juegas para recuperar lo perdido, es momento de pedir ayuda."
      ],
      etiquetas: ["#juego", "#apuestas", "#prevención"]
    },
    {
      id: "c5", tipo: "Vídeo corto", red: "Instagram", pilar: "El centro por dentro", fecha: "2026-11-17", formato: "Reel de 30 s",
      titulo: "Así es una primera sesión en Corts",
      resumen: "Qué pasa cuando cruzas la puerta por primera vez: sin juicios y a tu ritmo.",
      cuerpo: [
        "En la primera sesión escuchamos tu historia, resolvemos dudas y acordamos objetivos contigo.",
        "Todo lo que cuentas está protegido por el secreto profesional."
      ],
      etiquetas: ["#primeracita", "#psicología"]
    },
    {
      id: "c6", tipo: "Publicación", red: "LinkedIn", pilar: "Prevención", fecha: "2026-11-20", formato: "Texto + imagen",
      titulo: "Alcohol y entorno laboral: cómo detectar y acompañar",
      resumen: "Claves para responsables de equipos y servicios de prevención.",
      cuerpo: [
        "El consumo problemático de alcohol afecta al rendimiento, la seguridad y el clima laboral.",
        "Acompañar sin señalar y facilitar el acceso a tratamiento es la mejor política de empresa."
      ],
      etiquetas: ["#alcohol", "#empresa", "#saludlaboral"]
    }
  ]
};
