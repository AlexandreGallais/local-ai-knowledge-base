---
title: "Build a Blazor movie database app (Part 7 - Add a new field) (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/tutorials/movie-database-app/part-7.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Build a Blazor movie database app (Part 7 - Add a new field) (part 2 of 2)

## Troubleshoot

In the event that the database becomes corrupted, delete the database and use migrations to recreate the database:

**vs:**

1. Select the database in **SQL Server Object Explorer** (SSOX).
1. Right-click on the database, and select **Delete**. *Make sure that you select the correct database in the list.*
1. Check **Close existing connections**.
1. Select **OK**.
1. In **Solution Explorer**, double-click **Connected Services**. In the **Service Dependencies** area, select the ellipsis (`...`) followed by **Update database** in the **SQL Server Express LocalDB** area. Updating the database executes the existing migrations that recreate the database.

**vsc:**

1. Delete the database. If your database tooling has a connection to the database, close the tooling first or use the tool's features to close the database connection and delete the database. Consult your tool's documentation for guidance. *Make sure that you select the correct database in the list.*
1. In the **Terminal** (**Terminal** menu > **New Terminal**), execute the following command to run the existing migrations that recreate the database:

   ```dotnetcli
   dotnet ef database update
   ```

**cli:**

1. Delete the database. If your database tooling has a connection to the database, close the tooling first or use the tool's features to close the database connection and delete the database. Consult your tool's documentation for guidance. *Make sure that you select the correct database in the list.*
1. In a command shell opened to the project's root folder, execute the following command to run the existing migrations that recreate the database:

   ```dotnetcli
   dotnet ef database update
   ```

## Delete all database records and reseed the database

*This section describes an alternative process for updating the database with a default value for a new model property without modifying the migration file. Following the guidance in this section isn't necessary if you followed all of the steps in the Update the database section earlier in this article.*

To delete all of the records in the database, use one of the following approaches:

**vs:**

* Run the app and use the delete links in the browser. This approach is reasonably fast when there are only a few records to delete.
* In Visual Studio from **SQL Server Object Explorer** (SSOX), delete the database records. With the database table visible, right-click the table and select **View Data**. When the table opens to show the movie records, select the first record. Hold the `Shift` key and select the last record to select all of the records in the table. With all of the records selected, press the `Delete` key to delete the records. This approach is reasonably fast when there are many records to delete.
* In Visual Studio from SSOX, right-click the database and select **New Query**. A blank SQL file (`.sql`) opens. Paste the following command into the file: `DELETE FROM dbo.Movie;`. Select the green **Execute** triangle to execute the query or press `Ctrl`+`Shift`+`E` on the keyboard. In the **Message** tab, SSOX reports the number of rows affected, deleted in this case, by the query. You can save the query for later use if you wish. Otherwise, close the file without saving it. This approach is especially useful when the table is large and contains hundreds to thousands of records.

**vsc:**

* Run the app and use the delete links in the browser. This approach is reasonably fast when there are only a few records to delete.
* Using database tooling&dagger;, delete the database records. In most database tools that permit direct manipulation of data, open the database table's data view in the tooling. When the table opens to show the movie records, select the first record. Hold the `Shift` key and select the last record to select all of the records in the database. With all of the records selected, press the `Delete` key to delete the records. You may need to adjust these instructions depending on the database tooling in use. Consult the tool's documentation for more information. This approach is reasonably fast when there are many records to delete.
* Using database tooling&dagger;, execute a SQL query against the movie table to delete the table's records. The SQL command is `DELETE FROM dbo.Movie;`. You can save the query for later use if you wish. Otherwise, close the file without saving it. Consult the tool's documentation for the exact steps. This approach is especially useful when the table is large and contains hundreds to thousands of records.

&dagger;*database tooling*: There are many free and retail database tools available on the open market that can work with SQL databases. Consult Internet resources to find one suitable for your database and platform.

**cli:**

* Run the app and use the delete links in the browser. This approach is reasonably fast when there are only a few records to delete.
* Using database tooling&dagger;, delete the database records. In most database tools that permit direct manipulation of data, open the database table's data view in the tooling. When the table opens to show the movie records, select the first record. Hold the `Shift` key and select the last record to select all of the records in the database. With all of the records selected, press the `Delete` key to delete the records. You may need to adjust these instructions depending on the database tooling in use. Consult the tool's documentation for more information. This approach is reasonably fast when there are many records to delete.
* Using database tooling&dagger;, execute a SQL query against the movie table to delete the table's records. The SQL command is `DELETE FROM dbo.Movie;`. You can save the query for later use if you wish. Otherwise, close the file without saving it. Consult the tool's documentation for the exact steps. This approach is especially useful when the table is large and contains hundreds to thousands of records.

&dagger;*database tooling*: There are many free and retail database tools available on the open market that can work with SQL databases. Consult Internet resources to find one suitable for your database and platform.

> **Warning:**
> Use extreme caution when deleting records from a database. Deleting records is permanent without taking additional data loss mitigation steps. Production databases often provision automatic backup copies of data, either instantaneously as the database is modified or periodically, including with off-site copies and permanent physical storage of data.

After deleting all of the records, run the app. The initializer reseeds the database and includes the correct movie ratings for the `Rating` field based on the seeding code.

## Troubleshoot with the completed sample

If you run into a problem while following the tutorial that you can't resolve from the text, compare your code to the completed project in the Blazor samples repository:

Blazor samples GitHub repository (`dotnet/blazor-samples`)

Select the latest version folder. The sample folder for this tutorial's project is named `BlazorWebAppMovies`.

## Related content

* Migrations (EF Core documentation)
* Customize migration code

## Legal

*Mad Max*, *The Road Warrior*, *Mad Max: Beyond Thunderdome*, *Mad Max: Fury Road*, and *Furiosa: A Mad Max Saga* are trademarks and copyrights of Warner Bros. Entertainment.

## Next steps

> Previous: Add Search
> Next: Add interactivity
