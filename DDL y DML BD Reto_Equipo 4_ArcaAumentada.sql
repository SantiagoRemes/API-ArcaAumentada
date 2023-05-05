Create database ArcaAumentada;
Use ArcaAumentada;

create table Checklist(
	idChecklist int,
	puerta int,
	posicion varchar(30),
	movimientos varchar(100),
	personas int,
	horario datetime,
	Primary Key (idChecklist),
);

create table ModeloRefrigerador(
	idModelo varchar(30),
	puertas int,
	cliente_size char(1),
	bot_cap int,
	llenado int,
	cliente_ingreso money,
	marca varchar(30),
	consumo_mensual money,
	consumo_KW float,
	ganancia_cliente money,
	tipo_puerta varchar(30),
	Primary Key (idModelo),
);

create table CEDI(
	CEDINombre varchar(30),
	pais varchar(30),
	municipio varchar(30),
	region varchar(30),
	Primary Key (CEDINombre),
);

create table Chofer(
	idChofer int,
	nombre varchar(50),
	contacto int,
	usuario varchar(30),
	contrasena varchar(30),
	Primary Key (idChofer),
);

create table Administrador(
	idAdministrador int,
	nombre varchar(50),
	contacto int,
	usuario varchar(30),
	contrasena varchar(30),
	Primary Key (idAdministrador),
);

create table Desarrollador(
	idDesarrollador int,
	nombre varchar(50),
	contacto int,
	usuario varchar(30),
	contrasena varchar(30),
	Primary Key (idDesarrollador),
);

create table Dueño(
	idDueño varchar(100),
	ciudad varchar(50),
	estado varchar(50),
	celular int,
	nombre_Completo varchar(100),
	colonia varchar(50),
	calle_no varchar(30),
	CP int,
	Primary Key (idDueño),
);

create table Tienda(
	idTienda varchar(100),
	nombre varchar(30),
	tamaño char(1),
	giro varchar(30),
	canal varchar(30),
	num_refrigerador int,
	colonia varchar(50),
	calle_no varchar(30),
	CP int,
	ciudad varchar(50),
	estado varchar(50),
	celular int,
	puerta_altura float,
	puerta_ancho float,
	idDueño varchar(100),
	Primary Key (idTienda),
	Foreign Key (idDueño) references Dueño(idDueño),
);

create table Visita(
	idVisita int,
	idTienda varchar(100),
	idDesarrollador int,
	fecha date,
	comentarios varchar(300),
	Primary Key (idVisita),
	Foreign Key (idTienda) references  Tienda(idTienda),
	Foreign Key (idDesarrollador) references Desarrollador(idDesarrollador),
);

create table Solicitud(
	idSolicitud INT IDENTITY(1,1) NOT NULL,
	fecha_solicitud date,
	fecha_Aprobada date,
	fecha_Entrega date,
	estatus varchar(10),
	idAdministrador int,
	idChofer int,
	idDesarrollador int,
	idTienda varchar(100),
	CEDINombre varchar(30),
	Primary Key (idSolicitud),
	Foreign Key (idAdministrador) references Administrador(idAdministrador),
	Foreign Key (idChofer) references Chofer(idChofer),
	Foreign Key (idDesarrollador) references Desarrollador(idDesarrollador),
	Foreign Key (idTienda) references Tienda(idTienda),
	Foreign Key (CEDINombre) references CEDI(CEDINombre),
);

create table RefrigeradorSolicitado(
	idRefrigeradorSolicitado int,
	idModelo varchar(30),
	idSolicitud int,
	fecha_Entrega datetime,
	movimiento varchar(10),
	comentarios varchar(200),
	imageurl varchar(300),
	idChecklist int,
	Primary Key (idRefrigeradorSolicitado),
	Foreign Key (idModelo) references ModeloRefrigerador(idModelo),
	Foreign Key (idSolicitud) references Solicitud(idSolicitud),
	Foreign Key (idChecklist) references Checklist(idChecklist),
);

insert into CEDI 
values('Guadalupe','Mexico','Monterrey','Noreste');

insert into Chofer 
values(213454,'Juan Perez', 812324321,'JUAN2135PG','PASSWD1234');

insert into Administrador
values (145675, 'Carlos Dueñaz', 819231, 'CarlosDu', 'ArcaCocaCola');

insert into Desarrollador
values (326372, 'Juan Mercedes', 811726, 'JuanMercedes', '20023010');

insert into Dueño 
values('1836577170A','Monterrey','Nuevo Leon',8111,'Antonia Lopez Villarreal','Alta Vista','Buenos Aires 200', 64800);

insert into Tienda 
values('58293949592', 'Abarrotes Toñita','P','Abarrotes','Tradicional',1,'Buenos Aires','Xocimilco 3B',64800,'Monterrey', 'Nuevo Leon', 811175, 2.5, 1.7,'1836577170A');


