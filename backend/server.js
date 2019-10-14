/**
 * Questo è il codice server per fare support alle pagine web con url nascosto/crearizzato
 */
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    /**
     * API REST che simula la query string o meglio la ricrea in caso di call da parte dell'utente
     * actualPage è l'url main della pagina mentre in queryParamls i parametri necessari per il load
     * della pagina
     */
    server.get("/p/:id", (req, res) => {
      const actualPage = "/post";
      const queryParams = { title: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });
    server.get("/p2/:id", (req, res) => {
      const actualPage = "/post2";
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
