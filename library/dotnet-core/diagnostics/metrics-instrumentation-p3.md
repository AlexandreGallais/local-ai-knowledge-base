---
title: "Creating Metrics (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/metrics-instrumentation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Creating Metrics (part 3 of 3)

## Multi-dimensional metrics

Measurements can also be associated with key-value pairs called tags that allow data to be categorized for analysis. For example, HatCo might want to record not
only the number of hats that were sold, but also which size and color they were. When analyzing the data later, HatCo engineers can break out the totals by
size, color, or any combination of both.

Counter and Histogram tags can be specified in overloads of the `System.Diagnostics.Metrics.Counter`1.Add*` and
`System.Diagnostics.Metrics.Histogram`1.Record*` that take one or more `KeyValuePair` arguments. For example:

```csharp
s_hatsSold.Add(2,
               new KeyValuePair<string, object?>("product.color", "red"),
               new KeyValuePair<string, object?>("product.size", 12));
```

Replace the code of `Program.cs` and rerun the app and dotnet-counters as before:

```csharp
using System;
using System.Collections.Generic;
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
            // Pretend our store has a transaction, every 100ms, that sells two size 12 red hats, and one size 19 blue hat.
            Thread.Sleep(100);
            s_hatsSold.Add(2,
                           new KeyValuePair<string,object?>("product.color", "red"),
                           new KeyValuePair<string,object?>("product.size", 12));
            s_hatsSold.Add(1,
                           new KeyValuePair<string,object?>("product.color", "blue"),
                           new KeyValuePair<string,object?>("product.size", 19));
        }
    }
}
```

Dotnet-counters now shows a basic categorization:

```dotnetcli
Press p to pause, r to resume, q to quit.
    Status: Running

Name                                                  Current Value
[HatCo.Store]
    hatco.store.hats_sold (Count)
        product.color product.size
        ------------- ------------
        blue          19                                     73
        red           12                                    146
```

For ObservableCounter and ObservableGauge, tagged measurements can be provided in the callback passed to the constructor:

```csharp
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Threading;

class Program
{
    static Meter s_meter = new Meter("HatCo.Store");

    static void Main(string[] args)
    {
        s_meter.CreateObservableGauge<int>("hatco.store.orders_pending", GetOrdersPending);
        Console.WriteLine("Press any key to exit");
        Console.ReadLine();
    }

    static IEnumerable<Measurement<int>> GetOrdersPending()
    {
        return new Measurement<int>[]
        {
            // pretend these measurements were read from a real queue somewhere
            new Measurement<int>(6, new KeyValuePair<string,object?>("customer.country", "Italy")),
            new Measurement<int>(3, new KeyValuePair<string,object?>("customer.country", "Spain")),
            new Measurement<int>(1, new KeyValuePair<string,object?>("customer.country", "Mexico")),
        };
    }
}
```

When run with dotnet-counters as before, the result is:

```dotnetcli
Press p to pause, r to resume, q to quit.
    Status: Running

Name                                                  Current Value
[HatCo.Store]
    hatco.store.orders_pending
        customer.country
        ----------------
        Italy                                                 6
        Mexico                                                1
        Spain                                                 3
```

### Best practices

- Although the API allows any object to be used as the tag value, numeric types and strings are anticipated by collection tools. Other types may or may not be supported by a given collection tool.

- We recommend tag names follow the OpenTelemetry naming guidelines,
  which use lowercase dotted hierarchal names with '_' characters to separate multiple words in the same element. If tag names are reused in different metrics or other telemetry
  records, then they should have the same meaning and set of legal values everywhere they are used.

  Example tag names:

  - `customer.country`
  - `store.payment_method`
  - `store.purchase_result`

