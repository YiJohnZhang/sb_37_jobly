
const db = require('../database/db');
const { BadRequestError, NotFoundError } = require("../modules/utilities");
const { sqlForPartialUpdate, sqlFilterQueryBuilder } = require("../helpers/sql");

const jobJSSQLMapping = {
	title: 'name ILIKE',
	minSalary: 'salary >=',
	hasEquity: 'equity > 0'
}

class Job {

	static async create({}) {

	}

	static async returnAllMatchingModels(queryString){

		const sqlQueryBeforeWHERE = (
			`SELECT title,
				salary,
				equity,
				company_handle
			FROM jobs`);
			
		// const sqlQueryAfterWHERE = (`ORDER BY title`);
		let result;

	}

	static async returnModelByID(jobID){

	}

	static async update(handle, data){
		
	}

	static async remove(handle){

	}

}

module.exports = Job;