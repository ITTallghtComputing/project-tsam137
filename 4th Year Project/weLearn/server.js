if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
  }

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const profileListRoutes = require('./routes/api/profileList')
const path = require('path')
const passport = require('passport');
const http = require("http").Server(app);
// const io = require("socket.io")(http);
const ChatModel = require('./models/ChatModel')
const fs = require('fs')
const stripe = require('stripe')(stripeSecretKey)

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/chatapp");



const io = require("socket.io")(http, {
	cors: {
	  origin: "http://localhost:8080",
	  methods: ["GET", "POST"]
	}
  });
  


 let userss = [];
let messages = [];


// Middlewares
// Form Data Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

// Json Body Middleware
app.use(bodyParser.json());

// Cors Middleware
app.use(cors());

// Seting up the static directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the passport Middleware
app.use(passport.initialize());
// Bring in the Passport Strategy
require('./config/passport')(passport);

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))

const users = require('./routes/api/profileList');
app.use('/api/profileList', users);



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}


io.on("connection", socket => {
	socket.emit('loggedIn', {
		userss: userss.map(s => s.username),
		messages: messages
	});

	socket.on('newuser', username => {
		console.log(`${username} has arrived at the party.`);
		socket.username = username;
		
		userss.push(socket);

		io.emit('userOnline', socket.username);
	});

	socket.on('msg', msg => {
		let message = new ChatModel({
			username: socket.username,
			msg: msg
		});

		message.save((err, result) => {
			if (err) throw err;

			messages.push(result);

			io.emit('msg', result);
		});
	});
	
	// Disconnect
	socket.on("disconnect", () => {
		console.log(`${socket.username} has left the party.`);
		io.emit("userLeft", socket.username);
		userss.splice(userss.indexOf(socket), 1);
	});
});



// app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))

http.listen(process.env.PORT || 3000, () => {
	console.log("Listening on port %s", process.env.PORT || 3000);
});