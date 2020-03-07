const express = require('express')
const router = express.Router()
const bracket = require("../models/teams.js");

// ROUTES


// JSON

router.get("/json", (req,res) => {
    Teams.find({}, (error, teams) => {

        return res.json(teams)
  })
})

// NEW

router.get("/new", (req, res) =>{
    res.render("new.ejs")
})

// DELETE


// EDIT


// PUT


// CREATE


// INDEX


// SEED

  
// Show



module.exports = router;