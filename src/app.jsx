/* Aplicación: enrutador por hash + tema claro/oscuro */
(function () {
  const { useState, useEffect } = React;
  const { useHashRoute, Navbar, Footer, PageHero, Boton } = window.UI;

  function NoEncontrada() {
    return (
      <PageHero sobretitulo="Error 404" titulo="Esta página no existe" texto="Puede que el enlace esté roto o que la sección haya cambiado de sitio.">
        <Boton a="#/inicio">Volver al inicio</Boton>
      </PageHero>
    );
  }

  function App() {
    const ruta = useHashRoute();
    const [tema, setTema] = useState(() => {
      try { return localStorage.getItem("corts-tema") || "claro"; } catch (e) { return "claro"; }
    });

    useEffect(() => {
      document.documentElement.setAttribute("data-theme", tema);
      try { localStorage.setItem("corts-tema", tema); } catch (e) {}
    }, [tema]);

    useEffect(() => {
      const r = window.SITE.rutas.find((x) => x.id === ruta);
      document.title = (r ? r.etiqueta + " · " : "") + window.SITE.nombre;
    }, [ruta]);

    const Pagina = window.Pages[ruta] || NoEncontrada;

    return (
      <React.Fragment>
        <a className="saltar" href="#contenido">Saltar al contenido</a>
        <Navbar ruta={ruta} tema={tema} alternarTema={() => setTema(tema === "claro" ? "oscuro" : "claro")} />
        <main id="contenido" key={ruta} className="pagina">
          <Pagina />
        </main>
        <Footer />
      </React.Fragment>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
