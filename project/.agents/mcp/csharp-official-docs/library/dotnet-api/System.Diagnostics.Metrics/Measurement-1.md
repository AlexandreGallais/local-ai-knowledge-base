---
title: "Measurement<T> struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics.Metrics/Measurement`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Measurement<T> struct

Namespace: `System.Diagnostics.Metrics`

```csharp
public readonly struct Measurement<T> where T : struct
```

Stores one observed metrics value and its associated tags. This type is used by an Observable instrument's Observe() method when reporting current measurements.

Parameters:

- `T`: The type that the measurement represents.

To be added.

## Measurement<T>.Measurement(T) constructor

```csharp
public Measurement (T value);
```

Initializes a new instance of `Measurement<T>` using the specified value.

Parameters:

- `value`: The measurement value.

To be added.

## Measurement<T>.Measurement(T, Object>>) constructor

```csharp
public Measurement (T value, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>>? tags);
```

Initializes a new instance of `Measurement<T>` using the specified value and list of tags.

Parameters:

- `value`: The measurement value.
- `tags`: The list of tags associated with the measurement.

To be added.

## Measurement<T>.Measurement(T, Object>[]) constructor

```csharp
public Measurement (T value, params System.Collections.Generic.KeyValuePair<string,object>[]? tags);
```

Initializes a new instance of `Measurement<T>` using the specified value and list of tags.

Parameters:

- `value`: The measurement value.
- `tags`: The list of tags associated with the measurement.

To be added.

## Measurement<T>.Measurement(T, TagList) constructor

```csharp
public Measurement (T value, in System.Diagnostics.TagList tags);
```

Initializes a new instance of the Measurement with the provided `value` and a `TagList` containing zero or more associated `tags`.

Parameters:

- `value`: The value of the measurement.
- `tags`: A `TagList` containing the `KeyValuePair<T1,T2>` tags associated with the measurement.

To be added.

## Measurement<T>.Measurement(T, Object>>) constructor

```csharp
public Measurement (T value, scoped ReadOnlySpan<System.Collections.Generic.KeyValuePair<string,object?>> tags);
```

Initializes a new instance of `Measurement<T>` using the specified value and list of tags.

Parameters:

- `value`: The measurement value.
- `tags`: The list of tags associated with the measurement.

To be added.

## Measurement<T>.Tags property

```csharp
public ReadOnlySpan<System.Collections.Generic.KeyValuePair<string,object?>> Tags { get; }
```

Gets the measurement tags list.

Returns: To be added.

To be added.

## Measurement<T>.Value property

```csharp
public T Value { get; }
```

Gets the measurement value.

Returns: To be added.

To be added.
