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
  name: "test2",
  email: "test2@gmail.com",
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

test("Should fetch all chats for a user", async () => {
  const user1 = await request(app)
    .post("/api/user/login")
    .send({
      email: testUser.email,
      password: testUser.password,
    })
    .expect(200);

  await request(app)
    .get("/api/chat")
    .set("Authorization", `Bearer ${user1.body.token}`)
    .expect(200);
});

test("Should send message to a chat", async () => {
  const user1 = await request(app)
    .post("/api/user/login")
    .send({
      email: testUser.email,
      password: testUser.password,
    })
    .expect(200);

  const chat = await Chat.findOne({ users: user1.body._id });

  console.log("chat", chat);

  await request(app)
    .post("/api/chat/")
    .set("Authorization", `Bearer ${user1.body.token}`)
    .send({ message: "test message", userId: user1.body._id })
    .expect(200);
});

test("Should fetch all messages for a chat", async () => {
  const user1 = await request(app)
    .post("/api/user/login")
    .send({
      email: testUser.email,
      password: testUser.password,
    })
    .expect(200);

  const chat = await Chat.find({
    users: { $elemMatch: { $eq: user1.body._id } },
  });

  await request(app)
    .get("/api/chat/")
    .set("Authorization", `Bearer ${user1.body.token}`)
    .expect(200);
});

test("Should rename a group", async () => {
  const user1 = await request(app)
    .post("/api/user/login")
    .send({
      email: testUser.email,
      password: testUser.password,
    })
    .expect(200);

  const chat = await Chat.findOne({
    users: { $elemMatch: { $eq: user1.body._id } },
  });
  console.log("chat", chat);
  await request(app)
    .put("/api/chat/rename")
    .set("Authorization", `Bearer ${user1.body.token}`)
    .send({ chatId: chat._id, chatName: "new name" })
    .expect(200);
});


test("Should add a user to a group", async () => {
  const user1 = await request(app)
    .post("/api/user/login")
    .send({
      email: testUser.email,
      password: testUser.password,
    })
    .expect(200);

  const chat = await Chat.findOne({
    users: { $elemMatch: { $eq: user1.body._id } },
  });
  console.log("chat", chat);
  await request(app)
    .put("/api/chat/groupadd")
    .set("Authorization", `Bearer ${user1.body.token}`)
    .send({ chatId: chat._id, userId: user1.body._id })
    .expect(200);
});

test("Should remove a user from a group", async () => {
  const user1 = await request(app)
    .post("/api/user/login")
    .send({
      email: testUser.email,
      password: testUser.password,
    })
    .expect(200);

  const chat = await Chat.findOne({
    users: { $elemMatch: { $eq: user1.body._id } },
  });
  console.log("chat", chat);
  await request(app)
    .put("/api/chat/groupremove")
    .set("Authorization", `Bearer ${user1.body.token}`)
    .send({ chatId: chat._id, userId: user1.body._id })
    .expect(200);
});
