const app = require("./app");
const mongoose = require("mongoose");

const { HOST = 8080, MONGO_URL } = process.env;

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
