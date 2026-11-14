---
title: "HybridDictionary class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/HybridDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HybridDictionary class (part 2 of 2)

## HybridDictionary.Add(Object, Object) method

```csharp
public void Add (object key, object? value);
```

Adds an entry with the specified key and value into the `HybridDictionary`.

Parameters:

- `key`: The key of the entry to add.
- `value`: The value of the entry to add. The value can be `null`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An entry with the same key <example-value> exists in the `HybridDictionary`.

#### Remarks
An object that has no correlation between its state and its hash code value should typically not be used as the key. For example, String objects are better than StringBuilder objects for use as keys.

A key <example-value> be `null`, but a value can.

You can also use the `HybridDictionary.Item` property to add new elements by setting the value of a key that does not exist in the `HybridDictionary`; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the `HybridDictionary`, setting the `HybridDictionary.Item` property overwrites the old value. In contrast, the `HybridDictionary.Add` method does not modify existing elements.

When the number of elements becomes greater than the optimal size for a `ListDictionary`, the elements are copied from the `ListDictionary` to a `Hashtable`. However, this only happens once. If the collection is already stored in a `Hashtable` and the number of elements falls below the optimal size for a `ListDictionary`, the collection remains in the `Hashtable`.

This method is an O(1) operation.

#### Examples
The following code example adds to and removes elements from a `HybridDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Add/hybriddictionary_addremove.cs._

## HybridDictionary.Clear() method

```csharp
public void Clear ();
```

Removes all entries from the `HybridDictionary`.

#### Remarks
`HybridDictionary.Count` is set to zero, and references to other objects from elements of the collection are also released.

If the collection is already stored in a `Hashtable`, the collection remains in the `Hashtable`.

This method is an O(`n`) operation, where `n` is `HybridDictionary.Count`.

#### Examples
The following code example adds to and removes elements from a `HybridDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Add/hybriddictionary_addremove.cs._

## HybridDictionary.Contains(Object) method

```csharp
public bool Contains (object key);
```

Determines whether the `HybridDictionary` contains a specific key.

Parameters:

- `key`: The key to locate in the `HybridDictionary`.

Returns: `true` if the `HybridDictionary` contains an entry with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method is an O(1) operation.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `key` to determine whether `item` exists.

#### Examples
The following code example searches for an element in a `HybridDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Contains/hybriddictionary_contains.cs._

## HybridDictionary.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int index);
```

Copies the `HybridDictionary` entries to a one-dimensional `Array` instance at the specified index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the `DictionaryEntry` objects copied from `HybridDictionary`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `HybridDictionary` is greater than the available space from `index` to the end of the destination `array`.
- `InvalidCastException`: The type of the source `HybridDictionary` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The elements are copied to the `Array` in the same order in which the enumerator iterates through the `HybridDictionary`.

To copy only the keys in the `HybridDictionary`, use `HybridDictionary.Keys.CopyTo`.

To copy only the values in the `HybridDictionary`, use `HybridDictionary.Values.CopyTo`.

This method is an O(`n`) operation, where `n` is `HybridDictionary.Count`.

#### Examples
The following code example copies the elements of a `HybridDictionary` to an array.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/CopyTo/hybriddictionary_copyto.cs._

## HybridDictionary.GetEnumerator() method

```csharp
public System.Collections.IDictionaryEnumerator GetEnumerator ();
```

Returns an `IDictionaryEnumerator` that iterates through the `HybridDictionary`.

Returns: An `IDictionaryEnumerator` for the `HybridDictionary`.

#### Remarks
The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an O(1) operation.

#### Examples
The following code example enumerates the elements of a `HybridDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Count/hybriddictionary_enumerator.cs._

## HybridDictionary.Remove(Object) method

```csharp
public void Remove (object key);
```

Removes the entry with the specified key from the `HybridDictionary`.

Parameters:

- `key`: The key of the entry to remove.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
If the `HybridDictionary` does not contain an element with the specified key, the `HybridDictionary` remains unchanged. No exception is thrown.

If the collection is already stored in a `Hashtable` and the number of elements falls below the optimal size for a `ListDictionary`, the collection remains in the `Hashtable` to avoid the overhead of copying elements from the `Hashtable` back to a `ListDictionary`.

This method is an O(1) operation.

#### Examples
The following code example adds to and removes elements from a `HybridDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Add/hybriddictionary_addremove.cs._

## HybridDictionary.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an `IEnumerator` that iterates through the `HybridDictionary`.

Returns: An `IEnumerator` for the `HybridDictionary`.

#### Remarks
The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position. At this position, calling `IEnumerator.Current` throws an exception. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, calling `IEnumerator.Current` throws an exception. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`. If the collection is modified between `IEnumerator.MoveNext` and `IEnumerator.Current`, `IEnumerator.Current` returns the element that it is set to, even if the enumerator is already invalidated.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

This method is an O(1) operation.

#### Examples
The following code example enumerates the elements of a `HybridDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Count/hybriddictionary_enumerator.cs._
