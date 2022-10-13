const request = require("supertest");
const app = require("../app");

test("Should signup a new user!", async () => {
  await request(app)
    .post("/api/user")
    .send({
      name: "testCseUser",
      email: "testcaseuser@ex.com",
      password: "testcaseuser",
    })
    .expect(201);
});
