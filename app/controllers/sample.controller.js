const db = require('../models');
const things = db.things;

// Create and Save a new thing
exports.addSomeThing = (req, res) => {
    const thing = new things(req.body);
    try {
        thing.save()
        .then(result => {
            if (result.length != 0) {
                res.status(200).send(result);
            } else {
                res.status(400).send('❎ Could not add the thing');
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

// Retrieve all things from the database
exports.findAllThings = (req, res) => {
    try {
        things.find().then(result => {
            if (result.length != 0) {
                res.status(200).send(result);
            } else {
                res.status(400).send('❎ No things to show');
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

// Find a single thing with an id
exports.findOneThing = (req, res) => {
    try {
        things.findById(req.params.id).then(result => {
            if (result.length != 0) {
                res.status(200).send(result);
            } else {
                res.status(400).send('❎ Could not find the thing');
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

// Update a thing by the id in the request
exports.updateOneThing = (req, res) => {
    try {
        things.findByIdAndUpdate(req.params.id, req.body).then(result => {
            if (result.length != 0) {
                res.status(200).send(result);
            } else {
                res.status(400).send('❎ Could not update the thing');
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete a thing with the specified id in the request
exports.deleteOneThing = (req, res) => {
    try {
        things.findByIdAndDelete(req.params.id).then(result => {
            if (result.length != 0) {
                res.status(200).send(result);
            } else {
                res.status(400).send('❎ Could not delete the thing');
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete all things from the database
exports.deleteAllThings = (req, res) => {
    try {
        things.deleteMany().then(result => {
            if (result.length != 0) {
                if (result.acknowledged === true) {
                    res.status(200).send(result);
                }
            } else {
                res.status(400).send('❎ Could not delete the thing');
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
};