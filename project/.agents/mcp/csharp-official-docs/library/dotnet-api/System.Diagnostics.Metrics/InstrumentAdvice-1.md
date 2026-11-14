---
title: "InstrumentAdvice<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/InstrumentAdvice`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InstrumentAdvice<T> class

Namespace: `System.Diagnostics.Metrics`

```csharp
public sealed class InstrumentAdvice<T> where T : struct
```

Contains configuration settings advised to be used by metrics consumers when recording measurements for a given `Instrument<T>`.

Parameters:

- `T`: Instrument value type.

To be added.

## InstrumentAdvice<T>.InstrumentAdvice() constructor

```csharp
public InstrumentAdvice ();
```

Initializes a new instance of the `InstrumentAdvice<T>` class.

To be added.

## InstrumentAdvice<T>.HistogramBucketBoundaries property

```csharp
public System.Collections.Generic.IReadOnlyList<T>? HistogramBucketBoundaries { get; init; }
```

Gets the explicit bucket boundaries advised to be used with histogram instruments.

Returns: To be added.

Notes:

A `null` value means no bucket boundaries have been configured and default values should be used for bucket configuration.
An empty set of bucket boundaries hints that the histogram by default should NOT contain buckets and should only track count and sum values.
A set of distinct increasing values for bucket boundaries hints that the histogram should use those for its default bucket configuration.
