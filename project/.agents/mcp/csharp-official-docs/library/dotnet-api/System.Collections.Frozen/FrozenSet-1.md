---
title: "FrozenSet<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Frozen/FrozenSet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FrozenSet<T> class

Namespace: `System.Collections.Frozen`

```csharp
public abstract class FrozenSet<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlySet<T>, System.Collections.Generic.ISet<T>, System.Collections.ICollection
```

Provides an immutable, read-only set optimized for fast lookup and enumeration.

Parameters:

- `T`: The type of the values in this set.

`FrozenSet<T>` is immutable and is optimized for situations where a set is created infrequently but is used frequently at run time. It has a relatively high cost to create but provides excellent lookup performance. Thus, it is ideal for cases where a set is created once, potentially at the startup of an application, and is used throughout the remainder of the life of the application. `FrozenSet<T>` should only be initialized with trusted elements, as the details of the elements impacts construction time.

## FrozenSet<T>.Comparer property

```csharp
public System.Collections.Generic.IEqualityComparer<T> Comparer { get; }
```

Gets the comparer used by this set.

Returns: To be added.

To be added.

## FrozenSet<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of values contained in the set.

Returns: To be added.

To be added.

## FrozenSet<T>.Empty property

```csharp
public static System.Collections.Frozen.FrozenSet<T> Empty { get; }
```

Gets an empty `FrozenSet<T>`.

Returns: To be added.

To be added.

## FrozenSet<T>.Items property

```csharp
public System.Collections.Immutable.ImmutableArray<T> Items { get; }
```

Gets a collection containing the values in the set.

Returns: To be added.

The order of the values in the set is unspecified.

## FrozenSet<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

To be added.

## FrozenSet<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.

To be added.

## FrozenSet<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

To be added.

## FrozenSet<T>.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether the set contains the specified element.

Parameters:

- `item`: The element to locate.

Returns: `true` if the set contains the specified element; otherwise, `false`.

To be added.

## FrozenSet<T>.CopyTo(Span<T>) method

```csharp
public void CopyTo (Span<T> destination);
```

Copies the values in the set to a span.

Parameters:

- `destination`: The span that is the destination of the values copied from the set.

To be added.

## FrozenSet<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] destination, int destinationIndex);
```

Copies the values in the set to an array, starting at the specified `destinationIndex`.

Parameters:

- `destination`: The array that is the destination of the values copied from the set.
- `destinationIndex`: The zero-based index in `destination` at which copying begins.

To be added.

## FrozenSet<T>.GetAlternateLookup<TAlternate>() method

```csharp
public System.Collections.Frozen.FrozenSet<T>.AlternateLookup<TAlternate> GetAlternateLookup<TAlternate> () where TAlternate : allows ref struct;
```

Gets an instance of a type that may be used to perform operations on a `FrozenSet<T>` using a `TAlternate` instead of a `T`.

Parameters:

- `TAlternate`: The alternate type of a item for performing lookups.

Returns: The created lookup instance.

Exceptions:

- `InvalidOperationException`: This instance's comparer is not compatible with `TAlternate`.

This instance must be using a comparer that implements `IAlternateEqualityComparer<T1,T2>` with `TAlternate` and `T`. If it doesn't, an exception will be thrown.

## FrozenSet<T>.GetEnumerator() method

```csharp
public System.Collections.Frozen.FrozenSet<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the set.

Returns: An enumerator that iterates through the set.

To be added.

## FrozenSet<T>.IsProperSubsetOf(IEnumerable<T>) method

```csharp
public bool IsProperSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a proper (strict) subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper subset of `other`; otherwise, `false`.

To be added.

## FrozenSet<T>.IsProperSupersetOf(IEnumerable<T>) method

```csharp
public bool IsProperSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a proper (strict) superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper superset of `other`; otherwise, `false`.

To be added.

## FrozenSet<T>.IsSubsetOf(IEnumerable<T>) method

```csharp
public bool IsSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether a set is a subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a subset of `other`; otherwise, `false`.

To be added.

## FrozenSet<T>.IsSupersetOf(IEnumerable<T>) method

```csharp
public bool IsSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a superset of `other`; otherwise, `false`.

To be added.

