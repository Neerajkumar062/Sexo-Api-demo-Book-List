CREATE TABLE [dbo].[tblLog]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [ISBN_Number] VARCHAR(500) NULL, 
    [BookId] VARCHAR(500) NULL, 
    [Date_Added] DATETIME NULL, 
    [date_updated] DATETIME NULL, 
    [IsChecked] BIT NULL
)
