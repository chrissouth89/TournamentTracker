const mongoose = require("mongoose")

const TeamGameSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	teams: [
		{
		teamName: String,
      	record: String,
      	rank: String,
		},
	],
})

const TeamGame = mongoose.model("TeamGame", TeamGameSchema)

module.exports = TeamGame
