---
title: "ASP.NET Core Blazor state management using protected browser storage"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/state-management/protected-browser-storage.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor protected browser storage

For transient data that the user is actively creating, a commonly used storage location is the browser's `localStorage` and `sessionStorage` collections:

* `localStorage` is scoped to the browser's instance. If the user reloads the page or closes and reopens the browser, the state persists. If the user opens multiple browser tabs, the state is shared across the tabs. Data persists in `localStorage` until explicitly cleared. The `localStorage` data for a document loaded in a "private browsing" or "incognito" session is cleared when the last "private" tab is closed.
* `sessionStorage` is scoped to the browser tab. If the user reloads the tab, the state persists. If the user closes the tab or the browser, the state is lost. If the user opens multiple browser tabs, each tab has its own independent version of the data.

Generally, `sessionStorage` is safer to use. `sessionStorage` avoids the risk that a user opens multiple tabs and encounters the following:

* Bugs in state storage across tabs.
* Confusing behavior when a tab overwrites the state of other tabs.

`localStorage` is the better choice if the app must persist state across closing and reopening the browser.

Caveats for using browser storage:

* Similar to the use of a server-side database, loading and saving data are asynchronous.
* The requested page doesn't exist in the browser during prerendering, so local storage isn't available during prerendering.
* Storage of a few kilobytes of data is reasonable to persist for server-side Blazor apps. Beyond a few kilobytes, you must consider the performance implications because the data is loaded and saved across the network.
* Users may view or tamper with the data. ASP.NET Core Data Protection can mitigate the risk. For example, ASP.NET Core Protected Browser Storage uses ASP.NET Core Data Protection.

Third-party NuGet packages provide APIs for working with `localStorage` and `sessionStorage`. It's worth considering choosing a package that transparently uses ASP.NET Core Data Protection. Data Protection encrypts stored data and reduces the potential risk of tampering with stored data. If JSON-serialized data is stored in plain text, users can see the data using browser developer tools and also modify the stored data. Securing trivial data isn't a problem. For example, reading or modifying the stored color of a UI element isn't a significant security risk to the user or the organization. Avoid allowing users to inspect or tamper with *sensitive data*.

## ASP.NET Core Protected Browser Storage

ASP.NET Core Protected Browser Storage leverages ASP.NET Core Data Protection for `localStorage` and `sessionStorage`.

> **Note:**
> Protected Browser Storage relies on ASP.NET Core Data Protection and is only supported for server-side Blazor apps.

## Save and load data within a component

In any component that requires loading or saving data to browser storage, use the `@inject` directive to inject an instance of either of the following:

* `ProtectedLocalStorage`
* `ProtectedSessionStorage`

The choice depends on which browser storage location you wish to use. In the following example, `sessionStorage` is used:

```razor
@using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage
@inject ProtectedSessionStorage ProtectedSessionStore
```

The `@using` directive can be placed in the app's imports file (`_Imports.razor`) instead of in the component. Use of the imports file makes the namespace available to larger segments of the app or the whole app.

To persist the `currentCount` value in the `Counter` component of an app based on the Blazor project template, modify the `IncrementCount` method to use `ProtectedSessionStore.SetAsync`:

```csharp
private async Task IncrementCount()
{
    currentCount++;
    await ProtectedSessionStore.SetAsync("count", currentCount);
}
```

In larger, more realistic apps, storage of individual fields is an unlikely scenario. Apps are more likely to store entire model objects that include complex state. `ProtectedSessionStore` automatically serializes and deserializes JSON data to store complex state objects.

In the preceding code example, the `currentCount` data is stored as `sessionStorage['count']` in the user's browser. The data isn't stored in plain text but rather is protected using ASP.NET Core Data Protection. The encrypted data can be inspected if `sessionStorage['count']` is evaluated in the browser's developer console.

To recover the `currentCount` data if the user returns to the `Counter` component later, including if the user is on a new circuit, use `ProtectedSessionStore.GetAsync`:

```csharp
protected override async Task OnInitializedAsync()
{
    var result = await ProtectedSessionStore.GetAsync<int>("count");
    currentCount = result.Success ? result.Value : 0;
}
```

If the component's parameters include navigation state, call `ProtectedSessionStore.GetAsync` and assign a non-`null` result in `Microsoft.AspNetCore.Components.ComponentBase.OnParametersSetAsync*`, not `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*`. `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` is only called once when the component is first instantiated. `Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*` isn't called again later if the user navigates to a different URL while remaining on the same page. For more information, see ASP.NET Core Razor component lifecycle.

> **Warning:**
> The examples in this section only work if the server doesn't have prerendering enabled. With prerendering enabled, an error is generated explaining that JavaScript interop calls cannot be issued because the component is being prerendered.
>
> Either disable prerendering or add additional code to work with prerendering. To learn more about writing code that works with prerendering, see the Handle prerendering section.

## Handle the loading state

Since browser storage is accessed asynchronously over a network connection, there's always a period of time before the data is loaded and available to a component. For the best results, render a message while loading is in progress instead of displaying blank or default data.

One approach is to track whether the data is `null`, which means that the data is still loading. In the default `Counter` component, the count is held in an `int`. Make `currentCount` nullable by adding a question mark (`?`) to the type (`int`):

```csharp
private int? currentCount;
```

