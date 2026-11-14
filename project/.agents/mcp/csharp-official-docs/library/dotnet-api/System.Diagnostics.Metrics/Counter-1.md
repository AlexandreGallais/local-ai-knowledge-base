---
title: "Counter<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/Counter`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Counter<T> class

Namespace: `System.Diagnostics.Metrics`

```csharp
public sealed class Counter<T> : System.Diagnostics.Metrics.Instrument<T> where T : struct
```

Represents an instrument that supports adding non-negative values. For example, you might call `counter.Add(1)` each time a request is processed to track the total number of requests. Most metric viewers display counters using a rate (requests/sec), by default, but can also display a cumulative total.

Parameters:

- `T`: The type that the counter represents.

#### Remarks

This class supports only the following generic parameter types: `Byte`, `Int16`, `Int32`, `Int64`, `Single`, `Double`, and `Decimal`.

## Counter<T>.Add(T) method

```csharp
public void Add (T delta);
```

Records the increment value of the measurement.

Parameters:

- `delta`: The increment measurement.

To be added.

## Counter<T>.Add(T, Object>) method

```csharp
public void Add (T delta, System.Collections.Generic.KeyValuePair<string,object?> tag);
```

Records the increment value of the measurement.

Parameters:

- `delta`: The increment measurement.
- `tag`: A key-value pair tag associated with the measurement.

To be added.

## Counter<T>.Add(T, Object>[]) method

```csharp
public void Add (T delta, params System.Collections.Generic.KeyValuePair<string,object>[] tags);
```

Records the increment value of the measurement.

Parameters:

- `delta`: The increment measurement.
- `tags`: A list of key-value pair tags associated with the measurement.

To be added.

## Counter<T>.Add(T, TagList) method

```csharp
public void Add (T delta, in System.Diagnostics.TagList tagList);
```

Adds the increment value of the measurement.

Parameters:

- `delta`: The measurement value.
- `tagList`: The tags associated with the measurement.

To be added.

## Counter<T>.Add(T, Object>>) method

```csharp
public void Add (T delta, scoped ReadOnlySpan<System.Collections.Generic.KeyValuePair<string,object?>> tags);
```

Records the increment value of the measurement.

Parameters:

- `delta`: The increment measurement.
- `tags`: A span of key-value pair tags associated with the measurement.

To be added.

## Counter<T>.Add(T, Object>, Object>) method

```csharp
public void Add (T delta, System.Collections.Generic.KeyValuePair<string,object?> tag1, System.Collections.Generic.KeyValuePair<string,object?> tag2);
```

Records the increment value of the measurement.

Parameters:

- `delta`: The increment measurement.
- `tag1`: A first key-value pair tag associated with the measurement.
- `tag2`: A second key-value pair tag associated with the measurement.

To be added.

## Counter<T>.Add(T, Object>, Object>, Object>) method

```csharp
public void Add (T delta, System.Collections.Generic.KeyValuePair<string,object?> tag1, System.Collections.Generic.KeyValuePair<string,object?> tag2, System.Collections.Generic.KeyValuePair<string,object?> tag3);
```

Records the increment value of the measurement.

Parameters:

- `delta`: The increment measurement.
- `tag1`: A first key-value pair tag associated with the measurement.
- `tag2`: A second key-value pair tag associated with the measurement.
- `tag3`: A third key-value pair tag associated with the measurement.

To be added.
