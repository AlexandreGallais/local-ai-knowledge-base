---
title: "Histogram<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/Histogram`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Histogram<T> class

Namespace: `System.Diagnostics.Metrics`

```csharp
public sealed class Histogram<T> : System.Diagnostics.Metrics.Instrument<T> where T : struct
```

Represents a metrics instrument that can be used to report arbitrary values that are likely to be statistically meaningful, for example, the request duration. Call `Meter.CreateHistogram<T>` to create a Histogram object.

Parameters:

- `T`: The type that the histogram represents.

#### Remarks

This class supports only the following generic parameter types: `Byte`, `Int16`, `Int32`, `Int64`, `Single`, `Double`, and `Decimal`.

## Histogram<T>.Record(T) method

```csharp
public void Record (T value);
```

Records a measurement value.

Parameters:

- `value`: The measurement value.

To be added.

## Histogram<T>.Record(T, Object>) method

```csharp
public void Record (T value, System.Collections.Generic.KeyValuePair<string,object?> tag);
```

Records a measurement value.

Parameters:

- `value`: The measurement value.
- `tag`: A key-value pair tag associated with the measurement.

To be added.

## Histogram<T>.Record(T, Object>[]) method

```csharp
public void Record (T value, params System.Collections.Generic.KeyValuePair<string,object>[] tags);
```

Records a measurement value.

Parameters:

- `value`: The measurement value.
- `tags`: A list of key-value pair tags associated with the measurement.

To be added.

## Histogram<T>.Record(T, TagList) method

```csharp
public void Record (T value, in System.Diagnostics.TagList tagList);
```

Records a measurement value.

Parameters:

- `value`: The measurement value.
- `tagList`: The tags associated with the measurement.

To be added.

## Histogram<T>.Record(T, Object>>) method

```csharp
public void Record (T value, scoped ReadOnlySpan<System.Collections.Generic.KeyValuePair<string,object?>> tags);
```

Records a measurement value.

Parameters:

- `value`: The measurement value.
- `tags`: A span of key-value pair tags associated with the measurement.

To be added.

## Histogram<T>.Record(T, Object>, Object>) method

```csharp
public void Record (T value, System.Collections.Generic.KeyValuePair<string,object?> tag1, System.Collections.Generic.KeyValuePair<string,object?> tag2);
```

Records a measurement value.

Parameters:

- `value`: The measurement value.
- `tag1`: A first key-value pair tag associated with the measurement.
- `tag2`: A second key-value pair tag associated with the measurement.

To be added.

## Histogram<T>.Record(T, Object>, Object>, Object>) method

```csharp
public void Record (T value, System.Collections.Generic.KeyValuePair<string,object?> tag1, System.Collections.Generic.KeyValuePair<string,object?> tag2, System.Collections.Generic.KeyValuePair<string,object?> tag3);
```

Records a measurement value.

Parameters:

- `value`: The measurement value.
- `tag1`: A first key-value pair tag associated with the measurement.
- `tag2`: A second key-value pair tag associated with the measurement.
- `tag3`: A third key-value pair tag associated with the measurement.

To be added.
