const express = require("express");

const app = express();

const port = 9090;
const portFront = 3000;

const RoutesFiguras = require('./routes/figura.routes')
const RoutesTransformacoes = require('./routes/transformações.routes')

//ativa CORS para possibilitar usar servidor e fron-end na mesma maquina
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", `http://localhost:${portFront}`);
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
app.use(RoutesTransformacoes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
