require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./utils/db");
const AuthRoutes = require("./Routes/AuthRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(AuthRoutes);

db().then(() => {
  app.listen(8000, () => {
    console.log("server listen on port 8000");
  });
});
