Create database ArcaAumentada2;
Use ArcaAumentada2;

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
	idSolicitud varchar(100),
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
	idSolicitud varchar(100),
	fecha_Entrega datetime,
	movimiento varchar(10),
	comentarios varchar(200),
	idChecklist int,
	Primary Key (idRefrigeradorSolicitado),
	Foreign Key (idModelo) references ModeloRefrigerador(idModelo),
	Foreign Key (idSolicitud) references Solicitud(idSolicitud),
	Foreign Key (idChecklist) references Checklist(idChecklist),
);

insert into CEDI 
values('Guadalupe','Mexico','Monterrey','Noreste');

insert into Chofer 
values(21345,'Juan Perez',812324321,'JUAN2135PG','PASSWD1234');

insert into Dueño 
values(1836577170,'Antonia López Villarreal','Alta Vista','Buenos Aires 200', 64800);

insert into Tienda 
values(58293949592, 'P','Abarrotes','Tradicional',1,'Buenos Aires','Xocimilco 3B',64800,1836577170);


insert into ModeloRefrigerador
values ('CRIOTEC-CFX19-P',1,'P',322,2,11592.00,'Criotec',1837.00,2.49,3220.00,'Coca-Cola');
insert into Refrigerador
values ('CRIOTEC-CFX42-P',2,'P',720,2,25920.00,'Criotec','Coca-Cola',1,3674.00,4.25,7200.00);
insert into Refrigerador
values ('CRIOTEC-CFX19-M',1,'M',322,4,23184.00,'Criotec','Coca-Cola',2,1837.00,2.49,6440.00);
insert into Refrigerador
values ('CRIOTEC-CFX42-M',2,'M',720,4,51840.00,'Criotec','Coca-Cola',6,3674.00,4.25,14400.00);
insert into Refrigerador
values ('CRIOTEC-CFX19-G',1,'G',322,8,46368.00,'Criotec','Coca-Cola',3,1837.00,2.49,12880.00);

insert into Administrador
values ('1456', 'Carlos Dueñaz', 819231231, 'CarlosDuñ', 'ArcaCocaCola');

insert into Desarrollador
values ('69420', 'Guillermo Alejandro', 811244359, 'GillArca', '20023010');

insert into Solicitud
values ('1233', '2021-10-24','2021-10-28', '2021-10-30', 'Aprobada', NULL, NULL, '1', NULL, NULL);

insert into Solicitud
values ('128382137sfhuews323278491273', '2021-10-24','2021-10-30', '2021-11-02', 'Aprobada', 1456, 21345, 69420, 'CRIOTEC-CFX19-M', 58293949592, 'Guadalupe');

insert into Solicitud
values ('123', '2021-10-24',NULL, NULL, 'Negada', 1, 1, 1, NULL, 'Mty');

 insert into visita 
 values(58293949592, 69420, '2023/01/29','No parece que vaya a caber un refrigerador grande');

 insert into Refrigerador
 values('12A', 'CRIOTEC-CFX19-P' )


 Select * from ModeloRefrigerador

 Select * from Refrigerador