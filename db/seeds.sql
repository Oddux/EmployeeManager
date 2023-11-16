use employment_db;

INSERT INTO department (dept_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");


INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1),
       ("Mike", "Chan", 2);

update employee set manager_id = 1 where id=2;

