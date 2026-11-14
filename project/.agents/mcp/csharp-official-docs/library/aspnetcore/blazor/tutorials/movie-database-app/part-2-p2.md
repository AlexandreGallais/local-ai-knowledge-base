---
title: "Build a Blazor movie database app (Part 2 - Add and scaffold a model) (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/tutorials/movie-database-app/part-2.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Build a Blazor movie database app (Part 2 - Add and scaffold a model) (part 2 of 2)

## Files created and updated by scaffolding

The scaffolding process creates the following component files and movie database context class file:

* `Components/Pages/MoviePages`
  * `Create.razor`: Creates new movie entities.
  * `Delete.razor`: Deletes a movie entity.
  * `Details.razor`: Shows movie entity details.
  * `Edit.razor`: Updates a movie entity.
  * `Index.razor`: Lists movie entities (records) in the database.
* `Data/BlazorWebAppMoviesContext.cs`: Database context file (`Microsoft.EntityFrameworkCore.DbContext`).

The component files in the `MoviePages` folder are described in greater detail in the next part of this tutorial. The database context is described later in this article.

**vs:**

If the `MoviePages` folder and assets aren't present after scaffolding, return to the Scaffold the model section and rescaffold the `Movie` model, making sure that you select the **Razor Components using Entity Framework (CRUD)** scaffolder under **Installed** > **Common** > **Blazor** > **Razor Component** in the **Add New Scaffold Item** dialog.

ASP.NET Core is built with dependency injection (DI), which is a software design pattern for achieving Inversion of Control (IoC) between classes and their dependencies. Services, such as the EF Core database context, are registered with DI during application startup. These services are injected into Razor components for use by the components.

The `QuickGrid` component is a Razor component for efficiently displaying data in tabular form. The scaffolder places a `QuickGrid` component in the `Index` component (`Components/Pages/Index.razor`) to display movie entities. Calling `Microsoft.Extensions.DependencyInjection.EntityFrameworkAdapterServiceCollectionExtensions.AddQuickGridEntityFrameworkAdapter*` on the service collection adds an EF Core adapter for QuickGrid to recognize EF Core-supplied `System.Linq.IQueryable`1` instances and to resolve database queries asynchronously for efficiency.

In combination with `Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage*`, `Microsoft.Extensions.DependencyInjection.DatabaseDeveloperPageExceptionFilterServiceExtensions.AddDatabaseDeveloperPageExceptionFilter*` captures database-related exceptions that can be resolved by using Entity Framework migrations. When these exceptions occur, an HTML response is generated with details about possible actions to resolve the issue.

**vs:**

The following code is added to the `Program` file by the scaffolder if the database provider is SQL Server. The first statement of the following code registers a database context factory in the DI container to create database context instances on demand. A database context is used to perform database operations, such as reading and updating database records.

```csharp
builder.Services.AddDbContextFactory<BlazorWebAppMoviesContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("BlazorWebAppMoviesContext") ?? 
        throw new InvalidOperationException(
            "Connection string 'BlazorWebAppMoviesContext' not found.")));

builder.Services.AddQuickGridEntityFrameworkAdapter();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();
```

**vsc:**

The first statement reads and validates the connection string, and the second registers a database context factory in the DI container. A database context is used to perform database operations, such as reading and updating database records.

```csharp
var connectionString = 
    builder.Configuration.GetConnectionString("BlazorWebAppMoviesContext") ?? 
    throw new InvalidOperationException(
        "Connection string 'BlazorWebAppMoviesContext' not found.");

builder.Services.AddDbContextFactory<BlazorWebAppMoviesContext>(options => options.UseSqlite(connectionString));

builder.Services.AddQuickGridEntityFrameworkAdapter();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();
```

**cli:**

The following code is added to the `Program` file by the scaffolder if the database provider is SQLite. The first statement reads and validates the connection string, and the second statement registers a database context factory in the DI container to create database context instances on demand. A database context is used to perform database operations, such as reading and updating database records.

```csharp
var connectionString = 
    builder.Configuration.GetConnectionString("BlazorWebAppMoviesContext") ?? 
    throw new InvalidOperationException(
        "Connection string 'BlazorWebAppMoviesContext' not found.");

builder.Services.AddDbContextFactory<BlazorWebAppMoviesContext>(options => options.UseSqlite(connectionString));

