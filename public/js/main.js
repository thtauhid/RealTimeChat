const socket = io()

// Join room
socket.emit('joinRoom', {
	username,
	room
})
// Loggin into console
socket.on('message', (msg) => {
	console.log(msg)
	console.log(username, room)
	outputMessage(msg)

	// Scroll down
	const chatMessages = document.querySelector('.chat-messages')
	chatMessages.scrollTop = chatMessages.scrollHeight
})

// Get username & room
const { username, room } = Qs.parse(location.search, {
	ignoreQueryPrefix : true
})
//Message Submit
const ChatForm = document.getElementById('chat-form')
ChatForm.addEventListener('submit', (e) => {
	e.preventDefault()
	const msg = e.target.elements.msg.value
	socket.emit('chatMessage', msg)

	// Clear the form
	e.target.elements.msg.value = ''
	e.target.elements.msg.focus()
	// Auto focus
})

// Output message to DOM
function outputMessage(msg) {
	const div = document.createElement('div')
	div.classList.add('message')
	div.innerHTML = `<p class="meta">${msg.username} <span>${msg.time}</span></p>
    <p class="text">
        ${msg.text}
    </p>`
	document.querySelector('.chat-messages').appendChild(div)
}
