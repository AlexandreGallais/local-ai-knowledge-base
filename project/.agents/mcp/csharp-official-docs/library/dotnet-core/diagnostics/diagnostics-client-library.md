---
title: "Diagnostics client library"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/diagnostics-client-library.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Diagnostics client library

**This article applies to: ✔️** .NET Core 3.0 SDK and later versions for target apps, .NET Standard 2.0 to use the library.

`Microsoft.Diagnostics.NETCore.Client` (also known as the Diagnostics client library) is a managed library that lets you interact with .NET Core runtime (CoreCLR) for various diagnostics related tasks, such as tracing via EventPipe, requesting a dump, or attaching an `ICorProfiler`. This library is the backing library behind many diagnostics tools such as dotnet-counters, dotnet-trace, dotnet-gcdump, dotnet-dump, and dotnet-monitor. Using this library, you can write your own diagnostics tools customized for your particular scenario.

You can acquire Microsoft.Diagnostics.NETCore.Client by adding a `PackageReference` to your project. The package is hosted on `NuGet.org`.

The samples in the following sections show how to use Microsoft.Diagnostics.NETCore.Client library. Some of these examples also show parsing the event payloads by using TraceEvent library.

## Attach to a process and print out all GC events

This snippet shows how to start an EventPipe session using the .NET runtime provider with the GC keyword at informational level. It also shows how to use the `EventPipeEventSource` class provided by the TraceEvent library to parse the incoming events and print their names to the console in real time.

```csharp
using Microsoft.Diagnostics.NETCore.Client;
using Microsoft.Diagnostics.Tracing;
using Microsoft.Diagnostics.Tracing.EventPipe;
using Microsoft.Diagnostics.Tracing.Parsers;
using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;

public class RuntimeGCEventsPrinter
{
    public static void PrintRuntimeGCEvents(int processId)
    {
        var providers = new List<EventPipeProvider>()
        {
            new EventPipeProvider("Microsoft-Windows-DotNETRuntime",
                EventLevel.Informational, (long)ClrTraceEventParser.Keywords.GC)
        };

        var client = new DiagnosticsClient(processId);
        using (EventPipeSession session = client.StartEventPipeSession(providers, false))
        {
            var source = new EventPipeEventSource(session.EventStream);

            source.Clr.All += (TraceEvent obj) => Console.WriteLine(obj.ToString());

            try
            {
                source.Process();
            }
            catch (Exception e)
            {
                Console.WriteLine("Error encountered while processing events");
                Console.WriteLine(e.ToString());
            }
        }
    }
}
```
## Write a core dump

This sample shows how to trigger the collection of a core dump using `DiagnosticsClient`.

```csharp
using Microsoft.Diagnostics.NETCore.Client;

public partial class Dumper
{
    public static void TriggerCoreDump(int processId)
    {
        var client = new DiagnosticsClient(processId);
        client.WriteDump(DumpType.Normal, "/tmp/minidump.dmp");
    }
}
```
## Trigger a core dump when CPU usage goes above a threshold

This sample shows how to monitor the `cpu-usage` counter published by the .NET runtime and request a dump when the CPU usage grows beyond a certain threshold.

```csharp
using Microsoft.Diagnostics.NETCore.Client;
using Microsoft.Diagnostics.Tracing;
using Microsoft.Diagnostics.Tracing.EventPipe;
using Microsoft.Diagnostics.Tracing.Parsers;
using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;

public partial class Dumper
{
    public static void TriggerDumpOnCpuUsage(int processId, int threshold)
    {
        var providers = new List<EventPipeProvider>()
        {
            new EventPipeProvider(
                "System.Runtime",
                EventLevel.Informational,
                (long)ClrTraceEventParser.Keywords.None,
                new Dictionary<string, string>
                {
                    ["EventCounterIntervalSec"] = "1"
                }
            )
        };
        var client = new DiagnosticsClient(processId);
        using (var session = client.StartEventPipeSession(providers))
        {
            var source = new EventPipeEventSource(session.EventStream);
            source.Dynamic.All += (TraceEvent obj) =>
            {
                if (obj.EventName.Equals("EventCounters"))
                {
                    var payloadVal = (IDictionary<string, object>)(obj.PayloadValue(0));
                    var payloadFields = (IDictionary<string, object>)(payloadVal["Payload"]);
                    if (payloadFields["Name"].ToString().Equals("cpu-usage"))
                    {
                        double cpuUsage = Double.Parse(payloadFields["Mean"].ToString());
                        if (cpuUsage > (double)threshold)
                        {
                            client.WriteDump(DumpType.Normal, "/tmp/minidump.dmp");
                        }
                    }
                }
            };
            try
            {
                source.Process();
            }
            catch (Exception) {}
        }
    }
}
```
## Trigger a CPU trace for given number of seconds

