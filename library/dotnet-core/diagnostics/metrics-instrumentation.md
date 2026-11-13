---
title: "Creating Metrics (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/metrics-instrumentation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Creating metrics

**This article applies to: ✔️** .NET Core 6 and later versions **✔️** .NET Framework 4.6.1 and later versions

.NET applications can be instrumented using the `System.Diagnostics.Metrics` APIs to track
important metrics. Some metrics are included in standard .NET libraries, but you may want to add new custom metrics that are relevant for
your applications and libraries. In this tutorial, you will add new metrics and understand what types of metrics are available.

> **Note:**
> .NET has some older metric APIs, namely EventCounters and `System.Diagnostics.PerformanceCounter`,
> that are not covered here. To learn more about these alternatives, see Compare metric APIs.

## Create a custom metric

**Prerequisites**: .NET Core 6 SDK or a later version

Create a new console application that references the System.Diagnostics.DiagnosticSource NuGet package
version 8 or greater. Applications that target .NET 8+ include this reference by default. Then, update the code in `Program.cs` to match:

```dotnetcli
> dotnet new console
> dotnet package add System.Diagnostics.DiagnosticSource
```

(If you're using an SDK version of .NET 9 or earlier, use the `dotnet add package` form instead.)

```csharp
using System;
using System.Diagnostics.Metrics;
using System.Threading;

class Program
{
    static Meter s_meter = new Meter("HatCo.Store");
    static Counter<int> s_hatsSold = s_meter.CreateCounter<int>("hatco.store.hats_sold");

    static void Main(string[] args)
    {
        Console.WriteLine("Press any key to exit");
        while(!Console.KeyAvailable)
        {
            // Pretend our store has a transaction each second that sells 4 hats
            Thread.Sleep(1000);
            s_hatsSold.Add(4);
        }
    }
}
```

The `System.Diagnostics.Metrics.Meter` type is the entry point for a library to create a named group of instruments. Instruments
record the numeric measurements that are needed to calculate metrics. Here we used `System.Diagnostics.Metrics.Meter.CreateCounter*` to create a Counter
instrument named "hatco.store.hats_sold". During each pretend transaction, the code calls `System.Diagnostics.Metrics.Counter`1.Add*` to record the measurement of hats
that were sold, 4 in this case. The "hatco.store.hats_sold" instrument implicitly defines some metrics that could be computed from these measurements, such as the total number
of hats sold or hats sold/sec. Ultimately it is up to metric collection tools to determine which metrics to compute and how to perform those computations, but each
instrument has some default conventions that convey the developer's intent. For Counter instruments, the convention is that collection tools show the total count and/or
the rate at which the count is increasing.

The generic parameter `int` on `Counter<int>` and `CreateCounter<int>(...)` defines that this counter must be able to store values up to `System.Int32.MaxValue`. You can use
any of `byte`, `short`, `int`, `long`, `float`, `double`, or `decimal` depending on the size of data you need to store and whether fractional values are needed.

Run the app and leave it running for now. We will view the metrics next.

```dotnetcli
> dotnet run
Press any key to exit
```

### Best practices

- For code that is not designed for use in a Dependency Injection (DI) container, create the Meter once and store it in a static variable. For usage in DI-aware libraries static variables are
considered an anti-pattern and the DI example below shows a more idiomatic approach. Each library or library subcomponent can
(and often should) create its own `System.Diagnostics.Metrics.Meter`. Consider creating a new Meter rather than reusing an existing one if you anticipate
app developers would appreciate being able to easily enable and disable the groups of metrics separately.

- The name passed to the `System.Diagnostics.Metrics.Meter` constructor should be unique to distinguish it from other Meters. We recommend
OpenTelemetry naming guidelines,
which use dotted hierarchical names. Assembly names or namespace names for code being instrumented are usually a good choice. If an assembly adds instrumentation
for code in a second, independent assembly, the name should be based on the assembly that defines the Meter, not the assembly whose code is being instrumented.

- .NET doesn't enforce any naming scheme for Instruments, but we recommend following
OpenTelemetry naming guidelines, which use lowercase dotted hierarchical names
and an underscore ('_') as the separator between multiple words in the same element. Not all metric tools preserve the Meter name as part of the final metric name, so it's beneficial
to make the instrument name globally unique on its own.

  Example instrument names:

  - `contoso.ticket_queue.duration`
  - `contoso.reserved_tickets`
  - `contoso.purchased_tickets`

- The APIs to create instruments and record measurements are thread-safe. In .NET libraries, most instance methods require synchronization when
invoked on the same object from multiple threads, but that's not needed in this case.

- The Instrument APIs to record measurements (`System.Diagnostics.Metrics.Counter`1.Add*` in this example) typically run in <10 ns when no data is being
collected, or tens to hundreds of nanoseconds when measurements are being collected by a high-performance collection library or tool. This allows these APIs to be used liberally
in most cases, but take care for code that is extremely performance sensitive.

