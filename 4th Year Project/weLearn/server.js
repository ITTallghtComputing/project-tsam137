  
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
// const ChatModel = require('./models/ChatModel')
const fs = require('fs')
const { v4: uuidV4 } = require('uuid')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

// mongoose.connect("mongodb://localhost:27017/chatapp");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});

const io = require("socket.io")(http, {
	cors: {
	  origin: "https://we-learn-app.herokuapp.com" && "http://localhost:8080",
	  methods: ["GET", "POST"]
	}
  });
  




 let userss = [];
 let userssLanguage = [];

let messages = [];
let messagesLanguage = [];


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


const meetings = require('./routes/api/meetings');
app.use('/api/meetings', meetings);

const chats = require('./routes/api/chats');
app.use('/api/chats', chats);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
	 this.io = require("socket.io")(http, {
		cors: {
		  origin: "https://we-learn-app.herokuapp.com" && "https://we-learn-app.herokuapp.com/",
		  methods: ["GET", "POST"]
		}
	  });

	 
}


const ChatSchema = mongoose.Schema({
	username: String,
	msg: String
});

const ChatModel = mongoose.model("chats", ChatSchema);
const ChatLanguageModel = mongoose.model("chatsLanguage", ChatSchema);

ChatModel.find((err, result) => {
	if (err) throw err;

	messages = result;
});

ChatLanguageModel.find((err, result) => {
	if (err) throw err;

	messagesLanguage = result;
});

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
		let message = new ChatLanguageModel({
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


http.listen(process.env.PORT || 3000, () => {
	console.log("Listening on port %s", process.env.PORT || 3000);
});



/********************Language******************/
// io.on("connectionNew", socket => {
// 	socket.emit('loggedInLanguage', {
// 		userssLanguage: userssLanguage.map(se => se.username),
// 		messagesLanguage: messagesLanguage
// 	});

// 	socket.on('newuserLanguage', username => {
// 		console.log(`${username} has arrived at the party.`);
// 		socket.username = username;
		
// 		userssLanguage.push(socket);

// 		io.emit('userOnlineLanguage', socket.username);
// 	});

// 	socket.on('msgLanguage', msgLanguage => {
// 		let message = new ChatModel({
// 			username: socket.username,
// 			msgLanguage: msgLanguage
// 		});

// 		message.save((err, result) => {
// 			if (err) throw err;

// 			messagesLanguage.push(result);

// 			io.emit('msgLanguage', result);
// 		});
// 	});
	
// 	// Disconnect
// 	socket.on("disconnectLanguage", () => {
// 		console.log(`${socket.username} has left the party.`);
// 		io.emit("userLeftLanguage", socket.username);
// 		userssLanguage.splice(userssLanguage.indexOf(socket), 1);
// 	});
// });
