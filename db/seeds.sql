INSERT INTO department (name)
VALUES 
    ('Legal'),
    ('Engineering'),
    ('Sales'),
    ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Lawyer', 150000.00, 1),
    ('Paralegal', 70000.00, 1),
    ('Space Lawyer', 200000.00, 1),
    ('Nerd Manager', 40000.00, 2),
    ('Full Stack Web Developer', 1000000.00, 2),
    ('Front End Web Developer', 999999.00, 2),
    ('Back End Web Developer', 999999.99, 2),
    ('Sales Lead', 100000.00, 3),
    ('Junior Salesman', 45000.00, 3),
    ('Sales Manager', 130000.00, 3),
    ('Marketing Director', 120000.00, 4),
    ('Marketing Assistant', 50000.00, 4),
    ('Marketing Intern', 0.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('James', 'Fraser', 1, 2),
    ('Jack', 'London', 2, null),
    ('Robert', 'Bruce', 10, null),
    ('Peter', 'Greenaway', 11, 3),
    ('Derek', 'Jarman', 12, 4),
    ('Paolo', 'Pasolini', 13, 5),
    ('Heathcote', 'Williams', 13, 5),
    ('Sandy', 'Powell', 13, 5),
    ('Emil', 'Zola', 12, 4),
    ('Sissy', 'Coalpits', 13, 9),
    ('Antoinette', 'Capet', 13, 9),
    ('Samuel', 'Delany', 13, 9),
    ('Tony', 'Duvert', 10, null),
    ('Dennis', 'Cooper', 8, 13),
    ('Monica', 'Bellucci', 8, 13),
    ('Samuel', 'Johnson', 8, 13),
    ('John', 'Dryden', 9, 16),
    ('Alexander', 'Pope', 9, 15),
    ('Lionel', 'Johnson', 9, 14),
    ('Aubrey', 'Beardsley', 9, 14),
    ('Tulse', 'Luper', 5, 40),
    ('William', 'Morris', 5, 40),
    ('George', 'Shaw', 5, 40),
    ('Arnold', 'Bennett', 5, 40),
    ('Algernon', 'Blackwood', 5, 40),
    ('Rhoda', 'Broughton', 6, 39),
    ('Hart', 'Crane', 6, 39),
    ('Vitorio', 'DeSica', 6, 39),
    ('Wilkie', 'Collins', 6, 39),
    ('Elizabeth', 'Gaskell', 6, 39),
    ('George', 'Sand', 6, 39),
    ('Vernon', 'Lee', 7, 38),
    ('Arthur', 'Machen', 7, 38),
    ('Frederick', 'Marryat', 7, 38),
    ('Harriet', 'Martineau', 7, 38),
    ('George', 'Meredith', 7, 38),
    ('Margaret', 'Oliphant', 7, 38),
    ('Anthony', 'Trollope', 4, null),
    ('Charlotte', 'Yonge', 4, null),
    ('Horace', 'Walpole', 4, null);