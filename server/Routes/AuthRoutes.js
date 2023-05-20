const AuthRoutes = require("express").Router();

AuthRoutes.route("/sign-in").post((req, res, next) => {
  res.send("okk");
});

module.exports = AuthRoutes;
