---
title: "EventWrittenEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventWrittenEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventWrittenEventArgs class

Namespace: `System.Diagnostics.Tracing`

```csharp
public class EventWrittenEventArgs : EventArgs
```

Provides data for the `EventListener.OnEventWritten` callback.

The `EventWrittenEventArgs` class provides data for the `EventListener.OnEventWritten` callback.

Whenever an event is dispatched to an `EventListener`, the `EventListener.OnEventWritten` callback method is invoked. It is passed an `EventWrittenEventArgs` instance that contains information associated with the event. All property values of the `EventWrittenEventArgs` class are valid only during the callback.

The following sections contain additional information about individual `EventWrittenEventArgs` properties.

#### ActivityId property

When using `Activity` and its derived classes, threads can be marked as having an activity associated with them. The `ActivityId` property returns the activity ID of the thread that logged the event. Note that threads do not have to have an activity, in which case this property returns `Empty`.

#### OSThreadId and TimeStamp properties

`EventListener` objects can subscribe to native runtime events (such as GC, JIT, and threadpool events) in addition to events emitted by `EventSource` objects. Not all native runtime events can be dispatched synchronously, however. Some events, such as GC events, are emitted when managed thread execution is suspended. These events are buffered in native code and are dispatched by a dispatcher thread once managed code can execute again. Because these events are buffered, the environment cannot be used to reliably retrieve the thread ID and timestamp. Thread ID and timestamp information are available as members of the `EventWrittenEventArgs` class.

#### RelatedActivityId property

A related activity is an activity that is strongly related to the current one. Typically, it is either the activity that caused the current activity (events with the `Start` opcode typically do this) or an activity that was created by the current one (events with the `Send` opcode typically do this). When it is used, the `RelatedActivityID` is explicitly passed by the method doing the logging. Many events don't pass a `RelatedActivityId`, in which case this property returns `Empty`.

## EventWrittenEventArgs.ActivityId property

```csharp
public Guid ActivityId { get; }
```

Gets the activity ID on the thread that the event was written to.

Returns: The activity ID on the thread that the event was written to.

To be added.

## EventWrittenEventArgs.Channel property

```csharp
public System.Diagnostics.Tracing.EventChannel Channel { get; }
```

Gets the channel for the event.

Returns: The channel for the event.

To be added.

## EventWrittenEventArgs.EventId property

```csharp
public int EventId { get; }
```

Gets the event identifier.

Returns: The event identifier.

To be added.

## EventWrittenEventArgs.EventName property

```csharp
public string? EventName { get; }
```

Gets the name of the event.

Returns: The name of the event.

To be added.

## EventWrittenEventArgs.EventSource property

```csharp
public System.Diagnostics.Tracing.EventSource EventSource { get; }
```

Gets the event source object.

Returns: The event source object.

To be added.

## EventWrittenEventArgs.Keywords property

```csharp
public System.Diagnostics.Tracing.EventKeywords Keywords { get; }
```

Gets the keywords for the event.

Returns: The keywords for the event.

To be added.

## EventWrittenEventArgs.Level property

```csharp
public System.Diagnostics.Tracing.EventLevel Level { get; }
```

Gets the level of the event.

Returns: The level of the event.

To be added.

## EventWrittenEventArgs.Message property

```csharp
public string? Message { get; }
```

Gets the message for the event.

Returns: The message for the event.

To be added.

## EventWrittenEventArgs.Opcode property

```csharp
public System.Diagnostics.Tracing.EventOpcode Opcode { get; }
```

Gets the operation code for the event.

Returns: The operation code for the event.

To be added.

## EventWrittenEventArgs.OSThreadId property

```csharp
public long OSThreadId { get; }
```

Gets the thread identifier for the OS thread that wrote the event.

Returns: The thread identifier for the OS thread that wrote the event.

To be added.

## EventWrittenEventArgs.Payload property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<object?>? Payload { get; }
```

Gets the payload for the event.

Returns: The payload for the event.

To be added.

## EventWrittenEventArgs.PayloadNames property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<string>? PayloadNames { get; }
```

Returns a list of strings that represent the property names of the event.

Returns: Returns `ReadOnlyCollection<T>`.

To be added.

## EventWrittenEventArgs.RelatedActivityId property

```csharp
public Guid RelatedActivityId { get; }
```

Gets the identifier of an activity that is related to the activity represented by the current instance.

Returns: The identifier of the related activity, or `Guid.Empty` if there is no related activity.

To be added.

## EventWrittenEventArgs.Tags property

```csharp
public System.Diagnostics.Tracing.EventTags Tags { get; }
```

Returns the tags specified in the call to the `EventSource.Write` method.

Returns: Returns `EventTags`.

To be added.

## EventWrittenEventArgs.Task property

```csharp
public System.Diagnostics.Tracing.EventTask Task { get; }
```

Gets the task for the event.

Returns: The task for the event.

To be added.

## EventWrittenEventArgs.TimeStamp property

```csharp
public DateTime TimeStamp { get; }
```

Gets the time that the event was originally generated as a `DateTime` timestamp.

Returns: The date and time when the event was logged. The system tries to be as precise as possible.

To be added.

## EventWrittenEventArgs.Version property

```csharp
public byte Version { get; }
```

Gets the version of the event.

Returns: The version of the event.

To be added.
