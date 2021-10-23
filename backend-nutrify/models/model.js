var dbClient = require("../dBconnect/connect");
const { Schema } = require("mongoose");

var usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  calorie: Number,
});

const usersModel = dbClient.model("user", usersSchema);

module.exports.usersModel = usersModel;

var mealsSchema = new Schema({
  userMail: String,
  mDate: Number,
  mCalorie: Number,
  mType: String,
  mName: String,
  mDescription: String,
});

const mealsModel = dbClient.model("meal", mealsSchema);

module.exports.mealsModel = mealsModel;