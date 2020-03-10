const mongoose = require("mongoose");

const TeamGameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  numberOfTeams: { type: Number, default: 0 },
  winner: { type: String, default: "In Progress" },
  teams: [
    {
      teamName: String,
      record: String,
    },
  ],
});

const TeamGame = mongoose.model("TeamGame", TeamGameSchema);

module.exports = TeamGame;