---
title: "Dictionary<TKey,TValue> class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Dictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Dictionary<TKey,TValue> class (part 3 of 5)

## Dictionary<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.IEnumerable<TValue> System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Values { get; }
```

Gets a collection containing the values of the `IReadOnlyDictionary<T1,T2>`.

Returns: A collection containing the values of the `IReadOnlyDictionary<T1,T2>`.

To be added.

## Dictionary<TKey,TValue>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value that indicates whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.  In the default implementation of `Dictionary<T1,T2>`, this property always returns `false`.

#### Remarks
Default implementations of collections in the `Generic` namespace are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which can cause the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The `SyncRoot` property returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock the object before accessing the collection.

Getting the value of this property is an O(1) operation.

## Dictionary<TKey,TValue>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

#### Remarks
Default implementations of collections in the `Generic` namespace are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

The `SyncRoot` property returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock the object before accessing the collection. The following code shows the use of the `SyncRoot` property.

```csharp
ICollection ic = ...;
lock (ic.SyncRoot) {
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

## Dictionary<TKey,TValue>.System.Collections.IDictionary.IsFixedSize property

```csharp
bool System.Collections.IDictionary.IsFixedSize { get; }
```

Gets a value that indicates whether the `IDictionary` has a fixed size.

Returns: `true` if the `IDictionary` has a fixed size; otherwise, `false`.  In the default implementation of `Dictionary<T1,T2>`, this property always returns `false`.

#### Remarks
A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but it allows the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

Getting the value of this property is an O(1) operation.

## Dictionary<TKey,TValue>.System.Collections.IDictionary.IsReadOnly property

```csharp
bool System.Collections.IDictionary.IsReadOnly { get; }
```

Gets a value that indicates whether the `IDictionary` is read-only.

Returns: `true` if the `IDictionary` is read-only; otherwise, `false`.  In the default implementation of `Dictionary<T1,T2>`, this property always returns `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Getting the value of this property is an O(1) operation.

## Dictionary<TKey,TValue>.System.Collections.IDictionary.Item property

```csharp
object? System.Collections.IDictionary.Item[object key] { get; set; }
```

Gets or sets the value with the specified key.

Parameters:

- `key`: The key of the value to get.

Returns: The value associated with the specified key, or `null` if `key` is not in the dictionary or `key` is of a type that is not assignable to the key type `TKey` of the `Dictionary<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: A value is being assigned, and `key` is of a type that is not assignable to the key type `TKey` of the `Dictionary<T1,T2>`.

-or-

A value is being assigned and is of a type that isn't assignable to the value type `TValue` of the `Dictionary<T1,T2>`.

#### Remarks
This property provides the ability to access a specific value in the collection by using the following C# syntax: `myCollection[key]` (`myCollection(key)` in Visual Basic).

You can also use the `IDictionary.Item` property to add new elements by setting the value of a key that does not exist in the dictionary; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the dictionary, setting the `IDictionary.Item` property overwrites the old value. In contrast, the `IDictionary.Add` method does not modify existing elements.

The C# language uses the this keyword to define the indexers instead of implementing the `Dictionary<T1,T2>.System%23Collections%23IDictionary%23Item` property. Visual Basic <example-value> `Dictionary<T1,T2>.System%23Collections%23IDictionary%23Item` as a default property, which provides the same indexing functionality.

Getting or setting the value of this property approaches an O(1) operation.

#### Examples
The following code example shows how to use the `Dictionary<T1,T2>.System%23Collections%23IDictionary%23Item` property (the indexer in C#) of the `IDictionary` interface with a `Dictionary<T1,T2>`, and ways the property differs from the `Dictionary<T1,T2>.Item` property.

The example shows that, like the `Dictionary<T1,T2>.Item` property, the `Dictionary<T1,T2>.System%23Collections%23IDictionary%23Item` property can change the value associated with an existing key and can be used to add a new key/value pair if the specified key is not in the dictionary. The example also shows that unlike the `Dictionary<T1,T2>.Item` property, the `Dictionary<T1,T2>.System%23Collections%23IDictionary%23Item` property does not throw an exception if `key` is not in the dictionary, returning a null reference instead. Finally, the example demonstrates that getting the `Dictionary<T1,T2>.System%23Collections%23IDictionary%23Item` property returns a null reference if `key` is not the correct data type, and that setting the property throws an exception if `key` is not the correct data type.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/System.Collections.IDictionary.Item/source.cs._

## Dictionary<TKey,TValue>.System.Collections.IDictionary.Keys property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Keys { get; }
```

Gets an `ICollection` containing the keys of the `IDictionary`.

Returns: An `ICollection` containing the keys of the `IDictionary`.

#### Remarks
The order of the keys in the returned `ICollection` is unspecified, but it is guaranteed to be the same order as the corresponding values in the `ICollection` returned by the `Values` property.

Getting the value of this property is an O(1) operation.

#### Examples
The following code example shows how to use the `System%23Collections%23IDictionary%23Keys` property of the `IDictionary` interface with a `Dictionary<T1,T2>`, to list the keys in the dictionary. The example also shows how to enumerate the key/value pairs in the dictionary; note that the enumerator for the `IDictionary` interface returns `DictionaryEntry` objects rather than `KeyValuePair<T1,T2>` objects.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/System.Collections.IDictionary.Keys/source.cs._

## Dictionary<TKey,TValue>.System.Collections.IDictionary.Values property

```csharp
System.Collections.ICollection System.Collections.IDictionary.Values { get; }
```

Gets an `ICollection` containing the values in the `IDictionary`.

Returns: An `ICollection` containing the values in the `IDictionary`.

#### Remarks
The order of the values in the returned `ICollection` is unspecified, but it is guaranteed to be the same order as the corresponding keys in the `ICollection` returned by the `Keys` property.

Getting the value of this property is an O(1) operation.

#### Examples
The following code example shows how to use the `System%23Collections%23IDictionary%23Values` property of the `IDictionary` interface with a `Dictionary<T1,T2>`, to list the values in the dictionary. The example also shows how to enumerate the key/value pairs in the dictionary; note that the enumerator for the `IDictionary` interface returns `DictionaryEntry` objects rather than `KeyValuePair<T1,T2>` objects.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/System.Collections.IDictionary.Values/source.cs._

## Dictionary<TKey,TValue>.Values property

```csharp
public System.Collections.Generic.Dictionary<TKey,TValue>.ValueCollection Values { get; }
```

Gets a collection containing the values in the `Dictionary<T1,T2>`.

Returns: A `ValueCollection` containing the values in the `Dictionary<T1,T2>`.

#### Remarks
The order of the values in the `ValueCollection` is unspecified, but it is the same order as the associated keys in the `KeyCollection` returned by the `Keys` property.

The returned `ValueCollection` is not a static copy; instead, the `ValueCollection` refers back to the values in the original `Dictionary<T1,T2>`. Therefore, changes to the `Dictionary<T1,T2>` continue to be reflected in the `ValueCollection`.

Getting the value of this property is an O(1) operation.

#### Examples
This code example shows how to enumerate the values in the dictionary using the `Values` property, and how to enumerate the keys and values in the dictionary.

This code example is part of a larger example provided for the `Dictionary<T1,T2>` class (`openWith` is the name of the Dictionary used in this example).

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

## Dictionary<TKey,TValue>.Add(TKey, TValue) method

```csharp
public void Add (TKey key, TValue value);
```

Adds the specified key and value to the dictionary.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add. The value can be `null` for reference types.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An element with the same key <example-value> exists in the `Dictionary<T1,T2>`.

#### Remarks
You can also use the `Dictionary<T1,T2>.Item` property to add new elements by setting the value of a key that does not exist in the `Dictionary<T1,T2>`; for example, `myCollection[myKey] = myValue` (in Visual Basic, `myCollection(myKey) = myValue`). However, if the specified key <example-value> exists in the `Dictionary<T1,T2>`, setting the `Dictionary<T1,T2>.Item` property overwrites the old value. In contrast, the `Dictionary<T1,T2>.Add` method throws an exception if a value with the specified key <example-value> exists.

If the `Count` property value already equals the capacity, the capacity of the `Dictionary<T1,T2>` is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

A key <example-value> be `null`, but a value can be, if `TValue` is a reference type.

If `Dictionary<T1,T2>.Count` is less than the capacity, this method approaches an O(1) operation. If the capacity must be increased to accommodate the new element, this method becomes an O(`n`) operation, where `n` is `Dictionary<T1,T2>.Count`.

#### Examples

The following code example creates an empty `Dictionary<T1,T2>` of strings with string keys and uses the `Dictionary<T1,T2>.Add` method to add some elements. The example demonstrates that the `Dictionary<T1,T2>.Add` method throws an `ArgumentException` when attempting to add a duplicate key.

This code example is part of a larger example provided for the `Dictionary<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

## Dictionary<TKey,TValue>.Clear() method

```csharp
public void Clear ();
```

Removes all keys and values from the `Dictionary<T1,T2>`.

#### Remarks
The `Count` property is set to 0, and references to other objects from elements of the collection are also released. The capacity remains unchanged.

This method is an O(`n`) operation, where `n` is the capacity of the dictionary.

This mutating method can be safely called without invalidating active enumerators on the `Dictionary<T1,T2>` instance. This does not imply thread safety.
