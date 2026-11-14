---
title: "SortedList class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/SortedList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedList class (part 4 of 4)

## SortedList.RemoveAt(Int32) method

```csharp
public virtual void RemoveAt (int index);
```

Removes the element at the specified index of a `SortedList` object.

Parameters:

- `index`: The zero-based index of the element to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes for the `SortedList` object.
- `NotSupportedException`: The `SortedList` is read-only.

-or-

The `SortedList` has a fixed size.

#### Remarks
The index sequence is based on the sort sequence. When an element is added, it is inserted into `SortedList` in the correct sort order, and the indexing adjusts accordingly. When an element is removed, the indexing also adjusts accordingly. Therefore, the index of a specific key/value pair might change as elements are added or removed from the `SortedList` object.

In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method is an `O(n)` operation, where `n` is `SortedList.Count`.

#### Examples
The following code example shows how to remove elements from a `SortedList` object.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/Remove/source.cs._

## SortedList.SetByIndex(Int32, Object) method

```csharp
public virtual void SetByIndex (int index, object? value);
```

Replaces the value at a specific index in a `SortedList` object.

Parameters:

- `index`: The zero-based index at which to save `value`.
- `value`: The `Object` to save into the `SortedList` object. The value can be `null`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes for the `SortedList` object.

#### Remarks
The index sequence is based on the sort sequence. When an element is added, it is inserted into `SortedList` in the correct sort order, and the indexing adjusts accordingly. When an element is removed, the indexing also adjusts accordingly. Therefore, the index of a specific key/value pair might change as elements are added or removed from the `SortedList` object.

This method is an `O(1)` operation.

#### Examples
The following code example shows how to replace the value of an existing element in a `SortedList` object.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/SetByIndex/source.cs._

## SortedList.Synchronized(SortedList) method

```csharp
public static System.Collections.SortedList Synchronized (System.Collections.SortedList list);
```

Returns a synchronized (thread-safe) wrapper for a `SortedList` object.

Parameters:

- `list`: The `SortedList` object to synchronize.

Returns: A synchronized (thread-safe) wrapper for the `SortedList` object.

Exceptions:

- `ArgumentNullException`: `list` is `null`.

#### Remarks
To guarantee the thread safety of a `SortedList` object, all operations must be done through this wrapper only.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `SyncRoot` property during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/IsSynchronized/source2.cs._

This method is an `O(1)` operation.

The following code example shows how to synchronize a `SortedList` object, determine whether a `SortedList` is synchronized, and use a synchronized `SortedList`.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/IsSynchronized/source.cs._

## SortedList.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an `IEnumerator` that iterates through the `SortedList`.

Returns: An `IEnumerator` for the `SortedList`.

#### Remarks

The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position. At this position, calling `IEnumerator.Current` throws an exception. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, calling `IEnumerator.Current` throws an exception. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`. If the collection is modified between `IEnumerator.MoveNext` and `IEnumerator.Current`, `IEnumerator.Current` returns the element that it is set to, even if the enumerator is already invalidated.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

This method is an `O(1)` operation.

## SortedList.TrimToSize() method

```csharp
public virtual void TrimToSize ();
```

Sets the capacity to the actual number of elements in a `SortedList` object.

Exceptions:

- `NotSupportedException`: The `SortedList` object is read-only.

-or-

The `SortedList` has a fixed size.

#### Remarks
This method can be used to minimize a collection's memory overhead if no new elements will be added to the collection.

To reset a `SortedList` object to its initial state, call the `SortedList.Clear` method before calling `SortedList.TrimToSize`. Trimming an empty `SortedList` sets the capacity of the `SortedList` to the default capacity.

This method is an `O(n)` operation, where `n` is `SortedList.Count`.

#### Examples
The following code example shows how to trim the unused portions of a `SortedList` object and how to clear its values.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/Clear/source.cs._
