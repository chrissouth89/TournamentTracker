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

router.get("/new", (req, res) => {
	res.render("new.ejs", { currentUser: req.session.currentUser })
})

router.get("/:id/newteam", (req, res) => {
	TeamGame.findById(req.params.id, (err, teamgames) => {
		res.render("teams.ejs", {
			teamgames,
			currentUser: req.session.currentUser,
		})
	})
})

router.post('/', (req, res) => {
    TeamGame.create(req.body, (err, result) => {
        res.redirect('/teamgames')
    })
})

router.get(':id', (req, res) => {
    TeamGame.findById(req.params.id, (err, teamgames) => {
        res.render('show.ejs', {
            teamgames: teamgames,
            currentUser: req.session.currentUser,
        })
    })
})

module.exports = router
