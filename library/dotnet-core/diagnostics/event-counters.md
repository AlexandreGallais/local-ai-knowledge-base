---
title: "EventCounters in .NET Core (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/event-counters.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# EventCounters in .NET

**This article applies to: ✔️** .NET Core 3.0 SDK and later versions

  > **Note:**
  > For developing new .NET projects Microsoft recommends using the newer System.Diagnostics.Metrics APIs instead. The System.Diagnostics.Metrics APIs offer increased functionality, standardization and integration with a broader ecosystem of tools. See the metrics API comparison for more information.

EventCounters are .NET APIs used for lightweight, cross-platform, and near real-time performance metric collection. EventCounters were added as a cross-platform alternative to the "performance counters" of .NET Framework on Windows. In this article, you'll learn what EventCounters are, how to implement them, and how to consume them.

The .NET runtime and a few .NET libraries publish basic diagnostics information using EventCounters starting in .NET Core 3.0. Apart from the EventCounters that are provided by the .NET runtime, you may choose to implement your own EventCounters. EventCounters can be used to track various metrics. Learn more about them in well-known EventCounters in .NET.

EventCounters live as a part of an `System.Diagnostics.Tracing.EventSource`, and are automatically pushed to listener tools on a regular basis. Like all other events on an `System.Diagnostics.Tracing.EventSource`, they can be consumed both in-proc and out-of-proc via `System.Diagnostics.Tracing.EventListener` and EventPipe. This article focuses on the cross-platform capabilities of EventCounters, and intentionally excludes PerfView and ETW (Event Tracing for Windows) - although both can be used with EventCounters.

## EventCounter API overview

There are two primary categories of EventCounters. Some counters are for "rate" values, such as total number of exceptions, total number of GCs, and total number of requests. Other counters are "snapshot" values, such as heap usage, CPU usage, and working set size. Within each of these categories of counters, there are two types of counters that vary by how they get their value. Polling counters retrieve their value via a callback, and non-polling counters have their values directly set on the counter instance.

The counters are represented by the following implementations:

* `System.Diagnostics.Tracing.EventCounter`
* `System.Diagnostics.Tracing.IncrementingEventCounter`
* `System.Diagnostics.Tracing.PollingCounter`
* `System.Diagnostics.Tracing.IncrementingPollingCounter`

An event listener specifies how long measurement intervals are. At the end of each interval a value is transmitted to the listener for each counter. The implementations of a counter determine what APIs and calculations are used to produce the value each interval.

- The `System.Diagnostics.Tracing.EventCounter` records a set of values. The `System.Diagnostics.Tracing.EventCounter.WriteMetric*` method adds a new value to the set. With each interval, a statistical summary for the set is computed, such as the min, max, and mean. The dotnet-counters tool will always display the mean value. The `System.Diagnostics.Tracing.EventCounter` is useful to describe a discrete set of operations. Common usage may include monitoring the average size in bytes of recent IO operations, or the average monetary value of a set of financial transactions.

- The `System.Diagnostics.Tracing.IncrementingEventCounter` records a running total for each time interval. The `System.Diagnostics.Tracing.IncrementingEventCounter.Increment*` method adds to the total. For example, if `Increment()` is called three times during one interval with values `1`, `2`, and `5`, then the running total of `8` will be reported as the counter value for this interval. The dotnet-counters tool will display the rate as the recorded total / time. The `System.Diagnostics.Tracing.IncrementingEventCounter` is useful to measure how frequently an action is occurring, such as the number of requests processed per second.

- The `System.Diagnostics.Tracing.PollingCounter` uses a callback to determine the value that is reported. With each time interval, the user provided callback function is invoked and the return value is used as the counter value. A `System.Diagnostics.Tracing.PollingCounter` can be used to query a metric from an external source, for example getting the current free bytes on a disk. It can also be used to report custom statistics that can be computed on demand by an application. Examples include reporting the 95th percentile of recent request latencies, or the current hit or miss ratio of a cache.

- The `System.Diagnostics.Tracing.IncrementingPollingCounter` uses a callback to determine the reported increment value. With each time interval, the callback is invoked, and then the difference between the current invocation, and the last invocation is the reported value. The dotnet-counters tool will always display the difference as a rate, the reported value / time. This counter is useful when it isn't feasible to call an API on each occurrence, but it's possible to query the total number of occurrences. For example, you could report the number of bytes written to a file per second, even without a notification each time a byte is written.

