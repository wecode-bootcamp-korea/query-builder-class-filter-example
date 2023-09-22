-- migrate:up
ALTER TABLE users
ADD COLUMN social_id INT NULL,
ADD COLUMN social_type_id INT NULL,
ADD COLUMN social_nickname VARCHAR(50) NULL,
MODIFY COLUMN password VARCHAR(200) NULL,
MODIFY COLUMN name VARCHAR(30) NULL,
RENAME COLUMN profile_image TO profile_image_url;


ALTER TABLE users
ADD CONSTRAINT users_social_type_id FOREIGN KEY (social_type_id) REFERENCES social_types(id);


-- migrate:down

