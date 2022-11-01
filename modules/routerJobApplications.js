/** Routes for JobApplications. */
const express = require('express');

const router = new express.Router();
const { ensureLoggedIn, isReferenceUser } = require('./middlewareAAE');
const { validateSchemaObject } = require('./middlewareSchemaValidation')

const JobApplication = require("../models/jobApplication");
const newJobApplicationSchema = require('./schemas/jobApplicationNew.schema.json');

/**	POST / { jobApplication } =>  { applied: jobApplication }
 *		// for this assignment specification that is what it should return and only return.
 *	job_application should be { username, job_id, application_state }
 *	Returns { username, job_id, application_state }
 *	Middleware: login (authorization), same user origin+admin (authorization), schemaValidation
 */
router.post('/users/:username/jobs', ensureLoggedIn, isReferenceUser, validateSchemaObject(newJobApplicationSchema), async(req, res, nxt) => {

	try{

		const result = await JobApplication.create(req.body);
		return res.status(201).send({applied: result.jobId});
			// just following project specifications
	
	}catch(error){	
		nxt(error);
	}

});

module.exports = router;