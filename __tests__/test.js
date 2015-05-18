jest
	.dontMock('body-checker')
	.dontMock('check-types');

describe('parameter count', function() {

	var check = require('body-checker');

	it('Should reject the wrong number of parameters', function() {

		var reqBody = {
			name: 'Randy',
			rogue: 'DROP users'
		};

		check(reqBody, {
			name: {
				type: 'string',
				required: true
			}
		}, function(err, body) {

			expect(err).toBeDefined();
			expect(err.message).toEqual('Illegal parameter "rogue" provided');
			expect(body).toBeUndefined();

		});

	});

});

describe('undefined params', function() {

	var check = require('body-checker');

	it('Should not return undefined key values when leys are missing', function() {

		var reqBody = {
			name: "Randy"
		};

		var strongParams = { name: { type: 'string', required: true},
							address: { type: 'string', required: false}};

		check(reqBody, strongParams, function(err, body) {

			expect(err).toBeNull();
			expect(body).toBeDefined();
			expect(Object.keys(body).length).toEqual(1);

		});

	});

	it('Should handle empty object when strong params without keys', function() {

		var reqBody = {};

		var strongParams = {};

		check(reqBody, strongParams, function(err, body) {

			expect(err).toBeNull();
			expect(body).toBeDefined();
			expect(Object.keys(body).length).toEqual(0);

		});

	});

	it('Should handle bad object as strong params without keys', function() {

		var reqBody = { test: 'should fail'};

		var strongParams = {};

		check(reqBody, strongParams, function(err, body) {

			expect(err).toBeDefined();
			expect(err.message).toEqual('Illegal parameter "test" provided');
			expect(body).toBeUndefined();

		});

	});

});

describe('required parameters', function() {

	var check = require('body-checker');

	it('Should fail on an undefined required parameter', function() {

		var reqBody = {
			name: 'Randy',
			email: ''
		};

		check(reqBody, {
			name: {
				type: 'string',
				required: true
			},
			email: {
				type: 'string',
				required: true
			}
		}, function(err, body) {

			expect(err).toBeDefined();
			expect(err.message).toEqual('Missing required parameter email');
			expect(body).toBeUndefined();

		});

	});

	it('Should NOT fail on an undefined required parameter', function() {

		var reqBody = {
			name: 'Randy'
		};

		check(reqBody, {
			name: {
				type: 'string',
				required: true
			},
			email: {
				type: 'string',
				required: false
			}
		}, function(err, body) {

			expect(body).toBeDefined();
			expect(err).toBeNull();
			expect(body.name).toEqual('Randy');
			expect(body.email).toBeUndefined();
		});

	});
});

describe('default parameters', function() {

	var check = require('body-checker');

	it('Should set the default on an undefined optional parameter', function() {

		var reqBody = {
			name: 'Randy',
			email: ''
		};

		check(reqBody, {
			name: {
				type: 'string',
				required: true
			},
			email: {
				type: 'string',
				required: false,
				default: 'randy@email.com'
			}
		}, function(err, body) {

			expect(err).toBeNull();
			expect(body).toBeDefined();
			expect(body.email).toEqual('randy@email.com');

		});

	});

});

describe('type check', function() {

	var check = require('body-checker');

	it('Should fail on type error', function() {

		var reqBody = {
			name: 'Randy',
			id: '1'
		};

		check(reqBody, {
			name: {
				type: 'string',
				required: true
			},
			id: {
				type: 'number',
				required: true
			}
		}, function(err, body) {

			expect(err).toBeDefined();
			expect(err.message).toEqual('Expected "id" to be type number, instead found string');
			expect(body).toBeUndefined();

		});

	});

});

describe('illegal parameter', function() {

	var check = require('body-checker');

	it('Should fail on illegal parameter', function(done) {

		var reqBody = {
			name: 'Randy',
			email: '',
			evil: 'attack'
		};

		check(reqBody, {
			name: {
				type: 'string',
				required: true
			},
			email: {
				type: 'string',
				required: false,
				default: 'randy@email.com'
			},
			id: {
				type: 'any',
				required: false
			}
		}, function(err, body) {

			expect(err).toBeDefined();
			expect(err.message).toEqual('Illegal parameter "evil" provided');
			expect(body).toBeUndefined();

		});


	});

});

describe('valid parameters', function() {

	var check = require('body-checker');

	it('Should return the body if all is good', function() {

		var reqBody = {
			name: 'Randy',
			id: 1,
			price: 2.2,
			bool: false,
			email: ''
		};

		check(reqBody, {
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
				default: 'randy@email.com',
				required: false
			}

		}, function(err, body) {

			expect(err).toBeNull();
			expect(body).toBeDefined();
			expect(body.name).toEqual('Randy');
			expect(body.id).toEqual(1);
			expect(body.bool).toBeFalsy();
			expect(body.email).toEqual('randy@email.com');

		});

	});

});


