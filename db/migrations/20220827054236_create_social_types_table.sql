-- migrate:up
CREATE TABLE social_types (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(15) NOT NULL,
  CONSTRAINT social_types_type_ukey UNIQUE (type)
);


INSERT INTO social_types (
  id,
  type 
) VALUES
  (1, "Kakao"),
  (2, "Google");


-- migrate:down
DROP TABLE IF EXISTS social_types;
