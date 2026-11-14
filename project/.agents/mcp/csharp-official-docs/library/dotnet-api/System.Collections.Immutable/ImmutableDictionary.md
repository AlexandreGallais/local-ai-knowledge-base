---
title: "ImmutableDictionary class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableDictionary class

Namespace: `System.Collections.Immutable`

```csharp
public static class ImmutableDictionary
```

Provides a set of initialization methods for instances of the `ImmutableDictionary<T1,T2>` class.

To be added.

## ImmutableDictionary.Contains<TKey,TValue>(IImmutableDictionary<TKey,TValue>, TKey, TValue) method

```csharp
public static bool Contains<TKey,TValue> (this System.Collections.Immutable.IImmutableDictionary<TKey,TValue> map, TKey key, TValue value);
```

Determines whether the specified immutable dictionary contains the specified key/value pair.

Parameters:

- `TKey`: The type of the keys in the immutable dictionary.
- `TValue`: The type of the values in the immutable dictionary.
- `map`: The immutable dictionary to search.
- `key`: The key to locate in the immutable dictionary.
- `value`: The value to locate on the specified key, if the key is found.

Returns: `true` if this map contains the specified key/value pair; otherwise, `false`.

To be added.

## ImmutableDictionary.Create<TKey,TValue>() method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> Create<TKey,TValue> ();
```

Creates an empty immutable dictionary.

Parameters:

- `TKey`: The type of keys stored by the dictionary.
- `TValue`: The type of values stored by the dictionary.

Returns: An empty immutable dictionary.

To be added.

## ImmutableDictionary.Create<TKey,TValue>(IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> Create<TKey,TValue> (System.Collections.Generic.IEqualityComparer<TKey>? keyComparer);
```

Creates an empty immutable dictionary that uses the specified key comparer.

Parameters:

- `TKey`: The type of keys stored by the dictionary.
- `TValue`: The type of values stored by the dictionary.
- `keyComparer`: The implementation to use to determine the equality of keys in the dictionary.

Returns: An empty immutable dictionary.

To be added.

## ImmutableDictionary.Create<TKey,TValue>(IEqualityComparer<TKey>, IEqualityComparer<TValue>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> Create<TKey,TValue> (System.Collections.Generic.IEqualityComparer<TKey>? keyComparer, System.Collections.Generic.IEqualityComparer<TValue>? valueComparer);
```

Creates an empty immutable dictionary that uses the specified key and value comparers.

Parameters:

- `TKey`: The type of keys stored by the dictionary.
- `TValue`: The type of values stored by the dictionary.
- `keyComparer`: The implementation to use to determine the equality of keys in the dictionary.
- `valueComparer`: The implementation to use to determine the equality of values in the dictionary.

Returns: An empty immutable dictionary.

To be added.

## ImmutableDictionary.CreateBuilder<TKey,TValue>() method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue>.Builder CreateBuilder<TKey,TValue> ();
```

Creates a new immutable dictionary builder.

Parameters:

- `TKey`: The type of keys stored by the dictionary.
- `TValue`: The type of values stored by the dictionary.

Returns: The new builder.

To be added.

## ImmutableDictionary.CreateBuilder<TKey,TValue>(IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue>.Builder CreateBuilder<TKey,TValue> (System.Collections.Generic.IEqualityComparer<TKey>? keyComparer);
```

Creates a new immutable dictionary builder.

Parameters:

- `TKey`: The type of keys stored by the dictionary.
- `TValue`: The type of values stored by the dictionary.
- `keyComparer`: The key comparer.

Returns: The new builder.

To be added.

## ImmutableDictionary.CreateBuilder<TKey,TValue>(IEqualityComparer<TKey>, IEqualityComparer<TValue>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue>.Builder CreateBuilder<TKey,TValue> (System.Collections.Generic.IEqualityComparer<TKey>? keyComparer, System.Collections.Generic.IEqualityComparer<TValue>? valueComparer);
```

