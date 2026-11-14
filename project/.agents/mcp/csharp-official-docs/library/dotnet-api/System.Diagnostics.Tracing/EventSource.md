---
title: "EventSource class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventSource class

Namespace: `System.Diagnostics.Tracing`

```csharp
public class EventSource : IDisposable
```

Provides the ability to create events for event tracing across platforms.

The `EventSource` class is intended to be inherited by a user class that provides specific events to be used for event tracing. The `EventSource.WriteEvent` methods are called to log the events.

The basic <example-value> of `EventSource` is sufficient for most applications. If you want more control over the event metadata that's created, you can apply the `EventAttribute` attribute to the methods. For advanced event source applications, it is possible to intercept the commands being sent to the derived event source and change the filtering, or to cause actions (such as dumping a data structure) to be performed by the inheritor. An event source can be activated in-process using `EventListener` and out-of-process using EventPipe-based tools such as `dotnet-trace` or Event Tracing for Windows (ETW) based tools like `PerfView` or `Logman`. It is also possible to programmatically control and intercept the data dispatcher. The `EventListener` class provides additional functionality.

#### Conventions

`EventSource`-derived classes should follow the following conventions:

- User-defined classes should implement a singleton pattern. The singleton instance is traditionally named `Log`. By extension, users should not call `IDisposable.Dispose` manually and allow the runtime to clean up the singleton instance at the end of managed code execution.
- A user-defined, derived class should be marked as `sealed` unless it implements the advanced "Utility EventSource" configuration discussed in the Advanced Usage section.
- Call `IsEnabled` before performing any resource intensive work related to firing an event.
- You can implicitly create `EventTask` objects by declaring two event methods with subsequent event IDs that have the naming pattern `<EventName>Start` and `<EventName>Stop`. These events _must_ be declared next to each other in the class definition and the `<EventName>Start` method _must_ come first.
- Attempt to keep `EventSource` objects backwards compatible and version them appropriately. The default version for an event is `0`. The version can be can be changed by setting `Version`. Change the version of an event whenever you change properties of the payload. Always add new payload properties to the end of the event declaration. If this is not possible, create a new event with a new ID to replace the old one.
- When declaring event methods, specify fixed-size payload properties before variably sized properties.
- `EventKeywords` are used as a bit mask for specifying specific events when subscribing to a provider. You can specify keywords by defining a `public static class Keywords` member class that has `public const EventKeywords` members.
- Associate expensive events with an `EventKeywords` using `EventAttribute`. This pattern allows users of your `EventSource` to opt out of these expensive operations.

#### Self-describing (tracelogging) vs. manifest event formats

`EventSource` can be configured into to two different modes based on the constructor used or what flags are set on `EventSourceOptions`.

Historically, these two formats are derived from two formats that Event Tracing for Windows (ETW) used. While these two modes don't affect your ability to use Event Tracing for Windows (ETW) or EventPipe-based listeners, they do generate the metadata for events differently.

The default event format is `EtwManifestEventFormat`, which is set if not specified on `EventSourceSettings`. Manifest-based `EventSource` objects generate an XML document representing the events defined on the class upon initialization. This requires the `EventSource` to reflect over itself to generate the provider and event metadata.

To use self-describing (tracelogging) event format, construct your `EventSource` using the `%23ctor` constructor, the `%23ctor` constructor, or by setting the `EtwSelfDescribingEventFormat` flag on `EventSourceSettings`. Self-describing sources generate minimal provider metadata on initialization and only generate event metadata when `Write` is called. Unlike the manifest-based format, when listening via ETW only the Level, Keyword, and Opcode metadata are included from the `EventAttribute` attribute. Other properties such as EventId or Message are not included.

In practice, these event format settings only affect usage with readers based on Event Tracing for Windows (ETW). They can, however, have a small effect on initialization time and per-event write times due to the time required for reflection and generating the metadata.

#### Examples

The following example shows a simple implementation of the `EventSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventSource/Overview/program.cs._

The following example shows a more complex implementation of the `EventSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventSource/Overview/program1.cs._

