---
title: "blazor (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-10/includes/blazor.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# blazor (part 2 of 4)

### Declarative model for persisting state from components and services

You can now declaratively specify state to persist from components and services using the `[PersistentState]` attribute. Public (`public`) properties with this attribute are automatically persisted using the `Microsoft.AspNetCore.Components.PersistentComponentState` service during prerendering. The state is retrieved when the component renders interactively or the service is instantiated.

In previous Blazor releases, persisting component state during prerendering using the `Microsoft.AspNetCore.Components.PersistentComponentState` service involved a significant amount of code, as the following example demonstrates:

```razor
@page "/movies"
@implements IDisposable
@inject IMovieService MovieService
@inject PersistentComponentState ApplicationState

@if (MoviesList == null)
{
    <p><em>Loading...</em></p>
}
else
{
    <QuickGrid Items="MoviesList.AsQueryable()">
        ...
    </QuickGrid>
}

@code {
    public List<Movie>? MoviesList { get; set; }
    private PersistingComponentStateSubscription? persistingSubscription;

    protected override async Task OnInitializedAsync()
    {
        if (!ApplicationState.TryTakeFromJson<List<Movie>>(nameof(MoviesList), 
            out var movies))
        {
            MoviesList = await MovieService.GetMoviesAsync();
        }
        else
        {
            MoviesList = movies;
        }

        persistingSubscription = ApplicationState.RegisterOnPersisting(() =>
        {
            ApplicationState.PersistAsJson(nameof(MoviesList), MoviesList);
            return Task.CompletedTask;
        });
    }

    public void Dispose() => persistingSubscription?.Dispose();
}
```

This code can now be simplified using the new declarative model:

```razor
@page "/movies"
@inject IMovieService MovieService

@if (MoviesList == null)
{
    <p><em>Loading...</em></p>
}
else
{
    <QuickGrid Items="MoviesList.AsQueryable()">
        ...
    </QuickGrid>
}

@code {
    [PersistentState]
    public List<Movie>? MoviesList { get; set; }

    protected override async Task OnInitializedAsync()
    {
        MoviesList ??= await MovieService.GetMoviesAsync();
    }
}
```

Use `public` properties because reflection is used by the framework for tasks such as trimming unused code and source generation.

State can be serialized for multiple components of the same type, and you can establish declarative state in a service for use around the app by calling `RegisterPersistentService` on the Razor components builder (`Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents*`) with a custom service type and render mode. For more information, see ASP.NET Core Blazor prerendered state persistence.

### New JavaScript interop features

Blazor adds support for the following JS interop features:

* Create an instance of a JS object using a constructor function and get the `Microsoft.JSInterop.IJSObjectReference`/`Microsoft.JSInterop.IJSInProcessObjectReference` .NET handle for referencing the instance.
* Read or modify the value of a JS object property, both data and accessor properties.

The following asynchronous methods are available on `Microsoft.JSInterop.IJSRuntime` and `Microsoft.JSInterop.IJSObjectReference` with the same scoping behavior as the existing `Microsoft.JSInterop.IJSRuntime.InvokeAsync*` method:

* `InvokeConstructorAsync(string identifier, object?[]? args)`: Invokes the specified JS constructor function asynchronously. The function is invoked with the `new` operator. In the following example, `jsInterop.TestClass` is a class with a constructor function, and `classRef` is an `Microsoft.JSInterop.IJSObjectReference`:

  ```csharp
  var classRef = await JSRuntime.InvokeConstructorAsync("jsInterop.TestClass", "Blazor!");
  var text = await classRef.GetValueAsync<string>("text");
  var textLength = await classRef.InvokeAsync<int>("getTextLength");
  ```

* `GetValueAsync<TValue>(string identifier)`: Reads the value of the specified JS property asynchronously. The property can't be a `set`-only property. A `Microsoft.JSInterop.JSException` is thrown if the property doesn't exist. The following example returns a value from a data property:

  ```csharp
  var valueFromDataPropertyAsync = await JSRuntime.GetValueAsync<int>(
    "jsInterop.testObject.num");
  ```

* `SetValueAsync<TValue>(string identifier, TValue value)`: Updates the value of the specified JS property asynchronously. The property can't be a `get`-only property. If the property isn't defined on the target object, the property is created. A `Microsoft.JSInterop.JSException` is thrown if the property exists but isn't writable or when a new property can't be added to the object. In the following example, `num` is created on `testObject` with a value of 30 if it doesn't exist:

  ```csharp
  await JSRuntime.SetValueAsync("jsInterop.testObject.num", 30);
  ```

Overloads are available for each of the preceding methods that take a `System.Threading.CancellationToken` argument or `System.TimeSpan` timeout argument.

The following synchronous methods are available on `Microsoft.JSInterop.IJSInProcessRuntime` and `Microsoft.JSInterop.IJSInProcessObjectReference` with the same scoping behavior as the existing `Microsoft.JSInterop.IJSInProcessObjectReference.Invoke*` method:

* `InvokeConstructor(string identifier, object?[]? args)`: Invokes the specified JS constructor function synchronously. The function is invoked with the `new` operator. In the following example, `jsInterop.TestClass` is a class with a constructor function, and `classRef` is an `Microsoft.JSInterop.IJSInProcessObjectReference`:

  ```csharp
  var inProcRuntime = ((IJSInProcessRuntime)JSRuntime);
  var classRef = inProcRuntime.InvokeConstructor("jsInterop.TestClass", "Blazor!");
  var text = classRef.GetValue<string>("text");
  var textLength = classRef.Invoke<int>("getTextLength");
  ```

