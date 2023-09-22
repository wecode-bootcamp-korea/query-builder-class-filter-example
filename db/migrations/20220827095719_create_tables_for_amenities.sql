-- migrate:up
CREATE TABLE amenity_types (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE amenities (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    amenity_type_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT amenities_amenity_type_id_fkey FOREIGN KEY (amenity_type_id) REFERENCES amenity_types(id)
);

CREATE TABLE listings_amenities (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    amenity_id INT NOT NULL,
    listing_id INT NOT NULL,
    CONSTRAINT listings_amenities_amenity_id_fkey FOREIGN KEY (amenity_id) REFERENCES amenities(id),
    CONSTRAINT listings_amenities_listing_it_fkey FOREIGN KEY (listing_id) REFERENCES listings(id)
);


-- migrate:down
DROP TABLE IF EXISTS listings_amenities;
DROP TABLE IF EXISTS amenities;
DROP TABLE IF EXISTS amenity_types;
