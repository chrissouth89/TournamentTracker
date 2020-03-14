const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const teamSchema = Schema({
		name: String,
      	record: String,
		rank: String,
})

const team = mongoose.model("Team", teamSchema)

module.exports = team