---
title: "EventLevel enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventLevel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLevel enum

Namespace: `System.Diagnostics.Tracing`

```csharp
public enum EventLevel
```

Identifies the level of an event.

The level signifies the severity of an event. Lower severity levels encompass <example-value> severity levels. For example, `Warning` includes the `Error` and `Critical` levels, which are higher in severity.

#### Examples

The following example shows how to use the `Error` enumeration member to identify an error message. This example is part of a larger example provided for the `EventSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

The following example shows how to use the `Informational` enumeration member to identify an informational message. This example is part of a larger example provided for the `EventSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

The following example shows how to use the `Verbose` enumeration member to identify a verbose message. This example is part of a larger example provided for the `EventSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

## EventLevel.Critical field

```csharp
Critical
```

This level corresponds to a critical error, which is a serious error that has caused a major failure.

## EventLevel.Error field

```csharp
Error
```

This level adds standard errors that signify a problem.

## EventLevel.Informational field

```csharp
Informational
```

This level adds informational events or messages that are not errors. These events can help trace the progress or state of an application.

## EventLevel.LogAlways field

```csharp
LogAlways
```

No level filtering is done on the event. When used as a level filter for enabling events, for example in EventListener.EnableEvents(), events of all levels will be included.

## EventLevel.Verbose field

```csharp
Verbose
```

This level adds lengthy events or messages. It causes all events to be logged.

## EventLevel.Warning field

```csharp
Warning
```

This level adds warning events (for example, events that are published because a disk is nearing full capacity).
