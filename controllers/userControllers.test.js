const request = require("supertest");
const app = require("../app");
const User = require("../models/userModel");

const testUser = {
  name: "test",
  email: "test@gmail.com",
  password: "123456",
};

let responseUser;
const setResponseUserCalBack = (user) => (responseUser = user);

// jest global lifecycle method, to run before each test case and for every test case
// beforeEach(async () => {
//   await User.deleteMany({}); // delete all data from User collection the database
//   await new User(testUser).save(); // adding new user to test login route
// });

test("Should signup a new user!", async () => {
  await User.deleteMany({}); // delete all data from User collection the database to avoid "already exists" error

  await request(app).post("/api/user").send(testUser).expect(201);
});

test("Should not signup new user with same email as existing user", async () => {
  await request(app).post("/api/user").send(testUser).expect(400);
});

// test("Should login existing user!", async () => {
//   await request(app)
//     .post("/api/user/login")
//     .send({
//       email: testUser.email,
//       password: testUser.password,
//     })
//     .expect(200);
// });

test("Should search for other users!", async () => {
  const response = await request(app)
    .post("/api/user/login")
    .send({
      email: testUser.email,
      password: testUser.password,
    })
    .expect(200);

  let user = response.body;

  await request(app)
    .get("/api/user?search=Monica")
    .set("Authorization", `Bearer ${response.body.token}`)
    .expect(200);
});

test("Should give error if not all data are given!", async () => {
  await request(app)
    .post("/api/user")
    .send({
      name: "test",
    })
    .expect(400);
});

test("Should not login if password is incorrect!", async () => {
  const response = await request(app)
    .post("/api/user/login")
    .send({
      email: testUser.email,
      password: "incorrect password",
    })
    .expect(401);
});

// test("should delete user!", async () => {
//   const response = await request(app)
//     .post("/api/user")
//     .send(testUser)
//     .expect(201);

//   const user = response.body;
//   await request(app)
//     .delete("/api/user/" + user._id)
//     .set("Authorization", `Bearer ${user.token}`)
//     .expect(200);
// });
