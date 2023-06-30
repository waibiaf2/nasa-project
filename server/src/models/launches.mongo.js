const mongoose = require('mongoose');

const launchesSchema = mongoose.Schema({
	flightNumber: {
		type: Number,
		require: true,
		min: 100
	},
	launchDate: {
		type: Date,
		require: true
	},
	mission: {
		type: String,
		require: true
	},
	rocket: {
		type: String,
		require: true
	},
	target: {
		type: String,
	},
	customers: [String],
	upcoming: {
		type: Boolean,
		require: true,
		default: true
	},
	success: {
		type: Boolean,
		require: true,
		default: true
	}
});

//Connects launches schema with launches.
module.exports = mongoose.model('Launch', launchesSchema);



