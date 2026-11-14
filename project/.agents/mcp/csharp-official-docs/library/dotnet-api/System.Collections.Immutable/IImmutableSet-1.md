---
title: "IImmutableSet<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/IImmutableSet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IImmutableSet<T> interface

Namespace: `System.Collections.Immutable`

```csharp
public interface IImmutableSet<T> : System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>
```

Represents a set of elements that can only be modified by creating a new instance of the set.

Parameters:

- `T`: The type of element stored in the set.

#### Remarks
Mutations on this set generate new sets. Incremental changes to a set share as much memory as possible with the prior versions of a set, while allowing garbage collection to clean up any unique set data that is no longer being referenced.

## IImmutableSet<T>.Add(T) method

```csharp
public System.Collections.Immutable.IImmutableSet<T> Add (T value);
```

Adds the specified element to this immutable set.

Parameters:

- `value`: The element to add.

Returns: A new set with the element added, or this set if the element is already in the set.

To be added.

## IImmutableSet<T>.Clear() method

```csharp
public System.Collections.Immutable.IImmutableSet<T> Clear ();
```

Retrieves an empty immutable set that has the same sorting and ordering semantics as this instance.

Returns: An empty set that has the same sorting and ordering semantics as this instance.

To be added.

## IImmutableSet<T>.Contains(T) method

```csharp
public bool Contains (T value);
```

Determines whether this immutable set contains a specified element.

Parameters:

- `value`: The element to locate in the set.

Returns: `true` if the set contains the specified value; otherwise, `false`.

To be added.

## IImmutableSet<T>.Except(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.IImmutableSet<T> Except (System.Collections.Generic.IEnumerable<T> other);
```

Removes the elements in the specified collection from the current immutable set.

Parameters:

- `other`: The collection of items to remove from this set.

Returns: A new set with the items removed; or the original set if none of the items were in the set.

To be added.

## IImmutableSet<T>.Intersect(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.IImmutableSet<T> Intersect (System.Collections.Generic.IEnumerable<T> other);
```

Creates an immutable set that contains only elements that exist in this set and the specified set.

Parameters:

- `other`: The collection to compare to the current `IImmutableSet<T>`.

Returns: A new immutable set that contains elements that exist in both sets.

To be added.

## IImmutableSet<T>.IsProperSubsetOf(IEnumerable<T>) method

```csharp
public bool IsProperSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable set is a proper (strict) subset of the specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper subset of the specified collection; otherwise, `false`.

#### Remarks
If the current set is a proper subset of `other`, `other` must have at least one element that the current set does not have.

## IImmutableSet<T>.IsProperSupersetOf(IEnumerable<T>) method

```csharp
public bool IsProperSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable set is a proper (strict) superset of the specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper superset of the specified collection; otherwise, `false`.

#### Remarks
If the current set is a proper superset of `other`, the current set must have at least one element that `other` does not have.

## IImmutableSet<T>.IsSubsetOf(IEnumerable<T>) method

```csharp
public bool IsSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable set is a subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a subset of the specified collection; otherwise, `false`.

To be added.

## IImmutableSet<T>.IsSupersetOf(IEnumerable<T>) method

```csharp
public bool IsSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable set is a superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a superset of the specified collection; otherwise, `false`.

To be added.

## IImmutableSet<T>.Overlaps(IEnumerable<T>) method

```csharp
public bool Overlaps (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable set overlaps with the specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set and the specified collection share at least one common element; otherwise, `false`.

To be added.

## IImmutableSet<T>.Remove(T) method

```csharp
public System.Collections.Immutable.IImmutableSet<T> Remove (T value);
```

Removes the specified element from this immutable set.

Parameters:

- `value`: The element to remove.

Returns: A new set with the specified element removed, or the current set if the element cannot be found in the set.

To be added.

## IImmutableSet<T>.SetEquals(IEnumerable<T>) method

```csharp
public bool SetEquals (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable set and the specified collection contain the same elements.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the sets are equal; otherwise, `false`.

To be added.

## IImmutableSet<T>.SymmetricExcept(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.IImmutableSet<T> SymmetricExcept (System.Collections.Generic.IEnumerable<T> other);
```

Creates an immutable set that contains only elements that are present either in the current set or in the specified collection, but not both.

Parameters:

- `other`: The collection to compare to the current set.

Returns: A new set that contains the elements that are present only in the current set or in the specified collection, but not both.

To be added.

## IImmutableSet<T>.TryGetValue(T, T) method

```csharp
public bool TryGetValue (T equalValue, out T actualValue);
```

Determines whether the set contains a specified value.

Parameters:

- `equalValue`: The value to search for.
- `actualValue`: The matching value from the set, if found, or `equalvalue` if there are no matches.

Returns: `true` if a matching value was found; otherwise, `false`.

#### Remarks
Following are some scenarios where `IImmutableSet<T>.TryGetValue` may be useful:

- You want to reuse a previously stored object reference instead of creating a new reference.

- You want to retrieve more complete data about an object

## IImmutableSet<T>.Union(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.IImmutableSet<T> Union (System.Collections.Generic.IEnumerable<T> other);
```

Creates a new immutable set that contains all elements that are present in either the current set or in the specified collection.

Parameters:

- `other`: The collection to add elements from.

Returns: A new immutable set with the items added; or the original set if all the items were already in the set.

#### Remarks
Any duplicate elements contained in `other` are ignored.
