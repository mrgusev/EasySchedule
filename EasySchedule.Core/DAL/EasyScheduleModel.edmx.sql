
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, and Azure
-- --------------------------------------------------
-- Date Created: 12/12/2013 12:59:44
-- Generated from EDMX file: F:\EasySchedule\EasySchedule.Core\DAL\EasyScheduleModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [EasyScheduleDatabase];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_CategoryProduct]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Products] DROP CONSTRAINT [FK_CategoryProduct];
GO
IF OBJECT_ID(N'[dbo].[FK_ProductTypeProduct]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Products] DROP CONSTRAINT [FK_ProductTypeProduct];
GO
IF OBJECT_ID(N'[dbo].[FK_MeasurmentTypeProduct]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Products] DROP CONSTRAINT [FK_MeasurmentTypeProduct];
GO
IF OBJECT_ID(N'[dbo].[FK_ProductPortion]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Portions] DROP CONSTRAINT [FK_ProductPortion];
GO
IF OBJECT_ID(N'[dbo].[FK_FoodUsagePortion]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Portions] DROP CONSTRAINT [FK_FoodUsagePortion];
GO
IF OBJECT_ID(N'[dbo].[FK_InsulinTypeInsulinUsage]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[InsulinUsages] DROP CONSTRAINT [FK_InsulinTypeInsulinUsage];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Products]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Products];
GO
IF OBJECT_ID(N'[dbo].[MeasurmentTypes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MeasurmentTypes];
GO
IF OBJECT_ID(N'[dbo].[ProductTypes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ProductTypes];
GO
IF OBJECT_ID(N'[dbo].[Categories]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Categories];
GO
IF OBJECT_ID(N'[dbo].[FoodUsages]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FoodUsages];
GO
IF OBJECT_ID(N'[dbo].[Portions]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Portions];
GO
IF OBJECT_ID(N'[dbo].[InsulinUsages]', 'U') IS NOT NULL
    DROP TABLE [dbo].[InsulinUsages];
GO
IF OBJECT_ID(N'[dbo].[Shugars]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Shugars];
GO
IF OBJECT_ID(N'[dbo].[InsulinTypes]', 'U') IS NOT NULL
    DROP TABLE [dbo].[InsulinTypes];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Products'
CREATE TABLE [dbo].[Products] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [CategoryId] int  NULL,
    [ProductTypeId] int  NOT NULL,
    [MeasurmentTypeId] int  NOT NULL,
    [AmountPerOne] float  NOT NULL,
    [ValuePerOne] float  NOT NULL
);
GO

-- Creating table 'MeasurmentTypes'
CREATE TABLE [dbo].[MeasurmentTypes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'ProductTypes'
CREATE TABLE [dbo].[ProductTypes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [MeasurmentUnit] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Categories'
CREATE TABLE [dbo].[Categories] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'FoodUsages'
CREATE TABLE [dbo].[FoodUsages] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Time] datetime  NOT NULL,
    [BreadUnits] float  NOT NULL
);
GO

-- Creating table 'Portions'
CREATE TABLE [dbo].[Portions] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [ProductId] int  NOT NULL,
    [FoodUsageId] int  NOT NULL,
    [Value] float  NOT NULL,
    [Amount] float  NOT NULL,
    [BreadUnits] float  NOT NULL
);
GO

-- Creating table 'InsulinUsages'
CREATE TABLE [dbo].[InsulinUsages] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Value] float  NOT NULL,
    [InsulinTypeId] int  NOT NULL,
    [Time] datetime  NOT NULL
);
GO

-- Creating table 'Shugars'
CREATE TABLE [dbo].[Shugars] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Value] float  NOT NULL,
    [Time] datetime  NOT NULL
);
GO

-- Creating table 'InsulinTypes'
CREATE TABLE [dbo].[InsulinTypes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Products'
ALTER TABLE [dbo].[Products]
ADD CONSTRAINT [PK_Products]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'MeasurmentTypes'
ALTER TABLE [dbo].[MeasurmentTypes]
ADD CONSTRAINT [PK_MeasurmentTypes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ProductTypes'
ALTER TABLE [dbo].[ProductTypes]
ADD CONSTRAINT [PK_ProductTypes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Categories'
ALTER TABLE [dbo].[Categories]
ADD CONSTRAINT [PK_Categories]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'FoodUsages'
ALTER TABLE [dbo].[FoodUsages]
ADD CONSTRAINT [PK_FoodUsages]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Portions'
ALTER TABLE [dbo].[Portions]
ADD CONSTRAINT [PK_Portions]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'InsulinUsages'
ALTER TABLE [dbo].[InsulinUsages]
ADD CONSTRAINT [PK_InsulinUsages]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Shugars'
ALTER TABLE [dbo].[Shugars]
ADD CONSTRAINT [PK_Shugars]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'InsulinTypes'
ALTER TABLE [dbo].[InsulinTypes]
ADD CONSTRAINT [PK_InsulinTypes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [CategoryId] in table 'Products'
ALTER TABLE [dbo].[Products]
ADD CONSTRAINT [FK_CategoryProduct]
    FOREIGN KEY ([CategoryId])
    REFERENCES [dbo].[Categories]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_CategoryProduct'
CREATE INDEX [IX_FK_CategoryProduct]
ON [dbo].[Products]
    ([CategoryId]);
GO

-- Creating foreign key on [ProductTypeId] in table 'Products'
ALTER TABLE [dbo].[Products]
ADD CONSTRAINT [FK_ProductTypeProduct]
    FOREIGN KEY ([ProductTypeId])
    REFERENCES [dbo].[ProductTypes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ProductTypeProduct'
CREATE INDEX [IX_FK_ProductTypeProduct]
ON [dbo].[Products]
    ([ProductTypeId]);
GO

-- Creating foreign key on [MeasurmentTypeId] in table 'Products'
ALTER TABLE [dbo].[Products]
ADD CONSTRAINT [FK_MeasurmentTypeProduct]
    FOREIGN KEY ([MeasurmentTypeId])
    REFERENCES [dbo].[MeasurmentTypes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_MeasurmentTypeProduct'
CREATE INDEX [IX_FK_MeasurmentTypeProduct]
ON [dbo].[Products]
    ([MeasurmentTypeId]);
GO

-- Creating foreign key on [ProductId] in table 'Portions'
ALTER TABLE [dbo].[Portions]
ADD CONSTRAINT [FK_ProductPortion]
    FOREIGN KEY ([ProductId])
    REFERENCES [dbo].[Products]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_ProductPortion'
CREATE INDEX [IX_FK_ProductPortion]
ON [dbo].[Portions]
    ([ProductId]);
GO

-- Creating foreign key on [FoodUsageId] in table 'Portions'
ALTER TABLE [dbo].[Portions]
ADD CONSTRAINT [FK_FoodUsagePortion]
    FOREIGN KEY ([FoodUsageId])
    REFERENCES [dbo].[FoodUsages]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_FoodUsagePortion'
CREATE INDEX [IX_FK_FoodUsagePortion]
ON [dbo].[Portions]
    ([FoodUsageId]);
GO

-- Creating foreign key on [InsulinTypeId] in table 'InsulinUsages'
ALTER TABLE [dbo].[InsulinUsages]
ADD CONSTRAINT [FK_InsulinTypeInsulinUsage]
    FOREIGN KEY ([InsulinTypeId])
    REFERENCES [dbo].[InsulinTypes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_InsulinTypeInsulinUsage'
CREATE INDEX [IX_FK_InsulinTypeInsulinUsage]
ON [dbo].[InsulinUsages]
    ([InsulinTypeId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------