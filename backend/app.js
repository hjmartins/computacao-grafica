const express = require("express");

const app = express();
const RoutesFiguras = require('./routes/figura.routes')
const RoutesTransformacoesFiguras = require('./routes/transformaçõesFiguras.routes')
const RoutesFiltros = require('./routes/filtros.routes')
const RoutesOperadoresMorfologicos = require('./routes/operadoresMorfologicos.routes')
const RoutesTransformacoesImagens = require('./routes/transformacaoImagem.routes')

//ativa CORS para possibilitar usar servidor e fron-end na mesma maquina
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use(RoutesFiguras);
app.use(RoutesTransformacoesFiguras);
app.use(RoutesFiltros);
app.use(RoutesOperadoresMorfologicos);
app.use(RoutesTransformacoesImagens);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
