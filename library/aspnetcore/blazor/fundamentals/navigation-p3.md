---
title: "ASP.NET Core Blazor navigation (part 3 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/navigation.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor navigation (part 3 of 5)

```razor
@page "/user/{Id:int}"
@implements IDisposable
@inject NavigationManager NavigationManager
@inject NotFoundContext NotFoundContext

<div>
    No matter what ID is used, no matching user is returned
    from the call to GetUser().
</div>

@code {
    [Parameter]
    public int Id { get; set; }

    protected override async Task OnInitializedAsync()
    {
        NavigationManager.OnNotFound += HandleNotFound;

        var user = await GetUser(Id);

        if (user == null)
        {
            NavigationManager.NotFound();
        }
    }

    private void HandleNotFound(object? sender, NotFoundEventArgs e)
    {
        NotFoundContext.UpdateContext("User Not Found",
            "Sorry! The requested user wasn't found.");
    }

    private async Task<UserItem[]?> GetUser(int id)
    {
        // Simulate no user with matching id found
        return await Task.FromResult<UserItem[]?>(null);
    }

    void IDisposable.Dispose()
    {
        NavigationManager.OnNotFound -= HandleNotFound;
    }

    public class UserItem
    {
        public int Id { get; set; }
        public string? Name { get; set; }
    }
}
```

To reach the preceding components in a local demonstration with a test app, create entries in the `NavMenu` component (`NavMenu.razor`) to reach the `Movie` and `User` components. The entity IDs, passed as route parameters, in the following example are mock values that have no effect because they aren't actually used by the components, which simulate not finding a movie or user.

In `NavMenu.razor`:

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="movie/1">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Movie
    </NavLink>
</div>

<div class="nav-item px-3">
    <NavLink class="nav-link" href="user/2">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> User
    </NavLink>
</div>
```

## Enhanced navigation and form handling

*This section applies to Blazor Web Apps.*

Blazor Web Apps are capable of two types of routing for page navigation and form handling requests:

* Normal navigation (cross-document navigation): a full-page reload is triggered for the request URL.
* Enhanced navigation (same-document navigation): Blazor intercepts the request and performs a `fetch` request instead. Blazor then patches the response content into the page's DOM. Blazor's enhanced navigation and form handling avoid the need for a full-page reload and preserves more of the page state, so pages load faster, usually without losing the user's scroll position on the page.

Enhanced navigation is available when:

* The Blazor Web App script (`blazor.web.js`) is used, not the Blazor Server script (`blazor.server.js`) or Blazor WebAssembly script (`blazor.webassembly.js`).
* The feature isn't explicitly disabled.
* The destination URL is within the internal base URI space (the app's base path) and the link to the page doesn't have the `data-enhance-nav` attribute set to `false`.

If server-side routing and enhanced navigation are enabled, location changing handlers are only invoked for programmatic navigation initiated from an interactive runtime. In future releases, additional types of navigation, such as following a link, may also invoke location changing handlers.

When an enhanced navigation occurs, `LocationChanged` event handlers registered with Interactive Server and WebAssembly runtimes are typically invoked. There are cases when location changing handlers might not intercept an enhanced navigation. For example, the user might switch to another page before an interactive runtime becomes available. Therefore, it's important that app logic not rely on invoking a location changing handler, as there's no guarantee of the handler executing.

When calling `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*`:

* If `forceLoad` is `false`, which is the default:
  * And enhanced navigation is available at the current URL, Blazor's enhanced navigation is activated.
  * Otherwise, Blazor performs a full-page reload for the requested URL.
* If `forceLoad` is `true`: Blazor performs a full-page reload for the requested URL, whether enhanced navigation is available or not.

You can refresh the current page by calling `NavigationManager.Refresh(bool forceLoad = false)`, which always performs an enhanced navigation, if available. If enhanced navigation isn't available, Blazor performs a full-page reload.

```csharp
Navigation.Refresh();
```

Pass `true` to the `forceLoad` parameter to ensure a full-page reload is always performed, even if enhanced navigation is available:

```csharp
Navigation.Refresh(true);
```

Enhanced navigation is enabled by default, but it can be controlled hierarchically and on a per-link basis using the `data-enhance-nav` HTML attribute.

The following examples disable enhanced navigation:

```html
<a href="redirect" data-enhance-nav="false">
    GET without enhanced navigation
</a>
```

```razor
<ul data-enhance-nav="false">
    <li>
        <a href="redirect">GET without enhanced navigation</a>
    </li>
    <li>
        <a href="redirect-2">GET without enhanced navigation</a>
    </li>
