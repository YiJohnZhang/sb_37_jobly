"use strict";

const db = require('../database/db');
const User = require("../models/user");
const Company = require("../models/company");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM companies");
  await db.query("TRUNCATE TABLE jobs RESTART IDENTITY CASCADE;");
	// restart serial at 1

  await Company.create(
      {
        handle: "c1",
        name: "C1",
        numEmployees: 1,
        description: "Desc1",
        logoUrl: "http://c1.img",
      });
  await Company.create(
      {
        handle: "c2",
        name: "C2",
        numEmployees: 2,
        description: "Desc2",
        logoUrl: "http://c2.img",
      });
  await Company.create(
      {
        handle: "c3",
        name: "C3",
        numEmployees: 3,
        description: "Desc3",
        logoUrl: "http://c3.img",
      });

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: false,
  });

  await User.register({
    username: "admin",
    firstName: "Admin",
    lastName: "Edmund",
    email: "admin@user.com",
    password: "password",
    isAdmin: true,
  });

	await db.query(`
		INSERT INTO jobs(title, salary, equity, company_handle)
		VALUES	('Front-End Engineer', 90000, 0.00005, 'c1'),
				('Front-End Engineer', 175000, 0, 'c2'),
				('Front-End Engineer', 125000, 0.0001, 'c3'),
				('Back-End Engineer', 130000, 0.0003, 'c3')`);
	
	await db.query(`
		INSERT INTO applications(username, job_id, application_state)
		VALUES	('u1', 1, 'applied'),
				('u1', 2, 'interested'),
				('u2', 2, 'applied'),
				('u1', 3, 'applied')`);

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


const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminUserToken = createToken({ username: "admin", isAdmin: true });

test('dummy test so that \'jest\' isn\'t screaming that \"Your test suite must contain at least one test.\"', () => {
	expect(1).toEqual(1);
});

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token, u2Token,
  adminUserToken
};
