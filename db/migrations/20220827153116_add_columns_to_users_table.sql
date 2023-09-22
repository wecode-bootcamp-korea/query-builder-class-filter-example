-- migrate:up
ALTER TABLE users
ADD COLUMN first_name VARCHAR(20) NOT NULL,
ADD COLUMN last_name VARCHAR(20) NOT NULL,
ADD COLUMN mobile_number VARCHAR(30) NULL;


-- migrate:down

