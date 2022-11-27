const request = require("supertest");
const app = require("../app");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const testUser = {
  name: "test1111",
  email: "test1111@gmail.com",
  password: "123456",
};

const testUser2 = {
<<<<<<< HEAD
  name: "test2333",
  email: "test2333@gmail.com",
=======
  name: "test2",
  email: "test2@gmail.com",
>>>>>>> bce4fbc7e3c1d2d66787aff7380cc6435ecf0f22
  password: "123456",
};

const testUser3 = {
  name: "test3333",
  email: "test33333@gmail.com",
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
  // console.log(user1);
  // req.user = user1;

  await request(app)
    .post("/api/chat/group")
    .set("Authorization", `Bearer ${user1.token}`)
    .send({ user: user1, users: [user2._id, user3._id], name: "test group" })
    .expect(200);
});


