---
title: "SortedDictionary<TKey,TValue> class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedDictionary<TKey,TValue> class (part 3 of 4)

## SortedDictionary<TKey,TValue>.System.Collections.IDictionary.Values property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Values { get; }
```

Gets an `ICollection` containing the values in the `IDictionary`.

Returns: An `ICollection` containing the values in the `IDictionary`.

#### Remarks
The values in the returned `ICollection` are sorted according to the `Comparer` property, and are guaranteed to be in the same order as the corresponding keys in the `ICollection` returned by the `Keys` property.

Getting the value of this property is an O(1) operation.

#### Examples
The following code example shows how to use the `System%23Collections%23IDictionary%23Values` property of the `IDictionary` interface with a `SortedDictionary<T1,T2>`, to list the values in the dictionary. The example also shows how to enumerate the key/value pairs in the dictionary; note that the enumerator for the `IDictionary` interface returns `DictionaryEntry` objects rather than `KeyValuePair<T1,T2>` objects.

The code example is part of a larger example, including output, provided for the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Add` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

## SortedDictionary<TKey,TValue>.Values property

```csharp
public System.Collections.Generic.SortedDictionary<TKey,TValue>.ValueCollection Values { get; }
```

Gets a collection containing the values in the `SortedDictionary<T1,T2>`.

Returns: A `ValueCollection` containing the values in the `SortedDictionary<T1,T2>`.

#### Remarks
The values in the `ValueCollection` are sorted according to the `Comparer` property, and are in the same order as the associated keys in the `KeyCollection` returned by the `Keys` property.

The returned `ValueCollection` is not a static copy; instead, the `ValueCollection` refers back to the values in the original `SortedDictionary<T1,T2>`. Therefore, changes to the `SortedDictionary<T1,T2>` continue to be reflected in the `ValueCollection`.

Getting the value of this property is an O(1) operation.

#### Examples
This code example shows how to enumerate the values in the dictionary using the `Values` property, and how to enumerate the keys and values in the dictionary.

This code example is part of a larger example provided for the `SortedDictionary<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._

## SortedDictionary<TKey,TValue>.Add(TKey, TValue) method

```csharp
public void Add (TKey key, TValue value);
```

Adds an element with the specified key and value into the `SortedDictionary<T1,T2>`.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add. The value can be `null` for reference types.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `SortedDictionary<T1,T2>`.

#### Remarks
You can also use the `SortedDictionary<T1,T2>.Item` property to add new elements by setting the value of a key that does not exist in the `SortedDictionary<T1,T2>`; for example, `myCollection["myNonexistentKey"] = myValue` (in Visual Basic, `myCollection("myNonexistantKey") = myValue`). However, if the specified key <example-value> exists in the `SortedDictionary<T1,T2>`, setting the `SortedDictionary<T1,T2>.Item` property overwrites the old value. In contrast, the `SortedDictionary<T1,T2>.Add` method throws an exception if an element with the specified key <example-value> exists.

A key <example-value> be `null`, but a value can be, if the value type `TValue` is a reference type.

This method is an O(log `n`) operation, where `n` is `SortedDictionary<T1,T2>.Count`.

#### Examples
The following code example creates an empty `SortedDictionary<T1,T2>` of strings with string keys and uses the `SortedDictionary<T1,T2>.Add` method to add some elements. The example demonstrates that the `SortedDictionary<T1,T2>.Add` method throws an `ArgumentException` when attempting to add a duplicate key.

This code example is part of a larger example provided for the `SortedDictionary<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._

## SortedDictionary<TKey,TValue>.Clear() method

```csharp
public void Clear ();
```

Removes all elements from the `SortedDictionary<T1,T2>`.

#### Remarks
The `Count` property is set to 0, and references to other objects from elements of the collection are also released.

This method is an O(1) operation, since the root of the internal data structures is simply released for garbage collection.

## SortedDictionary<TKey,TValue>.ContainsKey(TKey) method

```csharp
public bool ContainsKey (TKey key);
```

Determines whether the `SortedDictionary<T1,T2>` contains an element with the specified key.

Parameters:

- `key`: The key to locate in the `SortedDictionary<T1,T2>`.

Returns: `true` if the `SortedDictionary<T1,T2>` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method is an O(log `n`) operation.

