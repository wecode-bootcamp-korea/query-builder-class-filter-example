-- migrate:up
CREATE TABLE listing_types (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    CONSTRAINT listing_types_type_ukey UNIQUE (type)
);

CREATE TABLE listings (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    host_id INT NOT NULL,
    listing_type_id INT NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    price DECIMAL(9,2) NOT NULL,
    num_guests INT NOT NULL,
    num_bedrooms INT NOT NULL,
    num_beds INT NOT NULL,
    num_baths INT NOT NULL,
    country VARCHAR(50) NOT NULL,
    region VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    address VARCHAR(300) NOT NULL,
    latitude DECIMAL(7,5) NOT NULL,
    longitude DECIMAL(7,5) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT listings_host_id_fkey FOREIGN KEY (host_id) REFERENCES users(id),
    CONSTRAINT listings_listing_type_id_fkey FOREIGN KEY (listing_type_id) REFERENCES listing_types(id)
);


-- migrate:down
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS listing_types;

