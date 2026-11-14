---
title: "Build a Blazor movie database app (Part 2 - Add and scaffold a model) (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/tutorials/movie-database-app/part-2.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Build a Blazor movie database app (Part 2 - Add and scaffold a model)

This article is the second part of the Blazor movie database app tutorial that teaches you the basics of building an ASP.NET Core Blazor Web App with features to manage a movie database.

In this part of the tutorial series:

* A class is added to the app representing a movie in a database.
* Entity Framework Core (EF Core) services and tooling create a database context and database. EF Core is an object-relational mapper (O/RM) that simplifies data access. You write model classes first, and EF Core creates the database from the model classes, which is called *scaffolding*.
* Additional tooling scaffolds a Razor component-based UI for interacting with the movie records in the database via the database context.

## Add a data model

**vs:**

In **Solution Explorer**, right-click the `BlazorWebAppMovies` project and select **Add** > **New Folder**. Name the folder `Models`.

Right-click the `Models` folder. Select **Add** > **Class**. Name the file `Movie.cs`. Use the following contents for the file.

**vsc:**

Add a folder to the project named `Models`.

Add a class file to the `Models` folder named `Movie.cs`. Use the following contents for the file.

**cli:**

Add a folder to the project named `Models`.

Add a class file to the `Models` folder named `Movie.cs`. Use the following contents for the file.

`Models/Movie.cs`:

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlazorWebAppMovies.Models;

