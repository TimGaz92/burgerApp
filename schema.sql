CREATE TABLE burgerTbl(
id int auto_increment NOT NULL,
name varchar(20),
PRIMARY KEY (id)
);

insert into burgerTbl (name) VALUES ('test burger');
insert into burgerTbl (name) VALUES ('big kahuna burger');
insert into burgerTbl (name) VALUES ('Royale with cheese');