### View the new metric

There are many options to store and view metrics. This tutorial uses the dotnet-counters tool, which is useful for ad-hoc analysis. You can also see
the metrics collection tutorial for other alternatives. If the dotnet-counters tool is not already installed, use the SDK
to install it:

```dotnetcli
> dotnet tool update -g dotnet-counters
You can invoke the tool using the following command: dotnet-counters
Tool 'dotnet-counters' (version '7.0.430602') was successfully installed.
```

While the example app is still running, use dotnet-counters to monitor the new counter:

```dotnetcli
> dotnet-counters monitor -n metric-demo.exe --counters HatCo.Store
Press p to pause, r to resume, q to quit.
    Status: Running

[HatCo.Store]
    hatco.store.hats_sold (Count / 1 sec)                          4
```

As expected, you can see that HatCo store is steadily selling 4 hats each second.

## Get a Meter via dependency injection

In the previous example, the Meter was obtained by constructing it with `new` and assigning it to a static field. Using statics this way is not a good approach when using dependency
injection (DI). In code that uses DI, such as ASP.NET Core or apps with Generic Host, create the Meter object using
`System.Diagnostics.Metrics.IMeterFactory`. Starting in .NET 8, hosts will automatically register `System.Diagnostics.Metrics.IMeterFactory` in the service container
or you can manually register the type in any `Microsoft.Extensions.DependencyInjection.IServiceCollection` by calling `Microsoft.Extensions.DependencyInjection.MetricsServiceExtensions.AddMetrics*`.
The meter factory integrates metrics with DI, keeping Meters in different service collections isolated from each other even if they use an identical name. This is
especially useful for testing so that multiple tests running in parallel only observe measurements produced from within the same test case.

To obtain a Meter in a type designed for DI, add an `System.Diagnostics.Metrics.IMeterFactory` parameter to the constructor, then call
`System.Diagnostics.Metrics.MeterFactoryExtensions.Create*`. This example shows using IMeterFactory in an ASP.NET Core app.

Define a type to hold the instruments:

```cs
public class HatCoMetrics
{
    private readonly Counter<int> _hatsSold;

    public HatCoMetrics(IMeterFactory meterFactory)
    {
        var meter = meterFactory.Create("HatCo.Store");
        _hatsSold = meter.CreateCounter<int>("hatco.store.hats_sold");
    }

    public void HatsSold(int quantity)
    {
        _hatsSold.Add(quantity);
    }
}
```

Register the type with DI container in `Program.cs`.

```cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<HatCoMetrics>();
```

Inject the metrics type and record values where needed. Because the metrics type is registered in DI, it can be used with MVC controllers, minimal APIs, or any other type that is created by DI:

```cs
app.MapPost("/complete-sale", ([FromBody] SaleModel model, HatCoMetrics metrics) =>
{
    // ... business logic such as saving the sale to a database ...

    metrics.HatsSold(model.QuantitySold);
});
```

### Best practices

- `System.Diagnostics.Metrics.Meter` implements IDisposable, but IMeterFactory automatically manages the lifetime of any `Meter` objects it
  creates, disposing them when the DI container is disposed. It's unnecessary to add extra code to invoke `Dispose()` on the `Meter`, and it won't have any effect.
