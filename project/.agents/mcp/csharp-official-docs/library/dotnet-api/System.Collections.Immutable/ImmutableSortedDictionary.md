---
title: "ImmutableSortedDictionary class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableSortedDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableSortedDictionary class

Namespace: `System.Collections.Immutable`

```csharp
public static class ImmutableSortedDictionary
```

Provides a set of initialization methods for instances of the `ImmutableSortedDictionary<T1,T2>` class.

To be added.

## ImmutableSortedDictionary.Create<TKey,TValue>() method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> Create<TKey,TValue> ();
```

Creates an empty immutable sorted dictionary.

Parameters:

- `TKey`: The type of keys stored by the dictionary.
- `TValue`: The type of values stored by the dictionary.

Returns: An empty immutable sorted dictionary.

To be added.

## ImmutableSortedDictionary.Create<TKey,TValue>(IComparer<TKey>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> Create<TKey,TValue> (System.Collections.Generic.IComparer<TKey>? keyComparer);
```

Creates an empty immutable sorted dictionary that uses the specified key comparer.

Parameters:

- `TKey`: The type of keys stored by the dictionary.
- `TValue`: The type of values stored by the dictionary.
- `keyComparer`: The implementation to use to determine the equality of keys in the dictionary.

Returns: An empty immutable sorted dictionary.

To be added.

## ImmutableSortedDictionary.Create<TKey,TValue>(IComparer<TKey>, IEqualityComparer<TValue>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> Create<TKey,TValue> (System.Collections.Generic.IComparer<TKey>? keyComparer, System.Collections.Generic.IEqualityComparer<TValue>? valueComparer);
```

Creates an empty immutable sorted dictionary that uses the specified key and value comparers.

Parameters:

- `TKey`: The type of keys stored by the dictionary.
- `TValue`: The type of values stored by the dictionary.
- `keyComparer`: The implementation to use to determine the equality of keys in the dictionary.
- `valueComparer`: The implementation to use to determine the equality of values in the dictionary.

Returns: An empty immutable sorted dictionary.

To be added.

## ImmutableSortedDictionary.CreateBuilder<TKey,TValue>() method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue>.Builder CreateBuilder<TKey,TValue> ();
```

Creates a new immutable sorted dictionary builder.

Parameters:

- `TKey`: The type of keys stored by the dictionary.
- `TValue`: The type of values stored by the dictionary.

Returns: The immutable collection builder.

To be added.

## ImmutableSortedDictionary.CreateBuilder<TKey,TValue>(IComparer<TKey>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue>.Builder CreateBuilder<TKey,TValue> (System.Collections.Generic.IComparer<TKey>? keyComparer);
```

Creates a new immutable sorted dictionary builder.

Parameters:

- `TKey`: The type of keys stored by the dictionary.
- `TValue`: The type of values stored by the dictionary.
- `keyComparer`: The key comparer.

Returns: The immutable collection builder.

To be added.

## ImmutableSortedDictionary.CreateBuilder<TKey,TValue>(IComparer<TKey>, IEqualityComparer<TValue>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue>.Builder CreateBuilder<TKey,TValue> (System.Collections.Generic.IComparer<TKey>? keyComparer, System.Collections.Generic.IEqualityComparer<TValue>? valueComparer);
```

Creates a new immutable sorted dictionary builder.

Parameters:

- `TKey`: The type of keys stored by the dictionary.
- `TValue`: The type of values stored by the dictionary.
- `keyComparer`: The key comparer.
- `valueComparer`: The value comparer.

Returns: The immutable collection builder.

To be added.

## ImmutableSortedDictionary.CreateRange<TKey,TValue>(KeyValuePair<TKey,TValue>>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> CreateRange<TKey,TValue> (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> items);
```

Creates an immutable sorted dictionary that contains the specified items and uses the default comparer.

Parameters:

- `TKey`: The type of keys stored in the dictionary.
- `TValue`: The type of values stored in the dictionary.
- `items`: The items to add to the sorted dictionary before it's immutable.

Returns: An immutable sorted dictionary that contains the specified items.

To be added.

## ImmutableSortedDictionary.CreateRange<TKey,TValue>(IComparer<TKey>, KeyValuePair<TKey,TValue>>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> CreateRange<TKey,TValue> (System.Collections.Generic.IComparer<TKey>? keyComparer, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> items);
```

Creates a new immutable sorted dictionary from the specified range of items with the specified key comparer.

Parameters:

- `TKey`: The type of keys stored in the dictionary.
- `TValue`: The type of values stored in the dictionary.
- `keyComparer`: The comparer implementation to use to evaluate keys for equality and sorting.
- `items`: The items to add to the sorted dictionary.

Returns: The new immutable sorted dictionary that contains the specified items and uses the specified key comparer.

To be added.

## ImmutableSortedDictionary.CreateRange<TKey,TValue>(IComparer<TKey>, IEqualityComparer<TValue>, KeyValuePair<TKey,TValue>>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> CreateRange<TKey,TValue> (System.Collections.Generic.IComparer<TKey>? keyComparer, System.Collections.Generic.IEqualityComparer<TValue>? valueComparer, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> items);
```

Creates a new immutable sorted dictionary from the specified range of items with the specified key and value comparers.

Parameters:

- `TKey`: The type of keys stored in the dictionary.
- `TValue`: The type of values stored in the dictionary.
- `keyComparer`: The comparer implementation to use to compare keys for equality and sorting.
- `valueComparer`: The comparer implementation to use to compare values for equality.
- `items`: The items to add to the sorted dictionary before it's immutable.

Returns: An immutable sorted dictionary that contains the specified items and uses the specified comparers.

To be added.

## ImmutableSortedDictionary.ToImmutableSortedDictionary<TKey,TValue>(KeyValuePair<TKey,TValue>>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> ToImmutableSortedDictionary<TKey,TValue> (this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> source);
```

