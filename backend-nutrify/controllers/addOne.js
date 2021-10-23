const { mealsModel } = require("../models/model");

const createMeal = function (meal, email, date) {
  return new Promise((resolve, reject) => {
    const newMeal = new mealsModel({
      userMail: email,
      mDate: date,
      mCalorie: meal.mCalorie,
      mType: meal.mType,
      mName: meal.mName,
      mDescription: meal.mDescription,
    });

    newMeal
      .save()
      .then((res) => {

        var myquery = { userMail: email, mDate: date, _id: res._id };
        var projection = { userMail: 0, mDate: 0, __v: 0 };

        mealsModel
          .find(myquery, projection)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.createMeal = createMeal;

const updateMeal = function (meal, id) {
  return new Promise((resolve, reject) => {
    var myquery = { _id: id };
    var newvalues = {
      $set: {
        mCalorie: meal.mCalorie,
        mType: meal.mType,
        mName: meal.mName,
        mDescription: meal.mDescription
      }
    };

    mealsModel
      .updateOne(myquery, newvalues)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.updateMeal = updateMeal;

const updateMealProfile = function (uEmail, qEmail) {
  return new Promise((resolve, reject) => {
    var myquery = { userMail: qEmail };
    var newvalues = {
      $set: {
        userMail: uEmail
      },
    };

    mealsModel
      .updateMany(myquery, newvalues)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.updateMealProfile = updateMealProfile;