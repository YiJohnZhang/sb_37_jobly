const request = require("supertest");

const db = require('../database/db');
const app = require("../app");

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
	
	test('works', async() => {

		let testSchema = {
			user: 'u1',
			jobId: 2,
			applicationState: 'asdfasdf'
		}

		try{

			const response = await request(app)
			.post('/users/u1/jobs')
			.send(testSchema)
			.set("authorization", `Bearer ${u1Token}`);

			expect(response.statusCode).toEqual(201);
			expect(response.body).toEqual({
				applied: testSchema.jobId,
			});


		}catch(error){

			console.log(error);

		}

	});
	
	test('400: malformed schema', async() => {

		let testSchema = {
			'user': 'abcdefghijklmnpoqrstuvwxyz'
		}

		try{
			const response = await request(app)
				.post('/users/u1/jobs')
				.send(testSchema)
				.set("authorization", `Bearer ${u1Token}`);
		}catch(error){
			expect(error.status).toEqual(400);
				// consider prototyping MalformedRequestError
		}

	});
	
	test('403: unauthorized', async() => {

		// todo


	});

})