---
title: "UpDownCounter<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/UpDownCounter`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UpDownCounter<T> class

Namespace: `System.Diagnostics.Metrics`

```csharp
public sealed class UpDownCounter<T> : System.Diagnostics.Metrics.Instrument<T> where T : struct
```

An instrument that supports reporting positive or negative metric values.
UpDownCounter may be used in scenarios like reporting the change in active requests or queue size.

Parameters:

- `T`: The type that the UpDownCounter represents.

#### Remarks

This class supports only the following generic parameter types: `Byte`, `Int16`, `Int32`, `Int64`, `Single`, `Double`, and `Decimal`

## UpDownCounter<T>.Add(T) method

```csharp
public void Add (T delta);
```

Records the delta value of the measurement. The delta can be positive, negative, or zero.

Parameters:

- `delta`: The amount to be added, which can be positive, negative, or zero.

To be added.

## UpDownCounter<T>.Add(T, Object>) method

```csharp
public void Add (T delta, System.Collections.Generic.KeyValuePair<string,object?> tag);
```

Records the delta value of the measurement. The delta can be positive, negative, or zero.

Parameters:

- `delta`: The amount to be added, which can be positive, negative, or zero.
- `tag`: A key-value pair tag associated with the measurement.

To be added.

## UpDownCounter<T>.Add(T, Object>[]) method

```csharp
public void Add (T delta, params System.Collections.Generic.KeyValuePair<string,object>[] tags);
```

Records the delta value of the measurement. The delta can be positive, negative, or zero.

Parameters:

- `delta`: The amount to be added, which can be positive, negative, or zero.
- `tags`: A list of key-value pair tags associated with the measurement.

To be added.

## UpDownCounter<T>.Add(T, TagList) method

```csharp
public void Add (T delta, in System.Diagnostics.TagList tagList);
```

Records the delta value of the measurement. The delta can be positive, negative, or zero.

Parameters:

- `delta`: The amount to be added, which can be positive, negative, or zero.
- `tagList`: A `TagList` of tags associated with the measurement.

To be added.

## UpDownCounter<T>.Add(T, Object>>) method

```csharp
public void Add (T delta, scoped ReadOnlySpan<System.Collections.Generic.KeyValuePair<string,object?>> tags);
```

Records the delta value of the measurement. The delta can be positive, negative, or zero.

Parameters:

- `delta`: The amount to be added, which can be positive, negative, or zero.
- `tags`: A span of key-value pair tags associated with the measurement.

To be added.

## UpDownCounter<T>.Add(T, Object>, Object>) method

```csharp
public void Add (T delta, System.Collections.Generic.KeyValuePair<string,object?> tag1, System.Collections.Generic.KeyValuePair<string,object?> tag2);
```

Records the delta value of the measurement. The delta can be positive, negative, or zero.

Parameters:

- `delta`: The amount to be added, which can be positive, negative, or zero.
- `tag1`: A first key-value pair tag associated with the measurement.
- `tag2`: A second key-value pair tag associated with the measurement.

To be added.

## UpDownCounter<T>.Add(T, Object>, Object>, Object>) method

```csharp
public void Add (T delta, System.Collections.Generic.KeyValuePair<string,object?> tag1, System.Collections.Generic.KeyValuePair<string,object?> tag2, System.Collections.Generic.KeyValuePair<string,object?> tag3);
```

Records the delta value of the measurement. The delta can be positive, negative, or zero.

Parameters:

- `delta`: The amount to be added, which can be positive, negative, or zero.
- `tag1`: A first key-value pair tag associated with the measurement.
- `tag2`: A second key-value pair tag associated with the measurement.
- `tag3`: A third key-value pair tag associated with the measurement.

To be added.
