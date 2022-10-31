const JobApplication = require("../models/jobApplication");
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

describe('create', () => {

	const newJob = {
		username: 'u2',
		job_id: 4,
		application_state: 'applied'
	}

	test('works', async() => {

		const result = await JobApplication.create(newJob);
		expect(result).toEqual({
			username: "u2",
			jobId: 4,
			applicationState: "applied"
			// the `application_state` is bonus and current specifications do not expect it to be returned
		});
		
	});

	// const newJob = {
	// 	username: 'adsf',
	// 	job_id: '',
	// 	application_state: 'applied'
	// }

	// test('fk error', () => {
	// });

});

describe('search jobs applied by username', () => {

	test('works', async() => {

		let username = 'u1';

		const result = await JobApplication.returnAppliedJobsByUsername(username);
		expect(result.length).toEqual(2);

	});

	test('works, no applications by selected user', async() => {

		let username = 'u3';

		const result = await JobApplication.returnAppliedJobsByUsername(username);
		expect(result.length).toEqual(0);

	});

	test('404: no such user', async() => {

		let username = 'u5';
		try{
			const result = await JobApplication.returnAppliedJobsByUsername(username);
		}catch(error){
			expect(error.status).toEqual(404);
		}
	});

})