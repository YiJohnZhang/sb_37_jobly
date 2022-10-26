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
|06||2022-10-2|: - :||
|06||2022-10-2|: - :||
|06||2022-10-2|: - :||
||||**Total Time**| minutes|

297 minutes

05
notes:
  ● POST /users › unauth for anon

    expect(received).toEqual(expected) // deep equality

    Expected: 401
    Received: 403

      82 |           isAdmin: true,
      83 |         });
    > 84 |     expect(resp.statusCode).toEqual(401);
         |                             ^
      85 |   });
      86 |
      87 |   test("bad request if missing data", async function () {

      at Object.toEqual (__tests__/router.Users.test.js:84:29)

  ● GET /users › unauth for anon

    expect(received).toEqual(expected) // deep equality

    Expected: 401
    Received: 403

      148 |     const resp = await request(app)
      149 |         .get("/users");
    > 150 |     expect(resp.statusCode).toEqual(401);
          |                             ^
      151 |   });
      152 |
      153 |   test("fails: test next() handler", async function () {

      at Object.toEqual (__tests__/router.Users.test.js:150:29)

  ● GET /users/:username › unauth for anon

    expect(received).toEqual(expected) // deep equality

    Expected: 401
    Received: 403

      184 |     const resp = await request(app)
      185 |         .get(`/users/u1`);
    > 186 |     expect(resp.statusCode).toEqual(401);
          |                             ^
      187 |   });
      188 |
      189 |   test("not found if user not found", async function () {

      at Object.toEqual (__tests__/router.Users.test.js:186:29)

  ● PATCH /users/:username › unauth for anon

    expect(received).toEqual(expected) // deep equality

    Expected: 401
    Received: 403

      222 |           firstName: "New",
      223 |         });
    > 224 |     expect(resp.statusCode).toEqual(401);
          |                             ^
      225 |   });
      226 |
      227 |   test("not found if no such user", async function () {

      at Object.toEqual (__tests__/router.Users.test.js:224:29)

  ● DELETE /users/:username › unauth for anon

    expect(received).toEqual(expected) // deep equality

    Expected: 401
    Received: 403

      279 |     const resp = await request(app)
      280 |         .delete(`/users/u1`);
    > 281 |     expect(resp.statusCode).toEqual(401);
          |                             ^
      282 |   });
      283 |
      284 |   test("not found if user missing", async function () {

      at Object.toEqual (__tests__/router.Users.test.js:281:29)

● POST /auth/token › unauth with non-existent user

    expect(received).toEqual(expected) // deep equality

    Expected: 401
    Received: 403

      39 |           password: "password1",
      40 |         });
    > 41 |     expect(resp.statusCode).toEqual(401);
         |                             ^
      42 |   });
      43 |
      44 |   test("unauth with wrong password", async function () {

      at Object.toEqual (__tests__/router.Authentication.test.js:41:29)

  ● POST /auth/token › unauth with wrong password

    expect(received).toEqual(expected) // deep equality

    Expected: 401
    Received: 403

      49 |           password: "nope",
      50 |         });
    > 51 |     expect(resp.statusCode).toEqual(401);
         |                             ^
      52 |   });
      53 |
      54 |   test("bad request with missing data", async function () {

      at Object.toEqual (__tests__/router.Authentication.test.js:51:29)

- other 2 fails: throw in a dummy test for `model._testCommons.js` and `router._testCommons.js`.

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