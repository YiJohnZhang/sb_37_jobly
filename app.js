//  Framework(s) & Librar(ies)
//  ==========================
const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
// ...
const app = express();

//  Module(s)
//  =========
const {authenticateJWT} = require('./modules/auth');

//  Module(s), Routers
//  ==================
const authenticationRoutes = require('./modules/routerAuthentication');
const companiesRoutes = require('./modules/routerCompanies');
const usersRoutes = require('./modules/routerUsers');
const technologiesRoutes = require('./routerTechnologies')

//  Environment Variable(s) & Constant(s)
//  =====================================
const {RESPONSE_MESSAGE_MAPPING, NotFoundError} = require('./modules/utilities');

//  Settings & Before Middleware
//  ============================
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(authenticateJWT);

//  Routing
//  =======
app.use("/auth", authenticationRoutes);
app.use("/companies", companiesRoutes);
app.use("/users", usersRoutes);
app.use("/technologies", technologiesRoutes);

// ...

// 404 Route Not Found
app.use((req, res, nxt) => {
	return nxt(new NotFoundError);
});

// Generic Error Handler
app.use((err, req, res, nxt) => {

	const ERROR_CODE = err.status || 500;

	return res
		.status(ERROR_CODE)
		.send(RESPONSE_MESSAGE_MAPPING[ERROR_CODE].message);

});

module.exports = app;