Enumerates a sequence of key/value pairs and produces an immutable sorted dictionary of its contents.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `source`: The sequence of key/value pairs to enumerate.

Returns: An immutable sorted dictionary that contains the key/value pairs in the specified sequence.

To be added.

## ImmutableSortedDictionary.ToImmutableSortedDictionary<TKey,TValue>(ImmutableSortedDictionary<TKey,TValue>+Builder) method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> ToImmutableSortedDictionary<TKey,TValue> (this System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue>.Builder builder);
```

Creates an immutable sorted dictionary from the current contents of the builder's dictionary.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `builder`: The builder to create the immutable sorted dictionary from.

Returns: An immutable sorted dictionary that contains the current contents in the builder's dictionary.

To be added.

## ImmutableSortedDictionary.ToImmutableSortedDictionary<TKey,TValue>(KeyValuePair<TKey,TValue>>, IComparer<TKey>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> ToImmutableSortedDictionary<TKey,TValue> (this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> source, System.Collections.Generic.IComparer<TKey>? keyComparer);
```

Enumerates a sequence of key/value pairs and produces an immutable dictionary of its contents by using the specified key comparer.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `source`: The sequence of key/value pairs to enumerate.
- `keyComparer`: The key <example-value> to use when building the immutable dictionary.

Returns: An immutable sorted dictionary that contains the key/value pairs in the specified sequence.

To be added.

## ImmutableSortedDictionary.ToImmutableSortedDictionary<TKey,TValue>(KeyValuePair<TKey,TValue>>, IComparer<TKey>, IEqualityComparer<TValue>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> ToImmutableSortedDictionary<TKey,TValue> (this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> source, System.Collections.Generic.IComparer<TKey>? keyComparer, System.Collections.Generic.IEqualityComparer<TValue>? valueComparer);
```

Enumerates a sequence of key/value pairs and produces an immutable sorted dictionary of its contents by using the specified key and value comparers.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.
- `source`: The sequence of key/value pairs to enumerate.
- `keyComparer`: The key <example-value> to use when building the immutable dictionary.
- `valueComparer`: The value comparer to use for the immutable dictionary.

Returns: An immutable sorted dictionary that contains the key/value pairs in the specified sequence.

To be added.

## ImmutableSortedDictionary.ToImmutableSortedDictionary<TSource,TKey,TValue>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TValue>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> ToImmutableSortedDictionary<TSource,TKey,TValue> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TValue> elementSelector);
```

Enumerates and transforms a sequence, and produces an immutable sorted dictionary of its contents.

Parameters:

- `TSource`: The type of the elements in the sequence.
- `TKey`: The type of the keys in the resulting dictionary.
- `TValue`: The type of the values in the resulting dictionary.
- `source`: The sequence to enumerate to generate the dictionary.
- `keySelector`: The function that will produce the key for the dictionary from each sequence element.
- `elementSelector`: The function that will produce the value for the dictionary from each sequence element.

Returns: An immutable sorted dictionary that contains the items in the specified sequence.

To be added.

## ImmutableSortedDictionary.ToImmutableSortedDictionary<TSource,TKey,TValue>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TValue>, IComparer<TKey>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> ToImmutableSortedDictionary<TSource,TKey,TValue> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TValue> elementSelector, System.Collections.Generic.IComparer<TKey>? keyComparer);
```

Enumerates and transforms a sequence, and produces an immutable sorted dictionary of its contents by using the specified key comparer.

Parameters:

- `TSource`: The type of the elements in the sequence.
- `TKey`: The type of the keys in the resulting dictionary.
- `TValue`: The type of the values in the resulting dictionary.
- `source`: The sequence to enumerate to generate the dictionary.
- `keySelector`: The function that will produce the key for the dictionary from each sequence element.
- `elementSelector`: The function that will produce the value for the dictionary from each sequence element.
- `keyComparer`: The key <example-value> to use for the dictionary.

Returns: An immutable dictionary that contains the items in the specified sequence.

To be added.

## ImmutableSortedDictionary.ToImmutableSortedDictionary<TSource,TKey,TValue>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TValue>, IComparer<TKey>, IEqualityComparer<TValue>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedDictionary<TKey,TValue> ToImmutableSortedDictionary<TSource,TKey,TValue> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TValue> elementSelector, System.Collections.Generic.IComparer<TKey>? keyComparer, System.Collections.Generic.IEqualityComparer<TValue>? valueComparer);
```

Enumerates and transforms a sequence, and produces an immutable sorted dictionary of its contents by using the specified key and value comparers.

Parameters:

- `TSource`: The type of the elements in the sequence.
- `TKey`: The type of the keys in the resulting dictionary.
- `TValue`: The type of the values in the resulting dictionary.
- `source`: The sequence to enumerate to generate the dictionary.
- `keySelector`: The function that will produce the key for the dictionary from each sequence element.
- `elementSelector`: The function that will produce the value for the dictionary from each sequence element.
- `keyComparer`: The key <example-value> to use for the dictionary.
- `valueComparer`: The value comparer to use for the dictionary.

Returns: An immutable sorted dictionary that contains the items in the specified sequence.

To be added.
