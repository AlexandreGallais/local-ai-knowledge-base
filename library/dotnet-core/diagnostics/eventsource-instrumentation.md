---
title: "Instrument Code to Create EventSource Events (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/eventsource-instrumentation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Instrument Code to Create EventSource Events

**This article applies to: ✔️** .NET Core 3.1 and later versions **✔️** .NET Framework 4.5 and later versions

The Getting Started guide showed you how to create a minimal EventSource and collect events in a trace file.
This tutorial goes into more detail about creating events using `System.Diagnostics.Tracing.EventSource`.

## A minimal EventSource

```c#
[EventSource(Name = "Demo")]
class DemoEventSource : EventSource
{
    public static DemoEventSource Log { get; } = new DemoEventSource();

    [Event(1)]
    public void AppStarted(string message, int favoriteNumber) => WriteEvent(1, message, favoriteNumber);
}
```

The basic <example-value> of a derived EventSource is always the same. In particular:

- The class inherits from `System.Diagnostics.Tracing.EventSource`
- For each different type of event you wish to generate, a method needs to be defined.
  This method should be named using the name of the event being created. If the event has additional data these should be
  passed using arguments. These event arguments need to be serialized so only certain types are allowed.
- Each method has a body that calls WriteEvent passing it an ID (a numeric value that represents the event) and the
  arguments of the event method. The ID needs to be unique within the EventSource. The ID is explicitly assigned
  using the `System.Diagnostics.Tracing.EventAttribute`
- EventSources are intended to be singleton instances. Thus it's convenient to define a static variable, by convention
  called `Log`, that represents this singleton.

## Rules for defining event methods

1. Any instance, non-virtual, void returning method defined in an EventSource class is by default an event logging method.
2. Virtual or non-void-returning methods are included only if they're marked with the
`System.Diagnostics.Tracing.EventAttribute`
3. To mark a qualifying method as non-logging you must decorate it with the
`System.Diagnostics.Tracing.NonEventAttribute`
4. Event logging methods have event IDs associated with them. This can be done either explicitly by decorating the method
with a `System.Diagnostics.Tracing.EventAttribute` or implicitly by the ordinal number of
the method in the class. For example using implicit numbering the first method in the class has ID 1, the second has ID 2, and
so on.
5. Event logging methods must call a `System.Diagnostics.Tracing.EventSource.WriteEvent*`,
`System.Diagnostics.Tracing.EventSource.WriteEventCore*`,
`System.Diagnostics.Tracing.EventSource.WriteEventWithRelatedActivityId*` or
`System.Diagnostics.Tracing.EventSource.WriteEventWithRelatedActivityIdCore*` overload.
6. The event ID, whether implied or explicit, must match the first argument passed to the WriteEvent\* API it calls.
7. The number, types and order of arguments passed to the EventSource method must align with how they're passed
to the WriteEvent\* APIs. For WriteEvent the arguments follow the Event ID, for WriteEventWithRelatedActivityId the arguments
follow the relatedActivityId. For the WriteEvent\*Core methods, the arguments must be serialized manually into the
`data` parameter.
8. Event names cannot contain `<` or `>` characters. While user-defined methods also cannot contain these characters, `async` methods
will be rewritten by the compiler to contain them. To be sure these generated methods don't become events, mark all non-event methods on an `System.Diagnostics.Tracing.EventSource`
with the `System.Diagnostics.Tracing.NonEventAttribute`.

## Best practices

1. Types that derive from EventSource usually don't have intermediate types in the hierarchy or implement interfaces. See
Advanced customizations below for some exceptions where this may be useful.
2. Generally the name of the EventSource class is a bad public name for the EventSource. Public names, the names that will
show up in logging configurations and log viewers, should be globally unique. Thus it's good practice to give your EventSource
a public name using the `System.Diagnostics.Tracing.EventSourceAttribute`. The name "Demo"
used above is short and unlikely to be unique so not a good choice for production use. A common convention is to use a
hierarchical name with `.` or `-` as a separator, such as "MyCompany-Samples-Demo", or the name of the Assembly or namespace for
which the EventSource provides events. It's not recommended to include "EventSource" as part of the public name.
3. Assign Event IDs explicitly, this way seemingly benign changes to the code in the source class such as rearranging it or
adding a method in the middle won't change the event ID associated with each method.
4. When authoring events that represent the start and end of a unit of work, by convention these methods are named with
suffixes 'Start' and 'Stop'. For example, 'RequestStart' and 'RequestStop'.
5. Do not specify an explicit value for EventSourceAttribute’s Guid property, unless you need it for backwards compatibility reasons.
The default Guid value is derived from the source’s name, which allows tools to accept the more human-readable name and derive
the same Guid.
6. Call `System.Diagnostics.Tracing.EventSource.IsEnabled` before performing any resource intensive work related to
firing an event, such as computing an expensive event argument that won't be needed if the event is disabled.
7. Attempt to keep EventSource object back compatible and version them appropriately. The default version for an event is 0.
The version can be changed by setting `System.Diagnostics.Tracing.EventAttribute.Version`.
Change the version of an event whenever you change the data that is serialized with it. Always add new serialized data to the
end of the event declaration, that is, at the end of the list of method parameters. If this isn't possible, create a new event with a
new ID to replace the old one.
8. When declaring events methods, specify fixed-size payload data before variably sized data.
9. Do not use strings containing null characters. When generating the manifest for ETW EventSource will declare all strings as null terminated, even though it is possible to have a null character in a C# String. If a string contains a null character the entire string will be written to the event payload, but any parser will treat the first null character as the end of the string. If there are payload arguments after the string, the remainder of the string will be parsed instead of the intended value.

