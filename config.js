/**	Application confguration variables.
 */
const DB_URI = process.env.NODE_ENV === "test"	? "postgresql:///sb_37_jobly_I_test" : "postgresql:///sb_37_jobly_I";

const PORT_NUMBER = 3000;
	//process.env it later

const BCRYPT_WORK_FACTOR = 12;

const JWT_SECRET_KEY = process.env.SECRET_KEY || "test_secret key";

module.exports = {
	DB_URI,
	PORT_NUMBER,
	JWT_SECRET_KEY,
	BCRYPT_WORK_FACTOR
};