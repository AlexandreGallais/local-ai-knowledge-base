---
title: "ImmutableSortedSet<T> class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableSortedSet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableSortedSet<T> class (part 3 of 3)

## ImmutableSortedSet<T>.ToBuilder() method

```csharp
public System.Collections.Immutable.ImmutableSortedSet<T>.Builder ToBuilder ();
```

Creates a collection that has the same contents as this immutable sorted set that can be efficiently manipulated by using standard mutable interfaces.

Returns: The sorted set builder.

#### Remarks

If you need to perform multiple operations on an immutable collection, to increase efficiency you can copy the `ImmutableSortedSet<T>` to a `Builder`, using the `ImmutableSortedSet<T>.ToBuilder` method, manipulate the set and make it immutable again using the `Builder.ToImmutable` method. This will not change the original immutable sorted set.

This is an O(1) operation and results in only a single (small) memory allocation. The mutable collection that is returned is not thread safe.

## ImmutableSortedSet<T>.TryGetValue(T, T) method

```csharp
public bool TryGetValue (T equalValue, out T actualValue);
```

Searches the set for a given value and returns the equal value it finds, if any.

Parameters:

- `equalValue`: The value to search for.
- `actualValue`: The value from the set that the search found, or the original value if the search yielded no match.

Returns: A value indicating whether the search was successful.

#### Remarks

This can be useful when you want to reuse a previously stored reference instead of a newly constructed one (so that more sharing of references can occur) or to look up a value that has more complete data than the value you currently have, although their comparer functions indicate they are equal.

## ImmutableSortedSet<T>.Union(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.ImmutableSortedSet<T> Union (System.Collections.Generic.IEnumerable<T> other);
```

Adds a given set of items to this immutable sorted set.

Parameters:

- `other`: The items to add.

Returns: The new set with the items added; or the original set if all the items were already in the set.

To be added.

## ImmutableSortedSet<T>.WithComparer(IComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableSortedSet<T> WithComparer (System.Collections.Generic.IComparer<T>? comparer);
```

Returns the immutable sorted set that has the specified key comparer.

Parameters:

- `comparer`: The comparer to check for.

Returns: The immutable sorted set that has the specified key comparer.

To be added.

## ImmutableSortedSet<T>.Empty field

```csharp
public static readonly System.Collections.Immutable.ImmutableSortedSet<T> Empty;
```

Gets an empty immutable sorted set.

To be added.
