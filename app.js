const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
// const PORT = process.env.PORT || 3000;

let pizzas = [
  { id: "1", name: "hawaiian pizza", price: 10 },
  { id: "2", name: "pepperoni pizza", price: 20 }
];

app.get("/", (req, res) => {
  res.json("Hello Pizza World!");
});

// GET all pizzas shown on /pizzas endpoint
app.get("/pizzas", (req, res) => {
  res.json(pizzas);
});

// GET the pizza with the corresponding id
app.get("/pizzas/:id", (req, res) => {
  const pizza = pizzas.filter(pizza => pizza.id === req.params.id);
  res.json(pizza[0]);
});

// POST a new pizza
app.post("/pizzas", (req, res) => {
  pizzas = [...pizzas, req.body];
  res.json(pizzas);
});

findPizzaById = id => pizzas.find(pizza => pizza.id === id);

// Update a pizza with the corresponding id
app.put("/pizzas/:id", (req, res) => {
  const targetPizza = findPizzaById(req.params.id);
  const targetPizzaIndex = pizzas.indexOf(targetPizza);
  const updatedPizza = { ...targetPizza, ...req.body };
  pizzas = [
    ...pizzas.slice(0, targetPizzaIndex),
    updatedPizza,
    ...pizzas.slice(targetPizzaIndex + 1)
  ];
  res.json(pizzas);
});

// Delete a pizza
app.delete("/pizzas/:id", (req, res) => {
  const targetPizza = findPizzaById(req.params.id);
  const targetPizzaIndex = pizzas.indexOf(targetPizza);
  pizzas = [
    ...pizzas.slice(0, targetPizzaIndex),
    ...pizzas.slice(targetPizzaIndex + 1)
  ];
  res.json(`Pizza id: ${req.params.id} was deleted.`);
});

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}...`);
// });

module.exports = app;
