var bcrypt = require("bcrypt");
const { usersModel } = require("../models/model");

const createUser = function (user) {
  return new Promise((resolve, reject) => {
    const newUser = new usersModel({
      email: user.email,
      password: bcrypt.hashSync(user.password, 10),
      calorie: user.calories,
    });

    newUser
      .save()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.createUser = createUser;

const verifyUser = function (user, callback) {
  usersModel.findOne(
    {
      email: user.email,
    },
    (err, dbUser) => {
      if (err) {
        callback(err);
      } else {
        if (dbUser) {
          const isPasswordMatched = bcrypt.compareSync(
            user.password,
            dbUser.password
          );
          if (isPasswordMatched) {
            callback(null, dbUser);
          } else {
            callback("Please verify the credentials provided!");
          }
        } else {
          callback("User not found. Please sign up!");
        }
      }
    }
  );
};

module.exports.verifyUser = verifyUser;