## Implement an EventSource

The following code implements a sample `System.Diagnostics.Tracing.EventSource` exposed as the named `"Sample.EventCounter.Minimal"` provider. This source contains an `System.Diagnostics.Tracing.EventCounter` representing request-processing time. Such a counter has a name (that is, its unique ID in the source) and a display name, both used by listener tools such as dotnet-counters.

```csharp
﻿using System.Diagnostics.Tracing;

[EventSource(Name = "Sample.EventCounter.Minimal")]
public sealed class MinimalEventCounterSource : EventSource
{
    public static readonly MinimalEventCounterSource Log = new MinimalEventCounterSource();

    private EventCounter _requestCounter;

    private MinimalEventCounterSource() =>
        _requestCounter = new EventCounter("request-time", this)
        {
            DisplayName = "Request Processing Time",
            DisplayUnits = "ms"
        };

    public void Request(string url, long elapsedMilliseconds)
    {
        WriteEvent(1, url, elapsedMilliseconds);
        _requestCounter?.WriteMetric(elapsedMilliseconds);
    }

    protected override void Dispose(bool disposing)
    {
        _requestCounter?.Dispose();
        _requestCounter = null;

        base.Dispose(disposing);
    }
}
```
You use `dotnet-counters ps` to display a list of .NET processes that can be monitored:

```console
dotnet-counters ps
   1398652 dotnet     C:\Program Files\dotnet\dotnet.exe
   1399072 dotnet     C:\Program Files\dotnet\dotnet.exe
   1399112 dotnet     C:\Program Files\dotnet\dotnet.exe
   1401880 dotnet     C:\Program Files\dotnet\dotnet.exe
   1400180 sample-counters C:\sample-counters\bin\Debug\netcoreapp3.1\sample-counters.exe
```

Pass the `System.Diagnostics.Tracing.EventSource` name to the `--counters` option to start monitoring your counter:

```console
dotnet-counters monitor --process-id 1400180 --counters Sample.EventCounter.Minimal
```

The following example shows monitor output:

```console
Press p to pause, r to resume, q to quit.
    Status: Running

[Samples-EventCounterDemos-Minimal]
    Request Processing Time (ms)                            0.445
```

Press `q` to stop the monitoring command.

### Conditional counters

When implementing an `System.Diagnostics.Tracing.EventSource`, the containing counters can be conditionally instantiated when the `System.Diagnostics.Tracing.EventSource.OnEventCommand*` method is called with a `System.Diagnostics.Tracing.EventCommandEventArgs.Command` value of `EventCommand.Enable`. To safely instantiate a counter instance only if it is `null`, use the null-coalescing assignment operator. Additionally, custom methods can evaluate the `System.Diagnostics.DiagnosticSource.IsEnabled*` method to determine whether or not the current event source is enabled.

```csharp
﻿using System.Diagnostics.Tracing;

[EventSource(Name = "Sample.EventCounter.Conditional")]
public sealed class ConditionalEventCounterSource : EventSource
{
    public static readonly ConditionalEventCounterSource Log = new ConditionalEventCounterSource();

    private EventCounter _requestCounter;

    private ConditionalEventCounterSource() { }

    protected override void OnEventCommand(EventCommandEventArgs args)
    {
        if (args.Command == EventCommand.Enable)
        {
            _requestCounter ??= new EventCounter("request-time", this)
            {
                DisplayName = "Request Processing Time",
                DisplayUnits = "ms"
            };
        }
    }

    public void Request(string url, float elapsedMilliseconds)
    {
        if (IsEnabled())
        {
            _requestCounter?.WriteMetric(elapsedMilliseconds);
        }
    }

    protected override void Dispose(bool disposing)
    {
        _requestCounter?.Dispose();
        _requestCounter = null;

        base.Dispose(disposing);
    }
}
```
> **Tip:**
> Conditional counters are counters that are conditionally instantiated, a micro-optimization. The runtime adopts this pattern for scenarios where counters are normally not used, to save a fraction of a millisecond.

### .NET Core runtime example counters

There are many great example implementations in the .NET Core runtime. Here is the runtime implementation for the counter that tracks the working set size of the application.

