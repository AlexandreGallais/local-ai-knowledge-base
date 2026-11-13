---
title: "Build a Blazor movie database app (Part 3 - Learn about Razor components) (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/tutorials/movie-database-app/part-3.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Build a Blazor movie database app (Part 3 - Learn about Razor components) (part 2 of 3)

## Create, Read, Update, Delete (CRUD) components

The following sections explain the composition of the movie CRUD components and how they work.

### `Index` component

Open the `Index` component definition file (`Components/Pages/Movies/Index.razor`) and examine the Razor directives at the top of the file.

The `@page` directive's route template indicates the URL for the page is `/movies`.

`@using` directives appear to access the following API:

* `Microsoft.EntityFrameworkCore`
* `Microsoft.AspNetCore.Components.QuickGrid`
* `BlazorWebAppMovies.Models`
* `BlazorWebAppMovies.Data`

The database context factory (`IDbContextFactory<T>`, where the type (`T`) is a `BlazorWebAppMoviesContext`) is injected into the component with the `@inject` directive. The factory approach requires that a database context be disposed, so the component implements the `System.IAsyncDisposable` interface with the `@implements` directive.

The page title is set via the Blazor framework's `Microsoft.AspNetCore.Components.Web.PageTitle` component, and an H1 section heading is the first rendered element:

```razor
<PageTitle>Index</PageTitle>

<h1>Index</h1>
```

A link is rendered to navigate to the `Create` page at `/movies/create`:

```razor
<p>
    <a href="movies/create">Create New</a>
</p>
```

The `QuickGrid` component displays movie entities. The item provider is a `DbSet<Movie>` obtained from the created database context (`Microsoft.EntityFrameworkCore.IDbContextFactory`1.CreateDbContext*`) of the injected database context factory (`DbFactory`). For each movie entity, the component displays the movie's title, release date, genre, and price. A column also holds links to edit, see details, and delete each movie entity.

```razor
<QuickGrid Class="table" Items="context.Movie">
    <PropertyColumn Property="movie => movie.Title" />
    <PropertyColumn Property="movie => movie.ReleaseDate" />
    <PropertyColumn Property="movie => movie.Genre" />
    <PropertyColumn Property="movie => movie.Price" />

    <TemplateColumn Context="movie">
        <a href="@($"movies/edit?id={movie.Id}")">Edit</a> |
        <a href="@($"movies/details?id={movie.Id}")">Details</a> |
        <a href="@($"movies/delete?id={movie.Id}")">Delete</a>
    </TemplateColumn>
</QuickGrid>

@code {
    private BlazorWebAppMoviesContext context = default!;

    protected override void OnInitialized()
    {
        context = DbFactory.CreateDbContext();
    }

    public async ValueTask DisposeAsync() => await context.DisposeAsync();
}
```

In the code block (`@code`):

* The `context` field holds the database context, typed as a `BlazorWebAppMoviesContext`.
* The `OnInitialized` lifecycle method assigns a created database context (`Microsoft.EntityFrameworkCore.IDbContextFactory`1.CreateDbContext*`) from the injected factory (`DbFactory`) to the `context` variable.
* The asynchronous `DisposeAsync` method disposes of the database context when the component is disposed.

Notice how the context (`Context`) parameter of the `Microsoft.AspNetCore.Components.QuickGrid.TemplateColumn`1` specifies a parameter name (`movie`) for the context instance of the column. Specifying a name for the context instance makes the markup more readable (the default name for the context is simply `context`). `Movie` class properties are read from the context instance. For example, the movie identifier (`Id`) is available in `movie.Id`.

The at symbol (`@`) with parentheses (`@(...)`), which is called an *explicit Razor expression*, allows the `href` of each link to include the movie entity's `Id` property in the link query string as an *interpolated string* (`$...{...}...`). For a movie identifier (`Id`) of 7, the string value provided to the `href` to edit that movie is `movies/edit?id=7`. When the link is followed, the `id` field is read from the query string by the `Edit` component to load the movie.

For the movie example from the last part of the tutorial series, *The Matrix*&copy;, the `QuickGrid` component renders the following HTML markup (some elements and attributes aren't present to simplify display). See how the explicit Razor expressions and interpolated strings produced the `href` values for the links to other pages. The movie's identifier in the database happens to be `3` for this example, so the `id` is `3` in the query strings for the `Edit`, `Details`, and `Delete` pages. You may see a different value when you run the app.

```html
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>ReleaseDate</th>
            <th>Genre</th>
            <th>Price</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>The Matrix</td>
            <td>3/29/1999</td>
            <td>Sci-fi (Cyberpunk)</td>
            <td>5.00</td>
            <td>
                <a href="movies/edit?id=3">Edit</a> |
                <a href="movies/details?id=3">Details</a> |
                <a href="movies/delete?id=3">Delete</a>
            </td>
        </tr>
    </tbody>
