const request = require("supertest");
const app = require("../app");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const testUser = {
  name: "test",
  email: "test@gmail.com",
  password: "123456",
};

const testUse2 = {
  name: "test2",
  email: "test2@gmail.com",
  password: "123456",
};

const testUser3 = {
  name: "test3",
  email: "test3@gmail.com",
  password: "123456",
};

// test("Should signup a new user!", async () => {
//   await User.deleteMany({}); // delete all data from User collection the database to avoid "already exists" error

//   await request(app).post("/api/user").send(testUser).expect(201);
// });

test("Should create new chat", async () => {
  await User.deleteMany({}); // delete all data from User collection the database to avoid "already exists" error
  let res1 = await request(app).post("/api/user").send(testUser).expect(201);
  let res2 = await request(app).post("/api/user").send(testUser2).expect(201);
  let res3 = await request(app).post("/api/user").send(testUser3).expect(201);

  let user1 = res1.body;
  let user2 = res2.body;
  let user3 = res3.body;

  await request(app)
    .post("/api/chat/group")
    .send({ user: user1, users: [user1, user2, user3], name: "test group" })
    .expect(201);
});
