const users = []

// Join user to chat
function userJoin(id, username, room) {
	const user = { id, username, room }

	users.push(user)

	return user
}

function getCurrentUser(id) {
	return users.find((users) => {
		user.id === id
	})
}

module.exports = {
	userJoin,
	getCurrentUser
}
