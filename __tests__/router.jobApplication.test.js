const request = require("supertest");

const db = require('../database/db');
const app = require("../app");

const { UnauthorizedError } = require('../modules/utilities');

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	u1Token, u2Token, adminUserToken
} = require('./router._testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('POST /users/:username/jobs/', () => {

	// apparently step 5 doesn't say anything about changing the state of the job application, i.e. 
		// "interested", "applied", "accepted", "rejected"
	
	test('201: works', async() => {

		let testSchema = {
			username: 'u1',
			jobId: 4,
			applicationState: 'applied'
		}

		const response = await request(app)
			.post('/users/u1/jobs')
			.send(testSchema)
			.set("authorization", `Bearer ${u1Token}`);

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			applied: testSchema.jobId
		});

	});
	
	test('400: malformed schema', async() => {

		let testSchema = {
			username: 'abcdefghijklmnpoqrstuvwxyz'
		}

		try{
			const response = await request(app)
				.post('/users/u1/jobs')
				.send(testSchema)
				.set("authorization", `Bearer ${u1Token}`);
		}catch(error){
			expect(error.status).toEqual(400);
				// consider prototyping MalformedRequestError, 400, from BadRequestError
		}

	});
	
	test('201: admin token', async() => {

		let testSchema = {
			username: 'u1',
			jobId: 4,
			applicationState: 'applied'
		}

		const response = await request(app)
			.post('/users/u1/jobs')
			.send(testSchema)
			.set("authorization", `Bearer ${adminUserToken}`);

		expect(response.statusCode).toEqual(201);
		expect(response.body).toEqual({
			applied: testSchema.jobId
		});

	});

	test('401: unauthorized', async() => {

		let testSchema = {
			username: 'u1',
			jobId: 4,
			applicationState: 'applied'
		}

		const response = await request(app)
			.post('/users/u1/jobs')
			.send(testSchema)
			.set("authorization", `Bearer ${u2Token}`);
		
		expect(response.statusCode).toEqual(401);

	});

})