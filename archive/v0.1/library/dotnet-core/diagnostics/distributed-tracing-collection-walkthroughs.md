---
title: "Collect a distributed trace - .NET (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/distributed-tracing-collection-walkthroughs.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Collect a distributed trace

**This article applies to: ✔️** .NET Core 2.1 and later versions **✔️** .NET Framework 4.5 and later versions

Instrumented code can create `System.Diagnostics.Activity` objects as part of a distributed trace, but the information
in these objects needs to be collected into centralized storage so that the entire trace can be
reviewed later. In this tutorial, you will collect the distributed trace telemetry in different ways so that it's
available to diagnose application issues when needed. See
the instrumentation tutorial if you need to add new instrumentation.

## Collect traces using OpenTelemetry

OpenTelemetry is a vendor-neutral open-source project supported by the
Cloud Native Computing Foundation that aims to standardize generating and collecting telemetry for
cloud-native software. In these examples, you'll collect and display distributed trace information on the console. To learn how to
configure OpenTelemetry to send information elsewhere, see the
OpenTelemetry getting started guide.

### ASP.NET example

#### Prerequisites

- .NET Core 8.0 SDK or a later version

#### Create an example application

First, create a new ASP.NET web app to use as the demo application.

```dotnetcli
dotnet new webapp
```

This app displays a web page, but no distributed tracing information is collected yet
if we browse the web page.

#### Configure collection

To use OpenTelemetry, you need to add references to several NuGet packages.

```dotnetcli
dotnet add package OpenTelemetry
dotnet add package OpenTelemetry.Exporter.Console
dotnet add package OpenTelemetry.Extensions.Hosting
dotnet add package OpenTelemetry.Instrumentation.AspNetCore
```

Next, modify the source code in *Program.cs* so it looks like this:

```csharp
using OpenTelemetry;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddOpenTelemetry()
    .WithTracing(builder =>
    {
        builder.AddAspNetCoreInstrumentation();
        builder.AddConsoleExporter();
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

Run the app and use a web browser to browse to the web page being hosted. Now that you enabled OpenTelemetry distributed
tracing, you should see information about the browser web requests printed to the console:

```
Activity.TraceId:            4510acfc49c6f8a582c6a40004df9a76
Activity.SpanId:             65fe2c5c15f05ed8
Activity.TraceFlags:         Recorded
Activity.ActivitySourceName: Microsoft.AspNetCore
Activity.DisplayName:        GET
Activity.Kind:               Server
Activity.StartTime:          2024-08-27T23:12:58.7837908Z
Activity.Duration:           00:00:00.1297070
Activity.Tags:
    server.address: localhost
    server.port: 5005
    http.request.method: GET
    url.scheme: http
    url.path: /
    network.protocol.version: 1.1
    user_agent.original: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0
    http.response.status_code: 200
Resource associated with Activity:
    telemetry.sdk.name: opentelemetry
    telemetry.sdk.language: dotnet
    telemetry.sdk.version: 1.9.0
    service.name: unknown_service:webapp
```

All of the OpenTelemetry configuration occurs in the new source lines that start with `builder.Services.AddOpenTelemetry()`. You used
`.WithTracing(...)` to enable distributed tracing. `AddAspNetCoreInstrumentation()` enabled OpenTelemetry to collect all the
distributed trace Activities that are produced by the ASP.NET Core web server, and `AddConsoleExporter()` instructs OpenTelemetry
to send that information to the console. For a less trivial app, you could add more instrumentation libraries to also collect
tracing for database queries or outbound HTTP requests. You'd also replace the console exporter with an exporter for Jaeger, Zipken, or
another monitoring service you've chosen to use.

### Console app example

#### Prerequisites

- .NET Core 8.0 SDK or a later version

#### Create an example application

Before any distributed trace telemetry can be collected, you need to produce it. Often this instrumentation is
in libraries, but for simplicity, you'll create a small app that has some example instrumentation using
`System.Diagnostics.ActivitySource.StartActivity*`. At this point, no collection has happened, and
StartActivity() has no side-effect and returns null. See
the instrumentation tutorial for more details.

```dotnetcli
dotnet new console
```

Applications that target .NET 5 and later already have the necessary distributed tracing APIs included. For apps targeting older
.NET versions, add the System.Diagnostics.DiagnosticSource NuGet package
version 5 or greater.

Replace the contents of the generated Program.cs with this example source:

```csharp
using System;
using System.Diagnostics;
using System.Threading.Tasks;

namespace Sample.DistributedTracing
{
    class Program
    {
        static ActivitySource s_source = new ActivitySource("Sample.DistributedTracing");

        static async Task Main(string[] args)
        {
            await DoSomeWork();
            Console.WriteLine("Example work done");
        }

