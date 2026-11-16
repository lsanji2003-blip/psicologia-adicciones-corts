(function () {
  const { useState, useEffect, useRef } = React;
  const { Reveal, Boton, PageHero, TituloSeccion, BandaCita, Icono } = window.UI;
  const SITE = window.SITE;
  const C = SITE.contacto;

  const MAX_MENSAJE = 600;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const ASUNTOS = [
    "Quiero información sobre un tratamiento",
    "Consulta para un familiar",
    "Información sobre ponencias o talleres",
    "Prensa o colaboraciones",
    "Otro asunto"
  ];

  /* Tramos de atención en minutos desde las 0:00 (según SITE.contacto.horario).
     Clave = día de la semana de Date.getDay(): 1 = lunes ... 5 = viernes. */
  const TRAMOS = {
    1: [[570, 840], [960, 1230]],
    2: [[570, 840], [960, 1230]],
    3: [[570, 840], [960, 1230]],
    4: [[570, 840], [960, 1230]],
    5: [[570, 900]]
  };

  function estadoAhora() {
    const n = new Date();
    const dia = n.getDay();
    const min = n.getHours() * 60 + n.getMinutes();
    const tramos = TRAMOS[dia] || [];
    const abierto = tramos.some(function (t) { return min >= t[0] && min < t[1]; });
    /* Posición de la fila de SITE.contacto.horario que corresponde a hoy */
    let fila = -1;
    if (dia >= 1 && dia <= 4) fila = 0;
    else if (dia === 5) fila = 1;
    else if (dia === 6) fila = 2;
    return { abierto: abierto, fila: fila };
  }

  function digitos(t) { return t.replace(/\s/g, ""); }

  /* ---------- Botón copiar ---------- */
  function BotonCopiar({ texto, etiqueta }) {
    const [copiado, setCopiado] = useState(false);
    const temporizador = useRef(null);
    useEffect(function () {
      return function () { clearTimeout(temporizador.current); };
    }, []);
    if (!(navigator.clipboard && navigator.clipboard.writeText)) return null;
    function copiar() {
      navigator.clipboard.writeText(texto).then(function () {
        setCopiado(true);
        clearTimeout(temporizador.current);
        temporizador.current = setTimeout(function () { setCopiado(false); }, 1800);
      }, function () {});
    }
    return (
      <button type="button" className={"contacto-copiar" + (copiado ? " contacto-copiar--ok" : "")}
        onClick={copiar} aria-label={"Copiar " + etiqueta}>
        <span aria-live="polite">{copiado ? "Copiado" : "Copiar"}</span>
      </button>
    );
  }

  /* ---------- Datos de contacto ---------- */
  function DatosContacto() {
    const [estado, setEstado] = useState(estadoAhora());
    useEffect(function () {
      const id = setInterval(function () { setEstado(estadoAhora()); }, 60000);
      return function () { clearInterval(id); };
    }, []);

    return (
      <div className="rejilla rejilla--4 contacto-datos">
        <Reveal retraso={0} className="tarjeta tarjeta--elevable contacto-dato">
          <div className="tarjeta__icono"><Icono nombre="ubicacion" /></div>
          <h3>Dónde estamos</h3>
          <address className="contacto-dato__texto">
            {C.direccion}<br />{C.cp} {C.ciudad}
          </address>
        </Reveal>

        <Reveal retraso={80} className="tarjeta tarjeta--elevable contacto-dato">
          <div className="tarjeta__icono"><Icono nombre="telefono" /></div>
          <h3>Teléfono y WhatsApp</h3>
          <p className="contacto-dato__texto">
            <a href={"tel:+34" + digitos(C.telefono)}>{C.telefono}</a>
            <BotonCopiar texto={C.telefono} etiqueta="el teléfono" />
          </p>
          <p className="contacto-dato__texto">
            <a href={"https://wa.me/34" + digitos(C.whatsapp)} target="_blank" rel="noopener noreferrer">
              WhatsApp {C.whatsapp}
            </a>
          </p>
        </Reveal>

        <Reveal retraso={160} className="tarjeta tarjeta--elevable contacto-dato">
          <div className="tarjeta__icono"><Icono nombre="correo" /></div>
          <h3>Correo electrónico</h3>
          <p className="contacto-dato__texto contacto-dato__correo">
            <a href={"mailto:" + C.email}>{C.email}</a>
            <BotonCopiar texto={C.email} etiqueta="el correo" />
          </p>
          <p className="texto-suave contacto-dato__nota">Respondemos en menos de 24 horas laborables.</p>
        </Reveal>

        <Reveal retraso={240} className="tarjeta tarjeta--elevable contacto-dato">
          <div className="tarjeta__icono"><Icono nombre="reloj" /></div>
          <h3>Horario</h3>
          <p className={"contacto-estado " + (estado.abierto ? "contacto-estado--abierto" : "contacto-estado--cerrado")}>
            <span className="contacto-estado__punto" aria-hidden="true"></span>
            {estado.abierto ? "Abierto ahora" : "Cerrado ahora"}
          </p>
          <ul className="contacto-horario">
            {C.horario.map(function (h, i) {
              return (
                <li key={h.dias} className={i === estado.fila ? "contacto-horario__hoy" : ""}>
                  <strong>{h.dias}</strong>
                  <span>{h.horas}</span>
                  {i === estado.fila && <em className="contacto-horario__marca">Hoy</em>}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    );
  }

  /* ---------- Mapa y cómo llegar (pestañas) ---------- */
  function separarTransporte(t) {
    const i = t.indexOf(":");
    if (i > 0 && i < 24) return { etiqueta: t.slice(0, i).trim(), texto: t.slice(i + 1).trim() };
    return { etiqueta: t.split(" ")[0], texto: t };
  }

  function ComoLlegar() {
    const opciones = (C.transporte || []).map(separarTransporte);
    const [activa, setActiva] = useState(0);
    const refs = useRef([]);

    function alTeclear(e) {
      if (!opciones.length) return;
      let nueva = null;
      if (e.key === "ArrowRight") nueva = (activa + 1) % opciones.length;
      else if (e.key === "ArrowLeft") nueva = (activa - 1 + opciones.length) % opciones.length;
      else if (e.key === "Home") nueva = 0;
      else if (e.key === "End") nueva = opciones.length - 1;
      if (nueva !== null) {
        e.preventDefault();
        setActiva(nueva);
        if (refs.current[nueva]) refs.current[nueva].focus();
      }
    }

    return (
      <div className="contacto-llegar">
        <Reveal className="contacto-mapa">
          <iframe
            title={"Mapa con la ubicación de " + SITE.nombre}
            src={C.mapaEmbed}
            loading="lazy"
            referrerPolicy="no-referrer"
          ></iframe>
        </Reveal>
        <Reveal retraso={120} className="contacto-llegar__panel">
          <h3>Cómo llegar</h3>
          <p className="texto-suave">{C.direccion}, {C.cp} {C.ciudad}</p>
          {opciones.length > 0 && (
            <div>
              <div className="contacto-pestanas" role="tablist" aria-label="Cómo llegar" onKeyDown={alTeclear}>
                {opciones.map(function (o, i) {
                  return (
                    <button key={o.etiqueta} type="button" role="tab"
                      id={"contacto-tab-" + i} aria-controls={"contacto-panel-" + i}
                      aria-selected={activa === i} tabIndex={activa === i ? 0 : -1}
                      ref={function (el) { refs.current[i] = el; }}
                      className={"contacto-pestana" + (activa === i ? " contacto-pestana--activa" : "")}
                      onClick={function () { setActiva(i); }}>
                      {o.etiqueta}
                    </button>
                  );
                })}
              </div>
              {opciones.map(function (o, i) {
                return (
                  <div key={o.etiqueta} role="tabpanel" id={"contacto-panel-" + i}
                    aria-labelledby={"contacto-tab-" + i} hidden={activa !== i}
                    className="contacto-panel-transporte">
                    <p>{o.texto}</p>
                  </div>
                );
              })}
            </div>
          )}
        </Reveal>
      </div>
    );
  }

  /* ---------- Formulario de consulta rápida (simulado) ---------- */
  const VALORES_INICIALES = { nombre: "", email: "", asunto: "", mensaje: "", privacidad: false };

  function validar(v) {
    const e = {};
    if (v.nombre.trim().length < 2) e.nombre = "Escribe tu nombre (al menos 2 caracteres).";
    if (!v.email.trim()) e.email = "Escribe tu correo electrónico.";
    else if (!EMAIL_RE.test(v.email.trim())) e.email = "Revisa el correo: debe tener un formato como nombre@dominio.es.";
    if (!v.asunto) e.asunto = "Elige un asunto.";
    if (v.mensaje.trim().length < 10) e.mensaje = "Cuéntanos algo más (al menos 10 caracteres).";
    else if (v.mensaje.length > MAX_MENSAJE) e.mensaje = "El mensaje supera los " + MAX_MENSAJE + " caracteres.";
    if (!v.privacidad) e.privacidad = "Necesitamos que aceptes la política de privacidad para continuar.";
    return e;
  }

  function aria(campo, errores) {
    return {
      "aria-invalid": errores[campo] ? "true" : "false",
      "aria-describedby": errores[campo] ? "contacto-error-" + campo : undefined
    };
  }

  function Formulario() {
    const [valores, setValores] = useState(VALORES_INICIALES);
    const [errores, setErrores] = useState({});
    const [enviado, setEnviado] = useState(null);
    const confirmacion = useRef(null);

    useEffect(function () {
      if (enviado && confirmacion.current) confirmacion.current.focus();
    }, [enviado]);

    function cambiar(campo, valor) {
      const nuevos = Object.assign({}, valores, { [campo]: valor });
      setValores(nuevos);
      if (errores[campo]) {
        const e = validar(nuevos);
        setErrores(Object.assign({}, errores, { [campo]: e[campo] }));
      }
    }

    function alSalir(campo) {
      const e = validar(valores);
      setErrores(Object.assign({}, errores, { [campo]: e[campo] }));
    }

    function enviar(ev) {
      ev.preventDefault();
      const e = validar(valores);
      setErrores(e);
      const claves = Object.keys(e);
      if (claves.length) {
        const el = document.getElementById("contacto-" + claves[0]);
        if (el) el.focus();
        return;
      }
      /* Simulación: solo guardamos en el estado lo necesario para mostrar la confirmación. */
      setEnviado({ nombre: valores.nombre.trim(), asunto: valores.asunto, email: valores.email.trim() });
      setValores(VALORES_INICIALES);
      setErrores({});
    }

    function otro() { setEnviado(null); }

    const usados = valores.mensaje.length;
    const proporcion = Math.min(1, usados / MAX_MENSAJE);
    const excedido = usados > MAX_MENSAJE;

    if (enviado) {
      return (
        <div className="contacto-confirmacion" role="status" tabIndex={-1} ref={confirmacion}>
          <div className="contacto-confirmacion__icono" aria-hidden="true"><Icono nombre="check" tam={32} /></div>
          <h3>Gracias, {enviado.nombre}: tu consulta está recibida (en la simulación)</h3>
          <p>
            <strong>Esto es una simulación académica.</strong> No se ha enviado ningún mensaje, no se ha guardado
            ningún dato y nadie va a responder a este formulario. Si fuera real, te escribiríamos a{" "}
            <strong>{enviado.email}</strong> sobre «{enviado.asunto}» en menos de 24 horas laborables.
          </p>
          <p className="texto-suave">
            Si necesitas ayuda de verdad ahora mismo y es una urgencia, llama al 112. La línea 024 atiende la conducta suicida las 24 horas.
          </p>
          <div className="contacto-confirmacion__acciones">
            <Boton variante="secundario" type="button" onClick={otro}>Escribir otra consulta</Boton>
            <Boton a="#/pedir-cita" variante="primario">Pedir cita</Boton>
          </div>
        </div>
      );
    }

    return (
      <form className="contacto-form" onSubmit={enviar} noValidate aria-label="Formulario de consulta rápida (simulado)">
        <div className={"campo" + (errores.nombre ? " campo--error" : "")}>
          <label htmlFor="contacto-nombre">Nombre</label>
          <input id="contacto-nombre" type="text" autoComplete="name" value={valores.nombre}
            onChange={function (e) { cambiar("nombre", e.target.value); }}
            onBlur={function () { alSalir("nombre"); }}
            {...aria("nombre", errores)} />
          {errores.nombre && <span className="campo__error" id="contacto-error-nombre">{errores.nombre}</span>}
        </div>

        <div className={"campo" + (errores.email ? " campo--error" : "")}>
          <label htmlFor="contacto-email">Correo electrónico</label>
          <input id="contacto-email" type="email" autoComplete="email" value={valores.email}
            onChange={function (e) { cambiar("email", e.target.value); }}
            onBlur={function () { alSalir("email"); }}
            {...aria("email", errores)} />
          {errores.email && <span className="campo__error" id="contacto-error-email">{errores.email}</span>}
        </div>

        <div className={"campo" + (errores.asunto ? " campo--error" : "")}>
          <label htmlFor="contacto-asunto">Asunto</label>
          <select id="contacto-asunto" value={valores.asunto}
            onChange={function (e) { cambiar("asunto", e.target.value); }}
            onBlur={function () { alSalir("asunto"); }}
            {...aria("asunto", errores)}>
            <option value="">Elige un asunto…</option>
            {ASUNTOS.map(function (a) { return <option key={a} value={a}>{a}</option>; })}
          </select>
          {errores.asunto && <span className="campo__error" id="contacto-error-asunto">{errores.asunto}</span>}
        </div>

        <div className={"campo" + (errores.mensaje ? " campo--error" : "")}>
          <label htmlFor="contacto-mensaje">Mensaje</label>
          <textarea id="contacto-mensaje" rows="5" value={valores.mensaje}
            onChange={function (e) { cambiar("mensaje", e.target.value); }}
            onBlur={function () { alSalir("mensaje"); }}
            {...aria("mensaje", errores)}></textarea>
          <div className={"contacto-contador" + (excedido ? " contacto-contador--excedido" : "")} style={{ "--uso": proporcion }}>
            <span className="contacto-contador__barra" aria-hidden="true"></span>
            <span className="contacto-contador__texto">{usados} / {MAX_MENSAJE}</span>
          </div>
          {errores.mensaje && <span className="campo__error" id="contacto-error-mensaje">{errores.mensaje}</span>}
        </div>

        <div className={"contacto-privacidad" + (errores.privacidad ? " contacto-privacidad--error" : "")}>
          <label className="contacto-check" htmlFor="contacto-privacidad">
            <input id="contacto-privacidad" type="checkbox" checked={valores.privacidad}
              onChange={function (e) { cambiar("privacidad", e.target.checked); }}
              {...aria("privacidad", errores)} />
            <span>
              He leído la política de privacidad y acepto que se traten mis datos para responder a esta consulta
              (en esta web simulada no se trata ningún dato).
            </span>
          </label>
          {errores.privacidad && <span className="campo__error" id="contacto-error-privacidad">{errores.privacidad}</span>}
        </div>

        <p className="contacto-aviso texto-suave">
          Formulario simulado: al enviarlo no sale ningún dato de tu navegador. No incluyas información sensible real.
        </p>
        <button type="submit" className="btn btn--primario">Enviar consulta <Icono nombre="flecha" tam={20} /></button>
      </form>
    );
  }

  /* ---------- Página ---------- */
  function Contacto() {
    return (
      <React.Fragment>
        <PageHero
          sobretitulo="Contacto"
          titulo="Hablemos cuando te venga bien"
          texto="Puedes llamarnos, escribirnos por WhatsApp o dejarnos una consulta. Todo lo que nos cuentes es confidencial y sin compromiso."
        >
          <div className="contacto-hero__acciones">
            <Boton a="#/pedir-cita" variante="primario">Pedir cita</Boton>
            <Boton a={"tel:+34" + digitos(C.telefono)} variante="secundario">Llamar al {C.telefono}</Boton>
          </div>
        </PageHero>

        <section className="seccion">
          <div className="contenedor">
            <TituloSeccion sobretitulo="Datos" titulo="Cómo encontrarnos" texto="Atendemos de forma presencial en València y también online." />
            <DatosContacto />
          </div>
        </section>

        <section className="seccion seccion--alt">
          <div className="contenedor">
            <TituloSeccion sobretitulo="Ubicación" titulo="Cómo llegar a la consulta" texto="Estamos junto a Les Corts Valencianes, con buena conexión en transporte público." />
            <ComoLlegar />
          </div>
        </section>

        <section className="seccion">
          <div className="contenedor contacto-consulta">
            <div className="contacto-consulta__texto">
              <TituloSeccion sobretitulo="Consulta rápida" titulo="Escríbenos y te respondemos"
                texto="Si prefieres empezar por escrito, cuéntanos brevemente qué necesitas. No hace falta que des detalles." />
              <Reveal retraso={100}>
                <ul className="lista-check">
                  <li>Respuesta en menos de 24 horas laborables.</li>
                  <li>Confidencialidad y secreto profesional desde el primer mensaje.</li>
                  <li>Sin compromiso: la primera valoración es gratuita.</li>
                </ul>
                <p className="contacto-urgencia">
                  <strong>¿Es una urgencia?</strong> Llama al <a href="tel:112">112</a>. Si tú o alguien cercano pensáis en hacerlo daño,
                  la línea <a href="tel:024">024</a> de atención a la conducta suicida atiende las 24 horas, todos los días.
                </p>
              </Reveal>
            </div>
            <Reveal retraso={120} className="tarjeta contacto-consulta__form">
              <Formulario />
            </Reveal>
          </div>
        </section>

        <section className="seccion seccion--primario">
          <div className="contenedor">
            <TituloSeccion sobretitulo="Redes" titulo="Síguenos" texto="Compartimos divulgación y recursos sobre adicciones, sin juicios y basada en la evidencia." />
            <div className="rejilla rejilla--3">
              {(C.redes || []).map(function (r, i) {
                return (
                  <Reveal key={r.red} retraso={i * 100}>
                    <a className="tarjeta tarjeta--elevable contacto-red" href={r.url}>
                      <span className="contacto-red__inicial" aria-hidden="true">{r.red.charAt(0)}</span>
                      <span className="contacto-red__texto">
                        <strong>{r.red}</strong>
                        <small>{r.usuario}</small>
                      </span>
                      <Icono nombre="flecha" tam={20} className="contacto-red__flecha" />
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <BandaCita />
      </React.Fragment>
    );
  }

  window.Pages["contacto"] = Contacto;
})();
