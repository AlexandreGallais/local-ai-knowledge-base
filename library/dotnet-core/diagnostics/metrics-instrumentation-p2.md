---
title: "Creating Metrics (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/metrics-instrumentation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Creating Metrics (part 2 of 3)

## Types of instruments

So far we've only demonstrated a `System.Diagnostics.Metrics.Counter`1` instrument, but there are more instrument types available. Instruments differ
in two ways:

- **Default metric computations** - Tools that collect and analyze the instrument measurements will compute different default metrics depending on the instrument.
- **Storage of aggregated data** - Most useful metrics need data to be aggregated from many measurements. One option is the caller provides individual measurements
  at arbitrary times and the collection tool manages the aggregation. Alternatively, the caller can manage the aggregate measurements and provide them on-demand in a callback.

Types of instruments currently available:

- **Counter** (`System.Diagnostics.Metrics.Meter.CreateCounter*`) - This instrument tracks a value that increases over time and the caller reports the
  increments using `System.Diagnostics.Metrics.Counter`1.Add*`. Most tools will calculate the total and the rate of change in the total. For tools that only show
  one thing, the rate of change is recommended. For example, assume that the caller invokes `Add()` once each second with successive values 1, 2, 4, 5, 4, 3. If the collection
  tool updates every three seconds, then the total after three seconds is 1+2+4=7 and the total after six seconds is 1+2+4+5+4+3=19. The rate of change is the
  (current_total - previous_total), so at three seconds the tool reports 7-0=7, and after six seconds, it reports 19-7=12.

- **UpDownCounter** (`System.Diagnostics.Metrics.Meter.CreateUpDownCounter*`) - This instrument tracks a value that may increase or decrease over time. The caller reports the
  increments and decrements using `System.Diagnostics.Metrics.UpDownCounter`1.Add*`. For example, assume that the caller invokes `Add()` once each second with successive
  values 1, 5, -2, 3, -1, -3. If the collection tool updates every three seconds, then the total after three seconds is 1+5-2=4 and the total after six seconds is 1+5-2+3-1-3=3.

- **ObservableCounter** (`System.Diagnostics.Metrics.Meter.CreateObservableCounter*`) - This instrument is similar to Counter except that the caller is now responsible
  for maintaining the aggregated total. The caller provides a callback delegate when the ObservableCounter is created and the callback is invoked whenever tools need to observe
  the current total. For example, if a collection tool updates every three seconds, then the callback function will also be invoked every three seconds. Most tools will have both
  the total and rate of change in the total available. If only one can be shown, rate of change is recommended. If the callback returns 0 on the initial call, 7 when it is called
  again after three seconds, and 19 when called after six seconds, then the tool will report those values unchanged as the totals. For rate of change, the tool will show 7-0=7
  after three seconds and 19-7=12 after six seconds.

- **ObservableUpDownCounter** (`System.Diagnostics.Metrics.Meter.CreateObservableUpDownCounter*`) - This instrument is similar to UpDownCounter except that the caller is now responsible
  for maintaining the aggregated total. The caller provides a callback delegate when the ObservableUpDownCounter is created and the callback is invoked whenever tools need to observe
  the current total. For example, if a collection tool updates every three seconds, then the callback function will also be invoked every three seconds. Whatever value is returned by
  the callback will be shown in the collection tool unchanged as the total.

- **Gauge** (`System.Diagnostics.Metrics.Meter.CreateGauge*`) - This instrument allows the caller to set the current value of the metric using the `System.Diagnostics.Metrics.Gauge`1.Record*` method. The value can be updated at any time by invoking the method again and a metric collection tool will display whatever value was most recently set.

- **ObservableGauge** (`System.Diagnostics.Metrics.Meter.CreateObservableGauge*`) - This instrument allows the caller to provide a callback where the measured value
  is passed through directly as the metric. Each time the collection tool updates, the callback is invoked, and whatever value is returned by the callback is displayed in
  the tool.

- **Histogram** (`System.Diagnostics.Metrics.Meter.CreateHistogram*`) - This instrument tracks the distribution of measurements. There isn't a single canonical way to
  describe a set of measurements, but tools are recommended to use histograms or computed percentiles. For example, assume the caller invoked
  `System.Diagnostics.Metrics.Histogram`1.Record*` to record these measurements during the collection tool's update interval: 1,5,2,3,10,9,7,4,6,8. A collection tool
  might report that the 50th, 90th, and 95th percentiles of these measurements are 5, 9, and 9 respectively.

  > **Note:**
  > For details about how to set the recommended bucket boundaries when creating
  > a Histogram instrument see: Using Advice to customize Histogram
  > instruments.