* `GetValue<TValue>(string identifier)`: Reads the value of the specified JS property synchronously. The property can't be a `set`-only property. A `Microsoft.JSInterop.JSException` is thrown if the property doesn't exist. The following example returns a value from a data property:

  ```csharp
  var inProcRuntime = ((IJSInProcessRuntime)JSRuntime);
  var valueFromDataProperty = inProcRuntime.GetValue<int>(
    "jsInterop.testObject.num");
  ```

* `SetValue<TValue>(string identifier, TValue value)`: Updates the value of the specified JS property synchronously. The property can't be a `get`-only property. If the property isn't defined on the target object, the property is created. A `Microsoft.JSInterop.JSException` is thrown if the property exists but isn't writable or when a new property can't be added to the object. In the following example, `num` is created on `testObject` with a value of 20 if it doesn't exist:

  ```csharp
  var inProcRuntime = ((IJSInProcessRuntime)JSRuntime);
  inProcRuntime.SetValue("jsInterop.testObject.num", 20);
  ```

For more information, see the following sections of the *Call JavaScript functions from .NET methods* article:

* Create an instance of a JS object using a constructor function
* Read or modify the value of a JS object property

### Blazor WebAssembly performance profiling and diagnostic counters

New performance profiling and diagnostic counters are available for Blazor WebAssembly apps. For more information, see the following articles:

* ASP.NET Core Blazor WebAssembly browser developer tools diagnostics
* ASP.NET Core Blazor WebAssembly Event Pipe diagnostics

### Opt-in to avoiding a `NavigationException` during static server-side rendering with `NavigationManager.NavigateTo`

Calling `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` during static server-side rendering (static SSR) throws a `Microsoft.AspNetCore.Components.NavigationException`, interrupting execution before being converted to a redirection response. This can cause confusion during debugging and is inconsistent with interactive rendering behavior, where code after `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` continues to execute normally.

In .NET 10, you can set the `<BlazorDisableThrowNavigationException>` MSBuild property to `true` in the app's project file in order to avoid throwing the exception during static SSR:

```xml
<PropertyGroup>
  <BlazorDisableThrowNavigationException>true</BlazorDisableThrowNavigationException>
</PropertyGroup>
```

With the MSBuild property set, calling `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` during static SSR no longer throws a `Microsoft.AspNetCore.Components.NavigationException`. Instead, it behaves consistently with interactive rendering by performing the navigation without throwing an exception. Code after `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` executes before the redirection occurs.

The .NET 10 Blazor Web App project template sets the MSBuild property to `true` by default. We recommend that apps updating to .NET 10 use the new MSBuild property and avoid the prior behavior.

If the MSBuild property is used, code that relied on `Microsoft.AspNetCore.Components.NavigationException` being thrown should be updated. In the default Blazor Identity UI of the Blazor Web App project template before the release of .NET 10, the `IdentityRedirectManager` throws an `System.InvalidOperationException` after calling `RedirectTo` to ensure that the method wasn't invoked during interactive rendering. This exception and the `[DoesNotReturn]` attributes should now be removed when the MSBuild property is used. For more information, see Migrate from ASP.NET Core in .NET 9 to ASP.NET Core in .NET 10.

### Blazor router has a `NotFoundPage` parameter

Blazor now provides an improved way to display a "Not Found" page when navigating to a non-existent page. You can specify a page to render when `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` (described in the next section) is invoked by passing a page type to the `Router` component using the `NotFoundPage` parameter. The feature supports routing, works across status code pages re-execution middleware, and is compatible even with non-Blazor scenarios.

The `NotFound` render fragment (`<NotFound>...</NotFound>`) isn't supported in .NET 10 or later.

```razor
<Router AppAssembly="@typeof(Program).Assembly" NotFoundPage="typeof(Pages.NotFound)">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" />
        <FocusOnNavigate RouteData="@routeData" Selector="h1" />
    </Found>
    <NotFound>This content is ignored because NotFoundPage is defined.</NotFound>
</Router>
```

The Blazor project template now includes a `NotFound.razor` page by default. This page automatically renders whenever `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` is called in your app, making it easier to handle missing routes with a consistent user experience.

For more information, see ASP.NET Core Blazor navigation.

### Not Found responses using `NavigationManager` for static SSR and global interactive rendering

The `Microsoft.AspNetCore.Components.NavigationManager` now includes a `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` method to handle scenarios where a requested resource isn't found during static server-side rendering (static SSR) or global interactive rendering:

* **Static server-side rendering (static SSR)**: Calling `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` sets the HTTP status code to 404.

* **Interactive rendering**: Signals the Blazor router (`Router` component) to render Not Found content.

* **Streaming rendering**: If enhanced navigation is active, streaming rendering renders Not Found content without reloading the page. When enhanced navigation is blocked, the framework redirects to Not Found content with a page refresh.

Streaming rendering can only render components that have a route, such as a `NotFoundPage` assignment (`NotFoundPage="..."`) or a status code pages re-execution middleware page assignment (`Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute*`). `DefaultNotFound` 404 content ("`Not found`" plain text) doesn't have a route, so it can't be used during streaming rendering.

`Microsoft.AspNetCore.Components.NavigationManager.NotFound*` content rendering uses the following, regardless if the response has started or not (in order):

* If `Microsoft.AspNetCore.Components.Routing.NotFoundEventArgs.Path` is set, render the contents of the assigned page.
* If `Router.NotFoundPage` is set, render the assigned page.
* A status code pages re-execution middleware page, if configured.
* No action if none of the preceding approaches are adopted.

Status code pages re-execution middleware with `Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute*` takes precedence for browser-based address routing problems, such as an incorrect URL typed into the browser's address bar or selecting a link that has no endpoint in the app.

You can use the `Microsoft.AspNetCore.Components.NavigationManager.OnNotFound*` event for notifications when `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` is invoked.

For more information and examples, see ASP.NET Core Blazor navigation.
