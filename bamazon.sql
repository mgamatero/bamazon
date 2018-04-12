CREATE DATABASE bamazon;

USE bamazon;
CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price FLOAT(30) NOT NULL,
stock_quantity INTEGER(11) NOT NULL
);


INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES('socks','apparel',5.99,10),
('shorts','apparel',15.99,10),
('toothbrush','health',2.99,10),
('shoes','footwear',55.99,10),
('tanktop','apparel',20.99,10),
('iphone 6','technology',399.99,5),
('toothpaste','health',5.99,3),
('cardigan','apparel',35.99,10),
('belt','apparel',25.99,10),
('cologne','health',35.99,5);
		
 USE bamazon;
 UPDATE products SET stock_quantity = 10;
 SELECT * FROM products;
      
USE bamazon;
SELECT * FROM products;