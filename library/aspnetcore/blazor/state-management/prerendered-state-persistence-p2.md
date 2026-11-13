---
title: "ASP.NET Core Blazor prerendered state persistence (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/state-management/prerendered-state-persistence.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor prerendered state persistence (part 2 of 2)

## Use the `PersistentComponentState` service directly instead of the declarative model

As an alternative to using the declarative model for persisting state with the `[PersistentState]` attribute, you can use the `Microsoft.AspNetCore.Components.PersistentComponentState` service directly, which offers greater flexibility for complex state persistence scenarios. Call `Microsoft.AspNetCore.Components.PersistentComponentState.RegisterOnPersisting*` to register a callback to persist the component state during prerendering. The state is retrieved when the component renders interactively. Make the call at the end of initialization code in order to avoid a potential race condition during app shutdown.

The following counter component example persists counter state during prerendering and retrieves the state to initialize the component.

`PrerenderedCounter3.razor`:

```razor
@page "/prerendered-counter-3"
@implements IDisposable
@inject ILogger<PrerenderedCounter3> Logger
@inject PersistentComponentState ApplicationState

<PageTitle>Prerendered Counter 3</PageTitle>

<h1>Prerendered Counter 3</h1>

<p role="status">Current count: @currentCount</p>

<button class="btn btn-primary" @onclick="IncrementCount">Click me</button>

@code {
    private int currentCount;
    private PersistingComponentStateSubscription persistingSubscription;

    protected override void OnInitialized()
    {
        if (!ApplicationState.TryTakeFromJson<int>(
            nameof(currentCount), out var restoredCount))
        {
            currentCount = Random.Shared.Next(100);
            Logger.LogInformation("currentCount set to {Count}", currentCount);
        }
        else
        {
            currentCount = restoredCount!;
            Logger.LogInformation("currentCount restored to {Count}", currentCount);
        }

        // Call at the end to avoid a potential race condition at app shutdown
        persistingSubscription = ApplicationState.RegisterOnPersisting(PersistCount);
    }

    private Task PersistCount()
    {
        ApplicationState.PersistAsJson(nameof(currentCount), currentCount);

        return Task.CompletedTask;
    }

    private void IncrementCount() => currentCount++;

    void IDisposable.Dispose() => persistingSubscription.Dispose();
}
```

When the component executes, `currentCount` is only set once during prerendering. The value is restored when the component is rerendered. The following is example output.

> **Note:**
> If the app adopts interactive routing and the page is reached via an internal enhanced navigation, prerendering doesn't occur. Therefore, you must perform a full page reload for the component to see the following output. For more information, see the Interactive routing and prerendering section.

> :::no-loc text="info: BlazorSample.Components.Pages.PrerenderedCounter3[0]":::
> :::no-loc text="      currentCount set to 96":::
> :::no-loc text="info: BlazorSample.Components.Pages.PrerenderedCounter3[0]":::
> :::no-loc text="      currentCount restored to 96":::

## Serialization extensibility for persistent component state

Implement a custom serializer with `Microsoft.AspNetCore.Components.PersistentComponentStateSerializer`1`. Without a registered custom serializer, serialization falls back to the existing JSON serialization.

The following example creates a custom serializer for `int?` types that uses a custom format to demonstrate serialization extensibility. The serializer prefixes integer values with "`CUSTOM:`" to clearly distinguish them from JSON serialization.

The serializer executes on nullable and non-nullable types *independently*, so the following serializer doesn't execute on `int` types, only nullable integer types (`int?`) are processed.

Logging in the following example is for demonstration purposes and isn't normally implemented in a production app.

`CustomIntSerializer.cs`:

```csharp
using System;
using System.Buffers;
using System.Text;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.Logging;

namespace BlazorSample;

