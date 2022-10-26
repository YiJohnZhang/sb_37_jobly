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

function filterQueryBuilder(filterData, jsSQLMapping) {



}

module.exports = { sqlForPartialUpdate, filterQueryBuilder };
