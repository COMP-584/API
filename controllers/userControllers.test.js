const request = require("supertest");
const app = require("../app");

// test("Should signup a new user!", async () => {
//   await request(app)
//     .post("/api/user")
//     .send({
//       name: "testCseUser",
//       email: "testcaseuser@ex.com",
//       password: "testcaseuser",
//     })
//     .expect(201);
// });

test("Should login existing user!", async () => {
  await request(app)
    .post("/api/user/login")
    .send({
      email: "testcaseuser@ex.com",
      password: "testcaseuser",
    })
    .expect(200);
});

test("Should not login non existing user!", async () => {
  await request(app)
    .post("/api/user/login")
    .send({
      email: "",
      password: "testcaseuser",
    })
    .expect(401);
});

test("Should get profile for user!", async () => {
  await request(app)
    .get("/api/user")
    .set("Authorization", "Bearer ")
    .send()
    .expect(401);
});

test("Should not get profile for user!", async () => {
  await request(app).get("/api/user").send().expect(401);
});

// test("Should update profile for user!", async () => {
//   await request(app)
//     .put("/api/user")
//     .set("Authorization", "Bearer")
//     .send({
//       name: "testCseUser",
//       email: "testcaseuser@ex.com",
//       password: "testcaseuser",
//     })
//     .expect(401);
// });


// test("Should not update profile for unauthenticated user!", async () => {
//   await request(app)
//     .put("/api/user")
//     .send({
//       name: "testCseUser",
//       email: "",
//       password: "testcaseuser",
//     })
//     .expect(401);
// });


// test("Should not update profile for wrong user!", async () => {
//   await request(app)
//     .put("/api/user")
//     .set("Authorization", "Bearer")
//     .send({
//       name: "testCseUser",
//       email: "",
//       password: "testcaseuser",
//     })
//     .expect(401);
// });

