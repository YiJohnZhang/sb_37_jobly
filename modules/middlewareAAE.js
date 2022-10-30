"use strict";
/**	Module for Authentication, Authorization, and (check) Existence.
 *  - Authenticate tokens.
 *  - Authorize claimed token.
 *  - Confirm an object's existence in the database.
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');
const { UnauthorizedError } = require('./utilities');


/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
	try {
		const authHeader = req.headers && req.headers.authorization;
		if (authHeader) {
			console.log(authHeader);
			const token = authHeader.replace(/^[Bb]earer /, "").trim();
			console.log(token);
			console.log(jwt.verify(token, JWT_SECRET_KEY));
			res.locals.user = jwt.verify(token, JWT_SECRET_KEY);
				// The provided Springboard code base stores the token on `res.locals...` because the `/auth` route is used to generate the token from the previous request. This way, I guess it doesn't persist locally? but is secure from being copied.
		}
		return next();
	} catch (err) {
		return next();
	}
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
	try {
		if (!res.locals.user) throw new UnauthorizedError();
		return next();
	} catch (err) {
		return next(err);
	}
}

/** Middleware to check wehter or not the user is an admin.
 *
 * If not, raises Unauthorized.
 */

function isAdmin(req, res, next) {
}

/** Middleware to check whether or not the current user matches a modified user handle.
 *
 * If not, raises Unauthorized.
 */

function isReferenceUser(req, res, next) {
}

module.exports = {
	authenticateJWT,
	ensureLoggedIn,
	isAdmin,
	isReferenceUser
};
