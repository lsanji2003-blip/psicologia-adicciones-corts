/* Páginas legales (SIMULADAS): aviso legal, política de privacidad y política de cookies.
   Texto orientativo para un proyecto académico: no sustituye al asesoramiento jurídico. */
(function () {
  const { useState, useEffect } = React;
  const { PageHero, Boton } = window.UI;
  const SITE = window.SITE;
  const C = SITE.contacto;
  const DIRECCION = C.direccion + ", " + C.cp + " " + C.ciudad;
  const TITULAR = "Psicología de adicciones Corts, S.L.P. (entidad ficticia)";
  const ACTUALIZADO = "16 de noviembre de 2026";

  const LEGALES = [
    { id: "aviso-legal", etiqueta: "Aviso legal" },
    { id: "privacidad", etiqueta: "Política de privacidad" },
    { id: "cookies", etiqueta: "Política de cookies" }
  ];
  SITE.legales = LEGALES;

  function Tabla({ cabeceras, filas }) {
    return (
      <div className="legal__tabla-caja">
        <table className="legal__tabla">
          <thead><tr>{cabeceras.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
          <tbody>
            {filas.map((f, i) => <tr key={i}>{f.map((celda, j) => <td key={j}>{celda}</td>)}</tr>)}
          </tbody>
        </table>
      </div>
    );
  }

  /* Plantilla común: índice lateral que resalta el apartado visible + contenido */
  function PaginaLegal({ id, titulo, texto, apartados }) {
    const [activo, setActivo] = useState(apartados[0].id);

    useEffect(() => {
      if (!("IntersectionObserver" in window)) return;
      const obs = new IntersectionObserver((entradas) => {
        entradas.forEach((e) => { if (e.isIntersecting) setActivo(e.target.id); });
      }, { rootMargin: "-20% 0px -65% 0px" });
      apartados.forEach((a) => { const el = document.getElementById(a.id); if (el) obs.observe(el); });
      return () => obs.disconnect();
    }, []);

    function ir(idApartado) {
      const el = document.getElementById(idApartado);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActivo(idApartado);
    }

    return (
      <React.Fragment>
        <PageHero sobretitulo="Información legal" titulo={titulo} texto={texto} />
        <div className="seccion">
          <div className="contenedor legal">
            <nav className="legal__indice" aria-label="Apartados de esta página">
              <h2>En esta página</h2>
              <ul>
                {apartados.map((a) => (
                  <li key={a.id}>
                    <button type="button" className={activo === a.id ? "activo" : ""} onClick={() => ir(a.id)}>{a.titulo}</button>
                  </li>
                ))}
              </ul>
              <div className="legal__otras">
                {LEGALES.filter((l) => l.id !== id).map((l) => <a key={l.id} href={"#/" + l.id}>{l.etiqueta}</a>)}
              </div>
            </nav>
            <article className="legal__cuerpo">
              <p className="legal__aviso">
                <strong>Web simulada.</strong> Este sitio es un proyecto académico de máster. El centro, sus datos fiscales y de contacto son ficticios,
                y ningún formulario envía ni almacena datos personales. Estos textos muestran cómo serían los documentos legales de un gabinete real.
              </p>
              {apartados.map((a) => (
                <section key={a.id} id={a.id}>
                  <h2>{a.titulo}</h2>
                  {a.contenido}
                </section>
              ))}
              <p className="legal__fecha">Última actualización: {ACTUALIZADO}.</p>
            </article>
          </div>
        </div>
      </React.Fragment>
    );
  }

  /* ---------- Aviso legal ---------- */
  function AvisoLegal() {
    const apartados = [
      {
        id: "al-titular", titulo: "Titular del sitio web",
        contenido: (
          <React.Fragment>
            <p>En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular:</p>
            <ul>
              <li><strong>Titular:</strong> {TITULAR}</li>
              <li><strong>NIF:</strong> B-00000000 (ficticio)</li>
              <li><strong>Domicilio:</strong> {DIRECCION}</li>
              <li><strong>Teléfono:</strong> {C.telefono}</li>
              <li><strong>Correo electrónico:</strong> {C.email}</li>
              <li><strong>Actividad:</strong> centro sanitario privado de psicología (consulta de psicología general sanitaria)</li>
              <li><strong>Autorización sanitaria:</strong> n.º de registro de centros sanitarios de la Comunitat Valenciana 00000 (ficticio)</li>
            </ul>
          </React.Fragment>
        )
      },
      {
        id: "al-profesionales", titulo: "Profesionales colegiados",
        contenido: (
          <React.Fragment>
            <p>Los servicios los prestan psicólogas y psicólogos con habilitación como Psicólogo/a General Sanitario/a, colegiados en el Col·legi Oficial de Psicologia de la Comunitat Valenciana y sujetos al Código Deontológico del Psicólogo:</p>
            <ul>
              {SITE.equipo.map((m) => <li key={m.id}>{m.nombre} — {m.tratamiento}. {m.colegiada} (número simulado).</li>)}
            </ul>
          </React.Fragment>
        )
      },
      {
        id: "al-objeto", titulo: "Objeto y condiciones de uso",
        contenido: (
          <React.Fragment>
            <p>Este sitio web ofrece información sobre el gabinete, sus profesionales y sus servicios, y permite solicitar una cita. El acceso es gratuito y supone la aceptación de este aviso legal.</p>
            <p>La persona usuaria se compromete a hacer un uso lícito del sitio, a no dañar sus sistemas y a facilitar datos veraces en los formularios.</p>
          </React.Fragment>
        )
      },
      {
        id: "al-salud", titulo: "Información sobre salud",
        contenido: (
          <React.Fragment>
            <p>Los contenidos tienen finalidad divulgativa y no sustituyen la evaluación ni el tratamiento por parte de un profesional sanitario. No utilices esta web para situaciones de urgencia.</p>
            <p>Si hay un riesgo inmediato para ti o para otra persona, llama al <strong>112</strong>. La línea <strong>024</strong> atiende la conducta suicida las 24 horas.</p>
          </React.Fragment>
        )
      },
      {
        id: "al-propiedad", titulo: "Propiedad intelectual",
        contenido: (
          <React.Fragment>
            <p>Los textos, el diseño y el código de este sitio pertenecen a sus autores. Las fotografías de ambiente proceden de Unsplash y las imágenes del local, de un anuncio inmobiliario; se utilizan únicamente con fines académicos.</p>
            <p>No se permite la reproducción con fines comerciales sin autorización.</p>
          </React.Fragment>
        )
      },
      {
        id: "al-responsabilidad", titulo: "Responsabilidad y enlaces",
        contenido: (
          <p>El titular no se hace responsable del uso indebido de los contenidos ni de los sitios de terceros a los que se pueda enlazar (por ejemplo, mapas o redes sociales), que se rigen por sus propias condiciones.</p>
        )
      },
      {
        id: "al-ley", titulo: "Legislación aplicable",
        contenido: (
          <p>Este aviso legal se rige por la legislación española. Para cualquier controversia serán competentes los juzgados y tribunales que correspondan conforme a la normativa de consumidores y usuarios.</p>
        )
      }
    ];
    return <PaginaLegal id="aviso-legal" titulo="Aviso legal" texto="Quién está detrás de esta web y en qué condiciones puedes utilizarla." apartados={apartados} />;
  }

  /* ---------- Política de privacidad ---------- */
  function Privacidad() {
    const apartados = [
      {
        id: "pp-responsable", titulo: "Responsable del tratamiento",
        contenido: (
          <ul>
            <li><strong>Responsable:</strong> {TITULAR}</li>
            <li><strong>Domicilio:</strong> {DIRECCION}</li>
            <li><strong>Contacto de privacidad:</strong> {C.email}</li>
          </ul>
        )
      },
      {
        id: "pp-datos", titulo: "Qué datos tratamos y para qué",
        contenido: (
          <Tabla
            cabeceras={["Finalidad", "Datos", "Base jurídica"]}
            filas={[
              ["Responder a consultas del formulario de contacto", "Nombre, correo, mensaje", "Consentimiento (art. 6.1.a RGPD)"],
              ["Gestionar solicitudes de cita", "Nombre, teléfono, correo, motivo de consulta, preferencia horaria", "Medidas precontractuales (art. 6.1.b) y consentimiento explícito para datos de salud (art. 9.2.a)"],
              ["Prestar asistencia psicológica e historia clínica", "Datos identificativos y de salud", "Prestación de asistencia sanitaria (art. 9.2.h RGPD) y Ley 41/2002"],
              ["Facturación y obligaciones fiscales", "Datos identificativos y económicos", "Obligación legal (art. 6.1.c)"]
            ]}
          />
        )
      },
      {
        id: "pp-salud", titulo: "Datos de salud y secreto profesional",
        contenido: (
          <React.Fragment>
            <p>Los datos de salud son una categoría especial y se tratan con medidas de seguridad reforzadas. Solo accede a ellos el profesional que te atiende, obligado por el secreto profesional y por el Código Deontológico.</p>
            <p>La historia clínica se conserva como mínimo cinco años desde el alta de cada proceso asistencial, conforme a la Ley 41/2002 de autonomía del paciente y a la normativa autonómica.</p>
          </React.Fragment>
        )
      },
      {
        id: "pp-menores", titulo: "Menores de edad",
        contenido: (
          <React.Fragment>
            <p>Atendemos a adolescentes, por lo que cuidamos especialmente este punto:</p>
            <ul>
              <li>Los menores de 14 años necesitan el consentimiento de sus progenitores o tutores para el tratamiento de sus datos (art. 7 de la Ley Orgánica 3/2018).</li>
              <li>Para la intervención psicológica con menores de 16 años se requiere el consentimiento de quienes ejercen la patria potestad, y el menor es escuchado según su madurez (Ley 41/2002).</li>
              <li>Al inicio se acuerda con el adolescente y con su familia qué información se comparte con los padres y cuál es confidencial, salvo situaciones de riesgo grave.</li>
            </ul>
          </React.Fragment>
        )
      },
      {
        id: "pp-destinatarios", titulo: "Destinatarios y encargados",
        contenido: (
          <p>No cedemos tus datos a terceros, salvo obligación legal. Pueden acceder a ellos proveedores que actúan como encargados del tratamiento (alojamiento web, agenda, facturación), con contrato y garantías adecuadas. No se realizan transferencias internacionales fuera del Espacio Económico Europeo sin las garantías previstas en el RGPD.</p>
        )
      },
      {
        id: "pp-derechos", titulo: "Tus derechos",
        contenido: (
          <React.Fragment>
            <p>Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, así como retirar tu consentimiento en cualquier momento, escribiendo a {C.email} e indicando el derecho que quieres ejercer.</p>
            <p>Si consideras que no hemos atendido correctamente tu solicitud, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
          </React.Fragment>
        )
      },
      {
        id: "pp-seguridad", titulo: "Seguridad",
        contenido: (
          <p>Aplicamos medidas técnicas y organizativas para proteger tus datos: acceso restringido, cifrado de las comunicaciones, copias de seguridad y custodia de la documentación clínica.</p>
        )
      }
    ];
    return <PaginaLegal id="privacidad" titulo="Política de privacidad" texto="Cómo trataríamos tus datos personales conforme al RGPD y a la Ley Orgánica 3/2018 (LOPDGDD)." apartados={apartados} />;
  }

  /* ---------- Política de cookies ---------- */
  function Cookies() {
    const apartados = [
      {
        id: "pc-que", titulo: "Qué son las cookies",
        contenido: (
          <p>Las cookies y tecnologías similares (como el almacenamiento local del navegador) son pequeños archivos que una web guarda en tu dispositivo para recordar información entre visitas.</p>
        )
      },
      {
        id: "pc-cuales", titulo: "Cuáles utiliza esta web",
        contenido: (
          <React.Fragment>
            <Tabla
              cabeceras={["Nombre", "Tipo", "Finalidad", "Duración"]}
              filas={[
                ["corts-tema", "Técnica (almacenamiento local)", "Recordar si prefieres el tema claro u oscuro", "Hasta que la borres"],
                ["corts-cookies", "Técnica (almacenamiento local)", "Guardar tu elección sobre las cookies", "Hasta que la borres"],
                ["_ga, _ga_*", "Analítica (Google Analytics)", "Medir visitas de forma agregada. Solo con tu consentimiento. En esta web simulada no se instalan realmente.", "Hasta 2 años"]
              ]}
            />
            <p>Las cookies técnicas no requieren consentimiento. Las analíticas solo se activarían si las aceptas.</p>
          </React.Fragment>
        )
      },
      {
        id: "pc-terceros", titulo: "Servicios de terceros",
        contenido: (
          <p>Esta web carga tipografías de Google Fonts, imágenes de Unsplash y un mapa de OpenStreetMap. Al hacerlo, tu navegador se conecta a los servidores de esos proveedores, que pueden registrar datos técnicos como tu dirección IP según sus propias políticas.</p>
        )
      },
      {
        id: "pc-gestionar", titulo: "Cómo cambiar tu elección",
        contenido: (
          <React.Fragment>
            <p>Puedes modificar tu decisión en cualquier momento desde el panel de configuración:</p>
            <p><Boton variante="secundario" onClick={() => window.dispatchEvent(new Event("corts:cookies"))}>Configurar cookies</Boton></p>
            <p>También puedes borrar o bloquear las cookies desde los ajustes de tu navegador (Chrome, Firefox, Safari o Edge). Si las bloqueas todas, puede que la web no recuerde tus preferencias.</p>
          </React.Fragment>
        )
      },
      {
        id: "pc-norma", titulo: "Normativa",
        contenido: (
          <p>Esta política sigue el artículo 22.2 de la LSSI-CE, el RGPD y la Guía sobre el uso de las cookies de la Agencia Española de Protección de Datos.</p>
        )
      }
    ];
    return <PaginaLegal id="cookies" titulo="Política de cookies" texto="Qué se guarda en tu dispositivo cuando visitas esta web y cómo decidir sobre ello." apartados={apartados} />;
  }

  window.Pages["aviso-legal"] = AvisoLegal;
  window.Pages["privacidad"] = Privacidad;
  window.Pages["cookies"] = Cookies;
})();
