const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models/index.js");
const morgan = require('morgan')

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const controllers = require('./app/controllers/table.controller');

const app = express();
var corsOptions = {
  origin: process.env.front_end_url
};
app.use(cors(corsOptions));

// set up route logger tools
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log(`${Date(Date.now())}`);
  next();
})

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ 
    message: `It's working! 🙌`
  });
});

app.get("/get-all-tables", (req, res) => {
  controllers.findAllTables(req, res);
});
 
app.get("/get-table/:id", (req, res) => {
  controllers.findOneTable(req, res);
});

app.post('/add-table', (req, res) => {
  controllers.addOneTable(req, res);
});

app.post("/update-table/:id", (req, res) => {
  controllers.updateOneTable(req, res);
});

app.post("/delete-table/:id", (req, res) => {
  controllers.deleteOneTable(req, res);
});

app.post("/delete-all-tables", (req, res) => {
  controllers.deleteAllTables(req, res);
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