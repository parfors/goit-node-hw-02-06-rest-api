const app = require("./app");
const mongoose = require("mongoose");

const { HOST, MONGO_URL = 8080 } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(
    app.listen(HOST, () => {
      console.log("Database connection successful. Use API on port: 8080");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