builder.Services.AddQuickGridEntityFrameworkAdapter();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();
```

## Create the initial database schema using EF Core's migration feature

The migrations feature in EF Core:

* Creates the initial database schema.
* Incrementally updates the database schema to keep it synchronized with the app's data model. Existing data in the database is preserved.

EF Core adopts the *code-first* approach for database design and maintenance:

* Entity classes are created and updated first in the app.
* The database is created and updated from the app's entity classes.

This is the reverse procedure of *database-first* approaches, where the database is designed, built, and updated first. Adopting EF Core's code-first approach aims to speed up the process of app development because most of the difficult and time-consuming database creation and management procedures are handled transparently by the EF Core tooling, so you can focus on app development.

**vs:**

In this section, Visual Studio Connected Services are used to issue EF Core commands that:

* Add an initial migration.
* Update the database using the initial migration.

In **Solution Explorer**, double-click **Connected Services**. In the **SQL Server Express LocalDB** area of **Service Dependencies**, select the ellipsis (`...`) followed by **Add migration**:

Give the migration a **Migration name** of `InitialCreate`, which is a name that describes the migration. Wait for the database context to load in the **DbContext class names** field, which may take a few seconds. Select **Finish** to create the migration:

Select the **Close** button after the operation finishes.

Adding a migration generates code to create the initial database schema. The schema is based on the model specified in `Microsoft.EntityFrameworkCore.DbContext`.

Select the ellipsis (`...`) again followed by the **Update database** command:

The **Update database with the latest migration** dialog opens. Wait for the **DbContext class names** field to update and for prior migrations to load, which may take a few seconds. Select the **Finish** button:

The update database command executes the `Up` method migrations that haven't been applied in a migration code file created by the scaffolder. In this case, the command executes the `Up` method in the `Migrations/{TIME STAMP}_InitialCreate.cs` file, which creates the database. The `{TIME STAMP}` placeholder is a time stamp.

Select the **Close** button after the operation finishes.

**vsc:**

Right-click the `BlazorWebAppMovies` project file (`BlazorWebAppMovies.csproj`) and select **Open in Integrated Terminal**.

The **Terminal** window opens with a command prompt at the project directory, which contains the `Program` file and the app's project file (`.csproj`).

Execute the following .NET CLI command to add an initial migration. The `migrations` command generates code to create the initial database schema. The schema is based on the model specified in `Microsoft.EntityFrameworkCore.DbContext`. The `InitialCreate` argument is used to name the migration. Any name can be used, but the convention is to use a name that describes the migration.

```dotnetcli
dotnet ef migrations add InitialCreate
```

After the preceding command completes, update the database with the `update` command. The `update` command executes the `Up` method on migrations that haven't been applied in a migration code file created by the scaffolder. In this case, the command executes the `Up` method migrations in the `Migrations/{TIME STAMP}_InitialCreate.cs` file, which creates the database. The `{TIME STAMP}` placeholder is a time stamp.

```dotnetcli
dotnet ef database update
```

**cli:**

From the project's root folder, execute the following .NET CLI command to add an initial migration. The `migrations` command generates code to create the initial database schema. The schema is based on the model specified in `Microsoft.EntityFrameworkCore.DbContext`. The `InitialCreate` argument is used to name the migration. Any name can be used, but the convention is to use a name that describes the migration.

```dotnetcli
dotnet ef migrations add InitialCreate
```

After the preceding command completes, update the database with the `update` command. The `update` command executes the `Up` method on migrations that haven't been applied in a migration code file created by the scaffolder. In this case, the command executes the `Up` method migrations in the `Migrations/{TIME STAMP}_InitialCreate.cs` file, which creates the database. The `{TIME STAMP}` placeholder is a time stamp.

```dotnetcli
dotnet ef database update
```

The database context `BlazorWebAppMoviesContext` (`Data/BlazorWebAppMoviesContext.cs`):

* Derives from `Microsoft.EntityFrameworkCore.DbContext`.
* Specifies which entities are included in the data model.
* Coordinates EF Core functionality, such as CRUD operations, for the `Movie` model.
* Contains a `Microsoft.EntityFrameworkCore.DbSet`1` property for the `Movie` entity set. In EF terminology, an entity set typically corresponds to a database table. An entity corresponds to a row in the table.

The name of the connection string is passed in to the context by calling a method on a `Microsoft.EntityFrameworkCore.DbContextOptions` object. For local development, the connection string is read from the `appsettings.json` file.

> **Warning:**
> Don'<example-value>'t the most secure approach. For local development testing, the Secret <example-value> tool is recommended for securing sensitive data. For more information, see Securely maintain sensitive data and credentials.

## Test the app

Run the app.

Add `/movies` to the URL in the browser's address bar to navigate to the movies `Index` page.

After the `Index` page loads, select the **:::no-loc text="Create New":::** link.

Add a movie to the database. In the following example, the classic sci-fi movie *The Matrix* (&copy;1999 Warner Bros. Entertainment Inc.) is added as the first movie entry. Selecting the **:::no-loc text="Create":::** button adds the movie to the database:

When you select the **:::no-loc text="Create":::** button, the movie data is posted to the server and saved in the database.

When the app returns to the `Index` page, the added entity appears:

Open the `Edit` page. Edit the movie's record and save the changes.

Examine the `Delete` page, but don't delete *The Matrix* movie from the database. The presence of this movie record is valuable in the next step of the tutorial where rendered HTML is studied and some enhancements are made to the data displayed. If you already deleted the movie, add the movie to the database again using the `Create` page before proceeding to the next part of the tutorial series.

## Stop the app

**vs:**

Stop the app using either of the following approaches:

* Close the browser window.
* In Visual Studio, either:
  * Use the Stop button in Visual Studio's menu bar:

  * Press `Shift`+`F5` on the keyboard.

**vsc:**

Stop the app using the following approach:

1. Close the browser window.
1. In VS Code, either:
   * From the **Run** menu, select **Stop Debugging**.
   * Press `Shift`+`F5` on the keyboard.

**cli:**

Stop the app using the following approach:

1. Close the browser window.
2. From the command shell, press `Ctrl`+`C`.

## Troubleshoot with the completed sample

If you run into a problem while following the tutorial that you can't resolve from the text, compare your code to the completed project in the Blazor samples repository:

Blazor samples GitHub repository (`dotnet/blazor-samples`)

Select the latest version folder. The sample folder for this tutorial's project is named `BlazorWebAppMovies`.

## Related content

EF Core documentation:

* Entity Framework Core
* Entity Framework Core tools reference - .NET CLI
* Data Types
* `Microsoft.EntityFrameworkCore.DbContext.SaveChangesAsync*`: The API document includes basic <example-value> on how entities are saved and change detection.
* Environment-based `Startup` class and methods
* Dependency injection in ASP.NET Core
* ASP.NET Core Blazor \`QuickGrid\` component

## Legal

*The Matrix* is a copyright of Warner Bros. Entertainment Inc..

## Next steps

> Previous: Create a Blazor Web App
> Next: Learn about Razor components
