---
title: "ISet<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/ISet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ISet<T> interface

Namespace: `System.Collections.Generic`

```csharp
public interface ISet<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>
```

Provides the base interface for the abstraction of sets.

Parameters:

- `T`: The type of elements in the set.

#### Remarks
This interface provides methods for implementing sets, which are collections that have unique elements and specific operations. The `HashSet<T>` and `SortedSet<T>` collections implement this interface.

## ISet<T>.Add(T) method

```csharp
public bool Add (T item);
```

Adds an element to the current set and returns a value to indicate if the element was successfully added.

Parameters:

- `item`: The element to add to the set.

Returns: `true` if the element is added to the set; `false` if the element is already in the set.

To be added.

## ISet<T>.ExceptWith(IEnumerable<T>) method

```csharp
public void ExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Removes all elements in the specified collection from the current set.

Parameters:

- `other`: The collection of items to remove from the set.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
This method is an O(`n`) operation, where `n` is the number of elements in the `other` parameter.

## ISet<T>.IntersectWith(IEnumerable<T>) method

```csharp
public void IntersectWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains only elements that are also in a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
This method ignores any duplicate elements in `other`.

## ISet<T>.IsProperSubsetOf(IEnumerable<T>) method

```csharp
public bool IsProperSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a proper (strict) subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper subset of `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
If the current set is a proper subset of `other`, `other` must have at least one element that the current set does not have.

An empty set is a subset of any other collection. Therefore, this method returns `true` if the current set is empty, unless the `other` parameter is also an empty set.

This method always returns `false` if the current set has more or the same number of elements than `other`.

## ISet<T>.IsProperSupersetOf(IEnumerable<T>) method

```csharp
public bool IsProperSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a proper (strict) superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper superset of `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
If the current set is a proper superset of `other`, the current set must have at least one element that `other` does not have.

An empty set is a subset of any other collection. Therefore, this method returns `true` if the collection represented by the `other` parameter is empty, unless the current set is also empty.

This method always returns `false` if the number of elements in the current set is less than or equal to the number of elements in `other`.

## ISet<T>.IsSubsetOf(IEnumerable<T>) method

```csharp
public bool IsSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether a set is a subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a subset of `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
If `other` contains the same elements as the current set, the current set is still considered a subset of other.

This method always returns `false` if the current set has elements that are not in `other`.

## ISet<T>.IsSupersetOf(IEnumerable<T>) method

```csharp
public bool IsSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a superset of `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
If `other` contains the same elements as the current set, the current set is still considered a superset of `other`.

This method always returns `false` if the current set has fewer elements than `other`.

## ISet<T>.Overlaps(IEnumerable<T>) method

```csharp
public bool Overlaps (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set overlaps with the specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set and `other` share at least one common element; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
Any duplicate elements in `other` are ignored.

## ISet<T>.SetEquals(IEnumerable<T>) method

```csharp
public bool SetEquals (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set and the specified collection contain the same elements.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is equal to `other`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
This method ignores the order of elements and any duplicate elements in `other`.

## ISet<T>.SymmetricExceptWith(IEnumerable<T>) method

```csharp
public void SymmetricExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains only elements that are present either in the current set or in the specified collection, but not both.

Parameters:

- `other`: The collection to compare to the current set.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
Any duplicate elements in `other` are ignored.

## ISet<T>.UnionWith(IEnumerable<T>) method

```csharp
public void UnionWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains all elements that are present in the current set, in the specified collection, or in both.

Parameters:

- `other`: The collection to compare to the current set.

Exceptions:

- `ArgumentNullException`: `other` is `null`.

#### Remarks
Any duplicate elements in `other` are ignored.
