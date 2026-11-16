(function () {
  const { useState, useEffect, useRef } = React;
  const { Reveal, Boton, PageHero, Icono } = window.UI;
  const SITE = window.SITE;

  const PASOS = [
    { nombre: "Motivo", titulo: "Cuéntanos qué te trae por aquí" },
    { nombre: "Profesional", titulo: "Elige con quién y cómo" },
    { nombre: "Día y hora", titulo: "Elige el día y la hora" },
    { nombre: "Tus datos", titulo: "Tus datos de contacto" }
  ];

  const PARA_QUIEN = [
    { id: "yo", titulo: "Para mí", texto: "Quiero consultar por una situación mía.", icono: "corazon" },
    { id: "familiar", titulo: "Para un familiar adulto", texto: "Me preocupa una persona cercana.", icono: "familia" },
    { id: "menor", titulo: "Para mi hijo o hija menor", texto: "Es una consulta sobre un menor a mi cargo.", icono: "grupo" }
  ];

  const MOTIVOS = [
    { id: "alcohol", etiqueta: "Alcohol", icono: "copa" },
    { id: "cannabis", etiqueta: "Cannabis", icono: "hoja" },
    { id: "cocaina", etiqueta: "Cocaína y otras sustancias", icono: "cerebro" },
    { id: "juego", etiqueta: "Juego y apuestas", icono: "dado" },
    { id: "pantallas", etiqueta: "Videojuegos y pantallas", icono: "pantalla" },
    { id: "tabaco", etiqueta: "Tabaco y vapeo", icono: "sol" },
    { id: "familias", etiqueta: "Orientación para familias", icono: "familia" },
    { id: "nose", etiqueta: "Aún no lo tengo claro", icono: "chat" }
  ];

  const MODALIDADES = [
    { id: "presencial", titulo: "Presencial", texto: "En la consulta de València.", icono: "ubicacion" },
    { id: "online", titulo: "Online", texto: "Videollamada segura desde donde estés.", icono: "pantalla" }
  ];

  const CONTACTO_PREF = [
    { id: "telefono", etiqueta: "Llamada telefónica" },
    { id: "whatsapp", etiqueta: "WhatsApp" },
    { id: "correo", etiqueta: "Correo electrónico" }
  ];

  const MAX_DETALLE = 400;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const TEL_RE = /^(\+34)?[6-9]\d{8}$/;

  const VACIO = {
    paraQuien: "", motivo: "", edad: "", detalle: "",
    profesional: "", modalidad: "",
    fecha: "", hora: "",
    nombre: "", telefono: "", email: "", contacto: "telefono", privacidad: false
  };

  /* ---------- Fechas y horario (todo calculado a partir de la fecha actual) ---------- */
  /* Horario de SITE.contacto.horario: lunes a jueves mañana y tarde, viernes solo mañana.
     Sesiones de 50 minutos que terminan dentro del horario del centro. */
  const HORAS_MANANA = ["9:30", "10:30", "11:30", "12:30"];
  const HORAS_TARDE = ["16:00", "17:00", "18:00", "19:00"];
  const HORAS_VIERNES = ["9:30", "10:30", "11:30", "12:30", "13:30"];

  /* dow: 0 = lunes ... 6 = domingo */
  function franjasDelDia(dow) {
    if (dow <= 3) return [{ nombre: "Mañana", horas: HORAS_MANANA }, { nombre: "Tarde", horas: HORAS_TARDE }];
    if (dow === 4) return [{ nombre: "Mañana", horas: HORAS_VIERNES }];
    return [];
  }

  function aIso(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function deIso(s) {
    const p = s.split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  function mayuscula(t) { return t.charAt(0).toUpperCase() + t.slice(1); }

  function formatoLargo(d) {
    return mayuscula(d.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
  }

  /* Disponibilidad simulada y determinista: algunas franjas figuran como completas. */
  function ocupada(d, hora) {
    const h = parseInt(hora, 10) * 2 + (hora.indexOf(":30") > 0 ? 1 : 0);
    return (d.getDate() * 5 + d.getMonth() * 3 + h) % 4 === 0;
  }

  /* Semanas (lunes a domingo) que cubren desde hoy hasta dentro de 21 días.
     Seleccionables: de mañana a hoy + 21 días, solo de lunes a viernes. */
  function construirSemanas() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const minimo = new Date(hoy);
    minimo.setDate(minimo.getDate() + 1);
    const maximo = new Date(hoy);
    maximo.setDate(maximo.getDate() + 21);
    const cursor = new Date(hoy);
    cursor.setDate(cursor.getDate() - ((hoy.getDay() + 6) % 7));
    const semanas = [];
    while (cursor <= maximo) {
      const semana = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(cursor);
        semana.push({
          fecha: d,
          iso: aIso(d),
          dow: i,
          esHoy: d.getTime() === hoy.getTime(),
          disponible: i < 5 && d >= minimo && d <= maximo
        });
        cursor.setDate(cursor.getDate() + 1);
      }
      semanas.push(semana);
    }
    return semanas;
  }

  /* ---------- Validación por paso ---------- */
  function validarPaso(p, d) {
    const e = {};
    if (p === 0) {
      if (!d.paraQuien) e.paraQuien = "Elige para quién es la consulta.";
      if (!d.motivo) e.motivo = "Elige el motivo principal (si no lo tienes claro, marca la última opción).";
      if (d.paraQuien === "menor") {
        const n = Number(d.edad);
        if (!String(d.edad).trim()) e.edad = "Indica la edad del menor.";
        else if (!Number.isInteger(n) || n < 6 || n > 17) e.edad = "Indica una edad entre 6 y 17 años.";
      }
    }
    if (p === 1) {
      if (!d.profesional) e.profesional = "Elige un profesional o marca «Sin preferencia».";
      if (!d.modalidad) e.modalidad = "Elige si prefieres presencial u online.";
    }
    if (p === 2) {
      if (!d.fecha) e.fecha = "Elige un día en el calendario.";
      else if (!d.hora) e.hora = "Elige una hora para ese día.";
    }
    if (p === 3) {
      if (d.nombre.trim().length < 2) e.nombre = "Escribe tu nombre (al menos 2 caracteres).";
      const tel = d.telefono.replace(/[\s.-]/g, "");
      if (!tel) e.telefono = "Escribe un teléfono de contacto.";
      else if (!TEL_RE.test(tel)) e.telefono = "Revisa el teléfono: deben ser 9 cifras, por ejemplo 612 345 678.";
      if (!d.email.trim()) e.email = "Escribe tu correo electrónico.";
      else if (!EMAIL_RE.test(d.email.trim())) e.email = "Revisa el correo: debe tener un formato como nombre@dominio.es.";
      if (!d.privacidad) e.privacidad = "Necesitamos que aceptes el tratamiento de datos para continuar.";
    }
    return e;
  }

  function ErrorCampo({ id, children }) {
    return <p className="campo__error cita-error" id={id} role="alert">{children}</p>;
  }

  /* ---------- Opción de radio con aspecto de tarjeta ---------- */
  function Opcion({ name, value, actual, onChange, className, children }) {
    const marcada = actual === value;
    return (
      <label className={"cita-opcion " + (className || "") + (marcada ? " cita-opcion--marcada" : "")}>
        <input type="radio" className="cita-opcion__input" name={name} value={value}
          checked={marcada} onChange={function () { onChange(value); }} />
        <span className="cita-opcion__cuerpo">{children}</span>
      </label>
    );
  }

  /* ---------- Paso 1 ---------- */
  function PasoMotivo({ d, errores, cambiar }) {
    return (
      <div className="cita-campos">
        <fieldset className="cita-grupo" id="cita-paraQuien" tabIndex={-1}
          aria-describedby={errores.paraQuien ? "cita-error-paraQuien" : undefined}>
          <legend>¿Para quién es la consulta?</legend>
          <div className="cita-opciones cita-opciones--3">
            {PARA_QUIEN.map(function (o) {
              return (
                <Opcion key={o.id} name="cita-paraQuien" value={o.id} actual={d.paraQuien}
                  onChange={function (v) { cambiar("paraQuien", v); }}>
                  <Icono nombre={o.icono} tam={26} className="cita-opcion__icono" />
                  <strong>{o.titulo}</strong>
                  <small>{o.texto}</small>
                </Opcion>
              );
            })}
          </div>
          {errores.paraQuien && <ErrorCampo id="cita-error-paraQuien">{errores.paraQuien}</ErrorCampo>}
        </fieldset>

        {d.paraQuien === "menor" && (
          <div className={"campo cita-edad" + (errores.edad ? " campo--error" : "")}>
            <label htmlFor="cita-edad">Edad del menor</label>
            <input id="cita-edad" type="number" inputMode="numeric" min="6" max="17" value={d.edad}
              onChange={function (e) { cambiar("edad", e.target.value); }}
              aria-invalid={errores.edad ? "true" : "false"}
              aria-describedby={errores.edad ? "cita-error-edad" : undefined} />
            {errores.edad && <ErrorCampo id="cita-error-edad">{errores.edad}</ErrorCampo>}
          </div>
        )}

        <fieldset className="cita-grupo" id="cita-motivo" tabIndex={-1}
          aria-describedby={errores.motivo ? "cita-error-motivo" : undefined}>
          <legend>Motivo principal de la consulta</legend>
          <div className="cita-opciones cita-opciones--motivos">
            {MOTIVOS.map(function (o) {
              return (
                <Opcion key={o.id} name="cita-motivo" value={o.id} actual={d.motivo} className="cita-opcion--compacta"
                  onChange={function (v) { cambiar("motivo", v); }}>
                  <Icono nombre={o.icono} tam={22} className="cita-opcion__icono" />
                  <strong>{o.etiqueta}</strong>
                </Opcion>
              );
            })}
          </div>
          {errores.motivo && <ErrorCampo id="cita-error-motivo">{errores.motivo}</ErrorCampo>}
        </fieldset>

        <div className="campo">
          <label htmlFor="cita-detalle">Si quieres, cuéntanos algo más (opcional)</label>
          <textarea id="cita-detalle" rows="4" maxLength={MAX_DETALLE} value={d.detalle}
            onChange={function (e) { cambiar("detalle", e.target.value); }}
            aria-describedby="cita-ayuda-detalle"></textarea>
          <span className="cita-ayuda texto-suave" id="cita-ayuda-detalle">
            {d.detalle.length} / {MAX_DETALLE}. No hace falta dar detalles: lo hablaremos en la primera sesión.
          </span>
        </div>
      </div>
    );
  }

  /* ---------- Paso 2 ---------- */
  function PasoProfesional({ d, errores, cambiar }) {
    return (
      <div className="cita-campos">
        <fieldset className="cita-grupo" id="cita-profesional" tabIndex={-1}
          aria-describedby={errores.profesional ? "cita-error-profesional" : undefined}>
          <legend>Profesional</legend>
          <div className="cita-opciones cita-opciones--prof">
            <Opcion name="cita-profesional" value="sin-preferencia" actual={d.profesional} className="cita-opcion--prof"
              onChange={function (v) { cambiar("profesional", v); }}>
              <span className="cita-prof__foto cita-prof__foto--equipo" aria-hidden="true"><Icono nombre="grupo" tam={34} /></span>
              <strong>Sin preferencia</strong>
              <small>Te asignamos a quien mejor encaje con tu caso.</small>
            </Opcion>
            {SITE.equipo.map(function (p) {
              return (
                <Opcion key={p.id} name="cita-profesional" value={p.id} actual={d.profesional} className="cita-opcion--prof"
                  onChange={function (v) { cambiar("profesional", v); }}>
                  <img className="cita-prof__foto" src={p.foto} alt={"Fotografía de " + p.nombre} loading="lazy" />
                  <strong>{p.nombre}</strong>
                  <small>{p.area}</small>
                </Opcion>
              );
            })}
          </div>
          {errores.profesional && <ErrorCampo id="cita-error-profesional">{errores.profesional}</ErrorCampo>}
        </fieldset>

        <fieldset className="cita-grupo" id="cita-modalidad" tabIndex={-1}
          aria-describedby={errores.modalidad ? "cita-error-modalidad" : undefined}>
          <legend>Modalidad</legend>
          <div className="cita-opciones cita-opciones--2">
            {MODALIDADES.map(function (o) {
              return (
                <Opcion key={o.id} name="cita-modalidad" value={o.id} actual={d.modalidad}
                  onChange={function (v) { cambiar("modalidad", v); }}>
                  <Icono nombre={o.icono} tam={26} className="cita-opcion__icono" />
                  <strong>{o.titulo}</strong>
                  <small>{o.texto}</small>
                </Opcion>
              );
            })}
          </div>
          {errores.modalidad && <ErrorCampo id="cita-error-modalidad">{errores.modalidad}</ErrorCampo>}
        </fieldset>
      </div>
    );
  }

  /* ---------- Paso 3: calendario propio ---------- */
  const CABECERAS = ["L", "M", "X", "J", "V", "S", "D"];

  function Calendario({ semanas, d, errores, cambiar }) {
    const dias = [];
    semanas.forEach(function (s) { s.forEach(function (x) { dias.push(x); }); });
    const libres = dias.filter(function (x) { return x.disponible; });
    let rotulo = "";
    if (libres.length) {
      const a = libres[0].fecha;
      const b = libres[libres.length - 1].fecha;
      const mesA = a.toLocaleDateString("es-ES", { month: "long" });
      const mesB = b.toLocaleDateString("es-ES", { month: "long" });
      rotulo = mayuscula(mesA === mesB ? mesA : mesA + " – " + mesB) + " " + b.getFullYear();
    }

    const fechaElegida = d.fecha ? deIso(d.fecha) : null;
    const franjas = fechaElegida ? franjasDelDia((fechaElegida.getDay() + 6) % 7) : [];

    return (
      <div className="cita-campos">
        <div className="cita-calendario" id="cita-fecha" tabIndex={-1}
          aria-describedby={errores.fecha ? "cita-error-fecha" : undefined}>
          <div className="cita-calendario__titulo">
            <h3>{rotulo}</h3>
            <p className="texto-suave">Próximas 3 semanas, de lunes a viernes. Los fines de semana no se dan citas.</p>
          </div>
          <div className="cita-calendario__cab" aria-hidden="true">
            {CABECERAS.map(function (c) { return <span key={c}>{c}</span>; })}
          </div>
          <div className="cita-calendario__rejilla">
            {dias.map(function (dia, i) {
              const elegido = d.fecha === dia.iso;
              const etiqueta = formatoLargo(dia.fecha) + (dia.disponible ? "" : " (no disponible)");
              const mostrarMes = dia.fecha.getDate() === 1 || i === 0;
              return (
                <button key={dia.iso} type="button" disabled={!dia.disponible}
                  aria-pressed={elegido} aria-label={etiqueta}
                  style={{ "--i": i }}
                  className={"cita-dia" + (elegido ? " cita-dia--elegido" : "") + (dia.dow > 4 ? " cita-dia--finde" : "") + (dia.esHoy ? " cita-dia--hoy" : "")}
                  onClick={function () { cambiar("fecha", dia.iso); }}>
                  <span className="cita-dia__num">{dia.fecha.getDate()}</span>
                  {mostrarMes && <span className="cita-dia__mes">{dia.fecha.toLocaleDateString("es-ES", { month: "short" })}</span>}
                </button>
              );
            })}
          </div>
          {errores.fecha && <ErrorCampo id="cita-error-fecha">{errores.fecha}</ErrorCampo>}
        </div>

        {fechaElegida ? (
          <div className="cita-franjas" id="cita-hora" tabIndex={-1}
            aria-describedby={errores.hora ? "cita-error-hora" : undefined}>
            <h3>{formatoLargo(fechaElegida)}</h3>
            {franjas.map(function (g) {
              return (
                <div className="cita-franja" key={g.nombre} role="group" aria-label={"Horas de " + g.nombre.toLowerCase()}>
                  <p className="cita-franja__nombre">{g.nombre}</p>
                  <div className="cita-horas">
                    {g.horas.map(function (h) {
                      const llena = ocupada(fechaElegida, h);
                      return (
                        <button key={h} type="button" disabled={llena} aria-pressed={d.hora === h}
                          className={"cita-hora" + (d.hora === h ? " cita-hora--elegida" : "") + (llena ? " cita-hora--llena" : "")}
                          onClick={function () { cambiar("hora", h); }}>
                          {h}{llena && <span className="cita-hora__llena"> completa</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {errores.hora && <ErrorCampo id="cita-error-hora">{errores.hora}</ErrorCampo>}
          </div>
        ) : (
          <p className="cita-franjas-vacio texto-suave">Elige un día para ver las horas disponibles.</p>
        )}
      </div>
    );
  }

  /* ---------- Paso 4 ---------- */
  function PasoDatos({ d, errores, cambiar }) {
    function a(campo) {
      return {
        "aria-invalid": errores[campo] ? "true" : "false",
        "aria-describedby": errores[campo] ? "cita-error-" + campo : undefined
      };
    }
    return (
      <div className="cita-campos">
        <div className={"campo" + (errores.nombre ? " campo--error" : "")}>
          <label htmlFor="cita-nombre">{d.paraQuien === "yo" ? "Tu nombre" : "Tu nombre (persona de contacto)"}</label>
          <input id="cita-nombre" type="text" autoComplete="name" value={d.nombre}
            onChange={function (e) { cambiar("nombre", e.target.value); }} {...a("nombre")} />
          {errores.nombre && <ErrorCampo id="cita-error-nombre">{errores.nombre}</ErrorCampo>}
        </div>

        <div className="cita-doble">
          <div className={"campo" + (errores.telefono ? " campo--error" : "")}>
            <label htmlFor="cita-telefono">Teléfono</label>
            <input id="cita-telefono" type="tel" autoComplete="tel" inputMode="tel" value={d.telefono}
              onChange={function (e) { cambiar("telefono", e.target.value); }} {...a("telefono")} />
            {errores.telefono && <ErrorCampo id="cita-error-telefono">{errores.telefono}</ErrorCampo>}
          </div>
          <div className={"campo" + (errores.email ? " campo--error" : "")}>
            <label htmlFor="cita-email">Correo electrónico</label>
            <input id="cita-email" type="email" autoComplete="email" value={d.email}
              onChange={function (e) { cambiar("email", e.target.value); }} {...a("email")} />
            {errores.email && <ErrorCampo id="cita-error-email">{errores.email}</ErrorCampo>}
          </div>
        </div>

        <div className="campo">
          <label htmlFor="cita-contacto">¿Cómo prefieres que te contactemos?</label>
          <select id="cita-contacto" value={d.contacto} onChange={function (e) { cambiar("contacto", e.target.value); }}>
            {CONTACTO_PREF.map(function (o) { return <option key={o.id} value={o.id}>{o.etiqueta}</option>; })}
          </select>
        </div>

        <div className={"cita-privacidad" + (errores.privacidad ? " cita-privacidad--error" : "")}>
          <label className="cita-check" htmlFor="cita-privacidad">
            <input id="cita-privacidad" type="checkbox" checked={d.privacidad}
              onChange={function (e) { cambiar("privacidad", e.target.checked); }} {...a("privacidad")} />
            <span>
              Acepto que se traten mis datos para gestionar esta solicitud de cita y he leído la política de privacidad.
              En esta web simulada no se trata ni se guarda ningún dato.
            </span>
          </label>
          {errores.privacidad && <ErrorCampo id="cita-error-privacidad">{errores.privacidad}</ErrorCampo>}
        </div>
      </div>
    );
  }

  /* ---------- Resumen (lateral y pantalla final) ---------- */
  function nombreProfesional(id) {
    if (!id) return "";
    if (id === "sin-preferencia") return "Sin preferencia";
    const p = SITE.equipo.find(function (x) { return x.id === id; });
    return p ? p.nombre : "";
  }

  function filasResumen(d) {
    const quien = PARA_QUIEN.find(function (x) { return x.id === d.paraQuien; });
    const motivo = MOTIVOS.find(function (x) { return x.id === d.motivo; });
    const modalidad = MODALIDADES.find(function (x) { return x.id === d.modalidad; });
    const pref = CONTACTO_PREF.find(function (x) { return x.id === d.contacto; });
    return [
      { k: "Consulta", v: quien ? quien.titulo + (d.paraQuien === "menor" && d.edad ? " (" + d.edad + " años)" : "") : "" },
      { k: "Motivo", v: motivo ? motivo.etiqueta : "" },
      { k: "Profesional", v: nombreProfesional(d.profesional) },
      { k: "Modalidad", v: modalidad ? modalidad.titulo : "" },
      { k: "Día", v: d.fecha ? formatoLargo(deIso(d.fecha)) : "" },
      { k: "Hora", v: d.hora },
      { k: "Contacto", v: d.nombre.trim() ? d.nombre.trim() : "" },
      { k: "Teléfono", v: d.telefono.trim() },
      { k: "Correo", v: d.email.trim() },
      { k: "Preferencia", v: d.nombre.trim() && pref ? pref.etiqueta : "" }
    ];
  }

  function Lateral({ d, paso }) {
    const filas = filasResumen(d).slice(0, 6);
    return (
      <aside className="cita-lateral" aria-label="Resumen de tu solicitud">
        <div className="tarjeta cita-resumen">
          <h2 className="cita-lateral__titulo">Tu solicitud</h2>
          <dl className="cita-resumen__lista">
            {filas.map(function (f, i) {
              return (
                <div key={f.k} className={"cita-resumen__fila" + (f.v ? " cita-resumen__fila--lleno" : "")}>
                  <dt>{f.k}</dt>
                  <dd>{f.v || "—"}</dd>
                </div>
              );
            })}
          </dl>
          <p className="texto-suave cita-resumen__nota">Primera sesión de valoración gratuita. Paso {paso + 1} de {PASOS.length}.</p>
        </div>
        <div className="cita-urgencia" role="note">
          <h2 className="cita-lateral__titulo">¿Es una urgencia?</h2>
          <p>
            Si hay un riesgo inmediato para ti o para otra persona, llama al <a href="tel:112"><strong>112</strong></a>.
            Si tú o alguien cercano pensáis en haceros daño, la línea <a href="tel:024"><strong>024</strong></a> de atención
            a la conducta suicida atiende las 24 horas, todos los días.
          </p>
          <p className="cita-urgencia__nota">Este formulario no es un servicio de emergencias.</p>
        </div>
      </aside>
    );
  }

  function Final({ d, titulo, onModificar, onReiniciar }) {
    const filas = filasResumen(d).filter(function (f) { return f.v; });
    return (
      <div className="cita-final tarjeta">
        <div className="cita-final__icono" aria-hidden="true"><Icono nombre="check" tam={34} /></div>
        <h2 ref={titulo} tabIndex={-1} className="cita-titulo">Solicitud preparada (simulación)</h2>
        <p className="cita-final__aviso">
          <strong>Esto es una simulación académica.</strong> Tu solicitud no se ha enviado a ningún sitio ni se ha guardado:
          solo existe en esta pantalla y desaparecerá al recargar o cerrar la página. Nadie va a contactar contigo.
        </p>
        <h3>Resumen de la cita que habrías solicitado</h3>
        <dl className="cita-final__lista">
          {filas.map(function (f) {
            return (
              <div key={f.k} className="cita-final__fila">
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            );
          })}
        </dl>
        <p className="texto-suave">
          En un centro real recibirías una confirmación por la vía que hubieras elegido en menos de 24 horas laborables.
        </p>
        <div className="cita-final__acciones">
          <Boton variante="secundario" type="button" onClick={onModificar}>Modificar la solicitud</Boton>
          <Boton variante="primario" type="button" onClick={onReiniciar}>Empezar otra solicitud</Boton>
          <Boton a="#/inicio" variante="fantasma">Volver al inicio</Boton>
        </div>
      </div>
    );
  }

  /* ---------- Página ---------- */
  function PedirCita() {
    const [datos, setDatos] = useState(VACIO);
    const [errores, setErrores] = useState({});
    const [paso, setPaso] = useState(0);
    const [dir, setDir] = useState(1);
    const [fin, setFin] = useState(false);
    const [semanas] = useState(construirSemanas);
    const titulo = useRef(null);
    const montado = useRef(false);

    useEffect(function () {
      if (!montado.current) { montado.current = true; return; }
      if (titulo.current) titulo.current.focus();
    }, [paso, fin]);

    function cambiar(campo, valor) {
      setDatos(function (prev) {
        const nuevo = Object.assign({}, prev, { [campo]: valor });
        if (campo === "fecha") nuevo.hora = "";
        return nuevo;
      });
      setErrores(function (prev) {
        if (!prev[campo] && !(campo === "fecha" && prev.hora)) return prev;
        const n = Object.assign({}, prev);
        delete n[campo];
        if (campo === "fecha") delete n.hora;
        return n;
      });
    }

    function avanzar(ev) {
      ev.preventDefault();
      const e = validarPaso(paso, datos);
      setErrores(e);
      const claves = Object.keys(e);
      if (claves.length) {
        setTimeout(function () {
          const el = document.getElementById("cita-" + claves[0]);
          if (el) el.focus();
        }, 0);
        return;
      }
      if (paso < PASOS.length - 1) {
        setDir(1);
        setPaso(paso + 1);
      } else {
        setDir(1);
        setFin(true);
      }
    }

    function irA(i) {
      setErrores({});
      setDir(i < paso ? -1 : 1);
      setPaso(i);
    }

    function modificar() {
      setErrores({});
      setDir(-1);
      setFin(false);
      setPaso(0);
    }

    function reiniciar() {
      setDatos(VACIO);
      setErrores({});
      setDir(1);
      setFin(false);
      setPaso(0);
    }

    const propsPaso = { d: datos, errores: errores, cambiar: cambiar };

    return (
      <React.Fragment>
        <PageHero
          sobretitulo="Pedir cita"
          titulo="Pide tu primera cita en cuatro pasos"
          texto="La primera sesión de valoración es gratuita y sin compromiso. Elige motivo, profesional y hora; nosotros nos encargamos del resto."
        />

        <section className="seccion cita-seccion">
          <div className="contenedor cita-layout">
            <div className="cita-principal">
              {fin ? (
                <Final d={datos} titulo={titulo} onModificar={modificar} onReiniciar={reiniciar} />
              ) : (
                <Reveal className="tarjeta cita-asistente">
                  <div className="cita-progreso" style={{ "--avance": (paso + 1) / PASOS.length }}>
                    <div className="cita-progreso__barra" role="progressbar" aria-label="Progreso de la solicitud"
                      aria-valuemin={1} aria-valuemax={PASOS.length} aria-valuenow={paso + 1}
                      aria-valuetext={"Paso " + (paso + 1) + " de " + PASOS.length + ": " + PASOS[paso].nombre}>
                      <span></span>
                    </div>
                    <ol className="cita-pasos">
                      {PASOS.map(function (p, i) {
                        const estado = i < paso ? " cita-pasos__paso--hecho" : (i === paso ? " cita-pasos__paso--actual" : "");
                        return (
                          <li key={p.nombre} className={"cita-pasos__paso" + estado} aria-current={i === paso ? "step" : undefined}>
                            {i < paso ? (
                              <button type="button" className="cita-pasos__item" onClick={function () { irA(i); }}
                                aria-label={"Volver al paso " + (i + 1) + ": " + p.nombre}>
                                <span className="cita-pasos__num"><Icono nombre="check" tam={16} /></span>
                                <span className="cita-pasos__nombre">{p.nombre}</span>
                              </button>
                            ) : (
                              <span className="cita-pasos__item">
                                <span className="cita-pasos__num">{i + 1}</span>
                                <span className="cita-pasos__nombre">{p.nombre}</span>
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  <form className="cita-form" onSubmit={avanzar} noValidate
                    aria-label="Solicitud de cita (simulada)">
                    <div className="cita-paso" key={paso} style={{ "--dir": dir }}>
                      <p className="cita-paso__etiqueta">Paso {paso + 1} de {PASOS.length}</p>
                      <h2 ref={titulo} tabIndex={-1} className="cita-titulo">{PASOS[paso].titulo}</h2>
                      {paso === 0 && <PasoMotivo {...propsPaso} />}
                      {paso === 1 && <PasoProfesional {...propsPaso} />}
                      {paso === 2 && <Calendario semanas={semanas} {...propsPaso} />}
                      {paso === 3 && <PasoDatos {...propsPaso} />}
                    </div>

                    {Object.keys(errores).length > 0 && (
                      <p className="cita-resumen-errores" role="alert">
                        Revisa los campos marcados para poder continuar.
                      </p>
                    )}

                    <div className="cita-botones">
                      {paso > 0 ? (
                        <button type="button" className="btn btn--secundario" onClick={function () { irA(paso - 1); }}>
                          Atrás
                        </button>
                      ) : <span></span>}
                      <button type="submit" className="btn btn--primario">
                        {paso === PASOS.length - 1 ? "Solicitar cita (simulación)" : "Siguiente"}
                        <Icono nombre="flecha" tam={20} />
                      </button>
                    </div>
                    <p className="cita-simulacion texto-suave">
                      Formulario simulado: no se envía ni se guarda nada fuera de tu navegador.
                    </p>
                  </form>
                </Reveal>
              )}
            </div>
            <Lateral d={datos} paso={fin ? PASOS.length - 1 : paso} />
          </div>
        </section>
      </React.Fragment>
    );
  }

  window.Pages["pedir-cita"] = PedirCita;
})();
