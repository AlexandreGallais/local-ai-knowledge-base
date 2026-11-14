---
title: "TraceEventType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/TraceEventType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TraceEventType enum

Namespace: `System.Diagnostics`

```csharp
public enum TraceEventType
```

Identifies the type of event that has caused the trace.

#### Remarks
`TraceEventType` is used to identify the event that caused a trace in calls to the `TraceSource.TraceEvent` methods.

## TraceEventType.Critical field

```csharp
Critical
```

Fatal error or application crash.

## TraceEventType.Error field

```csharp
Error
```

Recoverable error.

## TraceEventType.Information field

```csharp
Information
```

Informational message.

## TraceEventType.Resume field

```csharp
Resume
```

Resumption of a logical operation.

## TraceEventType.Start field

```csharp
Start
```

Starting of a logical operation.

## TraceEventType.Stop field

```csharp
Stop
```

Stopping of a logical operation.

## TraceEventType.Suspend field

```csharp
Suspend
```

Suspension of a logical operation.

## TraceEventType.Transfer field

```csharp
Transfer
```

Changing of correlation identity.

## TraceEventType.Verbose field

```csharp
Verbose
```

Debugging trace.

## TraceEventType.Warning field

```csharp
Warning
```

Noncritical problem.
