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
|06|Need to fix tests.|2022-10-25|23:35 - 23:54|19|
|07|Clean up initial application.|2022-10-26|00:34 - 00:51|17|
|08|Part 4 deliverable.|2022-10-26|09:07 - 09:48|41|
|09||2022-10-26|10:57 - 12:49|112|
|10||2022-10-30|10:48 - 12:10|82|
|11|**Part 4** TDD|2022-10-30|15:56 - 17:18|82|
|12|Finished `Jobs` model.|2022-10-30|18:38 - 20:28|110|
|13||2022-10-30|22:11 - 23:07|56|
|14||2022-10-31|14:25 - :||
|15||2022-10-31|: - :||
||||**Total Time**| minutes|

13: 845 minutes
darn, could have been 274 minutes (4 hours 34 minutes less if I just took the vanilla codebase)

need to complete:
- `models.jobApplication.test`
- `router.JobApplication.test`
- `router.Jobs.test`
- `router.Jobs`
- `models.jobApplication` (handle post only)
- `router.JobApplication` (post)
- authorization refactoring
- estimate: 3 - 5 hours w/ tests

# Specifications:
- Base Assignment Requirements
- All `Further Study` Specifications
	- Random Password Generation with Admin create route (`/users/new`)
	- Using a `ENUM`sql type for `application_state`.
	- Added the following relations:
		- `technologies` relation.
		- `technologies_users` relation, `technologies` and `users` `JOIN`sql table.
		- `technologies_jobs` relation, `technologies` and `jobs` `JOIN`sql table.
		- 

# Part 4: Jobs `FLOAT`sql vs. `NUMERIC`sql
The `pg` library returns a string from a `NUMERIC`sql type. I hypothesize this is so because JavaScript `Number`js only has a floating-precision number type. Therefore to keep it exact, it is a `String`js.

A SQL `FLOAT`sql/`FLOAT(n)`sql is a [**floating-precision** number data type](https://en.wikipedia.org/wiki/Single-precision_floating-point_format): it stores the number in three portions:
- the number itself as a fraction, **significand**,
- by representing it as an **exponent** of 10,
- with an optional bit for the number's **sign**.
- The precision of the number stored in the data-type is thus limited to the number of bits allocated to the significand.

A SQL `NUMERIC(precision, scale)`sql is a **fixed-precision** number data type: it stores the number directly as it is and scales the number that is fixed upon initialization. The scale represents the placement of the decimal point. As of SQL, *precision* represents the total number of digits; and *scale* represents the implicit placement of the decimal point to attach.

In summary, both floating-precision and fixed-precision both represents the number it stores in scientfiic notation --as a power of 10. However, a floating-precision number can represent more numbers than the number of bits allocated to significand at the cost of precision beyond said number; while a fixed-precision number is only capable of representing the number of bits it has been allocated at the cost of representing far fewer numbers than that of a floating-precision number.

# Version Notes
11

10
- try actually practicing tdd
- work on part 4 next session

09
- **02**: need to add .filter method (finished tdd and implementation of helper, `sqlFilterQueryBuilder()` in `helpers/sql`)
- ****

07
- notes: when testing: remember to use the `runInBand` flag otherwise transactions overlap and messup, yielding unique key errors, use: `jest --runInBand`sh.
- I initially got the tests to work because injecting an extra `console.log()`js probably so happened to be a large enough change that one parallel test was slowed down so that database unique key errors won't happen before the cache sped tests up again. Retrospect: You could have saved ~1 hour if you read `Part One: Setup / Starter Code`. 
- todo:
	- 

06
cleaned up.

05
notes: fixed bugs


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