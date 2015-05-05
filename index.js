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


	var valid_keys = Object.keys(options);

	// Ensure all passed params are legal
	for(var p in body) {
		if(valid_keys.indexOf(p) === -1) {
			return cb(new Error('Illegal parameter "' + p + '" provided'));
		}
	}

	for(var key in options) {

		// Check for Required
		if(options[key].required && !body[key]) {
			return cb(new Error('Missing required parameter ' + key));
		}

		// Optional default handler
		if(!options[key].required && !body[key]) {
			body[key] = options[key].default;
		}

		if (check[options[key].type](body[key]) === false) {
			// Check types for all but "any" allow undefined properties when not required

			if (body[key] === undefined && !options[key].required) {
				// skip when key is not present and is not required
			} else {
				if(options[key].type !== 'any') {
					return cb(new Error('Expected "' + key + '" to be type ' + options[key].type + ', instead found ' + typeof body[key]));
				}
			}
		}
	}

	// All is good
	return cb(null, body);

};

