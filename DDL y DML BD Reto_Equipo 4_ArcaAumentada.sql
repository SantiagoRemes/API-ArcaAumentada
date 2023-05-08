-- CREAR BASE DE DATOS
CREATE DATABASE ArcaAumentada;
GO;
USE ArcaAumentada;
GO;

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

GO;

-- AGREGAR DATOS BASE
insert into CEDI 
values('Guadalupe','Mexico','Monterrey','Noreste');

insert into Chofer 
values(213454,'Juan Perez', 812324321,'JUAN21','JuanPS');

insert into Chofer
values(321656,'Jose Bermudez', 81123,'JOSE6rmdz', 'pass');

insert into Administrador
values (145675, 'Carlos Dueñaz', 819231, 'CarlosDu', 'ArcaCocaCola');

insert into Administrador
values (53796, 'Sofia Juarez', 81698, 'SoJua021', 'passwd12');

insert into Desarrollador
values (326372, 'Juan Mercedes', 811726, 'JuanMercedes', 'JuanMerc');

insert into Desarrollador
values (12445, 'Santiago Remes', 234567, 'SantiagoRem', 'Inguanzo');

insert into Dueño 
values('1836577170A','Monterrey','Nuevo Leon',8111,'Antonia Lopez Villarreal','Alta Vista','Buenos Aires 200', 64800);

insert into Dueño
values('3165225785A','Monterrey','Nuevo Leon',8112,'Jose Ortiz de la Vega','Alta Vista','Buenos Aires 500', 64800);

insert into Tienda 
values('58293949592', 'Abarrotes Toñita','P','Abarrotes','Tradicional',1,'Buenos Aires','Xocimilco 3B',64800,'Monterrey', 'Nuevo Leon', 811175, 2.5, 1.7,'1836577170A');

insert into Tienda
values('58293949593', 'Abarrotes Toñita','P','Abarrotes','Tradicional',1,'Buenos Aires','Xocimilco 3B',64800,'Monterrey', 'Nuevo Leon', 811175, 2.5, 1.7,'3165225785A');


insert into ModeloRefrigerador
values ('CRIOTEC-CFX19-P',1,'P',322,2,11592.00,'Criotec',1837.00,2.49,3220.00,'Coca-Cola');
insert into RefrigeradorSolicitado
values (1, 'CRIOTEC-CFX19-P', null, '', 'Mantener', null, null, null);
insert into RefrigeradorSolicitado
values (2, 'CRIOTEC-CFX19-P', null, '', 'Mantener', null, null, null);

insert into ModeloRefrigerador
values ('CRIOTEC-CFX42-P',2,'P',720,2,25920.00,'Criotec',3674.00,4.25,7200.00,'Coca-Cola');
insert into RefrigeradorSolicitado
values (3, 'CRIOTEC-CFX42-P', null, '', 'Mantener', null, null, null);
insert into RefrigeradorSolicitado
values (4, 'CRIOTEC-CFX42-P', null, '', 'Mantener', null, null, null);

insert into ModeloRefrigerador
values ('CRIOTEC-CFX19-M',1,'M',322,4,23184.00,'Criotec',1837.00,2.49,6440.00,'Coca-Cola');
insert into RefrigeradorSolicitado
values (5, 'CRIOTEC-CFX19-M', null, '', 'Mantener', null, null, null);
insert into RefrigeradorSolicitado
values (6, 'CRIOTEC-CFX19-M', null, '', 'Mantener', null, null, null);

insert into ModeloRefrigerador
values ('CRIOTEC-CFX42-M',2,'M',720,4,51840.00,'Criotec',3674.00,4.25,14400.00,'Coca-Cola');
insert into RefrigeradorSolicitado
values (7, 'CRIOTEC-CFX42-M', null, '', 'Mantener', null, null, null);
insert into RefrigeradorSolicitado
values (8, 'CRIOTEC-CFX42-M', null, '', 'Mantener', null, null, null);

insert into ModeloRefrigerador
values ('CRIOTEC-CFX64-M',3,'M',945,5,85050.00,'Criotec',4899.00,6.82,23625.00,'Coca-Cola')
insert into RefrigeradorSolicitado
values (9, 'CRIOTEC-CFX64-M', null, '', 'Mantener', null, null, null);
insert into RefrigeradorSolicitado
values (10, 'CRIOTEC-CFX64-M', null, '', 'Mantener', null, null, null);

