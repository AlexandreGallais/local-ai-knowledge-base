---
title: "ASP.NET Core Blazor navigation (part 5 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/fundamentals/navigation.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor navigation (part 5 of 5)

## Handle/prevent location changes

`Microsoft.AspNetCore.Components.NavigationManager.RegisterLocationChangingHandler*` registers a handler to process incoming navigation events. The handler's context provided by `Microsoft.AspNetCore.Components.Routing.LocationChangingContext` includes the following properties:

* `Microsoft.AspNetCore.Components.Routing.LocationChangingContext.TargetLocation`: Gets the target location.
* `Microsoft.AspNetCore.Components.Routing.LocationChangingContext.HistoryEntryState`: Gets the state associated with the target history entry.
* `Microsoft.AspNetCore.Components.Routing.LocationChangingContext.IsNavigationIntercepted`: Gets whether the navigation was intercepted from a link.
* `Microsoft.AspNetCore.Components.Routing.LocationChangingContext.CancellationToken`: Gets a `System.Threading.CancellationToken` to determine if the navigation was canceled, for example, to determine if the user triggered a different navigation.
* `Microsoft.AspNetCore.Components.Routing.LocationChangingContext.PreventNavigation*`: Called to prevent the navigation from continuing.

A component can register multiple location changing handlers in the `OnAfterRender{Async}` lifecycle method. Navigation invokes all of the location changing handlers registered across the entire app (across multiple components), and any internal navigation executes them all in parallel. In addition to `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` handlers are invoked:

* When selecting internal links, which are links that point to URLs under the app's base path.
* When navigating using the forward and back buttons in a browser.

Handlers are only executed for internal navigation within the app. If the user selects a link that navigates to a different site or changes the address bar to a different site manually, location changing handlers aren't executed.

Implement `System.IDisposable` and dispose registered handlers to unregister them. For more information, see ASP.NET Core Razor component disposal.

> **Important:**
> Don't attempt to execute DOM cleanup tasks via JavaScript (JS) interop when handling location changes. Use the `MutationObserver` pattern in JS on the client. For more information, see ASP.NET Core Blazor JavaScript interoperability (JS interop).

In the following example, a location changing handler is registered for navigation events.

`NavHandler.razor`:

```razor
@page "/nav-handler"
@implements IDisposable
@inject NavigationManager Navigation

<p>
    <button @onclick="@(() => Navigation.NavigateTo("/"))">
        Home (Allowed)
    </button>
    <button @onclick="@(() => Navigation.NavigateTo("/counter"))">
        Counter (Prevented)
    </button>
</p>

@code {
    private IDisposable? registration;

    protected override void OnAfterRender(bool firstRender)
    {
        if (firstRender)
        {
            registration = 
                Navigation.RegisterLocationChangingHandler(OnLocationChanging);
        }
    }

    private ValueTask OnLocationChanging(LocationChangingContext context)
    {
        if (context.TargetLocation == "/counter")
        {
            context.PreventNavigation();
        }

        return ValueTask.CompletedTask;
    }

    public void Dispose() => registration?.Dispose();
}
```

Since internal navigation can be canceled asynchronously, multiple overlapping calls to registered handlers may occur. For example, multiple handler calls may occur when the user rapidly selects the back button on a page or selects multiple links before a navigation is executed. The following is a summary of the asynchronous navigation logic:

* If any location changing handlers are registered, all navigation is initially reverted, then replayed if the navigation isn't canceled.
* If overlapping navigation requests are made, the latest request always cancels earlier requests, which means the following:
  * The app may treat multiple back and forward button selections as a single selection.
  * If the user selects multiple links before the navigation completes, the last link selected determines the navigation.

For more information on passing `Microsoft.AspNetCore.Components.NavigationOptions` to `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` to control entries and state of the navigation history stack, see the Navigation options section.

For additional example code, see the `NavigationManagerComponent` in the `BasicTestApp` (`dotnet/aspnetcore` reference source).

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

The `NavigationLock` component intercepts navigation events as long as it is rendered, effectively "locking" any given navigation until a decision is made to either proceed or cancel. Use `NavigationLock` when navigation interception can be scoped to the lifetime of a component.

`Microsoft.AspNetCore.Components.Routing.NavigationLock` parameters:

