const express = require("express");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const { default: axios } = require("axios");
const puppeteer = require("puppeteer");

const app = express();

app.use(cors());
app.use(express.json());

// app.post("/weather", (req, rest, next) => {
//   https.get("https://rb.gy/hno3", (res) => {
//     const path = `${__dirname}/files/weather.json`;
//     const filepath = fs.createWriteStream(path);
//     res.pipe(filepath);
//     filepath.on("finish", () => {
//       filepath.close();
//       console.log("downloaded");
//       rest.send("okk");
//     });
//   });
// });

app.post("/weather", async (req, res, next) => {
  console.log("run");
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const response = await page.goto("https://rb.gy/hno3");

    const data = response.request().redirectChain();

    await browser.close();

    res.send({ url: data[1].url() });
  } catch (error) {
    console.log(error?.response);
    res.send(error);
  }
});

app.listen(8000, () => {
  console.log("server is listen on port 8000");
});
