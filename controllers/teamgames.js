const express = require("express")
const router = express.Router()
const session = require("express-session")

const team = require("../models/teams.js")
const game = require("../models/games.js")

// 
router.get('/', (req, res) => {
	res.render('new.ejs', {
		currentUser: req.session.currentUser,
	})
})

router.get("/teamgames", (req, res) => {
	team.find({}, (err, team) => {
		res.render("index.ejs", {
			team: team,
			currentUser: req.session.currentUser,
		})
	})
})

router.get("/matchfinder", (req, res) => {
	res.render("matchfinder.ejs", { currentUser: req.session.currentUser })
})

router.get("/teamgames/newteam", (req, res) => {
	team.findById(req.params.id, (err, team) => {
		res.render("teams.ejs", {
			team: team,
			currentUser: req.session.currentUser,
		})
	})
})

router.post('/teamgames/newteam', (req, res) => {
	team.create(req.body, (error, createdTeam)=>{
        console.log(createdTeam);
        res.redirect('/teamgames');
    });
})

router.get('/games', (req, res) => {
	game.find({}, (err, game) => {
	res.render('games.ejs', {
		game: game,
		currentUser: req.session.currentUser,
		})
	})
})

router.get("/seed", (req, res) => {
	team.create([
		{
			name: "Team Hangover",
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
			
		},
	])
	res.redirect("/teamgames")
})

router.get("/seedgames", (req, res) => {
	game.create([
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
	res.redirect("/games")
})

router.get("/:id/edit", (req, res) => {
	team.findById(req.params.id, (err, found) => {
		res.render("teams.ejs", {
			teams: found,
			currentUser: req.session.currentUser,
		})
	})
})

router.get('/teamgames/:id/edit', (req,res) =>{
	team.findById(req.params.id, (err, chosenTeam) => {
	  console.log("chosenTeam", chosenTeam);
	  res.render('edit.ejs',
		{
		  team: chosenTeam,
		  currentUser: req.session.currentUser,
		}
	  )
	})
  })
  

  router.put('/teamgames/:id', (req, res)=>{
		team.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel)=>{
		  res.redirect(/teamgames/)
		});
	});

	
//   router.put('/teamgames/:id/', (req, res)=>{
// 	team.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updateModel) =>{
// 	  res.redirect('/teamgames')
// 	})
//   })
  

router.put("/:id/add", (req, res) => {
	team.findByIdAndUpdate(
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

router.delete("/teamgames/:id", (req, res) => {
	team.findByIdAndDelete(req.params.id, (err, data) => {
		res.redirect("/teamgames")
	})
})

module.exports = router
