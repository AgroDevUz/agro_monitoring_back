// Importing mongoose
const mongoose = require('mongoose');

// Calling mongoose schema
const Schema = mongoose.Schema;

// Creating things schema
const thingsSchema = new Schema({
	"property": {
		type: String,
		required: true,
	},
}, { timestamps: true });

const Thing = mongoose.model('Thing', thingsSchema);

// export default Thing;

module.exports = Thing;