/**	randomPasswordGenerator([, passwordLength])
 *	Returns a length-configurable string that is a strong candidate for a strong password.
 */
const randomPasswordGenerator = require('generate-password')
	// https://www.npmjs.com/package/generate-password

const randomPasswordGenerator = (passwordLength = 12) => {

	return randomPasswordGenerator.generate({
		length:passwordLength,
		numbers:true,
		symbols:true,
		strict:true
	})

}

module.exports = randomPasswordGenerator;
