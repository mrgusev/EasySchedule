
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, and Azure
-- --------------------------------------------------
-- Date Created: 01/16/2014 02:56:33
-- Generated from EDMX file: F:\EasySchedule\EasySchedule.Core\DAL\EasyScheduleDataModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [EasyScheduleDatabase];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO




-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------


-- Creating table 'Portions'
ALTER TABLE [dbo].[Portions] 
ADD [Size] float, [UnitId] int

ALTER TABLE [dbo].[Portions] 
DROP COLUMN  [Amount],[Value]
  
GO

-- Creating table 'Products'
ALTER TABLE [dbo].[Products] 
ADD  [DefaultUnitId] int  NULL

GO

-- Creating table 'Units'
CREATE TABLE [dbo].[Units] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [ShortName] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'UnitProduct'
CREATE TABLE [dbo].[UnitProduct] (
    [UnitId] int  NOT NULL,
    [ProductId] int  NOT NULL,
	[SizeCoef] float NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Units'
ALTER TABLE [dbo].[Units]
ADD CONSTRAINT [PK_Units]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Units_Id], [Products_Id] in table 'UnitProduct'
ALTER TABLE [dbo].[UnitProduct]
ADD CONSTRAINT [PK_UnitProduct]
    PRIMARY KEY NONCLUSTERED ([UnitId], [ProductId] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [UnitId] in table 'Portions'
ALTER TABLE [dbo].[Portions]
ADD CONSTRAINT [FK_PortionUnit]
    FOREIGN KEY ([UnitId])
    REFERENCES [dbo].[Units]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_PortionUnit'
CREATE INDEX [IX_FK_PortionUnit]
ON [dbo].[Portions]
    ([UnitId]);
GO

-- Creating foreign key on [Units_Id] in table 'UnitProduct'
ALTER TABLE [dbo].[UnitProduct]
ADD CONSTRAINT [FK_UnitProduct_Unit]
    FOREIGN KEY ([UnitId])
    REFERENCES [dbo].[Units]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Products_Id] in table 'UnitProduct'
ALTER TABLE [dbo].[UnitProduct]
ADD CONSTRAINT [FK_UnitProduct_Product]
    FOREIGN KEY ([ProductId])
    REFERENCES [dbo].[Products]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_UnitProduct_Product'
CREATE INDEX [IX_FK_UnitProduct_Product]
ON [dbo].[UnitProduct]
    ([ProductId]);
GO

-- Creating foreign key on [DefaultUnitId] in table 'Products'
ALTER TABLE [dbo].[Products]
ADD CONSTRAINT [FK_ProductUnit]
    FOREIGN KEY ([DefaultUnitId])
    REFERENCES [dbo].[Units]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ProductUnit'
CREATE INDEX [IX_FK_ProductUnit]
ON [dbo].[Products]
    ([DefaultUnitId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------