---
title: "Integrate ASP.NET Core Razor components with MVC or Razor Pages in hosted Blazor WebAssembly solutions (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/integration-hosted-webassembly.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Integrate ASP.NET Core Razor components with MVC or Razor Pages in hosted Blazor WebAssembly solutions (part 2 of 2)

## Render components in a page or view with the Component Tag Helper

After configuring the solution, including the additional configuration, the Component Tag Helper supports two render modes for rendering a component from a Blazor WebAssembly app in a page or view:

* `Microsoft.AspNetCore.Mvc.Rendering.RenderMode.WebAssembly`
* `Microsoft.AspNetCore.Mvc.Rendering.RenderMode.WebAssemblyPrerendered`

In the following Razor Pages example, the `Counter` component is rendered in a page. To make the component interactive, the Blazor WebAssembly script is included in the page's render section. To avoid using the full namespace for the `Counter` component with the Component Tag Helper (`{ASSEMBLY NAME}.Pages.Counter`), add an `@using` directive for the client project's `Pages` namespace. In the following example, the **:::no-loc text="Client":::** project's namespace is `BlazorHosted.Client`.

In the **:::no-loc text="Server":::** project, `Pages/RazorPagesCounter1.cshtml`:

```cshtml
@page
@using BlazorHosted.Client.Pages

<component type="typeof(Counter)" render-mode="WebAssemblyPrerendered" />

@section Scripts {
    <script src="_framework/blazor.webassembly.js"></script>
}
```

Run the **:::no-loc text="Server":::** project. Navigate to the Razor page at `/razorpagescounter1`. The prerendered `Counter` component is embedded in the page.

`Microsoft.AspNetCore.Mvc.Rendering.RenderMode` configures whether the component:

* Is prerendered into the page.
* Is rendered as static HTML on the page or if it includes the necessary information to bootstrap a Blazor app from the user agent.

For more information on the Component Tag Helper, including passing parameters and `Microsoft.AspNetCore.Mvc.Rendering.RenderMode` configuration, see Component Tag Helper in ASP.NET Core.

Additional work might be required depending on the static resources that components use and how layout pages are organized in an app. Typically, scripts are added to a page or view's `Scripts` render section and stylesheets are added to the layout's `<head>` element content.

### Set child content through a render fragment

The Component Tag Helper doesn't support receiving a `RenderFragment` delegate for child content (for example, `param-ChildContent="..."`). We recommend creating a Razor component (`.razor`) that references the component you want to render with the child content you want to pass and then invoke the Razor component from the page or view.

### Ensure that top-level prerendered components aren't trimmed out on publish

If a Component Tag Helper directly references a component from a library that's subject to trimming on publish, the component might be trimmed out during publish because there are no references to it from client-side app code. As a result, the component isn't prerendered, leaving a blank spot in the output. If this occurs, instruct the trimmer to preserve the library component by adding a `DynamicDependency` attribute to any class in the client-side app. To preserve a component called `SomeLibraryComponentToBePreserved`, add the following to any component:

```razor
@using System.Diagnostics.CodeAnalysis
@attribute [DynamicDependency(DynamicallyAccessedMemberTypes.All, 
    typeof(SomeLibraryComponentToBePreserved))]
```

The preceding approach usually isn't required because the app usually prerenders its components (which are not trimmed), which in turn references components from libraries (causing them also not to be trimmed). Only use `DynamicDependency` explicitly for prerendering a library component directly when the library is subject to trimming.

## Render components in a page or view with a CSS selector

After configuring the solution, including the additional configuration, add root components to the **:::no-loc text="Client":::** project of a hosted Blazor WebAssembly solution in the `Program.cs` file. In the following example, the `Counter` component is declared as a root component with a CSS selector that selects the element with the `id` that matches `counter-component`. In the following example, the **:::no-loc text="Client":::** project's namespace is `BlazorHosted.Client`.

