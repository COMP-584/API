const request = require("supertest");
const app = require("../app");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const testUser = {
  name: "test",
  email: "test@gmail.com",
  password: "123456",
};

// test("Should signup a new user!", async () => {
//   await User.deleteMany({}); // delete all data from User collection the database to avoid "already exists" error

//   await request(app).post("/api/user").send(testUser).expect(201);
// });

// test("Should send new message in chat", async () => {

// })
