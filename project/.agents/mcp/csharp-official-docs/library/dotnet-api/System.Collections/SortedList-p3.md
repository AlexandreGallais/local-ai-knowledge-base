---
title: "SortedList class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/SortedList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedList class (part 3 of 4)

## SortedList.ContainsKey(Object) method

```csharp
public virtual bool ContainsKey (object key);
```

Determines whether a `SortedList` object contains a specific key.

Parameters:

- `key`: The key to locate in the `SortedList` object.

Returns: `true` if the `SortedList` object contains an element with the specified `key`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `InvalidOperationException`: The comparer throws an exception.

#### Remarks
The elements of a `SortedList` object are sorted by the keys either according to a specific `IComparer` implementation specified when the `SortedList` is created or according to the `IComparable` implementation provided by the keys themselves.

This method behaves exactly as the `SortedList.Contains` method.

This method uses a binary search algorithm; therefore, this method is an `O(log n)` operation, where `n` is `SortedList.Count`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether `item` exists.

#### Examples
The following code example shows how to determine whether a `SortedList` object contains a specific element.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/Contains/source.cs._

## SortedList.ContainsValue(Object) method

```csharp
public virtual bool ContainsValue (object? value);
```

Determines whether a `SortedList` object contains a specific value.

Parameters:

- `value`: The value to locate in the `SortedList` object. The value can be `null`.

Returns: `true` if the `SortedList` object contains an element with the specified `value`; otherwise, `false`.

#### Remarks
The values of the elements of the `SortedList` object are compared to the specified value using the `Object.Equals` method.

This method performs a linear search; therefore, the average execution time is proportional to `SortedList.Count`. That is, this method is an `O(n)` operation, where `n` is `SortedList.Count`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether `item` exists.

#### Examples
The following code example shows how to determine whether a `SortedList` object contains a specific element.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/Contains/source.cs._

## SortedList.CopyTo(Array, Int32) method

```csharp
public virtual void CopyTo (Array array, int arrayIndex);
```

Copies `SortedList` elements to a one-dimensional `Array` object, starting at the specified index in the array.

Parameters:

- `array`: The one-dimensional `Array` object that is the destination of the `DictionaryEntry` objects copied from `SortedList`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `SortedList` object is greater than the available space from `arrayIndex` to the end of the destination `array`.
- `InvalidCastException`: The type of the source `SortedList` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The key/value pairs are copied to the `Array` object in the same order in which the enumerator iterates through the `SortedList` object.

To copy only the keys in the `SortedList`, use `SortedList.Keys.CopyTo`.

To copy only the values in the `SortedList`, use `SortedList.Values.CopyTo`.

This method is an `O(n)` operation, where `n` is `SortedList.Count`.

#### Examples
The following code example shows how to copy the values in a `SortedList` object into a one-dimensional `Array` object.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/CopyTo/source.cs._

## SortedList.GetByIndex(Int32) method

```csharp
public virtual object? GetByIndex (int index);
```

Gets the value at the specified index of a `SortedList` object.

Parameters:

- `index`: The zero-based index of the value to get.

Returns: The value at the specified index of the `SortedList` object.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes for the `SortedList` object.

#### Remarks
The index sequence is based on the sort sequence. When an element is added, it is inserted into `SortedList` in the correct sort order, and the indexing adjusts accordingly. When an element is removed, the indexing also adjusts accordingly. Therefore, the index of a specific key/value pair might change as elements are added or removed from the `SortedList` object.

This method is an `O(1)` operation.

#### Examples
The following code example shows how to get one or all the keys or values in a `SortedList` object.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/GetByIndex/source.cs._

## SortedList.GetEnumerator() method

```csharp
public virtual System.Collections.IDictionaryEnumerator GetEnumerator ();
```

Returns an `IDictionaryEnumerator` object that iterates through a `SortedList` object.

Returns: An `IDictionaryEnumerator` object for the `SortedList` object.

#### Remarks
The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an `O(1)` operation.

## SortedList.GetKey(Int32) method

```csharp
public virtual object GetKey (int index);
```

Gets the key at the specified index of a `SortedList` object.

Parameters:

- `index`: The zero-based index of the key to get.

Returns: The key at the specified index of the `SortedList` object.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes for the `SortedList` object.

#### Remarks
The index sequence is based on the sort sequence. When an element is added, it is inserted into `SortedList` in the correct sort order, and the indexing adjusts accordingly. When an element is removed, the indexing also adjusts accordingly. Therefore, the index of a specific key/value pair might change as elements are added or removed from the `SortedList` object.

