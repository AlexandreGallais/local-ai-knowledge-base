---
title: "ImmutableSortedSet<T>+Builder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableSortedSet`1+Builder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableSortedSet<T>+Builder class

Namespace: `System.Collections.Immutable`

```csharp
public sealed class ImmutableSortedSet<T>.Builder : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.ISet<T>, System.Collections.ICollection
```

Represents a sorted set that enables changes with little or no memory allocations, and efficiently manipulates or builds immutable sorted sets.

#### Remarks
Although `ImmutableSortedSet<T>.Union` and other methods already provide fast bulk change operations on a collection, the `Builder` class enables multiple combinations of changes to be made to a set with equal or greater efficiency, depending on the operation.

## ImmutableSortedSet<T>+Builder.Count property

```csharp
public int Count { get; }
```

Gets the number of elements in the immutable sorted set.

Returns: The number of elements in this set.

To be added.

## ImmutableSortedSet<T>+Builder.Item property

```csharp
public T this[int index] { get; }
```

Gets the element of the set at the given index.

Parameters:

- `index`: The 0-based index of the element in the set to return.

Returns: The element at the given position.

#### Remarks
No index setter is offered because the element being replaced may not sort             to the same position in the sorted collection as the replacing element.

## ImmutableSortedSet<T>+Builder.KeyComparer property

```csharp
public System.Collections.Generic.IComparer<T> KeyComparer { get; set; }
```

Gets or sets the object that is used to determine equality for the values in the immutable sorted set.

Returns: The comparer that is used to determine equality for the values in the set.

#### Remarks
If the comparer is changed in a way that would introduce collisions, the conflicting elements are dropped, leaving only one of each matching pair in the collection.

## ImmutableSortedSet<T>+Builder.Max property

```csharp
public T? Max { get; }
```

Gets the maximum value in the immutable sorted set, as defined by the comparer.

Returns: The maximum value in the set.

To be added.

## ImmutableSortedSet<T>+Builder.Min property

```csharp
public T? Min { get; }
```

Gets the minimum value in the immutable sorted set, as defined by the comparer.

Returns: The minimum value in the set.

To be added.

## ImmutableSortedSet<T>+Builder.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value that indicates whether this instance is read-only.

Returns: Always `false`.

To be added.

## ImmutableSortedSet<T>+Builder.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value that indicates whether access to the `ICollection` is synchronized (thread-safe).

Returns: `true` if access to the `ICollection` is synchronized (thread-safe); otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `ICollection` interface.

## ImmutableSortedSet<T>+Builder.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `ICollection` interface.

## ImmutableSortedSet<T>+Builder.Add(T) method

```csharp
public bool Add (T item);
```

Adds an element to the current set and returns a value to indicate whether the element was successfully added.

Parameters:

- `item`: The element to add to the set.

Returns: `true` if the element is added to the set; `false` if the element is already in the set.

To be added.

## ImmutableSortedSet<T>+Builder.Clear() method

```csharp
public void Clear ();
```

Removes all elements from this set.

To be added.

## ImmutableSortedSet<T>+Builder.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether the set contains the specified object.

Parameters:

- `item`: The object to locate in the set.

Returns: `true` if `item` is found in the set; otherwise, `false`.

To be added.

## ImmutableSortedSet<T>+Builder.ExceptWith(IEnumerable<T>) method

```csharp
public void ExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Removes the specified set of items from the current set.

Parameters:

- `other`: The collection of items to remove from the set.

To be added.

## ImmutableSortedSet<T>+Builder.GetEnumerator() method

```csharp
public System.Collections.Immutable.ImmutableSortedSet<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the set.

Returns: A enumerator that can be used to iterate through the set.

To be added.

## ImmutableSortedSet<T>+Builder.IndexOf(T) method

```csharp
public int IndexOf (T item);
```

Searches for the first index within this set that the specified value is contained.

Parameters:

- `item`: The value to locate within the set.

Returns: The index of the specified `item` in the sorted set, if `item` is found.  If `item` is not found and `item` is less than one or more elements in this set, returns a negative number that is the bitwise complement of the index of the first element that's larger than `item`. If `item` is not found and `item` is greater than any of the elements in the set, returns a negative number that is the bitwise complement of (the index of the last element plus 1).

To be added.

## ImmutableSortedSet<T>+Builder.IntersectWith(IEnumerable<T>) method

```csharp
public void IntersectWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains only elements that are also in a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

To be added.

## ImmutableSortedSet<T>+Builder.IsProperSubsetOf(IEnumerable<T>) method

```csharp
public bool IsProperSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a proper (strict) subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper subset of `other`; otherwise, `false`.

