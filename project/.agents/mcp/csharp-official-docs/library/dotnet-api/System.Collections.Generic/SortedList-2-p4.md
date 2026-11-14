---
title: "SortedList<TKey,TValue> class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedList`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedList<TKey,TValue> class (part 4 of 5)

## SortedList<TKey,TValue>.ContainsValue(TValue) method

```csharp
public bool ContainsValue (TValue value);
```

Determines whether the `SortedList<T1,T2>` contains a specific value.

Parameters:

- `value`: The value to locate in the `SortedList<T1,T2>`. The value can be `null` for reference types.

Returns: `true` if the `SortedList<T1,T2>` contains an element with the specified value; otherwise, `false`.

#### Remarks
This method determines equality using the default comparer `Comparer<T>.Default` for the value type `TValue`.  `Comparer<T>.Default` checks whether the value type `TValue` implements `IComparable<T>` and uses that implementation, if available.  If not, `Comparer<T>.Default` checks whether the value type `TValue` implements `IComparable`.  If the value type `TValue` does not implement either interface, this method uses `Object.Equals`.

This method performs a linear search; therefore, the average execution time is proportional to `SortedList<T1,T2>.Count`. That is, this method is an O(`n`) operation, where `n` is `SortedList<T1,T2>.Count`.

## SortedList<TKey,TValue>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>> GetEnumerator ();
```

Returns an enumerator that iterates through the `SortedList<T1,T2>`.

Returns: An `IEnumerator<T>` of type `KeyValuePair<T1,T2>` for the `SortedList<T1,T2>`.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

The dictionary is maintained in a sorted order using an internal tree. Every new element is positioned at the correct sort position, and the tree is adjusted to maintain the sort order whenever an element is removed. While enumerating, the sort order is maintained.

Initially, the enumerator is positioned before the first element in the collection. At this position, `IEnumerator<T>.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator<T>.Current`.

`IEnumerator<T>.Current` returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IEnumerator<T>.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator<T>.Current` is undefined. You cannot set `IEnumerator<T>.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in `Generic` are not synchronized.

This method is an O(1) operation.

## SortedList<TKey,TValue>.GetKeyAtIndex(Int32) method

```csharp
public TKey <example-value> (int index);
```

Gets the key <example-value> to the specified index.

Parameters:

- `index`: The zero-based index of the key <example-value> the entire `SortedList<T1,T2>`.

Returns: The key <example-value> to the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: The specified index is out of range.

To be added.

## SortedList<TKey,TValue>.GetValueAtIndex(Int32) method

```csharp
public TValue GetValueAtIndex (int index);
```

Gets the value corresponding to the specified index.

Parameters:

- `index`: The zero-based index of the value within the entire `SortedList<T1,T2>`.

Returns: The value corresponding to the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: The specified index was out of range.

To be added.

## SortedList<TKey,TValue>.IndexOfKey(TKey) method

```csharp
public int IndexOfKey (TKey key);
```

Searches for the specified key and returns the zero-based index within the entire `SortedList<T1,T2>`.

Parameters:

- `key`: The key to locate in the `SortedList<T1,T2>`.

Returns: The zero-based index of `key` within the entire `SortedList<T1,T2>`, if found; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method performs a binary search; therefore, this method is an O(log `n`) operation, where `n` is `SortedList<T1,T2>.Count`.

## SortedList<TKey,TValue>.IndexOfValue(TValue) method

```csharp
public int IndexOfValue (TValue value);
```

Searches for the specified value and returns the zero-based index of the first occurrence within the entire `SortedList<T1,T2>`.

Parameters:

- `value`: The value to locate in the `SortedList<T1,T2>`.  The value can be `null` for reference types.

Returns: The zero-based index of the first occurrence of `value` within the entire `SortedList<T1,T2>`, if found; otherwise, -1.

#### Remarks
This method determines equality using the default comparer `Comparer<T>.Default` for the value type `TValue`.  `Comparer<T>.Default` checks whether the value type `TValue` implements `IComparable<T>` and uses that implementation, if available.  If not, `Comparer<T>.Default` checks whether the value type `TValue` implements `IComparable`.  If the value type `TValue` does not implement either interface, this method uses `Object.Equals`.

This method performs a linear search; therefore, the average execution time is proportional to `SortedList<T1,T2>.Count`. That is, this method is an O(`n`) operation, where `n` is `SortedList<T1,T2>.Count`.

## SortedList<TKey,TValue>.Remove(TKey) method

```csharp
public bool Remove (TKey key);
```

Removes the element with the specified key from the `SortedList<T1,T2>`.

Parameters:

- `key`: The key of the element to remove.

Returns: `true` if the element is successfully removed; otherwise, `false`.  This method also returns `false` if `key` was not found in the original `SortedList<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method performs a binary search; however, the elements are moved up to fill in the open spot, so this method is an O(`n`) operation, where `n` is `SortedList<T1,T2>.Count`.