</ul>
```

If the destination is a non-Blazor endpoint, enhanced navigation doesn't apply, and the client-side JavaScript retries as a full page load. This ensures no confusion to the framework about external pages that shouldn't be patched into an existing page.

To enable enhanced form handling, add the `Microsoft.AspNetCore.Components.Forms.EditForm.Enhance` parameter to `Microsoft.AspNetCore.Components.Forms.EditForm` forms or the `data-enhance` attribute to HTML forms (`<form>`):

```razor
<EditForm ... Enhance ...>
    ...
</EditForm>
```

```html
<form ... data-enhance ...>
    ...
</form>
```

Enhanced form handling isn't hierarchical and doesn't flow to child forms:

❌Unsupported: You can't set enhanced navigation on a form's ancestor element to enable enhanced navigation for the form.

```html
<div ... data-enhance ...>
    <form ...>
        <!-- NOT enhanced -->
    </form>
</div>
```

Enhanced form posts only work with Blazor endpoints. Posting an enhanced form to non-Blazor endpoint results in an error.

To disable enhanced navigation:

* For an `Microsoft.AspNetCore.Components.Forms.EditForm`, remove the `Microsoft.AspNetCore.Components.Forms.EditForm.Enhance` parameter from the form element (or set it to `false`: `Enhance="false"`).
* For an HTML `<form>`, remove the `data-enhance` attribute from form element (or set it to `false`: `data-enhance="false"`).

Blazor's enhanced navigation and form handing may undo dynamic changes to the DOM if the updated content isn't part of the server rendering. To preserve the content of an element, use the `data-permanent` attribute.

In the following example, the content of the `` element is updated dynamically by a script when the page loads:

```html
<div data-permanent>
    ...
</div>
```

Once Blazor has started on the client, you can use the `enhancedload` event to listen for enhanced page updates. This allows for re-applying changes to the DOM that may have been undone by an enhanced page update.

```javascript
Blazor.addEventListener('enhancedload', () => console.log('Enhanced update!'));
```

To disable enhanced navigation and form handling globally, see ASP.NET Core Blazor startup.

Enhanced navigation with static server-side rendering (static SSR) requires special attention when loading JavaScript. For more information, see ASP.NET Core Blazor JavaScript with static server-side rendering (static SSR).

## Produce a URI relative to the base URI prefix

Based on the app's base URI, `Microsoft.AspNetCore.Components.NavigationManager.ToBaseRelativePath*` converts an absolute URI into a URI relative to the base URI prefix.

Consider the following example:

```csharp
try
{
    baseRelativePath = Navigation.ToBaseRelativePath(inputURI);
}
catch (ArgumentException ex)
{
    ...
}
```

If the base URI of the app is `https://localhost:8000`, the following results are obtained:

* Passing `https://localhost:8000/segment` in `inputURI` results in a `baseRelativePath` of `segment`.
* Passing `https://localhost:8000/segment1/segment2` in `inputURI` results in a `baseRelativePath` of `segment1/segment2`.

If the base URI of the app doesn't match the base URI of `inputURI`, an `System.ArgumentException` is thrown.

Passing `https://localhost:8001/segment` in `inputURI` results in the following exception:

> :::no-loc text="System.ArgumentException: 'The URI 'https://localhost:8001/segment' is not contained by the base URI 'https://localhost:8000/'.'":::

## Navigation history state

The `Microsoft.AspNetCore.Components.NavigationManager` uses the browser's History API to maintain navigation history state associated with each location change made by the app. Maintaining history state is particularly useful in external redirect scenarios, such as when authenticating users with external identity providers. For more information, see the Navigation options section.

## Navigation options

Pass `Microsoft.AspNetCore.Components.NavigationOptions` to `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` to control the following behaviors:

* `Microsoft.AspNetCore.Components.NavigationOptions.ForceLoad`: Bypass client-side routing and force the browser to load the new page from the server, whether or not the URI is handled by the client-side router. The default value is `false`.
* `Microsoft.AspNetCore.Components.NavigationOptions.ReplaceHistoryEntry`: Replace the current entry in the history stack. If `false`, append the new entry to the history stack. The default value is `false`.
* `Microsoft.AspNetCore.Components.NavigationOptions.HistoryEntryState`: Gets or sets the state to append to the history entry.
* `RelativeToCurrentUri`: When `true`, the URI is resolved relative to the current page path instead of the app's base URI. The default value is `false`.

In the following example:

* The state appended to the history entry is "`Navigation state`."
* If the current URI is `/docs/getting-started/installation`, navigation results in a request for `/docs/getting-started/configuration`.

```csharp
Navigation.NavigateTo("/configuration", new NavigationOptions
{
    HistoryEntryState = "Navigation state",
    RelativeToCurrentUri = true
});
```

For more information on obtaining the state associated with the target history entry while handling location changes, see the Handle/prevent location changes section.
