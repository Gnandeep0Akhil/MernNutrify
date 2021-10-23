require("dotenv").config();

var url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/nutrifyUsers?retryWrites=true&w=majority`;

const dbClient = require("mongoose");

dbClient
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to database!");
  })
  .catch((err) => {
    console.log("Error connecting to database: ", err);
  });

module.exports = dbClient;