public class Movie
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public DateOnly ReleaseDate { get; set; }

    public string? Genre { get; set; }

    [DataType(DataType.Currency)]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }
}
```

The `Movie` class contains:

* A record identifier property (`Id`), which is required by EF Core and the database to track records. In the database, the `Id` property is the database record's primary key.
* Other properties that describe aspects of a movie:
  * Title (`Title`)
  * Release date (`ReleaseDate`)
  * Genre (`Genre`)
  * Price (`Price`)

The question mark on a `string` type indicates that the property is nullable (it can hold a `null` value).

The EF Core database provider selects data types based on the .NET types of the model's properties. The provider also takes into account other metadata provided by `System.ComponentModel.DataAnnotations`, which are a set of attribute classes placed above a model's property with the following format, where the `{ANNOTATION}` placeholder is the annotation name. You can place multiple annotations on the same line separated by commas inside the brackets, or you can place multiple annotations on separate lines, which is the approach adopted by this tutorial series.

```csharp
[{ANNOTATION}]
```

The `Price` property in the `Movie` class file has two data annotations:

```csharp
[DataType(DataType.Currency)]
[Column(TypeName = "decimal(18, 2)")]
public decimal Price { get; set; }
```

These annotations specify:

* That the property holds a currency data type.
* The database column is a decimal of 18 digits with two decimal places.

More information on data annotations, including adding data annotations for validation, is covered in a later part of the tutorial series.

**vs:**

Select **Build** > **Build Solution** from the menu bar or press `F6` on the keyboard. Confirm in the **Output** panel that the build succeeded.

**vsc:**

## Add Nuget packages and tools

To add the `dotnet scaffold` tool, execute the following .NET CLI command in the **Terminal** (**Terminal** menu > **New Terminal**) opened to the project's root folder:

```dotnetcli
dotnet tool install --global Microsoft.dotnet-scaffold
```

Save any open files.

In the **Command Palette** (`Ctrl`+`Shift`+`P`), use the `.NET: Build` command to build the app.

Confirm that the app built successfully.

**cli:**

## Add Nuget packages and tools

To add the `dotnet scaffold` tool, execute the following .NET CLI command in a command shell opened to the project's root folder:

```dotnetcli
dotnet tool install --global Microsoft.dotnet-scaffold
```

Save any open files.

In a command shell opened to the project's root folder, execute the `dotnet build` command:

```dotnetcli
dotnet build
```

Confirm that the app built successfully.

## Scaffold the model

In this section, the `Movie` model is used to *scaffold* a database context and a UI for managing movies in the database. .NET scaffolding is a code generation framework for .NET applications. You use scaffolding to quickly add database and UI code that interacts with data models.

**vs:**

Right-click on the `Components/Pages` folder and select **Add** > **New Scaffolded Item**:

With the **Add New Scaffold Item** dialog open to **Installed** > **Common** > **Blazor** > **Razor Component**, select **Razor Components using Entity Framework (CRUD)**. Select the **Add** button.

*CRUD* is an acronym for Create, Read, Update, and Delete. The scaffolder produces create, edit, delete, details, and index components for the app.

Complete the **Add Razor Components using Entity Framework (CRUD)** dialog:

* The **Template** dropdown list includes other templates for specifically creating create, edit, delete, details, and list components. This dropdown list comes in handy when you only need to create a specific type of component scaffolded to a model class. Leave the **Template** dropdown list set to **CRUD** to scaffold a full set of components.
* In the **Model class** dropdown list, select **Movie (BlazorWebAppMovies.Models)**.
* For **DbContext class**, select the **+** (plus sign) button.
* In the **Add Data Context** modal dialog, the class name `BlazorWebAppMovies.Data.BlazorWebAppMoviesContext` is generated. Use the default generated value. Select the **Add** button.
* After the model dialog closes, the **Database provider** dropdown list defaults to **SQL Server**. When you're building apps in the future, you can select the appropriate provider for the database that you're using. The options include SQLite, PostgreSQL, and Azure Cosmos DB. Leave the **Database provider** dropdown list set to **SQL Server**.
* Select **Add**.

**vsc:**

In the **Terminal** (**Terminal** menu > **New Terminal**) opened to the project's root directory, execute the following command. SQLite is used as the database for users adopting VS Code tooling for this tutorial series.

```dotnetcli
dotnet scaffold
```

When the initializing prompt appears, press `Enter` on the keyboard.

For the **Scaffolding Category**, use the arrow keys to select **Blazor**. Press `Enter`.

For the **Command Name**, use the arrow keys to select **Razor Components with EntityFrameworkCore (CRUD)**. Press `Enter`.

*CRUD* is an acronym for Create, Read, Update, and Delete. The scaffolder produces create, edit, delete, details, and index components for the app.

For the **.NET project file**, press `Enter` to accept the app's project file (`BlazorWebAppMovies.csproj`).

For the **Model Name**, confirm that **Movie** (`Movie` class) is selected. Press `Enter`.

For the **Data Context Class**, type `BlazorWebAppMoviesContext`. Press `Enter`.

For the **Database Provider**, use the arrow keys to select **sqlite-efcore**. Press `Enter`.

For **Page**, confirm that **CRUD** is selected. Press `Enter`.

When prompted to include prerelease packages, use the arrow keys to select **No**. Press `Enter`.

Executing the `dotnet scaffold` command adds the following tools and packages to the app:

* Command-line interface (CLI) tools for EF Core.
* `dotnet scaffold` tooling.
* Design time tools for EF Core.
* The SQLite provider with the EF Core package as a dependency.
* `Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore` to use the `Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter*` extension method in the `Program` file, which captures database-related exceptions.

**cli:**

In a command shell opened to the project's root folder, execute the following command. SQLite is used as the database for users adopting .NET CLI tooling for this tutorial series.

```dotnetcli
dotnet scaffold
```

When the initializing prompt appears, press `Enter` on the keyboard.

For the **Scaffolding Category**, use the arrow keys to select **Blazor**. Press `Enter`.

For the **Command Name**, use the arrow keys to select **Razor Components with EntityFrameworkCore (CRUD)**. Press `Enter`.

*CRUD* is an acronym for Create, Read, Update, and Delete. The scaffolder produces create, edit, delete, details, and index components for the app.

For the **.NET project file**, press `Enter` to accept the app's project file (`BlazorWebAppMovies.csproj`).

For the **Model Name**, confirm that **Movie** (`Movie` class) is selected. Press `Enter`.

For the **Data Context Class**, type `BlazorWebAppMoviesContext`. Press `Enter`.

For the **Database Provider**, use the arrow keys to select **sqlite-efcore**. Press `Enter`.

For **Page**, confirm that **CRUD** is selected. Press `Enter`.

When prompted to include prerelease packages, use the arrow keys to select **No**. Press `Enter`.

Executing the `dotnet scaffold` command adds the following tools and packages to the app:

* Command-line interface (CLI) tools for EF Core.
* `dotnet scaffold` tooling.
* Design time tools for EF Core.
* The SQLite provider with the EF Core package as a dependency.
* `Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore` to use the `Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter*` extension method in the `Program` file, which captures database-related exceptions.

The `appsettings.json` file is updated with the connection string used to connect to a local database. In the following example, the `{CONNECTION STRING}` is the connection string automatically generated by the scaffolder:

```json
"ConnectionStrings": {
  "BlazorWebAppMoviesContext": "{CONNECTION STRING}"
}
```

> **Warning:**
> Don'<example-value>'t the most secure approach. For local development testing, the Secret <example-value> tool is recommended for securing sensitive data. For more information, see Securely maintain sensitive data and credentials.