public class CustomIntSerializer(ILogger<CustomIntSerializer> logger) 
    : PersistentComponentStateSerializer<int?>
{
    public override void Persist(int? value, IBufferWriter<byte> writer)
    {
        string customFormat = 
            value is not null ? $"CUSTOM:{value}" : $"CUSTOM:null";

        logger.LogInformation(
            "Persisting value {Value} with custom format: {CustomFormat}", value, 
            customFormat);

        byte[] bytes = Encoding.UTF8.GetBytes(customFormat);
        writer.Write(bytes);
    }

    public override int? Restore(ReadOnlySequence<byte> data)
    {
        byte[] bytes = data.ToArray();
        string text = Encoding.UTF8.GetString(bytes);

        logger.LogInformation("Restoring value from custom format: {CustomFormat}", 
            text);

        if (text.StartsWith("CUSTOM:", StringComparison.Ordinal))
        {
            var remainingText = text.AsSpan(7);

            if (!remainingText.SequenceEqual("null"))
            {
                if (int.TryParse(remainingText, out int value))
                {
                    return value;
                }
            }
            else
            {
                return null;
            }
        }

        // Fallback to direct parsing if format is unexpected
        return int.TryParse(text, out int fallbackValue) ? fallbackValue : null;
    }
}
```

The custom serializer is registered in the app's `Program` file:

```csharp
builder.Services.AddSingleton<PersistentComponentStateSerializer<int?>, 
    CustomIntSerializer>();
```

The `int?` type is automatically persisted and restored with the custom serializer:

```csharp
[PersistentState]
public int? CurrentCount { get; set; }
```

Using the preceding serializer with the `PrerenderedCounter2` component (`PrerenderedCounter2.razor`) shown in the introduction of this article, output similar to the following is logged.

> **Note:**
> If the app adopts interactive routing and the page is reached via an internal enhanced navigation, prerendering doesn't occur. Therefore, you must perform a full page reload for the component to see the following output. For more information, see the Interactive routing and prerendering section.

> :::no-loc text="info: BlazorSample.Components.Pages.PrerenderedCounter2[0]":::
> :::no-loc text="      CurrentCount set to 49":::
> :::no-loc text="info: BlazorSample.CustomIntSerializer[0]":::
> :::no-loc text="      Persisting value 49 with custom format: CUSTOM:49":::
> :::no-loc text="info: BlazorSample.CustomIntSerializer[0]":::
> :::no-loc text="      Restoring value from custom format: CUSTOM:49":::
> :::no-loc text="info: BlazorSample.Components.Pages.PrerenderedCounter2[0]":::
> :::no-loc text="      CurrentCount restored to 49":::

## Components embedded into pages and views (Razor Pages/MVC)

For components embedded into a page or view of a Razor Pages or MVC app, you must add the Persist Component State Tag Helper with the `<persist-component-state />` HTML tag inside the closing `</body>` tag of the app's layout. **This is only required for Razor Pages and MVC apps.** For more information, see Persist Component State Tag Helper in ASP.NET Core.

`Pages/Shared/_Layout.cshtml`:

```cshtml
<body>
    ...

    <persist-component-state />
</body>
```

## Interactive routing and prerendering

When the `Routes` component doesn't define a render mode, the app is using per-page/component interactivity and navigation. Using per-page/component navigation, internal navigation is handled by enhanced routing after the app becomes interactive. "Internal navigation" in this context means that the URL destination of the navigation event is a Blazor endpoint inside the app.

Blazor supports handling persistent component state during enhanced navigation. State persisted during enhanced navigation can be read by interactive components on the page.

By default, persistent component state is only loaded by interactive components when they're initially loaded on the page. This prevents important state, such as data in an edited webform, from being overwritten if additional enhanced navigation events to the same page occur after the component is loaded.

If the data is read-only and doesn't change frequently, opt-in to allow updates during enhanced navigation by setting `Microsoft.AspNetCore.Components.PersistentStateAttribute.AllowUpdates` to `true` on the `[PersistentState]` attribute. This is useful for scenarios such as displaying cached data that's expensive to fetch but doesn't change often, such as weather forecast data in the following example:

```csharp
[PersistentState(AllowUpdates = true)]
public WeatherForecast[]? Forecasts { get; set; }

protected override async Task OnInitializedAsync()
{
    Forecasts ??= await ForecastService.GetForecastAsync();
}
```

> **Note:**
> `Microsoft.AspNetCore.Components.PersistentStateAttribute.AllowUpdates` doesn't control whether the current property value is captured by circuit state persistence when the circuit pauses, including an automatic pause caused by tab inactivity.

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

Call `Microsoft.AspNetCore.Components.PersistentComponentState.RegisterOnRestoring*` to register a callback for imperatively controlling how state is restored, similar to how `Microsoft.AspNetCore.Components.PersistentComponentState.RegisterOnPersisting*` provides full control of how state is persisted.
