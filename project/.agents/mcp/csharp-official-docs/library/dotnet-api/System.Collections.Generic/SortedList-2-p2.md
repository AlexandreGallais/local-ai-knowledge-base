---
title: "SortedList<TKey,TValue> class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedList`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedList<TKey,TValue> class (part 2 of 5)

## SortedList<TKey,TValue>.SortedList(Int32, IComparer<TKey>) constructor

```csharp
public SortedList (int capacity, System.Collections.Generic.IComparer<TKey>? comparer);
```

Initializes a new instance of the `SortedList<T1,T2>` class that is empty, has the specified initial capacity, and uses the specified `IComparer<T>`.

Parameters:

- `capacity`: The initial number of elements that the `SortedList<T1,T2>` can contain.
- `comparer`: The `IComparer<T>` implementation to use when comparing keys.

-or-

`null` to use the default `Comparer<T>` for the type of the key.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
Every key in a `SortedList<T1,T2>` must be unique according to the specified comparer.

The capacity of a `SortedList<T1,T2>` is the number of elements that the `SortedList<T1,T2>` can hold before resizing. As elements are added to a `SortedList<T1,T2>`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `SortedList<T1,T2>`.

The capacity can be decreased by calling `SortedList<T1,T2>.TrimExcess` or by setting the `Capacity` property explicitly. Decreasing the capacity reallocates memory and copies all the elements in the `SortedList<T1,T2>`.

This constructor is an O(`n`) operation, where `n` is `capacity`.

#### Examples
The following code example creates a sorted list with an initial capacity of 5 and a case-insensitive comparer for the current culture. The example adds four elements, some with lower-case keys and some with upper-case keys. The example then attempts to add an element with a key that differs from an existing key only by case, catches the resulting exception, and displays an error message. Finally, the example displays the elements in case-insensitive sort order.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/.ctor/source4.cs._

## SortedList<TKey,TValue>.Capacity property

```csharp
public int Capacity { get; set; }
```

Gets or sets the number of elements that the `SortedList<T1,T2>` can contain.

Returns: The number of elements that the `SortedList<T1,T2>` can contain.

Exceptions:

- `ArgumentOutOfRangeException`: `SortedList<T1,T2>.Capacity` is set to a value that is less than `SortedList<T1,T2>.Count`.
- `OutOfMemoryException`: There is not enough memory available on the system.

#### Remarks
`SortedList<T1,T2>.Capacity` is the number of elements that the `SortedList<T1,T2>` can store. `SortedList<T1,T2>.Count` is the number of elements that are actually in the `SortedList<T1,T2>`.

`SortedList<T1,T2>.Capacity` is always greater than or equal to `SortedList<T1,T2>.Count`. If `SortedList<T1,T2>.Count` exceeds `SortedList<T1,T2>.Capacity` while adding elements, the capacity is increased by automatically reallocating the internal array before copying the old elements and adding the new elements.

The capacity can be decreased by calling `SortedList<T1,T2>.TrimExcess` or by setting the `Capacity` property explicitly. When the value of `SortedList<T1,T2>.Capacity` is set explicitly, the internal array is also reallocated to accommodate the specified capacity.

Retrieving the value of this property is an O(1) operation; setting the property is an O(`n`) operation, where `n` is the new capacity.

## SortedList<TKey,TValue>.Comparer property

```csharp
public System.Collections.Generic.IComparer<TKey> Comparer { get; }
```

Gets the `IComparer<T>` for the sorted list.

Returns: The `IComparable<T>` for the current `SortedList<T1,T2>`.

#### Remarks
Retrieving the value of this property is an O(1) operation.

## SortedList<TKey,TValue>.Count property

```csharp
public int Count { get; }
```

Gets the number of key/value pairs contained in the `SortedList<T1,T2>`.

Returns: The number of key/value pairs contained in the `SortedList<T1,T2>`.

#### Remarks
`SortedList<T1,T2>.Capacity` is the number of elements that the `SortedList<T1,T2>` can store. `SortedList<T1,T2>.Count` is the number of elements that are actually in the `SortedList<T1,T2>`.

`SortedList<T1,T2>.Capacity` is always greater than or equal to `SortedList<T1,T2>.Count`. If `SortedList<T1,T2>.Count` exceeds `SortedList<T1,T2>.Capacity` while adding elements, the capacity is increased by automatically reallocating the internal array before copying the old elements and adding the new elements.

Retrieving the value of this property is an O(1) operation.

## SortedList<TKey,TValue>.Item property

```csharp
public TValue this[TKey key] { get; set; }
```

Gets or sets the value associated with the specified key.

Parameters:

- `key`: The key whose value to get or set.

