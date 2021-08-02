module.exports = {
	name: 'hola',
	description: 'Hola!',
	execute(message, args) {
		client.commands.get('ping').execute(message, args);
	},
};