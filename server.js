const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models/index.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const controllers = require('./app/controllers/sample.controller');

const app = express();
var corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ 
    message: `It's working! 🙌`
  });
});

app.get("/get-all-things", (req, res) => {
  controllers.findAllThings(req, res);
});
 
app.get("/get-thing/:id", (req, res) => {
  controllers.findOneThing(req, res);
});

app.post('/add-thing', (req, res) => {
  controllers.addOneThing(req, res);
});

app.post("/update-thing/:id", (req, res) => {
  controllers.updateOneThing(req, res);
});

app.post("/delete-thing/:id", (req, res) => {
  controllers.deleteOneThing(req, res);
});

app.post("/delete-all-things", (req, res) => {
  controllers.deleteAllThings(req, res);
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Port: ${PORT} ✅`);
});

db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB ✅");
})
.catch(err => {
  console.log("MongoDB ❌", err);
  process.exit();
});