#### Advanced usage

Traditionally, user-defined `EventSource` objects expect to inherit directly from `EventSource`. For advanced scenarios, however, you can create `abstract` `EventSource` objects, called _Utility Sources_, and implement interfaces. Using one or both of these techniques allows you to share code between different derived sources.

> **Important:**
> Abstract `EventSource` objects cannot define keywords, tasks, opcodes, channels, or events.

> **Important:**
> To avoid name collisions at runtime when generating event metadata, don't explicitly implement interface methods when using interfaces with `EventSource`.

The following example shows an implementation of `EventSource` that uses an interface.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventSource/Overview/program2.cs._
The following example shows an implementation of `EventSource` that uses the Utility EventSource pattern.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventSource/Overview/program2.cs._
The following example shows an implementation of `EventSource` for tracing information about a component in a library.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventSource/Overview/program2.cs._
## EventSource.EventSource() constructor

```csharp
protected EventSource ();
```

Creates a new instance of the `EventSource` class.

To be added.

## EventSource.EventSource(Boolean) constructor

```csharp
protected EventSource (bool throwOnEventWriteErrors);
```

Creates a new instance of the `EventSource` class and specifies whether to throw an exception when an error occurs in the underlying Windows code.

Parameters:

- `throwOnEventWriteErrors`: `true` to throw an exception when an error occurs in the underlying Windows code; otherwise, `false`.

To be added.

## EventSource.EventSource(EventSourceSettings) constructor

```csharp
protected EventSource (System.Diagnostics.Tracing.EventSourceSettings settings);
```

Creates a new instance of the `EventSource` class with the specified configuration settings.

Parameters:

- `settings`: A bitwise combination of the enumeration values that specify the configuration settings to apply to the event source.

#### Remarks
Specifying `settings` when the `EventSource` is constructed enables you to  specify whether the event is written in a manifest-based or a self-describing format. In addition, you can specify that an exception should be raised when an error occurs during the event-writing process.

## EventSource.EventSource(String) constructor

```csharp
public EventSource (string eventSourceName);
```

Creates a new instance of the `EventSource` class with the specified name.

Parameters:

- `eventSourceName`: The name to apply to the event source. Must not be `null`.

Exceptions:

- `ArgumentNullException`: `eventSourceName` is `null`.

When using this constructor, ensure that the `eventSourceName` argument matches the ETW name defined by the `EventSourceAttribute` attribute on that type. Otherwise, the GUIDs returned by the `Guid` property and the `GetGuid` method will be different. If the event source names differ, the `Guid` property returns the GUID used to register this EventSource with ETW.

## EventSource.EventSource(EventSourceSettings, String[]) constructor

```csharp
protected EventSource (System.Diagnostics.Tracing.EventSourceSettings settings, params string[]? traits);
```

Initializes a new instance of the `EventSource` to be used with non-contract events that contains the specified settings and traits.

Parameters:

- `settings`: A bitwise combination of the enumeration values that specify the configuration settings to apply to the event source.
- `traits`: The key-value pairs that specify traits for the event source.

Exceptions:

- `ArgumentException`: `traits` is not specified in key-value pairs.

#### Remarks
Traits provide additional information for an event and are interpreted by an event listener. Traits are specified as key-value pairs and if not specified in pairs, an exception will occur. You can retrieve a trait by passing the key to the `EventSource.GetTrait`, method.

Specifying `settings` when the `EventSource` is constructed enables you to specify whether the event is written in a manifest-based or a self-describing format. In addition, you can specify that an exception should be raised when an error occurs during the event-writing process.

## EventSource.EventSource(String, EventSourceSettings) constructor

```csharp
public EventSource (string eventSourceName, System.Diagnostics.Tracing.EventSourceSettings config);
```

Creates a new instance of the `EventSource` class with the specified name and settings.

Parameters:

