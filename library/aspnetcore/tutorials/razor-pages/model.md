---
title: "Part 2, add a model (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/tutorials/razor-pages/model.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Part 2, add a model to a Razor Pages app in ASP.NET Core

-->
-->

In this tutorial, you add classes for managing movies in a database. The app's model classes use Entity Framework Core (EF Core) to work with the database. EF Core is an object-relational mapper (O/RM) that simplifies data access. You write the model classes first, and EF Core creates the database.

The model classes are known as POCO classes (from "**P**lain-**O**ld **C**LR **O**bjects") because they don't have a dependency on EF Core. They define the properties of the data that are stored in the database.

# Visual Studio

1. In **Solution Explorer**, right-click the *RazorPagesMovie* project. Select **Add** > **New Folder**. Name the folder `Models`.
1. Right-click the `Models` folder. Select **Add** > **Class**. Name the class *Movie*.
1. Add the following properties to the `Movie` class:

   ```csharp
using System.ComponentModel.DataAnnotations;

namespace RazorPagesMovie.Models;

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

The `Movie` class contains:

* The `ID` field is required by the database for the primary key.
* A [DataType] attribute that specifies the type of data in the `ReleaseDate` property. By using this attribute:

  * The user isn't required to enter time information in the date field.
  * Only the date is displayed, without any time information.
* A question mark after `string` indicates that the property is nullable. For more information, see Nullable reference types.

DataAnnotations are covered in a later tutorial.

Build the project to verify there are no compilation errors.

# Visual Studio Code

1. Add a folder named `Models`.
1. Add a class to the `Models` folder named `Movie.cs`.

Add the following properties to the `Movie` class:

```csharp
using System.ComponentModel.DataAnnotations;

namespace RazorPagesMovie.Models;

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

The `Movie` class contains:

* An `ID` field that acts as the primary key for the database.
* A [DataType] attribute that specifies the type of data in the `ReleaseDate` field. By using this attribute:

  * The user doesn't need to enter time information in the date field.
  * Only the date is displayed, without any time information.
* A question mark after `string` indicates that the property is nullable. For more information, see Nullable reference types.

DataAnnotations are covered in a later tutorial.

### Add NuGet packages, EF tools, and .NET scaffolding tools

Run the following .NET CLI commands:

```dotnetcli
dotnet tool install --global Microsoft.dotnet-scaffold
dotnet tool uninstall --global dotnet-ef
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

The preceding commands add:
* .NET scaffold tooling.
* Command-line interface (CLI) tools for EF Core.
* Design time tools for EF Core.
* The EF Core SQLite provider, which installs the EF Core package as a dependency.
* Packages needed for scaffolding: `Microsoft.VisualStudio.Web.CodeGeneration.Design` and `Microsoft.EntityFrameworkCore.SqlServer`.

For guidance on multiple environment configuration that permits an app to configure its database contexts by environment, see ASP.NET Core runtime environments.

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the '--arch' option.
> For more information, see GitHub dotnet/aspnetcore.docs issue #29262 - _Add '-a arm64' on Apple Silicon_.

In Visual Studio Code, press `Ctrl`+`F5` to run the app without debugging.

In the *Panel* below the editor region, select the *PROBLEMS* tab, or from the *View* menu, select *Problems* if it's not currently in view. Verify there are no compilation errors.

---

## Scaffold the movie model

In this section, you scaffold the movie model. The scaffolding tool generates pages for Create, Read, Update, and Delete (CRUD) operations for the movie model.

# Visual Studio

1. Right-click on the **Pages** folder. Select **Add** > **New Scaffolded Item**.

1. In the **Add New Scaffold** dialog, select **Razor Pages using Entity Framework (CRUD)** > **Add**.

1. Complete the **Add Razor Pages using Entity Framework (CRUD)** dialog:
   1. In the **Model class** drop down, select **Movie (RazorPagesMovie.Models)**.
   1. In the **Data context class** row, select the **+** (plus) sign.
      1. In the **Add Data Context** dialog, the class name `RazorPagesMovie.Data.RazorPagesMovieContext` is generated.
      1. In the **Database provider** drop down, select **SQL Server**.
   1. Select **Add**.

The `appsettings.json` file is updated with the connection string used to connect to a local database.

# Visual Studio Code

In the **Terminal** (**Terminal** menu > **New Terminal**) opened to the project's root directory, execute the following command. SQLite is used as the database for users adopting VS Code tooling for this tutorial series.

```dotnetcli
dotnet scaffold
```

When the initializing prompt appears, press `Enter` on the keyboard.

For the **Scaffolding Category**, use the arrow keys to select **Razor Pages**. Press `Enter`.

For **Pick a scaffolding command**, use the arrow keys to select **Razor Pages with Entity Framework (CRUD) (dotnet-scaffold)**. Press `Enter`.

*CRUD* is an acronym for Create, Read, Update, and Delete. The scaffolder produces create, edit, delete, details, and index pages for the app.

For the **.NET project file**, press `Enter` to accept the app's project file (`RazorPagesMovie (RazorPagesMovie.csproj)`).

For the **Model Name**, confirm that **Movie** (`Movie` class) is selected. Press `Enter`.

For **Enter a new value for 'Data Context Class'**, type in `RazorPagesMovieContext`. Press `Enter`.

For the **Database Provider**, use the arrow keys to select **sqlite-efcore**. Press `Enter`.

For **Page Type**, confirm that **CRUD** is selected. Press `Enter`.

If prompted to include prerelease packages, use the arrow keys to select **No**. Press `Enter`.

The scaffolder adds the EF Core design-time and SQLite provider packages to the app.

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see Secure authentication flows.

### Files created and updated

The scaffold process creates the following files:

* *Pages/MoviePages*: Create, Delete, Details, Edit, and Index.
* `RazorPagesMovieContext.cs`

The next tutorial explains the created files.

The scaffold process adds the following highlighted code to the `Program.cs` file:

# Visual Studio

```csharp
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("RazorPagesMovieContext") ?? throw new InvalidOperationException("Connection string 'RazorPagesMovieContext' not found.");

