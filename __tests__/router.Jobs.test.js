const request = require("supertest");

const db = require('../database/db');
const app = require("../app");

const {
	commonBeforeAll,
	commonBeforeEach,
	commonAfterEach,
	commonAfterAll,
	u1Token,
	adminUserToken
} = require('./router._testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("GET /jobs", () => {

	test('', async () => {


	});

});

describe("GET /jobs/:company", () => {

	let companyHandle = 'c1'
	test(`${companyHandle}`, async () => {
		
		const dbResult = await Job.returnAllMatchingModels({companyHandle});
		expect(dbResult.length).toEqual(1);

		const result = await request(app)
			.get()
			.send();

	});

	companyHandle = 'c3'
	test(`${companyHandle}`, async () => {
		
		const dbResult = await Job.returnAllMatchingModels({companyHandle});
		expect(dbResult.length).toEqual(3);

	});

});

describe("POST /jobs", () => {

	const testJobPost = {
		title: "",
		salary: "",
		equity: "",
		companyHandle: ""
	}

	test('', async () => {


	});

	test('400: malformed request', async () => {


	});

});

describe("PUT /jobs", () => {

	test('', async () => {


	});

	test('400: malformed request', async () => {


	});


});

describe("DELETE /jobs", () => {

	test('', async () => {



	});




});