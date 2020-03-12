const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const teamSchema = Schema({
		name: String,
      	record: String,
		rank: String,
		game: String,
})

const Team = mongoose.model("Team", teamSchema)

module.exports = Team