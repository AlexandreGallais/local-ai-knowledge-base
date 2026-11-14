---
title: "Build a Blazor movie database app (Part 3 - Learn about Razor components) (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/tutorials/movie-database-app/part-3.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Build a Blazor movie database app (Part 3 - Learn about Razor components) (part 3 of 3)

### `Edit` component

Open the `Edit` component definition file (`Components/Pages/Movies/Edit.razor`).

Add a space to the content of the label element (``) for the movie's release date to separate the words:

```diff
- <label for="releasedate" class="form-label">ReleaseDate:</label>
+ <label for="releasedate" class="form-label">Release Date:</label>
```

The component uses an `Microsoft.AspNetCore.Components.Forms.EditForm` similar to the `Create` component.

The movie entity's identifier `Id` is stored in a hidden field of the form:

```razor
<input type="hidden" name="Movie.Id" value="@Movie.Id" />
```

Examine the C# code of the `@code` block:

```csharp
private async Task UpdateMovie()
{
    using var context = DbFactory.CreateDbContext();
    context.Attach(Movie!).State = EntityState.Modified;

    try
    {
        await context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!MovieExists(Movie!.Id))
        {
            NavigationManager.NotFound();
        }
        else
        {
            throw;
        }
    }

    NavigationManager.NavigateTo("/movies");
}

private bool MovieExists(int id)
{
    using var context = DbFactory.CreateDbContext();
    return context.Movie.Any(e => e.Id == id);
}
```

The movie entity's `Microsoft.EntityFrameworkCore.EntityState` is set to `Microsoft.EntityFrameworkCore.EntityState.Modified`, which signifies that the entity is tracked by the context, exists in the database, and that some or all of its property values are modified.

When a movie isn't found, calling `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` renders the `NotFound` component, which produces a Not Found page in the browser with a 404 (Not Found) status code.

If there's a concurrency exception and the movie entity no longer exists at the time that changes are saved, the component redirects to the Not Found page, which results in returning a 404 (Not Found) status code. If the movie exists and a concurrency exception is thrown, for example when another user has already modified the entity, the exception is rethrown by the component with the `throw` statement (C# Language Reference). Additional guidance on handling concurrency with EF Core in Blazor apps is provided by the Blazor documentation.

> **Note:**
> Later, you're instructed to make a minor modification to the preceding code in the `Edit` component's `UpdateMovie` method, where a `return` statement is added after the call to `Microsoft.AspNetCore.Components.NavigationManager.NotFound*`. Guidance on this change and information on why the change is required is provided in the *Concurrency exception handling* section of Build a Blazor movie database app (Part 4 - Work with a database), which is the next article in this tutorial.

> **Warning:**
> Although it isn't a concern for the app in this tutorial, binding form data to entity data models can be susceptible to overposting attacks. Additional information on this subject appears in the next section.

## Mitigate overposting attacks

Statically-rendered server-side forms, such as those in the `Create` and `Edit` components, can be vulnerable to an *overposting* attack, also known as a *mass assignment* attack. An overposting attack occurs when a malicious user issues an HTML form POST to the server that processes data for properties that aren't part of the rendered form and that the developer doesn't wish to allow users to modify. The term "overposting" literally means that the malicious user has *over*-POSTed with the form.

In the example `Create` and `Edit` components of this tutorial, the `Movie` model doesn't include restricted properties for create and update operations, so overposting isn't a concern. However, it's important to keep overposting in mind when working with static SSR-based Blazor forms that you create and modify in the future.

To mitigate overposting, we recommend using a separate view model/data transfer object (DTO) for the form and database with create (insert) and update operations. When the form is submitted, only properties of the view model/DTO are used by the component and C# code to modify the database. Any extra data included by a malicious user is discarded, so the malicious user is prevented from conducting an overposting attack.

## Troubleshoot with the completed sample

If you run into a problem while following the tutorial that you can't resolve from the text, compare your code to the completed project in the Blazor samples repository:

Blazor samples GitHub repository (`dotnet/blazor-samples`)

Select the latest version folder. The sample folder for this tutorial's project is named `BlazorWebAppMovies`.

## Related content

* `NavLink` component
* ASP.NET Core Blazor layouts
* Razor directives (Razor syntax article) / Razor directives (Blazor documentation)
* ASP.NET Core Blazor \`QuickGrid\` component
* ASP.NET Core Blazor forms overview
* Concurrency with EF Core in Blazor apps
* ASP.NET Core Blazor globalization and localization: Explains how to render globalized and localized content to users in different cultures and languages, including how to accept comma number separators.

## Next steps

> Previous: Add and scaffold a model
> Next: Work with a database
