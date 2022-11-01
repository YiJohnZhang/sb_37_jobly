/**	Module for middleware that validates a JSON request body with its corresponding schema.
 */

const jsonschema = require('jsonschema');

const {ExpressError} = require('./utilities');

/**	validateSchemaObject(selectedSchema)
 *	General schema object validator.
 */
const validateSchemaObject = (selectedSchema) => {

	return (req, res, nxt) => {

		const schemaValidationResult = jsonschema.validate(req.body, selectedSchema);

		if(schemaValidationResult.valid)
			return nxt();

		const schemaErrorList = schemaValidationResult.errors.map((error) => error.stack);
		const schemaError = new ExpressError(400, schemaErrorList);

		return nxt(schemaError);

	};

}

module.exports = {
	validateSchemaObject
}