In `Program.cs` file of the **:::no-loc text="Client":::** project, add the namespace for the project's Razor components to the top of the file:

```csharp
using BlazorHosted.Client.Pages;
```

After the `builder` is established in `Program.cs`, add the `Counter` component as a root component:

```csharp
builder.RootComponents.Add<Counter>("#counter-component");
```

In the following Razor Pages example, the `Counter` component is rendered in a page. To make the component interactive, the Blazor WebAssembly script is included in the page's render section.

In the **:::no-loc text="Server":::** project, `Pages/RazorPagesCounter2.cshtml`:

```cshtml
@page

<div id="counter-component">Loading...</div>

@section Scripts {
    <script src="_framework/blazor.webassembly.js"></script>
}
```

Run the **:::no-loc text="Server":::** project. Navigate to the Razor page at `/razorpagescounter2`. The prerendered `Counter` component is embedded in the page.

Additional work might be required depending on the static resources that components use and how layout pages are organized in an app. Typically, scripts are added to a page or view's `Scripts` render section and stylesheets are added to the layout's `<head>` element content.

> **Note:**
> The preceding example throws a `Microsoft.JSInterop.JSException` if a Blazor WebAssembly app is prerendered and integrated into a Razor Pages or MVC app **simultaneously** with the use of a CSS selector. Navigating to one of the **:::no-loc text="Client":::** project's Razor components or navigating to a page or view of the **:::no-loc text="Server":::** with an embedded component throws one or more `Microsoft.JSInterop.JSException`.
>
> This is normal behavior because prerendering and integrating a Blazor WebAssembly app with routable Razor components is incompatible with the use of CSS selectors.
>
> If you've been working with the examples in the preceding sections and just wish to see the CSS selector work in your sample app, comment out the specification of the `App` root component of the **:::no-loc text="Client":::** project's `Program.cs` file:
>
> ```diff
> - builder.RootComponents.Add<App>("#app");
> + //builder.RootComponents.Add<App>("#app");
> ```
>
> Navigate to the page or view with the embedded Razor component that uses a CSS selector (for example, `/razorpagescounter2` of the preceding example). The page or view loads with the embedded component, and the embedded component functions as expected.

## Persist prerendered state

Without persisting prerendered state, state used during prerendering is lost and must be recreated when the app is fully loaded. If any state is setup asynchronously, the UI may flicker as the prerendered UI is replaced with temporary placeholders and then fully rendered again.

To persist state for prerendered components, use the Persist Component State Tag Helper (reference source). Add the Tag Helper's tag, `<persist-component-state />`, inside the closing `</body>` tag of the `_Host` page in an app that prerenders components.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

In `Pages/_Host.cshtml` of Blazor apps that are WebAssembly prerendered (`WebAssemblyPrerendered`) in a hosted Blazor WebAssembly app:

```cshtml
<body>
    ...

    <persist-component-state />
</body>
```

Decide what state to persist using the `Microsoft.AspNetCore.Components.PersistentComponentState` service. `Microsoft.AspNetCore.Components.PersistentComponentState.RegisterOnPersisting*` registers a callback to persist the component state before the app is paused. The state is retrieved when the application resumes. Make the call at the end of initialization code in order to avoid a potential race condition during app shutdown.

In the following example:

* The `{TYPE}` placeholder represents the type of data to persist (for example, `WeatherForecast[]`).
* The `{TOKEN}` placeholder is a state identifier string (for example, `fetchdata`).

```razor
@implements IDisposable
@inject PersistentComponentState ApplicationState

...

@code {
    private {TYPE} data;
    private PersistingComponentStateSubscription persistingSubscription;

    protected override async Task OnInitializedAsync()
    {
        if (!ApplicationState.TryTakeFromJson<{TYPE}>(
            "<example-value>", out var restored))
        {
            data = await ...;
        }
        else
        {
            data = restored!;
        }

        // Call at the end to avoid a potential race condition at app shutdown
        persistingSubscription = ApplicationState.RegisterOnPersisting(PersistData);
    }

    private Task PersistData()
    {
        ApplicationState.PersistAsJson("<example-value>", data);

        return Task.CompletedTask;
    }

    void IDisposable.Dispose()
    {
        persistingSubscription.Dispose();
    }
}
```

