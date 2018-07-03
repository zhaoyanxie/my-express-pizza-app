const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const indexRouter = require("./routes/indexRouter");
const pizzaRouter = require("./routes/pizzaRouter");
app.use(bodyParser.json());

app.use("/", indexRouter);

app.use("/pizzas", pizzaRouter);

module.exports = app;
