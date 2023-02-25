const db = require("../models");
const tables = db.tables;
const fs = require("fs");

// Create and Save a new table
exports.addOneTable = (req, res) => {
    const table = new tables(req.body);
    try {
        table.save()
        .then(result => {
            if (result.length != 0) {
                res.status(200).send(result);
            } else {
                res.status(400).send("❎ Could not add the table");
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

// exports.getMenuItems = (req, res) => {
//     try {
//         const menu_items = JSON.parse(fs.readFileSync("./app/data/menu_items/menu_items.json"));
//         res.status(200).send(menu_items)
//     } catch (err) {
//         res.status(400).send(err);
//     }
// }

// Retrieve all tables from the database
exports.findAllTables = (req, res) => {
    try {
        tables.find().then(result => {
            if (result.length != 0) {
                res.status(200).send(result);
            } else {
                res.status(400).send("❎ No tables to show");
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

// Find a single table with an id in the request
exports.findOneTable = (req, res) => {
    try {
        tables.find({ "parent": req.params.id }).then(result => {
            if (result.length != 0) {
                res.status(200).send(result);
            } else {
                res.status(400).send("❎ Could not find the table");
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

// Update a table by the id in the request
exports.updateOneTable = (req, res) => {
    try {
        tables.findOneAndUpdate({ "id": req.params.id }, req.body).then(result => {
            if (result.length != 0) {
                res.status(200).send(result);
            } else {
                res.status(400).send("❎ Could not update the table");
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete a table with the specified id in the request
exports.deleteOneTable = (req, res) => {
    try {
        tables.findOneAndDelete({ "id": req.params.id }).then(result => {
            if (result.length != 0) {
                res.status(200).send(result);
            } else {
                res.status(400).send("❎ Could not delete the table");
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete all tables from the database
exports.deleteAllTables = (req, res) => {
    try {
        tables.deleteMany().then(result => {
            if (result.length != 0) {
                if (result.acknowledged === true) {
                    res.status(200).send(result);
                }
            } else {
                res.status(400).send("❎ Could not delete the table");
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
};