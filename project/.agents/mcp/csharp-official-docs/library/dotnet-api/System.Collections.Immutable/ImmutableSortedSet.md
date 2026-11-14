---
title: "ImmutableSortedSet class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableSortedSet.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableSortedSet class

Namespace: `System.Collections.Immutable`

```csharp
public static class ImmutableSortedSet
```

Provides a set of initialization methods for instances of the `ImmutableSortedSet<T>` class.

To be added.

## ImmutableSortedSet.Create<T>() method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<T> Create<T> ();
```

Creates an empty immutable sorted set.

Parameters:

- `T`: The type of items to be stored in the immutable set.

Returns: An empty immutable sorted set.

To be added.

## ImmutableSortedSet.Create<T>(IComparer<T>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<T> Create<T> (System.Collections.Generic.IComparer<T>? comparer);
```

Creates an empty immutable sorted set that uses the specified comparer.

Parameters:

- `T`: The type of items in the immutable set.
- `comparer`: The implementation to use when comparing items in the set.

Returns: An empty immutable set.

To be added.

## ImmutableSortedSet.Create<T>(ReadOnlySpan<T>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<T> Create<T> (scoped ReadOnlySpan<T> items);
```

Creates a new immutable sorted set that contains the specified array of items.

Parameters:

- `T`: The type of items in the immutable set.
- `items`: A span that contains the items to prepopulate the set with.

Returns: A new immutable set that contains the specified items.

To be added.

## ImmutableSortedSet.Create<T>(T) method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<T> Create<T> (T item);
```

Creates a new immutable sorted set that contains the specified item.

Parameters:

- `T`: The type of items in the immutable set.
- `item`: The item to prepopulate the set with.

Returns: A new immutable set that contains the specified item.

To be added.

## ImmutableSortedSet.Create<T>(T[]) method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<T> Create<T> (params T[] items);
```

Creates a new immutable sorted set that contains the specified array of items.

Parameters:

- `T`: The type of items in the immutable set.
- `items`: An array that contains the items to prepopulate the set with.

Returns: A new immutable set that contains the specified items.

To be added.

## ImmutableSortedSet.Create<T>(IComparer<T>, ReadOnlySpan<T>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<T> Create<T> (System.Collections.Generic.IComparer<T>? comparer, scoped ReadOnlySpan<T> items);
```

Creates a new immutable collection prefilled with the specified items.

Parameters:

- `T`: The type of items stored by the collection.
- `comparer`: The comparer.
- `items`: The items to prepopulate.

Returns: The new immutable collection.

To be added.

## ImmutableSortedSet.Create<T>(IComparer<T>, T) method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<T> Create<T> (System.Collections.Generic.IComparer<T>? comparer, T item);
```

Creates a new immutable sorted set that contains the specified item and uses the specified comparer.

Parameters:

- `T`: The type of items stored in the immutable set.
- `comparer`: The implementation to use when comparing items in the set.
- `item`: The item to prepopulate the set with.

Returns: A new immutable set that contains the specified item.

To be added.

## ImmutableSortedSet.Create<T>(IComparer<T>, T[]) method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<T> Create<T> (System.Collections.Generic.IComparer<T>? comparer, params T[] items);
```

Creates a new immutable sorted set that contains the specified array of items and uses the specified comparer.

Parameters:

- `T`: The type of items in the immutable set.
- `comparer`: The implementation to use when comparing items in the set.
- `items`: An array that contains the items to prepopulate the set with.

Returns: A new immutable set that contains the specified items.

To be added.

## ImmutableSortedSet.CreateBuilder<T>() method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<T>.Builder CreateBuilder<T> ();
```

Returns a collection that can be used to build an immutable sorted set.

Parameters:

- `T`: The type of items stored by the collection.

Returns: The immutable collection builder.

To be added.

## ImmutableSortedSet.CreateBuilder<T>(IComparer<T>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<T>.Builder CreateBuilder<T> (System.Collections.Generic.IComparer<T>? comparer);
```

Returns a collection that can be used to build an immutable sorted set.

Parameters:

- `T`: The type of items stored by the collection.
- `comparer`: The comparer used to compare items in the set for equality.

Returns: The immutable collection.

To be added.

## ImmutableSortedSet.CreateRange<T>(IEnumerable<T>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<T> CreateRange<T> (System.Collections.Generic.IEnumerable<T> items);
```

Creates a new immutable collection that contains the specified items.

Parameters:

- `T`: The type of items stored by the collection.
- `items`: The items to add to the set with before it's immutable.

Returns: The new immutable set that contains the specified items.

To be added.

## ImmutableSortedSet.CreateRange<T>(IComparer<T>, IEnumerable<T>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<T> CreateRange<T> (System.Collections.Generic.IComparer<T>? comparer, System.Collections.Generic.IEnumerable<T> items);
```

Creates a new immutable collection that contains the specified items.

Parameters:

- `T`: The type of items stored by the collection.
- `comparer`: The comparer to use to compare elements in this set.
- `items`: The items to add to the set before it's immutable.

Returns: The new immutable set that contains the specified items.

To be added.

## ImmutableSortedSet.ToImmutableSortedSet<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<TSource> ToImmutableSortedSet<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Enumerates a sequence and produces an immutable sorted set of its contents.

Parameters:

- `TSource`: The type of the elements in the sequence.
- `source`: The sequence to enumerate.

Returns: An immutable sorted set that contains the items in the specified sequence.

To be added.

## ImmutableSortedSet.ToImmutableSortedSet<TSource>(ImmutableSortedSet<TSource>+Builder) method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<TSource> ToImmutableSortedSet<TSource> (this System.Collections.Immutable.ImmutableSortedSet<TSource>.Builder builder);
```

Creates an immutable sorted set from the current contents of the builder's set.

Parameters:

- `TSource`: The type of the elements in the immutable sorted set.
- `builder`: The builder to create the immutable sorted set from.

Returns: An immutable sorted set that contains the current contents in the builder's set.

To be added.

## ImmutableSortedSet.ToImmutableSortedSet<TSource>(IEnumerable<TSource>, IComparer<TSource>) method

```csharp
public static System.Collections.Immutable.ImmutableSortedSet<TSource> ToImmutableSortedSet<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, System.Collections.Generic.IComparer<TSource>? comparer);
```

Enumerates a sequence, produces an immutable sorted set of its contents, and uses the specified comparer.

Parameters:

- `TSource`: The type of the elements in the sequence.
- `source`: The sequence to enumerate.
- `comparer`: The comparer to use for initializing and adding members to the sorted set.

Returns: An immutable sorted set that contains the items in the specified sequence.

To be added.
