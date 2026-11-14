---
title: "ASP.NET Core Blazor navigation (part 1 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/fundamentals/navigation.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor navigation

This article explains how to trigger and handle page navigation in Blazor. While users can navigate between different pages using normal HTML links, Blazor enhances navigation within the application to avoid full page reloads and deliver a smoother experience. Use the `Microsoft.AspNetCore.Components.Routing.NavLink` component to create navigation links that automatically apply styling when the link matches the current page. For programmatic navigation and URI management in C# code, use the `Microsoft.AspNetCore.Components.NavigationManager` service.

> **Important:**
> Code examples throughout this article show methods called on `Navigation`, which is an injected `Microsoft.AspNetCore.Components.NavigationManager` in classes and components.

## `NavLink` component

Use a `Microsoft.AspNetCore.Components.Routing.NavLink` component in place of HTML hyperlink elements (``) when creating navigation links. A `Microsoft.AspNetCore.Components.Routing.NavLink` component behaves like an `` element, except it toggles an `active` CSS class based on whether its `href` matches the current URL. The `active` class helps a user understand which page is the active page among the navigation links displayed. Optionally, assign a CSS class name to `Microsoft.AspNetCore.Components.Routing.NavLink.ActiveClass` to apply a custom CSS class to the rendered link when the current route matches the `href`.

In the `NavMenu` component (`NavMenu.razor`) of a Blazor app created from a Blazor project template:

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="" Match="NavLinkMatch.All">
        <span class="bi bi-house-door-fill-nav-menu" aria-hidden="true"></span> Home
    </NavLink>
</div>
<div class="nav-item px-3">
    <NavLink class="nav-link" href="counter">
        <span class="bi bi-plus-square-fill-nav-menu" aria-hidden="true"></span> Counter
    </NavLink>