```csharp
var workingSetCounter = new PollingCounter(
    "working-set",
    this,
    () => (double)(Environment.WorkingSet / 1_000_000))
{
    DisplayName = "Working Set",
    DisplayUnits = "MB"
};
```

The `System.Diagnostics.Tracing.PollingCounter` reports the current amount of physical memory mapped to the process (working set) of the app, since it captures a metric at a moment in time. The callback for polling a value is the provided lambda expression, which is just a call to the `System.Environment.WorkingSet` API. `System.Diagnostics.Tracing.DiagnosticCounter.DisplayName` and `System.Diagnostics.Tracing.DiagnosticCounter.DisplayUnits` are optional properties that can be set to help the consumer side of the counter to display the value more clearly. For example, dotnet-counters uses these properties to display the more display-friendly version of the counter names.

> **Important:**
> The `DisplayName` properties are not localized.

For the `System.Diagnostics.Tracing.PollingCounter`, and the `System.Diagnostics.Tracing.IncrementingPollingCounter`, nothing else needs to be done. They both poll the values themselves at an interval requested by the consumer.

Here is an example of a runtime counter implemented using `System.Diagnostics.Tracing.IncrementingPollingCounter`.

```csharp
var monitorContentionCounter = new IncrementingPollingCounter(
    "monitor-lock-contention-count",
    this,
    () => Monitor.LockContentionCount
)
{
    DisplayName = "Monitor Lock Contention Count",
    DisplayRateTimeScale = TimeSpan.FromSeconds(1)
};
```

The `System.Diagnostics.Tracing.IncrementingPollingCounter` uses the `System.Threading.Monitor.LockContentionCount` API to report the increment of the total lock contention count. The `System.Diagnostics.Tracing.IncrementingPollingCounter.DisplayRateTimeScale` property is optional, but when used it can provide a hint for what time interval the counter is best displayed at. For example, the lock contention count is best displayed as _count per second_, so its `System.Diagnostics.Tracing.IncrementingPollingCounter.DisplayRateTimeScale` is set to one second. The display rate can be adjusted for different types of rate counters.

> **Note:**
> The `System.Diagnostics.Tracing.IncrementingPollingCounter.DisplayRateTimeScale` is _not_ used by dotnet-counters, and event listeners are not required to use it.

There are more counter implementations to use as a reference in the .NET runtime repo.

## Concurrency

> **Tip:**
> The EventCounters API does not guarantee thread safety. When the delegates passed to `System.Diagnostics.Tracing.PollingCounter` or `System.Diagnostics.Tracing.IncrementingPollingCounter` instances are called by multiple threads, it's your responsibility to guarantee the delegates' thread-safety.

For example, consider the following `System.Diagnostics.Tracing.EventSource` to keep track of requests.

```csharp
﻿using System;
using System.Diagnostics.Tracing;

public class RequestEventSource : EventSource
{
    public static readonly RequestEventSource Log = new RequestEventSource();

    private IncrementingPollingCounter _requestRateCounter;
    private long _requestCount = 0;

    private RequestEventSource() =>
        _requestRateCounter = new IncrementingPollingCounter("request-rate", this, () => _requestCount)
        {
            DisplayName = "Request Rate",
            DisplayRateTimeScale = TimeSpan.FromSeconds(1)
        };

    public void AddRequest() => ++ _requestCount;

    protected override void Dispose(bool disposing)
    {
        _requestRateCounter?.Dispose();
        _requestRateCounter = null;

        base.Dispose(disposing);
    }
}
```
The `AddRequest()` method can be called from a request handler, and the `RequestRateCounter` polls the value at the interval specified by the consumer of the counter. However, the `AddRequest()` method can be called by multiple threads at once, putting a race condition on `_requestCount`. A thread-safe alternative way to increment the `_requestCount` is to use `System.Threading.Interlocked.Increment*`.

```csharp
public void AddRequest() => Interlocked.Increment(ref _requestCount);
```

To prevent torn reads (on 32-bit architectures) of the `long`-field `_requestCount` use `System.Threading.Interlocked.Read*`.

```csharp
_requestRateCounter = new IncrementingPollingCounter("request-rate", this, () => Interlocked.Read(ref _requestCount))
{
    DisplayName = "Request Rate",
    DisplayRateTimeScale = TimeSpan.FromSeconds(1)
};
```