#### Examples
The following code example shows how to remove a key/value pair from the sorted list using the `SortedList<T1,T2>.Remove` method.

This code example is part of a larger example provided for the `SortedList<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._

## SortedList<TKey,TValue>.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the element at the specified index of the `SortedList<T1,T2>`.

Parameters:

- `index`: The zero-based index of the element to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `SortedList<T1,T2>.Count`.

#### Remarks
The elements are moved up to fill in the open spot, so this method is an O(`n`) operation, where `n` is `SortedList<T1,T2>.Count`.

## SortedList<TKey,TValue>.SetValueAtIndex(Int32, TValue) method

```csharp
public void SetValueAtIndex (int index, TValue value);
```

Updates the value corresponding to the specified index.

Parameters:

- `index`: The zero-based index of the value within the entire `SortedList<T1,T2>`.
- `value`: The value with which to replace the entry at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: The specified index was out of range.

To be added.

## SortedList<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Add(KeyValuePair<TKey,TValue>) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.Add (System.Collections.Generic.KeyValuePair<TKey,TValue> keyValuePair);
```

Adds a key/value pair to the `ICollection<T>`.

Parameters:

- `keyValuePair`: The `KeyValuePair<T1,T2>` to add to the `ICollection<T>`.

To be added.

## SortedList<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Contains(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Contains (System.Collections.Generic.KeyValuePair<TKey,TValue> keyValuePair);
```

Determines whether the `ICollection<T>` contains a specific element.

Parameters:

- `keyValuePair`: The `KeyValuePair<T1,T2>` to locate in the `ICollection<T>`.

Returns: `true` if `keyValuePair` is found in the `ICollection<T>`; otherwise, `false`.

To be added.

## SortedList<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.CopyTo(KeyValuePair<TKey,TValue>[], Int32) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.CopyTo (System.Collections.Generic.KeyValuePair<TKey,TValue>[] array, int arrayIndex);
```

Copies the elements of the `ICollection<T>` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection<T>`. The `Array` must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than zero.
- `ArgumentException`: The number of elements in the source `ICollection<T>` is greater than the available space from `arrayIndex` to the end of the destination `array`.

To be added.

## SortedList<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Remove(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Remove (System.Collections.Generic.KeyValuePair<TKey,TValue> keyValuePair);
```

Removes the first occurrence of a specific key/value pair from the `ICollection<T>`.

Parameters:

- `keyValuePair`: The `KeyValuePair<T1,T2>` to remove from the `ICollection<T>`.

Returns: `true` if `keyValuePair` was successfully removed from the `ICollection<T>`; otherwise, `false`. This method also returns `false` if `keyValuePair` was not found in the original `ICollection<T>`.

To be added.

## SortedList<TKey,TValue>.System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>> IEnumerable<KeyValuePair<TKey,TValue>>.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator<T>` that can be used to iterate through the collection.

To be added.

## SortedList<TKey,TValue>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

`array` does not have zero-based indexing.

-or-

The number of elements in the source `ICollection` is greater than the available space from `arrayIndex` to the end of the destination `array`.

-or-

The type of the source `ICollection` cannot be cast automatically to the type of the destination `array`.

#### Remarks

> **Note:**
>  If the type of the source `ICollection` cannot be cast automatically to the type of the destination `array`, the non-generic implementations of `ICollection.CopyTo` throw `InvalidCastException`, whereas the generic implementations throw `ArgumentException`.

This method is an O(`n`) operation, where `n` is `SortedList<T1,T2>.Count`.
