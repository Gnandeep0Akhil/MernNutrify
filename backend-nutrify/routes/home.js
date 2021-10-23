var express = require("express");
var router = express.Router();
var { updateUser, getUser } = require("../controllers/updateUser");
var { createMeal, updateMeal, updateMealProfile } = require("../controllers/addOne");
var { getMeals, getCalories, deleteMeal, tCalories } = require("../controllers/meals");

router.post("/profile", (req, res) => {
  getUser(req.body)
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/addOne", (req, res) => {
  var d = new Date();
  var y = d.getFullYear();
  var m = d.getMonth() + 1;
  var D = d.getDate();
  var date = parseInt(y + "" + m + "" + D);
  createMeal(req.body, req.body.sessionId, date)
    .then((value) => {
      res.json({
        addMealStatus: true,
        value: value
      });
    })
    .catch((err) => {
      res.json({ message: err.toString() });
    });
});

router.put("/updateProfile", (req, res) => {
  updateUser(req.body, req.body.sessionId)
    .then(() => {
      updateMealProfile(req.body.email, req.body.sessionId)
        .then(()=>{
          res.json({
            updateProfileStatus: true,
          });
        })
        .catch(()=>{
          res.json({ message: err.toString() });
        });
    })
    .catch((err) => {
      res.json({ message: err.toString() });
    });
});

router.put("/updateMeal", (req, res) => {
  updateMeal(req.body, req.body._id)
    .then(() => {
      res.json({
        editStatus: true,
      });
    })
    .catch((err) => {
      res.json({ message: err.toString() });
    });
});

router.post("/meals", (req, res) => {
  var date = req.body.date;
  var d = new Date(date);
  var y = d.getFullYear();
  var m = d.getMonth() + 1;
  var D = d.getDate();
  var query = parseInt(y + "" + m + "" + D);
  getMeals(query, req.body.sessionId)
    .then((value) => {
      getCalories(req.body.sessionId)
        .then((data) => {
          tCalories(value)
            .then((calories) => {
              res.json({
                value: value,
                data: data[0].calorie,
                calories: calories,
              });
            })
            .catch((err) => {
              res.send(err);
            });
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/deleteMeal", (req, res) => {
  deleteMeal(req.body._id)
    .then(() => {
      res.json({ deleteStatus: true });
    })
    .catch((err) => {
      res.json({ message: err.toString() });
    });
});

module.exports = router;