This sample shows how to trigger an EventPipe session for certain period of time with the default CLR trace keyword as well as the sample profiler. Afterward, it reads the output stream and writes the bytes out to a file. Essentially this is what `dotnet-trace` uses internally to write a trace file.

```csharp
using Microsoft.Diagnostics.Tracing;
using Microsoft.Diagnostics.Tracing.Parsers;
using Microsoft.Diagnostics.NETCore.Client;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Diagnostics.Tracing;
using System.IO;
using System.Threading.Tasks;

public partial class Tracer
{
    public void TraceProcessForDuration(int processId, int duration, string traceName)
    {
        var cpuProviders = new List<EventPipeProvider>()
        {
            new EventPipeProvider("Microsoft-Windows-DotNETRuntime", EventLevel.Informational, (long)ClrTraceEventParser.Keywords.Default),
            new EventPipeProvider("Microsoft-DotNETCore-SampleProfiler", EventLevel.Informational, (long)ClrTraceEventParser.Keywords.None)
        };
        var client = new DiagnosticsClient(processId);
        using (var traceSession = client.StartEventPipeSession(cpuProviders))
        {
            Task copyTask = Task.Run(async () =>
            {
                using (FileStream fs = new FileStream(traceName, FileMode.Create, FileAccess.Write))
                {
                    await traceSession.EventStream.CopyToAsync(fs);
                }
            });

            Task.WhenAny(copyTask, Task.Delay(TimeSpan.FromMilliseconds(duration * 1000)));
            traceSession.Stop();
        }
    }
}
```
## Print names of processes that published a diagnostics channel

This sample shows how to use `DiagnosticsClient.GetPublishedProcesses` API to print the names of the .NET processes that published a diagnostics IPC channel.

```csharp
using Microsoft.Diagnostics.NETCore.Client;
using System;
using System.Diagnostics;
using System.Linq;

public class ProcessTracker
{
    public static void PrintProcessStatus()
    {
        var processes = DiagnosticsClient.GetPublishedProcesses()
            .Select(Process.GetProcessById)
            .Where(process => process != null);

        foreach (var process in processes)
        {
            Console.WriteLine($"{process.ProcessName}");
        }
    }
}
```
## Parse events in real time

This sample shows an example where we create two tasks, one that parses the events coming in live with `EventPipeEventSource` and one that reads the console input for a user input signaling the program to end. If the target app exits before the user presses enter, the app exits gracefully. Otherwise, `inputTask` will send the Stop command to the pipe and exit gracefully.

```csharp
using Microsoft.Diagnostics.NETCore.Client;
using Microsoft.Diagnostics.Tracing;
using Microsoft.Diagnostics.Tracing.EventPipe;
using Microsoft.Diagnostics.Tracing.Parsers;
using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Threading.Tasks;

public partial class Tracer
{
    public static void PrintEventsLive(int processId)
    {
        var providers = new List<EventPipeProvider>()
        {
            new EventPipeProvider("Microsoft-Windows-DotNETRuntime",
                EventLevel.Informational, (long)ClrTraceEventParser.Keywords.Default)
        };
        var client = new DiagnosticsClient(processId);
        using (var session = client.StartEventPipeSession(providers, false))
        {

            Task streamTask = Task.Run(() =>
            {
                var source = new EventPipeEventSource(session.EventStream);
                source.Clr.All += (TraceEvent obj) => Console.WriteLine(obj.EventName);
                try
                {
                    source.Process();
                }
                // NOTE: This exception does not currently exist. It is something that needs to be added to TraceEvent.
                catch (Exception e)
                {
                    Console.WriteLine("Error encountered while processing events");
                    Console.WriteLine(e.ToString());
                }
            });

            Task inputTask = Task.Run(() =>
            {
                Console.WriteLine("Press Enter to exit");
                while (Console.ReadKey().Key != ConsoleKey.Enter)
                {
                    Task.Delay(TimeSpan.FromMilliseconds(100));
                }
                session.Stop();
            });

            Task.WaitAny(streamTask, inputTask);
        }
    }
}
```
## Attach an ICorProfiler profiler

This sample shows how to attach an ICorProfiler to a process via profiler attach.

```csharp
using System;
using Microsoft.Diagnostics.NETCore.Client;

public class Profiler
{
    public static void AttachProfiler(int processId, Guid profilerGuid, string profilerPath)
    {
        var client = new DiagnosticsClient(processId);
        client.AttachProfiler(TimeSpan.FromSeconds(10), profilerGuid, profilerPath);
    }
}
```
