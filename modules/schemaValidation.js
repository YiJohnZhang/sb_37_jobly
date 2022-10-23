/**	Module for middleware that validates a schema.
 */

const jsonschema = require('jsonschema');

const {ModelName, /* ... */} = require('../models/models');
const exampleRequestSchema = require('../models/schemaSchemaName.js');

const {RESPONSE_MESSAGE_MAPPING, ExpressError} = require('./utilities');

const validateGeneralSchemaObject = (req, res, nxt) => {

	const schemaValidationResult = jsonschema.validate(req.body, selectedSchema);
	// const schemaResult = jsonschema.validate(req.body, exampleRequestSchema);


	if(!schemaValidationResult.valid){

		const schemaErrorList = schemaValidationResult.errors.map((error) => error.stack);
		const schemaError = new ExpressError(400, schemaErrorList);
		return nxt(schemaError);

	}

	nxt();

}

// need to continue prototyping a general schema validator method; pass in `selectedSchema`
const validateNewCompanySchema = (req, res, nxt) => {




}


module.exports = {
	validateSchemaNameMiddleware
}