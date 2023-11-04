create table user
(
    username varchar(255) not null,
    password varchar(255) not null,
    id       int auto_increment
        primary key
);

INSERT INTO evaluation.user (username, password, id) VALUES ('admin', 'admin123', 1);
INSERT INTO evaluation.user (username, password, id) VALUES ('user', 'user12345', 2);
