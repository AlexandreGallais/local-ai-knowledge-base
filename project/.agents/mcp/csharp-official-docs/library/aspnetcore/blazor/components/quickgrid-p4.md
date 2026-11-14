---
title: "ASP.NET Core Blazor `QuickGrid` component (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/quickgrid.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor `QuickGrid` component (part 4 of 4)

## QuickGrid scaffolder

The QuickGrid scaffolder scaffolds Razor components with QuickGrid to display data from a database.

The scaffolder generates basic <example-value>, Read, Update, and Delete (CRUD) pages based on an Entity Framework Core data model. You can scaffold individual pages or all of the CRUD pages. You select the model class and the `DbContext`, optionally creating a new `DbContext` if needed.

The scaffolded Razor components are added to the project's in a generated folder named after the model class. The generated `Index` component uses a `QuickGrid` component to display the data. Customize the generated components as needed and enable interactivity to take advantage of interactive features, such as paging, sorting and filtering.

The components produced by the scaffolder require server-side rendering (SSR), so they aren't supported when running on WebAssembly.

# Visual Studio

Right-click on the `Components/Pages` folder and select **Add** > **New Scaffolded Item**.

With the **Add New Scaffold Item** dialog open to **Installed** > **Common** > **Blazor** > **Razor Component**, select **Razor Components using Entity Framework (CRUD)**. Select the **Add** button.

*CRUD* is an acronym for Create, Read, Update, and Delete. The scaffolder produces create, edit, delete, details, and index components for the app.

Complete the **Add Razor Components using Entity Framework (CRUD)** dialog:

* The **Template** dropdown list includes other templates for specifically creating create, edit, delete, details, and list components. This dropdown list comes in handy when you only need to create a specific type of component scaffolded to a model class. Leave the **Template** dropdown list set to **CRUD** to scaffold a full set of components.
* In the **Model class** dropdown list, select the model class. A folder is created for the generated components from the model name (if the model class is named `Movie`, the folder is automatically named `MoviePages`).
* For **DbContext class**, take either of the following approaches:
  * Select an existing `Microsoft.EntityFrameworkCore.DbContext` class.
  * Select the **+** (plus sign) button and use the **Add Data Context** modal dialog to supply a new `Microsoft.EntityFrameworkCore.DbContext` class name. The scaffolder registers a new context with a factory provider instead of using the context type directly as a service registration, and it updates an existing `ApplicationDbContext` registration to use a factory provider when needed.
* After the model dialog closes, the **Database provider** dropdown list defaults to **SQL Server**. You can select the appropriate provider for the database that you're using. The options include SQL Server, SQLite, PostgreSQL, and Azure Cosmos DB.
* Select **Add**.

# Visual Studio Code

Paste all of the following commands at the prompt (`>`) of the **Terminal** (**Terminal** menu > **New Terminal**) opened to the project's root directory. When you paste multiple commands, a warning appears stating that multiple commands will execute. Dismiss the warning and proceed with the paste operation.

When you paste multiple commands, all of the commands execute except the last one. The last command doesn't execute until you press `Enter` on the keyboard.

```dotnetcli
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Components.QuickGrid
dotnet add package Microsoft.AspNetCore.Components.QuickGrid.EntityFrameworkAdapter
```

> **Important:**
> After the first eight commands execute, make sure that you press `Enter` on the keyboard to execute the last command.

The preceding commands add:

* Command-line interface (CLI) tools for EF Core
* `aspnet-codegenerator` scaffolding tool
* Design time tools for EF Core
* The SQLite and SQL Server providers with the EF Core package as a dependency
* `Microsoft.VisualStudio.Web.CodeGeneration.Design` for scaffolding

In the **Terminal**, execute the following command to scaffold a full set of components with the `CRUD` template:

```dotnetcli
dotnet aspnet-codegenerator blazor CRUD -dbProvider {PROVIDER} -dc {DB CONTEXT CLASS} -m {MODEL} -outDir {PATH}
```

> **Note:**
> The preceding command is a .NET CLI command, and .NET CLI commands are executed when entered at a PowerShell prompt, which is the default command shell of the VS Code **Terminal**.

The following table explains the ASP.NET Core code generator options in the preceding command.

Option        | Placeholder          | Description
------------- | -------------------- | ---
`-dbProvider` | `{PROVIDER}`         | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, `postgres`.
`-dc`         | `{DB CONTEXT CLASS}` | The `Microsoft.EntityFrameworkCore.DbContext` class to use, including the namespace.
`-m`          | `{MODEL}`            | The name of the model class.
`-outDir`     | `{PATH}`             | The output directory for the generated components. A folder is created from the model name in the output directory to hold the components (if the model class is named `Movie`, the folder is automatically named `MoviePages`). The path is typically either `Components/Pages` for a Blazor Web App or `Pages` for a standalone Blazor WebAssembly app.

For the additional Blazor provider options, use the .NET CLI help option (`-h`|`--help`):

```dotnetcli
dotnet aspnet-codegenerator blazor -h
```

# .NET CLI

Paste all of the following commands at the prompt (`>`) of a command shell opened to the project's root directory. When you paste multiple commands, a warning appears stating that multiple commands will execute. Dismiss the warning and proceed with the paste operation.

When you paste multiple commands, all of the commands execute except the last one. The last command doesn't execute until you press `Enter` on the keyboard.

