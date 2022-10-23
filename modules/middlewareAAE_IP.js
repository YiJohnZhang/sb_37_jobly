/**	Module for Authentication, Authorization, and (check) Existence.
 *  - Authenticate tokens.
 *  - Authorize claimed token.
 *  - Confirm an object's existence in the database.
 */

const jwt = require('jsonwebtoken');

const {JWT_SECRET_KEY} = require('../config');

const {RESPONSE_MESSAGE_MAPPING, ExpressError} = require('./utilities');

/**	authenticateJWT(req, res, nxt)
 *	Authenticates the token presented is valid.
 *	Either proceeds or triggers an error.
 */
const authenticateJWT = (req, res, nxt) => {

	try{

		const bodyToken = req.body._token;
		const payload = jwt.verify(bodyToken, JWT_SECRET_KEY);
		req.currentUser = /*payload*/;	// Create a current user object.
		return nxt();

	}catch(err){
		return nxt();
	}

}

/**	loggedIn(req, res, nxt)
 *	Route requires user to be logged in.
 *	Either proceeds or triggers an error and forces user to a route.
 */
 const loggedIn = (req, res, nxt) => {

	if(req.currentUser){
    	return nxt();
	}else{
    	return nxt({ status: 401, message: "Unauthorized" });
			// refactor with ExpressError and force a route.
	}

}

module.exports = {
	authenticateJWT,
	loggedIn
};