---
title: "ImmutableSortedSet<T> class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableSortedSet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableSortedSet<T> class

Namespace: `System.Collections.Immutable`

```csharp
public sealed class ImmutableSortedSet<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IList<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlyList<T>, System.Collections.Generic.IReadOnlySet<T>, System.Collections.Generic.ISet<T>, System.Collections.IList, System.Collections.Immutable.IImmutableSet<T>
```

Represents an immutable sorted set implementation.

Parameters:

- `T`: The type of elements in the set.

#### Remarks

Create a new immutable sorted set that is prepopulated with items by using the `ImmutableSortedSet.CreateRange` method. When you manipulate an immutable set with methods such as `ImmutableSortedSet<T>.Add`, `ImmutableSortedSet<T>.Reverse` or `ImmutableSortedSet<T>.Remove`, a copy of the original sorted set is made, manipulations applied and a new immutable sorted set is returned.

If you need to perform multiple operations on an immutable collection, to increase efficiency you can copy the `ImmutableSortedSet<T>` to a `Builder`, using the `ImmutableSortedSet<T>.ToBuilder` method, manipulate the set and make it immutable again using the `Builder.ToImmutable` method. This will not change the original immutable sorted set.

## ImmutableSortedSet<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements in the immutable sorted set.

Returns: The number of elements in the immutable sorted set.

To be added.

## ImmutableSortedSet<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether this immutable sorted set is empty.

Returns: `true` if this set is empty; otherwise, `false`.

To be added.

## ImmutableSortedSet<T>.Item property

```csharp
public T this[int index] { get; }
```

Gets the element of the immutable sorted set at the given index.

Parameters:

- `index`: The index of the element to retrieve from the sorted set.

Returns: The element at the given index.

To be added.

## ImmutableSortedSet<T>.KeyComparer property

```csharp
public System.Collections.Generic.IComparer<T> KeyComparer { get; }
```

Gets the comparer used to sort keys in the immutable sorted set.

Returns: The comparer used to sort keys.

To be added.

## ImmutableSortedSet<T>.Max property

```csharp
public T? Max { get; }
```

Gets the maximum value in the immutable sorted set, as defined by the comparer.

Returns: The maximum value in the set.

To be added.

## ImmutableSortedSet<T>.Min property

```csharp
public T? Min { get; }
```

Gets the minimum value in the immutable sorted set, as defined by the comparer.

Returns: The minimum value in the set.

To be added.

## ImmutableSortedSet<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Returns true, since immutable collections are always read-only. See the `ICollection<T>` interface.

Returns: A boolean value indicating whether the collection is read-only.

To be added.

## ImmutableSortedSet<T>.System.Collections.Generic.IList<T>.Item property

```csharp
T System.Collections.Generic.IList<T>.Item[int index] { get; set; }
```

See the `IList<T>` interface.

Parameters:

- `index`: The zero-based index of the item to access.

Returns: The element stored at the specified index.

To be added.

## ImmutableSortedSet<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Returns true, since immutable collections are always thread-safe. See the `ICollection` interface.

Returns: A boolean value indicating whether the collection is thread-safe.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `ICollection` interface.

## ImmutableSortedSet<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

See `ICollection`.

Returns: Object used for synchronizing access to the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `ICollection` interface.

## ImmutableSortedSet<T>.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value that indicates whether the `IList` has a fixed size.

Returns: `true` if the `IList` has a fixed size; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IList` interface.

## ImmutableSortedSet<T>.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value that indicates whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `IList` interface.

## ImmutableSortedSet<T>.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the `Object` at the specified index.

Parameters:

- `index`: The index.

Returns: The `Object`.

To be added.

## ImmutableSortedSet<T>.Add(T) method

```csharp
public System.Collections.Immutable.ImmutableSortedSet<T> Add (T value);
```

Adds the specified value to this immutable sorted set.

Parameters:

- `value`: The value to add.

Returns: A new set with the element added, or this set if the element is already in this set.

To be added.

## ImmutableSortedSet<T>.Clear() method

```csharp
public System.Collections.Immutable.ImmutableSortedSet<T> Clear ();
```

Removes all elements from the immutable sorted set.

Returns: An empty set with the elements removed.

To be added.

## ImmutableSortedSet<T>.Contains(T) method

```csharp
public bool Contains (T value);
```

Determines whether this immutable sorted set contains the specified value.

Parameters:

- `value`: The value to check for.

Returns: `true` if the set contains the specified value; otherwise, `false`.

To be added.

## ImmutableSortedSet<T>.Except(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.ImmutableSortedSet<T> Except (System.Collections.Generic.IEnumerable<T> other);
```

Removes a specified set of items from this immutable sorted set.

Parameters:

- `other`: The items to remove from this set.

Returns: A new set with the items removed; or the original set if none of the items were in the set.

To be added.

## ImmutableSortedSet<T>.GetEnumerator() method

