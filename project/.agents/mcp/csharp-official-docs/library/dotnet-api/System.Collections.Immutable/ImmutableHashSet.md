---
title: "ImmutableHashSet class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableHashSet.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableHashSet class

Namespace: `System.Collections.Immutable`

```csharp
public static class ImmutableHashSet
```

Provides a set of initialization methods for instances of the `ImmutableHashSet<T>` class.

To be added.

## ImmutableHashSet.Create<T>() method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<T> Create<T> ();
```

Creates an empty immutable hash set.

Parameters:

- `T`: The type of items to be stored in the immutable hash set.

Returns: An empty immutable hash set.

To be added.

## ImmutableHashSet.Create<T>(IEqualityComparer<T>) method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<T> Create<T> (System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Creates an empty immutable hash set that uses the specified equality comparer.

Parameters:

- `T`: The type of items in the immutable hash set.
- `equalityComparer`: The object to use for comparing objects in the set for equality.

Returns: An empty immutable hash set.

To be added.

## ImmutableHashSet.Create<T>(ReadOnlySpan<T>) method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<T> Create<T> (scoped ReadOnlySpan<T> items);
```

Creates a new immutable collection prefilled with the specified items.

Parameters:

- `T`: The type of items stored by the collection.
- `items`: The items to prepopulate.

Returns: The new immutable collection.

To be added.

## ImmutableHashSet.Create<T>(T) method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<T> Create<T> (T item);
```

Creates a new immutable hash set that contains the specified item.

Parameters:

- `T`: The type of items in the immutable hash set.
- `item`: The item to prepopulate the hash set with.

Returns: A new immutable hash set that contains the specified item.

To be added.

## ImmutableHashSet.Create<T>(T[]) method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<T> Create<T> (params T[] items);
```

Creates a new immutable hash set that contains the specified array of items.

Parameters:

- `T`: The type of items in the immutable hash set.
- `items`: An array that contains the items to prepopulate the hash set with.

Returns: A new immutable hash set that contains the specified items.

To be added.

## ImmutableHashSet.Create<T>(IEqualityComparer<T>, ReadOnlySpan<T>) method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<T> Create<T> (System.Collections.Generic.IEqualityComparer<T>? equalityComparer, scoped ReadOnlySpan<T> items);
```

Creates a new immutable collection prefilled with the specified items.

Parameters:

- `T`: The type of items stored by the collection.
- `equalityComparer`: The equality comparer.
- `items`: The items to prepopulate.

Returns: The new immutable collection.

To be added.

## ImmutableHashSet.Create<T>(IEqualityComparer<T>, T) method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<T> Create<T> (System.Collections.Generic.IEqualityComparer<T>? equalityComparer, T item);
```

Creates a new immutable hash set that contains the specified item and uses the specified equality comparer for the set type.

Parameters:

- `T`: The type of items in the immutable hash set.
- `equalityComparer`: The object to use for comparing objects in the set for equality.
- `item`: The item to prepopulate the hash set with.

Returns: A new immutable hash set that contains the specified item.

To be added.

## ImmutableHashSet.Create<T>(IEqualityComparer<T>, T[]) method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<T> Create<T> (System.Collections.Generic.IEqualityComparer<T>? equalityComparer, params T[] items);
```

Creates a new immutable hash set that contains the items in the specified collection and uses the specified equality comparer for the set type.

Parameters:

- `T`: The type of items stored in the immutable hash set.
- `equalityComparer`: The object to use for comparing objects in the set for equality.
- `items`: An array that contains the items to prepopulate the hash set with.

Returns: A new immutable hash set that contains the specified items.

To be added.

## ImmutableHashSet.CreateBuilder<T>() method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<T>.Builder CreateBuilder<T> ();
```

Creates a new immutable hash set builder.

Parameters:

- `T`: The type of items stored by the collection.

Returns: The immutable hash set builder.

To be added.

## ImmutableHashSet.CreateBuilder<T>(IEqualityComparer<T>) method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<T>.Builder CreateBuilder<T> (System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Creates a new immutable hash set builder.

Parameters:

- `T`: The type of items stored by the collection.
- `equalityComparer`: The object to use for comparing objects in the set for equality.

Returns: The new immutable hash set builder.

To be added.

## ImmutableHashSet.CreateRange<T>(IEnumerable<T>) method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<T> CreateRange<T> (System.Collections.Generic.IEnumerable<T> items);
```

Creates a new immutable hash set prefilled with the specified items.

Parameters:

- `T`: The type of items stored by the collection.
- `items`: The items to add to the hash set.

Returns: The new immutable hash set that contains the specified items.

To be added.

## ImmutableHashSet.CreateRange<T>(IEqualityComparer<T>, IEnumerable<T>) method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<T> CreateRange<T> (System.Collections.Generic.IEqualityComparer<T>? equalityComparer, System.Collections.Generic.IEnumerable<T> items);
```

Creates a new immutable hash set that contains the specified items and uses the specified equality comparer for the set type.

Parameters:

- `T`: The type of items stored in the collection.
- `equalityComparer`: The object to use for comparing objects in the set for equality.
- `items`: The items add to the collection before immutability is applied.

Returns: The new immutable hash set.

To be added.

## ImmutableHashSet.ToImmutableHashSet<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<TSource> ToImmutableHashSet<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Enumerates a sequence and produces an immutable hash set of its contents.

Parameters:

- `TSource`: The type of the elements in the sequence.
- `source`: The sequence to enumerate.

Returns: An immutable hash set that contains the items in the specified sequence.

To be added.

## ImmutableHashSet.ToImmutableHashSet<TSource>(ImmutableHashSet<TSource>+Builder) method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<TSource> ToImmutableHashSet<TSource> (this System.Collections.Immutable.ImmutableHashSet<TSource>.Builder builder);
```

Creates an immutable hash set from the current contents of the builder's set.

Parameters:

- `TSource`: The type of the elements in the hash set.
- `builder`: The builder to create the immutable hash set from.

Returns: An immutable hash set that contains the current contents in the builder's set.

To be added.

## ImmutableHashSet.ToImmutableHashSet<TSource>(IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Collections.Immutable.ImmutableHashSet<TSource> ToImmutableHashSet<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, System.Collections.Generic.IEqualityComparer<TSource>? equalityComparer);
```

Enumerates a sequence, produces an immutable hash set of its contents, and uses the specified equality comparer for the set type.

Parameters:

- `TSource`: The type of the elements in the sequence.
- `source`: The sequence to enumerate.
- `equalityComparer`: The object to use for comparing objects in the set for equality.

Returns: An immutable hash set that contains the items in the specified sequence and uses the specified equality comparer.

To be added.
