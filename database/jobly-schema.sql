DROP TABLE IF EXISTS technologies_users CASCADE;
DROP TABLE IF EXISTS technologies_jobs CASCADE;
DROP TABLE IF EXISTS technologies CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

CREATE TABLE companies (
	handle VARCHAR(25) PRIMARY KEY CHECK (handle = lower(handle)),
	name TEXT UNIQUE NOT NULL,
		-- `name` is non-reserved
	num_employees INTEGER CHECK (num_employees >= 0),
	description TEXT NOT NULL,
	logo_url TEXT
);

CREATE TABLE users (
	username VARCHAR(25) PRIMARY KEY,
	password TEXT NOT NULL,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL
    	CHECK (position('@' IN email) > 1),
	is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE jobs (
	id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	salary INTEGER CHECK (salary >= 0),
	equity NUMERIC CHECK (equity <= 1.0),
	company_handle VARCHAR(25) NOT NULL
    	REFERENCES companies ON DELETE CASCADE
);

CREATE TYPE job_application_state AS ENUM ('interested', 'applied', 'accepted', 'rejected');

CREATE TABLE applications (
	username VARCHAR(25)
		REFERENCES users ON DELETE CASCADE,
	job_id INTEGER
		REFERENCES jobs ON DELETE CASCADE,
	application_state job_application_state,
	PRIMARY KEY (username, job_id)
);

CREATE TABLE technologies (
	id SERIAL PRIMARY KEY,
	name TEXT UNIQUE NOT NULL
);

CREATE TABLE technologies_jobs (
	technology_id INTEGER
		REFERENCES technologies ON DELETE CASCADE,
	job_id INTEGER
		REFERENCES jobs ON DELETE CASCADE,
	PRIMARY KEY (technology_id, job_id)
);

CREATE TABLE technologies_users (
	technology_id INTEGER
		REFERENCES technologies ON DELETE CASCADE,
	username TEXT
		REFERENCES users ON DELETE CASCADE,
	PRIMARY KEY (technology_id, username)
);
