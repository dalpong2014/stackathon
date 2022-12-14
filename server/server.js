const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

app.use(require("./routes/record.js"));
// get driver connection
const dbo = require("./db/conn");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running");
  });
}

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