### Best practices when selecting an instrument type

- For counting things, or any other value that solely increases over time, use Counter or ObservableCounter. Choose between Counter and ObservableCounter depending on which
  is easier to add to the existing code: either an API call for each increment operation, or a callback that will read the current total from a variable the code maintains. In
  extremely hot code paths where performance is important and using `System.Diagnostics.Metrics.Counter`1.Add*` would create more than one million calls per second per thread, using
  ObservableCounter may offer more opportunity for optimization.

- For timing things, Histogram is usually preferred. Often it's useful to understand the tail of these distributions (90th, 95th, 99th percentile) rather than averages or
  totals.

- Other common cases, such as cache hit rates or sizes of caches, queues, and files are usually well suited for `UpDownCounter` or `ObservableUpDownCounter`.
  Choose between them depending on which is easier to add to the existing code: either an API call for each increment and decrement operation or a callback that will read the current value from
  a variable the code maintains.

> **Note:**
> If you're using an older version of .NET or a DiagnosticSource NuGet package that doesn't support `UpDownCounter` and `ObservableUpDownCounter` (before version 7), `ObservableGauge` is
> often a good substitute.

### Example of different instrument types

Stop the example process started previously, and replace the example code in `Program.cs` with:

```csharp
using System;
using System.Diagnostics.Metrics;
using System.Threading;

class Program
{
    static Meter s_meter = new Meter("HatCo.Store");
    static Counter<int> s_hatsSold = s_meter.CreateCounter<int>("hatco.store.hats_sold");
    static Histogram<double> s_orderProcessingTime = s_meter.CreateHistogram<double>("hatco.store.order_processing_time");
    static int s_coatsSold;
    static int s_ordersPending;

    static Random s_rand = new Random();

    static void Main(string[] args)
    {
        s_meter.CreateObservableCounter<int>("hatco.store.coats_sold", () => s_coatsSold);
        s_meter.CreateObservableGauge<int>("hatco.store.orders_pending", () => s_ordersPending);

        Console.WriteLine("Press any key to exit");
        while(!Console.KeyAvailable)
        {
            // Pretend our store has one transaction each 100ms that each sell 4 hats
            Thread.Sleep(100);
            s_hatsSold.Add(4);

            // Pretend we also sold 3 coats. For an ObservableCounter we track the value in our variable and report it
            // on demand in the callback
            s_coatsSold += 3;

            // Pretend we have some queue of orders that varies over time. The callback for the orders_pending gauge will report
            // this value on-demand.
            s_ordersPending = s_rand.Next(0, 20);

            // Last we pretend that we measured how long it took to do the transaction (for example we could time it with Stopwatch)
            s_orderProcessingTime.Record(s_rand.Next(5, 15)/1000.0);
        }
    }
}
```

Run the new process and use dotnet-counters as before in a second shell to view the metrics:

```dotnetcli
> dotnet-counters monitor -n metric-demo.exe --counters HatCo.Store
Press p to pause, r to resume, q to quit.
    Status: Running

Name                                                  Current Value
[HatCo.Store]
    hatco.store.coats_sold (Count)                        8,181
    hatco.store.hats_sold (Count)                           548
    hatco.store.order_processing_time
        Percentile
        50                                                    0.012
        95                                                    0.013
        99                                                    0.013
    hatco.store.orders_pending                                9