* `Microsoft.AspNetCore.Components.Routing.NavigationLock.ConfirmExternalNavigation` sets a browser dialog to prompt the user to either confirm or cancel external navigation. The default value is `false`. Displaying the confirmation dialog requires initial user interaction with the page before triggering external navigation with the URL in the browser's address bar. For more information on the interaction requirement, see Window: `beforeunload` event.
* `Microsoft.AspNetCore.Components.Routing.NavigationLock.OnBeforeInternalNavigation` sets a callback for internal navigation events.

In the following `NavLock` component:

* An attempt to follow the link to Microsoft's website must be confirmed by the user before the navigation to `https://www.microsoft.com` succeeds.
* `Microsoft.AspNetCore.Components.Routing.LocationChangingContext.PreventNavigation*` is called to prevent navigation from occurring if the user declines to confirm the navigation via a JavaScript (JS) interop call that spawns the JS `confirm` dialog.

`NavLock.razor`:

```razor
@page "/nav-lock"
@inject IJSRuntime JSRuntime
@inject NavigationManager Navigation

<NavigationLock ConfirmExternalNavigation="true" 
    OnBeforeInternalNavigation="OnBeforeInternalNavigation" />

<p>
    <button @onclick="Navigate">Navigate</button>
</p>

<p>
    <a href="https://www.microsoft.com">Microsoft homepage</a>
</p>

@code {
    private void Navigate()
    {
        Navigation.NavigateTo("/");
    }

    private async Task OnBeforeInternalNavigation(LocationChangingContext context)
    {
        var isConfirmed = await JSRuntime.InvokeAsync<bool>("confirm", 
            "Are you sure you want to navigate to the root page?");

        if (!isConfirmed)
        {
            context.PreventNavigation();
        }
    }
}
```

For additional example code, see the `ConfigurableNavigationLock` component in the `BasicTestApp` (`dotnet/aspnetcore` reference source).

## Dynamically-generated `NavLink` components via reflection

`Microsoft.AspNetCore.Components.Routing.NavLink` component entries can be dynamically created from the app's components via reflection. The following example demonstrates the general approach for further customization.

For the following demonstration, a consistent, standard naming convention is used for the app's components:

* Routable component file names use Pascal case&dagger;, for example `Pages/ProductDetail.razor`.
* Routable component file paths match their URLs in kebab case&Dagger; with hyphens appearing between words in a component's route template. For example, a `ProductDetail` component with a route template of `/product-detail` (`@page "/product-detail"`) is requested in a browser at the relative URL `/product-detail`.

&dagger;Pascal case (upper camel case) is a naming convention without spaces and punctuation and with the first letter of each word capitalized, including the first word.
&Dagger;Kebab case is a naming convention without spaces and punctuation that uses lowercase letters and dashes between words.

In the Razor markup of the `NavMenu` component (`NavMenu.razor`) under the default `Home` page, `Microsoft.AspNetCore.Components.Routing.NavLink` components are added from a collection:

```diff
<nav class="flex-column">
    <div class="nav-item px-3">
        <NavLink class="nav-link" href="" Match="NavLinkMatch.All">
            <span class="bi bi-house-door-fill-nav-menu" 
                aria-hidden="true"></span> Home
        </NavLink>
    </div>

+   @foreach (var name in GetRoutableComponents())
+   {
+       <div class="nav-item px-3">
+           <NavLink class="nav-link" 
+                   href="@Regex.Replace(name, @"(\B[A-Z]|\d+)", "-$1").ToLower()">
+               @Regex.Replace(name, @"(\B[A-Z]|\d+)", " $1")
+           </NavLink>
+       </div>
+   }
</nav>
```

The `GetRoutableComponents` method in the `@code` block:

```csharp
public IEnumerable<string> GetRoutableComponents() => 
    Assembly.GetExecutingAssembly()
        .ExportedTypes
        .Where(t => t.IsSubclassOf(typeof(ComponentBase)))
        .Where(c => c.GetCustomAttributes(inherit: true)
                     .OfType<RouteAttribute>()
                     .Any())
        .Where(c => c.Name != "Home" && c.Name != "Error")
        .OrderBy(o => o.Name)
        .Select(c => c.Name);
```

The preceding example doesn't include the following pages in the rendered list of components:

* `Home` page: The page is listed separately from the automatically generated links because it should appear at the top of the list and set the `Match` parameter.
* `Error` page: The error page is only navigated to by the framework and shouldn't be listed.

For an demonstration of the preceding code in a sample app, obtain the **Blazor Web App** or **Blazor WebAssembly** sample app.
