/**
 * body-checker
 * A simple tool to protect your API against bad request parameters
 *
 * @param {Object} 	 body 		request body
 * @param {Object} 	 options 	configuration parmaters
 * @param {Function} cb 		callback function
 *
 */

var check = require('check-types');

module.exports = function(body, options, cb) {

	// Check for extra params
	var req_count = Object.keys(body).length,
		options_count = Object.keys(options).length;

	if(req_count !== options_count) {
		return cb(new Error(req_count + ' parameters passed, but method requires ' + options_count));
	}

	var valid_keys = [];

	// Check types
	for(var key in options) {

		// Check for Required
		if(options[key].required && !body[key]) {
			return cb(new Error('Missing required parameter ' + key));
		}

		// Optional default handler
		if(!options[key].required && !body[key]) {
			body[key] = options[key].default;
		}

		// Check types for all but "any"
		if(options[key].type !== 'any') {

			if(check[options[key].type](body[key]) === false) {
				return cb(new Error('Expected "' + key + '" to be type ' + options[key].type + ', instead found ' + typeof body[key]));
			}

		}

		valid_keys.push(key);

	}

	// Ensure all passed params are legal
	for(var p in body) {
		if(valid_keys.indexOf(p) === -1) {
			return cb(new Error('Illegal parameter "' + p + '" provided'));
		}
	}

	// All is good
	return cb(null, body);

};

