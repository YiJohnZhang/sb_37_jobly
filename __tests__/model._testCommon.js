const bcrypt = require("bcrypt");

const db = require('../database/db');
const { BCRYPT_WORK_FACTOR } = require('../config');

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM companies");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
	
	await db.query('DELETE FROM jobs');

  await db.query(`
    INSERT INTO companies(handle, name, num_employees, description, logo_url)
    VALUES ('c1', 'C1', 1, 'Desc1', 'http://c1.img'),
           ('c2', 'C2', 2, 'Desc2', 'http://c2.img'),
           ('c3', 'C3', 3, 'Desc3', 'http://c3.img')`);

  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);

	await db.query(`
		INSERT INTO jobs(title, salary, equity, company_handle)
		VALUES	('Front-End Engineer', 90000, 0.00005, 'c1'),
				('Front-End Engineer', 175000, 0, 'c2'),
				('Front-End Engineer', 125000, 0.0001, 'c3'),
				('Back-End Engineer', 130000, 0.0003, 'c3')`);
	
}

async function commonBeforeEach() {
	await db.query('BEGIN');
}

async function commonAfterEach() {
  await db.query('ROLLBACK');
}

async function commonAfterAll() {
  await db.end();
}

test('dummy test so that \'jest\' isn\'t screaming that \"Your test suite must contain at least one test.\"', () => {
	expect(1).toEqual(1);
});

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
};