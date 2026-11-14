---
title: "ASP.NET Core Blazor navigation (part 2 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/fundamentals/navigation.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor navigation (part 2 of 5)

## Not Found responses

`Microsoft.AspNetCore.Components.NavigationManager.NotFound*` handles scenarios where a requested resource isn't found:

* **Static server-side rendering (static SSR)**: Calling `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` sets the HTTP status code to 404. If Not Found content is configured through `Router.NotFoundPage` or `NotFoundEventArgs.Path`, the router renders Not Found content.

* **Global interactive rendering**: Signals the Blazor router (`Router` component) to render Not Found content.

* **Per-page/component interactive rendering**: Behaves the same as static server-side rendering (static SSR) during prerendering on the server, while interactive Not Found behavior no-ops.

* **Streaming rendering**: If enhanced navigation is active, streaming rendering renders Not Found content without reloading the page. When enhanced navigation is blocked, the framework redirects to Not Found content with a page refresh.

> **Note:**
> The following discussion mentions that a Not Found Razor component can be assigned to the `Router` component's `Microsoft.AspNetCore.Components.Routing.Router.NotFoundPage` parameter. The parameter works in concert with `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` and is described in more detail later in this section.

Streaming rendering can only render components that have a route, such as a `Microsoft.AspNetCore.Components.Routing.Router.NotFoundPage` assignment (`NotFoundPage="..."`) or a status code pages re-execution middleware page assignment (`Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute*`). `DefaultNotFound` 404 content ("`Not found`" plain text) doesn't have a route, so it can't be used during streaming rendering.

> **Note:**
> The Not Found render fragment (`<NotFound>...</NotFound>`) isn't supported in .NET 10 or later.

`Microsoft.AspNetCore.Components.NavigationManager.NotFound*` content rendering uses the following, regardless if the response has started or not (in order):

* If `Microsoft.AspNetCore.Components.Routing.NotFoundEventArgs.Path` is set, render the contents of the assigned page.
* If `Microsoft.AspNetCore.Components.Routing.Router.NotFoundPage` is set, render the assigned page.
* A status code pages re-execution middleware page, if configured.
* No action if none of the preceding approaches are adopted.

Status code pages re-execution middleware with `Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute*` takes precedence for browser-based address routing problems, such as an incorrect URL typed into the browser's address bar or selecting a link that has no endpoint in the app.

When a component is rendered statically (static SSR) and `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` is called, the 404 status code is set on the response:

```razor
@page "/render-not-found-ssr"
@inject NavigationManager Navigation

@code {
    protected override void OnInitialized()
    {
        Navigation.NotFound();
    }
}
```

To provide Not Found content for global interactive rendering or for per-page/component interactive rendering *during prerendering*, use a Not Found page (Razor component).

> **Note:**
> The Blazor project template includes a `NotFound.razor` page and configures it as the router's `NotFoundPage`. This page renders when `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` is called in a supported context, making it possible to handle missing routes with a consistent user experience.

`Pages/NotFound.razor`:

```razor
@page "/not-found"
@layout MainLayout

<h3>Not Found</h3>
<p>Sorry, the content you are looking for does not exist.</p>
```

The `NotFound` component is assigned to `Microsoft.AspNetCore.Components.Routing.Router.NotFoundPage`, which supports routing that can be used across status code pages re-execution middleware, including non-Blazor middleware.

In the following example, the preceding `NotFound` component is present in the app's `Pages` folder and passed to the `Microsoft.AspNetCore.Components.Routing.Router.NotFoundPage` parameter:

```razor
<Router AppAssembly="@typeof(Program).Assembly" NotFoundPage="typeof(Pages.NotFound)">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" />
        <FocusOnNavigate RouteData="@routeData" Selector="h1" />
    </Found>
</Router>
```

When a component is rendered with a global interactive render mode, calling `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` signals the Blazor router to render the `NotFound` component:

