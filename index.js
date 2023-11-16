const inquirer = require("inquirer");
const mysql = require("mysql2");

const { printTable } = require("console-table-printer");
const { listenerCount } = require("process");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "WTFmySQL!",
  port: 3306,
  database: "employment_db",
});

db.connect(() => {
  menu();
});

const menu = () => {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "topLevelChoice",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
      ],
    })
    .then((response) => {
      if (response.topLevelChoice === "view all departments") {
        viewDepartment();
      } else if (response.topLevelChoice === "view all roles") {
        viewRoles();
      } else if (response.topLevelChoice === "view all employees") {
        viewEmployees();
      } else if (response.topLevelChoice === "add a department") {
        addDepartment();
      } else if (response.topLevelChoice === "add a role") {
        addRole();
      }
    });
};

const viewDepartment = () => {
  db.query("select * from department", (err, data) => {
    printTable(data);
    menu();
  });
};

const viewRoles = () => {
  db.query("select * from role", (err, data) => {
    printTable(data);
    menu();
  });
};

const viewEmployees = () => {
  db.query("select * from employee", (err, data) => {
    printTable(data);
    menu();
  });
};

const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department you would like to add?",
      name: "dept_title",
    })
    .then((response) => {
      db.query(`INSERT INTO department (dept_name) VALUES ("${response.dept_title}")`,
        (err) => {
            console.log("addDepartment")
          viewDepartment();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the role you would like to add?",
      name: "role_name",
      //TODO Need salary and dept
    })
    .then((response) => {
      db.query(`INSERT INTO role (role_title) VALUES ("${response.role_name}")`,
        (err) => {
            console.log("addRoles")
          viewRoles();
        }
      );
    });
};
