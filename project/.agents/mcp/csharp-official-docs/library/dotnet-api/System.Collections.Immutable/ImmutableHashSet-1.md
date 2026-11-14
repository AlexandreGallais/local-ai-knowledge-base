---
title: "ImmutableHashSet<T> class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableHashSet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableHashSet<T> class

Namespace: `System.Collections.Immutable`

```csharp
public sealed class ImmutableHashSet<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlySet<T>, System.Collections.Generic.ISet<T>, System.Collections.ICollection, System.Collections.Immutable.IImmutableSet<T>
```

Represents an immutable, unordered hash set.

Parameters:

- `T`: The type of elements in the hash set.

#### Remarks
A set is a collection that contains no duplicate elements, and whose elements are in no particular order. When you add or remove elements from an immutable set, a copy of the original set is created with these elements added or removed, and the original set is unchanged.

#### Examples
This example shows how to create an immutable hash set and iterate over elements in it:

_Code sample not included: ~/snippets/csharp/System.Collections.Immutable/ImmutableHashSet`1/Overview/ImmutableHashSetSnippets.cs._
This example shows how to create a new immutable hash set by adding and removing elements from the original set:

_Code sample not included: ~/snippets/csharp/System.Collections.Immutable/ImmutableHashSet`1/Overview/ImmutableHashSetSnippets.cs._
This example shows how to use set operations on immutable hash sets:

_Code sample not included: ~/snippets/csharp/System.Collections.Immutable/ImmutableHashSet`1/Overview/ImmutableHashSetSnippets.cs._
## ImmutableHashSet<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements in the immutable hash set.

Returns: The number of elements in the hash set.

To be added.

## ImmutableHashSet<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether the current immutable hash set is empty.

Returns: `true` if this instance is empty; otherwise, `false`.

To be added.

## ImmutableHashSet<T>.KeyComparer property

```csharp
public System.Collections.Generic.IEqualityComparer<T> KeyComparer { get; }
```

Gets the object that is used to obtain hash codes for the keys and to check the equality of values in the immutable hash set.

Returns: The comparer used to obtain hash codes for the keys and check equality.

To be added.

## ImmutableHashSet<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

See the `ICollection<T>` interface.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

To be added.

## ImmutableHashSet<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

See the `ICollection` interface.

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `ICollection` interface.

## ImmutableHashSet<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

See `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `ICollection` interface.

## ImmutableHashSet<T>.Add(T) method

```csharp
public System.Collections.Immutable.ImmutableHashSet<T> Add (T item);
```

Adds the specified element to the hash set.

Parameters:

- `item`: The element to add to the set.

Returns: A hash set that contains the added value and any values previously held by the  `ImmutableHashSet<T>` object.

To be added.

## ImmutableHashSet<T>.Clear() method

```csharp
public System.Collections.Immutable.ImmutableHashSet<T> Clear ();
```

Retrieves an empty immutable hash set that has the same sorting and ordering semantics as this instance.

Returns: An empty hash set that has the same sorting and ordering semantics as this instance.

To be added.

## ImmutableHashSet<T>.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether this immutable hash set contains the specified element.

Parameters:

- `item`: The object to locate in the immutable hash set.

Returns: `true` if `item` is found in the `ImmutableHashSet<T>`; otherwise, `false`.

To be added.

## ImmutableHashSet<T>.Except(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.ImmutableHashSet<T> Except (System.Collections.Generic.IEnumerable<T> other);
```

Removes the elements in the specified collection from the current immutable hash set.

Parameters:

- `other`: The collection of items to remove from this set.

Returns: A new set with the items removed; or the original set if none of the items were in the set.

To be added.

## ImmutableHashSet<T>.GetEnumerator() method

```csharp
public System.Collections.Immutable.ImmutableHashSet<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## ImmutableHashSet<T>.Intersect(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.ImmutableHashSet<T> Intersect (System.Collections.Generic.IEnumerable<T> other);
```

Creates an immutable hash set that contains elements that exist in both this set and the specified set.

Parameters:

- `other`: The collection to compare to the current set.

Returns: A new immutable set that contains any elements that exist in both sets.

To be added.

## ImmutableHashSet<T>.IsProperSubsetOf(IEnumerable<T>) method

```csharp
public bool IsProperSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable hash set is a proper (strict) subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper subset of the specified collection; otherwise, `false`.

#### Remarks
If the current set is a proper subset of `other`, `other` must have at least one element that the current set does not have.

## ImmutableHashSet<T>.IsProperSupersetOf(IEnumerable<T>) method