```razor
@page "/render-not-found-interactive"
@inject NavigationManager Navigation

@if (RendererInfo.IsInteractive)
{
    <button @onclick="TriggerNotFound">Trigger Not Found</button>
}

@code {
    private void TriggerNotFound()
    {
        Navigation.NotFound();
    }
}
```

When a component is rendered with a per-page/component interactive render mode, calling `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` signals the Blazor router to render the `NotFound` component ***only during prerendering*** (`Microsoft.AspNetCore.Components.RendererInfo.IsInteractive`):

```csharp
protected override void OnInitialized()
{
    // Where your initialization code must lead to a Not Found response:
    if (!RendererInfo.IsInteractive)
    {
        Navigation.NotFound();
    }
}
```

The preceding example would assign a per-page/component render mode at the top of the Razor component file (for example, `@rendermode InteractiveServer`).

The Not Found response and 404 status code aren't applied outside of prerendering, so if prerendering is disabled or the `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` call is made after prerendering, the component should indicate to the user in the component's UI that a resource isn't found.

`Microsoft.AspNetCore.Components.NavigationManager.NotFound*` doesn't terminate the method. If `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` should end the control flow, add a `return` statement after calling `Microsoft.AspNetCore.Components.NavigationManager.NotFound*`. In the following movie database update method, a concurrency exception results in checking for the presence of a movie in the database to determine if a Not Found response is appropriate. The `return` statement after calling `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` ensures that the handler selects only the Not Found outcome, independently of a given database provider synchronously or asynchronously executing `Microsoft.EntityFrameworkCore.DbContext.SaveChangesAsync*`:

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
            Navigation.NotFound();

            return;
        }
        else
        {
            throw;
        }
    }

    Navigation.NavigateTo("/movies");
}
```

Services not shown in the preceding example:

* `NavigationManager` is an injected `Microsoft.AspNetCore.Components.NavigationManager` (`@inject NavigationManager Navigation`).
* `DbFactory` is an injected `Microsoft.EntityFrameworkCore.IDbContextFactory`1` (`@inject IDbContextFactory<{CONTEXT}> DbFactory`, where the `{CONTEXT}` placeholder is a `Microsoft.EntityFrameworkCore.DbContext`).

Use the `Microsoft.AspNetCore.Components.NavigationManager.OnNotFound*` event for notifications when `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` is invoked. The event is only fired when `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` is called, not for any 404 response. For example, setting `HttpContextAccessor.HttpContext.Response.StatusCode` to `404` doesn't trigger `Microsoft.AspNetCore.Components.NavigationManager.NotFound*`/`Microsoft.AspNetCore.Components.NavigationManager.OnNotFound*`.

Apps that implement a custom router can use `Microsoft.AspNetCore.Components.NavigationManager.NotFound*`. There are two ways to inform the renderer what page should be rendered when `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` is called.

The recommended approach that works regardless of the response state is to call `Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute*`. When `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` is called, the middleware renders the path passed to the method:

```csharp
app.UseStatusCodePagesWithReExecute(
    "/not-found", createScopeForStatusCodePages: true);
```

If you don't want to use `Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute*`, the app can still support `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` for responses that have already started. Subscribe to `OnNotFoundEvent` in the router and assign the Not Found page path to `NotFoundEventArgs.Path` to inform the renderer what content to render when `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` is called.

`CustomRouter.razor`:

```razor
@using Microsoft.AspNetCore.Components
@using Microsoft.AspNetCore.Components.Routing
@using Microsoft.AspNetCore.Http
@implements IDisposable
@inject NavigationManager NavigationManager

@code {
    protected override void OnInitialized() =>
        NavigationManager.OnNotFound += OnNotFoundEvent;

    [CascadingParameter]
    public HttpContext? HttpContext { get; set; }

    private void OnNotFoundEvent(object sender, NotFoundEventArgs e)
    {
        // Only execute the logic if HTTP response has started
        // because setting NotFoundEventArgs.Path blocks re-execution
        if (HttpContext?.Response.HasStarted == false)
        {
            return;
        }

        e.Path = GetNotFoundRoutePath();
    }

    // Return the path of the Not Found page that you want to display
    private string GetNotFoundRoutePath()
    {
        ...
    }

    public void Dispose() => NavigationManager.OnNotFound -= OnNotFoundEvent;
}
```

