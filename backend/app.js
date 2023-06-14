const express = require("express");

const MySqlHandler = require("./services/mysql/mysqlModule.js");

const app = express();
const RoutesFiguras = require('./routes/figura.js')

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/mysql", (req, res) => {
  const mysqlClass = new MySqlHandler();

  mysqlClass.getAllData((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

