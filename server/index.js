require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./utils/db");
const AuthRoutes = require("./Routes/AuthRoutes");
const Errorhandler = require("./utils/Errorhandler");
const PrivateRoutes = require("./Routes/PrivateRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", AuthRoutes);
app.use("/api", PrivateRoutes);
app.use("/api/*", (req, res, next) => {
  return res.status(404).send({
    staus: false,
    message: "No route match",
  });
});

app.use(Errorhandler);

db().then(() => {
  app.listen(8000, () => {
    console.log("server listen on port 8000");
  });
});
