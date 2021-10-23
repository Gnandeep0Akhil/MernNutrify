const { mealsModel, usersModel } = require("../models/model");

const getMeals = function (date, qParam) {
  return new Promise((resolve, reject) => {
    var myquery = { userMail: qParam, mDate: date };
    var projection = { userMail: 0, mDate: 0, __v: 0 };

    mealsModel
      .find(myquery, projection)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.getMeals = getMeals;

const getCalories = function (qParam) {
  return new Promise((resolve, reject) => {
    var myquery = { email: qParam };
    var projection = { email: 0, password: 0, _id: 0, __v: 0 };

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

module.exports.getCalories = getCalories;

const deleteMeal = function (data) {
  return new Promise((resolve, reject) => {
    var myquery = { _id: data };

    mealsModel
      .deleteOne(myquery)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.deleteMeal = deleteMeal;

const tCalories = function (data) {
  return new Promise((resolve, reject) => {
    var calories = 0;
    data.forEach((element) => {
      calories = calories + element.mCalorie;
    });
    resolve(calories);
  });
};

module.exports.tCalories = tCalories;
