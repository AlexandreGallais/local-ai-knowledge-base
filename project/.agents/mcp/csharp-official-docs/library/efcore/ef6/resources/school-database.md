---
title: "School Sample Database - EF6 (part 1 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/resources/school-database.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# School Sample Database
This topic contains the schema and data for the School database. The sample School database is used in various places throughout the Entity Framework documentation.

> **Note:**
> The database server that is installed with Visual Studio is different depending on the version of Visual Studio you use. See Visual Studio Releases for details on what to use.

Here are the steps to create the database:

- Open Visual Studio
- **View** -> **Server Explorer**
- Right click on **Data Connections** -> **Add Connection…**
- If you haven’t connected to a database from Server Explorer before you’ll need to select **Microsoft SQL Server** as the data source
- Connect to either LocalDB or SQL Express, depending on which one you have installed
- Enter **School** as the database name
- Select **OK** and you will be asked if you want to create a new database, select **Yes**
- The new database will now appear in Server Explorer
- If you are using Visual Studio 2012 or newer
    - Right-click on the database in Server Explorer and select **New Query**
    - Copy the following SQL into the new query, then right-click on the query and select **Execute**
- If you are using Visual Studio 2010
    - Select **Data** -> **Transact SQL Editor** -> **New Query Connection...**
    - Enter **.\SQLEXPRESS** as the server name and click **OK**
    - Select the **STESample** database from the drop down at the top of the query editor
    - Copy the following SQL into the new query, then right-click on the query and select **Execute SQL**
