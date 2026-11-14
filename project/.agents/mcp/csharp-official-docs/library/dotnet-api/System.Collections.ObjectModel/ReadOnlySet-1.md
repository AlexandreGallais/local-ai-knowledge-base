---
title: "ReadOnlySet<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/ReadOnlySet`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlySet<T> class

Namespace: `System.Collections.ObjectModel`

```csharp
public class ReadOnlySet<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlySet<T>, System.Collections.Generic.ISet<T>, System.Collections.ICollection
```

Represents a read-only, generic set of values.

Parameters:

- `T`: The type of values in the set.

To be added.

## ReadOnlySet<T>.ReadOnlySet(ISet<T>) constructor

```csharp
public ReadOnlySet (System.Collections.Generic.ISet<T> set);
```

Initializes a new instance of the `ReadOnlySet<T>` class that is a wrapper around the specified set.

Parameters:

- `set`: The set to wrap.

To be added.

## ReadOnlySet<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `ICollection<T>`.

Returns: The number of elements contained in the `ICollection<T>`.

To be added.

## ReadOnlySet<T>.Empty property

```csharp
public static System.Collections.ObjectModel.ReadOnlySet<T> Empty { get; }
```

Gets an empty `ReadOnlySet<T>`.

Returns: To be added.

To be added.

## ReadOnlySet<T>.Set property

```csharp
protected System.Collections.Generic.ISet<T> Set { get; }
```

Gets the set that is wrapped by this `ReadOnlySet<T>` object.

Returns: To be added.

To be added.

## ReadOnlySet<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

To be added.

## ReadOnlySet<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.ObjectModel.ReadOnlySet`1` instance is cast to an `System.Collections.ICollection` interface.

## ReadOnlySet<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.ObjectModel.ReadOnlySet`1` instance is cast to an `System.Collections.ICollection` interface.

## ReadOnlySet<T>.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether the `ICollection<T>` contains a specific value.

Parameters:

- `item`: The object to locate in the `ICollection<T>`.

Returns: `true` if `item` is found in the `ICollection<T>`; otherwise, `false`.

To be added.

## ReadOnlySet<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<T> GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## ReadOnlySet<T>.IsProperSubsetOf(IEnumerable<T>) method

```csharp
public bool IsProperSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a proper (strict) subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a proper subset of other; otherwise `false`.

To be added.

## ReadOnlySet<T>.IsProperSupersetOf(IEnumerable<T>) method

```csharp
public bool IsProperSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a proper (strict) superset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the collection is a proper superset of other; otherwise `false`.

To be added.

## ReadOnlySet<T>.IsSubsetOf(IEnumerable<T>) method

```csharp
public bool IsSubsetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a subset of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a subset of other; otherwise `false`.

To be added.

## ReadOnlySet<T>.IsSupersetOf(IEnumerable<T>) method

```csharp
public bool IsSupersetOf (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set is a super set of a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is a subset of other; otherwise `false`.

To be added.

## ReadOnlySet<T>.Overlaps(IEnumerable<T>) method

```csharp
public bool Overlaps (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set overlaps with the specified collection.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true`if the current set and other share at least one common element; otherwise, `false`.

To be added.

## ReadOnlySet<T>.SetEquals(IEnumerable<T>) method

```csharp
public bool SetEquals (System.Collections.Generic.IEnumerable<T> other);
```

Determines whether the current set and the specified collection contain the same elements.

Parameters:

- `other`: The collection to compare to the current set.

Returns: `true` if the current set is equal to other; otherwise, `false`.

To be added.

## ReadOnlySet<T>.System.Collections.Generic.ICollection<T>.Add(T) method

```csharp
void ICollection<T>.Add (T item);
```

Adds an item to the `ICollection<T>`.

Parameters:

- `item`: The object to add to the `ICollection<T>`.

To be added.

## ReadOnlySet<T>.System.Collections.Generic.ICollection<T>.Clear() method

```csharp
void ICollection<T>.Clear ();
```

Removes all items from the `ICollection<T>`.

To be added.

## ReadOnlySet<T>.System.Collections.Generic.ICollection<T>.CopyTo(T[], Int32) method

```csharp
void ICollection<T>.CopyTo (T[] array, int arrayIndex);
```

Copies the elements of the `ICollection<T>` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection<T>`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

To be added.

## ReadOnlySet<T>.System.Collections.Generic.ICollection<T>.Remove(T) method

```csharp
bool ICollection<T>.Remove (T item);
```

Removes the first occurrence of a specific object from the `ICollection<T>`.

Parameters:

- `item`: The object to remove from the `ICollection<T>`.

Returns: `true` if `item` was successfully removed from the `ICollection<T>`; otherwise, `false`. This method also returns `false` if `item` is not found in the original `ICollection<T>`.

To be added.

## ReadOnlySet<T>.System.Collections.Generic.ISet<T>.Add(T) method

```csharp
bool ISet<T>.Add (T item);
```

Adds an element to the current set and returns a value to indicate if the element was successfully added.

Parameters:

- `item`: The element to add to the set.

Returns: `true` if the element is added to the set; `false` if the element is already in the set.

To be added.

## ReadOnlySet<T>.System.Collections.Generic.ISet<T>.ExceptWith(IEnumerable<T>) method

```csharp
void ISet<T>.ExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Removes all elements in the specified collection from the current set.

Parameters:

- `other`: The collection of items to remove from the set.

To be added.

## ReadOnlySet<T>.System.Collections.Generic.ISet<T>.IntersectWith(IEnumerable<T>) method

```csharp
void ISet<T>.IntersectWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains only elements that are also in a specified collection.

Parameters:

- `other`: The collection to compare to the current set.

To be added.

## ReadOnlySet<T>.System.Collections.Generic.ISet<T>.SymmetricExceptWith(IEnumerable<T>) method

```csharp
void ISet<T>.SymmetricExceptWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains only elements that are present either in the current set or in the specified collection, but not both.

Parameters:

- `other`: The collection to compare to the current set.

To be added.

## ReadOnlySet<T>.System.Collections.Generic.ISet<T>.UnionWith(IEnumerable<T>) method

```csharp
void ISet<T>.UnionWith (System.Collections.Generic.IEnumerable<T> other);
```

Modifies the current set so that it contains all elements that are present in the current set, in the specified collection, or in both.

Parameters:

- `other`: The collection to compare to the current set.

To be added.

## ReadOnlySet<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

To be added.

## ReadOnlySet<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

This member is an explicit interface member implementation. It can be used only when the `System.Collections.ObjectModel.ReadOnlySet`1` instance is cast to an `System.Collections.IEnumerable` interface.