</table>
```

The column names are taken from the `Movie` model properties, so the release date doesn't have a space between the words. Add a `Microsoft.AspNetCore.Components.QuickGrid.ColumnBase`1.Title` to the `Microsoft.AspNetCore.Components.QuickGrid.PropertyColumn`2` with a value that includes a space between the words:

```diff
- <PropertyColumn Property="movie => movie.ReleaseDate" />
+ <PropertyColumn Property="movie => movie.ReleaseDate" Title="Release Date" />
```

Run the app to see that the column displays two words for the release date.

**vs:**

Stop the app by closing the browser's window.

**vsc:**

Stop the app by closing the browser's window and pressing `Shift`+`F5` on the keyboard in VS Code.

**cli:**

Stop the app by closing the browser's window and pressing `Ctrl`+`C` in the command shell.

### `Details` component

Open the `Details` component definition file (`Components/Pages/Movies/Details.razor`).

The `@page` directive at the top of the file indicates the relative URL for the page is `/movies/details`. As before, the database context is injected, and namespaces are provided to access API (`BlazorWebAppMovies.Models` and `Microsoft.EntityFrameworkCore`). The `Details` component also injects the app's `Microsoft.AspNetCore.Components.NavigationManager`, which is used for a variety of navigation-related operations in components.

```razor
@page "/movies/details"
@using Microsoft.EntityFrameworkCore
@using BlazorWebAppMovies.Models
@inject IDbContextFactory<BlazorWebAppMovies.Data.BlazorWebAppMoviesContext> DbFactory
@inject NavigationManager NavigationManager
```

Details for a movie entity are only shown if the movie, located by its identifier (`Id`) from the query string, has been loaded for display. The presence of the movie in `movie` is checked with an `@if` Razor statement:

```razor
@if (movie is null)
{
    <p><em>Loading...</em></p>
}
```

When the movie is loaded, it's displayed as a description list (MDN documentation) along with two links:

* The first link provides the user an opportunity to edit the entity.
* The second link allows the user to return to the movies `Index` page.

CSS classes aren't shown in the following example to simplify the Razor markup for display:

```razor
<dl>
    <dt>Title</dt>
    <dd>@movie.Title</dd>
    <dt>ReleaseDate</dt>
    <dd>@movie.ReleaseDate</dd>
    <dt>Genre</dt>
    <dd>@movie.Genre</dd>
    <dt>Price</dt>
    <dd>@movie.Price</dd>
</dl>
<div>
    <a href="@($"/movies/edit?id={movie.Id}")">Edit</a> |
    <a href="@($"/movies")">Back to List</a>
</div>
</div>
```

Add a space to the content of the description term element (``) for the movie's release date to separate the words:

```diff
- <dt class="col-sm-2">ReleaseDate</dt>
+ <dt class="col-sm-2">Release Date</dt>
```

Examine the C# of the component's `@code` block:

```csharp
private Movie? movie;

[SupplyParameterFromQuery]
private int Id { get; set; }

protected override async Task OnInitializedAsync()
{
    using var context = DbFactory.CreateDbContext();
    movie = await context.Movie.FirstOrDefaultAsync(m => m.Id == Id);

    if (movie is null)
    {
        NavigationManager.NotFound();
    }
}
```

The `movie` variable is a private field of type `Movie`, which is a null-reference type (`?`), meaning that `movie` might be set to `null`.

The `Id` is a *component parameter* supplied from the component's query string due to the presence of the `[SupplyParameterFromQuery]` attribute. If the identifier is missing, `Id` defaults to zero (`0`).

`OnInitializedAsync` is the first component lifecycle method that we've seen. This method is executed when the component loads. `Microsoft.EntityFrameworkCore.EntityFrameworkQueryableExtensions.FirstOrDefaultAsync*` is called on the database set (`DbSet<Movie>`) to retrieve the movie entity with an `Id` equal to the `Id` parameter that was set by the query string. If `movie` is `null`, `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` is used to navigate to a `notfound` endpoint.

When a movie isn't found, calling `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` renders the `NotFound` component, which produces a Not Found page in the browser with a 404 (Not Found) status code.

### `Create` component

Open the `Create` component definition file (`Components/Pages/Movies/Create.razor`).

The component uses a built-in component called an `Microsoft.AspNetCore.Components.Forms.EditForm`, which renders a form for user input and includes validation features.

CSS classes aren't present in the following example to simplify the display:

```razor
<EditForm method="post" Model="Movie" OnValidSubmit="AddMovie" FormName="create" Enhance>
    <DataAnnotationsValidator />
    <ValidationSummary role="alert" />
    <div>
        <label for="title">Title:</label> 
        <InputText id="title" @bind-Value="Movie.Title" /> 
        <ValidationMessage For="() => Movie.Title" /> 
    </div>
    <div>
        <label for="releasedate">ReleaseDate:</label> 
        <InputDate id="releasedate" @bind-Value="Movie.ReleaseDate" /> 
        <ValidationMessage For="() => Movie.ReleaseDate" /> 
    </div>
    <div>
        <label for="genre">Genre:</label> 
        <InputText id="genre" @bind-Value="Movie.Genre" /> 
        <ValidationMessage For="() => Movie.Genre" /> 
    </div>
    <div>
        <label for="price">Price:</label> 
        <InputNumber id="price" @bind-Value="Movie.Price" /> 
        <ValidationMessage For="() => Movie.Price" /> 
    </div>
    <button type="submit">Create</button>
