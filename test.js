var checker = require('./index.js');


var body = {
	name: 'Randy',
	id: 1,
	price: 2.2,
	bool: false,
	tea: 'time'
};

checker(body, {
	name: {
		type: 'string',
		default: 'A default',
		required: true
	},
	id: {
		type: 'number',
		default: 20,
		required: true
	},
	bool: {
		type: 'boolean',
		default: false,
		required: false
	},
	price: {
		type: 'number',
		default: 20,
		required: false
	},
	email: {
		type: 'string',
		default: 'rl@lucera.com',
		required: false
	}
});
