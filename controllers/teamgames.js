const express = require("express")
const router = express.Router()
const session = require("express-session")

const Team = require("../models/teams.js")
const Game = require("../models/games.js")

router.get("/", (req, res) => {
	Team.find({}, (err, team) => {
		res.render("index.ejs", {
			team,
			currentUser: req.session.currentUser,
		})
	})
})

router.get("/matchfinder", (req, res) => {
	res.render("matchfinder.ejs", { currentUser: req.session.currentUser })
})

router.get("/:id/newteam", (req, res) => {
	TeamGame.findById(req.params.id, (err, teams) => {
		res.render("teams.ejs", {
			teams,
			currentUser: req.session.currentUser,
		})
	})
})

router.post("/", (req, res) => {
	Team.create(req.body, (err, result) => {
		res.redirect("/teamgames")
	})
})

router.get("/seed", (req, res) => {
	Team.create([
		{
			name: "Team Hangover",
			record: "1-11",
			rank: "Bronze",
			game: "League of Legends"
		},
		{
			name: "Team Cloud 9",
			record: "12-0",
			rank: "Challenger",
			game: "Call of Duty"
		},
		{
			name: "Team Grinding",
			record: "6-6",
			rank: "Masters",
			game: "League of Legends"
		},
	])
	res.redirect("/teamgames")
})

router.get("/seedgames", (req, res) => {
	Game.create([
		{
			name: "League of Legends",
			description: "Two teams of powerful champions, each with a unique design and playstyle, battle head-to-head across multiple battlefields and game modes.",
		},
		{
			name: "Fortnite",
			description: "A survival game where 100 players fight against each other in player versus player combat to be the last one standing.",
		},
		{
			name: "Call of Duty",
			description: "A first-person shooter video game.",
		},
		{
			name: "Borderlands",
			description: "An action role-playing first-person shooter.",
		},
		{
			name: "Dota 2",
			description: "A multiplayer online battle arena (MOBA) video game in which two teams of five players compete to collectively destroy a large structure defended by the opposing team known.",
		},
	])
	res.redirect("/teamgames")
})

router.get("/:id", (req, res) => {
	Team.findById(req.params.id, (err, foundTeams) => {
		res.render("teams.ejs", {
			teams: foundTeams,
			currentUser: req.session.currentUser,
		})
	})
})

router.get("/:id", (req, res) => {
	Game.findById(req.params.id, (err, foundGames) => {
		res.render("games.ejs", {
			games: foundGames,
			currentUser: req.session.currentUser,
		})
	})
})

router.get("/:id/edit", (req, res) => {
	Team.findById(req.params.id, (err, found) => {
		res.render("teams.ejs", {
			teams: found,
			currentUser: req.session.currentUser,
		})
	})
})

router.get("/teamgames/teams/:id/:teamid", (req, res) => {
	Team.findById(req.params.id, (err, found) => {
		res.render("teams.ejs")
	})
})

router.put("/:id/:teamid", (req, res) => {
	Team.update(
		req.params.teamid,
		teams,
		{
			$set: {
				name: req.body.name,
			},
		},
		{ new: true },
		(err, updateUser) => {
			res.redirect("/teamgames")
		}
	)
})

router.put("/:id/add", (req, res) => {
	Team.findByIdAndUpdate(
		req.params.id,
		{
			$push: {
				teams: req.body,
			},
		},
		{ new: true },
		(err, update) => {
			res.redirect("/teamgames")
		}
	)
})

router.delete("/teamgames/teams/:id", (req, res) => {
	Team.findByIdAndDelete(req.params.id, (err, data) => {
		res.redirect("/teamgames")
	})
})

module.exports = router
