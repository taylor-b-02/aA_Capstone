//~~~~~Import from external packages~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');
const { createServer } = require('http');
const { Server } = require('socket.io');

const { Message, User } = require('./db/models');

const { environment } = require('./config');
const isProduction = environment === 'production';

//~~~~~Import Routes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const routes = require('./routes');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
// httpServer.listen(3001);

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//~~~~~Security Middleware~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

if (!isProduction) {
	// Only allow Cross-Origin-Resource-Sharing in development
	app.use(cors());
}

// helmet helps set a variety of headers to better secure the application
app.use(helmet({ contentSecurityPolicy: false }));

// Set the _csrf token and create req.csrfToken method
app.use(
	csurf({
		cookie: {
			secure: isProduction,
			sameSite: isProduction && 'Lax',
			httpOnly: true,
		},
	})
);

//~~~~~Use routes from other routers (routers in different files)
app.use(routes);

//~~~~~SocketIO for instant-messaging functionality~~~~~~~~~~~~~~~~~~~~~~
io.on('connection', (socket) => {
	// console.log('New Client Connected');

	const socketId = socket.id;

	socket.on('joinChannel', async ({ username, channel }) => {
		const user = { username, socketId, channel };
		console.log(`${user.username} joined ${user.channel}`);

		const loadedMessages = await Message.findAll({
			where: { channelId: channel },
			include: { model: User, as: 'user' },
		});

		// Send older messages to client
		socket.emit('loadMessages', loadedMessages);

		// Join the channel
		socket.join(user.channel);
	});

	socket.on('message', (data) => {
		console.log(`${data.user}   :   ${data.message}`);
		// socket.broadcast.emit('msg', data);
		// io.emit('message', data);
	});

	// socket.emit('message', {
	// 	user: { username: 'SERVER' },
	// 	message: `Connected!`,
	// });

	socket.on('chatMessage', async (message) => {
		const newMessage = await Message.create({
			userId: message.user.id,
			channelId: message.channel,
			message: message.message,
		});
		message.id = newMessage.id;
		message.createdAt = newMessage.createdAt;
		io.to(message.channel).emit('message', message);
		// newMessage.user = message.user;
		// io.to(message.channel).emit('message', newMessage);
	});
});

io.on('message', (data) => {
	console.log(data.message);
});

//~~~~~Error handling~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
	const err = new Error("The requested resource couldn't be found.");
	err.title = 'Resource Not Found';
	err.errors = ["The requested resource couldn't be found."];
	err.status = 404;
	next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
	// check if error is a Sequelize error:
	if (err instanceof ValidationError) {
		err.errors = err.errors.map((e) => e.message);
		err.title = 'Validation error';
	}
	next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
	res.status(err.status || 500);
	console.error(err);
	res.json({
		title: err.title || 'Server Error',
		message: err.message,
		errors: err.errors,
		stack: isProduction ? null : err.stack,
	});
});

module.exports = { app, httpServer };