- Beware of having very large or unbounded combinations of tag values being recorded in practice. Although the .NET API implementation can handle it, collection tools will
  likely allocate storage for metric data associated with each tag combination and this could become very large. For example, it's fine if HatCo has 10 different
  hat colors and 25 hat sizes for up to 10*25=250 sales totals to track. However, if HatCo added a third tag that's a CustomerID for the sale and they sell to 100
  million customers worldwide, now there are now likely to be billions of different tag combinations being recorded. Most metric collection tools will either drop data
  to stay within technical limits or there can be large monetary costs to cover the data storage and processing. The implementation of each collection tool will determine
  its limits, but likely less than 1000 combinations for one instrument is safe. Anything above 1000 combinations will require the collection tool to apply filtering or be engineered to operate at a high scale.
  Histogram implementations tend to use far more memory than other metrics, so safe limits could be 10-100 times lower. If you anticipate a large number of unique tag combinations,
  then logs, transactional databases, or big data processing systems may be more appropriate solutions to operate at the needed scale.

- For instruments that will have very large numbers of tag combinations, prefer using a smaller storage type to help reduce memory overhead. For example, storing the `short` for
  a `Counter<short>` only occupies 2 bytes per tag combination, whereas a `double` for `Counter<double>` occupies 8 bytes per tag combination.

- Collection tools are encouraged to optimize for code that specifies the same set of tag names in the same order for each call to record measurements on the
  same instrument. For high-performance code that needs to call `System.Diagnostics.Metrics.Counter`1.Add*` and `System.Diagnostics.Metrics.Histogram`1.Record*`
  frequently, prefer using the same sequence of tag names for each call.

- The .NET API is optimized to be allocation-free for `System.Diagnostics.Metrics.Counter`1.Add*` and `System.Diagnostics.Metrics.Histogram`1.Record*` calls
  with three or fewer tags specified individually. To avoid allocations with larger numbers of tags, use `System.Diagnostics.TagList`. In general,
  the performance overhead of these calls increases as more tags are used.

> **Note:**
> OpenTelemetry refers to tags as 'attributes'. These are two different names for the same functionality.

## Using Advice to customize Histogram instruments

When using Histograms, it is the responsibility of the tool or library
collecting the data to decide how best to represent the distribution of values
that were recorded. A common strategy (and the default mode when using
OpenTelemetry)
is to divide up the range of possible values into sub-ranges called buckets and
report how many recorded values were in each bucket. For example a tool might
divide numbers into three buckets, those less than 1, those between 1-10, and
those greater than 10. If your app recorded the values 0.5, 6, 0.1, 12 then
there would be two data points the first bucket, one in the second, and one in
the 3rd.

The tool or library collecting the Histogram data is responsible for defining
the buckets it will use. The default bucket configuration when using
OpenTelemetry is: `[ 0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1000, 2500, 5000,
7500, 10000 ]`.

The default values may not lead to the best granularity for every Histogram. For
example, sub-second request durations would all fall into the `0` bucket.

The tool or library collecting the Histogram data may offer mechanism(s) to
allow users to customize the bucket configuration. For example, OpenTelemetry
defines a View
API.
This however requires end user action and makes it the user's responsibility to
understand the data distribution well enough to choose correct buckets.

