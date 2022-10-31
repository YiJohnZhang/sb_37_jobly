/** Routes for JobApplications. */
const express = require('express');

const router = new express.Router();
const { ensureLoggedIn } = require('./middlewareAAE');
const { validateSchemaObject } = require('./middlewareSchemaValidation')

const JobApplication = require("../models/jobApplication");
const newJobApplicationSchema = require('./schemas/jobApplicationNew.schema.json');

/**	POST / { jobApplication } =>  { applied: jobApplication }
 *		// for this assignment specification that is what it should return and only return.
 *	job_application should be { username, job_id, application_state }
 *	Returns { username, job_id, application_state }
 *	Middleware: login (authorization), same user origin+admin (authorization), schemaValidation
 */
router.post('/users/:username/jobs', ensureLoggedIn, validateSchemaObject(newJobApplicationSchema), async(req, res, nxt) => {

	console.log('afds')

	try{

		const result = await JobApplication.create(req.body);
		return res.status(201).send({applied: result});
			// just following project specifications
	
	}catch(error){
		nxt(error);
	}

});

module.exports = router;