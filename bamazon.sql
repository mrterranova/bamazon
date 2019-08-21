-- CREATE DATABASE bamazon;

-- USE bamazon;

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50), 
price FLOAT(10) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 	
	VALUES ("Christmas Lights", "Seasonal", 5.00, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
	VALUES ("Christmas Tree", "Seasonal", 30.00, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
	VALUES ("Spiral Notebook", "Office Supplies", 3.00, 90);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
	VALUES ("Poster Frame", "Decor", 16.00, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
	VALUES ("Poinsettia Wreath", "Floral", 10.00, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
	VALUES ("Candle Making Kit", "Crafts", 20.00, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
	VALUES ("Red/Green Wrapping Paper", "Seasonal", 3.00, 92);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
	VALUES ("Elf Print Wool", "Fabric", 7.00, 24);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
	VALUES ("Small Sewing Machine", "Fabric", 50.00, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
	VALUES ("Elf Hat", "Seasonal", 5.00, 70);

SELECT * FROM products;