insert into ModeloRefrigerador
values ('CRIOTEC-CFX19-P',1,'P',322,2,11592.00,'Criotec',1837.00,2.49,3220.00,'Coca-Cola');
insert into ModeloRefrigerador
values ('CRIOTEC-CFX42-P',2,'P',720,2,25920.00,'Criotec',3674.00,4.25,7200.00,'Coca-Cola');
insert into ModeloRefrigerador
values ('CRIOTEC-CFX19-M',1,'M',322,4,23184.00,'Criotec',1837.00,2.49,6440.00,'Coca-Cola');
insert into ModeloRefrigerador
values ('CRIOTEC-CFX42-M',2,'M',720,4,51840.00,'Criotec',3674.00,4.25,14400.00,'Coca-Cola');
insert into ModeloRefrigerador
values ('CRIOTEC-CFX64-M',3,'M',945,5,85050.00,'Criotec',4899.00,6.82,23625.00,'Coca-Cola')
insert into ModeloRefrigerador
values ('CRIOTEC-CFX19-G',1,'G',322,8,46368.00,'Criotec',1837.00,2.49,12880.00,'Coca-Cola');
insert into ModeloRefrigerador
values ('CRIOTEC-CFX42-G',2,'G',720,4,51840.00,'Criotec',3674.00,4.25,14400.00,'Coca-Cola');
insert into ModeloRefrigerador
values ('CRIOTEC-CFX64-G',3,'G',945,5,85050.00,'Criotec',4899.00,6.82,23625.00,'Coca-Cola')

-------------------------------------
-------------------------------------
insert into Solicitud
values ('2023-05-04',null,null, 'Pendiente', null, null, 326372, '58293949592', 'Guadalupe');
-------------------------------------
insert into Checklist
values (9, 1, 'Favorable', 'Mover el refrigerador actual lo suficiente para meter el nuestro', 2, '2021-10-30 12:00:00');
insert into RefrigeradorSolicitado
values (9, 'CRIOTEC-CFX42-P', 3, '', 'Mantener', null, 'http://www.google.com',9);
-------------------------------------
insert into Checklist
values (2, 1, 'Favorable', 'Mover el refrigerador actual lo suficiente para meter el nuestro', 2, '2021-10-30 12:00:00');
insert into RefrigeradorSolicitado
values (2, 'CRIOTEC-CFX42-G', 1, '', 'Mantener', null, null,2);
-------------------------------------
insert into RefrigeradorSolicitado
values (5, 'CRIOTEC-CFX42-P', null, '', 'Mantener', null, null, null);
insert into RefrigeradorSolicitado
values (6, 'CRIOTEC-CFX42-G', null, '', 'Mantener', null, null,null);
-------------------------------------

-------------------------------------
-------------------------------------
insert into Solicitud
values ('2023-05-04', '2023-05-04', '2023-05-04', 'Terminada', 145675, 213454, 326372, '58293949592', 'Guadalupe');
-------------------------------------
insert into Checklist
values (3, 1, 'Favorable', 'Mover el refrigerador actual lo suficiente para meter el nuestro', 2, '2021-10-30 12:00:00');
insert into RefrigeradorSolicitado
values (3, 'CRIOTEC-CFX19-P', 2, '2021-10-30 12:00:00', 'Mantener', 'No parece que vaya a caber un refrigerador más grande que este', 'http//www.google.com',3);
-------------------------------------
insert into Checklist
values (4, 1, 'Favorable', 'Mover el refrigerador actual lo suficiente para meter el nuestro', 2, '2021-10-30 12:00:00');
insert into RefrigeradorSolicitado
values (4, 'CRIOTEC-CFX19-G', 2, '2021-10-30 12:00:00', 'Mantener', 'No parece que vaya a caber un refrigerador más grande que este', 'http//www.google.com',4);
-------------------------------------
-------------------------------------


DELETE FROM Solicitud
Where idSolicitud = 4

DELETE FROM Checklist
Where idChecklist = 2

DELETE FROM RefrigeradorSolicitado
Where idRefrigeradorSolicitado = 2

Select * from RefrigeradorSolicitado

Select * FROM RefrigeradorSolicitado
WHERE fecha_Entrega = null AND idmodelo = 

UPDATE RefrigeradorSolicitado
SET comentarios = 'a'
WHERE idRefrigeradorSolicitado = 1

Select * FROM RefrigeradorSolicitado
WHERE fecha_Entrega = '' AND idModelo = 'CRIOTEC-CFX42-P' AND (idSolicitud IS null OR idSolicitud=6)

Select * FROM RefrigeradorSolicitado
WHERE fecha_Entrega = '' AND idModelo = CRIOTEC-CFX42-P AND idSolicitud IS null OR idSolicitud=${idSolicitud}`

SELECT * FROM RefrigeradorSolicitado
WHERE idSolicitud = 6


Select * FROM RefrigeradorSolicitado
WHERE fecha_Entrega = '' AND idModelo = 'CRIOTEC-CFX42-P' AND (idSolicitud IS null OR idSolicitud=8)

UPDATE RefrigeradorSolicitado SET imageurl = 'http://192.168.1.131:2000/images/archivo-1683250723243.png' WHERE idRefrigeradorSolicitado = 1



Select * 
                  FROM RefrigeradorSolicitado RS 
                  JOIN Solicitud S on RS.idSolicitud=S.idSolicitud
                  JOIN ModeloRefrigerador MR on RS.idModelo=MR.idModelo
                  JOIN Tienda T on S.idTienda=T.idTienda
                  WHERE T.idTienda = '58293949592' 
                  AND S.estatus = 'Terminada'
                  AND idRefrigeradorSolicitado NOT IN (SELECT idRefrigeradorSolicitado
                                                        FROM RefrigeradorSolicitado RS
                                                        JOIN ModeloRefrigerador MR on RS.idModelo=MR.idModelo
                                                        WHERE RS.idSolicitud = 3)


UPDATE Solicitud
SET estatus = 'Pendiente'
WHERE idSolicitud = 3

SELECT D.idDesarrollador, D.nombre,  COUNT(S.idSolicitud) AS Solicitudes 
FROM Desarrollador D JOIN Solicitud S ON D.idDesarrollador=S.idDesarrollador
GROUP BY D.idDesarrollador, D.nombre