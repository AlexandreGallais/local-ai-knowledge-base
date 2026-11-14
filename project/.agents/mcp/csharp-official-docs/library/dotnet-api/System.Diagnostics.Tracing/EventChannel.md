---
title: "EventChannel enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventChannel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventChannel enum

Namespace: `System.Diagnostics.Tracing`

```csharp
public enum EventChannel
```

Specifies the event log channel for the event.

#### Remarks
Events can be written to event log channels, event tracing log files, or both. A channel is basically a container to collect events. Each channel type has an intended audience, which determines the type of events that you write to the channel. For more information about event log channels, see Defining Channels.

## EventChannel.Admin field

```csharp
Admin
```

The administrator log channel.

## EventChannel.Analytic field

```csharp
Analytic
```

The analytic channel.

## EventChannel.Debug field

```csharp
Debug
```

The debug channel.

## EventChannel.None field

```csharp
None
```

No channel specified.

## EventChannel.Operational field

```csharp
Operational
```

The operational channel.
