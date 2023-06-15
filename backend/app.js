const express = require("express");

const MySqlHandler = require("./services/mysql/mysqlModule.js");

const app = express();
const RoutesFiguras = require('./routes/figura.routes')
const RoutesTransformacoes = require('./routes/transformações.routes')

app.get("/", (req, res) => {
  res.send("Server is working");
});

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

app.use(RoutesFiguras);
app.use(RoutesTransformacoes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
