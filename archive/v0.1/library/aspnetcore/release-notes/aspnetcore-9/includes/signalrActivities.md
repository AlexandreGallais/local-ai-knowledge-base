---
title: "signalrActivities"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-9/includes/signalrActivities.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# signalrActivities

### Improved Activities for SignalR

SignalR now has an ActivitySource for both the hub server and client.

#### .NET SignalR server ActivitySource

The SignalR ActivitySource named `Microsoft.AspNetCore.SignalR.Server` emits events for hub method calls:

* Every method is its own activity, so anything that emits an activity during the hub method call is under the hub method activity.
* Hub method activities don't have a parent. This means they are not bundled under the long-running SignalR connection.

The following example uses the Aspire dashboard and the OpenTelemetry packages:

```xml
<PackageReference Include="OpenTelemetry.Exporter.OpenTelemetryProtocol" Version="1.9.0" />
<PackageReference Include="OpenTelemetry.Extensions.Hosting" Version="1.9.0" />
<PackageReference Include="OpenTelemetry.Instrumentation.AspNetCore" Version="1.9.0" />
```

Add the following startup code to the `Program.cs` file:

```csharp
using OpenTelemetry.Trace;
using SignalRChat.Hubs;

// Set OTEL_EXPORTER_OTLP_ENDPOINT environment variable depending on where your OTEL endpoint is.
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddSignalR();

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing =>
    {
        if (builder.Environment.IsDevelopment())
        {
            // View all traces only in development environment.
            tracing.SetSampler(new AlwaysOnSampler());
        }

        tracing.AddAspNetCoreInstrumentation();
        tracing.AddSource("Microsoft.AspNetCore.SignalR.Server");
    });

builder.Services.ConfigureOpenTelemetryTracerProvider(tracing => tracing.AddOtlpExporter());

var app = builder.Build();
```

The following is example output from the Aspire Dashboard:

#### .NET SignalR client ActivitySource

The SignalR ActivitySource named `Microsoft.AspNetCore.SignalR.Client` emits events for a SignalR client:

* The .NET SignalR client has an `ActivitySource` named `Microsoft.AspNetCore.SignalR.Client`. Hub invocations now create a client span. Note that other SignalR clients, such as the JavaScript client, don't support tracing. This feature will be added to more clients in future releases.
* Hub invocations on the client and server support context propagation. Propagating the trace context enables true distributed tracing. It's now possible to see invocations flow from the client to the server and back.

Here's how these new activities look in the Aspire dashboard:
