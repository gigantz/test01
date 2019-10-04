const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("dist"));
app.get("/", (req, res) => {
  res.sendFile("index.html");
  res.end();
});

app.post("/save/:score", (req, res) => {
  const { score } = req.params;
  fs.readFile("./store.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    const customers = JSON.parse(jsonString || []);
    fs.writeFile(
      "store.json",
      JSON.stringify([...new Set([...customers, parseInt(score, 10)])]),
      "utf8",
      () => {
        console.log("done");
      }
    );
  });
  res.end();
});

app.get("/list", (req, res) => {
  fs.readFile("./store.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    res.send(JSON.parse(jsonString).sort((a, b) => b - a));
  });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