```csharp
public System.Collections.Immutable.ImmutableSortedSet<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the immutable sorted set.

Returns: An enumerator that can be used to iterate through the set.

#### Remarks

> **Caution:**
>  When you  use this enumerator as a value type (that is, when it isn't boxed), do not copy it by assigning it to a second variable or by passing it to another method. When this enumerator is disposed of, it returns a mutable reference type stack to a resource pool, and if the value type enumerator is copied (which can easily happen unintentionally if you pass the value around), there is a risk that a stack that has already been returned to the resource pool may still be in use by one of the enumerator copies, leading to data corruption and exceptions.

## ImmutableSortedSet<T>.IndexOf(T) method

```csharp
public int IndexOf (T item);
```

Gets the position within this immutable sorted set that the specified value appears in.

Parameters:

- `item`: The value whose position is being sought.

Returns: The index of the specified `item` in the sorted set, if `item` is found. If `item` is not found and is less than one or more elements in this set, this method returns a negative number that is the bitwise complement of the index of the first element that is larger than value. If `item` is not found and is greater than any of the elements in the set, this method returns a negative number that is the bitwise complement of the index of the last element plus 1.

To be added.

## ImmutableSortedSet<T>.Intersect(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.ImmutableSortedSet<T> Intersect (System.Collections.Generic.IEnumerable<T> other);
```

Creates an immutable sorted set that contains elements that exist both in this set and in the specified set.

Parameters:

- `other`: The set to intersect with this one.

Returns: A new immutable sorted set that contains any elements that exist in both sets.

To be added.

## ImmutableSortedSet<T>.IsProperSubsetOf(IEnumerable<T>) method

```csharp
public bool IsProperSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable sorted set is a proper (strict) subset of the specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper subset of `other`; otherwise, `false`.

#### Remarks
An empty set is a subset of any other collection. Therefore, this method returns `true` if the current set is empty, unless the `other` collection is also empty.

## ImmutableSortedSet<T>.IsProperSupersetOf(IEnumerable<T>) method

```csharp
public bool IsProperSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable sorted set is a proper superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper superset of `other`; otherwise, `false`.

#### Remarks

An empty set is a subset of any other collection. Therefore, this method returns `true` if the collection represented by the `other` parameter is empty, unless the current set is also empty.

## ImmutableSortedSet<T>.IsSubsetOf(IEnumerable<T>) method

```csharp
public bool IsSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable sorted set is a subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a subset of `other`; otherwise, `false`.

#### Remarks

An empty set is a subset of any other set, including another empty set. Therefore, this method returns `true` if the current set is empty, even if the `other` collection is also empty.

## ImmutableSortedSet<T>.IsSupersetOf(IEnumerable<T>) method

```csharp
public bool IsSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable sorted set is a superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a superset of `other`; otherwise, `false`.

#### Remarks

All collections, including empty sets, are supersets of an empty set. Therefore, this method returns `true` if the collection represented by the `other` parameter is empty, even if the current sorted set is empty.

## ImmutableSortedSet<T>.ItemRef(Int32) method

```csharp
public ref readonly T ItemRef (int index);
```

Gets a read-only reference of the element of the set at the given `index`.

Parameters:

- `index`: The 0-based index of the element in the set to return.

Returns: A read-only reference of the element at the given position.

To be added.

## ImmutableSortedSet<T>.Overlaps(IEnumerable<T>) method

```csharp
public bool Overlaps (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable sorted set and a specified collection share common elements.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set and `other` share at least one common element; otherwise, `false`.

To be added.

## ImmutableSortedSet<T>.Remove(T) method

```csharp
public System.Collections.Immutable.ImmutableSortedSet<T> Remove (T value);
```

Removes the specified value from this immutable sorted set.

Parameters:

- `value`: The element to remove.

Returns: A new immutable sorted set with the element removed, or this set if the element was not found in the set.

To be added.

## ImmutableSortedSet<T>.Reverse() method

```csharp
public System.Collections.Generic.IEnumerable<T> Reverse ();
```

Returns an `IEnumerable<T>` that iterates over this immutable sorted set in reverse order.

Returns: An enumerator that iterates over the immutable sorted set in reverse order.

To be added.

## ImmutableSortedSet<T>.SetEquals(IEnumerable<T>) method

```csharp
public bool SetEquals (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current immutable sorted set and the specified collection contain the same elements.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the sets are equal; otherwise, `false`.

To be added.

## ImmutableSortedSet<T>.SymmetricExcept(IEnumerable<T>) method

```csharp
public System.Collections.Immutable.ImmutableSortedSet<T> SymmetricExcept (System.Collections.Generic.IEnumerable<T> other);
```

Creates an immutable sorted set that contains elements that exist either in this set or in a given sequence, but not both.

Parameters:

- `other`: The other sequence of items.

Returns: The new immutable sorted set.

To be added.

## ImmutableSortedSet<T>.System.Collections.Generic.ICollection<T>.Add(T) method

```csharp
void ICollection<T>.Add (T item);
```

Adds the specified value to the collection.

Parameters:

- `item`: The value to add.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `ICollection<T>` interface.

## ImmutableSortedSet<T>.System.Collections.Generic.ICollection<T>.Clear() method

```csharp
void ICollection<T>.Clear ();
```

Removes all the items from the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ImmutableSortedSet<T>` instance is cast to an `ICollection<T>` interface.
