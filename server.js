const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const formatMessgae = require('./utils/messages')
const botName = 'Chat Bot'

const app = express()
const server = http.createServer(app)
const io = socketio(server)
// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Run when client connects
io.on('connection', (socket) => {
	// Welcoming current user
	socket.emit('message', formatMessgae(botName, 'Welcome to RealTimeChat'))

	// Broadcast when a user connects
	socket.broadcast.emit('message', formatMessgae(botName, 'A user has joined the chat.'))

	// When client disconnects
	socket.on('disconnect', () => {
		io.emit('message', formatMessgae(botName, 'A user has left the chat.'))
	})

	// Listen to chatMessage
	socket.on('chatMessage', (msg) => {
		io.emit('message', formatMessgae('User', msg))
		// console.log(msg)
	})
})

const PORT = process.env.PORT || 9000

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
