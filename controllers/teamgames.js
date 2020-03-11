const express = require("express")
const router = express.Router()
const session = require("express-session")

const TeamGame = require("../models/games.js")

router.get("/", (req, res) => {
	TeamGame.find({}, (err, teamgames) => {
		res.render("index.ejs", {
			teamgames,
			currentUser: req.session.currentUser,
		})
	})
})

router.get("/matchfinder", (req, res) => {
	res.render("matchfinder.ejs", { currentUser: req.session.currentUser })
})

router.get("/:id/newteam", (req, res) => {
	TeamGame.findById(req.params.id, (err, teamgames) => {
		res.render("teams.ejs", {
			teamgames,
			currentUser: req.session.currentUser,
		})
	})
})

router.post("/", (req, res) => {
	TeamGame.create(req.body, (err, result) => {
		res.redirect("/teamgames")
	})
})

router.get("/seed", (req, res) => {
	Team.create([
	  {
		teamName: "Team Hangover",
		record: "1-11",
      	rank: "Bronze",
	  },
	  {
		name: "Team Cloud 9",
		record: "12-0",
      	rank: "Challenger",
	  },
	  {
		name: "Team Grinding",
		record: "6-6",
      	rank: "Masters",
	  }
	]);
	res.redirect("/teamgames");
  });

router.get("/:id", (req, res) => {
	TeamGame.findById(req.params.id, (err, teamgames) => {
		res.render("show.ejs", {
			teamgames: teamgames,
			currentUser: req.session.currentUser,
		})
	})
})

router.get("/:id/edit", (req, res) => {
	TeamGame.findById(req.params.id, (err, found) => {
		res.render("edit.ejs", {
			teamgames: found,
			currentUser: req.session.currentUser,
		})
	})
})

router.get("/teams/:id/:teamid", (req, res) => {
	TeamGame.findById(req.params.id, (err, found) => {
		res.render("teams.ejs")
	})
})

router.put("/:id/:teamid", (req, res) => {
	TeamGame.update(
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
	TeamGame.findByIdAndUpdate(
		req.params.id,
		{
			$push: {
				teams: req.body,
			},
			$inc: {
				numberOfTeams: 1,
			},
		},
		{ new: true },
		(err, update) => {
			res.redirect("/teamgames")
		}
	)
})

router.delete("/:id", (req, res) => {
	TeamGame.findByIdAndDelete(req.params.id, (err, data) => {
		res.redirect("/teamgames")
	})
})
module.exports = router