Instead of unconditionally displaying the count and **`Increment`** button, display these elements only if the data is loaded by checking `System.Nullable`1.HasValue`:

```razor
@if (currentCount.HasValue)
{
    <p>Current count: <strong>@currentCount</strong></p>
    <button @onclick="IncrementCount">Increment</button>
}
else
{
    <p>Loading...</p>
}
```

## Handle prerendering

During prerendering:

* An interactive connection to the user's browser doesn't exist.
* The browser doesn't yet have a page in which it can run JavaScript code.

`localStorage` or `sessionStorage` aren't available during prerendering. If the component attempts to interact with storage, an error is generated explaining that JavaScript interop calls cannot be issued because the component is being prerendered.

One way to resolve the error is to disable prerendering. This is usually the best choice if the app makes heavy use of browser-based storage. Prerendering adds complexity and doesn't benefit the app because the app can't prerender any useful content until `localStorage` or `sessionStorage` are available.

To disable prerendering, indicate the render mode with the `prerender` parameter set to `false` at the highest-level component in the app's component hierarchy that isn't a root component.

> **Note:**
> Making a root component interactive, such as the `App` component, isn't supported. Therefore, prerendering can't be disabled directly by the `App` component.

For apps based on the Blazor Web App project template, prerendering is typically disabled where the `Routes` component is used in the `App` component (`Components/App.razor`):

```razor
<Routes @rendermode="new InteractiveServerRenderMode(prerender: false)" />
```

Also, disable prerendering for the `HeadOutlet` component:

```razor
<HeadOutlet @rendermode="new InteractiveServerRenderMode(prerender: false)" />
```

For more information, see Prerender ASP.NET Core Razor components.

When prerendering is disabled, prerendering of `<head>` content is disabled.

Prerendering might be useful for other pages that don't use `localStorage` or `sessionStorage`. To retain prerendering, defer the loading operation until the browser is connected to the circuit. The following is an example for storing a counter value:

```razor
@using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage
@inject ProtectedLocalStorage ProtectedLocalStore

@if (RendererInfo.IsInteractive)
{
    <p>Current count: <strong>@currentCount</strong></p>
    <button @onclick="IncrementCount">Increment</button>
}
else
{
    <p>Loading...</p>
}

@code {
    private int currentCount;

    protected override async Task OnInitializedAsync()
    {
        if (RendererInfo.IsInteractive)
        {
            await LoadStateAsync();
        }
    }

    private async Task LoadStateAsync()
    {
        var result = await ProtectedLocalStore.GetAsync<int>("count");
        currentCount = result.Success ? result.Value : 0;
    }

    private async Task IncrementCount()
    {
        currentCount++;
        await ProtectedLocalStore.SetAsync("count", currentCount);
    }
}
```

For more information on `Microsoft.AspNetCore.Components.RendererInfo.IsInteractive`, see ASP.NET Core Blazor render modes.

## Factor out state preservation to a common provider

If many components rely on browser-based storage, implementing state provider code many times creates code duplication. One option for avoiding code duplication is to create a *state provider parent component* that encapsulates the state provider logic. Child components can work with persisted data without regard to the state persistence mechanism.

In the following example of a `CounterStateProvider` component, counter data is persisted to `sessionStorage`, and it handles the loading phase by not rendering its child content until state loading is complete.

The `CounterStateProvider` component deals with prerendering by not loading state until after component rendering in the `OnAfterRenderAsync` lifecycle method, which doesn't execute during prerendering.

The approach in this section isn't capable of triggering rerendering of multiple subscribed components on the same page. If one subscribed component changes the state, it rerenders and can display the updated state, but a different component on the same page displaying that state displays stale data until its own next rerender. Therefore, the approach described in this section is best suited to using state in a single component on the page.

`CounterStateProvider.razor`:

```razor
@using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage
@inject ProtectedSessionStorage ProtectedSessionStore

@if (isLoaded)
{
    <CascadingValue Value="this">
        @ChildContent
    </CascadingValue>
}
else
{
    <p>Loading...</p>
}

@code {
    private bool isLoaded;

    [Parameter]
    public RenderFragment? ChildContent { get; set; }

    public int CurrentCount { get; set; }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            isLoaded = true;
            await LoadStateAsync();
            StateHasChanged();
        }
    }

    private async Task LoadStateAsync()
    {
        var result = await ProtectedSessionStore.GetAsync<int>("count");
        CurrentCount = result.Success ? result.Value : 0;
        isLoaded = true;
    }

    public async Task IncrementCount()
    {
        CurrentCount++;
        await ProtectedSessionStore.SetAsync("count", CurrentCount);
    }
}
```

> **Note:**
> For more information on `Microsoft.AspNetCore.Components.RenderFragment`, see ASP.NET Core Razor components.

To make the state accessible to all components in an app, wrap the `CounterStateProvider` component around the `Microsoft.AspNetCore.Components.Routing.Router` (`<Router>...</Router>`) in the `Routes` component with global interactive server-side rendering (interactive SSR).

In the `App` component (`Components/App.razor`):

```razor
<Routes @rendermode="InteractiveServer" />
```

In the `Routes` component (`Components/Routes.razor`):

```razor
<CounterStateProvider>
    <Router ...>
        ...
    </Router>
</CounterStateProvider>
```

Wrapped components receive and can modify the persisted counter state. The following `Counter` component implements the pattern:

```razor
@page "/counter"

<p>Current count: <strong>@CounterStateProvider?.CurrentCount</strong></p>
<button @onclick="IncrementCount">Increment</button>

@code {
    [CascadingParameter]
    private CounterStateProvider? CounterStateProvider { get; set; }

    private async Task IncrementCount()
    {
        if (CounterStateProvider is not null)
        {
            await CounterStateProvider.IncrementCount();
        }
    }
}
```

The preceding component isn't required to interact with `ProtectedBrowserStorage`, nor does it deal with a "loading" phase.

In general, the *state provider parent component* pattern is recommended:

* To consume state across many components.
* If there's just one top-level state object to persist.

To persist many different state objects and consume different subsets of objects in different places, it's better to avoid persisting state globally.
