const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const gameSchema = Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
})

const Game = mongoose.model("Game", gameSchema)

module.exports = Game
