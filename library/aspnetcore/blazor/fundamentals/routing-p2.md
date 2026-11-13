---
title: "ASP.NET Core Blazor routing (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/routing.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor routing (part 2 of 2)

## Avoid file capture in a route parameter

The following route template inadvertently captures static asset paths in its optional route parameter (`Optional`). For example, the app's stylesheet (`.styles.css`) is captured, which breaks the app's styles:

```razor
@page "/{optional?}"

...

@code {
    [Parameter]
    public string? Optional { get; set; }
}
```

To restrict a route parameter to capturing non-file paths, use the `:nonfile` constraint in the route template:

```razor
@page "/{optional:nonfile?}"
```

## Catch-all route parameters

Catch-all route parameters, which capture paths across multiple folder boundaries, are supported in components.

Catch-all route parameters are:

* Named to match the route segment name. Naming isn't case-sensitive.
* A `string` type. The framework doesn't provide automatic casting.
* At the end of the URL.

`CatchAll.razor`:

```razor
@page "/catch-all/{*pageRoute}"

<h1>Catch All Parameters Example</h1>

<p>Add some URI segments to the route and request the page again.</p>

<p>
    PageRoute: @PageRoute
</p>

@code {
    [Parameter]
    public string? PageRoute { get; set; }
}
```

For the URL `/catch-all/this/is/a/test` with a route template of `/catch-all/{*pageRoute}`, the value of `PageRoute` is set to `this/is/a/test`.

Slashes and segments of the captured path are decoded. For a route template of `/catch-all/{*pageRoute}`, the URL `/catch-all/this/is/a%2Ftest*` yields `this/is/a/test*`.

## Handle asynchronous navigation events with `OnNavigateAsync`

The `Microsoft.AspNetCore.Components.Routing.Router` component supports an `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` feature. The `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` handler is invoked when the user:

* Visits a route for the first time by navigating to it directly in their browser.
* Navigates to a new route using a link or a `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` invocation, which is called in developer code to navigates to a URI. [`Microsoft.AspNetCore.Components.NavigationManager` API is described in the next article, ASP.NET Core Blazor navigation.]

```razor
<Router AppAssembly="typeof(App).Assembly" 
    OnNavigateAsync="OnNavigateAsync">
    ...
</Router>

@code {
    private async Task OnNavigateAsync(NavigationContext args)
    {
        ...
    }
}
```

For an example that uses `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync`, see Lazy load assemblies in ASP.NET Core Blazor WebAssembly.

When prerendering on the server, `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` is executed *twice*:

* Once when the requested endpoint component is initially rendered statically.
* A second time when the browser renders the endpoint component.

To prevent developer code in `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` from executing twice, the `Routes` component can store the `Microsoft.AspNetCore.Components.Routing.NavigationContext` for use in the `OnAfterRender{Async}` lifecycle method, where `firstRender` can be checked. For more information, see Prerendering with JavaScript interop.

## Handle cancellations in `OnNavigateAsync`

The `Microsoft.AspNetCore.Components.Routing.NavigationContext` object passed to the `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` callback contains a `Microsoft.AspNetCore.Components.Routing.NavigationContext.CancellationToken` that's set when a new navigation event occurs. The `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` callback must throw when this cancellation token is set to avoid continuing to run the `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` callback on an outdated navigation.

If a user navigates to an endpoint but then immediately navigates to a new endpoint, the app shouldn't continue running the `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` callback for the first endpoint.

In the following example:

* The cancellation token is passed in the call to `PostAsJsonAsync`, which can cancel the POST if the user navigates away from the `/about` endpoint.
* The cancellation token is set during a product prefetch operation if the user navigates away from the `/store` endpoint.

```razor
@inject HttpClient Http
@inject ProductCatalog Products

<Router AppAssembly="typeof(App).Assembly" 
    OnNavigateAsync="OnNavigateAsync">
    ...
</Router>

@code {
    private async Task OnNavigateAsync(NavigationContext context)
    {
        if (context.Path == "/about") 
        {
            var stats = new Stats { Page = "/about" };
            await Http.PostAsJsonAsync("api/visited", stats, 
                context.CancellationToken);
        }
        else if (context.Path == "/store")
        {
            var productIds = new[] { 345, 789, 135, 689 };

            foreach (var productId in productIds) 
            {
                context.CancellationToken.ThrowIfCancellationRequested();
                Products.Prefetch(productId);
            }
        }
    }
}
```

> **Note:**
> Not throwing if the cancellation token in `Microsoft.AspNetCore.Components.Routing.NavigationContext` is canceled can result in unintended behavior, such as rendering a component from a previous navigation.

## User interaction with `<Navigating>` content

If there's a significant delay during navigation, such as while lazy-loading assemblies in a Blazor WebAssembly app or for a slow network connection to a Blazor server-side app, the `Microsoft.AspNetCore.Components.Routing.Router` component can indicate to the user that a page transition is occurring.

At the top of the component that specifies the `Microsoft.AspNetCore.Components.Routing.Router` component, add an `@using` directive for the `Microsoft.AspNetCore.Components.Routing` namespace:

```razor
@using Microsoft.AspNetCore.Components.Routing
```

Provide content to the `Microsoft.AspNetCore.Components.Routing.Router.Navigating` parameter for display during page transition events.

In the router element (`<Router>...</Router>`) content:

```razor
<Navigating>
    <p>Loading the requested page&hellip;</p>
</Navigating>
```

For an example that uses the `Microsoft.AspNetCore.Components.Routing.Router.Navigating` property, see Lazy load assemblies in ASP.NET Core Blazor WebAssembly.
