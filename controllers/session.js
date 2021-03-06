const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

const User = require("../models/user.js")

router.get("/new", (req, res) => {
	res.render("session/login.ejs", { currentUser: req.session.currentUser })
})

router.post("/", (req, res) => {
	console.log("login")
	User.findOne({ username: req.body.username }, (err, foundUser) => {
		if (bcrypt.compareSync(req.body.password, foundUser.password)) {
			req.session.currentUser = foundUser
			res.redirect("/")
		} else {
			res.send("Try again")
		}
	})
})

router.delete("/", (req, res) => {
	req.session.destroy(() => {
		res.redirect("/")
	})
})

module.exports = router
