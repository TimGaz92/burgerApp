CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgerTbl(
id int auto_increment NOT NULL,
name varchar(20) NOT NULL,
eaten boolean, 
PRIMARY KEY (id)
);