```csharp
public bool IsProperSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable hash set is a proper (strict) superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper superset of the specified collection; otherwise, `false`.

#### Remarks
If the current set is a proper superset of `other`, the current set must have at least one element that `other` does not have.

## ImmutableHashSet<T>.IsSubsetOf(IEnumerable<T>) method

```csharp
public bool IsSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable hash set is a subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a subset of the specified collection; otherwise, `false`.

To be added.

## ImmutableHashSet<T>.IsSupersetOf(IEnumerable<T>) method

```csharp
public bool IsSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable hash set is a superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a superset of the specified collection; otherwise, `false`.

To be added.

## ImmutableHashSet<T>.Overlaps(IEnumerable<T>) method

```csharp
public bool Overlaps (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable hash set overlaps with the specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set and the specified collection share at least one common element; otherwise, `false`.

To be added.

## ImmutableHashSet<T>.Remove(T) method

```csharp
public System.Collections.Immutable.ImmutableHashSet<T> Remove (T item);
```

Removes the specified element from this immutable hash set.

Parameters:

- `item`: The element to remove.

Returns: A new set with the specified element removed, or the current set if the element cannot be found in the set.

To be added.

## ImmutableHashSet<T>.SetEquals(IEnumerable<T>) method

```csharp
public bool SetEquals (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable hash set and the specified collection contain the same elements.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the sets are equal; otherwise, `false`.

To be added.

## ImmutableHashSet<T>.SymmetricExcept(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.ImmutableHashSet<T> SymmetricExcept (System.Collections.Generic.IEnumerable<T> other);
```

Creates an immutable hash set that contains only elements that are present either in the current set or in the specified collection, but not both.

Parameters:

- `other`: The collection to compare to the current set.

Returns: A new set that contains the elements that are present only in the current set or in the specified collection, but not both.

To be added.

## ImmutableHashSet<T>.System.Collections.Generic.ICollection<T>.Add(T) method

```csharp
void ICollection<T>.Add (T item);
```

Adds an item to the set.

Parameters:

- `item`: The object to add to the set.

Exceptions:

- `NotSupportedException`: The set is read-only.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `ICollection<T>` interface.

## ImmutableHashSet<T>.System.Collections.Generic.ICollection<T>.Clear() method

```csharp
void ICollection<T>.Clear ();
```

Removes all items from this set.

Exceptions:

- `NotSupportedException`: The set is read-only.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `ICollection<T>` interface.

## ImmutableHashSet<T>.System.Collections.Generic.ICollection<T>.CopyTo(T[], Int32) method

```csharp
void ICollection<T>.CopyTo (T[] array, int arrayIndex);
```

Copies the elements of the set to an array, starting at a particular index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the set. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `ICollection<T>` interface.

## ImmutableHashSet<T>.System.Collections.Generic.ICollection<T>.Remove(T) method

```csharp
bool ICollection<T>.Remove (T item);
```

Removes the first occurrence of a specific object from the set.

Parameters:

- `item`: The object to remove from the set.

Returns: `true` if the element is successfully removed; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `ICollection<T>` interface.

## ImmutableHashSet<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that iterates through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `IEnumerable<T>` interface.

## ImmutableHashSet<T>.System.Collections.Generic.ISet<T>.Add(T) method

```csharp
bool ISet<T>.Add (T item);
```

Adds an element to the current set and returns a value that indicates whether the element was successfully added.

Parameters:

- `item`: The element to add to the collection.

Returns: `true` if the element is added to the set; `false` if the element is already in the set.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `ISet<T>` interface.

## ImmutableHashSet<T>.System.Collections.Generic.ISet<T>.ExceptWith(IEnumerable<T>) method

```csharp
void ISet<T>.ExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Removes all elements in the specified collection from the current set.

Parameters:

- `other`: The collection of items to remove.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `ISet<T>` interface.

## ImmutableHashSet<T>.System.Collections.Generic.ISet<T>.IntersectWith(IEnumerable<T>) method

```csharp
void ISet<T>.IntersectWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains only elements that are also in a specified collection.

Parameters:

- `other`: The collection to compare to the current collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `ISet<T>` interface.

## ImmutableHashSet<T>.System.Collections.Generic.ISet<T>.SymmetricExceptWith(IEnumerable<T>) method

```csharp
void ISet<T>.SymmetricExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains only elements that are present either in the current set or in the specified collection, but not both.

Parameters:

- `other`: The collection to compare to the current set.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `ISet<T>` interface.

## ImmutableHashSet<T>.System.Collections.Generic.ISet<T>.UnionWith(IEnumerable<T>) method

```csharp
void ISet<T>.UnionWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains all elements that are present in either the current set or in the specified collection.

Parameters:

- `other`: The collection to compare to the current set.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ImmutableHashSet<T>` instance is cast to an `ISet<T>` interface.