```

This example uses some randomly generated numbers so your values will vary a bit. Dotnet-counters renders Histogram instruments as three percentile statistics (50th, 95th, and 99th) but other tools might summarize the distribution differently or offer more configuration options.

### Best practices

- Histograms tend to store a lot more data in memory than other metric types. However, the exact memory usage is determined by the collection tool being used.
  If you're defining a large number (>100) of Histogram metrics, you may need to give users guidance not to enable them all at the same time, or to configure their tools to save
  memory by reducing precision. Some collection tools may have hard limits on the number of concurrent Histograms they will monitor to prevent excessive memory use.

- Callbacks for all observable instruments are invoked in sequence, so any callback that takes a long time can delay or prevent all metrics from being collected. Favor
  quickly reading a cached value, returning no measurements, or throwing an exception over performing any potentially long-running or blocking operation.

- The ObservableCounter, ObservableUpDownCounter, and ObservableGauge callbacks occur on a thread that's not usually synchronized with the code that updates the values. It's your responsibility to either synchronize memory access or accept the inconsistent values that can result from using unsynchronized access. Common approaches to synchronize access are to use a lock or call `System.Threading.Volatile.Read*` and `System.Threading.Volatile.Write*`.

- The `System.Diagnostics.Metrics.Meter.CreateObservableGauge*` and `System.Diagnostics.Metrics.Meter.CreateObservableCounter*` functions do return an
  instrument object, but in most cases you don't need to save it in a variable because no further interaction with the object is needed. Assigning it to a static variable
  as we did for the other instruments is legal but error prone, because C# static initialization is lazy and the variable is usually never referenced. Here's an example
  of the problem:

  ```csharp
  using System;
  using System.Diagnostics.Metrics;

  class Program
  {
      // BEWARE! Static initializers only run when code in a running method refers to a static variable.
      // These statics will never be initialized because none of them were referenced in Main().
      //
      static Meter s_meter = new Meter("HatCo.Store");
      static ObservableCounter<int> s_coatsSold = s_meter.CreateObservableCounter<int>("hatco.store.coats_sold", () => s_rand.Next(1,10));
      static Random s_rand = new Random();

      static void Main(string[] args)
      {
          Console.ReadLine();
      }
  }
  ```

## Descriptions and units

Instruments can specify optional descriptions and units. These values are opaque to all metric calculations but can be shown in collection tool UI
to help engineers understand how to interpret the data. Stop the example process you started previously, and replace the example code in `Program.cs` with:

```csharp
using System;
using System.Diagnostics.Metrics;
using System.Threading;

class Program
{
    static Meter s_meter = new Meter("HatCo.Store");
    static Counter<int> s_hatsSold = s_meter.CreateCounter<int>(name: "hatco.store.hats_sold",
                                                                unit: "{hat}",
                                                                description: "The number of hats sold in our store");

    static void Main(string[] args)
    {
        Console.WriteLine("Press any key to exit");
        while(!Console.KeyAvailable)
        {
            // Pretend our store has a transaction each 100ms that sells 4 hats
            Thread.Sleep(100);
            s_hatsSold.Add(4);
        }
    }
}
```

Run the new process and use dotnet-counters as before in a second shell to view the metrics:

```dotnetcli
Press p to pause, r to resume, q to quit.
    Status: Running

Name                                                       Current Value
[HatCo.Store]
    hatco.store.hats_sold ({hat})                                 40
```

dotnet-counters doesn't currently use the description text in the UI, but it does show the unit when it is provided. In this case, you see "{hat}"
has replaced the generic term "Count" that is visible in previous descriptions.

### Best practices

- .NET APIs allow any string to be used as the unit, but we recommend using UCUM, an international standard for unit names. The curly
braces around "{hat}" is part of the UCUM standard, indicating that it is a descriptive annotation rather than a unit name with a standardized meaning like seconds or bytes. For more information, see Metrics semantic conventions - Instrument units.

- The unit specified in the constructor should describe the units appropriate for an individual measurement. This will sometimes differ from the units on the final reported metric. In this example, each measurement is a number of hats, so "{hat}" is the appropriate unit to pass in the constructor. The collection tool could have calculated the rate of change and derived on its own that the appropriate unit for the calculated rate metric is {hat}/sec.

- When recording measurements of time, prefer units of seconds recorded as a floating point or double value.
