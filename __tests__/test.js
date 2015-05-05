jest
	.dontMock('body-checker')
	.dontMock('check-types');

describe('parameter count', function() {

	var check = require('body-checker');

	it('Should reject the wrong number of parameters', function() {

		var body = {
			name: 'Randy',
			rogue: 'DROP users'
		};

		check(body, {
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

describe('required parameters', function() {

	var check = require('body-checker');

	it('Should fail on an undefined required parameter', function() {

		var body = {
			name: 'Randy',
			email: ''
		};

		check(body, {
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

		var body = {
			name: 'Randy'
		};

		check(body, {
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

		var body = {
			name: 'Randy',
			email: ''
		};

		check(body, {
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

		var body = {
			name: 'Randy',
			id: '1'
		};

		check(body, {
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

		var body = {
			name: 'Randy',
			email: '',
			evil: 'attack'
		};

		check(body, {
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

		var body = {
			name: 'Randy',
			id: 1,
			price: 2.2,
			bool: false,
			email: ''
		};

		check(body, {
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


