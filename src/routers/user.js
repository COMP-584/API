const express = require("express");

const router = new express.Router();

//
// user account related routes
//

// signup user
router.post("/user/signup", async (req, res) => {
  // const user = new User(req.body)
  // try {
  //     await user.save()
  //     res.status(201).send(user)
  // } catch(error) {
  //     res.status(400).send(error)
  // }
});

module.exports = router;
