
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, and Azure
-- --------------------------------------------------
-- Date Created: 01/13/2014 10:21:53
-- Generated from EDMX file: F:\EasySchedule\EasySchedule.Core\DAL\EasyScheduleDataModel.edmx
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

IF OBJECT_ID(N'[dbo].[FK_FoodUsagePortion]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Portions] DROP CONSTRAINT [FK_FoodUsagePortion];
GO
IF OBJECT_ID(N'[dbo].[FK_InsulinTypeInsulinUsage]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[InsulinUsages] DROP CONSTRAINT [FK_InsulinTypeInsulinUsage];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FoodUsages]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FoodUsages];
GO
IF OBJECT_ID(N'[dbo].[InsulinUsages]', 'U') IS NOT NULL
    DROP TABLE [dbo].[InsulinUsages];
GO
IF OBJECT_ID(N'[dbo].[Sugars]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Sugars];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Portions'
CREATE TABLE [dbo].[Portions] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [ProductId] int  NOT NULL,
    [Value] float  NOT NULL,
    [Amount] float  NOT NULL,
    [BreadUnits] float  NOT NULL,
    [JournalItemId] int  NOT NULL
);
GO
-- Creating table 'JournalItems'
CREATE TABLE [dbo].[JournalItems] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Time] nvarchar(max)  NOT NULL,
    [Value] nvarchar(max)  NOT NULL,
    [JournalItemTypeId] int  NOT NULL,
    [FoodUsageTypeId] int  NOT NULL,
    [InsulinTypeId] int  NOT NULL
);
GO

-- Creating table 'JournalItemTypes'
CREATE TABLE [dbo].[JournalItemTypes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Units] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'FoodUsageTypes'
CREATE TABLE [dbo].[FoodUsageTypes] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [StartTime] nvarchar(max)  NOT NULL,
    [EndTime] nvarchar(max)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------
-- Creating primary key on [Id] in table 'JournalItems'
ALTER TABLE [dbo].[JournalItems]
ADD CONSTRAINT [PK_JournalItems]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'JournalItemTypes'
ALTER TABLE [dbo].[JournalItemTypes]
ADD CONSTRAINT [PK_JournalItemTypes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'FoodUsageTypes'
ALTER TABLE [dbo].[FoodUsageTypes]
ADD CONSTRAINT [PK_FoodUsageTypes]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [JournalItemTypeId] in table 'JournalItems'
ALTER TABLE [dbo].[JournalItems]
ADD CONSTRAINT [FK_JournalItemJournalItemType]
    FOREIGN KEY ([JournalItemTypeId])
    REFERENCES [dbo].[JournalItemTypes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_JournalItemJournalItemType'
CREATE INDEX [IX_FK_JournalItemJournalItemType]
ON [dbo].[JournalItems]
    ([JournalItemTypeId]);
GO

-- Creating foreign key on [FoodUsageTypeId] in table 'JournalItems'
ALTER TABLE [dbo].[JournalItems]
ADD CONSTRAINT [FK_JournalItemFoodUsageType]
    FOREIGN KEY ([FoodUsageTypeId])
    REFERENCES [dbo].[FoodUsageTypes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_JournalItemFoodUsageType'
CREATE INDEX [IX_FK_JournalItemFoodUsageType]
ON [dbo].[JournalItems]
    ([FoodUsageTypeId]);
GO

-- Creating foreign key on [InsulinTypeId] in table 'JournalItems'
ALTER TABLE [dbo].[JournalItems]
ADD CONSTRAINT [FK_JournalItemInsulinType]
    FOREIGN KEY ([InsulinTypeId])
    REFERENCES [dbo].[InsulinTypes]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_JournalItemInsulinType'
CREATE INDEX [IX_FK_JournalItemInsulinType]
ON [dbo].[JournalItems]
    ([InsulinTypeId]);
GO

-- Creating foreign key on [JournalItemId] in table 'Portions'
ALTER TABLE [dbo].[Portions]
ADD CONSTRAINT [FK_PortionJournalItem]
    FOREIGN KEY ([JournalItemId])
    REFERENCES [dbo].[JournalItems]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_PortionJournalItem'
CREATE INDEX [IX_FK_PortionJournalItem]
ON [dbo].[Portions]
    ([JournalItemId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------