The following example is an updated version of the `FetchData` component in a hosted Blazor WebAssembly app based on the Blazor project template. The `WeatherForecastPreserveState` component persists weather forecast state during prerendering and then retrieves the state to initialize the component. The Persist Component State Tag Helper persists the component state after all component invocations.

`Pages/WeatherForecastPreserveState.razor`:

```razor
@page "/weather-forecast-preserve-state"
@using BlazorSample.Shared
@implements IDisposable
@inject IWeatherForecastService WeatherForecastService
@inject PersistentComponentState ApplicationState

<PageTitle>Weather Forecast</PageTitle>

<h1>Weather forecast</h1>

<p>This component demonstrates fetching data from the server.</p>

@if (forecasts == null)
{
    <p><em>Loading...</em></p>
}
else
{
    <table class="table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Temp. (C)</th>
                <th>Temp. (F)</th>
                <th>Summary</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var forecast in forecasts)
            {
                <tr>
                    <td>@forecast.Date.ToShortDateString()</td>
                    <td>@forecast.TemperatureC</td>
                    <td>@forecast.TemperatureF</td>
                    <td>@forecast.Summary</td>
                </tr>
            }
        </tbody>
    </table>
}

@code {
    private WeatherForecast[] forecasts = Array.Empty<WeatherForecast>();
    private PersistingComponentStateSubscription persistingSubscription;

    protected override async Task OnInitializedAsync()
    {
        if (!ApplicationState.TryTakeFromJson<WeatherForecast[]>(
            nameof(forecasts), out var restored))
        {
            forecasts = await WeatherForecastService.GetForecastAsync(
                DateOnly.FromDateTime(DateTime.Now));
        }
        else
        {
            forecasts = restored!;
        }

        // Call at the end to avoid a potential race condition at app shutdown
        persistingSubscription = ApplicationState.RegisterOnPersisting(PersistData);
    }

    private Task PersistData()
    {
        ApplicationState.PersistAsJson(nameof(forecasts), forecasts);

        return Task.CompletedTask;
    }

    void IDisposable.Dispose()
    {
        persistingSubscription.Dispose();
    }
}
```

By initializing components with the same state used during prerendering, any expensive initialization steps are only executed once. The rendered UI also matches the prerendered UI, so no flicker occurs in the browser.

The persisted prerendered state is transferred to the client, where it's used to restore the component state. For prerendering in a hosted Blazor WebAssembly app, the data is exposed to the browser and must not contain sensitive, private information.

## Additional Blazor WebAssembly resources

* Prerendering support with assembly lazy loading
* Razor component lifecycle subjects that pertain to prerendering
  * Component initialization (`OnInitialized{Async}`)
  * After component render (`OnAfterRender{Async}`)
  * Stateful reconnection after prerendering: Although the content in the section focuses on Blazor Server and stateful SignalR *reconnection*, the scenario for prerendering in hosted Blazor WebAssembly apps (`Microsoft.AspNetCore.Mvc.Rendering.RenderMode.WebAssemblyPrerendered`) involves similar conditions and approaches to prevent executing developer code twice. To preserve state during the execution of initialization code while prerendering, see *Persist prerendered state* section of this article.
  * Prerendering with JavaScript interop
* Authentication and authorization subjects that pertain to prerendering
  * General aspects
  * Prerendering with authentication in hosted Blazor WebAssembly apps
* Host and deploy ASP.NET Core Blazor WebAssembly
* Handle errors: Prerendering
* `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` is executed *twice* when prerendering: Handle asynchronous navigation events with `OnNavigateAsync`
