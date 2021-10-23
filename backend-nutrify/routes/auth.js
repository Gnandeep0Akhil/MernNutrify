var express = require("express");
var router = express.Router();
var { createUser, verifyUser } = require("../controllers/auth");

router.post("/signin", (req, res) => {
  verifyUser(req.body, (err, user) => {
    if (err) {
      res.json({ message: err.toString() });
    } else {
      res.json({email: user.email});
    }
  });
});

router.post("/signup", (req, res) => {
  createUser(req.body)
    .then(() => {
      res.json({ signup: true });
    })
    .catch((err) => {
      res.json({ message: err.toString() });
    });
});

module.exports = router;