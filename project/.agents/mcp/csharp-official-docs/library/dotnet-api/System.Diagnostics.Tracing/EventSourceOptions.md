---
title: "EventSourceOptions struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventSourceOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventSourceOptions struct

Namespace: `System.Diagnostics.Tracing`

```csharp
public struct EventSourceOptions
```

Specifies overrides of default event settings such as the log level, keywords and operation code when the `EventSource.Write<T>` method is called.

#### Remarks
For more information about ETW keywords and levels, see CLR ETW Keywords and Levels

## EventSourceOptions.ActivityOptions property

```csharp
public System.Diagnostics.Tracing.EventActivityOptions ActivityOptions { get; set; }
```

The activity options defined for this event source.

Returns: Returns `EventActivityOptions`.

To be added.

## EventSourceOptions.Keywords property

```csharp
public System.Diagnostics.Tracing.EventKeywords Keywords { get; set; }
```

Gets or sets the keywords applied to the event. If this property is not set, the event's keywords will be `None`.

Returns: The keywords applied to the event, or `None` if no keywords are set.

To be added.

## EventSourceOptions.Level property

```csharp
public System.Diagnostics.Tracing.EventLevel Level { get; set; }
```

Gets or sets the event level applied to the event.

Returns: The event level for the event. If not set, the default is Verbose (5).

#### Remarks
ETW events can also be filtered by level. If the level is set at Verbose (5), events of all levels, including Verbose and below are raised. If the level is set at Error (2), only events that belong to Error level and below are raised.

## EventSourceOptions.Opcode property

```csharp
public System.Diagnostics.Tracing.EventOpcode Opcode { get; set; }
```

Gets or sets the operation code to use for the specified event.

Returns: The operation code to use for the specified event. If not set, the default is `Info` (0).

To be added.

## EventSourceOptions.Tags property

```csharp
public System.Diagnostics.Tracing.EventTags Tags { get; set; }
```

The event tags defined for this event source.

Returns: Returns `EventTags`.

To be added.
