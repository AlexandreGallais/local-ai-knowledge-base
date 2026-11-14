---
title: "ImmutableHashSet<T> class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableHashSet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableHashSet<T> class (part 2 of 2)

## ImmutableHashSet<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int arrayIndex);
```

Copies the elements of the set to an array, starting at a particular index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the set. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `ICollection<T>` interface.

## ImmutableHashSet<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a set.

Returns: An enumerator that can be used to iterate through the set.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `IEnumerable` interface.

## ImmutableHashSet<T>.System.Collections.Immutable.IImmutableSet<T>.Add(T) method

```csharp
System.Collections.Immutable.IImmutableSet<T> IImmutableSet<T>.Add (T item);
```

Adds the specified element to this immutable set.

Parameters:

- `item`: The element to add.

Returns: A new set with the element added, or this set if the element is already in the set.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `IImmutableSet<T>` interface.

## ImmutableHashSet<T>.System.Collections.Immutable.IImmutableSet<T>.Clear() method

```csharp
System.Collections.Immutable.IImmutableSet<T> IImmutableSet<T>.Clear ();
```

Retrieves an empty set that has the same sorting and ordering semantics as this instance.

Returns: An empty set that has the same sorting or ordering semantics as this instance.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `IImmutableSet<T>` interface.

## ImmutableHashSet<T>.System.Collections.Immutable.IImmutableSet<T>.Except(IEnumerable<T>) method

```csharp
System.Collections.Immutable.IImmutableSet<T> IImmutableSet<T>.Except (System.Collections.Generic.IEnumerable<T> other);
```

Removes the elements in the specified collection from the current set.

Parameters:

- `other`: The collection of items to remove from this set.

Returns: A new set with the items removed; or the original set if none of the items were in the set.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `IImmutableSet<T>` interface.

## ImmutableHashSet<T>.System.Collections.Immutable.IImmutableSet<T>.Intersect(IEnumerable<T>) method

```csharp
System.Collections.Immutable.IImmutableSet<T> IImmutableSet<T>.Intersect (System.Collections.Generic.IEnumerable<T> other);
```

Creates an immutable set that contains elements that exist in both this set and the specified set.

Parameters:

- `other`: The collection to compare to the current set.

Returns: A new immutable set that contains any elements that exist in both sets.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `IImmutableSet<T>` interface.

## ImmutableHashSet<T>.System.Collections.Immutable.IImmutableSet<T>.Remove(T) method

```csharp
System.Collections.Immutable.IImmutableSet<T> IImmutableSet<T>.Remove (T item);
```

Removes the specified element from this immutable set.

Parameters:

- `item`: The element to remove.

Returns: A new set with the specified element removed, or the current set if the element cannot be found in the set.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `IImmutableSet<T>` interface.

## ImmutableHashSet<T>.System.Collections.Immutable.IImmutableSet<T>.SymmetricExcept(IEnumerable<T>) method

```csharp
System.Collections.Immutable.IImmutableSet<T> IImmutableSet<T>.SymmetricExcept (System.Collections.Generic.IEnumerable<T> other);
```

Creates an immutable set that contains only elements that are present either in the current set or in the specified collection, but not both.

Parameters:

- `other`: The collection to compare to the current set.

Returns: A new set that contains the elements that are present only in the current set or in the specified collection, but not both.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `IImmutableSet<T>` interface.

## ImmutableHashSet<T>.System.Collections.Immutable.IImmutableSet<T>.Union(IEnumerable<T>) method

```csharp
System.Collections.Immutable.IImmutableSet<T> IImmutableSet<T>.Union (System.Collections.Generic.IEnumerable<T> other);
```

Creates a new immutable set that contains all elements that are present in either the current set or in the specified collection.

Parameters:

- `other`: The collection to add elements from.

Returns: A new immutable set with the items added; or the original set if all the items were already in the set.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `IImmutableSet<T>` interface.

## ImmutableHashSet<T>.ToBuilder() method

```csharp
public System.Collections.Immutable.ImmutableHashSet<T>.Builder ToBuilder ();
```

Creates an immutable hash set that has the same contents as this set and can be efficiently mutated across multiple operations by using standard mutable interfaces.

Returns: A set with the same contents as this set that can be efficiently mutated across multiple operations by using standard mutable interfaces.

#### Remarks
This is an O(1) operation and results in only a single (small) memory allocation. The mutable collection that is returned is not thread safe.

## ImmutableHashSet<T>.TryGetValue(T, T) method

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

## ImmutableHashSet<T>.Union(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.ImmutableHashSet<T> Union (System.Collections.Generic.IEnumerable<T> other);
```

Creates a new immutable hash set that contains all elements that are present in either the current set or in the specified collection.

Parameters:

- `other`: The collection to add elements from.

Returns: A new immutable hash set with the items added; or the original set if all the items were already in the set.

To be added.

## ImmutableHashSet<T>.WithComparer(IEqualityComparer<T>) method

```csharp
public System.Collections.Immutable.ImmutableHashSet<T> WithComparer (System.Collections.Generic.IEqualityComparer<T>? equalityComparer);
```

Gets an instance of the immutable hash set that uses the specified equality comparer for its search methods.

Parameters:

- `equalityComparer`: The equality comparer to use.

Returns: An instance of this immutable hash set that uses the given comparer.

To be added.

## ImmutableHashSet<T>.Empty field

```csharp
public static readonly System.Collections.Immutable.ImmutableHashSet<T> Empty;
```

Gets an immutable hash set for this type that uses the default `IEqualityComparer<T>`.

To be added.