If you use both approaches in your app, the Not Found path specified in the `OnNotFoundEvent` handler takes precedence over the path configured in the re-execution middleware.

In the following example for components that adopt interactive server-side rendering (interactive SSR), custom content is rendered depending on where `Microsoft.AspNetCore.Components.NavigationManager.OnNotFound*` is called. If the event is triggered by the following `Movie` component when a movie isn't found on component initialization, a custom message states that the requested movie isn't found. If the event is triggered by the `User` component in the following example, a different message states that the user isn't found.

The following `NotFoundContext` service manages the context and the message for when content isn't found by components.

`NotFoundContext.cs`:

```csharp
public class NotFoundContext
{
    public string? Heading { get; private set; }
    public string? Message { get; private set; }

    public void UpdateContext(string heading, string message)
    {
        Heading = heading;
        Message = message;
    }
}
```

The service is registered in the server-side `Program` file:

```csharp
builder.Services.AddScoped<NotFoundContext>();
```

The `NotFound` page injects the `NotFoundContext` and displays the heading and message.

`Pages/NotFound.razor`:

```razor
@page "/not-found"
@layout MainLayout
@inject NotFoundContext NotFoundContext

<h3>@NotFoundContext.Heading</h3>
<div>
    <p>@NotFoundContext.Message</p>
</div>
```

The `Routes` component (`Routes.razor`) sets the `NotFound` component as the Not Found page via the `Microsoft.AspNetCore.Components.Routing.Router.NotFoundPage` parameter:

```razor
<Router AppAssembly="typeof(Program).Assembly" NotFoundPage="typeof(Pages.NotFound)">
    ...
</Router>
```

In the following example components:

* The `NotFoundContext` service is injected, along with the `Microsoft.AspNetCore.Components.NavigationManager`.
* In `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*`, `HandleNotFound` is an event handler assigned to the `Microsoft.AspNetCore.Components.NavigationManager.OnNotFound*` event. `HandleNotFound` calls `NotFoundContext.UpdateContext` to set a heading and message for Not Found content in the `NotFound` component.
* The components would normally use an ID from a route parameter to obtain a movie or user from a data store, such as a database. In the following examples, no entity is returned (`null`) to simulate what happens when an entity isn't found.
* When no entity is returned to `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*`, `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` is called, which in turn triggers the `Microsoft.AspNetCore.Components.NavigationManager.OnNotFound*` event and the `HandleNotFound` event handler. Not Found content is displayed by the router.
* The `HandleNotFound` method is unhooked on component disposal in `System.IDisposable.Dispose*`.

`Movie` component (`Movie.razor`):

```razor
@page "/movie/{Id:int}"
@implements IDisposable
@inject NavigationManager NavigationManager
@inject NotFoundContext NotFoundContext

<div>
    No matter what ID is used, no matching movie is returned
    from the call to GetMovie().
</div>

@code {
    [Parameter]
    public int Id { get; set; }

    protected override async Task OnInitializedAsync()
    {
        NavigationManager.OnNotFound += HandleNotFound;

        var movie = await GetMovie(Id);

        if (movie == null)
        {
            NavigationManager.NotFound();
        }
    }

    private void HandleNotFound(object? sender, NotFoundEventArgs e)
    {
        NotFoundContext.UpdateContext("Movie Not Found",
            "Sorry! The requested movie wasn't found.");
    }

    private async Task<MovieItem[]?> GetMovie(int id)
    {
        // Simulate no movie with matching id found
        return await Task.FromResult<MovieItem[]?>(null);
    }

    void IDisposable.Dispose()
    {
        NavigationManager.OnNotFound -= HandleNotFound;
    }

    public class MovieItem
    {
        public int Id { get; set; }
        public string? Title { get; set; }
    }
}
```

`User` component (`User.razor`):