Returns: The value associated with the specified key. If the specified key is not found, a get operation throws a `KeyNotFoundException` and a set operation creates a new element using the specified key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `KeyNotFoundException`: The property is retrieved and `key` does not exist in the collection.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[key]`.

A key <example-value> be `null`, but a value can be, if the type of values in the list, `TValue`, is a reference type.

If the key is not found when a value is being retrieved, `KeyNotFoundException` is thrown. If the key is not found when a value is being set, the key and value are added.

You can also use the `SortedList<T1,T2>.Item` property to add new elements by setting the value of a key that does not exist in the `SortedList<T1,T2>`; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the `SortedList<T1,T2>`, setting the `SortedList<T1,T2>.Item` property overwrites the old value. In contrast, the `SortedList<T1,T2>.Add` method does not modify existing elements.

The C# language uses the `this` keyword to define the indexers instead of implementing the `SortedList<T1,T2>.Item` property. Visual Basic <example-value> `SortedList<T1,T2>.Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an O(log `n`) operation, where n is `SortedList<T1,T2>.Count`. Setting the property is an O(log `n`) operation if the key is already in the `SortedList<T1,T2>`. If the key is not in the list, setting the property is an O(`n`) operation for unsorted data, or O(log `n`) if the new element is added at the end of the list. If insertion causes a resize, the operation is O(`n`).

#### Examples
The following code example uses the `SortedList<T1,T2>.Item` property (the indexer in C#) to retrieve values, demonstrating that a `KeyNotFoundException` is thrown when a requested key is not present, and showing that the value associated with a key can be replaced.

The example also shows how to use the `SortedList<T1,T2>.TryGetValue` method as a more efficient way to retrieve values if a program often must try key <example-value> that are not in the sorted list.

This code example is part of a larger example provided for the `SortedList<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._

## SortedList<TKey,TValue>.Keys property

```csharp
public System.Collections.Generic.IList<TKey> Keys { get; }
```

Gets a collection containing the keys in the `SortedList<T1,T2>`, in sorted order.

Returns: A `IList<T>` containing the keys in the `SortedList<T1,T2>`.

#### Remarks
The order of the keys in the `IList<T>` is the same as the order in the `SortedList<T1,T2>`.

The returned `IList<T>` is not a static copy; instead, the `IList<T>` refers back to the keys in the original `SortedList<T1,T2>`. Therefore, changes to the `SortedList<T1,T2>` continue to be reflected in the `IList<T>`.

The collection returned by the `Keys` property provides an efficient way to retrieve keys by index. It is not necessary to regenerate the list when the property is accessed, because the list is just a wrapper for the internal array of keys. The following code shows the use of the `Keys` property for indexed retrieval of keys from a sorted list of elements with string keys:

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/remarks.cs._

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example shows how to enumerate the keys in the sorted list using the `Keys` property, and how to enumerate the keys and values in the sorted list.

The example also shows how to use the `Keys` property for efficient indexed retrieval of keys.

This code is part of a larger example that can be compiled and executed. See `SortedList<T1,T2>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._

## SortedList<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`. In the default implementation of `SortedList<T1,T2>`, this property always returns `false`.

To be added.

## SortedList<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.ICollection<TKey> System.Collections.Generic.IDictionary<TKey,TValue>.Keys { get; }
```

Gets an `ICollection<T>` containing the keys of the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` containing the keys of the `IDictionary<T1,T2>`.

To be added.

## SortedList<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.ICollection<TValue> System.Collections.Generic.IDictionary<TKey,TValue>.Values { get; }
```

Gets an `ICollection<T>` containing the values in the `IDictionary<T1,T2>`.

Returns: An object containing the values in the `IDictionary<T1,T2>`.

To be added.

## SortedList<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.IEnumerable<TKey> System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Keys { get; }
```

Gets an enumerable collection that contains the keys in the read-only dictionary.

Returns: An enumerable collection that contains the keys in the read-only dictionary.

To be added.

## SortedList<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.IEnumerable<TValue> System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Values { get; }
```

Gets an enumerable collection that contains the values in the read-only dictionary.

Returns: An enumerable collection that contains the values in the read-only dictionary.

To be added.

## SortedList<TKey,TValue>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.  In the default implementation of `SortedList<T1,T2>`, this property always returns `false`.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

The `SyncRoot` property returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection.

Retrieving the value of this property is an O(1) operation.

## SortedList<TKey,TValue>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.  In the default implementation of `SortedList<T1,T2>`, this property always returns the current instance.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration. To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

The `SyncRoot` property returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection. The following code shows the use of the `SyncRoot` property.

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

Retrieving the value of this property is an O(1) operation.

## SortedList<TKey,TValue>.System.Collections.IDictionary.IsFixedSize property

```csharp
bool System.Collections.IDictionary.IsFixedSize { get; }
```

Gets a value indicating whether the `IDictionary` has a fixed size.

Returns: `true` if the `IDictionary` has a fixed size; otherwise, `false`.  In the default implementation of `SortedList<T1,T2>`, this property always returns `false`.

#### Remarks
A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but it allows the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

Retrieving the value of this property is an O(1) operation.
