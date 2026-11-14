---
title: "ImmutableDictionary class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableDictionary class (part 2 of 2)

## ImmutableDictionary.ToImmutableDictionary<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TSource> ToImmutableDictionary<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector);
```

Constructs an immutable dictionary from an existing collection of elements, applying a transformation function to the source keys.

Parameters:

- `TSource`: The type of element in the source collection.
- `TKey`: The type of key in the resulting immutable dictionary.
- `source`: The source collection used to generate the immutable dictionary.
- `keySelector`: The function used to transform keys for the immutable dictionary.

Returns: The immutable dictionary that contains elements from `source`, with keys transformed by applying `keySelector`.

Exceptions:

- `ArgumentException`: An element with the same key but a different value already exists in the dictionary.

To be added.

## ImmutableDictionary.ToImmutableDictionary<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TSource> ToImmutableDictionary<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer);
```

Constructs an immutable dictionary based on some transformation of a sequence.

Parameters:

- `TSource`: The type of element in the source collection.
- `TKey`: The type of key in the resulting immutable dictionary.
- `source`: The source collection used to generate the immutable dictionary.
- `keySelector`: The function used to transform keys for the immutable dictionary.
- `keyComparer`: The key <example-value> to use for the dictionary.

Returns: The immutable dictionary that contains elements from `source`, with keys transformed by applying `keySelector`.

Exceptions:

- `ArgumentException`: An element with the same key but a different value already exists in the dictionary.

To be added.

## ImmutableDictionary.ToImmutableDictionary<TSource,TKey,TValue>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TValue>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> ToImmutableDictionary<TSource,TKey,TValue> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TValue> elementSelector);
```

Enumerates and transforms a sequence, and produces an immutable dictionary of its contents.

Parameters:

- `TSource`: The type of the elements in the sequence.
- `TKey`: The type of the keys in the resulting dictionary.
- `TValue`: The type of the values in the resulting dictionary.
- `source`: The sequence to enumerate to generate the dictionary.
- `keySelector`: The function that will produce the key for the dictionary from each sequence element.
- `elementSelector`: The function that will produce the value for the dictionary from each sequence element.

Returns: An immutable dictionary that contains the items in the specified sequence.

Exceptions:

- `ArgumentException`: An element with the same key but a different value already exists in the dictionary.

To be added.

## ImmutableDictionary.ToImmutableDictionary<TSource,TKey,TValue>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TValue>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> ToImmutableDictionary<TSource,TKey,TValue> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TValue> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer);
```

Enumerates and transforms a sequence, and produces an immutable dictionary of its contents by using the specified key comparer.

Parameters:

- `TSource`: The type of the elements in the sequence.
- `TKey`: The type of the keys in the resulting dictionary.
- `TValue`: The type of the values in the resulting dictionary.
- `source`: The sequence to enumerate to generate the dictionary.
- `keySelector`: The function that will produce the key for the dictionary from each sequence element.
- `elementSelector`: The function that will produce the value for the dictionary from each sequence element.
- `keyComparer`: The key <example-value> to use for the dictionary.

Returns: An immutable dictionary that contains the items in the specified sequence.

Exceptions:

- `ArgumentException`: An element with the same key but a different value already exists in the dictionary.

To be added.

## ImmutableDictionary.ToImmutableDictionary<TSource,TKey,TValue>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TValue>, IEqualityComparer<TKey>, IEqualityComparer<TValue>) method

```csharp
public static System.Collections.Immutable.ImmutableDictionary<TKey,TValue> ToImmutableDictionary<TSource,TKey,TValue> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TValue> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer, System.Collections.Generic.IEqualityComparer<TValue>? valueComparer);
```

Enumerates and transforms a sequence, and produces an immutable dictionary of its contents by using the specified key and value comparers.

Parameters:

- `TSource`: The type of the elements in the sequence.
- `TKey`: The type of the keys in the resulting dictionary.
- `TValue`: The type of the values in the resulting dictionary.
- `source`: The sequence to enumerate to generate the dictionary.
- `keySelector`: The function that will produce the key for the dictionary from each sequence element.
- `elementSelector`: The function that will produce the value for the dictionary from each sequence element.
- `keyComparer`: The key <example-value> to use for the dictionary.
- `valueComparer`: The value comparer to use for the dictionary.

Returns: An immutable dictionary that contains the items in the specified sequence.

Exceptions:

- `ArgumentException`: An element with the same key but a different value already exists in the dictionary.

To be added.
