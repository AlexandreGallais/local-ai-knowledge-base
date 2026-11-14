---
title: "EventCounters in .NET Core (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/event-counters.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# EventCounters in .NET Core (part 2 of 2)

## Consume EventCounters

There are two primary ways of consuming EventCounters: in-proc and out-of-proc. The consumption of EventCounters can be distinguished into three layers of various consuming technologies.

- Transporting events in a raw stream via ETW or EventPipe:

  ETW APIs come with the Windows OS, and EventPipe is accessible as a .NET API, or the diagnostic IPC protocol.

- Decoding the binary event stream into events:

  The TraceEvent library handles both ETW and EventPipe stream formats.

- Command-line and GUI tools:

  Tools like PerfView (ETW or EventPipe), dotnet-counters (EventPipe only), and dotnet-monitor (EventPipe only).

### Consume out-of-proc

Consuming EventCounters out-of-proc is a common approach. You can use dotnet-counters to consume them in a cross-platform manner via an EventPipe. The `dotnet-counters` tool is a cross-platform dotnet CLI global tool that can be used to monitor the counter values. To find out how to use `dotnet-counters` to monitor your counters, see dotnet-counters, or work through the Measure performance using EventCounters tutorial.

#### Azure Application Insights

EventCounters can be consumed by Azure Monitor, specifically Azure Application Insights. Counters can be added and removed, and you're free to specify custom counters, or well-known counters. For more information, see Customizing counters to be collected.

#### dotnet-monitor

The `dotnet-monitor` tool makes it easier to access diagnostics from a .NET process in a remote and automated fashion. In addition to traces, it can monitor metrics,
collect memory dumps, and collect GC dumps. It's distributed as both a CLI tool and a docker image. It exposes a REST API, and the collection of diagnostic artifacts occurs through REST calls.

For more information, see dotnet-monitor.

### Consume in-proc

You can consume the counter values via the `System.Diagnostics.Tracing.EventListener` API. An `System.Diagnostics.Tracing.EventListener` is an in-proc way of consuming any events written by all instances of an `System.Diagnostics.Tracing.EventSource` in your application. For more information on how to use the `EventListener` API, see `System.Diagnostics.Tracing.EventListener`.

First, the `System.Diagnostics.Tracing.EventSource` that produces the counter value needs to be enabled. Override the `System.Diagnostics.Tracing.EventListener.OnEventSourceCreated*` method to get a notification when an `System.Diagnostics.Tracing.EventSource` is created, and if this is the correct `System.Diagnostics.Tracing.EventSource` with your EventCounters, then you can call `System.Diagnostics.Tracing.EventListener.EnableEvents*` on it. Here is an example override:

```csharp
protected override void OnEventSourceCreated(EventSource source)
{
    if (!source.Name.Equals("System.Runtime"))
    {
        return;
    }

    EnableEvents(source, EventLevel.Verbose, EventKeywords.All, new Dictionary<string, string>()
    {
        ["EventCounterIntervalSec"] = "1"
    });
}
```
#### Sample code

Here is a sample `System.Diagnostics.Tracing.EventListener` class that prints all the counter names and values from the .NET runtime's `System.Diagnostics.Tracing.EventSource`, for publishing its internal counters (`System.Runtime`) every second.

```csharp
﻿using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;

public class SimpleEventListener : EventListener
{
    public SimpleEventListener()
    {
    }

    protected override void OnEventSourceCreated(EventSource source)
    {
        if (!source.Name.Equals("System.Runtime"))
        {
            return;
        }

        EnableEvents(source, EventLevel.Verbose, EventKeywords.All, new Dictionary<string, string>()
        {
            ["EventCounterIntervalSec"] = "1"
        });
    }

    protected override void OnEventWritten(EventWrittenEventArgs eventData)
    {
        if (!eventData.EventName.Equals("EventCounters"))
        {
            return;
        }

        for (int i = 0; i < eventData.Payload.Count; ++ i)
        {
            if (eventData.Payload[i] is IDictionary<string, object> eventPayload)
            {
                var (counterName, counterValue) = GetRelevantMetric(eventPayload);
                Console.WriteLine($"{counterName} : {counterValue}");
            }
        }
    }

    private static (string counterName, string counterValue) GetRelevantMetric(
        IDictionary<string, object> eventPayload)
    {
        var counterName = "";
        var counterValue = "";

        if (eventPayload.TryGetValue("DisplayName", out object displayValue))
        {
            counterName = displayValue.ToString();
        }
        if (eventPayload.TryGetValue("Mean", out object value) ||
            eventPayload.TryGetValue("Increment", out value))
        {
            counterValue = value.ToString();
        }

        return (counterName, counterValue);
    }
}
```
As shown above, you _must_ make sure the `"EventCounterIntervalSec"` argument is set in the `filterPayload` argument when calling `System.Diagnostics.Tracing.EventListener.EnableEvents*`. Otherwise the counters will not be able to flush out values since it doesn't know at which interval it should be getting flushed out.

## See also

- dotnet-counters
- dotnet-trace
- `System.Diagnostics.Tracing.EventCounter`
- `System.Diagnostics.Tracing.EventListener`
- `System.Diagnostics.Tracing.EventSource`