This method is an `O(1)` operation.

#### Examples
The following code example shows how to get one or all the keys or values in a `SortedList` object.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/GetByIndex/source.cs._

## SortedList.GetKeyList() method

```csharp
public virtual System.Collections.IList GetKeyList ();
```

Gets the keys in a `SortedList` object.

Returns: An `IList` object containing the keys in the `SortedList` object.

#### Remarks
The returned `IList` object is a read-only view of the keys of the `SortedList` object. Modifications made to the underlying `SortedList` are immediately reflected in the `IList`.

The elements of the returned `IList` are sorted in the same order as the keys of the `SortedList`.

This method is similar to the `Keys` property, but returns an `IList` object instead of an `ICollection` object.

This method is an `O(1)` operation.

#### Examples
The following code example shows how to get one or all the keys or values in a `SortedList` object.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/GetByIndex/source.cs._

## SortedList.GetValueList() method

```csharp
public virtual System.Collections.IList GetValueList ();
```

Gets the values in a `SortedList` object.

Returns: An `IList` object containing the values in the `SortedList` object.

#### Remarks
The returned `IList` object is a read-only view of the values of the `SortedList` object. Modifications made to the underlying `SortedList` are immediately reflected in the `IList`.

The elements of the returned `IList` are sorted in the same order as the values of the `SortedList`.

This method is similar to the `Values` property, but returns an `IList` object instead of an `ICollection` object.

This method is an `O(1)` operation.

#### Examples
The following code example shows how to get one or all the keys or values in a `SortedList` object.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/GetByIndex/source.cs._

## SortedList.IndexOfKey(Object) method

```csharp
public virtual int IndexOfKey (object key);
```

Returns the zero-based index of the specified key in a `SortedList` object.

Parameters:

- `key`: The key to locate in the `SortedList` object.

Returns: The zero-based index of the `key` parameter, if `key` is found in the `SortedList` object; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `InvalidOperationException`: The comparer throws an exception.

#### Remarks
The elements of a `SortedList` object are sorted by the keys either according to a specific `IComparer` implementation specified when the `SortedList` is created, or according to the `IComparable` implementation provided by the keys themselves.

The index sequence is based on the sort sequence. When an element is added, it is inserted into `SortedList` in the correct sort order, and the indexing adjusts accordingly. When an element is removed, the indexing also adjusts accordingly. Therefore, the index of a specific key/value pair might change as elements are added or removed from the `SortedList`.

This method uses a binary search algorithm; therefore, this method is an `O(log n)` operation, where `n` is `SortedList.Count`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether `item` exists.

#### Examples
The following code example shows how to determine the index of a key or a value in a `SortedList` object.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/IndexOfKey/source.cs._

## SortedList.IndexOfValue(Object) method

```csharp
public virtual int IndexOfValue (object? value);
```

Returns the zero-based index of the first occurrence of the specified value in a `SortedList` object.

Parameters:

- `value`: The value to locate in the `SortedList` object. The value can be `null`.

Returns: The zero-based index of the first occurrence of the `value` parameter, if `value` is found in the `SortedList` object; otherwise, -1.

#### Remarks
The index sequence is based on the sort sequence. When an element is added, it is inserted into `SortedList` in the correct sort order, and the indexing adjusts accordingly. When an element is removed, the indexing also adjusts accordingly. Therefore, the index of a specific key/value pair might change as elements are added or removed from the `SortedList` object.

The values of the elements of the `SortedList` are compared to the specified value using the `Object.Equals` method.

This method uses a linear search; therefore, this method is an `O(n)` operation, where `n` is `SortedList.Count`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether `item` exists.

#### Examples
The following code example shows how to determine the index of a key or a value in a `SortedList` object.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/IndexOfKey/source.cs._

## SortedList.Remove(Object) method

```csharp
public virtual void Remove (object key);
```

Removes the element with the specified key from a `SortedList` object.

Parameters:

- `key`: The key of the element to remove.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `NotSupportedException`: The `SortedList` object is read-only.

-or-

The `SortedList` has a fixed size.

#### Remarks
If the `SortedList` object does not contain an element with the specified key, the `SortedList` remains unchanged. No exception is thrown.

In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method is an `O(n)` operation, where `n` is `SortedList.Count`.

#### Examples
The following code example shows how to remove elements from a `SortedList` object.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/Remove/source.cs._