To improve the experience the `9.0.0` version of the
`System.Diagnostics.DiagnosticSource` package introduced the
(`System.Diagnostics.Metrics.InstrumentAdvice`1`) API.

The `InstrumentAdvice` API may be used by instrumentation authors to specify the
set of recommended default bucket boundaries for a given Histogram. The tool or
library collecting the Histogram data can then choose to use those values when
configuring aggregation leading to a more seamless onboarding experience for
users. This is supported in the OpenTelemetry .NET SDK as of version
1.10.0.

> **Important:**
> In general more buckets will lead to more precise data for a given Histogram
> but each bucket requires memory to store the aggregated details and there is
> CPU cost to find the correct bucket when processing a measurement. It is
> important to understand the tradeoffs between precision and CPU/memory
> consumption when choosing the number of buckets to recommend via the
> `InstrumentAdvice` API.

The following code shows an example using the `InstrumentAdvice` API to set
recommended default buckets.

```csharp
using System;
using System.Diagnostics.Metrics;
using System.Threading;

class Program
{
    static Meter s_meter = new Meter("HatCo.Store");
    static Histogram<double> s_orderProcessingTime = s_meter.CreateHistogram<double>(
        name: "hatco.store.order_processing_time",
        unit: "s",
        description: "Order processing duration",
        advice: new InstrumentAdvice<double> { HistogramBucketBoundaries = [0.01, 0.05, 0.1, 0.5, 1, 5] });

    static Random s_rand = new Random();

    static void Main(string[] args)
    {
        Console.WriteLine("Press any key to exit");
        while (!Console.KeyAvailable)
        {
            // Pretend our store has one transaction each 100ms
            Thread.Sleep(100);

            // Pretend that we measured how long it took to do the transaction (for example we could time it with Stopwatch)
            s_orderProcessingTime.Record(s_rand.Next(5, 15) / 1000.0);
        }
    }
}
```

### Additional information

For more details about explicit bucket Histograms in OpenTelemetry see:

* Why Histograms?

* Histograms vs Summaries

## Test custom metrics

Its possible to test any custom metrics you add using `Microsoft.Extensions.Diagnostics.Metrics.Testing.MetricCollector`1`. This type makes it easy to record the measurements from specific instruments and assert the values were correct.

### Test with dependency injection

The following code shows an example test case for code components that use dependency injection and IMeterFactory.

```csharp
public class MetricTests
{
    [Fact]
    public void SaleIncrementsHatsSoldCounter()
    {
        // Arrange
        var services = CreateServiceProvider();
        var metrics = services.GetRequiredService<HatCoMetrics>();
        var meterFactory = services.GetRequiredService<IMeterFactory>();
        var collector = new MetricCollector<int>(meterFactory, "HatCo.Store", "hatco.store.hats_sold");

        // Act
        metrics.HatsSold(15);

        // Assert
        var measurements = collector.GetMeasurementSnapshot();
        Assert.Equal(1, measurements.Count);
        Assert.Equal(15, measurements[0].Value);
    }

    // Setup a new service provider. This example creates the collection explicitly but you might leverage
    // a host or some other application setup code to do this as well.
    private static IServiceProvider CreateServiceProvider()
    {
        var serviceCollection = new ServiceCollection();
        serviceCollection.AddMetrics();
        serviceCollection.AddSingleton<HatCoMetrics>();
        return serviceCollection.BuildServiceProvider();
    }
}
```

Each MetricCollector object records all measurements for one Instrument. If you need to verify measurements from multiple instruments, create one MetricCollector for each one.

### Test without dependency injection

It is also possible to test code that uses a shared global Meter object in a static field, but make sure such tests are configured not to run in parallel. Because the
Meter object is being shared, MetricCollector in one test will observe the measurements created from any other tests running in parallel.

```csharp
class HatCoMetricsWithGlobalMeter
{
    static Meter s_meter = new Meter("HatCo.Store");
    static Counter<int> s_hatsSold = s_meter.CreateCounter<int>("hatco.store.hats_sold");

    public void HatsSold(int quantity)
    {
        s_hatsSold.Add(quantity);
    }
}

public class MetricTests
{
    [Fact]
    public void SaleIncrementsHatsSoldCounter()
    {
        // Arrange
        var metrics = new HatCoMetricsWithGlobalMeter();
        // Be careful specifying scope=null. This binds the collector to a global Meter and tests
        // that use global state should not be configured to run in parallel.
        var collector = new MetricCollector<int>(null, "HatCo.Store", "hatco.store.hats_sold");

        // Act
        metrics.HatsSold(15);

        // Assert
        var measurements = collector.GetMeasurementSnapshot();
        Assert.Equal(1, measurements.Count);
        Assert.Equal(15, measurements[0].Value);
    }
}
```
