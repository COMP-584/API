const request = require("supertest");
const express = require("express");

const app = express();

app.post("/api/user", function (req, res) {
  res.status(201).json({
    _id: "6344ab15a4d9d6594ff6fe06",
    name: "test user",
    email: "test@test.com",
    isAdmin: false,
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    token:
      "eyJhbGciOiJIUzI1NiIsdfdfdfdfdkpXVCJ9.eyJpZCI6IjYzNDRhYjE1YTRkOWQ2NTk0ZmY2ZmUwNiIsImlhdCI6MTY2NTQ0NDYyOSwiZXhwIjoxNjY4MDM2NjI5fQ.KmbAIEQOf8RoZkDBRrn7I_el42Gw3VxGBw8Do55zuLg",
  });
});

request(app)
  .get("/user")
  .expect("Content-Type", /json/)
  .expect("Content-Length", "15")
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });
