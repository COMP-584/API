const mongoose = require("mongoose");
const mongoDB = "not working URI for testing";
// const mongoDB = process.env.MONGO_URI;

//Set up default mongoose connection

test("testing db to fail", async () => {
  expect("e").toqMatch("e");
  //   expect.assertions(1);
  //   try {
  //     await mongoose.connect(mongoDB);
  //   } catch (error) {
  //     expect(error).toMatch(
  //       'Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://'
  //     );
  //   }
});
