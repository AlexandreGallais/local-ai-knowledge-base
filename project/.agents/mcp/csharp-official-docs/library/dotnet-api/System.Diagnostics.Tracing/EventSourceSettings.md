---
title: "EventSourceSettings enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/EventSourceSettings.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventSourceSettings enum

Namespace: `System.Diagnostics.Tracing`

```csharp
public enum EventSourceSettings
```

Specifies configuration options for an event source.

#### Remarks
Only EtwManifestEventFormat or EtwSelfDescribingEventFormat should be specified, but not both.

## EventSourceSettings.Default field

```csharp
Default
```

None of the special configuration options are enabled.

## EventSourceSettings.EtwManifestEventFormat field

```csharp
EtwManifestEventFormat
```

The ETW listener should use a manifest-based format when raising events. This is the default option when defining a type derived from `EventSource` using one of the protected `EventSource` constructors. This format has lower per-event serialization overhead compared to `EventSourceSettings.EtwSelfDescribingEventFormat`. For more information, see Self-describing vs. manifest event formats.

## EventSourceSettings.EtwSelfDescribingEventFormat field

```csharp
EtwSelfDescribingEventFormat
```

The ETW listener should use self-describing event format. This is the default option when creating a new instance of the `EventSource` using one of the public `EventSource` constructors. This format has more capabilities and better compatibility with listeners that don't use the TraceEvent library, but has higher per-event serialization overhead compared to `EventSourceSettings.EtwManifestEventFormat`. For more information, see Self-describing vs. manifest event formats.

## EventSourceSettings.ThrowOnEventWriteErrors field

```csharp
ThrowOnEventWriteErrors
```

The event source throws an exception when an error occurs.
