---
title: "SortedDictionary<TKey,TValue> class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedDictionary<TKey,TValue> class (part 4 of 4)

## SortedDictionary<TKey,TValue>.System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<TKey,TValue>> IEnumerable<KeyValuePair<TKey,TValue>>.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## SortedDictionary<TKey,TValue>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection<T>` to an array, starting at the specified array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the `ICollection<T>`. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0.
- `ArgumentException`: `array` is multidimensional.

-or-

`array` does not have zero-based indexing.

-or-

The number of elements in the source `ICollection<T>` is greater than the available space from `index` to the end of the destination `array`.

-or-

The type of the source `ICollection<T>` cannot be cast automatically to the type of the destination `array`.

#### Remarks

> **Note:**
>  If the type of the source `ICollection` cannot be cast automatically to the type of the destination `array`, the nongeneric implementations of `ICollection.CopyTo` throw an `InvalidCastException`, whereas the generic implementations throw an `ArgumentException`.

This method is an O(`n`) operation, where `n` is `SortedDictionary<T1,T2>.Count`.

## SortedDictionary<TKey,TValue>.System.Collections.IDictionary.Add(Object, Object) method

```csharp
void IDictionary.Add (object key, object value);
```

Adds an element with the provided key and value to the `IDictionary`.

Parameters:

- `key`: The object to use as the key of the element to add.
- `value`: The object to use as the value of the element to add.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: `key` is of a type that is not assignable to the key type `TKey` of the `IDictionary`.

-or-

`value` is of a type that is not assignable to the value type `TValue` of the `IDictionary`.

-or-

An element with the same key <example-value> exists in the `IDictionary`.

#### Remarks
You can also use the `IDictionary.Item` property to add new elements by setting the value of a key that does not exist in the dictionary; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the dictionary, setting the `IDictionary.Item` property overwrites the old value. In contrast, the `IDictionary.Add` method does not modify existing elements.

This method is an O(log `n`) operation, where `n` is `SortedDictionary<T1,T2>.Count`.

#### Examples
The following code example shows how to access the `SortedDictionary<T1,T2>` class through the `IDictionary` interface. The code example creates an empty `SortedDictionary<T1,T2>` of strings with string keys and uses the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Add` method to add some elements. The example demonstrates that the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Add` method throws an `ArgumentException` when attempting to add a duplicate key, or when a key or value of the wrong data type is supplied.

The code example demonstrates the use of several other members of the `IDictionary` interface.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

## SortedDictionary<TKey,TValue>.System.Collections.IDictionary.Contains(Object) method

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
This method returns `false` if `key` is of a type that is not assignable to the key type `TKey` of the `SortedDictionary<T1,T2>`.

This method is an O(log `n`) operation, where `n` is `SortedDictionary<T1,T2>.Count`.

#### Examples
The following code example shows how to use the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Contains` method of the `IDictionary` interface with a `SortedDictionary<T1,T2>`. The example demonstrates that the method returns `false` if a key of the wrong data type is supplied.

The code example is part of a larger example, including output, provided for the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Add` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

## SortedDictionary<TKey,TValue>.System.Collections.IDictionary.GetEnumerator() method

```csharp
System.Collections.IDictionaryEnumerator IDictionary.GetEnumerator ();
```

Returns an `IDictionaryEnumerator` for the `IDictionary`.

Returns: An `IDictionaryEnumerator` for the `IDictionary`.

#### Remarks
For purposes of enumeration, each item is a `DictionaryEntry` structure.

The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. The `IEnumerator.Reset` method also brings the enumerator back to this position.  At this position, `IDictionaryEnumerator.Entry` is undefined. Therefore, you must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IDictionaryEnumerator.Entry`.

The `Entry` property returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IDictionaryEnumerator.Entry` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IDictionaryEnumerator.Entry` is undefined. To set `IDictionaryEnumerator.Entry` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

This method is an O(log n) operation where n is a number of elements in a collection.

#### Examples
The following code example shows how to enumerate the key/value pairs in the dictionary by using the `foreach` statement (`For Each` in Visual Basic), which hides the use of the enumerator. In particular, note that the enumerator for the `IDictionary` interface returns `DictionaryEntry` objects rather than `KeyValuePair<T1,T2>` objects.

The code example is part of a larger example, including output, provided for the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Add` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

## SortedDictionary<TKey,TValue>.System.Collections.IDictionary.Remove(Object) method

```csharp
void IDictionary.Remove (object key);
```

Removes the element with the specified key from the `IDictionary`.

Parameters:

- `key`: The key of the element to remove.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method is an O(log `n`) operation.

#### Examples
The following code example shows how to use the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Remove` of the `IDictionary` interface with a `SortedDictionary<T1,T2>`.

The code example is part of a larger example, including output, provided for the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Add` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

## SortedDictionary<TKey,TValue>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An `IEnumerator` that can be used to iterate through the collection.

#### Remarks

The `foreach` statement of the C# language (`For Each` Visual Basic) hides the complexity of enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, the `Current` property is undefined. Therefore, you must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

The `Current` property returns the same element until the `IEnumerator.MoveNext` method is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. You cannot set `IEnumerator.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

This method is an O(log n) operation where n is a number of elements in a collection.

## SortedDictionary<TKey,TValue>.TryGetValue(TKey, TValue) method

```csharp
public bool TryGetValue (TKey key, out TValue value);
```

Gets the value associated with the specified key.

Parameters:

- `key`: The key of the value to get.
- `value`: When this method returns, the value associated with the specified key, if the key is found; otherwise, the default value for the type of the `value` parameter.

Returns: `true` if the `SortedDictionary<T1,T2>` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method combines the functionality of the `SortedDictionary<T1,T2>.ContainsKey` method and the `SortedDictionary<T1,T2>.Item` property.

If the key is not found, then the `value` parameter gets the appropriate default value for the value type `TValue`; for example, 0 (zero) for integer types, `false` for Boolean types, and `null` for reference types.

This method is an O(log `n`) operation.

#### Examples
The example shows how to use the `SortedDictionary<T1,T2>.TryGetValue` method as a more efficient way to retrieve values in a program that frequently tries keys that are not in the dictionary. For contrast, the example also shows how the `SortedDictionary<T1,T2>.Item` property (the indexer in C#) throws exceptions when attempting to retrieve nonexistent keys.

This code example is part of a larger example provided for the `SortedDictionary<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._
