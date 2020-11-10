require("dotenv").config();
const mongoose = require("mongoose");

const password = process.env.DB_PASSWORD;
const dbname = "younote-db";
const URI = `mongodb+srv://younote-admin:${password}@younote-api.cwpws.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

function connect() {
  mongoose.connect(URI, options);

  mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB");
  });
  
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
}

module.exports = { connect };
