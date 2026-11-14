---
title: "EventAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventAttribute class

Namespace: `System.Diagnostics.Tracing`

```csharp
public sealed class EventAttribute : Attribute
```

Specifies additional event schema information for an event.

When you apply this attribute to an ETW event method defined on an `EventSource`-derived class, you must call the `EventSource.WriteEvent` method on the base class, passing the event ID, followed by the same arguments as the defined method is passed. Follow the pattern shown in the examples.

#### Examples

The following example shows how to use the `EventAttribute` class to define an event. This code example is part of a larger example provided for the EventSource class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

## EventAttribute.EventAttribute(Int32) constructor

```csharp
public EventAttribute (int eventId);
```

Initializes a new instance of the `EventAttribute` class with the specified event identifier.

Parameters:

- `eventId`: The event identifier for the event.

#### Examples
The following example shows how to use the `EventAttribute.%23ctor` constructor to specify events. This code example is part of a larger example provided for the EventSource class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

## EventAttribute.ActivityOptions property

```csharp
public System.Diagnostics.Tracing.EventActivityOptions ActivityOptions { get; set; }
```

Specifies the behavior of the start and stop events of an activity. An activity is the region of time in an app between the start and the stop.

Returns: Returns `EventActivityOptions`.

To be added.

## EventAttribute.Channel property

```csharp
public System.Diagnostics.Tracing.EventChannel Channel { get; set; }
```

Gets or sets an additional event log where the event should be written.

Returns: An additional event log where the event should be written.

To be added.

## EventAttribute.EventId property

```csharp
public int EventId { get; }
```

Gets or sets the identifier for the event.

Returns: The event identifier. This value should be between 0 and 65535.

`EventAttribute.EventId` should be greater than 0 or less than 65535 or errors can occur in a tracing operation. If errors do occur, you can get more information about the source of the error by checking the output stream of the debugger, if you have a debugger attached to the process firing events. You can also look for errors reported in the ETW event stream, if you have an ETW listener on the event source where the error occurs.

## EventAttribute.Keywords property

```csharp
public System.Diagnostics.Tracing.EventKeywords Keywords { get; set; }
```

Gets or sets the keywords for the event.

Returns: A bitwise combination of the enumeration values.

#### Examples
The following example shows how to use the `Keywords` property to define event keywords. This code example is part of a larger example provided for the EventSource class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

## EventAttribute.Level property

```csharp
public System.Diagnostics.Tracing.EventLevel Level { get; set; }
```

Gets or sets the level for the event.

Returns: One of the enumeration values that specifies the level for the event.

#### Examples

The following example shows how to use the `Level` property to specify an event level. This code example is part of a larger example provided for the EventSource class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

## EventAttribute.Message property

```csharp
public string? Message { get; set; }
```

Gets or sets the message for the event.

Returns: The message for the event.

You can use standard .NET substitution operators (for example, {1}) in the string. They will be replaced with the string representation of the corresponding part of the event payload.

```csharp
[Event(1, Message = "Application Failure: {0}", Level = EventLevel.Error, Keywords = Keywords.Diagnostic)]
        public void Failure(string message) { WriteEvent(1, message); }
```

#### Examples

The following example shows how to use the `Message` property to specify an event message. This code example is part of a larger example provided for the EventSource class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

## EventAttribute.Opcode property

```csharp
public System.Diagnostics.Tracing.EventOpcode Opcode { get; set; }
```

Gets or sets the operation code for the event.

Returns: One of the enumeration values that specifies the operation code.

#### Examples

The following example shows how to use the `Opcode` property to specify operation codes. This code example is part of a larger example provided for the EventSource class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

## EventAttribute.Tags property

```csharp
public System.Diagnostics.Tracing.EventTags Tags { get; set; }
```

Gets or sets the `EventTags` value for this `EventAttribute` object. An event tag is a user-defined value that is passed through when the event is logged.

Returns: The `EventTags` value for this `EventAttribute` object. An event tag is a user-defined value that is passed through when the event is logged.

To be added.

## EventAttribute.Task property

```csharp
public System.Diagnostics.Tracing.EventTask Task { get; set; }
```

Gets or sets the task for the event.

Returns: The task for the event.

#### Examples

The following example shows how to use the `Task` property to define event tasks. This code example is part of a larger example provided for the EventSource class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

## EventAttribute.Version property

```csharp
public byte Version { get; set; }
```

Gets or sets the version of the event.

Returns: The version of the event.

To be added.