insert into ModeloRefrigerador
values ('CRIOTEC-CFX19-G',1,'G',322,8,46368.00,'Criotec',1837.00,2.49,12880.00,'Coca-Cola');
insert into RefrigeradorSolicitado
values (11, 'CRIOTEC-CFX19-G', null, '', 'Mantener', null, null, null);
insert into RefrigeradorSolicitado
values (12, 'CRIOTEC-CFX19-G', null, '', 'Mantener', null, null, null);

insert into ModeloRefrigerador
values ('CRIOTEC-CFX42-G',2,'G',720,4,51840.00,'Criotec',3674.00,4.25,14400.00,'Coca-Cola');
insert into RefrigeradorSolicitado
values (13, 'CRIOTEC-CFX42-G', null, '', 'Mantener', null, null, null);
insert into RefrigeradorSolicitado
values (14, 'CRIOTEC-CFX42-G', null, '', 'Mantener', null, null, null);

insert into ModeloRefrigerador
values ('CRIOTEC-CFX64-G',3,'G',945,5,85050.00,'Criotec',4899.00,6.82,23625.00,'Coca-Cola')
insert into RefrigeradorSolicitado
values (15, 'CRIOTEC-CFX64-G', null, '', 'Mantener', null, null, null);
insert into RefrigeradorSolicitado
values (16, 'CRIOTEC-CFX64-G', null, '', 'Mantener', null, null, null);

-- INSERTAR 2 SOLICITUDES CON 2 REFRIGERADORES
insert into Solicitud
values ('2023-05-04',null,null, 'Pendiente', null, null, 12445, '58293949592', 'Guadalupe');
-------------------------------------
insert into Checklist
values (17, 1, 'Favorable', 'Mover el refrigerador actual lo suficiente para meter el nuestro', 2, '2021-10-30 12:00:00');
insert into RefrigeradorSolicitado
values (17, 'CRIOTEC-CFX42-P', 1, '', 'Mantener', null, null, 17);
-------------------------------------
insert into Checklist
values (18, 1, 'Favorable', 'Mover stand de comida', 2, '2022-10-30 11:00:00');
insert into RefrigeradorSolicitado
values (18, 'CRIOTEC-CFX42-G', 1, '', 'Mantener', null, null,18);

-------------------------------------
insert into Solicitud
values ('2023-05-04', '2023-05-04', '2023-05-04', 'Terminada', 145675, 213454, 326372, '58293949592', 'Guadalupe');
-------------------------------------
insert into Checklist
values (19, 1, 'Preferente', 'Insertar cerca de la entrada', 2, '2021-10-30 12:00:00');
insert into RefrigeradorSolicitado
values (19, 'CRIOTEC-CFX19-P', 2, '2021-10-30 12:00:00', 'Mantener', 'No parece que vaya a caber un refrigerador más grande que este', 'imageurl',19);
-------------------------------------
insert into Checklist
values (20, 1, 'Favorable', 'Mover stand de comida', 2, '2021-10-30 12:00:00');
insert into RefrigeradorSolicitado
values (20, 'CRIOTEC-CFX19-G', 2, '2021-10-30 12:00:00', 'Mantener', 'No parece que vaya a caber un refrigerador más grande que este', 'imageurl',20);
-------------------------------------

GO;

-- CREAR STORED PROCEDURES
use ArcaAumentada
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE TerminarSolicitud
	@Solicitudid int
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE Solicitud 
	SET estatus = 'Terminada', fecha_Entrega = CAST( GETDATE() AS Date )
    WHERE idSolicitud = @Solicitudid

	UPDATE RefrigeradorSolicitado
	SET fecha_Entrega = CAST( GETDATE() AS Date )
	WHERE idSolicitud = @Solicitudid

