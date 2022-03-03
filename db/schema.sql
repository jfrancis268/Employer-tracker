DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE department_role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary INT,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NULL REFERENCES id,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
    REFERENCES department_role(id),
);

