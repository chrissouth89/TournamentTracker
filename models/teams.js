const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: String,
    players: Array,
    game: String
})

const Teams = mongoose.model('Teams', teamSchema)

module.exports = Teams;


// const gameSchema = new mongoose.Schema({
//     name: String,
//     playersNum: Number
// })