        static async Task DoSomeWork()
        {
            using (Activity? a = s_source.StartActivity("SomeWork"))
            {
                await StepOne();
                await StepTwo();
            }
        }

        static async Task StepOne()
        {
            using (Activity? a = s_source.StartActivity("StepOne"))
            {
                await Task.Delay(500);
            }
        }

        static async Task StepTwo()
        {
            using (Activity? a = s_source.StartActivity("StepTwo"))
            {
                await Task.Delay(1000);
            }
        }
    }
}
```

Running the app does not collect any trace data yet:

```dotnetcli
> dotnet run
Example work done
```

#### Configure collection

Add the OpenTelemetry.Exporter.Console NuGet package.

```dotnetcli
dotnet add package OpenTelemetry.Exporter.Console
```

Update Program.cs with additional OpenTelemetry `using` directives:

```csharp
using OpenTelemetry;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using System;
using System.Diagnostics;
using System.Threading.Tasks;
```

Update `Main()` to create the OpenTelemetry TracerProvider:

```csharp
        public static async Task Main()
        {
            using var tracerProvider = Sdk.CreateTracerProviderBuilder()
                .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("MySample"))
                .AddSource("Sample.DistributedTracing")
                .AddConsoleExporter()
                .Build();

            await DoSomeWork();
            Console.WriteLine("Example work done");
        }
```

Now the app collects distributed trace information and displays it to the console:

```dotnetcli
> dotnet run
Activity.TraceId:            48d7509cc4f06db6f48f2207f19c3918
Activity.SpanId:             406a1de6b5e8192e
Activity.TraceFlags:         Recorded
Activity.ParentSpanId:       345f5f98015b589a
Activity.ActivitySourceName: Sample.DistributedTracing
Activity.DisplayName:        StepOne
Activity.Kind:               Internal
Activity.StartTime:          2024-08-27T23:22:44.9900801Z
Activity.Duration:           00:00:00.5077426
Resource associated with Activity:
    service.name: MySample
    service.instance.id: a87f9e7d-d28c-4a91-9bb3-939a50cac7db
    telemetry.sdk.name: opentelemetry
    telemetry.sdk.language: dotnet
    telemetry.sdk.version: 1.9.0

Activity.TraceId:            48d7509cc4f06db6f48f2207f19c3918
Activity.SpanId:             458fb58342ca127a
Activity.TraceFlags:         Recorded
Activity.ParentSpanId:       345f5f98015b589a
Activity.ActivitySourceName: Sample.DistributedTracing
Activity.DisplayName:        StepTwo
Activity.Kind:               Internal
Activity.StartTime:          2024-08-27T23:22:45.5906581Z
Activity.Duration:           00:00:01.0023729
Resource associated with Activity:
    service.name: MySample
    service.instance.id: a87f9e7d-d28c-4a91-9bb3-939a50cac7db
    telemetry.sdk.name: opentelemetry
    telemetry.sdk.language: dotnet
    telemetry.sdk.version: 1.9.0

Activity.TraceId:            48d7509cc4f06db6f48f2207f19c3918
Activity.SpanId:             345f5f98015b589a
Activity.TraceFlags:         Recorded
Activity.ActivitySourceName: Sample.DistributedTracing
Activity.DisplayName:        SomeWork
Activity.Kind:               Internal
Activity.StartTime:          2024-08-27T23:22:44.9894135Z
Activity.Duration:           00:00:01.6059128
Resource associated with Activity:
    service.name: MySample
    service.instance.id: a87f9e7d-d28c-4a91-9bb3-939a50cac7db
    telemetry.sdk.name: opentelemetry
    telemetry.sdk.language: dotnet
    telemetry.sdk.version: 1.9.0

Example work done
```

##### Sources

In the example code, you invoked `AddSource("Sample.DistributedTracing")` so that OpenTelemetry would
capture the Activities produced by the ActivitySource that was already present in the code:

```csharp
static ActivitySource s_source = new ActivitySource("Sample.DistributedTracing");
```

Telemetry from any ActivitySource can be captured by calling `AddSource()` with the source's name.

##### Exporters

The console exporter is helpful for quick examples or local development but in a production deployment
you will probably want to send traces to a centralized store. OpenTelemetry supports various destinations using different
exporters.
For more information about configuring OpenTelemetry, see the OpenTelemetry getting started guide.

## Collect traces using Application Insights

Distributed tracing telemetry is automatically captured after configuring the Application Insights SDK for
ASP.NET or ASP.NET Core apps,
or by enabling code-less instrumentation.

For more
information, see the Application Insights distributed tracing documentation.

> **Note:**
> Currently, Application Insights only supports collecting specific well-known Activity instrumentation and ignores new user-added Activities. Application Insights offers TrackDependency as a vendor-specific API for adding custom distributed tracing information.