</div>
```

In the preceding example, the Home `Microsoft.AspNetCore.Components.Routing.NavLink` `href=""` matches the home URL and only receives the `active` CSS class at the app's default base path (`/`). The second `Microsoft.AspNetCore.Components.Routing.NavLink` receives the `active` class when the user visits the `Counter` component at `/counter`.

There are two `Microsoft.AspNetCore.Components.Routing.NavLinkMatch` options that you can assign to the `Microsoft.AspNetCore.Components.Routing.NavLink.Match` attribute of the `<NavLink>` element:

* `Microsoft.AspNetCore.Components.Routing.NavLinkMatch.All`: The `Microsoft.AspNetCore.Components.Routing.NavLink` is active when it matches the current URL, ignoring the query string and fragment. To include matching on the query string/fragment, use the `Microsoft.AspNetCore.Components.Routing.NavLink.EnableMatchAllForQueryStringAndFragment` `AppContext` switch set to `true`.
* `Microsoft.AspNetCore.Components.Routing.NavLinkMatch.Prefix` (*default*): The `Microsoft.AspNetCore.Components.Routing.NavLink` is active when it matches any prefix of the current URL.

To adopt custom matching logic, subclass `Microsoft.AspNetCore.Components.Routing.NavLink` and override its `Microsoft.AspNetCore.Components.Routing.NavLink.ShouldMatch*` method. Return `true` from the method when you want to apply the `active` CSS class:

```csharp
public class CustomNavLink : NavLink
{
    protected override bool ShouldMatch(string currentUriAbsolute)
    {
        // Custom matching logic
    }
}
```

Set `NavLink.RelativeToCurrentUri` to `true` to resolve the `href` relative to the current page path instead of the app's base URI:

```razor
<NavLink href="details" RelativeToCurrentUri="true">View Details</NavLink>
```

If the current URI is `/docs/getting-started/installation`, the preceding link navigates to `/docs/getting-started/details`.

Additional `Microsoft.AspNetCore.Components.Routing.NavLink` component attributes are passed through to the rendered anchor tag. In the following example, the `Microsoft.AspNetCore.Components.Routing.NavLink` component includes the `target` attribute:

```razor
<NavLink href="example-page" target="_blank">Example page</NavLink>
```

The following HTML markup is rendered:

```html
<a href="example-page" target="_blank">Example page</a>
```

> **Warning:**
> Due to the way that Blazor renders child content, rendering `NavLink` components inside a `for` loop requires a local index variable if the incrementing loop variable is used in the `NavLink` (child) component's content:
>
> ```razor
> @for (int c = 1; c < 4; c++)
> {
>     var ct = c;
>
>         <NavLink ...>
>              Product #@ct
>         </NavLink>
>
> }
> ```
>
> Using an index variable in this scenario is a requirement for **any** child component that uses a loop variable in its child content, not just the `NavLink` component.
>
> Alternatively, use a `foreach` loop with `System.Linq.Enumerable.Range*`:
>
> ```razor
> @foreach (var c in Enumerable.Range(1, 3))
> {
>
>         <NavLink ...>
>              Product #@c
>         </NavLink>
>
> }
> ```

## URI and navigation state helpers

Use `Microsoft.AspNetCore.Components.NavigationManager` to manage URIs and navigation in C# code. `Microsoft.AspNetCore.Components.NavigationManager` provides the event and methods shown in the following table.

Member | Description
--- | ---
`Microsoft.AspNetCore.Components.NavigationManager.Uri` | Gets the current absolute URI.
`Microsoft.AspNetCore.Components.NavigationManager.BaseUri` | Gets the base URI (with a trailing slash) that can be prepended to relative URI paths to produce an absolute URI. Typically, `Microsoft.AspNetCore.Components.NavigationManager.BaseUri` corresponds to the `href` attribute on the document's `<base>` element (location of `<head>` content).
`Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` | Navigates to the specified URI. If `forceLoad` is `false`:And enhanced navigation is available at the current URL, Blazor's enhanced navigation is activated.Otherwise, Blazor performs a full-page reload for the requested URL.If `forceLoad` is `true`:Client-side routing is bypassed.The browser is forced to load the new page from the server, whether or not the URI is normally handled by the client-side interactive router.For more information, see the Enhanced navigation and form handling section.If `replace` is `true`, the current URI in the browser history is replaced instead of pushing a new URI onto the history stack.
`Microsoft.AspNetCore.Components.NavigationManager.LocationChanged` | An event that fires when the navigation location has changed. For more information, see the Location changes section.
`Microsoft.AspNetCore.Components.NavigationManager.NotFound*` | Called to handle scenarios where a requested resource isn't found. For more information, see the Not Found responses section.
`Microsoft.AspNetCore.Components.NavigationManager.ToAbsoluteUri*` | Converts a relative URI into an absolute URI.
`Microsoft.AspNetCore.Components.NavigationManager.ToBaseRelativePath*` | Based on the app's base URI, converts an absolute URI into a URI relative to the base URI prefix. For an example, see the Produce a URI relative to the base URI prefix section.
`RegisterLocationChangingHandler` | Registers a handler to process incoming navigation events. Calling `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` always invokes the handler.
`Microsoft.AspNetCore.Components.NavigationManagerExtensions.GetUriWithQueryParameter*` | Returns a URI constructed by updating `Microsoft.AspNetCore.Components.NavigationManager.Uri` with a single parameter added, updated, or removed. For more information, see the Query strings section.

## Location changes

For the `Microsoft.AspNetCore.Components.NavigationManager.LocationChanged` event, `Microsoft.AspNetCore.Components.Routing.LocationChangedEventArgs` provides the following information about navigation events:

* `Microsoft.AspNetCore.Components.Routing.LocationChangedEventArgs.Location`: The URL of the new location.
* `Microsoft.AspNetCore.Components.Routing.LocationChangedEventArgs.IsNavigationIntercepted`: If `true`, Blazor intercepted the navigation from the browser. If `false`, `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` caused the navigation to occur.

The following component:

* Navigates to the app's `Counter` component (`Counter.razor`) when the button is selected using `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*`.
* Handles the location changed event by subscribing to `Microsoft.AspNetCore.Components.NavigationManager.LocationChanged`.
  * The `HandleLocationChanged` method is unhooked when `Dispose` is called by the framework. Unhooking the method permits garbage collection of the component.
  * The logger implementation logs the following information when the button is selected:

    > :::no-loc text="BlazorSample.Pages.Navigate: Information: URL of new location: https://localhost:{PORT}/counter":::

`Navigate.razor`:

```razor
@page "/navigate"
@implements IDisposable
@inject ILogger<Navigate> Logger
@inject NavigationManager Navigation

<h1>Navigate Example</h1>

<button class="btn btn-primary" @onclick="NavigateToCounterComponent">
    Navigate to the Counter component
</button>

@code {
    private void NavigateToCounterComponent() => Navigation.NavigateTo("counter");

    protected override void OnInitialized() => 
        Navigation.LocationChanged += HandleLocationChanged;

    private void HandleLocationChanged(object? sender, LocationChangedEventArgs e) => 
        Logger.LogInformation("URL of new location: {Location}", e.Location);

    public void Dispose() => Navigation.LocationChanged -= HandleLocationChanged;
}
```

For more information on component disposal, see ASP.NET Core Razor component disposal.

## Navigation Manager redirect behavior during static server-side rendering (static SSR)

For a redirect during static server-side rendering (static SSR), `Microsoft.AspNetCore.Components.NavigationManager` relies on throwing a `Microsoft.AspNetCore.Components.NavigationException` that gets captured by the framework, which converts the error into a redirect. Code that exists after the call to `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` isn't called. When using Visual Studio, the debugger breaks on the exception, requiring you to deselect the checkbox for **Break when this exception type is user-handled** in the Visual Studio UI to avoid the debugger stopping for future redirects.

You can use the `<BlazorDisableThrowNavigationException>` MSBuild property set to `true` in the app's project file to opt-in to no longer throwing a `Microsoft.AspNetCore.Components.NavigationException`. Also, code after the call to `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` executes when it wouldn't have run before. This behavior is enabled by default in the .NET 10 or later Blazor Web App project template:

```xml
<BlazorDisableThrowNavigationException>true</BlazorDisableThrowNavigationException>
```