```dotnetcli
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-ef
dotnet add package Microsoft.EntityFrameworkCore.SQLite
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Components.QuickGrid
dotnet add package Microsoft.AspNetCore.Components.QuickGrid.EntityFrameworkAdapter
```

> **Important:**
> After the first eight commands execute, make sure that you press `Enter` on the keyboard to execute the last command.

The preceding commands add:

* Command-line interface (CLI) tools for EF Core
* `aspnet-codegenerator` scaffolding tool
* Design time tools for EF Core
* The SQLite and SQL Server providers with the EF Core package as a dependency
* `Microsoft.VisualStudio.Web.CodeGeneration.Design` for scaffolding.

In a command shell, execute the following command to scaffold a full set of components with the `CRUD` template:

```dotnetcli
dotnet aspnet-codegenerator blazor CRUD -dbProvider {PROVIDER} -dc {DB CONTEXT CLASS} -m {MODEL} -outDir {PATH}
```

The following table explains the ASP.NET Core code generator options in the preceding command.

Option        | Placeholder          | Description
------------- | -------------------- | ---
`-dbProvider` | `{PROVIDER}`         | Database provider to use. Options include `sqlserver` (default), `sqlite`, `cosmos`, `postgres`.
`-dc`         | `{DB CONTEXT CLASS}` | The `Microsoft.EntityFrameworkCore.DbContext` class to use, including the namespace.
`-m`          | `{MODEL}`            | The name of the model class.
`-outDir`     | `{PATH}`             | The output directory for the generated components. A folder is created from the model name in the output directory to hold the components (if the model class is named `Movie`, the folder is automatically named `MoviePages`). The path is typically either `Components/Pages` for a Blazor Web App or `Pages` for a standalone Blazor WebAssembly app.

For the additional Blazor provider options, use the .NET CLI help option (`-h`|`--help`):

```dotnetcli
dotnet aspnet-codegenerator blazor -h
```

---

For an example use of the QuickGrid scaffolder, see Build a Blazor movie database app (Overview).

## Multiple concurrent EF Core queries trigger `System.InvalidOperationException`

Multiple concurrent EF Core queries can trigger the following `System.InvalidOperationException`:

> :::no-loc text="System.InvalidOperationException: A second operation was started on this context instance before a previous operation completed. This is usually caused by different threads concurrently using the same instance of DbContext. For more information on how to avoid threading issues with DbContext, see https://go.microsoft.com/fwlink/?linkid=2097913.":::

This scenario is scheduled for improvement in an upcoming release of ASP.NET Core. For more information, see [Blazor] Improve the experience with QuickGrid and EF Core (`dotnet/aspnetcore` #58716).

In the meantime, you can address the problem using an `Microsoft.AspNetCore.Components.QuickGrid.QuickGrid`1.ItemsProvider` with a cancellation token. The cancellation token <example-value> concurrent queries by cancelling the previous request when a new request is issued.

Consider the following example, which is based on the movie database `Index` component for the Build a Blazor movie database app (Overview) tutorial. The simpler version scaffolded into the app can be seen in the article's sample app. The `Index` component scaffolded into the app is replaced by the following component.

`Components/Pages/MoviePages/Index.razor`:

```razor
@page "/movies"
@rendermode InteractiveServer
@using Microsoft.EntityFrameworkCore
@using Microsoft.AspNetCore.Components.QuickGrid
@using BlazorWebAppMovies.Models
@using BlazorWebAppMovies.Data
@inject IDbContextFactory<BlazorWebAppMovies.Data.BlazorWebAppMoviesContext> DbFactory

<PageTitle>Index</PageTitle>

<h1>Index</h1>

<div>
    <input type="search" @bind="titleFilter" @bind:event="oninput" />
</div>

<p>
    <a href="movies/create">Create New</a>
</p>

<div>
    <QuickGrid Class="table" TGridItem="Movie" ItemsProvider="GetMovies"
            ItemKey="(x => x.Id)" Pagination="pagination">
        <PropertyColumn Property="movie => movie.Title" Sortable="true" />
        <PropertyColumn Property="movie => movie.ReleaseDate" Title="Release Date" />
        <PropertyColumn Property="movie => movie.Genre" />
        <PropertyColumn Property="movie => movie.Price" />
        <PropertyColumn Property="movie => movie.Rating" />

        <TemplateColumn Context="movie">
            <a href="@($"movies/edit?id={movie.Id}")">Edit</a> |
            <a href="@($"movies/details?id={movie.Id}")">Details</a> |
            <a href="@($"movies/delete?id={movie.Id}")">Delete</a>
        </TemplateColumn>
    </QuickGrid>
</div>

<Paginator State="pagination" />

@code {
    private BlazorWebAppMoviesContext context = default!;
    private PaginationState pagination = new PaginationState { ItemsPerPage = 5 };
    private string titleFilter = string.Empty;

    public async ValueTask<GridItemsProviderResult<Movie>> GetMovies(GridItemsProviderRequest<Movie> request)
    {
        using var context = DbFactory.CreateDbContext();
        var totalCount = await context.Movie.CountAsync(request.CancellationToken);
        IQueryable<Movie> query = context.Movie.OrderBy(x => x.Id);
        query = request.ApplySorting(query).Skip(request.StartIndex);

        if (request.Count.HasValue)
        {
            query = query.Take(request.Count.Value);
        }

        var items = await query.ToArrayAsync(request.CancellationToken);

        var result = new GridItemsProviderResult<Movie>
        {
            Items = items,
            TotalItemCount = totalCount
        };

        return result;
    }
}
```
