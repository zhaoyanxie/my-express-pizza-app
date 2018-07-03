const express = require("express");
const router = express.Router();

let pizzas = [
  { id: "1", name: "hawaiian pizza", price: 10 },
  { id: "2", name: "pepperoni pizza", price: 20 }
];

// GET all pizzas shown on /pizzas endpoint
router.get("/", (req, res) => {
  res.json(pizzas);
});

// GET the pizza with the corresponding id
router.get("/:id", (req, res) => {
  const pizza = pizzas.filter(pizza => pizza.id === req.params.id);
  res.json(pizza[0]);
});

// POST a new pizza
router.post("/", (req, res) => {
  pizzas = [...pizzas, req.body];
  res.json(pizzas);
});

findPizzaById = id => pizzas.find(pizza => pizza.id === id);

// Update a pizza with the corresponding id
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  const targetPizza = findPizzaById(req.params.id);
  const targetPizzaIndex = pizzas.indexOf(targetPizza);
  pizzas = [
    ...pizzas.slice(0, targetPizzaIndex),
    ...pizzas.slice(targetPizzaIndex + 1)
  ];
  res.json(`Pizza id: ${req.params.id} was deleted.`);
});

module.exports = router;
