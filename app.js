//  Framework(s) & Librar(ies)
//  ==========================
const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
// ...
const app = express();

//  Module(s)
//  =========
const {authenticateJWT} = require('./modules/middlewareAAE');
const {schemaValidationMiddleware} = require('./modules/middlewareSchemaValidation');

//  Module(s), Routers
//  ==================
const rootRouter = require('./modules/routerRoot');
const baseURL1Router = require('./modules/routerBaseURL1');

//  Environment Variable(s) & Constant(s)
//  =====================================
const {RESPONSE_MESSAGE_MAPPING, ExpressError} = require('./modules/utilities');
	// it may be helpful to define `NotFoundError` and `UnauthroizedError` to save upon code definition consistency.

//  Settings & Before Middleware
//  ============================
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(authenticateJWT);

//  Routing
//  =======

// ...

// 404 Route Not Found
app.use((req, res, nxt) => {
	const error404 = new ExpressError(404);
	return nxt(error404);
});

// Generic Error Handler
app.use((err, req, res, nxt) => {

	const ERROR_CODE = err.status || 500;

	return res
		.status(ERROR_CODE)
		.send(RESPONSE_MESSAGE_MAPPING[ERROR_CODE].message);
	/* return res
		.status(ERROR_CODE)
		.json(RESPONSE_MESSAGE_MAPPING[ERROR_CODE]);
		*/

	/*res.status(err.status || 500);
	return res.json(
		error:{
			status:err.status,
			message: err.message
		});
		*/
});

module.exports = app;