// Importing mongoose
const mongoose = require("mongoose");

// Calling mongoose schema
const Schema = mongoose.Schema;

// Creating schema for tables
const tablesSchema = new Schema({
	"name": {
		type: String,
		required: true,
	},
	"tables": {
		type: Object,
		required: true,
	},
	"parent": {
		type: String,
		required: true,
	}
}, { timestamps: true });

const Table = mongoose.model("Table", tablesSchema);

// export default Table;
module.exports = Table;