Creates a new immutable dictionary builder.

Parameters:

- `TKey`: The type of keys stored by the dictionary.
- `TValue`: The type of values stored by the dictionary.
- `keyComparer`: The key comparer.
- `valueComparer`: The value comparer.

Returns: The new builder.

To be added.

## ImmutableDictionary.CreateRange<TKey,TValue>(KeyValuePair<TKey,TValue>>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> CreateRange<TKey,TValue> (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> items);
```

Creates a new immutable dictionary that contains the specified items.

Parameters:

- `TKey`: The type of keys in the dictionary.
- `TValue`: The type of values in the dictionary.
- `items`: The items used to populate the dictionary before it's immutable.

Returns: A new immutable dictionary that contains the specified items.

To be added.

## ImmutableDictionary.CreateRange<TKey,TValue>(IEqualityComparer<TKey>, KeyValuePair<TKey,TValue>>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> CreateRange<TKey,TValue> (System.Collections.Generic.IEqualityComparer<TKey>? keyComparer, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> items);
```

Creates a new immutable dictionary that contains the specified items and uses the specified key comparer.

Parameters:

- `TKey`: The type of keys in the dictionary.
- `TValue`: The type of values in the dictionary.
- `keyComparer`: The comparer implementation to use to compare keys for equality.
- `items`: The items to add to the dictionary before it's immutable.

Returns: A new immutable dictionary that contains the specified items and uses the specified comparer.

To be added.

## ImmutableDictionary.CreateRange<TKey,TValue>(IEqualityComparer<TKey>, IEqualityComparer<TValue>, KeyValuePair<TKey,TValue>>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> CreateRange<TKey,TValue> (System.Collections.Generic.IEqualityComparer<TKey>? keyComparer, System.Collections.Generic.IEqualityComparer<TValue>? valueComparer, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> items);
```

Creates a new immutable dictionary that contains the specified items and uses the specified key comparer.

Parameters:

- `TKey`: The type of keys in the dictionary.
- `TValue`: The type of values in the dictionary.
- `keyComparer`: The comparer implementation to use to compare keys for equality.
- `valueComparer`: The comparer implementation to use to compare values for equality.
- `items`: The items to add to the dictionary before it's immutable.

Returns: A new immutable dictionary that contains the specified items and uses the specified comparer.

To be added.

## ImmutableDictionary.CreateRangeWithOverwrite<TKey,TValue>(KeyValuePair<TKey,TValue>>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> CreateRangeWithOverwrite<TKey,TValue> (scoped ReadOnlySpan<System.Collections.Generic.KeyValuePair<TKey,TValue>> items);
```

Creates a new immutable dictionary that contains the specified items.

Parameters:

- `TKey`: The type of keys in the dictionary.
- `TValue`: The type of values in the dictionary.
- `items`: The items used to populate the dictionary before it's immutable.

Returns: A new immutable dictionary that contains the specified items.

In contrast to `ImmutableDictionary.CreateRange<T1,T2>`, if there are duplicate keys in the `items` collection, the last one will be used, rather than an exception being thrown.

