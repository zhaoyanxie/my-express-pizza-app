const request = require("supertest");
const app = require("../app");

test("GET / should return 'hello pizza world'", async () => {
  const response = await request(app).get("/");
  expect(response.status).toEqual(200);
  expect(response.body).toEqual("Hello Pizza World!");
});

test("GET /pizzas should return an array of two pizza objects", async () => {
  const response = await request(app).get("/pizzas");
  const TEST_DATA = [
    { id: "1", name: "hawaiian pizza", price: 10 },
    { id: "2", name: "pepperoni pizza", price: 20 }
  ];
  expect(response.status).toEqual(200);
  expect(Array.isArray(response.body)).toEqual(true);
  expect(response.body).toEqual(TEST_DATA);
});

test("GET /pizzas/:id should an object of  pizza", async () => {
  const response = await request(app).get("/pizzas/1");
  expect(response.status).toEqual(200);
  expect(response.body).toMatchObject({
    id: "1",
    name: "hawaiian pizza",
    price: 10
  });
});

test("POST /pizzas should return objects of two pizzas", async () => {
  const TEST_DATA = {
    id: "3",
    name: "parma ham pizza",
    price: 30
  };

  const initialData = await request(app).get("/pizzas");

  const response = await request(app)
    .post("/pizzas")
    .send(TEST_DATA);
  expect(response.status).toEqual(200);
  expect(response.body).toMatchObject([...initialData.body, TEST_DATA]);
});

test("PUT /pizzas/1 should update a pizza of id 1", async () => {
  const TEST_DATA = {
    name: "newer pizza",
    price: 300
  };

  const initialData = await request(app).get("/pizzas/1");
  const response = await request(app)
    .put("/pizzas/1")
    .send(TEST_DATA);
  expect(response.status).toEqual(200);
  console.log("here-->", response.body);
  expect(response.body[0]).toEqual({ ...initialData.body, ...TEST_DATA });
});

test('DELETE /pizzas/1 should delete pizza of id 1', async () => {
  const response = await request(app)
    .delete("/pizzas/1")
  expect(response.body).toBe("Pizza id: 1 was deleted.");
})
