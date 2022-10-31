
const db = require('../database/db');
const { BadRequestError, NotFoundError } = require("../modules/utilities");
const { sqlForPartialUpdate, sqlFilterQueryBuilder } = require("../helpers/sql");

const jobJSSQLMapping = {
	title: 'title ILIKE',
	minSalary: 'salary >=',
	hasEquity: 'equity > 0'
}

class Job {

	/**	create({title, salary, equity, company_handle})
	 *	Creates a new record with the expected properties in the method signature, destructured.
	 *	Returns the record created.
	 */
	static async create({title, salary, equity, company_handle}) {

		// no specification for duplicates

		const result = await db.query(
			`INSERT INTO jobs
				(title, salary, equity, company_handle)
			VALUES($1, $2, $3, $4)
			RETURNING title, salary, equity, company_handle AS "companyHandle"`,
			[title, salary, equity, company_handle]);
		
		return result.rows[0];

	}

	/**	returnAllMatchingModels(queryString)
	 *	Search the database for all matching models, where a `queryString` is optional to filter the results.
	 *	Returns the record(s), if found; otherwise `undefined`.
	 */
	static async returnAllMatchingModels(queryString){

		const sqlQueryBeforeWHERE = (
			`SELECT title,
				salary,
				equity,
				company_handle
			FROM jobs`);
			
		// const sqlQueryAfterWHERE = (`ORDER BY title`);
		let result;
		
		if(queryString){

			if(queryString.title)
				queryString.title = `%${queryString.title}%`;

			let {parameterizedWHERE, queryParameters} = sqlFilterQueryBuilder(queryString, jobJSSQLMapping);

			// i can get away this for now like this. needs patching for more complicated queries
			if(queryString.hasEquity){
				parameterizedWHERE = parameterizedWHERE.substring(0, parameterizedWHERE.length-2);
				queryParameters.pop();
			}

			result = await db.query(`${sqlQueryBeforeWHERE} ${parameterizedWHERE}`, queryParameters);


		}else{
			result = await db.query(`${sqlQueryBeforeWHERE}`)
		}

		return result.rows;

	}

	/**	returnModelByID(jobID)
	 *	Search the database for `jobID`.
	 *	Returns the record, if found; otherwise `undefined`.
	 */
	static async returnModelByID(jobID){

		const result = await db.query(`
			SELECT *
			FROM jobs
			WHERE id=$1`,
			[jobID]);
		
		return result.rows[0];

	}

	/**	checkModelExistenceHardFail(jobID)
	 *	Search the database for `jobID`.
	 *	Returns undefined if a record matches.
	 *	Throws `NotFoundError` (hard fail) if model not found.
	 */
	static async checkModelExistenceHardFail(jobID){

		const result = await this.returnModelByID(jobID);

		if(!result)
			throw new NotFoundError(`No job with jobID ${jobID}`);

		return;

	}

	/** update(jobID, data)
	 *	Update given `jobID` in database with `data`.
	 *	Returns update details.
	 *	Throws `NotFoundError` if job not found.
	 **/
	static async update(jobID, data){

		await this.checkModelExistenceHardFail(jobID);
		
		const {setCols, values} = sqlForPartialUpdate(data, {
			title: 'title',
			salary: 'salary',
			equity: 'equity'
		});

		const result = await db.query(`
			UPDATE jobs
			SET ${setCols}
			WHERE id = $${values.length+1}
			RETURNING
				title,
				salary,
				equity,
				company_handle AS "companyHandle"
				`,
			[...values, jobID]);

		return result.rows[0];

	}

	/** remove(jobID)
	 *	Delete given `jobID` from database.
	 *	Returns `undefined`.
	 *	Throws `NotFoundError` if job not found.
	 **/
	static async remove(jobID){
		
		await this.checkModelExistenceHardFail(jobID);

		const result = await db.query(`
			DELETE
			FROM jobs
			WHERE id = $1
			RETURNING id`,
		[jobID]);

	}

}

module.exports = Job;