To be added.

## ImmutableSortedSet<T>+Builder.IsProperSupersetOf(IEnumerable<T>) method

```csharp
public bool IsProperSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a proper (strict) superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper superset of `other`; otherwise, `false`.

To be added.

## ImmutableSortedSet<T>+Builder.IsSubsetOf(IEnumerable<T>) method

```csharp
public bool IsSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a subset of a specified collection.

Parameters:

- `other`: The collection is compare to the current set.

Returns: `true` if the current set is a subset of `other`; otherwise, `false`.

To be added.

## ImmutableSortedSet<T>+Builder.IsSupersetOf(IEnumerable<T>) method

```csharp
public bool IsSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a superset of `other`; otherwise, `false`.

To be added.

## ImmutableSortedSet<T>+Builder.ItemRef(Int32) method

```csharp
public ref readonly T ItemRef (int index);
```

Gets a read-only reference to the element of the set at the given `index`.

Parameters:

- `index`: The 0-based index of the element in the set to return.

Returns: A read-only reference to the element at the given position.

To be added.

## ImmutableSortedSet<T>+Builder.Overlaps(IEnumerable<T>) method

```csharp
public bool Overlaps (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set overlaps with the specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set and `other` share at least one common element; otherwise, `false`.

To be added.

## ImmutableSortedSet<T>+Builder.Remove(T) method

```csharp
public bool Remove (T item);
```

Removes the first occurrence of the specified object from the set.

Parameters:

- `item`: The object to remove from the set.

Returns: `true` if `item` was removed from the set; `false` if `item` was not found in the set.

To be added.

## ImmutableSortedSet<T>+Builder.Reverse() method

```csharp
public System.Collections.Generic.IEnumerable<T> Reverse ();
```

Returns an enumerator that iterates over the immutable sorted set in reverse order.

Returns: An enumerator that iterates over the set in reverse order.

To be added.

## ImmutableSortedSet<T>+Builder.SetEquals(IEnumerable<T>) method

```csharp
public bool SetEquals (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set and the specified collection contain the same elements.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is equal to `other`; otherwise, `false`.

To be added.

## ImmutableSortedSet<T>+Builder.SymmetricExceptWith(IEnumerable<T>) method

```csharp
public void SymmetricExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains only elements that are present either in the current set or in the specified collection, but not both.

Parameters:

- `other`: The collection to compare to the current set.

To be added.

## ImmutableSortedSet<T>+Builder.System.Collections.Generic.ICollection<T>.Add(T) method

```csharp
void ICollection<T>.Add (T item);
```

Adds an element to the current set and returns a value to indicate whether the element was successfully added.

Parameters:

- `item`: The element to add to the set.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `ICollection<T>` interface.

## ImmutableSortedSet<T>+Builder.System.Collections.Generic.ICollection<T>.CopyTo(T[], Int32) method

```csharp
void ICollection<T>.CopyTo (T[] array, int arrayIndex);
```

Copies the elements of the collection to an array, starting at a particular array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from collection. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `ICollection<T>` interface.

## ImmutableSortedSet<T>+Builder.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: A enumerator that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IEnumerable<T>` interface.

## ImmutableSortedSet<T>+Builder.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int arrayIndex);
```

Copies the elements of the set to an array, starting at a particular array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the set. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `ICollection` interface.

## ImmutableSortedSet<T>+Builder.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: A enumerator that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IEnumerable` interface.

## ImmutableSortedSet<T>+Builder.ToImmutable() method

```csharp
public System.Collections.Immutable.ImmutableSortedSet<T> ToImmutable ();
```

Creates an immutable sorted set based on the contents of this instance.

Returns: An immutable set.

#### Remarks
This method is an O(n) operation and approaches O(1) time as the number of actual mutations to the set since the last call to this method approaches 0.

## ImmutableSortedSet<T>+Builder.TryGetValue(T, T) method

```csharp
public bool TryGetValue (T equalValue, out T actualValue);
```

Searches the set for a given value and returns the equal value it finds, if any.

Parameters:

- `equalValue`: The value for which to search.
- `actualValue`: The value from the set that the search found, or the original value if the search yielded no match.

Returns: A value indicating whether the search was successful.

To be added.

## ImmutableSortedSet<T>+Builder.UnionWith(IEnumerable<T>) method

```csharp
public void UnionWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains all elements that are present in both the current set and in the specified collection.

Parameters:

- `other`: The collection to compare to the current state.

To be added.