## ImmutableDictionary.CreateRangeWithOverwrite<TKey,TValue>(IEqualityComparer<TKey>, KeyValuePair<TKey,TValue>>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> CreateRangeWithOverwrite<TKey,TValue> (System.Collections.Generic.IEqualityComparer<TKey>? keyComparer, scoped ReadOnlySpan<System.Collections.Generic.KeyValuePair<TKey,TValue>> items);
```

Creates a new immutable dictionary that contains the specified items and uses the specified key comparer.

Parameters:

- `TKey`: The type of keys in the dictionary.
- `TValue`: The type of values in the dictionary.
- `keyComparer`: The comparer implementation to use to compare keys for equality.
- `items`: The items to add to the dictionary before it's immutable.

Returns: A new immutable dictionary that contains the specified items and uses the specified comparer.

In contrast to `ImmutableDictionary.CreateRange<T1,T2>`, if there are duplicate keys in the `items` collection, the last one will be used, rather than an exception being thrown.

## ImmutableDictionary.GetValueOrDefault<TKey,TValue>(IImmutableDictionary<TKey,TValue>, TKey) method

```csharp
public static TValue? GetValueOrDefault<TKey,TValue> (this System.Collections.Immutable.IImmutableDictionary<TKey,TValue> dictionary, TKey key);
```

Gets the value for a given key if a matching key <example-value> in the dictionary.

Parameters:

- `TKey`: The type of the key.
- `TValue`: The type of the value.
- `dictionary`: The dictionary to retrieve the value from.
- `key`: The key to search for.

Returns: The value for the key, or `default(TValue)` if no matching key was found.

To be added.

## ImmutableDictionary.GetValueOrDefault<TKey,TValue>(IImmutableDictionary<TKey,TValue>, TKey, TValue) method

```csharp
public static TValue GetValueOrDefault<TKey,TValue> (this System.Collections.Immutable.IImmutableDictionary<TKey,TValue> dictionary, TKey key, TValue defaultValue);
```

Gets the value for a given key if a matching key <example-value> in the dictionary.

Parameters:

- `TKey`: The type of the key.
- `TValue`: The type of the value.
- `dictionary`: The dictionary to retrieve the value from.
- `key`: The key to search for.
- `defaultValue`: The default value to return if no matching key is found in the dictionary.

Returns: The value for the key, or `defaultValue` if no matching key was found.

To be added.

## ImmutableDictionary.ToImmutableDictionary<TKey,TValue>(KeyValuePair<TKey,TValue>>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> ToImmutableDictionary<TKey,TValue> (this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> source);
```

Enumerates a sequence of key/value pairs and produces an immutable dictionary of its contents.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `source`: The sequence of key/value pairs to enumerate.

Returns: An immutable dictionary that contains the key/value pairs in the specified sequence.

Exceptions:

- `ArgumentException`: An element with the same key but a different value already exists in the dictionary.

To be added.

## ImmutableDictionary.ToImmutableDictionary<TKey,TValue>(ImmutableDictionary<TKey,TValue>+Builder) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> ToImmutableDictionary<TKey,TValue> (this System.Collections.Immutable.ImmutableDictionary<TKey,TValue>.Builder builder);
```

Creates an immutable dictionary from the current contents of the builder's dictionary.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `builder`: The builder to create the immutable dictionary from.

Returns: An immutable dictionary that contains the current contents in the builder's dictionary.

To be added.

## ImmutableDictionary.ToImmutableDictionary<TKey,TValue>(KeyValuePair<TKey,TValue>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> ToImmutableDictionary<TKey,TValue> (this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> source, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer);
```

Enumerates a sequence of key/value pairs and produces an immutable dictionary of its contents by using the specified key comparer.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `source`: The sequence of key/value pairs to enumerate.
- `keyComparer`: The key <example-value> to use when building the immutable dictionary.

Returns: An immutable dictionary that contains the key/value pairs in the specified sequence.

Exceptions:

- `ArgumentException`: An element with the same key but a different value already exists in the dictionary.

To be added.

## ImmutableDictionary.ToImmutableDictionary<TKey,TValue>(KeyValuePair<TKey,TValue>>, IEqualityComparer<TKey>, IEqualityComparer<TValue>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> ToImmutableDictionary<TKey,TValue> (this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> source, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer, System.Collections.Generic.IEqualityComparer<TValue>? valueComparer);
```

Enumerates a sequence of key/value pairs and produces an immutable dictionary of its contents by using the specified key and value comparers.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `source`: The sequence of key/value pairs to enumerate.
- `keyComparer`: The key <example-value> to use when building the immutable dictionary.
- `valueComparer`: The value comparer to use for the immutable dictionary.

Returns: An immutable dictionary that contains the key/value pairs in the specified sequence.

Exceptions:

- `ArgumentException`: An element with the same key but a different value already exists in the dictionary.

To be added.
