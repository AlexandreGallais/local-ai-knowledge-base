---
title: "ActivityTrackingOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/ActivityTrackingOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivityTrackingOptions enum

Namespace: `Microsoft.Extensions.Logging`

```csharp
public enum ActivityTrackingOptions
```

Flags to indicate which trace context parts should be included with the logging scopes.

To be added.

## ActivityTrackingOptions.Baggage field

```csharp
Baggage
```

Items of baggage will be included in the logging.

## ActivityTrackingOptions.None field

```csharp
None
```

None of the trace context part will be included in the logging.

## ActivityTrackingOptions.ParentId field

```csharp
ParentId
```

Parent ID will be included in the logging.

## ActivityTrackingOptions.SpanId field

```csharp
SpanId
```

Span ID will be included in the logging.

## ActivityTrackingOptions.Tags field

```csharp
Tags
```

Tags will be included in the logging.

## ActivityTrackingOptions.TraceFlags field

```csharp
TraceFlags
```

Trace flags will be included in the logging.

## ActivityTrackingOptions.TraceId field

```csharp
TraceId
```

Trace ID will be included in the logging.

## ActivityTrackingOptions.TraceState field

```csharp
TraceState
```

Trace State will be included in the logging.