END
GO
--------------------------------------
USE ArcaAumentada
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE ActualizarSolicitud
	@Solicitudid int
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE Solicitud
	SET estatus = 'Pendiente'
	Where idSolicitud = @Solicitudid

	DECLARE @Checklistid int
	SET @Checklistid = (SELECT C.idChecklist
						FROM CHECKLIST C JOIN RefrigeradorSolicitado RS ON C.idChecklist=RS.idChecklist
						WHERE RS.movimiento = 'Cambiar' OR RS.movimiento = 'Remover')


	UPDATE  RefrigeradorSolicitado
	SET idSolicitud = null, fecha_Entrega = '', movimiento = 'Mantener', comentarios = null, imageurl=null, idChecklist=null
	WHERE idRefrigeradorSolicitado IN (SELECT idRefrigeradorSolicitado 
										FROM RefrigeradorSolicitado
										WHERE movimiento = 'Cambiar' OR movimiento = 'Remover')

	DELETE FROM Checklist
	WHERE idChecklist = @Checklistid

END
GO
---------------------------------------------
USE ArcaAumentada
GO
CREATE PROCEDURE BorrarSolicitud
	@Solicitudid int
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @Checklistids VARCHAR(MAX) = ''

	SELECT @Checklistids = @Checklistids + CAST(C.idChecklist AS VARCHAR(MAX)) + ',' 
	FROM Checklist C 
	JOIN RefrigeradorSolicitado RS ON C.idChecklist = RS.idChecklist
	JOIN Solicitud S ON RS.idSolicitud = S.idSolicitud
	WHERE S.idSolicitud = @Solicitudid
	SET @Checklistids = LEFT(@Checklistids, LEN(@Checklistids) - 1)
	UPDATE  RefrigeradorSolicitado
	SET idSolicitud = null, fecha_Entrega = null, movimiento = 'Mantener', comentarios = null, imageurl=null, idChecklist=null
	WHERE idSolicitud = @Solicitudid
	DELETE FROM Solicitud
	WHERE idSolicitud = @Solicitudid
	DELETE FROM Checklist
	WHERE idChecklist IN (SELECT value FROM STRING_SPLIT(@Checklistids, ',') WHERE value != '')

END
-----------------------------------------------
USE ArcaAumentada
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE BorrarTiendita
	@TiendaId varchar(100)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @Checklistids VARCHAR(MAX) = ''

	SELECT @Checklistids = @Checklistids + CAST(C.idChecklist AS VARCHAR(MAX)) + ',' 
	FROM Checklist C 
	JOIN RefrigeradorSolicitado RS ON C.idChecklist = RS.idChecklist
	JOIN Solicitud S ON RS.idSolicitud = S.idSolicitud
	JOIN Tienda T ON S.idTienda=T.idTienda
	WHERE T.idTienda = @TiendaId

	UPDATE RefrigeradorSolicitado
	SET fecha_Entrega='', movimiento = 'Mantener', comentarios = null, imageurl=null, idChecklist=null, idSolicitud = null

	DELETE FROM Checklist
	WHERE idChecklist IN (SELECT value FROM STRING_SPLIT(@Checklistids, ',') WHERE value != '')

	DELETE FROM Solicitud
	WHERE idSolicitud IN (SELECT idSolicitud FROM Solicitud S
							JOIN Tienda T ON S.idTienda=T.idTienda
							WHERE T.idTienda = @TiendaId)

	DELETE FROM Tienda
	WHERE idTienda = @TiendaId


END
GO
-------------------------------------------------
use ArcaAumentada
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE ChangeRefri 
	@RSid1 int,
	@RSid2 int
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE RefrigeradorSolicitado
	SET idSolicitud=(SELECT idSolicitud FROM RefrigeradorSolicitado WHERE idRefrigeradorSolicitado = @RSid1),
	movimiento=(SELECT movimiento FROM RefrigeradorSolicitado WHERE idRefrigeradorSolicitado = @RSid1),
	comentarios=(SELECT comentarios FROM RefrigeradorSolicitado WHERE idRefrigeradorSolicitado = @RSid1),
	imageurl=(SELECT imageurl FROM RefrigeradorSolicitado WHERE idRefrigeradorSolicitado = @RSid1),
	idChecklist=(SELECT idChecklist FROM RefrigeradorSolicitado WHERE idRefrigeradorSolicitado = @RSid1)
	WHERE idRefrigeradorSolicitado = @RSid2

	UPDATE RefrigeradorSolicitado
	SET idSolicitud=null, movimiento='Mantener', comentarios=null, imageurl=null, idChecklist=null
	WHERE idRefrigeradorSolicitado = @RSid1
END
GO
