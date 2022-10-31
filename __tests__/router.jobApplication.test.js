const request = require("supertest");

const db = require('../database/db');
const app = require("../app");

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	u1Token
} = require('./router._testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('POST /users/:username/jobs/:id', () => {

	// apparently step 5 doesn't say anything about changing the state of the job application, i.e. 
		// "interested", "applied", "accepted", "rejected"
	
	test('', async() => {



	});
	
	test('', async() => {



	});

})