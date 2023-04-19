const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models/index.js");
const morgan = require("morgan");

// const fs = require("fs");
// const readXlsxFile = require("read-excel-file/node");
// const axios = require("axios");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const controllers = require("./app/controllers/table.controller");

const app = express();
var corsOptions = {
  origin: process.env.front_end_url
};
app.use(cors(corsOptions));

// set up route logger tools
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(`${Date(Date.now())}`);
  next();
})

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// const files = fs.readdirSync("./app/data/tables", (err) => {
//   if (err) throw err;
// });

// const table_files = [];
// for (let x = 1; x < files.length; x++) {
//   if (x != 5 && x != 18) {
//     table_files[x] = (fs.readdirSync("./app/data/tables/" + x, (err) => {
//       if(err) throw err
//     }));
//   }
// }

// const tables = [];
// const func = async () => {
//   for (let x = 1; x < files.length; x++) {
//     if (x != 5 && x != 18) {
//       for (let y in table_files[x]) {
//         await tables.push({
//           "name": table_files[x][y].split(".xlsx")[0],
//           "tables": await readXlsxFile(fs.readFileSync("./app/data/tables/" + x + "/" + table_files[x][y]))
//           .then(async rows => {
//             return rows;
//           }),
//           "parent": x,
//         })
//       }
//     }
//   }
// };

// const start = () => {
//   return func();
// }

app.get("/", (req, res) => {
  res.json({ 
    message: `It's working! 🙌`
  });
});
 
app.get("/get-table/:id", (req, res) => {
  controllers.findOneTable(req, res);
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

// (async() => {
//   await start();  
//   // console.log(tables);
//   for (let x in tables) {
//     for (let y in tables[x]) {
//       // console.log(y);
//       // console.log(tables[x]["table"]);
//     }
//     // axios.post("http://127.0.0.1:5050/add-table", tables[x])
//     // .then(res => {
//     //   console.log(res);
//     // });
//   }
// })();