builder.Services.AddDbContext<RazorPagesMovieContext>(options => options.UseSqlServer(connectionString));

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

app.Run();
```

# Visual Studio Code

```csharp
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("RazorPagesMovieContext") ?? throw new InvalidOperationException("Connection string 'RazorPagesMovieContext' not found.");

builder.Services.AddDbContext<RazorPagesMovieContext>(options => options.UseSqlite(connectionString));

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();
   
app.Run();
```

---

Later in this tutorial, you learn about the `Program.cs` changes.

## Create the initial database schema by using EF's migration feature

The migrations feature in Entity Framework Core provides a way to:

* Create the initial database schema.
* Incrementally update the database schema to keep it in sync with the app's data model.  This approach preserves existing data in the database.

# Visual Studio

In this section, use the **Package Manager Console** (PMC) window to:

* Add an initial migration.
* Update the database with the initial migration.

* From the **Tools** menu, select **NuGet Package Manager** > **Package Manager Console**.

* In the PMC, enter the following command:

  ```powershell
  Add-Migration InitialCreate
  ```

* The `Add-Migration` command generates code to create the initial database schema. The schema is based on the model specified in `DbContext`. The `InitialCreate` argument names the migration. You can use any name, but by convention choose a name that describes the migration.

The following warning is displayed, which you address in a later step:

> No store type was specified for the decimal column 'Price' on entity type 'Movie'. This condition causes values to be silently truncated if they don't fit in the default precision and scale. Explicitly specify the SQL server column type that can accommodate all the values in 'OnModelCreating' by using 'HasColumnType', specify precision and scale using 'HasPrecision', or configure a value converter using 'HasConversion'.

* In the PMC, enter the following command:

  ```powershell
  Update-Database
  ```
  The `Update-Database` command runs the `Up` method in migrations that aren't applied. In this case, the command runs the `Up` method in the `Migrations/<time-stamp>_InitialCreate.cs` file, which creates the database.

# Visual Studio Code

* Right-click the *RazorPagesMovie.csproj* project, and then select **Open in Integrated Terminal**.

  The **Terminal** window opens with the command prompt at the project directory, which contains the Program.cs and .csproj files.

* Run the following .NET CLI command:

  ```dotnetcli
  dotnet ef migrations add InitialCreate
  ```

  The `migrations` command generates code to create the initial database schema. The schema is based on the model specified in `DbContext`. The `InitialCreate` argument is used to name the migrations. You can use any name, but by convention, choose a name that describes the migration.

* Run the following .NET CLI command:

  ```dotnetcli
  dotnet ef database update
  ```
  The `update` command runs the `Up` method in migrations that aren't applied. In this case, `update` runs the `Up` method in the `Migrations/<time-stamp>_InitialCreate.cs` file, which creates the database.

> **Note:**
> For SQLite, the column type for the `Price` field is set to `TEXT`. This issue is resolved in a later step.

---

The data context `RazorPagesMovieContext`:

* Derives from Microsoft.EntityFrameworkCore.DbContext.
* Specifies which entities are included in the data model.
* Coordinates EF Core functionality, such as Create, Read, Update, and Delete, for the `Movie` model.

The `RazorPagesMovieContext` class in the generated file `RazorPagesMovieContext.cs`:

```csharp
﻿using Microsoft.EntityFrameworkCore;

public class RazorPagesMovieContext(DbContextOptions<RazorPagesMovieContext> options) : DbContext(options)
{
    public DbSet<RazorPagesMovie.Models.Movie> Movie { get; set; } = default!;
}
```

The preceding code creates a DbSet\<Movie> property for the entity set. In Entity Framework terminology, an entity set typically corresponds to a database table. An entity corresponds to a row in the table.

The name of the connection string is passed to the context by calling a method on a DbContextOptions object. For local development, the Configuration system reads the connection string from the `appsettings.json` file.
