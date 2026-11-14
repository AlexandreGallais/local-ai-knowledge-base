---
title: "Razor Pages with Entity Framework Core in ASP.NET Core - Tutorial 1 of 8 (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/data/ef-rp/intro.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Razor Pages with Entity Framework Core in ASP.NET Core - Tutorial 1 of 8 (part 2 of 3)

## The Course entity

Create `Models/Course.cs` with the following code:

  ```csharp
using System.ComponentModel.DataAnnotations.Schema;

namespace ContosoUniversity.Models
{
    public class Course
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CourseID { get; set; }
        public string Title { get; set; }
        public int Credits { get; set; }

        public ICollection<Enrollment> Enrollments { get; set; }
    }
}
```

The `Enrollments` property is a navigation property. A `Course` entity can be related to any number of `Enrollment` entities.

The `DatabaseGenerated` attribute allows the app to specify the primary key <example-value> than having the database generate it.

Build the app. The compiler generates several warnings about how `null` values are handled. See this GitHub issue, Nullable reference types, and Tutorial: Express your design intent more clearly with nullable and non-nullable reference types for more information.

To eliminate the warnings from nullable reference types, remove the following line from the `ContosoUniversity.csproj` file:

```xml
<Nullable>enable</Nullable>
```

The scaffolding engine currently does not support nullable reference types, therefore the models used in scaffold can't either.

Remove the `?` nullable reference type annotation from `public string? RequestId { get; set; }` in `Pages/Error.cshtml.cs` so the project builds without compiler warnings.

## Scaffold Student pages

In this section, the ASP.NET Core scaffolding tool is used to generate:

* An EF Core `DbContext` class. The context is the main class that coordinates Entity Framework functionality for a given data model. It derives from the `Microsoft.EntityFrameworkCore.DbContext` class.
* Razor pages that handle Create, Read, Update, and Delete (CRUD) operations for the `Student` entity.

# Visual Studio

* Create a *Pages/Students* folder.
* In **Solution Explorer**, right-click the *Pages/Students* folder and select **Add** > **New Scaffolded Item**.
* In the **Add New Scaffold Item** dialog:
  * In the left tab, select **Installed > Common > Razor Pages**
  * Select **Razor Pages using Entity Framework (CRUD)** > **ADD**.
* In the **Add Razor Pages using Entity Framework (CRUD)** dialog:
  * In the **Model class** drop-down, select **Student (ContosoUniversity.Models)**.
  * In the **Data context class** row, select the **+** (plus) sign.
    * Change the data context name to end in `SchoolContext` rather than `ContosoUniversityContext`. The updated context name: `ContosoUniversity.Data.SchoolContext`
    * Select **Add** to finish adding the data context class.
    * Select **Add** to finish the **Add Razor Pages** dialog.

The following packages are automatically installed:

* `Microsoft.EntityFrameworkCore.SqlServer`
* `Microsoft.EntityFrameworkCore.Tools`
* `Microsoft.VisualStudio.Web.CodeGeneration.Design`

# Visual Studio Code

* Run the following .NET CLI commands to install required NuGet packages:

  ```dotnetcli
  dotnet add package Microsoft.EntityFrameworkCore.SQLite
  dotnet add package Microsoft.EntityFrameworkCore.SqlServer
  dotnet add package Microsoft.EntityFrameworkCore.Design
  dotnet add package Microsoft.EntityFrameworkCore.Tools
  dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
  dotnet add package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore
  ```

   The `Microsoft.VisualStudio.Web.CodeGeneration.Design` package is required for scaffolding. Although the app won't use SQL Server, the scaffolding tool needs the SQL Server package.

* Create a *Pages/Students* folder.

* Run the following command to install the aspnet-codegenerator scaffolding tool.

  ```dotnetcli
   dotnet tool install --global dotnet-aspnet-codegenerator
  
  ```

* Run the following command to scaffold Student pages.

  **On Windows**

  ```dotnetcli
  dotnet aspnet-codegenerator razorpage -m Student -dc ContosoUniversity.Data.SchoolContext -udl -outDir Pages\Students --referenceScriptLibraries -dbProvider sqlite 
  ```

  **On macOS or Linux**

  ```dotnetcli
  dotnet aspnet-codegenerator razorpage -m Student -dc ContosoUniversity.Data.SchoolContext -udl -outDir Pages/Students --referenceScriptLibraries -dbProvider sqlite
  ```

---

If the preceding step fails, build the project and retry the scaffold step.

The scaffolding process:

* Creates Razor pages in the *Pages/Students* folder:
  * `Create.cshtml` and `Create.cshtml.cs`
  * `Delete.cshtml` and `Delete.cshtml.cs`
  * `Details.cshtml` and `Details.cshtml.cs`
  * `Edit.cshtml` and `Edit.cshtml.cs`
  * `Index.cshtml` and `Index.cshtml.cs`