## FrozenSet<T>.Overlaps(IEnumerable<T>) method

```csharp
public bool Overlaps (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set overlaps with the specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set and `other` share at least one common element; otherwise, `false`.

To be added.

## FrozenSet<T>.SetEquals(IEnumerable<T>) method

```csharp
public bool SetEquals (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set and the specified collection contain the same elements.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is equal to `other`; otherwise, `false`.

To be added.

## FrozenSet<T>.System.Collections.Generic.ICollection<T>.Add(T) method

```csharp
void ICollection<T>.Add (T item);
```

Adds an item to the `ICollection<T>`.

Parameters:

- `item`: The object to add to the `ICollection<T>`.

To be added.

## FrozenSet<T>.System.Collections.Generic.ICollection<T>.Clear() method

```csharp
void ICollection<T>.Clear ();
```

Removes all items from the `ICollection<T>`.

To be added.

## FrozenSet<T>.System.Collections.Generic.ICollection<T>.Remove(T) method

```csharp
bool ICollection<T>.Remove (T item);
```

Removes the first occurrence of a specific object from the `ICollection<T>`.

Parameters:

- `item`: The object to remove from the `ICollection<T>`.

Returns: `true` if `item` was successfully removed from the `ICollection<T>`; otherwise, `false`. This method also returns `false` if `item` is not found in the original `ICollection<T>`.

To be added.

## FrozenSet<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## FrozenSet<T>.System.Collections.Generic.ISet<T>.Add(T) method

```csharp
bool ISet<T>.Add (T item);
```

Adds an element to the current set and returns a value to indicate if the element was successfully added.

Parameters:

- `item`: The element to add to the set.

Returns: `true` if the element is added to the set; `false` if the element is already in the set.

To be added.

## FrozenSet<T>.System.Collections.Generic.ISet<T>.ExceptWith(IEnumerable<T>) method

```csharp
void ISet<T>.ExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Removes all elements in the specified collection from the current set.

Parameters:

- `other`: The collection of items to remove from the set.

To be added.

## FrozenSet<T>.System.Collections.Generic.ISet<T>.IntersectWith(IEnumerable<T>) method

```csharp
void ISet<T>.IntersectWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains only elements that are also in a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

To be added.

## FrozenSet<T>.System.Collections.Generic.ISet<T>.SymmetricExceptWith(IEnumerable<T>) method

```csharp
void ISet<T>.SymmetricExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains only elements that are present either in the current set or in the specified collection, but not both.

Parameters:

- `other`: The collection to compare to the current set.

To be added.

## FrozenSet<T>.System.Collections.Generic.ISet<T>.UnionWith(IEnumerable<T>) method

```csharp
void ISet<T>.UnionWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains all elements that are present in the current set, in the specified collection, or in both.

Parameters:

- `other`: The collection to compare to the current set.

To be added.

## FrozenSet<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

To be added.

## FrozenSet<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

To be added.

## FrozenSet<T>.TryGetAlternateLookup<TAlternate>(FrozenSet<T>+AlternateLookup<TAlternate>) method

```csharp
public bool TryGetAlternateLookup<TAlternate> (out System.Collections.Frozen.FrozenSet<T>.AlternateLookup<TAlternate> lookup) where TAlternate : allows ref struct;
```

Gets an instance of a type that may be used to perform operations on a `FrozenSet<T>`
using a `TAlternate` instead of a `T`.

Parameters:

- `TAlternate`: The alternate type of a key for performing lookups.
- `lookup`: The created lookup instance when the method returns `true`, or a default instance that should not be used if the method returns `false`.

Returns: `true` if a lookup could be created; otherwise, `false`.

This instance must be using a comparer that implements `IAlternateEqualityComparer<T1,T2>` with
`TAlternate` and `T`. If it doesn't, the method will return `false`.

## FrozenSet<T>.TryGetValue(T, T) method

```csharp
public bool TryGetValue (T equalValue, out T actualValue);
```

Searches the set for a given value and returns the equal value it finds, if any.

Parameters:

- `equalValue`: The value to search for.
- `actualValue`: The value from the set that the search found, or the default value of T when the search yielded no match.

Returns: A value indicating whether the search was successful.

To be added.
