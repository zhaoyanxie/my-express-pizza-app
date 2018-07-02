const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const PORT = 3000;
let pizzas = [
  { id: "1", name: "hawaiian pizza", price: 10 },
  { id: "2", name: "pepperoni pizza", price: 20 }
];

app.get("/", (req, res) => {
  res.send("Hello Pizza World!");
});

// GET all pizzas shown on /pizzas endpoint
app.get("/pizzas", (req, res) => {
  res.send(pizzas);
});

// GET the pizza with the corresponding id
app.get("/pizzas/:id", (req, res) => {
  const pizza = pizzas.filter(pizza => pizza.id === req.params.id);
  res.send(pizza);
});

// POST a new pizza
app.post("/pizzas", (req, res) => {
  pizzas = [...pizzas, req.body];
  res.send(pizzas);
});

// Update a pizza with the corresponding id
app.put("/pizzas/:id", (req, res) => {
  const id = Number(req.params.id);
  pizzas = [...pizzas.slice(0, id), req.body, ...pizzas.slice(id + 1)];
  res.send(pizzas);
});

// Delete a pizza
app.delete("/pizzas/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("id is", id);
  pizzas = [...pizzas.slice(0, id), ...pizzas.slice(id + 1)];
  res.send(`Pizza id: ${req.params.id} was deleted.`);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