* Creates `Data/SchoolContext.cs`.
* Adds the context to dependency injection in `Program.cs`.
* Adds a database connection string to `appsettings.json`.

## Database connection string

The scaffolding tool generates a connection string in the `appsettings.json` file.

# Visual Studio

The connection string specifies SQL Server LocalDB:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "SchoolContext": "Server=(localdb)\\mssqllocaldb;Database=SchoolContext-0e9;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

LocalDB is a lightweight version of the SQL Server Express Database Engine and is intended for app development, not production use. By default, LocalDB creates *.mdf* files in the `C:/Users/<user>` directory.

# Visual Studio Code

Rename the connection string key to `SchoolContextSQLite` and shorten value to `CU.db`:

```json
{
  "DetailedErrors": true,
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "SchoolContextSQLite": "Data Source=CU.db"
  },
  "MyMaxModelBindingCollectionSize": "3"
}
```

Don't change the directory without making sure it's valid.

Renaming the connection string key to `SchoolContextSQLite` helps the author maintain one sample that supports both the SQLlite and SQL Server.

---

## Update the database context class

The main class that coordinates EF Core functionality for a given data model is the database context class. The context is derived from `Microsoft.EntityFrameworkCore.DbContext`. The context specifies which entities are included in the data model. In this project, the class is named `SchoolContext`.

Update `Data/SchoolContext.cs` with the following code:

```csharp
﻿using Microsoft.EntityFrameworkCore;
using ContosoUniversity.Models;

namespace ContosoUniversity.Data
{
    public class SchoolContext : DbContext
    {
        public SchoolContext (DbContextOptions<SchoolContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Course> Courses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Course>().ToTable("Course");
            modelBuilder.Entity<Enrollment>().ToTable("Enrollment");
            modelBuilder.Entity<Student>().ToTable("Student");
        }
    }
}
```

The preceding code changes from the singular `DbSet<Student> Student` to the  plural `DbSet<Student> Students`. To make the Razor Pages code match the new `DBSet` name, make a global change from:
  `_context.Student.`
to:
  `_context.Students.`

There are 8 occurrences.

Because an entity set contains multiple entities, many developers prefer the `DBSet` property names should be plural.

The highlighted code:

* Creates a `Microsoft.EntityFrameworkCore.DbSet`1` property for each entity set. In EF Core terminology:
  * An entity set typically corresponds to a database table.
  * An entity corresponds to a row in the table.
* Calls `Microsoft.EntityFrameworkCore.DbContext.OnModelCreating*`. `OnModelCreating`:
  * Is called when `SchoolContext` has been initialized but before the model has been secured and used to initialize the context.
  * Is required because later in the tutorial the `Student` entity will have references to the other entities.

We hope to fix this issue in a future release.

## Program.cs

ASP.NET Core is built with dependency injection. Services such as the `SchoolContext` are registered with dependency injection during app startup. Components that require these services, such as Razor Pages, are provided these services via constructor parameters. The constructor code that gets a database context instance is shown later in the tutorial.

The scaffolding tool automatically registered the context class with the dependency injection container.

# Visual Studio

The following highlighted lines were added by the scaffolder:

```csharp
using ContosoUniversity.Data;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddDbContext<SchoolContext>(options =>
  options.UseSqlServer(builder.Configuration.GetConnectionString("SchoolContext")));
```

# Visual Studio Code

Verify the code added by the scaffolder calls `Microsoft.EntityFrameworkCore.SqliteDbContextOptionsBuilderExtensions.UseSqlite*`.

```csharp
using Microsoft.EntityFrameworkCore;
using ContosoUniversity.Data;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddDbContext<SchoolContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SchoolContextSQLite")));
```

See Use SQLite for development, SQL Server for production for information on using a production database.

---

The name of the connection string is passed in to the context by calling a method on a `Microsoft.EntityFrameworkCore.DbContextOptions` object. For local development, the ASP.NET Core configuration system reads the connection string from the `appsettings.json` or the `appsettings.Development.json` file.

### Add the database exception filter

Add `Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter*` and `Microsoft.AspNetCore.Builder.MigrationsEndPointExtensions.UseMigrationsEndPoint*` as shown in the following code:

# Visual Studio

```csharp
using ContosoUniversity.Data;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddDbContext<SchoolContext>(options =>
  options.UseSqlServer(builder.Configuration.GetConnectionString("SchoolContext")));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}
```

Add the Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore NuGet package.

In the Package Manager Console, enter the following to add the NuGet package:

```powershell
Install-Package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore
```

# Visual Studio Code

```csharp
using Microsoft.EntityFrameworkCore;
using ContosoUniversity.Data;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddDbContext<SchoolContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SchoolContextSQLite")));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}
```
---

The `Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore` NuGet package provides ASP.NET Core middleware for Entity Framework Core error pages. This middleware helps to detect and diagnose errors with Entity Framework Core migrations.

The `AddDatabaseDeveloperPageExceptionFilter` provides helpful error information in the development environment for EF migrations errors.
