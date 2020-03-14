const express = require("express")
const app = express()
const mongoose = require("mongoose")
const session = require("express-session")
const methodOverride = require("method-override")

// MIDDLEWARE

app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(
	session({
		secret: "do you want ants?!",
		resave: false,
		saveUninitialized: false,
	})
)

// MONGOOSE

const db = require("./config/keys").MongoURI

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB Connected..."))
	.catch(err => console.log(err))
mongoose.connection.once("open", () => {
	console.log("connected to mongodb")
})

// CONTROLLERS
const gameController = require("./controllers/teamgames.js")
app.use("/", gameController)

const userController = require("./controllers/user.js")
app.use("/user", userController)

const sessionController = require("./controllers/session.js")
app.use("/session", sessionController)

// PORT LISTENER
const PORT = process.env.PORT || 7000

app.listen(PORT, console.log(`Server started on port ${PORT}`))
