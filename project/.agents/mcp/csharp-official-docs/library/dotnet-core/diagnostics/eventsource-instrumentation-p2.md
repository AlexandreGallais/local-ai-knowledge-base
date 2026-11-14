---
title: "Instrument Code to Create EventSource Events (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/eventsource-instrumentation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Instrument Code to Create EventSource Events (part 2 of 2)

## Advanced customizations

### Setting OpCodes and Tasks

ETW has concepts of Tasks and OpCodes,
which are further mechanisms for tagging and filtering events. You can associate events with specific tasks and opcodes
using the `System.Diagnostics.Tracing.EventAttribute.Task` and
`System.Diagnostics.Tracing.EventAttribute.Opcode` properties. Here's an example:

```c#
[EventSource(Name = "Samples-EventSourceDemos-Customized")]
public sealed class CustomizedEventSource : EventSource
{
    static public CustomizedEventSource Log { get; } = new CustomizedEventSource();

    [Event(1, Task = Tasks.Request, Opcode=EventOpcode.Start)]
    public void RequestStart(int RequestID, string Url)
    {
        WriteEvent(1, RequestID, Url);
    }

    [Event(2, Task = Tasks.Request, Opcode=EventOpcode.Info)]
    public void RequestPhase(int RequestID, string PhaseName)
    {
        WriteEvent(2, RequestID, PhaseName);
    }

    [Event(3, Keywords = Keywords.Requests,
           Task = Tasks.Request, Opcode=EventOpcode.Stop)]
    public void RequestStop(int RequestID)
    {
        WriteEvent(3, RequestID);
    }

    public class Tasks
    {
        public const EventTask Request = (EventTask)0x1;
    }
}
```

You can implicitly create EventTask objects by declaring two event methods with subsequent event IDs that have the naming
pattern \<EventName\>Start and \<EventName\>Stop. These events must be declared next to each other in the class definition and
the \<EventName\>Start method must come first.

### Self-describing (tracelogging) vs. manifest event formats

This concept only matters when subscribing to EventSource from ETW. ETW has two different ways that it can log events,
manifest format and self-describing (sometimes called tracelogging) format. Manifest-based EventSource objects generate
and log an XML document representing the events defined on the class upon initialization. This requires the EventSource
to reflect over itself to generate the provider and event metadata. In the Self-describing format metadata for each event is
transmitted inline with the event data rather than up-front. The self-describing approach supports the more flexible
`System.Diagnostics.Tracing.EventSource.Write*` methods that can send arbitrary events without having created
a pre-defined event logging method. It's also slightly faster at startup because it avoids eager reflection. However the
extra metadata that's emitted with each event adds a small performance overhead, which may not be desirable when sending
a high volume of events.

To use self-describing event format, construct your EventSource using the EventSource(String) constructor, the
EventSource(String, EventSourceSettings) constructor, or by setting the EtwSelfDescribingEventFormat flag on EventSourceSettings.

### EventSource types implementing interfaces

An EventSource type may implement an interface in order to integrate seamlessly in various advanced logging
systems that use interfaces to define a common logging target. Here's an example of a possible use:

```c#
public interface IMyLogging
{
    void Error(int errorCode, string msg);
    void Warning(string msg);
}

[EventSource(Name = "Samples-EventSourceDemos-MyComponentLogging")]
public sealed class MyLoggingEventSource : EventSource, IMyLogging
{
    public static MyLoggingEventSource Log { get; } = new MyLoggingEventSource();

    [Event(1)]
    public void Error(int errorCode, string msg)
    { WriteEvent(1, errorCode, msg); }

    [Event(2)]
    public void Warning(string msg)
    { WriteEvent(2, msg); }
}
```

You must specify the EventAttribute on the interface methods, otherwise (for compatibility reasons) the method won't
be treated as a logging method. Explicit interface method implementation is disallowed in order to prevent naming collisions.

### EventSource class hierarchies

In most cases, you'll be able to write types that directly derive from the EventSource class. Sometimes however it's useful to define functionality that will be shared by multiple derived EventSource types, such as customized WriteEvent
overloads (see optimizing performance for high volume events below).

Abstract base classes can be used as long as they don't define any keywords, tasks, opcodes, channels, or events. Here's
an example where the UtilBaseEventSource class defines an optimized WriteEvent overload this is needed by multiple derived
EventSources in the same component. One of these derived types is illustrated below as OptimizedEventSource.

```c#
public abstract class UtilBaseEventSource : EventSource
{
    protected UtilBaseEventSource()
        : base()
    { }
    protected UtilBaseEventSource(bool throwOnEventWriteErrors)
        : base(throwOnEventWriteErrors)
    { }

    protected unsafe void WriteEvent(int eventId, int arg1, short arg2, long arg3)
    {
        if (IsEnabled())
        {
            EventSource.EventData* descrs = stackalloc EventSource.EventData[2];
            descrs[0].DataPointer = (IntPtr)(&arg1);
            descrs[0].Size = 4;
            descrs[1].DataPointer = (IntPtr)(&arg2);
            descrs[1].Size = 2;
            descrs[2].DataPointer = (IntPtr)(&arg3);
            descrs[2].Size = 8;
            WriteEventCore(eventId, 3, descrs);
        }
    }
}

[EventSource(Name = "OptimizedEventSource")]
public sealed class OptimizedEventSource : UtilBaseEventSource
{
    public static OptimizedEventSource Log { get; } = new OptimizedEventSource();

    [Event(1, Keywords = Keywords.Kwd1, Level = EventLevel.Informational,
           Message = "LogElements called {0}/{1}/{2}.")]
    public void LogElements(int n, short sh, long l)
    {
        WriteEvent(1, n, sh, l); // Calls UtilBaseEventSource.WriteEvent
    }

    #region Keywords / Tasks /Opcodes / Channels
    public static class Keywords
    {
        public const EventKeywords Kwd1 = (EventKeywords)1;
    }
    #endregion
}
```

## Optimizing performance for high volume events

The EventSource class has a number of overloads for WriteEvent, including one for variable number of arguments. When none of the other
overloads match, the params method is called. Unfortunately, the params overload is relatively expensive. In particular it:

1. Allocates an array to hold the variable arguments.
2. Casts each parameter to an object, which causes allocations for value types.
3. Assigns these objects to the array.
4. Calls the function.
5. Figures out the type of each array element to determine how to serialize it.

This is probably 10 to 20 times as expensive as specialized types. This doesn't matter much for low volume cases, but for high
volume events it can be important. There are two important cases for insuring that the params overload isn't used:

1. Ensure that enumerated types are cast to 'int' so that they match one of the fast overloads.
2. Create new fast WriteEvent overloads for high volume payloads.

Here's an example for adding a WriteEvent overload that takes four integer arguments

```c#
[NonEvent]
public unsafe void WriteEvent(int eventId, int arg1, int arg2,
                              int arg3, int arg4)
{
    EventData* descrs = stackalloc EventProvider.EventData[4];

    descrs[0].DataPointer = (IntPtr)(&arg1);
    descrs[0].Size = 4;
    descrs[1].DataPointer = (IntPtr)(&arg2);
    descrs[1].Size = 4;
    descrs[2].DataPointer = (IntPtr)(&arg3);
    descrs[2].Size = 4;
    descrs[3].DataPointer = (IntPtr)(&arg4);
    descrs[3].Size = 4;

    WriteEventCore(eventId, 4, (IntPtr)descrs);
}
```
