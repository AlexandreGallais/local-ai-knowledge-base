---
title: "Part 4, work with a database"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/tutorials/razor-pages/sql.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Part 4 of tutorial series on Razor Pages

-->
-->

By Joe Audette

The `RazorPagesMovieContext` object handles the task of connecting to the database and mapping `Movie` objects to database records. Register the database context with the dependency injection container in `Program.cs`:

# Visual Studio

```csharp
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("RazorPagesMovieContext") ?? throw new InvalidOperationException("Connection string 'RazorPagesMovieContext' not found.");

builder.Services.AddDbContext<RazorPagesMovieContext>(options => options.UseSqlServer(connectionString));

// Add services to the container.
builder.Services.AddRazorPages();
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
```

---

The ASP.NET Core Configuration system reads the `ConnectionString` key. For local development, the configuration gets the connection string from the `appsettings.json` file.

# Visual Studio

The generated connection string is similar to the following JSON:

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
    "RazorPagesMovieContext": "Server=(localdb)\\mssqllocaldb;Database=RazorPagesMovieContext-f2e0482c-952d-4b1c-afe9-a1a3dfe52e55;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

# Visual Studio Code

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
    "RazorPagesMovieContext": "Data Source=RazorPagesMovie.Data.db"
  }
}
```

---

> **Warning:**
> This article uses a local database that doesn't require the user to be authenticated. Production apps should use the most secure authentication flow available. For more information on authentication for deployed test and production apps, see Secure authentication flows.

# Visual Studio

## SQL Server Express LocalDB

LocalDB is a lightweight version of the SQL Server Express database engine that's designed for program development. LocalDB starts on demand and runs in user mode, so there's no complex configuration. By default, LocalDB creates `*.mdf` database files in the `C:\Users\<user>\` directory.

1. From the **View** menu, open **SQL Server Object Explorer** (SSOX).

1. Right-click on the `Movie` table and select **View Designer**:

   Note the key icon next to `ID`. By default, EF creates a property named `ID` for the primary key.

1. Right-click on the `Movie` table and select **View Data**:

# Visual Studio Code

## SQLite

The SQLite website states:

> SQLite is a self-contained, high-reliability, embedded, full-featured, public-domain, SQL Database engine. SQLite is the most used database engine in the world.

You can download many third-party tools to manage and view a SQLite database. The following image is from DB Browser for SQLite. If you have a favorite SQLite tool, leave a comment on what you like about it.

> **Note:**
> For this tutorial, use the Entity Framework Core *migrations* feature where possible. Migrations updates the database schema to match changes in the data model. However, migrations can only make changes that the EF Core provider supports, and the SQLite provider's capabilities are limited. For example, adding a column is supported, but removing or changing a column isn't supported. If you create a migration to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, this tutorial doesn't use migrations for SQLite schema changes. Instead, when the schema changes, the database is dropped and re-created.
>
>The workaround for the SQLite limitations is to manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:
>
>* Creating a new table.
>* Copying data from the old table to the new table.
>* Dropping the old table.
>* Renaming the new table.
>
>For more information, see the following resources:
> * SQLite EF Core Database Provider Limitations
> * Customize migration code
> * Data seeding
> * SQLite ALTER TABLE statement

---

## Seed the database

Create a new class named `SeedData` in the *Models* folder with the following code:

```csharp
using Microsoft.EntityFrameworkCore;

namespace RazorPagesMovie.Models;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new RazorPagesMovieContext(
            serviceProvider.GetRequiredService<
                DbContextOptions<RazorPagesMovieContext>>()))
        {
            if (context == null || context.Movie == null)
            {
                throw new ArgumentNullException("Null RazorPagesMovieContext");
            }

            // Look for any movies.
            if (context.Movie.Any())
            {
                return;   // DB has been seeded
            }

            context.Movie.AddRange(
                new Movie
                {
                    Title = "When Harry Met Sally",
                    ReleaseDate = DateTime.Parse("1989-2-12"),
                    Genre = "Romantic Comedy",
                    Price = 7.99M
                },

                new Movie
                {
                    Title = "Ghostbusters ",
                    ReleaseDate = DateTime.Parse("1984-3-13"),
                    Genre = "Comedy",
                    Price = 8.99M
                },

                new Movie
                {
                    Title = "Ghostbusters 2",
                    ReleaseDate = DateTime.Parse("1986-2-23"),
                    Genre = "Comedy",
                    Price = 9.99M
                },

                new Movie
                {
                    Title = "Rio Bravo",
                    ReleaseDate = DateTime.Parse("1959-4-15"),
                    Genre = "Western",
                    Price = 3.99M
                }
            );
            context.SaveChanges();
        }
    }
}
```

If the database contains any movies, the seed initializer returns and doesn't add any movies.

```csharp
if (context.Movie.Any())
{
    return;
}
```

### Add the seed initializer

Update `Program.cs` with the following highlighted code:

# Visual Studio

```csharp
using Microsoft.EntityFrameworkCore;
using RazorPagesMovie.Models;
var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("RazorPagesMovieContext") ?? throw new InvalidOperationException("Connection string 'RazorPagesMovieContext' not found.");

builder.Services.AddDbContext<RazorPagesMovieContext>(options => options.UseSqlServer(connectionString));

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    SeedData.Initialize(services);
}

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
using RazorPagesMovie.Models;
var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("RazorPagesMovieContext") ?? throw new InvalidOperationException("Connection string 'RazorPagesMovieContext' not found.");

builder.Services.AddDbContext<RazorPagesMovieContext>(options => options.UseSqlite(connectionString));

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    SeedData.Initialize(services);
}

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

---

In the preceding code, you modify `Program.cs` to do the following steps:

* Create a service scope with `app.Services.CreateScope()`.
* Obtain the service provider (`System.IServiceProvider`) from the scope.
* Call the `SeedData.Initialize` method, passing the service provider.
* Dispose the service scope when the seed method completes. The `using` statement ensures the scope is disposed.

The following exception occurs when you don't run `Update-Database`:

> `SqlException: Cannot open database "RazorPagesMovieContext-" requested by the login. The login failed.`
> `Login failed for user 'user name'.`

### Test the app

Delete all the records in the database so the seed method runs. Stop and start the app to seed the database. If the database isn't seeded, put a breakpoint on `if (context.Movie.Any())` and step through the code.

The app shows the seeded data:

## Next steps

> Previous: Scaffolded Razor Pages
> Next: Update the pages
