---
title: "blazor (part 4 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-10/includes/blazor.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# blazor (part 4 of 4)

### Persistent component state support for enhanced navigation

Blazor now supports handling persistent component state during enhanced navigation. State persisted during enhanced navigation can be read by interactive components on the page.

By default, persistent component state is only loaded by interactive components when they're initially loaded on the page. This prevents important state, such as data in an edited webform, from being overwritten if additional enhanced navigation events to the same page occur after the component is loaded.

If the data is read-only and doesn't change frequently, opt-in to allow updates during enhanced navigation by setting `AllowUpdates = true` on the `[PersistentState]` attribute. This is useful for scenarios such as displaying cached data that's expensive to fetch but doesn't change often. The following example demonstrates the use of `AllowUpdates` for weather forecast data:

```csharp
[PersistentState(AllowUpdates = true)]
public WeatherForecast[]? Forecasts { get; set; }

protected override async Task OnInitializedAsync()
{
    Forecasts ??= await ForecastService.GetForecastAsync();
}
```

To skip restoring state during prerendering, set `RestoreBehavior` to `SkipInitialValue`:

```csharp
[PersistentState(RestoreBehavior = RestoreBehavior.SkipInitialValue)]
public string NoPrerenderedData { get; set; }
```

To skip restoring state during reconnection, set `RestoreBehavior` to `SkipLastSnapshot`. This can be useful to ensure fresh data after reconnection:

```csharp
[PersistentState(RestoreBehavior = RestoreBehavior.SkipLastSnapshot)]
public int CounterNotRestoredOnReconnect { get; set; }
```

Call `PersistentComponentState.RegisterOnRestoring` to register a callback for imperatively controlling how state is restored, similar to how `Microsoft.AspNetCore.Components.PersistentComponentState.RegisterOnPersisting*` provides full control of how state is persisted.

### Blazor WebAssembly respects the current UI culture setting

In .NET 9 or earlier, standalone Blazor WebAssembly apps load UI globalization resources based on `System.Globalization.CultureInfo.DefaultThreadCurrentCulture`. If you want to additionally load globalization data for your localization culture defined by `System.Globalization.CultureInfo.DefaultThreadCurrentUICulture`, upgrade the app to .NET 10 or later.
