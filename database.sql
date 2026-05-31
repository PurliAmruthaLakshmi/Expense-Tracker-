CREATE DATABASE expense_tracker;

USE expense_tracker;

CREATE TABLE expenses(
    id INT PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(100),
    amount DECIMAL(10,2),
    category VARCHAR(50),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);