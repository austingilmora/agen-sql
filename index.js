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
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'View Employees by Manager', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Update an Employee Manager', 'Delete Department', 'Delete Role', 'Delete Employee']
        })
        .then(response => {
            if (response.menuChoice === 'View All Departments') {
                viewDepartments();

            } else if (response.menuChoice === 'View All Roles') {
                viewRoles();

            } else if (response.menuChoice === 'View All Employees') {
                viewEmployees();

            } else if (response.menuChoice === 'View Employees by Manager') {
                viewEmployeesByManager();

            } else if (response.menuChoice === 'Add a Department') {
                addDepartment();

            } else if (response.menuChoice === 'Add a Role') {
                addRole();

            } else if (response.menuChoice === 'Add an Employee') {
                addEmployee();

            } else if (response.menuChoice === 'Update an Employee Role') {
                updateRole();

            } else if (response.menuChoice === 'Update an Employee Manager') {
                updateManager();

            } else if (response.menuChoice === 'Delete Department') {
                deleteDepartment();

            } else if (response.menuChoice === 'Delete Role') {
                deleteRole();

            } else if (response.menuChoice === 'Delete Employee') {
                deleteEmployee();

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

const viewEmployeesByManager = function() {
    console.log("Sorry, couldn't figure this one out");
    startMenu();

    db.query

    // db.query(`SELECT * FROM roles WHERE manager = 1`, (err, rows) => {
    //     if (err) {
    //         throw err;
    //     }
    //     const ids = rows.map(id => {
    //         return `SELECT * FROM employee WHERE role_id = ${id.id}`
    //     })
    //     db.query(ids, (err, rows) => {
    //         if (err) {
    //             throw err;
    //         }
    //         const managers = rows.map(manager => {
    //             return {
    //                 name: manager.first_name + ' ' + manager.last_name,
    //                 value: manager.id
    //             }
    //         })
    //         inquirer
    //             .prompt({
    //                 type: 'list',
    //                 name: 'managerChoice',
    //                 message: 'Which manager would you like to see?',
    //                 choices: managers
    //             })
    //             .then(response => {
    //                 const sql = 'SELECT * FROM employee WHERE manager_id = ?';
    //                 const params = response.managerChoice;

    //                 db.query(sql, params, (err, rows) => {
    //                     if (err) {
    //                         throw err;
    //                     }
    //                     printTable(rows);
    //                 })
    //             })
    //     })
    // })
}

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

const addRole = function () {
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
                    if (err) {
                        throw err;
                    }
                    viewRoles();
                })
            })
    })
}

const updateRole = function () {
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

const updateManager = function () {
    db.query(`SELECT * FROM employee`, (err, rows) => {
        if (err) {
            throw err;
        }
        const employees = rows.map(employee => {
            return {
                name: employee.first_name + ' ' + employee.last_name,
                value: employee.id
            }
        });
        inquirer
            .prompt([{
                type: 'list',
                name: 'selectedEmployee',
                message: 'What employee would you like to assign a new manager?',
                choices: employees
            },
            {
                type: 'list',
                name: 'newManager',
                message: 'Who will be their new manager?',
                choices: employees
            }])
            .then(response => {
                const sql = `UPDATE employee SET manager_id = ?
                            WHERE id = ?`;
                const params = [response.newManager, response.selectedEmployee];

                db.query(sql, params, (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    viewEmployees();
                });
            });
    });
};

const deleteDepartment = function () {
    db.query(`SELECT * FROM department`, (err, rows) => {
        if (err){
            throw err;
        }
        const departments = rows.map(department => {
            return {
                name: department.name,
                value: department.id
            }
        })
        inquirer
            .prompt({
                type: 'list',
                name: 'department',
                message: 'What department would you like to delete?',
                choices: departments
            })
            .then(response => {
                const sql = `DELETE FROM department WHERE id = ?`;
                const params = response.department;

                db.query(sql, params, (err, rows) => {
                    if(err) {
                        throw err;
                    }
                    viewDepartments();
                });
            });
    });
};

const deleteRole = function () {
    db.query(`SELECT * FROM roles`, (err, rows) => {
        if (err){
            throw err;
        }
        const roles = rows.map(role => {
            return {
                name: role.title,
                value: role.id
            }
        })
        inquirer
            .prompt({
                type: 'list',
                name: 'role',
                message: 'What role would you like to delete?',
                choices: roles
            })
            .then(response => {
                const sql = `DELETE FROM roles WHERE id = ?`;
                const params = response.role;

                db.query(sql, params, (err, rows) => {
                    if(err) {
                        throw err;
                    }
                    viewRoles();
                });
            });
    });
};

const deleteEmployee = function () {
    db.query(`SELECT * FROM employee`, (err, rows) => {
        if (err){
            throw err;
        }
        const employees = rows.map(employee => {
            return {
                name: employee.first_name + ' ' + employee.last_name,
                value: employee.id
            }
        })
        inquirer
            .prompt({
                type: 'list',
                name: 'employee',
                message: 'What employee would you like to delete?',
                choices: employees
            })
            .then(response => {
                const sql = `DELETE FROM employee WHERE id = ?`;
                const params = response.employee;

                db.query(sql, params, (err, rows) => {
                    if(err) {
                        throw err;
                    }
                    viewEmployees();
                });
            });
    });
};
