---
title: "Collect a distributed trace - .NET (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/distributed-tracing-collection-walkthroughs.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Collect a distributed trace - .NET (part 2 of 2)

## Collect traces using custom logic

Developers are free to create their own customized collection logic for Activity trace data. This example collects the
telemetry using the `System.Diagnostics.ActivityListener` API provided by .NET and prints
it to the console.

### Prerequisites

- .NET Core 8.0 SDK or a later version

### Create an example application

First you will create an example application that has some distributed trace instrumentation but no trace data is being collected.

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

### Add code to collect the traces

Update Main() with this code:

```csharp
        static async Task Main(string[] args)
        {
            Activity.DefaultIdFormat = ActivityIdFormat.W3C;
            Activity.ForceDefaultIdFormat = true;

            Console.WriteLine("         {0,-15} {1,-60} {2,-15}", "OperationName", "Id", "Duration");
            ActivitySource.AddActivityListener(new ActivityListener()
            {
                ShouldListenTo = (source) => true,
                Sample = (ref ActivityCreationOptions<ActivityContext> options) => ActivitySamplingResult.AllDataAndRecorded,
                ActivityStarted = activity => Console.WriteLine("Started: {0,-15} {1,-60}", activity.OperationName, activity.Id),
                ActivityStopped = activity => Console.WriteLine("Stopped: {0,-15} {1,-60} {2,-15}", activity.OperationName, activity.Id, activity.Duration)
            });

            await DoSomeWork();
            Console.WriteLine("Example work done");
        }
```

The output now includes logging:

```dotnetcli
> dotnet run
         OperationName   Id                                                           Duration
Started: SomeWork        00-bdb5faffc2fc1548b6ba49a31c4a0ae0-c447fb302059784f-01
Started: StepOne         00-bdb5faffc2fc1548b6ba49a31c4a0ae0-a7c77a4e9a02dc4a-01
Stopped: StepOne         00-bdb5faffc2fc1548b6ba49a31c4a0ae0-a7c77a4e9a02dc4a-01      00:00:00.5093849
Started: StepTwo         00-bdb5faffc2fc1548b6ba49a31c4a0ae0-9210ad536cae9e4e-01
Stopped: StepTwo         00-bdb5faffc2fc1548b6ba49a31c4a0ae0-9210ad536cae9e4e-01      00:00:01.0111847
Stopped: SomeWork        00-bdb5faffc2fc1548b6ba49a31c4a0ae0-c447fb302059784f-01      00:00:01.5236391
Example work done
```

Setting `System.Diagnostics.Activity.DefaultIdFormat` and
`System.Diagnostics.Activity.ForceDefaultIdFormat` is optional
but helps ensure the sample produces similar output on different .NET runtime versions. .NET 5 uses
the W3C TraceContext ID format by default but earlier .NET versions default to using
`System.Diagnostics.ActivityIdFormat.Hierarchical` ID format. For more information, see
Activity IDs.

`System.Diagnostics.ActivityListener` is used to receive callbacks
during the lifetime of an Activity.

- `System.Diagnostics.ActivityListener.ShouldListenTo` - Each
Activity is associated with an ActivitySource, which acts as its namespace and producer.
This callback is invoked once for each ActivitySource in the process. Return true
if you are interested in performing sampling or being notified about start/stop events
for Activities produced by this source.
- `System.Diagnostics.ActivityListener.Sample` - By default
`System.Diagnostics.ActivitySource.StartActivity*` does not
create an Activity object unless some ActivityListener indicates it should be sampled. Returning
`System.Diagnostics.ActivitySamplingResult.AllDataAndRecorded`
indicates that the Activity should be created,
`System.Diagnostics.Activity.IsAllDataRequested` should be set
to true, and `System.Diagnostics.Activity.ActivityTraceFlags`
will have the `System.Diagnostics.ActivityTraceFlags.Recorded`
flag set. IsAllDataRequested can be observed by the instrumented code as a hint that a listener
wants to ensure that auxiliary Activity information such as Tags and Events are populated.
The Recorded flag is encoded in the W3C TraceContext ID and is a hint to other processes
involved in the distributed trace that this trace should be sampled.
- `System.Diagnostics.ActivityListener.ActivityStarted` and
`System.Diagnostics.ActivityListener.ActivityStopped` are
called when an Activity is started and stopped respectively. These callbacks provide an
opportunity to record relevant information about the Activity or potentially to modify it.
When an Activity has just started, much of the data may still be incomplete and it will
be populated before the Activity stops.

Once an ActivityListener has been created and the callbacks are populated, calling
`System.Diagnostics.ActivitySource.AddActivityListener(System.Diagnostics.ActivityListener)`
initiates invoking the callbacks. Call
`System.Diagnostics.ActivityListener.Dispose` to
stop the flow of callbacks. Be aware that in multi-threaded code, callback notifications in
progress could be received while `Dispose()` is running or even shortly after it has
returned.
