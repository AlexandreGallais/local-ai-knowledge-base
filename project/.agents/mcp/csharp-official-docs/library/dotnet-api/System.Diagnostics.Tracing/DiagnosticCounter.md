---
title: "DiagnosticCounter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Tracing/DiagnosticCounter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DiagnosticCounter class

Namespace: `System.Diagnostics.Tracing`

```csharp
public abstract class DiagnosticCounter : IDisposable
```

`DiagnosticCounter` is an abstract class that serves as the parent class for various Counter* classes, namely `EventCounter`, `PollingCounter`, `IncrementingEventCounter`, and `IncrementingPollingCounter`.

To be added.

## DiagnosticCounter.DisplayName property

```csharp
public string DisplayName { get; set; }
```

Gets or sets the display name of the counter.

Returns: The display name of the counter.

#### Remarks

The `DisplayName` provides a more display friendly name for the consumer side of the metrics. For example, a counter named "gen-0-gc-count" is better displayed as "Gen 0 GC Count". To do so, `DisplayName` can be used to be reported as part of the payload.

## DiagnosticCounter.DisplayUnits property

```csharp
public string DisplayUnits { get; set; }
```

Gets or sets the display units of the counter.

Returns: The display units of the counter.

To be added.

## DiagnosticCounter.EventSource property

```csharp
public System.Diagnostics.Tracing.EventSource EventSource { get; }
```

Gets the EventSource that this counter is attached to.

Returns: The EventSource that this counter is attached to.

To be added.

## DiagnosticCounter.Name property

```csharp
public string Name { get; }
```

Gets the name of this counter.

Returns: The name of this counter.

To be added.

## DiagnosticCounter.AddMetadata(String, String) method

```csharp
public void AddMetadata (string key, string? value);
```

Adds key-value metadata to the counter that will be included as a part of the payload.

Parameters:

- `key`: The metadata key.
- `value`: The metadata value.

To be added.

## DiagnosticCounter.Dispose() method

```csharp
public void Dispose ();
```

Removes the counter from the set that the `EventSource` will report on.

After being disposed, this counter will do nothing, and its resources will be reclaimed when all references to it are removed. If an `EventCounter` is not explicitly disposed, it will be cleaned up automatically when the `EventSource` it's attached to dies.
