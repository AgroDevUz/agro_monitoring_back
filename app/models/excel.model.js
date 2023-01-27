// Importing mongoose
const mongoose = require('mongoose');

// Calling mongoose schema
const Schema = mongoose.Schema;

// Creating schema for tables
const tablesSchema = new Schema({
	"id": {
		type: String,
		required: true,
		unique: true,
	},
	"name": {
		type: String,
		required: true,
	},
	"rows": {
		type: Array,
		required: true,
	},
}, { timestamps: true });

const Table = mongoose.model('Table', tablesSchema);

// export default Table;
module.exports = Table;