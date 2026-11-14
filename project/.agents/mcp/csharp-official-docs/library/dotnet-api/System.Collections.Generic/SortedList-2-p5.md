---
title: "SortedList<TKey,TValue> class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedList`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedList<TKey,TValue> class (part 5 of 5)

## SortedList<TKey,TValue>.System.Collections.IDictionary.Add(Object, Object) method

```csharp
void IDictionary.Add (object key, object value);
```

Adds an element with the provided key and value to the `IDictionary`.

Parameters:

- `key`: The `Object` to use as the key of the element to add.
- `value`: The `Object` to use as the value of the element to add.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: `key` is of a type that is not assignable to the key type `TKey` of the `IDictionary`.

-or-

`value` is of a type that is not assignable to the value type `TValue` of the `IDictionary`.

-or-

An element with the same key <example-value> exists in the `IDictionary`.

#### Remarks
You can also use the `IDictionary.Item` property to add new elements by setting the value of a key that does not exist in the dictionary; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the dictionary, setting the `IDictionary.Item` property overwrites the old value. In contrast, the `IDictionary.Add` method does not modify existing elements.

This method is an O(`n`) operation for unsorted data, where `n` is `SortedList<T1,T2>.Count`. It is an O(log `n`) operation if the new element is added at the end of the list. If insertion causes a resize, the operation is O(`n`).

#### Examples
The following code example shows how to access the `SortedList<T1,T2>` class through the `IDictionary` interface. The code example creates an empty `SortedList<T1,T2>` of strings with string keys and uses the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Add` method to add some elements. The example demonstrates that the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Add` method throws an `ArgumentException` when attempting to add a duplicate key, or when a key or value of the wrong data type is supplied.

The code example demonstrates the use of several other members of the `IDictionary` interface.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

## SortedList<TKey,TValue>.System.Collections.IDictionary.Contains(Object) method

```csharp
bool IDictionary.Contains (object key);
```

Determines whether the `IDictionary` contains an element with the specified key.

Parameters:

- `key`: The key to locate in the `IDictionary`.

Returns: `true` if the `IDictionary` contains an element with the key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method returns `false` if `key` is of a type that is not assignable to the key type `TKey` of the `SortedList<T1,T2>`.

This method is an O(log `n`) operation, where `n` is `SortedList<T1,T2>.Count`.

#### Examples
The following code example shows how to use the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Contains` method of the `IDictionary` interface with a `SortedList<T1,T2>`. The example demonstrates that the method returns `false` if a key of the wrong data type is supplied.

The code example is part of a larger example, including output, provided for the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Add` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

## SortedList<TKey,TValue>.System.Collections.IDictionary.GetEnumerator() method

```csharp
System.Collections.IDictionaryEnumerator IDictionary.GetEnumerator ();
```

Returns an `IDictionaryEnumerator` for the `IDictionary`.

Returns: An `IDictionaryEnumerator` for the `IDictionary`.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IDictionaryEnumerator.Entry` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IDictionaryEnumerator.Entry`.

`IDictionaryEnumerator.Entry` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IDictionaryEnumerator.Entry` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IDictionaryEnumerator.Entry` is undefined. To set `IDictionaryEnumerator.Entry` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in `Generic` are not synchronized.

This method is an O(1) operation.

#### Examples
The following code example shows how to enumerate the key/value pairs in the sorted list by using the `foreach` statement (`For Each` in Visual Basic), which hides the use of the enumerator. In particular, note that the enumerator for the `IDictionary` interface returns `DictionaryEntry` objects rather than `KeyValuePair<T1,T2>` objects.

The code example is part of a larger example, including output, provided for the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Add` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

## SortedList<TKey,TValue>.System.Collections.IDictionary.Remove(Object) method

```csharp
void IDictionary.Remove (object key);
```

Removes the element with the specified key from the `IDictionary`.

Parameters:

- `key`: The key of the element to remove.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method performs a binary search; however, the elements are moved up to fill in the open spot, so this method is an O(`n`) operation, where `n` is `SortedList<T1,T2>.Count`.

#### Examples
The following code example shows how to use the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Remove` of the `IDictionary` interface with a `SortedList<T1,T2>`.

The code example is part of a larger example, including output, provided for the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Add` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

## SortedList<TKey,TValue>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` that can be used to iterate through the collection.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in `Generic` are not synchronized.

This method is an O(1) operation.

## SortedList<TKey,TValue>.TrimExcess() method

```csharp
public void TrimExcess ();
```

Sets the capacity to the actual number of elements in the `SortedList<T1,T2>`, if that number is less than 90 percent of current capacity.

#### Remarks
This method can be used to minimize a collection's memory overhead if no new elements will be added to the collection. The cost of reallocating and copying a large `SortedList<T1,T2>` can be considerable, however, so the `SortedList<T1,T2>.TrimExcess` method does nothing if the list is at more than 90 percent of capacity. This avoids incurring a large reallocation cost for a relatively small gain.

This method is an O(`n`) operation, where `n` is `SortedList<T1,T2>.Count`.

To reset a `SortedList<T1,T2>` to its initial state, call the `SortedList<T1,T2>.Clear` method before calling `SortedList<T1,T2>.TrimExcess` method. Trimming an empty `SortedList<T1,T2>` sets the capacity of the `SortedList<T1,T2>` to the default capacity.

The capacity can also be set using the `Capacity` property.

## SortedList<TKey,TValue>.TryGetValue(TKey, TValue) method

```csharp
public bool TryGetValue (TKey key, out TValue value);
```

Gets the value associated with the specified key.

Parameters:

- `key`: The key whose value to get.
- `value`: When this method returns, the value associated with the specified key, if the key is found; otherwise, the default value for the type of the `value` parameter. This parameter is passed uninitialized.

Returns: `true` if the `SortedList<T1,T2>` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method combines the functionality of the `SortedList<T1,T2>.ContainsKey` method and the `SortedList<T1,T2>.Item` property.

If the key is not found, then the `value` parameter gets the appropriate default value for the value type `TValue`; for example, zero (0) for integer types, `false` for Boolean types, and `null` for reference types.

This method performs a binary search; therefore, this method is an O(log `n`) operation, where `n` is `SortedList<T1,T2>.Count`.

#### Examples
The example shows how to use the `SortedList<T1,T2>.TryGetValue` method as a more efficient way to retrieve values in a program that frequently tries keys that are not in the sorted list. For contrast, the example also shows how the `SortedList<T1,T2>.Item` property (the indexer in C#) throws exceptions when attempting to retrieve nonexistent keys.

This code example is part of a larger example provided for the `SortedList<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._
