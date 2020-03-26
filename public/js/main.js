const socket = io()

// Loggin into console
socket.on('message', (msg) => {
	console.log(msg)
	outputMessage(msg)

	// Scroll down
	const chatMessages = document.querySelector('.chat-messages')
	chatMessages.scrollTop = chatMessages.scrollHeight
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
	div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${msg}
    </p>`
	document.querySelector('.chat-messages').appendChild(div)
}
