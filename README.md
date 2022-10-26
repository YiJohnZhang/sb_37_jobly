# sb_37_jobly
Jobly. Springboard Cumulative Project, publicy viewable.

## Time Tracker
|Entry No.|Assignment|Date|Time|Time Elasped (min)|
|-|-|-|-|-|
|01|Setup and pseudo-code.|2022-10-17|20:18 - 21:10|52|
|02|Setup app.|2022-10-22|17:45 - 18:14|29|
|03|Continue setting up the app.|2022-10-22|19:58 - 22:23|145|
|04|Continue setting up the app.|2022-10-25|21:52 - 22:32|40|
|05|Continue setting up the app.|2022-10-25|22:33 - 23:33|60|
|06|Need to fix tests.|2022-10-2|: - :||
|06||2022-10-2|: - :||
|06||2022-10-2|: - :||
|06||2022-10-2|: - :||
||||**Total Time**| minutes|


05

to do:
- need to get tests working. getting `error: duplicate key value violates unique constraint "users_pkey"` => `await db.query("DELETE FROM ...")`js isn't behaving as expected


done:
- changed `auth.js` for handling authentication middleware to `middlewareAAE.js`
- modified file names of model tests with a `model.` prefix.
- modified file names of route tests with a `router.` prefix.
- modified the `helper/` module tests name with a `helper.` prefix
- relocated all tests to `__tests__/`

to do:
- modify `config.test.js`


04
to do:
- modify all tests; place them in `__tests__` and updating requirements.
- reconfigure:
	- `app.test.js`, `config.test.js`
- modify file name for routing middleware and tests.

done:
- `middlewareSchemaValidation`
- reconfigured:
	- `helpers/`
	- replaced `modules/middlewareAAE_IP` with native jobly `auth.js`
- imported:
	- `routes/...`
	- imported `routes/auth.js` as `routerAuthentication.js` and respective test.
	- `middleware/auth.js` and respective test file
	- `app.test.js`: need to modify test
	- `config.test.js`: need to modify test
- modified:
	- `app.js`





- `middlewareSchemaValidation`
still need to reconfigure:
- `database/jobly-seed...`
- `helpers/`
- `modules/middlewareAAE_IP`
import:
- `routes/`
- `app.test.js`
- `config.test.js`
look into: 
- config.js`, `app.js`
- `middleware/auth.js` & `auth.test.js`

03
- `middlewareSchemaValidation`
- update tests: update utiliit.esjs 
- router
- model.js