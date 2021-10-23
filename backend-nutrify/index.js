const express = require("express");
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

var authRouter = require("./routes/auth");
app.use("/auth", authRouter);

var homeRouter = require("./routes/home");
app.use("/home", homeRouter);

app.listen(port, () => {
  console.log("Listining to port:", port);
});