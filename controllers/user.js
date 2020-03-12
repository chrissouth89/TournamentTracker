const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

const User = require("../models/user.js")

router.get("/new", (req, res) => {
	res.render("user/signup.ejs", { currentUser: req.session.currentUser })
})

router.post("/", (req, res) => {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
	User.create(req.body, (err, createdUser) => {
		res.redirect("/teamgames")
	})
})

module.exports = router
