// Checks
//
// string
// array
// object
// integer
// number
// boolean
// null
// undefined
// assigned
// any

var check = require('check-types');

module.exports = function(body, options, cb) {

	// Check for extra params
	var req_count = Object.keys(body).length,
		options_count = Object.keys(options).length;

	if(req_count !== options_count) {
		console.log('Wrong number of params passed to function');
		return cb(new Error('Wrong number of params passed to function'));
	}

	var valid_keys = [];

	// Check types
	for(var key in options) {

		// Check for Required
		if(options[key].required && !body[key]) {
			console.log('Missing required Parameter');
			return cb(new Error('Missing required Parameter'));
		}

		// Optional default handler
		if(!options[key].required && !body[key]) {
			body[key] = options[key].default;
		}

		// Check types for all but "any"
		if(options[key].type !== 'any') {

			if(check[options[key].type](body[key]) === false) {
				console.log('Error in param types');
				return cb(new Error('Error in param types'));
			}

		}

		valid_keys.push(key);

	}

	// Ensure all passed params are legal
	for(var p in body) {
		if(valid_keys.indexOf(p) === -1) {
			console.log('Invalid paramater provided');
			return cb(new Error('Invalid parameter provided'));
		}
	}

	// All is good
	console.log(body);
	return cb(null, body);

};

