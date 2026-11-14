---
title: "FrozenDictionary class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Frozen/FrozenDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FrozenDictionary class

Namespace: `System.Collections.Frozen`

```csharp
public static class FrozenDictionary
```

Provides a set of initialization methods for instances of the `FrozenDictionary<T1,T2>` class.

To be added.

## FrozenDictionary.Create<TKey,TValue>(KeyValuePair<TKey,TValue>>) method

```csharp
public static System.Collections.Frozen.FrozenDictionary<TKey,TValue> Create<TKey,TValue> (scoped ReadOnlySpan<System.Collections.Generic.KeyValuePair<TKey,TValue>> source);
```

Creates a `FrozenDictionary<T1,T2>` with the specified key/value pairs.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `source`: The key/value pairs to use to populate the dictionary.

Returns: A `FrozenDictionary<T1,T2>` that contains the specified keys and values.

If the same key <example-value> multiple times in the input, the latter one in the sequence takes precedence. This differs from `ToDictionary`, with which multiple duplicate keys will result in an exception.

## FrozenDictionary.Create<TKey,TValue>(IEqualityComparer<TKey>, KeyValuePair<TKey,TValue>>) method

```csharp
public static System.Collections.Frozen.FrozenDictionary<TKey,TValue> Create<TKey,TValue> (System.Collections.Generic.IEqualityComparer<TKey>? comparer, scoped ReadOnlySpan<System.Collections.Generic.KeyValuePair<TKey,TValue>> source);
```

Creates a `FrozenDictionary<T1,T2>` with the specified key/value pairs.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `comparer`: The comparer implementation to use to compare keys for equality. If `null`, `EqualityComparer<T>.Default` is used.
- `source`: The key/value pairs to use to populate the dictionary.

Returns: A `FrozenDictionary<T1,T2>` that contains the specified keys and values.

If the same key <example-value> multiple times in the input, the latter one in the sequence takes precedence. This differs from `ToDictionary`, with which multiple duplicate keys will result in an exception.

## FrozenDictionary.ToFrozenDictionary<TKey,TValue>(KeyValuePair<TKey,TValue>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Frozen.FrozenDictionary<TKey,TValue> ToFrozenDictionary<TKey,TValue> (this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> source, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Creates a `FrozenDictionary<T1,T2>` with the specified key/value pairs.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `source`: The key/value pairs to use to populate the dictionary.
- `comparer`: The comparer implementation to use to compare keys for equality. If `null`, `EqualityComparer<T>.Default` is used.

Returns: A `FrozenDictionary<T1,T2>` that contains the specified keys and values.

If the same key <example-value> multiple times in the input, the last one in the sequence takes precedence. This differs from `ToDictionary`, where duplicate keys result in an exception.

## FrozenDictionary.ToFrozenDictionary<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Frozen.FrozenDictionary<TKey,TSource> ToFrozenDictionary<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Creates a `FrozenDictionary<T1,T2>` from an `IEnumerable<T>` according to specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An `IEnumerable<T>` from which to create a `FrozenDictionary<T1,T2>`.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A `FrozenDictionary<T1,T2>` that contains the keys and values selected from the input sequence.

To be added.

## FrozenDictionary.ToFrozenDictionary<TSource,TKey,TElement>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Frozen.FrozenDictionary<TKey,TElement> ToFrozenDictionary<TSource,TKey,TElement> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Creates a `FrozenDictionary<T1,T2>` from an `IEnumerable<T>` according to specified key <example-value> and element selector functions.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the value returned by `elementSelector`.
- `source`: An `IEnumerable<T>` from which to create a `FrozenDictionary<T1,T2>`.
- `keySelector`: A function to extract a key from each element.
- `elementSelector`: A transform function to produce a result element value from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A `FrozenDictionary<T1,T2>` that contains the keys and values selected from the input sequence.

To be added.
