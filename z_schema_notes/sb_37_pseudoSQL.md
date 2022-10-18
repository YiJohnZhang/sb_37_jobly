# Jobly Pseudo Code
companies
-
handle varchar(25) pk				# check (handle = lower(handle))
name text unique					# 
num_employees int					# check num_employees >= 0
description text					# 
logo_url text nullable				# 

jobs
-
id serial pk						#
title text							# 
salary int							# check salary >= 0
equity numeric						# check equity <= 1.0
company_handle varchar(25) fk - companies.handle		# REFERENCES companies ON DELETE CASCADE

users
-
username varchar(25) pk				# 
password text						#
first_name text						#
last_name text	 					#
email text unique					# check (position('@' IN email) > 1)
is_admin boolean					# default false

# CREATE TYPE job_application_state AS ENUM ('interested', 'applied', 'accpeted', rejected);
applications						# join_users_jobs
-
username varchar(25) fk >- users.username				# REFERENCES users ON DELETE CASCADE    -- m-n
job_id int fk >- jobs.id         						# REFERENCES jobs ON DELETE CASCADE     -- m-n
    # primary key(username, job_id)	# composite
application_state job_application_state

technologies
-
id serial pk
name text

technologies_jobs					# join_jobs_technologies
-                                   # ideally this would be in a NoSQL database or arr datatype
technology_id int fk >- technologies.id				# REFERENCES technologies ON DELETE CASCADE -- m-n
job_id int fk >- jobs.id    						# REFERENCES jobs ON DELETE CASCADE         -- m-n

technologies_users					# join_users_technologies
-                                   # ideally this would be in a NoSQL db
technology_id int fk >- technologies.id				# REFERENCES technologies ON DELETE CASCADE -- m-n
username varchar(25) fk >- users.username			# REFERENCES users ON DELETE CASCADE        -- m-n