#### Examples
The following code example shows how to use the `SortedDictionary<T1,T2>.ContainsKey` method to test whether a key <example-value> prior to calling the `SortedDictionary<T1,T2>.Add` method. It also shows how to use the `SortedDictionary<T1,T2>.TryGetValue` method to retrieve values, which is an efficient way to retrieve values when a program frequently tries keys that are not in the dictionary. Finally, it shows the least efficient way to test whether keys exist, by using the `SortedDictionary<T1,T2>.Item` property (the indexer in C#).

This code example is part of a larger example provided for the `SortedDictionary<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._

## SortedDictionary<TKey,TValue>.ContainsValue(TValue) method

```csharp
public bool ContainsValue (TValue value);
```

Determines whether the `SortedDictionary<T1,T2>` contains an element with the specified value.

Parameters:

- `value`: The value to locate in the `SortedDictionary<T1,T2>`. The value can be `null` for reference types.

Returns: `true` if the `SortedDictionary<T1,T2>` contains an element with the specified value; otherwise, `false`.

#### Remarks
This method determines equality using the default equality comparer `EqualityComparer<T>.Default` for the value type `TValue`.

This method performs a linear search; therefore, the average execution time is proportional to the `Count` property. That is, this method is an O(`n`) operation, where `n` is `SortedDictionary<T1,T2>.Count`.

## SortedDictionary<TKey,TValue>.CopyTo(KeyValuePair<TKey,TValue>[], Int32) method

```csharp
public void CopyTo (System.Collections.Generic.KeyValuePair<TKey,TValue>[] array, int index);
```

Copies the elements of the `SortedDictionary<T1,T2>` to the specified array of `KeyValuePair<T1,T2>` structures, starting at the specified index.

Parameters:

- `array`: The one-dimensional array of `KeyValuePair<T1,T2>` structures that is the destination of the elements copied from the current `SortedDictionary<T1,T2>` The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0.
- `ArgumentException`: The number of elements in the source `SortedDictionary<T1,T2>` is greater than the available space from `index` to the end of the destination `array`.

#### Remarks

> **Note:**
>  If the type of the source `SortedDictionary<T1,T2>` cannot be cast automatically to the type of the destination `array`, the nongeneric implementations of `ICollection.CopyTo` throw `InvalidCastException`, whereas the generic implementations throw `ArgumentException`.

This method is an O(`n`) operation, where `n` is `SortedDictionary<T1,T2>.Count`.

## SortedDictionary<TKey,TValue>.GetEnumerator() method

```csharp
public System.Collections.Generic.SortedDictionary<TKey,TValue>.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `SortedDictionary<T1,T2>`.

Returns: A `Enumerator` for the `SortedDictionary<T1,T2>`.

#### Remarks
For purposes of enumeration, each item is a `KeyValuePair<T1,T2>` structure representing a value and its key.

The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

The dictionary is maintained in a sorted order using an internal tree. Every new element is positioned at the correct sort position, and the tree is adjusted to maintain the sort order whenever an element is removed. While enumerating, the sort order is maintained.

Initially, the enumerator is positioned before the first element in the collection. At this position, the `Current` property is undefined. Therefore, you must call the `Enumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `Enumerator.Current`.

The `Current` property returns the same element until the `Enumerator.MoveNext` method is called. `Enumerator.MoveNext` sets `Enumerator.Current` to the next element.

If `Enumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `Enumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `Enumerator.MoveNext` also return `false`. If the last call to `Enumerator.MoveNext` returned `false`, `Enumerator.Current` is undefined. You cannot set `Enumerator.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

This method is an O(log n) operation, where n is count.

## SortedDictionary<TKey,TValue>.Remove(TKey) method

```csharp
public bool Remove (TKey key);
```

Removes the element with the specified key from the `SortedDictionary<T1,T2>`.

Parameters:

- `key`: The key of the element to remove.

Returns: `true` if the element is successfully removed; otherwise, `false`.  This method also returns `false` if `key` is not found in the `SortedDictionary<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
If the `SortedDictionary<T1,T2>` does not contain an element with the specified key, the `SortedDictionary<T1,T2>` remains unchanged. No exception is thrown.

This method is an O(log `n`) operation.

#### Examples
The following code example shows how to remove a key/value pair from the dictionary using the `SortedDictionary<T1,T2>.Remove` method.

This code example is part of a larger example provided for the `SortedDictionary<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._

## SortedDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Add(KeyValuePair<TKey,TValue>) method

```csharp
void ICollection<KeyValuePair<TKey,TValue>>.Add (System.Collections.Generic.KeyValuePair<TKey,TValue> keyValuePair);
```

Adds an item to the `ICollection<T>`.

Parameters:

- `keyValuePair`: The `KeyValuePair<T1,T2>` structure to add to the `ICollection<T>`.

Exceptions:

- `ArgumentNullException`: `keyValuePair` is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `SortedDictionary<T1,T2>`.

To be added.

## SortedDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Contains(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Contains (System.Collections.Generic.KeyValuePair<TKey,TValue> keyValuePair);
```

Determines whether the `ICollection<T>` contains a specific key and value.

Parameters:

- `keyValuePair`: The `KeyValuePair<T1,T2>` structure to locate in the `ICollection<T>`.

Returns: `true` if `keyValuePair` is found in the `ICollection<T>`; otherwise, `false`.

To be added.

## SortedDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.Remove(KeyValuePair<TKey,TValue>) method

```csharp
bool ICollection<KeyValuePair<TKey,TValue>>.Remove (System.Collections.Generic.KeyValuePair<TKey,TValue> keyValuePair);
```

Removes the first occurrence of the specified element from the `ICollection<T>`.

Parameters:

- `keyValuePair`: The `KeyValuePair<T1,T2>` structure to remove from the `ICollection<T>`.

Returns: `true` if `keyValuePair` was successfully removed from the `ICollection<T>`; otherwise, `false`. This method also returns `false` if `keyValuePair` was not found in the `ICollection<T>`.

To be added.
