/**	randomPasswordGenerator([, passwordLength])
 *	Returns a length-configurable string that is a strong candidate for a strong password.
 */
const passwordGenerator = require('generate-password');
	// https://www.npmjs.com/package/generate-password

function randomPasswordGenerator(passwordLength = 12) {

	return passwordGenerator.generate({
		length:passwordLength,
		numbers:true,
		symbols:true,
		strict:true
	})

}

module.exports = randomPasswordGenerator;
