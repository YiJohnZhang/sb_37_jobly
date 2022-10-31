const db = require("../database/db");
const { BadRequestError, NotFoundError } = require("../modules/utilities");
const Job = require("../models/job");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('./model._testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/*
const testJob1 = {
	title: 'Front-End Engineer',
	salary: 90000,
	equity: 0.00005,
	company_handle: 'c1'
}

const testJob2 = {
	title: 'Front-End Engineer',
	salary: 1750000,
	equity: 0,
	company_handle: 'c2'
}

const testJob3 = {
	title: 'Front-End Engineer',
	salary: 125000,
	equity: 0.0001,
	company_handle: 'c3'
}

const testJob4 = {
	title: 'Back-End Engineer',
	salary: 130000,
	equity: 0.0003,
	company_handle: 'c3'
}
*/

describe('create', () => {

	const testJob1 = {
		title: 'Test',
		salary: 9,
		equity: 0.9,
		company_handle: 'c1'
	}

	test('works', async() => {

		const createResult = await Job.create(testJob1);
		
		// create a lazy copy that is the expected JSON response form testJob1
		let testJobLazy = testJob1;
		testJobLazy.equity = String(testJobLazy.equity);
		testJobLazy["companyHandle"] = 'c1';
		delete testJobLazy.company_handle;
		
		expect(createResult).toEqual(testJobLazy);

		const result = await db.query(`
			SELECT title, salary, equity, company_handle AS "companyHandle"
			FROM jobs
			WHERE id = 5`);
		expect(result.rows[0]).toEqual(testJobLazy);

	});

	const testJobTest = {
		title: 'Test',
		salary: 9,
		equity: 0.9,
		company_handle: 'testsa'
	}

	test('error: fk does not exist', async() => {
		
		try{
			const createResult = await Job.create(testJobTest);
		}catch(error){
			expect(error instanceof Error).toBeTruthy();
		}

	});

});

// return modelByID test: throw it in the routes test.

describe('returnAllMatchingModels()', () => {

	test('no filtering', async() => {

		const result = await Job.returnAllMatchingModels();
		expect(result.length).toEqual(4);

	});

	let title = 'front-';
	test(`w/ filtering: title: ${title}`, async() => {

		// front-end
		const result = await Job.returnAllMatchingModels({title});
		expect(result.length).toEqual(3);

	});

	let minSalary = 120000;
	test(`w/ filtering: title: \'engineer\', minSalary: ${minSalary}`, async() => {

		// title = engineer
		// minSalary = 120000
		const title = 'engineer';
			// manual override necessary for some reason.

		const result = await Job.returnAllMatchingModels({title, minSalary});
		expect(result.length).toEqual(3);

	});

	title = 'front-end';
	test(`w/ filtering: title: ${title}, minSalary: ${minSalary}`, async() => {

		// title = front-end
		// minSalary = 120000
		// hasEquity = false
		const result = await Job.returnAllMatchingModels({title, minSalary});
		expect(result.length).toEqual(2);

	});

	let hasEquity = true;
	test(`w/ filtering: title: ${title}, minSalary: ${minSalary}, hasEquity: ${hasEquity}`, async() => {

		// title = front-end
		// minSalary = 120000
		// hasEquity = true
		const result = await Job.returnAllMatchingModels({title, minSalary, hasEquity});
		expect(result.length).toEqual(1);

	});

});

describe('update', () => {

	const updateTestJob4 = {
		salary: 135000,
		equity: 0.003
	}

	test('works', async() => {

		const result = await Job.update(4, updateTestJob4);
		expect(result).toEqual({
			companyHandle: 'c3',
			title: "Back-End Engineer",
			salary: 135000,
			equity: "0.003"
		});

	});

	test('404: no such id', async() => {

		try{
			await Job.update(16);
		}catch(error){
			expect(error instanceof NotFoundError).toBeTruthy();
		}

	});

	test('400: bad request, no data', async() => {

		try{
			await Job.update(4, {});
		}catch(error){
			expect(error instanceof BadRequestError).toBeTruthy();
		}

	});
	// note: need to test jobs router for malformed data; however, assignment specifications do NOT specify which route to be able to add the jobs. maybe all jbos are nested under `users`?
});

describe('delete', () => {

	test('works', async() => {

		await Job.remove(4);

		try{
			await Job.returnModelByID(4);
		}catch(error){
			expect(error instanceof NotFoundError).toBeTruthy();
		}

	});

	test('404: no such id', async() => {

		try{
			await Job.remove(16);
		}catch(error){
			expect(error instanceof NotFoundError).toBeTruthy();
		}

	});

});