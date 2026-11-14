---
title: "SortedList<TKey,TValue> class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedList`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedList<TKey,TValue> class (part 3 of 5)

## SortedList<TKey,TValue>.System.Collections.IDictionary.IsReadOnly property

```csharp
bool System.Collections.IDictionary.IsReadOnly { get; }
```

Gets a value indicating whether the `IDictionary` is read-only.

Returns: `true` if the `IDictionary` is read-only; otherwise, `false`.  In the default implementation of `SortedList<T1,T2>`, this property always returns `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

## SortedList<TKey,TValue>.System.Collections.IDictionary.Item property

```csharp
object? System.Collections.IDictionary.Item[object key] { get; set; }
```

Gets or sets the element with the specified key.

Parameters:

- `key`: The key of the element to get or set.

Returns: The element with the specified key, or `null` if `key` is not in the dictionary or `key` is of a type that is not assignable to the key type `TKey` of the `SortedList<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: A value is being assigned, and `key` is of a type that is not assignable to the key type `TKey` of the `SortedList<T1,T2>`.

-or-

A value is being assigned and is of a type that isn't assignable to the value type `TValue` of the `SortedList<T1,T2>`.

#### Remarks
This property returns `null` if `key` is of a type that is not assignable to the key type `TKey` of the `SortedList<T1,T2>`.