</EditForm>
```

Add a space to the content of the label element (``) for the movie's release date to separate the words:

```diff
- <label for="releasedate" class="form-label">ReleaseDate:</label>
+ <label for="releasedate" class="form-label">Release Date:</label>
```

The `Microsoft.AspNetCore.Components.Forms.EditForm.Model` parameter is assigned the model, in this case `Movie`. `Microsoft.AspNetCore.Components.Forms.EditForm.OnValidSubmit` specifies a method to invoke (`AddMovie`) when the form is submitted and the data is valid. By convention, every form should assign a `Microsoft.AspNetCore.Components.Forms.EditForm.FormName` to prevent form collisions when multiple forms are present on a page. The `Microsoft.AspNetCore.Components.Forms.EditForm.Enhance` flag activates a Blazor feature for server-side rendering (SSR) that submits the form without performing a full-page reload.

For validation:

* The `Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator` adds data annotations validation support, which is covered later in this tutorial series.
* The `Microsoft.AspNetCore.Components.Forms.ValidationSummary` component displays a list of validation messages.
* The `Microsoft.AspNetCore.Components.Forms.ValidationMessage`1` components hold validation messages for the form's fields.

Blazor includes several form element components to assist you with creating forms, including `Microsoft.AspNetCore.Components.Forms.EditForm` and various input components, such as `Microsoft.AspNetCore.Components.Forms.InputText`, `Microsoft.AspNetCore.Components.Forms.InputDate`1`, and `Microsoft.AspNetCore.Components.Forms.InputNumber`1`. Each input component is bound to a model property with `@bind-Value` Razor syntax, where `Value` is a property in each input component.

In the component's `@code` block, C# code includes a `Movie` component parameter tied to the form via the `[SupplyParameterFromForm]` attribute.

The `AddMovie` method:

* Is called when the form is submitted.
* Adds the movie data bound to the form's model (`Movie`) if form validation passes.
* `Microsoft.EntityFrameworkCore.DbContext.SaveChangesAsync*` is called on the database context to save the movie.
* `Microsoft.AspNetCore.Components.NavigationManager` is used to return the user to the movies `Index` page.

```csharp
[SupplyParameterFromForm]
private Movie Movie { get; set; } = default!;

protected override void OnInitialized() => Movie ??= new();

private async Task AddMovie()
{
    using var context = DbFactory.CreateDbContext();
    context.Movie.Add(Movie);
    await context.SaveChangesAsync();
    NavigationManager.NavigateTo("/movies");
}
```

> **Warning:**
> Although it isn't a concern for the app in this tutorial, binding form data to entity data models can be susceptible to overposting attacks. Additional information on this subject appears later in this article.

### `Delete` component

Open the `Delete` component definition file (`Components/Pages/Movies/Delete.razor`).

Add a space to the content of the description term element (``) for the movie's release date to separate the words:

```diff
- <dt class="col-sm-2">ReleaseDate</dt>
+ <dt class="col-sm-2">Release Date</dt>
```

Examine the Razor markup for the submit button of the `Microsoft.AspNetCore.Components.Forms.EditForm` (CSS class removed for simplicity):

```razor
<button type="submit" disabled="@(movie is null)">Delete</button>
```

The **:::no-loc text="Delete":::** button sets its `disabled` HTML attribute based on the presence of the movie (not `null`) using an explicit Razor expression (`@(...)`).

In the C# code of the `@code` block, the `DeleteMovie` method removes the movie, saves the changes to the database, and navigates the user to the movies `Index` page. The exclamation point on the movie field (`movie!`) is the null-forgiving operator (C# Language Reference), which suppresses nullable warnings for `movie`.

```csharp
private async Task DeleteMovie()
{
    using var context = DbFactory.CreateDbContext();
    context.Movie.Remove(movie!);
    await context.SaveChangesAsync();
    NavigationManager.NavigateTo("/movies");
}
```

When a movie isn't found, calling `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` renders the `NotFound` component, which produces a Not Found page in the browser with a 404 (Not Found) status code.
