# Body Checker
> A simple tool to protect your API against bad request parameters

[![NPM](https://nodei.co/npm/body-checker.png?downloads=true&stars=true)](https://nodei.co/npm/body-checker/)

[![Build Status](https://travis-ci.org/luceracloud/body-checker.svg?branch=master)](https://travis-ci.org/luceracloud/body-checker)

## Installation

`npm install body-checker`

## Usage

```javascript
var check = require('body-checker');

check([body to validate], [configuration options], [callback]);
```

#### Body to validate
This is the request object (`req.body` in express) that you want to validate.
Currently we only support shallow objects, but if there is an overwhelming need for deep objects, let us know in the issues and we will implement deep validation.

#### Configuration options
This is an object that outlines your allowed request parameters.  It takes the following form:

```javascript
{
	paramKey: {
		type: 'string',  			// String:  Required
		required: false,	  		// Boolean: Optional, defaults to false
		default: 'default value' 	// String:  Optional
	},
	nextParamKey: { ... }
}
```

##### Allowed Types
Type is a required parameter.  If you don't care what type it is, you can set type to `any`.

- **string**: 	validates a string
- **number**: 	validates a number
- **integer**: 	validates a non floating point number
- **array**: 	validates an array
- **object**: 	validates an object
- **null**: 	expects value to be null
- **assigned**: expects value to be assigned
- **any**:		bypasses type checking

#### Callback
Callback is a traditional callback(err, data) function.  It will pass back detailed errors for debugging or the final `req.body` object.  This allows you to send your own generic error to the client to prevent phishing attacks. See example below.

## Examples

#### Express request handler

```javascript
var check = require('body-checker');

module.exports = function(req, res, next) {

	check(req.body, {
		name: {
			type: 'string',
			default: 'public',
			required: true
		},
		id: {
			type: 'integer',
			required: true
		}
	}, function(err, body) {

		if(err) {

			// Log detailed error message on server
			console.log(err.message);

			// Send generic error to client
			res.status(400).send({
				message: 'Bad Request'
			});

		} else {

			// do stuff with safe parameters
			// and eventually...

			res.status(200).send(body);
		}

	});

}

```

## Tests

`npm test`
