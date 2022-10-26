const { BadRequestError } = require('../modules/utilities');

/**	sqlForPartialUpdate(dataToUpdate, jsToSql)
 *	Generates a SQL parameterized query string and an array of parameters based on the data, `dataToUpdate`, passed in with `jsToSql` that maps the JavaScript object keys to corresponding SQL property names.
 *		The latter is unnecessary if the JavaScript properties were already named with underscores, `_`.
*/
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data.");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

/**	sqlFilterQueryBuilder(filterData, jsSQLMapping)
 *	Generates a SQL parameterized query string and an array of parameters based on the data, `filterData`, passed in with `jsSQLMapping` that maps the JavaScript object keys to corresponding SQL property names. This method allows `filterData` to be empty.
*/
function sqlFilterQueryBuilder(filterData, jsSQLMapping) {

	const keys = Object.keys(filterData);

	if (!keys.length)
		return;
	
	if(filterData.minEmployees && filterData.maxEmployees && filterData.minEmployees > filterData.maxEmployees)
		throw new BadRequestError('The lower bound of number of employees cannot be greater than that of the upper bound.');

	const queryArray = keys.map((key, index) => `${jsSQLMapping[key]} $${index+1}`);
	
	return {
		parameterizedQuery: `WHERE ${queryArray.join(' AND ')}`,
		queryParameters: Object.values(filterData)
	};

}

module.exports = { sqlForPartialUpdate, sqlFilterQueryBuilder };
