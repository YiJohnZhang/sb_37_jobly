/**	Module for middleware that validates a JSON request body with its corresponding schema.
 */

const jsonschema = require('jsonschema');

const {ModelName, /* ... */} = require('../models/models');
const newCompanySchema = require('./schemas/companyNew.schema.json');
const updateCompanySchema = require('./schemas/companyUpdate.schema.json');
const newCompanySchema = require('./schemas/companyNew.schema.json');
const updateCompanySchema = require('./schemas/companyUpdate.schema.json');

const {RESPONSE_MESSAGE_MAPPING, ExpressError} = require('./utilities');

/**	validateSchemaObject(requestBodyObject, selectedSchema)
 *	
 */
const validateSchemaObject = (requestBodyObject, selectedSchema) => {

	const schemaValidationResult = jsonschema.validate(requestBodyObject, selectedSchema);
	// const schemaResult = jsonschema.validate(requestBodyObject, exampleRequestSchema);

	return schemaValidationResult;

}

/**	handleSchemaError(schemaValidationResult)
 *	
 */
const handleSchemaError = (schemaValidationResult) => {

	const schemaErrorList = schemaValidationResult.errors.map((error) => error.stack);
	return new ExpressError(400, schemaErrorList);

}

// is there a more efficient pattern?
	// chceck this out: https://stackoverflow.com/a/12737295
	// also maybe build an obj literal (to-do later, build list from list of files in env schemas dir.)

/**	validateNewCompanySchema
 *	Validation middleware for `newCompanySchema`
 */
const validateNewCompanySchema = (req, res, nxt) => {

	const validationResult = validateSchemaObject(req.body, newCompanySchema);
	// const validationResult = validateSchemaObject(req.body.subObject, selectedSchema)

	if(!validationResult.valid){

		const schemaError = handleSchemaError(validationResult);
		nxt(schemaError);

	}

	nxt();

}

/**	validateUpdateCompanySchema
 *	Validation middleware for `updateCompanySchema`
 */
const validateUpdateCompanySchema = (req, res, nxt) => {

	const validationResult = validateSchemaObject(req.body, updateCompanySchema);
	// const validationResult = validateSchemaObject(req.body.subObject, selectedSchema)

	if(!validationResult.valid){

		const schemaError = handleSchemaError(validationResult);
		nxt(schemaError);

	}

	nxt();

}


module.exports = {
	validateNewCompanySchema,
	validateUpdateCompanySchema,
	validateAuthenticateUserSchema,
	validateRegisterUserSchema,
	validateUpdateUserSchema
}