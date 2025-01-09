
USE prueba
GO

/****** Object:  Table [dbo].[cargos]    Script Date: 6/1/2025 00:32:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[cargos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[codigo] [nvarchar](50) NOT NULL,
	[nombre] [nvarchar](100) NOT NULL,
	[activo] [bit] NOT NULL,
	[idUsuarioCreacion] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[departamentos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[codigo] [nvarchar](50) NOT NULL,
	[nombre] [nvarchar](100) NOT NULL,
	[activo] [bit] NOT NULL,
	[idUsuarioCreacion] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[usuario] [nvarchar](50) NOT NULL,
	[email] [nvarchar](80) NOT NULL,
	[primerNombre] [nvarchar](50) NOT NULL,
	[segundoNombre] [nvarchar](50) NULL,
	[primerApellido] [nvarchar](50) NOT NULL,
	[segundoApellido] [nvarchar](50) NULL,
	[idDepartamento] [int] NOT NULL,
	[idCargo] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FK_users_cargos] FOREIGN KEY([idCargo])
REFERENCES [dbo].[cargos] ([id])
GO

ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FK_users_cargos]
GO

ALTER TABLE [dbo].[users]  WITH CHECK ADD  CONSTRAINT [FK_users_departamentos] FOREIGN KEY([idDepartamento])
REFERENCES [dbo].[departamentos] ([id])
GO

ALTER TABLE [dbo].[users] CHECK CONSTRAINT [FK_users_departamentos]
GO


INSERT INTO [dbo].[cargos] (codigo, nombre, activo, idUsuarioCreacion) VALUES
	('CC001', 'DESARROLLADOR', 1, 1),
	('CC002', 'CONTADOR', 1, 1),
	('CC003', 'ARQUITECTO', 1, 1)

INSERT INTO [dbo].[departamentos] (codigo, nombre, activo, idUsuarioCreacion) VALUES
	('DD001', 'TICS', 1, 1),
	('DD002', 'DOCUMENTOS', 1, 1),
	('DD003', 'SEGURIDAD', 1, 1)

INSERT INTO [dbo].[users] ([usuario], [email] [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [idDepartamento], [idCargo])
	VALUES ('devfreyes', 'devfreyes@outlook.com', 'Fernando', 'Dionicio', 'Reyes', 'Noboa', 1, 1)
