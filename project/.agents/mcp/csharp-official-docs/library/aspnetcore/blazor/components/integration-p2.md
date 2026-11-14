---
title: "Integrate ASP.NET Core Razor components with MVC or Razor Pages (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/components/integration.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Integrate ASP.NET Core Razor components with MVC or Razor Pages (part 2 of 2)

## Persist prerendered state

Without persisting prerendered state, state used during prerendering is lost and must be recreated when the app is fully loaded. If any state is setup asynchronously, the UI may flicker as the prerendered UI is replaced with temporary placeholders and then fully rendered again.

To persist state for prerendered components, use the Persist Component State Tag Helper (reference source). Add the Tag Helper's tag, `<persist-component-state />`, inside the closing `</body>` tag of the `_Host` page in an app that prerenders components.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

In `Pages/_Host.cshtml` of Blazor apps that are `ServerPrerendered` in a Blazor Server app:

```cshtml
<body>
    ...

    <persist-component-state />
</body>
```

Decide what state to persist using the `Microsoft.AspNetCore.Components.PersistentComponentState` service. The `[PersistentState]` attribute applied to a `public` property registers a callback to persist the state during prerendering and loads it when the component renders interactively or the service is instantiated.

In the following example, the `{TYPE}` placeholder represents the type of data to persist (for example, `WeatherForecast[]`).

```razor
@code {
    [PersistentState]
    public {TYPE} Data { get; set; }

    protected override async Task OnInitializedAsync()
    {
        Data ??= await ...;
    }
}
```

In the following example, the `WeatherForecastPreserveState` component persists weather forecast state during prerendering and then retrieves the state to initialize the component. The Persist Component State Tag Helper persists the component state after all component invocations.

`WeatherForecastPreserveState.razor`:

```razor
@page "/weather-forecast-preserve-state"
@using BlazorSample.Shared
@inject IWeatherForecastService WeatherForecastService

<PageTitle>Weather Forecast</PageTitle>

<h1>Weather forecast</h1>

<p>This component demonstrates fetching data from the server.</p>

@if (Forecasts == null)
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
            @foreach (var forecast in Forecasts)
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
    [PersistentState]
    public WeatherForecast[]? Forecasts { get; set; }

    protected override async Task OnInitializedAsync()
    {
        Forecasts ??= await WeatherForecastService.GetForecastAsync(
            DateOnly.FromDateTime(DateTime.Now));
    }
}
```

By initializing components with the same state used during prerendering, any expensive initialization steps are only executed once. The rendered UI also matches the prerendered UI, so no flicker occurs in the browser.

The persisted prerendered state is transferred to the client, where it's used to restore the component state. ASP.NET Core Data Protection ensures that the data is transferred securely in Blazor Server apps.

## Prerendered state size and SignalR message size limit

A large prerendered state size may exceed Blazor's SignalR circuit message size limit, which results in the following:

* The SignalR circuit fails to initialize with an error on the client: :::no-loc text="Circuit host not initialized.":::
* The reconnection UI on the client appears when the circuit fails. Recovery isn't possible.

To resolve the problem, use ***either*** of the following approaches:

* Reduce the amount of data that you are putting into the prerendered state.
* Increase the SignalR message size limit. ***WARNING***: Increasing the limit may increase the risk of Denial of Service (DoS) attacks.

## Additional Blazor Server resources

* State management: Protected browser storage: Handle prerendering
* Razor component lifecycle subjects that pertain to prerendering
  * Component initialization (`OnInitialized{Async}`)
  * After component render (`OnAfterRender{Async}`)
  * Stateful reconnection after prerendering
  * Prerendering with JavaScript interop
* Authentication and authorization: General aspects
* Handle Errors: Prerendering
* Host and deploy ASP.NET Core server-side Blazor apps
* Threat mitigation: Cross-site scripting (XSS)
* `Microsoft.AspNetCore.Components.Routing.Router.OnNavigateAsync` is executed *twice* when prerendering: Handle asynchronous navigation events with `OnNavigateAsync`
