---
title: "EventOpcode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventOpcode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventOpcode enum

Namespace: `System.Diagnostics.Tracing`

```csharp
public enum EventOpcode
```

Defines the standard operation codes that the event source attaches to events.

#### Examples

The following example shows how to use the `Start` enumeration member to specify a start operation.  This code example is part of a larger example provided for the EventSource class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

The following example shows how to use the `Stop` enumeration member to specify a stop operation.  This code example is part of a larger example provided for the EventSource class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

## EventOpcode.DataCollectionStart field

```csharp
DataCollectionStart
```

A trace collection start event.

## EventOpcode.DataCollectionStop field

```csharp
DataCollectionStop
```

A trace collection stop event.

## EventOpcode.Extension field

```csharp
Extension
```

An extension event.

## EventOpcode.Info field

```csharp
Info
```

An informational event.

## EventOpcode.Receive field

```csharp
Receive
```

An event that is published when one activity in an application receives data.

## EventOpcode.Reply field

```csharp
Reply
```

An event that is published after an activity in an application replies to an event.

## EventOpcode.Resume field

```csharp
Resume
```

An event that is published after an activity in an application resumes from a suspended state. The event should follow an event that has the `EventOpcode.Suspend` operation code.

## EventOpcode.Send field

```csharp
Send
```

An event that is published when one activity in an application transfers data or system resources to another activity.

## EventOpcode.Start field

```csharp
Start
```

An event that is published when an application starts a new transaction or activity. This operation code can be embedded within another transaction or activity when multiple events that have the `EventOpcode.Start` code follow each other without an intervening event that has a `EventOpcode.Stop` code.

## EventOpcode.Stop field

```csharp
Stop
```

An event that is published when an activity or a transaction in an application ends. The event corresponds to the last unpaired event that has a `EventOpcode.Start` operation code.

## EventOpcode.Suspend field

```csharp
Suspend
```

An event that is published when an activity in an application is suspended.
