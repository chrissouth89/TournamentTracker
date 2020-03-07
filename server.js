const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const PORT = process.env.PORT || 3020
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')

//PASSPORT CONFIG
require('./config/passport')(passport);

// DB CONFIG

const db = require('./config/keys').MongoURI

// MIDDLEWARE
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'do you want ants?',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(flash());

// MONGOOSE
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err))
mongoose.connection.once('open', () => {
	console.log('connected to mongodb')
})
// GLOBAL VARIABLES

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next();
});


// PASSPORT
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
	app.locals.currentUser = req.user // currentUser now available in ALL views
	app.locals.loggedIn = !!req.user // a boolean loggedIn now available in ALL views

	next()
})
// ROOT ROUTE

app.use('/', require('./routes/index'))

app.use('/users', require('./routes/users'))

// PASSPORT ROUTE CALLBACK

// PASSPORT LOGIN

app.listen(PORT, console.log(`Server started on port ${PORT}`))