- `eventSourceName`: The name to apply to the event source. Must not be `null`.
- `config`: A bitwise combination of the enumeration values that specify the configuration settings to apply to the event source.

Exceptions:

- `ArgumentNullException`: `eventSourceName` is `null`.

#### Remarks
Specifying `settings` when the `EventSource` is constructed enables you to specify whether the event is written in a manifest-based or a self-describing format. In addition, you can specify that an exception should be raised when an error occurs during the event-writing process.

When using this constructor, ensure that the `eventSourceName` argument matches the ETW name defined by the `EventSourceAttribute` attribute on that type. Otherwise, the GUIDs returned by the `Guid` property and the `GetGuid` method will be different.

In such cases, the `Guid` property returns the GUID used to register this EventSource with ETW.

## EventSource.EventSource(String, Guid) constructor

```csharp
public EventSource (string eventSourceName, Guid eventSourceGuid);
```

To be added.

Parameters:

- `eventSourceName`: To be added.
- `eventSourceGuid`: To be added.

To be added.

## EventSource.EventSource(String, EventSourceSettings, String[]) constructor

```csharp
public EventSource (string eventSourceName, System.Diagnostics.Tracing.EventSourceSettings config, params string[]? traits);
```

Creates a new instance of the `EventSource` class with the specified configuration settings.

Parameters:

- `eventSourceName`: The name to apply to the event source. Must not be `null`.
- `config`: A bitwise combination of the enumeration values that specify the configuration settings to apply to the event source.
- `traits`: The key-value pairs that specify traits for the event source.

Exceptions:

- `ArgumentNullException`: `eventSourceName` is `null`.
- `ArgumentException`: `traits` is not specified in key-value pairs.

#### Remarks
Traits provide additional information for an event and are interpreted by an event listener. Traits are specified as key-value pairs and if not specified in pairs, an exception will occur. You can retrieve a trait by passing the key to the `EventSource.GetTrait`, method.

Specifying `config` when the `EventSource` is constructed enables you to specify whether the event is written in a manifest-based or a self-describing format. In addition, you can specify that an exception should be raised when an error occurs during the event-writing process.

When using this constructor, ensure that the `eventSourceName` argument matches the ETW name defined by the `EventSourceAttribute` attribute on that type. Otherwise, the GUIDs returned by the `Guid` property and the `GetGuid` method will be different.

In such cases, the GUID used to register this EventSource with ETW is the one returned by `Guid`.

## EventSource.EventSource(String, Guid, EventSourceSettings, String[]) constructor

```csharp
public EventSource (string eventSourceName, Guid eventSourceGuid, System.Diagnostics.Tracing.EventSourceSettings settings, string[]? traits = default);
```

To be added.

Parameters:

- `eventSourceName`: To be added.
- `eventSourceGuid`: To be added.
- `settings`: To be added.
- `traits`: To be added.

To be added.

## EventSource.ConstructionException property

```csharp
public Exception? ConstructionException { get; }
```

Gets any exception that was thrown during the construction of the event source.

Returns: The exception that was thrown during the construction of the event source, or `null` if no exception was thrown.

#### Remarks
`EventSource` constructors do not throw exceptions. Instead, any exception that is thrown is assigned to the `ConstructionException` property and logged by the `Trace.WriteLine` method.

## EventSource.CurrentThreadActivityId property

```csharp
public static Guid CurrentThreadActivityId { get; }
```

Gets the activity ID of the current thread.

Returns: The activity ID of the current thread.

To be added.

## EventSource.Guid property

```csharp
public Guid Guid { get; }
```

The unique identifier for the event source.

Returns: A unique identifier for the event source.

To be added.

## EventSource.Name property

```csharp
public string Name { get; }
```

The friendly name of the class that is derived from the event source.

Returns: The friendly name of the derived class. The default is the simple name of the class.

To be added.

## EventSource.Settings property

```csharp
public System.Diagnostics.Tracing.EventSourceSettings Settings { get; }
```

Gets the settings applied to this event source.

Returns: The settings applied to this event source.

To be added.
