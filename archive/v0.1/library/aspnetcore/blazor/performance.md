---
title: "ASP.NET Core Blazor performance best practices"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/performance/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor performance best practices

-->
-->

Blazor is optimized for high performance in most realistic application UI scenarios. However, the best performance depends on developers adopting the correct patterns and features.

> **Note:**
> The code examples in this node of articles adopt nullable reference types (NRTs) and .NET compiler null-state static analysis, which are supported in ASP.NET Core in .NET 6 or later.

## Ahead-of-time (AOT) compilation

Ahead-of-time (AOT) compilation compiles a Blazor app's .NET code directly into native WebAssembly for direct execution by the browser. AOT-compiled apps result in larger apps that take longer to download, but AOT-compiled apps usually provide better runtime performance, especially for apps that execute CPU-intensive tasks. For more information, see ASP.NET Core Blazor WebAssembly build tools and ahead-of-time (AOT) compilation.

## Metrics and tracing

Metrics and tracing capabilities help you monitor and diagnose app performance, track user interactions, and understand component behavior in production environments.

### Configuration

To enable Blazor metrics and tracing in your app, configure OpenTelemetry with the following meters and activity sources in the app's `Program` file where services are registered:

```csharp
builder.Services.ConfigureOpenTelemetryMeterProvider(meterProvider =>
{
    meterProvider.AddMeter("Microsoft.AspNetCore.Components");
    meterProvider.AddMeter("Microsoft.AspNetCore.Components.Lifecycle");
    meterProvider.AddMeter("Microsoft.AspNetCore.Components.Server.Circuits");
});

builder.Services.ConfigureOpenTelemetryTracerProvider(tracerProvider =>
{
    tracerProvider.AddSource("Microsoft.AspNetCore.Components");
    tracerProvider.AddSource("Microsoft.AspNetCore.Components.Server.Circuits");
});
```

### Performance meters

For more information on the following performance meters, see ASP.NET Core built-in Blazor (Razor components) metrics and ASP.NET Core built-in metrics.

`Microsoft.AspNetCore.Components` meter:

* `aspnetcore.components.navigate`: Tracks the total number of route changes in the app.
* `aspnetcore.components.handle_event.duration`: Measures the duration of processing browser events, including business logic.

`Microsoft.AspNetCore.Components.Lifecycle` meter:

* `aspnetcore.components.update_parameters.duration`: Measures the duration of processing component parameters, including business logic.
* `aspnetcore.components.render_diff.duration`: Tracks the duration of rendering batches.
* `aspnetcore.components.render_diff.size`: Tracks the size of rendering batches.

`Microsoft.AspNetCore.Components.Server.Circuits` meter:

In server-side Blazor apps, additional circuit-specific metrics include:

* `aspnetcore.components.circuit.active`: Shows the number of active circuits currently in memory.
* `aspnetcore.components.circuit.connected`: Tracks the number of circuits connected to clients.
* `aspnetcore.components.circuit.duration`: Measures circuit lifetime duration and provides total circuit count.

### Blazor tracing

For more information on the following tracing activities, see ASP.NET Core built-in Blazor (Razor components) metrics and ASP.NET Core built-in metrics.

The new activity tracing capabilities use the `Microsoft.AspNetCore.Components` and `Microsoft.AspNetCore.Components.Server.Circuits` activity sources and provide three main types of tracing activities: circuit lifecycle, navigation, and event handling.

Circuit lifecycle tracing:

`Microsoft.AspNetCore.Components.Server.Circuits.StartCircuit`: Traces circuit initialization with the format `Circuit {circuitId}`.

Tags:

* `aspnetcore.components.circuit.id`: Unique circuit identifier.
* `error.type`: Exception type full name (optional)

Links:

* HTTP trace
* SignalR trace

Usage: Links other Blazor traces of the same session/circuit to HTTP and SignalR contexts.

Navigation tracing:

`Microsoft.AspNetCore.Components.Navigate`: Tracks route changes with the format `Route {route} -> {componentType}`.

Tags:

* `aspnetcore.components.route`: URL path pattern of the page.
* `aspnetcore.components.type`: Class name of the Razor component.
* `error.type`: Exception type full name (optional).

Links:

* HTTP trace
* SignalR trace
* Circuit trace

Usage: Which Blazor pages this session visited?

Event handling tracing:

`Microsoft.AspNetCore.Components.HandleEvent`: Traces event handling with the format `Event {attributeName} -> {componentType}.{methodName}`.

Tags:

* `aspnetcore.components.attribute.name`: Name of the HTML attribute that triggers the event (example: `onClick`).
* `code.function.name`: C# method name of the handler.
* `aspnetcore.components.type`: Full name of target C# component that receives the event.
* `error.type`: Exception type full name (optional).

Links:

* Circuit trace
* Route trace

Usages:

* Click to which component caused exception and on which page?
* In which linked circuit and with what HTTP context it happened?
