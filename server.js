/**	Application server module.
 */

const app = require('app');
const {PORT_NUMBER} = require('./config');

app.listen(PORT_NUMBER, function () {
	console.log(`Started on http://localhost:${PORT_NUMBER}`);
});