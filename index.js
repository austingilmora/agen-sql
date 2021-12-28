const inquirer = require('inquirer');
const db = require('./db/connection');
const { printTable } = require('console-table-printer');

db.connect(err => {
    if (err) throw err;
    startMenu();
});

const startMenu = function () {
    inquirer
        .prompt({
            type: 'list',
            name: 'menuChoice',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
        })
        .then(response => {
            if (response.menuChoice === 'View All Departments') {
                viewDepartments();
            } else if (response.menuChoice === 'View All Roles') {
                viewRoles();
            } else if (response.menuChoice === 'View All Employees') {
                viewEmployees();
            } else if (response.menuChoice === 'Add a Department') {
                addDepartment();

            } else if (response.menuChoice === 'Add a Role') {
                addRole();

            } else if (response.menuChoice === 'Add an Employee') {
                addEmployee();

            } else if (response.menuChoice === 'Update an Employee Role') {
                updateEmployee();
            }

        });
};

const viewDepartments = function () {
    const sql = `SELECT * FROM department`
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
            startMenu();
        }
        printTable(rows);
        startMenu();
    });
};

const viewRoles = function () {
    const sql = `SELECT * FROM roles`
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
            startMenu();
        }
        printTable(rows);
        startMenu();
    });
};

const viewEmployees = function () {
    const sql = `SELECT * FROM employee`
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
            startMenu();
        }
        printTable(rows);
        startMenu();
    });
};

const addDepartment = function () {
    inquirer
        .prompt({
            type: 'text',
            name: 'deptName',
            message: 'What is the name of the new department?'
        })
        .then(response => {
            const sql = `INSERT INTO department (name) VALUES (?)`;
            const params = response.deptName;
            db.query(sql, params, (err, result) => {
                if (err) {
                    throw err;
                    startMenu();
                }
                console.log(`Successfully added ${params} as a department!`);
                viewDepartments();
            });
        })

};

const addEmployee = function () {
    db.query('SELECT * FROM roles', (err, rows) => {
        if (err) {
            throw err;
            startMenu();
        }
        const roles = rows.map(role => {
            return {
                name: role.title,
                value: role.id
            }
        })
        db.query('SELECT * FROM employee', (err, rows) => {
            if (err) {
                throw err;
                startMenu();
            }
            const employees = rows.map(employee => {
                return {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }
            })
            inquirer
                .prompt([{
                    type: 'text',
                    name: 'firstName',
                    message: 'What is the first name of the new employee?'
                },
                {
                    type: 'text',
                    name: 'lastName',
                    message: "What is the employee's last name?"
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the Employee's Manager?",
                    choices: employees
                }])
                .then(response => {
                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                    const params = [response.firstName, response.lastName, response.role, response.manager];
                    db.query(sql, params, (err, result) => {
                        if (err) {
                            throw err;
                        }
                        console.log(`Successfully added ${response.firstName} as an employee!`);
                        viewEmployees();
                    });
                })
        })

    })


};

const addRole = function() {
    db.query('SELECT * FROM department', (err, rows) => {
        if (err) {
            throw err;
        }
        const departments = rows.map(department => {
            return {
                name: department.name,
                value: department.id
            }
        })
        inquirer
            .prompt([{
                type: 'text',
                name: 'title',
                message: 'What is the title of this new role?'
            },
            {
                type: 'text',
                name: 'salary',
                message: 'What is the salary for this role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department does this role belong to?',
                choices: departments
            }])
            .then(response => {
                const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
                const params = [response.title, response.salary, response.department];
                db.query(sql, params, (err, rows) => {
                    if(err) {
                        throw err;
                    }
                    viewRoles();
                })
            })
    })
}

const updateEmployee = function () {
    db.query('SELECT * FROM roles', (err, rows) => {
        if (err) {
            throw err;
        }
        const roles = rows.map(role => {
            return {
                name: role.title,
                value: role.id
            }

        })
        db.query('SELECT * FROM employee', (err, rows) => {
            if (err) {
                throw err;
            }
            const employees = rows.map(employee => {
                return {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id
                }
            })
            inquirer
                .prompt([{
                    type: 'list',
                    name: 'employeeId',
                    message: "What is the name of the employee you wish to update?",
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'What new role would you like to assign this employee?',
                    choices: roles
                }])
                .then(response => {

                    const sql = `UPDATE employee SET role_id = ?
                        WHERE id = ?`;
                    const params = [response.newRole, response.employeeId]
                    db.query(sql, params, (err, rows) => {
                        if (err) {
                            throw err;
                        }
                        viewEmployees();
                    })
                })
        })

    })

};



