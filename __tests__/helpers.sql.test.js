const { sqlForPartialUpdate, sqlFilterQueryBuilder } = require('../helpers/sql');

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
		minEmployees: 'num_employees >=',
		maxEmployees: 'num_employees <='
	}

	test(`no filters`, () => {

		const testCompanySearch = {
		}

		const testFilter = sqlFilterQueryBuilder(testCompanySearch, testJSSQLMapping);

		expect(testFilter).toBeUndefined();

	});


	let testMinimum = 1;

	test(`with name and at least ${testMinimum} employee(s)`, () => {

		const testCompanySearch = {
			name: 'test',
			minEmployees: testMinimum
		}

		const { parameterizedQuery, queryParameters } = sqlFilterQueryBuilder(testCompanySearch, testJSSQLMapping);

		expect(parameterizedQuery).toEqual('WHERE name = $1 AND num_employees >= $2');
		expect(queryParameters).toEqual(['test', testMinimum]);

	});
	test(`at least ${testMinimum} employee(s)`, () => {

		const testCompanySearch = {
			minEmployees: testMinimum
		}

		const { parameterizedQuery, queryParameters } = sqlFilterQueryBuilder(testCompanySearch, testJSSQLMapping);

		expect(parameterizedQuery).toEqual('WHERE num_employees >= $1');
		expect(queryParameters).toEqual([testMinimum]);

	});

	let testMaximum = 100;
	
	test(`with name and at most ${testMaximum} employee(s)`, () => {

		const testCompanySearch = {
			name: 'test',
			maxEmployees: testMaximum
		}

		const { parameterizedQuery, queryParameters } = sqlFilterQueryBuilder(testCompanySearch, testJSSQLMapping);

		expect(parameterizedQuery).toEqual('WHERE name = $1 AND num_employees <= $2');
		expect(queryParameters).toEqual(['test', testMaximum]);

	});
	test(`at most ${testMaximum} employee(s)`, () => {

		const testCompanySearch = {
			maxEmployees: testMaximum
		}

		const { parameterizedQuery, queryParameters } = sqlFilterQueryBuilder(testCompanySearch, testJSSQLMapping);

		expect(parameterizedQuery).toEqual('WHERE num_employees <= $1');
		expect(queryParameters).toEqual([testMaximum]);

	});

	test(`with name and bounded between [${testMinimum}, ${testMaximum}]`, () => {

		const testCompanySearch = {
			name: 'test',
			minEmployees: testMinimum,
			maxEmployees: testMaximum
		}

		const { parameterizedQuery, queryParameters } = sqlFilterQueryBuilder(testCompanySearch, testJSSQLMapping);

		expect(parameterizedQuery).toEqual('WHERE name = $1 AND num_employees >= $2 AND num_employees <= $3');
		expect(queryParameters).toEqual(['test', testMinimum, testMaximum]);

	});
	test(`bounded between [${testMinimum}, ${testMaximum}]`, () => {

		const testCompanySearch = {
			minEmployees: testMinimum,
			maxEmployees: testMaximum
		}

		const { parameterizedQuery, queryParameters } = sqlFilterQueryBuilder(testCompanySearch, testJSSQLMapping);

		expect(parameterizedQuery).toEqual('WHERE num_employees >= $1 AND num_employees <= $2');
		expect(queryParameters).toEqual([testMinimum, testMaximum]);

	});

	test('Bad Request: the lower bound is greater than that of the upper bound', () => {

		const testCompanySearch = {
			minEmployees: testMinimum,
			maxEmployees: testMaximum
		}
		
		testMinimum = 101;

		try{

			const { parameterizedQuery, queryParameters } = sqlFilterQueryBuilder(testCompanySearch, testJSSQLMapping);

		}catch(error){

			expect(error.status).toBe(400);
			expect(error.message).toBe('The lower bound of number of employees cannot be greater than that of the upper bound.')

		}		

	});

})
