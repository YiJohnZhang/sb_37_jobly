"use strict";

describe("config can come from env", function () {
  test("works", function() {
    // process.env.JWT_SECRET_KEY = "abc";
    process.env.PORT_NUMBER = "5000";
    process.env.DATABASE_URL = "other";
    process.env.NODE_ENV = "other";

    const config = require('../config');
    expect(config.JWT_SECRET_KEY).toEqual("test_secret key");
    expect(config.PORT_NUMBER).toEqual(3000);
    // expect(config.getDatabaseUri()).toEqual("other");
    expect(config.BCRYPT_WORK_FACTOR).toEqual(12);

    delete process.env.JWT_SECRET_KEY;
    delete process.env.PORT_NUMBER;
    delete process.env.BCRYPT_WORK_FACTOR;
    delete process.env.DATABASE_URL;

    // expect(config.getDatabaseUri()).toEqual("jobly");
    // process.env.NODE_ENV = "test";

    // expect(config.getDatabaseUri()).toEqual("jobly_test");
  });
})

