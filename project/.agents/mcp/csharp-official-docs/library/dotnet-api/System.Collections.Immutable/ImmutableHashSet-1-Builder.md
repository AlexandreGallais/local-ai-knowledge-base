---
title: "ImmutableHashSet<T>+Builder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableHashSet`1+Builder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableHashSet<T>+Builder class

Namespace: `System.Collections.Immutable`

```csharp
public sealed class ImmutableHashSet<T>.Builder : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.ISet<T>
```

Represents a hash set that mutates with little or no memory allocations and that can produce or build on immutable hash set instances efficiently.

#### Remarks
Although `ImmutableHashSet<T>.Union` and other methods already provide fast bulk change operations on a collection, the `Builder` class allows multiple combinations of changes to be made to a set with equal efficiency.

## ImmutableHashSet<T>+Builder.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the immutable hash set.

Returns: The number of elements contained in the immutable hash set.

To be added.

## ImmutableHashSet<T>+Builder.KeyComparer property

```csharp
public System.Collections.Generic.IEqualityComparer<T> KeyComparer { get; set; }
```

Gets or sets the key comparer.

Returns: The key comparer.

To be added.

## ImmutableHashSet<T>+Builder.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

To be added.

## ImmutableHashSet<T>+Builder.Add(T) method

```csharp
public bool Add (T item);
```

Adds the specified item to the immutable hash set.

Parameters:

- `item`: The item to add.

Returns: `true` if the item did not already belong to the collection; otherwise, `false`.

To be added.

## ImmutableHashSet<T>+Builder.Clear() method

```csharp
public void Clear ();
```

Removes all items from the immutable hash set.

Exceptions:

- `NotSupportedException`: The hash set is read-only.

To be added.

## ImmutableHashSet<T>+Builder.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether the immutable hash set contains a specific value.

Parameters:

- `item`: The object to locate in the hash set.

Returns: `true` if `item` is found in the hash set ; otherwise, `false`.

To be added.

## ImmutableHashSet<T>+Builder.ExceptWith(IEnumerable<T>) method

```csharp
public void ExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Removes all elements in the specified collection from the current hash set.

Parameters:

- `other`: The collection of items to remove from the set.

To be added.

## ImmutableHashSet<T>+Builder.GetEnumerator() method

```csharp
public System.Collections.Immutable.ImmutableHashSet<T>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the immutable hash set.

Returns: An enumerator that can be used to iterate through the set.

To be added.

## ImmutableHashSet<T>+Builder.IntersectWith(IEnumerable<T>) method

```csharp
public void IntersectWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains only elements that are also in a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

To be added.

## ImmutableHashSet<T>+Builder.IsProperSubsetOf(IEnumerable<T>) method

```csharp
public bool IsProperSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a proper (strict) subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper subset of `other`; otherwise, `false`.

To be added.

## ImmutableHashSet<T>+Builder.IsProperSupersetOf(IEnumerable<T>) method

```csharp
public bool IsProperSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a proper (strict) superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper superset of `other`; otherwise, `false`.

To be added.

## ImmutableHashSet<T>+Builder.IsSubsetOf(IEnumerable<T>) method

```csharp
public bool IsSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a subset of `other`; otherwise, `false`.

To be added.

## ImmutableHashSet<T>+Builder.IsSupersetOf(IEnumerable<T>) method

```csharp
public bool IsSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a superset of `other`; otherwise, `false`.

To be added.

## ImmutableHashSet<T>+Builder.Overlaps(IEnumerable<T>) method

```csharp
public bool Overlaps (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set overlaps with the specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set and `other` share at least one common element; otherwise, `false`.

To be added.

## ImmutableHashSet<T>+Builder.Remove(T) method

```csharp
public bool Remove (T item);
```

Removes the first occurrence of a specific object from the immutable hash set.

Parameters:

- `item`: The object to remove from the set.

Returns: `true` if `item` was successfully removed from the set ; otherwise, `false`. This method also returns `false` if `item` is not found in the original set.

Exceptions:

- `NotSupportedException`: The set is read-only.

To be added.

## ImmutableHashSet<T>+Builder.SetEquals(IEnumerable<T>) method

```csharp
public bool SetEquals (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set and the specified collection contain the same elements.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is equal to `other`; otherwise, `false`.

To be added.

## ImmutableHashSet<T>+Builder.SymmetricExceptWith(IEnumerable<T>) method

```csharp
public void SymmetricExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains only elements that are present either in the current set or in the specified collection, but not both.

Parameters:

- `other`: The collection to compare to the current set.

To be added.

## ImmutableHashSet<T>+Builder.System.Collections.Generic.ICollection<T>.Add(T) method

```csharp
void ICollection<T>.Add (T item);
```

Adds an item to the hash set.

Parameters:

- `item`: The object to add to the set.

Exceptions:

- `NotSupportedException`: The set is read-only.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `ICollection<T>` interface.

## ImmutableHashSet<T>+Builder.System.Collections.Generic.ICollection<T>.CopyTo(T[], Int32) method

```csharp
void ICollection<T>.CopyTo (T[] array, int arrayIndex);
```

Copies the elements of the hash set to an array, starting at a particular array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the hash set. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `ICollection<T>` interface.

## ImmutableHashSet<T>+Builder.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IEnumerable<T>` interface.

## ImmutableHashSet<T>+Builder.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An enumerator that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IEnumerable` interface.

## ImmutableHashSet<T>+Builder.ToImmutable() method

```csharp
public System.Collections.Immutable.ImmutableHashSet<T> ToImmutable ();
```

Creates an immutable hash set based on the contents of this instance.

Returns: An immutable set.

#### Remarks
This method is an O(n) operation, and approaches O(1) time as the number of actual mutations to the set since the last call to this method approaches 0.

## ImmutableHashSet<T>+Builder.TryGetValue(T, T) method

```csharp
public bool TryGetValue (T equalValue, out T actualValue);
```

Searches the set for a given value and returns the equal value it finds, if any.

Parameters:

- `equalValue`: The value for which to search.
- `actualValue`: The value from the set that the search found, or the original value if the search yielded no match.

Returns: A value indicating whether the search was successful.

To be added.

## ImmutableHashSet<T>+Builder.UnionWith(IEnumerable<T>) method

```csharp
public void UnionWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains all elements that are present in both the current set and in the specified collection.

Parameters:

- `other`: The collection to compare to the current set.

To be added.
