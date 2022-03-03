INSERT INTO department (department_name)
VALUES ('Retail'), 
       ('Servicing'), 
       ('Sales');

INSERT INTO department_role (title, department_id, salary)
VALUES ('Specialist', 1, 40000), 
       ('Expert', 1, 45000), 
       ('Pro', 1, 50000), 
       ('Manager', 1, 60000), 
       ('Genius', 2, 45000),
       ('Creative', 1, 48000), 
       ('Business Pro', 3, 70000), 
       ('Business Expert', 3, 65000); 


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Liliana', 'Owen', 4, NULL),
       ('Oliver', 'Brown', 4, NULL),
       ('Sarah', 'Hilman', 6, 1),
       ('Elise', 'Rollins', 2, 3),
       ('Isai', 'Dyer', 1, 1),
       ('Darryl', 'Perry', 7, NULL),
       ('Alazia', 'Walton', 9, NULL),
       ('Tyrell', 'Smith', 8, NULL),
       ('Elle', 'Barber', 8, NULL),
       ('Isabella', 'Walton', 1, 4);