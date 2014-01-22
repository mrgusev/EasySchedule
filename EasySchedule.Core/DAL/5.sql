--SELECT * FROM Products WHERE FREETEXT(Name, N'Рис')


--ALTER TABLE [dbo].[Products] 
--DROP COLUMN [FullName]
--GO 

--ALTER TABLE [dbo].[Products] 
--	ADD [FullName] nvarchar(300) NOT NULL  DEFAULT (('0')) 

--DELETE Products 
--FROM Products
--LEFT OUTER JOIN (
--   SELECT MIN(Id) as id, FullName 
--   FROM Products 
--   GROUP BY FullName
--) as KeepRows ON
--   Products.Id = KeepRows.Id
--WHERE
--   KeepRows.Id IS NULL
   
--   go

ALTER TABLE Products
ADD UNIQUE (FullName)

--SELECT 
-- --id ,
-- COUNT(*) count,
-- FullName
--FROM 
-- Products
--GROUP BY
-- FullName
--Having
--COUNT(*) > 1