---
title: "EventKeywords enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventKeywords.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventKeywords enum

Namespace: `System.Diagnostics.Tracing`

```csharp
public enum EventKeywords
```

Defines the standard keywords that apply to events.

#### Remarks
You can customize the meaning of a keyword by assigning different names to the flags.

#### Examples
The following example shows how to use the `EventKeywords` class to redefine event keywords.  This code example is part of a larger example provided for the EventSource class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics.Tracing/EventAttribute/Overview/program.cs._

## EventKeywords.All field

```csharp
All
```

All the bits are set to 1, representing every possible group of events.

## EventKeywords.AuditFailure field

```csharp
AuditFailure
```

Attached to all failed security audit events. Use this keyword only  for events in the security log.

## EventKeywords.AuditSuccess field

```csharp
AuditSuccess
```

Attached to all successful security audit events. Use this keyword only for events in the security log.

## EventKeywords.CorrelationHint field

```csharp
CorrelationHint
```

Attached to transfer events where the related activity ID (correlation ID) is a computed value and is not guaranteed to be unique (that is, it is not a real GUID).

## EventKeywords.EventLogClassic field

```csharp
EventLogClassic
```

Attached to events that are raised by using the `RaiseEvent` function.

## EventKeywords.MicrosoftTelemetry field

```csharp
MicrosoftTelemetry
```

Attached to all Microsoft telemetry events.

## EventKeywords.None field

```csharp
None
```

No filtering on keywords is performed when the event is published.

## EventKeywords.Sqm field

```csharp
Sqm
```

Attached to all Service Quality Mechanism (SQM) events.

## EventKeywords.WdiContext field

```csharp
WdiContext
```

Attached to all Windows Diagnostics Infrastructure (WDI) context events.

## EventKeywords.WdiDiagnostic field

```csharp
WdiDiagnostic
```

Attached to all Windows Diagnostics Infrastructure (WDI) diagnostic events.