## Typical event customizations

### Setting event verbosity levels

Each event has a verbosity level and event subscribers often enable all events on an EventSource up to a certain verbosity level.
Events declare their verbosity level using the `System.Diagnostics.Tracing.EventAttribute.Level` property. For example in
this EventSource below a subscriber that requests events of level Informational and lower won't log the Verbose DebugMessage
event.

```c#
[EventSource(Name = "MyCompany-Samples-Demo")]
class DemoEventSource : EventSource
{
    public static DemoEventSource Log { get; } = new DemoEventSource();

    [Event(1, Level = EventLevel.Informational)]
    public void AppStarted(string message, int favoriteNumber) => WriteEvent(1, message, favoriteNumber);
    [Event(2, Level = EventLevel.Verbose)]
    public void DebugMessage(string message) => WriteEvent(2, message);
}
```

If the verbosity level of an event is not specified in the EventAttribute, then it defaults to Informational.

#### Best practice

Use levels less than Informational for relatively rare warnings or errors. When in doubt, stick with the default of Informational and
use Verbose for events that occur more frequently than 1000 events/sec.

### Setting event keywords

Some event tracing systems support keywords as an additional filtering mechanism. Unlike verbosity that categorizes events by level
of detail, keywords are intended to categorize events based on other criteria such as areas of code functionality or which would be useful
for diagnosing certain problems. Keywords are named bit flags and each event can have any combination of keywords applied to it. For
example the EventSource below defines some events that relate to request processing and other events that relate to startup. If a developer wanted to analyze the performance of startup, they might only enable logging the events marked with the startup keyword.

```c#
[EventSource(Name = "Demo")]
class DemoEventSource : EventSource
{
    public static DemoEventSource Log { get; } = new DemoEventSource();

    [Event(1, Keywords = Keywords.Startup)]
    public void AppStarted(string message, int favoriteNumber) => WriteEvent(1, message, favoriteNumber);
    [Event(2, Keywords = Keywords.Requests)]
    public void RequestStart(int requestId) => WriteEvent(2, requestId);
    [Event(3, Keywords = Keywords.Requests)]
    public void RequestStop(int requestId) => WriteEvent(3, requestId);

    public class Keywords   // This is a bitvector
    {
        public const EventKeywords Startup = (EventKeywords)0x0001;
        public const EventKeywords Requests = (EventKeywords)0x0002;
    }
}
```

Keywords must be defined by using a nested class called `Keywords` and each individual keyword is defined by a member typed
`public const EventKeywords`.

#### Best practice

Keywords are more important when distinguishing between high volume events. This allows an event consumer to raise the
verbosity to a high level but manage the performance overhead and log size by only enabling narrow subsets of the events.
Events that are triggered more than 1,000/sec are good candidates for a unique keyword.

## Supported parameter types

EventSource requires that all event parameters can be serialized so it only accepts a limited set of types. These are:

- Primitives: bool, byte, sbyte, char, short, ushort, int, uint, long, ulong, float, double, IntPtr, and UIntPtr, Guid
  decimal, string,  DateTime, DateTimeOffset, TimeSpan
- Enums
- Structures attributed with `System.Diagnostics.Tracing.EventDataAttribute`. Only
  the public instance properties with serializable types will be serialized.
- Anonymous types where all public properties are serializable types
- Arrays of serializable types
- Nullable\<T\> where T is a serializable type
- KeyValuePair\<T, U\> where T and U are both serializable types
- Types that implement IEnumerable\<T\> for exactly one type T and where T is a serializable type

## Troubleshooting

The EventSource class was designed so that it would never throw an Exception by default. This is a useful property, as
logging is often treated as optional, and you usually don't want an error writing a log message to cause your application
to fail. However, this makes finding any mistake in your EventSource difficult. Here are several techniques that can help
troubleshoot:

1. The EventSource constructor has overloads that take `System.Diagnostics.Tracing.EventSourceSettings`. Try
enabling the ThrowOnEventWriteErrors flag temporarily.
2. The `System.Diagnostics.Tracing.EventSource.ConstructionException` property
stores any Exception that was generated when validating the event logging methods. This can reveal various
authoring errors.
3. EventSource logs errors using event ID 0, and this error event has a string describing the error.
4. When debugging, that same error string will also be logged using Debug.WriteLine() and show up in the debug
output window.
5. EventSource internally throws and then catches exceptions when errors occur. To observe when these exceptions are occurring, enable first chance exceptions
in a debugger, or use event tracing with the .NET runtime's Exception events enabled.
