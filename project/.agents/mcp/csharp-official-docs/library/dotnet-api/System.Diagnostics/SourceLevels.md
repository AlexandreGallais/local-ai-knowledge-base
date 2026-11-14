---
title: "SourceLevels enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/SourceLevels.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SourceLevels enum

Namespace: `System.Diagnostics`

```csharp
public enum SourceLevels
```

Specifies the levels of trace messages filtered by the source switch and event type filter.

#### Remarks
The source levels identify the `TraceEventType` events that are to be traced. The `SourceSwitch` class uses the `SourceLevels` enumeration to define the event level of the trace message to use for filtering messages to send to the trace listener.

The `EventTypeFilter` class uses the `SourceLevels` enumeration to determine whether a trace listener should emit a trace.

## SourceLevels.ActivityTracing field

```csharp
ActivityTracing
```

Allows the `TraceEventType.Stop`, `TraceEventType.Start`, `TraceEventType.Suspend`, `TraceEventType.Transfer`, and `TraceEventType.Resume` events through.

## SourceLevels.All field

```csharp
All
```

Allows all events through.

## SourceLevels.Critical field

```csharp
Critical
```

Allows only `TraceEventType.Critical` events through.

## SourceLevels.Error field

```csharp
Error
```

Allows `TraceEventType.Critical` and `TraceEventType.Error` events through.

## SourceLevels.Information field

```csharp
Information
```

Allows `TraceEventType.Critical`, `TraceEventType.Error`, `TraceEventType.Warning`, and `TraceEventType.Information` events through.

## SourceLevels.Off field

```csharp
Off
```

Does not allow any events through.

## SourceLevels.Verbose field

```csharp
Verbose
```

Allows `TraceEventType.Critical`, `TraceEventType.Error`, `TraceEventType.Warning`, `TraceEventType.Information`, and `TraceEventType.Verbose` events through.

## SourceLevels.Warning field

```csharp
Warning
```

Allows `TraceEventType.Critical`, `TraceEventType.Error`, and `TraceEventType.Warning` events through.
