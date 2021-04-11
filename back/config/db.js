const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("DB CONNECT!!"))
  .catch((e) => console.log("DB NO CONNECT ERROR"));


