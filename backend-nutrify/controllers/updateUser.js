var bcrypt = require("bcrypt");
const { usersModel } = require("../models/model");

const updateUser = function (user, email) {
  return new Promise((resolve, reject) => {
    var myquery = { email: email };
    var newvalues;
    if(user.password){
      newvalues = {
        $set: {
          email: user.email,
          password: bcrypt.hashSync(user.password, 10),
          calorie: user.calorie,
        },
      };
    } else{
      newvalues = {
        $set: {
          email: user.email,
          calorie: user.calorie,
        },
      };
    }

    usersModel
      .updateOne(myquery, newvalues)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.updateUser = updateUser;

const getUser = function (user) {
  return new Promise((resolve, reject) => {
    
    var myquery = { email: user.sessionId };
    var projection = { password: 0, _id: 0, __v: 0 };

    usersModel
      .find(myquery, projection)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.getUser = getUser;