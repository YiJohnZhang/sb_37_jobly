const db = require('../database/db');
const { BadRequestError, NotFoundError } = require("../modules/utilities");
const User = require('./user')

const jobJSSQLMapping = {
	companyHandle: 'company_handle ILIKE',
	title: 'title ILIKE',
	minSalary: 'salary >=',
	hasEquity: 'equity > 0'
}

class JobApplication {

	/**	create({title, salary, equity, company_handle})
	 *	Creates a new record with the expected properties in the method signature, destructured.
	 *	Returns the record created.
	 */
	static async create({username, jobId:job_id, applicationState:application_state}) {

		
		const result = await db.query(
			`INSERT INTO applications
				(username, job_id, application_state)
				VALUES($1, $2, $3)
				RETURNING username, job_id AS "jobId", application_state AS "applicationState"`,
			[username, job_id, application_state]);
		
		return result.rows[0];

	}

	static async returnAppliedJobsByUsername(username){
		// this is the spec step 5 wants.
		
		await User.get(username);

		const result = await db.query(
			`SELECT job_id AS "jobId"
				FROM applications
				WHERE username = $1 AND application_state='applied'`,
				[username]);
		
		const returnValue = result.rows.map((element) => element.jobId);

		return returnValue;

	}


}

module.exports = JobApplication;