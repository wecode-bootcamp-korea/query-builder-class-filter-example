-- migrate:up
ALTER TABLE users
DROP COLUMN first_name,
DROP COLUMN last_name,
DROP COLUMN mobile_number,
DROP COLUMN name,
DROP COLUMN password;

-- migrate:down

