CREATE DATABASE crudfullstack;

CREATE TABLE if not exists product (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    model VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    image VARCHAR(200) UNIQUE NOT NULL,
    create_AT TIMESTAMP NOT NULL
)
