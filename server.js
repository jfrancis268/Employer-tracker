const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { add } = require('lodash');
const Choice = require('inquirer/lib/objects/choice');
const Choices = require('inquirer/lib/objects/choices');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username
        user: 'root',
        // MySQL pass
        password: "Jugglingsuck2",
        database: 'company_db'
    },
    console.table(`Connected to the company_db database.`)
);

// First prompt/Main menu questions
const startOption = () => {
    inquirer
        .prompt({
            type: 'list',
            message: 'Choose an action',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add Role', 'Add An Employee', 'Update An Employee Role', 'Quit'],
            name: 'start'
        })
        .then((answer) => {
            switch(answer.start) {
                case 'View All Departments':
                    viewAllDepartments();
                break;
                case 'View All Roles':
                    viewAllRoles();
                break;
                case 'View All Employees':
                    viewAllEmployees();
                break;                
                case 'Add Department':
                    addDepartment();
                break;
                case 'Add Role':
                    addRole();
                break;
                case 'Add Employees':
                    addEmployees();
                break;
                case 'Update An Employee Role':
                    updateEmployeeRole
                break;
                // db.end to end connection
                case 'Quit':
                    db.end()
                    console.table('You have ended your session. Have a great day!')
                break;
            }
        })
};

// View all departments
const viewAllDepartments = () => {
    db.query("SELECT * FROM company_db.department", (err, result) => {
        if (err) {
            console.table(err);
        }
        console.table(result);
        startOption();
    })
}

// View all roles
const viewAllRoles = () => {
    db.query("SELECT * FROM company_db.department_role", (err, result) => {
        if (err) {
            console.table(err);
        }
        console.table(result);
        startOption();
    })
}

// View all employees
const viewAllEmployees = () => {
    db.query("SELECT employee.id, employee.first_name , employee.last_name, department_role.title, department.department_name , department_role.salary , employee.manager_id FROM employee JOIN department_role ON employee.role_id = department_role.id JOIN department ON department_role.department_id = department.id;", (err, result) => {
        if (err) {
            console.table(err);
        }
        console.table(result);
        startOption();
    })
}

// Add a department
const addDepartment = () => {
    inquirer
        .prompt({
            type: 'input',
            message: "What's the name of the department you'd like to add?",
            name: 'department_name'
        })
        .then((answer) => {
            db.query(`INSERT INTO department SET department_name = ?`, [answer.department_name], (err, result) => {
                if(err){
                    console.table(err);
                }
                console.table('Department added sucessfully')
                startOption();
            })
        })
}

// Add a role
const addRole = () => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Which role would you like to add?',
                    name: 'title'
                },
                {
                    type: 'list',
                    message: 'What is the department in which this role belongs to? Choices(1 - Engineering, 2 - Finance, 3 - Legal, 4 - Sales, 5 - HR)',
                    choices: ['1', '2', '3', '4', '5'],
                    name: 'department_id'
                },
                {
                    type: 'input',
                    message: 'What is the salary for this new role?',
                    name: 'salary'
                }
            ])
            .then((answer) => {
                db.query(`INSERT INTO department_role SET title = ?, department_id = ?, salary = ?`, [answer.title, answer.department_id, answer.salary], (err, result) => {
                    if(err) {
                        console.table(err);
                    }
                    console.table('Role has been added successfully')
                    startOption();
                })
            })
}

// Add an employee
const addEmployees = () => {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: "What is the employee's first name?",
                        name: 'first_name',
                    },
                    {
                        type: 'input',
                        message: "What is the employee's last name?",
                        name: 'last_name',
                    },
                    {
                        type: 'list',
                        message: "What is the employee's role? Choices(1 - Specialist, 2 - Expert, 3 - Pro, 4 - Manager, 5 - Genius, 6 - Creative, 7 - Business Pro, 8- Business Expert)",
                        choices: ['1','2','3','4','5','6','7','8'],
                        name: 'role_id',
                    },
                    {
                        type: 'list',
                        message: "Who is the employee's manager? Choices(1 - Liliana Owen, 2 - Tyrell Smith, 3 - Alazia Walton, 4 - Oliver Brown)?",
                        choices: ['1', '2', '3', '4'],
                        name: 'manager_id',
                    }
                ])
                then((answer) => {
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answer.first_name, answer.last_name, answer.role_id , answer.manager_id], (err, result) => {
                        if (err) {
                            console.table(err);
                        }
                        console.table('New Employee Added Sucessfully');
                        startOption();
                })
        })
}

//Update an employee
const updateEmployeeRole = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Which employee would you like to update? Choices(1 - Liliana Owen, 2 - Tyrell Smith, 3 - Alazia Walton, 4 - Oliver Brown, 5 - Isabella Walton, 6 - Darryl Perry, 7 - Elise Rollins, 8 - Yandel Bowers, 9 - Isai Dyer, 10 - Anton Duncan, 11 - Sarah Hilman, 12 - Elle Barber)',
                choices: ['1', '2', '3', '4', '5', '6', '7,', '8', '9', '10', '11', '12'],
                name: 'id'
            },
            {
                type: 'list',
                message: 'What is their new role? Choices(1 - Assistant Store Manager, 2 - Cashier Manager, 3 - Cashier Supervisor, 4 - Delicatessen Department Manager, 5 - Produce Department Supervisor, 6 - Sales Clerk Supervisor, 7 - Used Car Sales Supervisor)',
                choices: ['1', '2', '3', '4', '5', '6', '7'],
                name: 'role_id'
            }
        ])
        .then((answer) => {
            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [answer.role_id, answer.id], (err, result) => {
                if(err) {
                    console.table(err);
                }
                console.table('Employee Role has been updated!')
                startOption();
            })
        })
}

// Calls the start prompt questions
function init() {
    console.table('You have entered the Employee Tracking System');
    startOption();
}

init();