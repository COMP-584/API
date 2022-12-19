const request = require("supertest");
const app = require("../app");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const testUser = {name: "test11112333",email: "test111111@gmail.com",password: "123456"};
const testUser2 = {name: "test2333333",email: "test3332@gmail.com",password: "123456"};
const testUser3 = {name: "test3333333", email: "test3333333@gmail.com",password: "123456"};

test("send new message to new user", async () => {
  await User.deleteMany({}); // delete all data from User collection the database to avoid "already exists" error
  let res1 = await request(app).post("/api/user").send(testUser).expect(201);
  let res2 = await request(app).post("/api/user").send(testUser2).expect(201);
  let user1 = res1.body; let user2 = res2.body;
  const chat = await Chat.create({
    users: [user1._id, user2._id],
    latestMessage: null,
  });
  await request(app)
    .post("/api/message")
    .send({content: "test message",chatId: chat._id}).set("Authorization", `Bearer ${user1.token}`).expect(200);
});

test("Should fetch all messages for a chat", async () => {
  const user1 = await request(app)
    .post("/api/user/login")
    .send({email: testUser.email,password: testUser.password}).expect(200);

  const chat = await Chat.findOne({ users: user1.body._id });
  await request(app)
    .get(`/api/message/${chat._id}`).set("Authorization", `Bearer ${user1.body.token}`).expect(200);
});
test("Should get error for not having Token", async () => {
  const user1 = await request(app)
    .post("/api/user/login")
    .send({
      email: testUser.email,
      password: testUser.password,
    }).expect(200);
  const chat = await Chat.findOne({ users: user1.body._id });
  await request(app).get(`/api/message/${chat._id}`).expect(401);
});

test("Should get error for not having Valid Token", async () => {
  const user1 = await request(app)
    .post("/api/user/login")
    .send({
      email: testUser.email,
      password: testUser.password,
    }).expect(200);
  const chat = await Chat.findOne({ users: user1.body._id });
  await request(app)
    .get(`/api/message/${chat._id}`)
    .set("Authorization",
      `Bearer "eyhhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODJjOGQyM2UxNWM1NmMzYWU5N2FkNSIsImlhdCI6MTY3MTQzNzcwMSwiZXhwIjoxNjc0MDI5NzAxfQ.Fli2K_TUEZcwxwq0dYCE06FjqnGOcljuvyS6ADmsQJo"`
    ).expect(401);
});

test("Should give error is invalid chat id provided!", async () => {
  const user1 = await request(app)
    .post("/api/user/login")
    .send({
      email: testUser.email,
      password: testUser.password,
    })
    .expect(200);
  await request(app)
    .get(`/api/message/6383013320g44330ecc38c4c`) // invalid chat id
    .set("Authorization", `Bearer ${user1.body.token}`).expect(400);
});

test("Should get error for not having all data for message!", async () => {
  const user1 = await request(app)
    .post("/api/user/login")
    .send({email: testUser.email, password: testUser.password })
    .expect(200);
  const chat = await Chat.findOne({ users: user1.body._id });
  await request(app)
    .post(`/api/message/`)
    .set("Authorization", `Bearer ${user1.body.token}`)
    .send({})
    .expect(400);
});