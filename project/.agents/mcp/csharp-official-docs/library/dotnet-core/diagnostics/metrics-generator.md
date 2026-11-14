---
title: "Compile-time metric source generation"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/metrics-generator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Compile-time metric source generation

.NET's metering infrastructure is designed to deliver a highly usable and high-performance metering solution for modern .NET applications.

To use source-generated metering, create a class that defines the names and dimensions of the metrics your code can produce. Then, create the class with `partial` method signatures.

The source generator automatically generates the code, which exposes strongly typed metering types and methods that you can invoke to record metric values. The generated methods are implemented in a highly efficient form, which reduces computation overhead as compared to traditional metering solutions.

## Get started

To get started, install the 📦 Microsoft.Extensions.Telemetry.Abstractions NuGet package:

### .NET CLI

```dotnetcli
dotnet add package Microsoft.Extensions.Telemetry.Abstractions
```

### PackageReference

```xml
<ItemGroup>
  <PackageReference Include="Microsoft.Extensions.Telemetry.Abstractions"
                    Version="*" />
</ItemGroup>
```

---

For more information, see dotnet add package or Manage package dependencies in .NET applications.

## Generic attributes

Generic attributes require C# 11 or later. For C# 10 or earlier, use nongeneric attributes instead.

The following example shows a class that declares three metrics. The methods are marked with an attribute and are declared as `static` and `partial`.
The code generator runs at build time and provides an implementation of these methods, along with accompanying
types.

```csharp
internal class MetricConstants
{
    public const string EnvironmentName = "env";
    public const string Region = "region";
    public const string RequestName = "requestName";
    public const string RequestStatus = "requestStatus";
}
```
The following code demonstrates how to use the generator with primitive types:

```csharp
using System.Diagnostics.Metrics;
using Microsoft.Extensions.Diagnostics.Metrics;

namespace MetricsGen;

internal static partial class Metric
{
    // an explicit metric name is given
    [Histogram<long>("requestName", "duration", Name = "MyCustomMetricName")]
    public static partial Latency CreateLatency(Meter meter);

    // no explicit metric name given, it is auto-generated from the method name
    [Counter<int>(
        MetricConstants.EnvironmentName,
        MetricConstants.Region,
        MetricConstants.RequestName,
        MetricConstants.RequestStatus)]
    public static partial TotalCount CreateTotalCount(Meter meter);

    [Counter<int>]
    public static partial TotalFailures CreateTotalFailures(this Meter meter);
}
```
## Specifying units

Starting with .NET 10.2, you can optionally specify a unit of measurement for your metrics using the `Unit` parameter. This helps provide context about what the metric measures (for example, "seconds", "bytes", and "requests"). The unit is passed to the underlying `System.Diagnostics.Metrics.Meter` when creating the instrument.

The following code demonstrates how to use the generator with primitive types with units specified:

```csharp
internal static partial class Metric
{
    [Histogram<long>("requestName", "duration", Name = "MyCustomMetricName", Unit = "ms")]
    public static partial Latency CreateLatency(Meter meter);

    [Counter<int>(
        MetricConstants.EnvironmentName,
        MetricConstants.Region,
        MetricConstants.RequestName,
        MetricConstants.RequestStatus,
        Unit = "requests")]
    public static partial TotalCount CreateTotalCount(Meter meter);

    [Counter<int>(Unit = "failures")]
    public static partial TotalFailures CreateTotalFailures(this Meter meter);
}
```

The previous declaration automatically returns the following:

- `Latency` class with a `Record` method
- `TotalCount` class with an `Add` method
- `TotalFailures` class with a `Add` method.

The attributes indicate the set of dimensions that each metric uses. The signature for the generated types looks like this:

```csharp
internal class TotalCount
{
    public void Add(int value, object? env, object? region, object? requestName, object? requestStatus)
}

internal class TotalFailures
{
    public void Add(int value)
}

internal class Latency
{
    public void Record(long value, object? requestName, object? duration);
}
```

The dimensions specified in the attributes have been turned into arguments to the `Add` and `Record` methods. You then use the generated methods to create instances of these types. With the instances created, you can call `Add` and `Record` to register metric values, as shown in the following example:

```csharp
internal class MyClass
{
    // these variable are for example purposes, the dimensions values should depend on your business logic.
    private string envName = "envValue";
    private string regionName = "regionValue";
    private string requestName = "requestNameValue";
    private string status = "requestStatusValue";
    private string duration = "1:00:00";

    private readonly Latency _latencyMetric;
    private readonly TotalCount _totalCountMetric;
    private readonly TotalFailures _totalFailuresMetric;

    public MyClass(Meter meter)
    {
        // Create metric instances using the source-generated factory methods
        _latencyMetric = Metric.CreateLatency(meter);
        _totalCountMetric = Metric.CreateTotalCount(meter);
        // This syntax is available since `CreateTotalFailures` is defined as an extension method
        _totalFailuresMetric = meter.CreateTotalFailures();
    }

    public void ReportSampleRequestCount()
    {
        // method logic ...

        // Invoke Add on the counter and pass the dimension values you need.
        _totalCountMetric.Add(1, envName, regionName, requestName, status);
    }

    public void ReportSampleLatency()
    {
        // method logic ...

        // Invoke Record on the histogram and pass the dimension values you need.
        _latencyMetric.Record(1, requestName, duration);
    }

    public void ReportSampleFailuresCount()
    {
        // method logic ...

        // Invoke Add on the counter and pass the dimension values you need.
        _totalFailuresMetric.Add(1);
    }
}
```
## Metric methods requirements

Metric methods are constrained to the following:

- They must be `public static partial`.
- The return type must be unique.
- Their names must not start with an underscore.
- Their parameter names must not start with an underscore.
- Their first parameter must be `System.Diagnostics.Metrics.Meter` type.

## See also

For more information on the supported metrics, see Types of instruments to learn how to choose which instrument to use in different situations.
