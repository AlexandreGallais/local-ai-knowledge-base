---
title: "Part 4, add a model to an ASP.NET Core MVC app (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/tutorials/first-mvc-app/adding-model.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Part 4, add a model to an ASP.NET Core MVC app

-->
-->

In this tutorial, classes are added for managing movies in a database. These classes are the "**M**odel" part of the **M**VC app.

These model classes are used with Entity Framework Core (EF Core) to work with a database. EF Core is an object-relational mapping (ORM) framework that simplifies the data access code that you have to write.

The model classes created are known as ***POCO*** classes, from **P**lain **O**ld **C**LR **O**bjects. POCO classes don't have any dependency on EF Core. They only define the properties of the data to be stored in the database.

In this tutorial,  model classes are created first, and EF Core creates the database.

# Visual Studio

Right-click the *Models* folder > **Add** > **Class**. Name the file `Movie.cs`.

# Visual Studio Code

Add a file named `Movie.cs` to the *Models* folder.

---

Update the `Models/Movie.cs` file with the following code:

```csharp
using System.ComponentModel.DataAnnotations;

namespace MvcMovie.Models;

public class Movie
{
    public int Id { get; set; }
    public string? Title { get; set; }
    [DataType(DataType.Date)]
    public DateTime ReleaseDate { get; set; }
    public string? Genre { get; set; }
    public decimal Price { get; set; }
}
```

The `Movie` class contains an `Id` field, which is required by the database for the primary key.

The `System.ComponentModel.DataAnnotations.DataType` attribute on `ReleaseDate` specifies the type of the data (`Date`). With this attribute:

* The user isn't required to enter time information in the date field.
* Only the date is displayed, not time information.

DataAnnotations are covered in a later tutorial.

The question mark after `string` indicates that the property is nullable. For more information, see Nullable reference types.

# Visual Studio

Visual Studio automatically installs the required packages.

Build the project as a check for compiler errors.

# Visual Studio Code

Open a command window in the project directory. The project directory is the directory that contains the `Program.cs` and `.csproj` files.

Run the following .NET CLI commands:

```dotnetcli
dotnet tool uninstall --global dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet tool uninstall --global dotnet-ef
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

The preceding commands add:
* The command-line interface (CLI) tools for EF Core
* The aspnet-codegenerator scaffolding tool.
* Design time tools for EF Core
* The EF Core SQLite provider, which installs the EF Core package as a dependency.
* Packages needed for scaffolding: `Microsoft.VisualStudio.Web.CodeGeneration.Design` and `Microsoft.EntityFrameworkCore.SqlServer`.

For guidance on multiple environment configuration that permits an app to configure its database contexts by environment, see ASP.NET Core runtime environments.

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the '--arch' option.
> For more information, see GitHub dotnet/aspnetcore.docs issue #29262 - _Add '-a arm64' on Apple Silicon_.

In Visual Studio Code, press `Ctrl`+`F5` to run the app without debugging.

In the *Panel* below the editor region, select the *PROBLEMS* tab, or from the *View* menu, select *Problems* if it is not currently in view. Verify there are no compilation errors.

---

## Scaffold movie pages

Use the scaffolding tool to produce `Create`, `Read`, `Update`, and `Delete` (CRUD) pages for the movie model.

# Visual Studio

In **Solution Explorer**, right-click the *Controllers* folder and select **Add > New Scaffolded Item**.

In the **Add New Scaffolded Item** dialog:

* In the left pane, select **Installed** > **Common** > **MVC**.
* Select  **MVC Controller with views, using Entity Framework**.
* Select **Add**.

Complete the **Add MVC Controller with views, using Entity Framework** dialog:

* In the **Model class** drop down, select **Movie (MvcMovie.Models)**.
* In the **Data context class** row, select the **+** (plus) sign.
  * In the **Add Data Context** dialog, the class name *MvcMovie.Data.MvcMovieContext* is generated.
  * Select **Add**.
* In the **Database provider** drop down, select **SQL Server**.
* **Views** and **Controller name**: Keep the default.
* Select **Add**.

If you get an error message, select **Add** a second time to try it again.

Scaffolding adds the following packages:

* `Microsoft.EntityFrameworkCore.SqlServer`
* `Microsoft.EntityFrameworkCore.Tools`
* `Microsoft.VisualStudio.Web.CodeGeneration.Design`

Scaffolding creates the following:

* A movies controller: `Controllers/MoviesController.cs`
* Razor view files for **Create**, **Delete**, **Details**, **Edit**, and **Index** pages: `Views/Movies/*.cshtml`
* A database context class: `Data/MvcMovieContext.cs`

Scaffolding updates the following:

* Inserts required package references in the `MvcMovie.csproj` project file.
* Registers the database context in the `Program.cs` file.
* Adds a database connection string to the `appsettings.json` file.

The automatic creation of these files and file updates is known as *scaffolding*.

The scaffolded pages can't be used yet because the database doesn't exist. Running the app and selecting the **Movie App** link results in a *Cannot open database* or *no such table: Movie* error message.

Build the app to verify that there are no errors.

# Visual Studio Code

Open a command window in the project directory. The project directory is the directory that contains the `Program.cs` and `.csproj` files.

On macOS and Linux, export the scaffold tool path:

```console
export PATH=$HOME/.dotnet/tools:$PATH
```

Run the following command:

```dotnetcli
dotnet aspnet-codegenerator controller -name MoviesController -m Movie -dc MvcMovie.Data.MvcMovieContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries --databaseProvider sqlite
```

The following table details the ASP.NET Core code generator parameters.

| Parameter               | Description|
| ----------------- | ------------ |
| -m  | The name of the model. |
| -dc  | The data context. |
| --relativeFolderPath | The relative output folder path to create the files. |
| --useDefaultLayout\|-udl | The default layout should be used for the views. |
| --referenceScriptLibraries | Adds `_ValidationScriptsPartial` to Edit and Create pages. |
| --databaseProvider sqlite | Specify `DbContext` should use SQLite instead of SQL Server. |

Use the `h` switch to get help on the `aspnet-codegenerator controller` command:

```dotnetcli
dotnet aspnet-codegenerator controller -h
```

For more information, see dotnet aspnet-codegenerator

Scaffolding creates the following:

* A movies controller: `Controllers/MoviesController.cs`
* Razor view files for **Create**, **Delete**, **Details**, **Edit**, and **Index** pages: `Views/Movies/*.cshtml`
* A database context class: `Data/MvcMovieContext.cs`

Scaffolding updates the following:

* Registers the database context in the `Program.cs` file
* Adds a database connection string to the `appsettings.json` file.

The automatic creation of these files and file updates is known as *scaffolding*.

The scaffolded pages can't be used yet because the database doesn't exist. Running the app and selecting the **Movie App** link results in a *Cannot open database* or *no such table: Movie* error message.

Build the app to verify that there are no errors.

### Use SQLite for development, SQL Server for production

The following highlighted code in `Program.cs` shows how to use SQLite in development and SQL Server in production.

```csharp
var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<MvcMovieContext>(options =>
        options.UseSqlite(builder.Configuration.GetConnectionString("MvcMovieContext")));
}
else
{
    builder.Services.AddDbContext<MvcMovieContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("ProductionMvcMovieContext")));
}
```

---
