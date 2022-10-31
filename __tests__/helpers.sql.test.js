const { sqlForPartialUpdate, sqlFilterQueryBuilder } = require('../helpers/sql');
const Company = require ('../models/company');

describe('sqlForPartialUpdate', () => {
	
	test('test a gibberish testcase', () => {

		const testCompanyObject = {
			companyName: 'test',
			numEmployees: 5,
		}

		const testJSSQLMapping = {
			companyName: 'company_name',
			numEmployees: 'num_employees'
		}

		const { setCols, values } = sqlForPartialUpdate(testCompanyObject, testJSSQLMapping);

		expect(setCols).toEqual('\"company_name\"=$1, \"num_employees\"=$2');
		expect(values).toEqual(['test', 5]);

	});

	test('Bad Request is returned', () => {

		try{

			const test = sqlForPartialUpdate({}, {});

		}catch(error){

			expect(error.status).toEqual(400);
			expect(error.message).toEqual('No data.');

		}
	});

});

describe('sqlFilterQueryBuilder', () => {
	
	const testJSSQLMapping = {
		name: 'name =',
		minEmployees: 'num_employees >='
	}

	test(`no filters`, () => {

		const testCompanySearch = {
		}

		const testFilter = sqlFilterQueryBuilder(testCompanySearch, testJSSQLMapping);

		expect(testFilter).toBeUndefined();

	});

	let name = 'test';
	test('one filter', () => {

		const testCompanySearch = {
			name
		}


		const { parameterizedWHERE, queryParameters } = sqlFilterQueryBuilder(testCompanySearch, testJSSQLMapping);

		expect(parameterizedWHERE).toEqual('WHERE name = $1')
		expect(queryParameters).toEqual(['test']);
		
	});

	let minEmployees = 1;
	test('two filters', () => {

		const testCompanySearch = {
			name,
			minEmployees
		}


		const { parameterizedWHERE, queryParameters } = sqlFilterQueryBuilder(testCompanySearch, testJSSQLMapping);

		expect(parameterizedWHERE).toEqual('WHERE name = $1 AND num_employees >= $2')
		expect(queryParameters).toEqual(['test', minEmployees]);
		
	});

});