This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[key]`.

You can also use the `IDictionary.Item` property to add new elements by setting the value of a key that does not exist in the dictionary; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the dictionary, setting the `IDictionary.Item` property overwrites the old value. In contrast, the `IDictionary.Add` method does not modify existing elements.

The C# language uses the this keyword to define the indexers instead of implementing the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Item` property. Visual Basic <example-value> `SortedList<T1,T2>.System%23Collections%23IDictionary%23Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an O(log `n`) operation, where n is `SortedList<T1,T2>.Count`. Setting the property is an O(log `n`) operation if the key is already in the `SortedList<T1,T2>`. If the key is not in the list, setting the property is an O(`n`) operation for unsorted data, or O(log `n`) if the new element is added at the end of the list. If insertion causes a resize, the operation is O(`n`).

#### Examples
The following code example shows how to use the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Item` property (the indexer in C#) of the `IDictionary` interface with a `SortedList<T1,T2>`, and ways the property differs from the `SortedList<T1,T2>.Item` property.

The example shows that, like the `SortedList<T1,T2>.Item` property, the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Item` property can change the value associated with an existing key and can be used to add a new key/value pair if the specified key is not in the sorted list. The example also shows that unlike the `SortedList<T1,T2>.Item` property, the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Item` property does not throw an exception if `key` is not in the sorted list, returning a null reference instead. Finally, the example demonstrates that getting the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Item` property returns a null reference if `key` is not the correct data type, and that setting the property throws an exception if `key` is not the correct data type.

The code example is part of a larger example, including output, provided for the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Add` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

## SortedList<TKey,TValue>.System.Collections.IDictionary.Keys property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Keys { get; }
```

Gets an `ICollection` containing the keys of the `IDictionary`.

Returns: An `ICollection` containing the keys of the `IDictionary`.

#### Remarks
The order of the keys in the `ICollection` is the same as the order in the `SortedList<T1,T2>`.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example shows how to use the `Keys` property of the `IDictionary` interface with a `SortedDictionary<T1,T2>`, to list the keys in the dictionary. The example also shows how to enumerate the key/value pairs in the sorted list; note that the enumerator for the `IDictionary` interface returns `DictionaryEntry` objects rather than `KeyValuePair<T1,T2>` objects.

The code example is part of a larger example, including output, provided for the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Add` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

## SortedList<TKey,TValue>.System.Collections.IDictionary.Values property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Values { get; }
```

Gets an `ICollection` containing the values in the `IDictionary`.

Returns: An `ICollection` containing the values in the `IDictionary`.

#### Remarks
The order of the values in the `ICollection` is the same as the order in the `SortedList<T1,T2>`.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example shows how to use the `System%23Collections%23IDictionary%23Values` property of the `IDictionary` interface with a `SortedList<T1,T2>`, to list the values in the sorted list. The example also shows how to enumerate the key/value pairs in the sorted list; note that the enumerator for the `IDictionary` interface returns `DictionaryEntry` objects rather than `KeyValuePair<T1,T2>` objects.

The code example is part of a larger example, including output, provided for the `SortedList<T1,T2>.System%23Collections%23IDictionary%23Add` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/System.Collections.IDictionary.Add/source.cs._

## SortedList<TKey,TValue>.Values property

```csharp
public System.Collections.Generic.IList<TValue> Values { get; }
```

Gets a collection containing the values in the `SortedList<T1,T2>`.

Returns: A `IList<T>` containing the values in the `SortedList<T1,T2>`.

#### Remarks
The order of the values in the `IList<T>` is the same as the order in the `SortedList<T1,T2>`.

The returned `IList<T>` is not a static copy; instead, the `IList<T>` refers back to the values in the original `SortedList<T1,T2>`. Therefore, changes to the `SortedList<T1,T2>` continue to be reflected in the `IList<T>`.

The collection returned by the `Values` property provides an efficient way to retrieve values by index. It is not necessary to regenerate the list when the property is accessed, because the list is just a wrapper for the internal array of values. The following code shows the use of the `Values` property for indexed retrieval of values from a sorted list of strings:

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/remarks.cs._

Retrieving the value of this property is an O(1) operation.

#### Examples
This code example shows how to enumerate the values in the sorted list using the `Values` property, and how to enumerate the keys and values in the sorted list.

The example also shows how to use the `Values` property for efficient indexed retrieval of values.

This code example is part of a larger example provided for the `SortedList<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._

## SortedList<TKey,TValue>.Add(TKey, TValue) method

```csharp
public void Add (TKey key, TValue value);
```

Adds an element with the specified key and value into the `SortedList<T1,T2>`.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add. The value can be `null` for reference types.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `SortedList<T1,T2>`.

#### Remarks
A key <example-value> be `null`, but a value can be, if the type of values in the sorted list, `TValue`, is a reference type.

You can also use the `SortedList<T1,T2>.Item` property to add new elements by setting the value of a key that does not exist in the `SortedList<T1,T2>`; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the `SortedList<T1,T2>`, setting the `SortedList<T1,T2>.Item` property overwrites the old value. In contrast, the `SortedList<T1,T2>.Add` method does not modify existing elements.

If `SortedList<T1,T2>.Count` already equals `SortedList<T1,T2>.Capacity`, the capacity of the `SortedList<T1,T2>` is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

This method is an O(`n`) operation for unsorted data, where `n` is `SortedList<T1,T2>.Count`. It is an O(log `n`) operation if the new element is added at the end of the list. If insertion causes a resize, the operation is O(`n`).

#### Examples
The following code example creates an empty `SortedList<T1,T2>` of strings with string keys and uses the `SortedList<T1,T2>.Add` method to add some elements. The example demonstrates that the `SortedList<T1,T2>.Add` method throws an `ArgumentException` when attempting to add a duplicate key.

This code example is part of a larger example provided for the `SortedList<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._

## SortedList<TKey,TValue>.Clear() method

```csharp
public void Clear ();
```

Removes all elements from the `SortedList<T1,T2>`.

#### Remarks
`SortedList<T1,T2>.Count` is set to zero, and references to other objects from elements of the collection are also released.

`SortedList<T1,T2>.Capacity` remains unchanged. To reset the capacity of the `SortedList<T1,T2>`, call `SortedList<T1,T2>.TrimExcess` or set the `Capacity` property directly. Trimming an empty `SortedList<T1,T2>` sets the capacity of the `SortedList<T1,T2>` to the default capacity.

This method is an O(`n`) operation, where `n` is `SortedList<T1,T2>.Count`.

## SortedList<TKey,TValue>.ContainsKey(TKey) method

```csharp
public bool ContainsKey (TKey key);
```

Determines whether the `SortedList<T1,T2>` contains a specific key.

Parameters:

- `key`: The key to locate in the `SortedList<T1,T2>`.

Returns: `true` if the `SortedList<T1,T2>` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method is an O(log `n`) operation, where `n` is `SortedList<T1,T2>.Count`.

#### Examples
The following code example shows how to use the `SortedList<T1,T2>.ContainsKey` method to test whether a key <example-value> prior to calling the `SortedList<T1,T2>.Add` method. It also shows how to use the `SortedList<T1,T2>.TryGetValue` method to retrieve values, which is an efficient way to retrieve values when a program frequently tries keys that are not in the sorted list. Finally, it shows the least efficient way to test whether keys exist, by using the `SortedList<T1,T2>.Item` property (the indexer in C#).

This code example is part of a larger example provided for the `SortedList<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._
