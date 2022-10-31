const db = require("../database/db");
const { BadRequestError, NotFoundError } = require("../modules/utilities");
const Job = require("../models/job");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require('./model._testCommon');

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe('create', () => {

});