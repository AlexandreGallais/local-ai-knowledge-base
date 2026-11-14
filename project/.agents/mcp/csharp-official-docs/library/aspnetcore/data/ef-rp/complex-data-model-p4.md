---
title: "Part 5, Razor Pages with EF Core in ASP.NET Core - Data Model (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/data/ef-rp/complex-data-model.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Part 5, Razor Pages with EF Core in ASP.NET Core - Data Model (part 4 of 4)

## Drop and re-create the database

To force EF Core to create a new database, drop and update the database:

# Visual Studio

  * Delete the *Migrations* folder.
  * In the **Package Manager Console** (PMC), run the following commands:

  ```powershell
  Drop-Database
  Add-Migration InitialCreate
  Update-Database
  ```

# Visual Studio Code

  * Open a command window and navigate to the project folder. The project folder contains the `ContosoUniversity.csproj` file.
  * Delete the *Migrations* folder.
  * Run the following commands:

  ```dotnetcli
  dotnet ef database drop --force
  dotnet ef migrations add InitialCreate
  dotnet ef database update
  ```

 ---

Run the app. Running the app runs the `DbInitializer.Initialize` method. The `DbInitializer.Initialize` populates the new database.

# Visual Studio

Open the database in SSOX:

  * If SSOX was opened previously, click the **Refresh** button.
  * Expand the **Tables** node. The created tables are displayed.

# Visual Studio Code

Use a SQLite tool to examine the database:

* New tables and columns.
* Seeded data in tables.

---

<!-- Dropped, see previous comment

## Apply the migration

This section is optional. These steps work only for SQL Server LocalDB and only if you skipped the preceding Drop and re-create the database section.

When migrations are run with existing data, there may be FK constraints that are not satisfied with the existing data. With production data, steps must be taken to migrate the existing data. This section provides an example of fixing FK constraint violations. Don't make these code changes without a backup. Don't make these code changes if you completed the preceding Drop and re-create the database section.

The `{timestamp}_ComplexDataModel.cs` file contains the following code:

```csharp
migrationBuilder.AddColumn<int>(
    name: "DepartmentID",
    table: "Course",
    type: "int",
    nullable: false,
    defaultValue: 0);
```

The preceding code adds a non-nullable `DepartmentID` FK to the `Course` table. The database from the previous tutorial contains rows in `Course`, so that table cannot be updated by migrations.

To make the `ComplexDataModel` migration work with existing data:

* Change the code to give the new column (`DepartmentID`) a default value.
* Create a fake department named "Temp" to act as the default department.

#### Fix the foreign key <example-value>

In the `ComplexDataModel` migration class, update the `Up` method:

* Open the `{timestamp}_ComplexDataModel.cs` file.
* Comment out the line of code that adds the `DepartmentID` column to the `Course` table.

```csharp
migrationBuilder.AlterColumn<string>(
    name: "Title",
    table: "Course",
    maxLength: 50,
    nullable: true,
    oldClrType: typeof(string),
    oldNullable: true);
            
//migrationBuilder.AddColumn<int>(
//    name: "DepartmentID",
//    table: "Course",
//    nullable: false,
//    defaultValue: 0);
```

Add the following highlighted code. The new code goes after the `.CreateTable( name: "Department"` block:

```csharp
migrationBuilder.CreateTable(
    name: "Department",
    columns: table => new
    {
        DepartmentID = table.Column<int>(type: "int", nullable: false)
            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
        Budget = table.Column<decimal>(type: "money", nullable: false),
        InstructorID = table.Column<int>(type: "int", nullable: true),
        Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
        StartDate = table.Column<DateTime>(type: "datetime2", nullable: false)
    },
    constraints: table =>
    {
        table.PrimaryKey("PK_Department", x => x.DepartmentID);
        table.ForeignKey(
            name: "FK_Department_Instructor_InstructorID",
            column: x => x.InstructorID,
            principalTable: "Instructor",
            principalColumn: "ID",
            onDelete: ReferentialAction.Restrict);
    });

 migrationBuilder.Sql("INSERT INTO dbo.Department (Name, Budget, StartDate) VALUES ('Temp', 0.00, GETDATE())");
// Default value for FK points to department created above, with
// defaultValue changed to 1 in following AddColumn statement.

migrationBuilder.AddColumn<int>(
    name: "DepartmentID",
    table: "Course",
    nullable: false,
    defaultValue: 1);
```

With the preceding changes, existing `Course` rows will be related to the "Temp" department after the `ComplexDataModel.Up` method runs.

The way of handling the situation shown here is simplified for this tutorial. A production app would:

* Include code or scripts to add `Department` rows and related `Course` rows to the new `Department` rows.
* Not use the "Temp" department or the default value for `Course.DepartmentID`.

# Visual Studio

* In the **Package Manager Console** (PMC), run the following command:

  ```powershell
  Update-Database
  ```

Because the `DbInitializer.Initialize` method is designed to work only with an empty database, use SSOX to delete all the rows in the Student and Course tables. (Cascade delete will take care of the Enrollment table.)

# Visual Studio Code

* If you're using SQL Server LocalDB with Visual Studio Code, run the following command:

  ```dotnetcli
  dotnet ef database update
  ```

---

Run the app. Running the app runs the `DbInitializer.Initialize` method. The `DbInitializer.Initialize` populates the new database.
-->

## Next steps

The next two tutorials show how to read and update related data.

> Previous tutorial
> Next tutorial
