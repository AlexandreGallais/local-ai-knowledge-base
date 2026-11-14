---
title: "SortedDictionary<TKey,TValue> class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedDictionary<TKey,TValue> class (part 2 of 4)

## SortedDictionary<TKey,TValue>.Keys property

```csharp
public System.Collections.Generic.SortedDictionary<TKey,TValue>.KeyCollection Keys { get; }
```

Gets a collection containing the keys in the `SortedDictionary<T1,T2>`.

Returns: A `KeyCollection` containing the keys in the `SortedDictionary<T1,T2>`.

#### Remarks
The keys in the `KeyCollection` are sorted according to the `Comparer` property and are in the same order as the associated values in the `ValueCollection` returned by the `Values` property.

The returned `KeyCollection` is not a static copy; instead, the `KeyCollection` refers back to the keys in the original `SortedDictionary<T1,T2>`. Therefore, changes to the `SortedDictionary<T1,T2>` continue to be reflected in the `KeyCollection`.

Getting the value of this property is an O(1) operation.

#### Examples
The following code example shows how to enumerate the keys in the dictionary using the `Keys` property, and how to enumerate the keys and values in the dictionary.

This code is part of a larger example that can be compiled and executed. See `SortedDictionary<T1,T2>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._

## SortedDictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`. In the default implementation of `SortedDictionary<T1,T2>`, this property always returns `false`.

To be added.

## SortedDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.ICollection<TKey> System.Collections.Generic.IDictionary<TKey,TValue>.Keys { get; }
```

Gets an `ICollection<T>` containing the keys of the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the keys of the `IDictionary<T1,T2>`.

To be added.

## SortedDictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.ICollection<TValue> System.Collections.Generic.IDictionary<TKey,TValue>.Values { get; }
```

Gets an `ICollection<T>` containing the values in the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the values in the `IDictionary<T1,T2>`.

To be added.

## SortedDictionary<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.IEnumerable<TKey> System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Keys { get; }
```

Gets a collection containing the keys in the `SortedDictionary<T1,T2>`.

Returns: A collection containing the keys in the `SortedDictionary<T1,T2>`.

To be added.

## SortedDictionary<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.IEnumerable<TValue> System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Values { get; }
```

Gets a collection containing the values in the `SortedDictionary<T1,T2>`.

Returns: A collection containing the values in the `SortedDictionary<T1,T2>`.

To be added.

## SortedDictionary<TKey,TValue>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.  In the default implementation of `SortedDictionary<T1,T2>`, this property always returns `false`.

#### Remarks
Default implementations of collections in the `Generic` namespace are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which can cause the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The `System%23Collections%23ICollection%23SyncRoot` property returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock the object before accessing the collection.

Getting the value of this property is an O(1) operation.

## SortedDictionary<TKey,TValue>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

#### Remarks
Default implementations of collections in the `Generic` namespace are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

The `System%23Collections%23ICollection%23SyncRoot` property returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock the object before accessing the collection. The following code shows the use of the `SyncRoot` property.

```csharp
ICollection ic = ...;
lock (ic.SyncRoot)
{
    // Access the collection.
}
```

```vb
Dim ic As ICollection = ...
SyncLock ic.SyncRoot
    ' Access the collection.
End SyncLock
```

Getting the value of this property is an O(1) operation.

## SortedDictionary<TKey,TValue>.System.Collections.IDictionary.IsFixedSize property

```csharp
bool System.Collections.IDictionary.IsFixedSize { get; }
```

Gets a value indicating whether the `IDictionary` has a fixed size.

Returns: `true` if the `IDictionary` has a fixed size; otherwise, `false`.  In the default implementation of `SortedDictionary<T1,T2>`, this property always returns `false`.

#### Remarks
A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but it allows the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

Getting the value of this property is an O(1) operation.

## SortedDictionary<TKey,TValue>.System.Collections.IDictionary.IsReadOnly property

```csharp
bool System.Collections.IDictionary.IsReadOnly { get; }
```

Gets a value indicating whether the `IDictionary` is read-only.

Returns: `true` if the `IDictionary` is read-only; otherwise, `false`.  In the default implementation of `SortedDictionary<T1,T2>`, this property always returns `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Getting the value of this property is an O(1) operation.

## SortedDictionary<TKey,TValue>.System.Collections.IDictionary.Item property

```csharp
object? System.Collections.IDictionary.Item[object key] { get; set; }
```

Gets or sets the element with the specified key.

Parameters:

- `key`: The key of the element to get.

Returns: The element with the specified key, or `null` if `key` is not in the dictionary or `key` is of a type that is not assignable to the key type `TKey` of the `SortedDictionary<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: A value is being assigned, and `key` is of a type that is not assignable to the key type `TKey` of the `SortedDictionary<T1,T2>`.

-or-

A value is being assigned and is of a type that isn't assignable to the value type `TValue` of the `SortedDictionary<T1,T2>`.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following C# syntax: `myCollection[key]` (`myCollection(key)` in Visual Basic).

You can also use the `IDictionary.Item` property to add new elements by setting the value of a key that does not exist in the dictionary; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the dictionary, setting the `IDictionary.Item` property overwrites the old value. In contrast, the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Add` method does not modify existing elements.

The C# language uses the this keyword to define the indexers instead of implementing the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Item` property. Visual Basic <example-value> `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Item` as a default property, which provides the same indexing functionality.

Getting the value of this property is an O(log `n`) operation; setting the property is also an O(log `n`) operation.

#### Examples
The following code example shows how to use the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Item` property (the indexer in C#) of the `IDictionary` interface with a `SortedDictionary<T1,T2>`, and ways the property differs from the `SortedDictionary<T1,T2>.Item` property.

The example shows that, like the `SortedDictionary<T1,T2>.Item` property, the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Item` property can change the value associated with an existing key and can be used to add a new key/value pair if the specified key is not in the dictionary. The example also shows that unlike the `SortedDictionary<T1,T2>.Item` property, the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Item` property does not throw an exception if `key` is not in the dictionary, returning a null reference instead. Finally, the example demonstrates that getting the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Item` property returns a null reference if `key` is not the correct data type, and that setting the property throws an exception if `key` is not the correct data type.

The code example is part of a larger example, including output, provided for the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Add` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

## SortedDictionary<TKey,TValue>.System.Collections.IDictionary.Keys property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Keys { get; }
```

Gets an `ICollection` containing the keys of the `IDictionary`.

Returns: An `ICollection` containing the keys of the `IDictionary`.

#### Remarks
The keys in the returned `ICollection` are sorted according to the `Comparer` property and are guaranteed to be in the same order as the corresponding values in the `ICollection` returned by the `Values` property.

Getting the value of this property is an O(1) operation.

#### Examples
The following code example shows how to use the `Keys` property of the `IDictionary` interface with a `SortedDictionary<T1,T2>`, to list the keys in the dictionary. The example also shows how to enumerate the key/value pairs in the dictionary; note that the enumerator for the `IDictionary` interface returns `DictionaryEntry` objects rather than `KeyValuePair<T1,T2>` objects.

The code example is part of a larger example, including output, provided for the `SortedDictionary<T1,T2>.System%23Collections%23IDictionary%23Add` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/System.Collections.IDictionary.Add/source.cs._
