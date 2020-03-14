const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const gameSchema = Schema({
	name: String,
	description: String,
})

const game = mongoose.model("Game", gameSchema)

module.exports = game
