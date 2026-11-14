---
title: "SortedList class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/SortedList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedList class (part 2 of 4)

## SortedList.Count property

```csharp
public virtual int Count { get; }
```

Gets the number of elements contained in a `SortedList` object.

Returns: The number of elements contained in the `SortedList` object.

#### Remarks
Each element is a key/value pair that can be accessed as a `DictionaryEntry` object.

`SortedList.Capacity` is the number of elements that the `SortedList` object can store. `SortedList.Count` is the number of elements that are actually in the `SortedList`.

`SortedList.Capacity` is always greater than or equal to `SortedList.Count`. If `SortedList.Count` exceeds `SortedList.Capacity` while adding elements, the capacity is automatically increased by reallocating the internal array before copying the old elements and adding the new elements.

Retrieving the value of this property is an `O(1)` operation.

## SortedList.IsFixedSize property

```csharp
public virtual bool IsFixedSize { get; }
```

Gets a value indicating whether a `SortedList` object has a fixed size.

Returns: `true` if the `SortedList` object has a fixed size; otherwise, `false`. The default is `false`.

#### Remarks
A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but does allow the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

Retrieving the value of this property is an `O(1)` operation.

## SortedList.IsReadOnly property

```csharp
public virtual bool IsReadOnly { get; }
```

Gets a value indicating whether a `SortedList` object is read-only.

Returns: `true` if the `SortedList` object is read-only; otherwise, `false`. The default is `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an `O(1)` operation.

## SortedList.IsSynchronized property

```csharp
public virtual bool IsSynchronized { get; }
```

Gets a value indicating whether access to a `SortedList` object is synchronized (thread safe).

Returns: `true` if access to the `SortedList` object is synchronized (thread safe); otherwise, `false`. The default is `false`.

#### Remarks
To guarantee the thread safety of a `SortedList` object, all operations must be done through the wrapper returned by the `SortedList.Synchronized` method.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock a collection using the `SyncRoot` property during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/IsSynchronized/source2.cs._

Retrieving the value of this property is an `O(1)` operation.

The following code example shows how to synchronize a `SortedList` object, determine whether a `SortedList` is synchronized, and use a synchronized `SortedList`.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/IsSynchronized/source.cs._

## SortedList.Item property

```csharp
public virtual object? this[object key] { get; set; }
```

Gets or sets the value associated with a specific key in a `SortedList` object.

Parameters:

- `key`: The key <example-value> with the value to get or set.

Returns: The value associated with the `key` parameter in the `SortedList` object, if `key` is found; otherwise, `null`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `NotSupportedException`: The property is set and the `SortedList` object is read-only.

-or-

The property is set, `key` does not exist in the collection, and the `SortedList` has a fixed size.
- `OutOfMemoryException`: There is not enough available memory to add the element to the `SortedList`.
- `InvalidOperationException`: The comparer throws an exception.

#### Remarks
You can use the `SortedList.Item` property to access a specific element in a collection by specifying the following syntax: `myCollection[key]`.

You can also use this property to add new elements by setting the value of a key that does not exist in the `SortedList` object (for example, `myCollection["myNonexistentKey"] = myValue)`. However, if the specified key <example-value> exists in the `SortedList`, setting the `SortedList.Item` property overwrites the old value. In contrast, the `SortedList.Add` method does not modify existing elements.

A key <example-value> be `null`, but a value can be. To distinguish between `null` that is returned because the specified key is not found and `null` that is returned because the value of the specified key is `null`, use the `SortedList.Contains` method or the `SortedList.ContainsKey` method to determine if the key <example-value> in the list.

The elements of a `SortedList` are sorted by the keys either according to a specific `IComparer` implementation specified when the `SortedList` is created or according to the `IComparable` implementation provided by the keys themselves.

The C# language uses the `this` keyword to define the indexers instead of implementing the `Keys` property. Visual Basic <example-value> `SortedList.Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an `O(log n)` operation, where `n` is `SortedList.Count`. Setting the property is an `O(log n)` operation if the key is already in the `SortedList`. If the key is not in the list, setting the property is an `O(n)` operation for unsorted data, or `O(log n)` if the new element is added at the end of the list. If insertion causes a resize, the operation is `O(n)`.

## SortedList.Keys property

```csharp
public virtual System.Collections.ICollection Keys { get; }
```

Gets the keys in a `SortedList` object.

Returns: An `ICollection` object containing the keys in the `SortedList` object.

#### Remarks
The `ICollection` object is a read-only view of the keys of the `SortedList` object. Modifications made to the underlying `SortedList` are immediately reflected in the `ICollection`.

The elements of the `ICollection` are sorted in the same order as the keys of the `SortedList`.

This property is similar to the `SortedList.GetKeyList` method, but returns an `ICollection` object instead of an `IList` object.

This method is an `O(1)` operation.

## SortedList.SyncRoot property

```csharp
public virtual object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to a `SortedList` object.

Returns: An object that can be used to synchronize access to the `SortedList` object.

#### Remarks
To create a synchronized version of the `SortedList` object, use the `SortedList.Synchronized` method. However, derived classes can provide their own synchronized version of the `SortedList` using the `SyncRoot` property. The synchronizing code must perform operations on the `SortedList.SyncRoot` of the `SortedList`, not directly on the `SortedList`. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `SortedList` object.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `SyncRoot` property during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/IsSynchronized/source2.cs._

Retrieving the value of this property is an `O(1)` operation.

## SortedList.Values property

```csharp
public virtual System.Collections.ICollection Values { get; }
```

Gets the values in a `SortedList` object.

Returns: An `ICollection` object containing the values in the `SortedList` object.

#### Remarks
The `ICollection` object is a read-only view of the values of the `SortedList` object. Modifications made to the underlying `SortedList` are immediately reflected in the `ICollection`.

The elements of the `ICollection` are sorted in the same order as the values of the `SortedList`.

This property is similar to the `SortedList.GetValueList` method, but returns an `ICollection` object instead of an `IList` object.

This method is an `O(1)` operation.

## SortedList.Add(Object, Object) method

```csharp
public virtual void Add (object key, object? value);
```

Adds an element with the specified key and value to a `SortedList` object.

Parameters:

- `key`: The key of the element to add.
- `value`: The value of the element to add. The value can be `null`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An element with the specified `key` already exists in the `SortedList` object.

-or-

The `SortedList` is set to use the `IComparable` interface, and `key` does not implement the `IComparable` interface.
- `NotSupportedException`: The `SortedList` is read-only.

-or-

The `SortedList` has a fixed size.
- `OutOfMemoryException`: There is not enough available memory to add the element to the `SortedList`.
- `InvalidOperationException`: The comparer throws an exception.

#### Remarks
The insertion point is determined based on the comparer selected, either explicitly or by default, when the `SortedList` object was created.

If `SortedList.Count` already equals `SortedList.Capacity`, the capacity of the `SortedList` object is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

You can also use the `SortedList.Item` property to add new elements by setting the value of a key that does not exist in the `SortedList` object (for example, `myCollection["myNonexistentKey"] = myValue`). However, if the specified key <example-value> exists in the `SortedList`, setting the `SortedList.Item` property overwrites the old value. In contrast, the `SortedList.Add` method does not modify existing elements.

The elements of a `SortedList` object are sorted by the keys either according to a specific `IComparer` implementation specified when the `SortedList` is created or according to the `IComparable` implementation provided by the keys themselves.

A key <example-value> be `null`, but a value can be.

This method is an `O(n)` operation for unsorted data, where `n` is `SortedList.Count`. It is an `O(log n)` operation if the new element is added at the end of the list. If insertion causes a resize, the operation is `O(n)`.

#### Examples
The following code example shows how to add elements to a `SortedList` object.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/Add/source.cs._

## SortedList.Clear() method

```csharp
public virtual void Clear ();
```

Removes all elements from a `SortedList` object.

Exceptions:

- `NotSupportedException`: The `SortedList` object is read-only.

-or-

The `SortedList` has a fixed size.

#### Remarks
`SortedList.Count` is set to zero and references to other objects from elements of the collection are also released.

`SortedList.Capacity` remains unchanged. To reset the capacity of the `SortedList` object, call `SortedList.TrimToSize` or set the `Capacity` property directly. Trimming an empty `SortedList` sets the capacity of the `SortedList` to the default capacity.

This method is an `O(n)` operation, where `n` is `SortedList.Count`.

#### Examples
The following code example shows how to trim the unused portions of a `SortedList` object and how to clear the values of the `SortedList`.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/Clear/source.cs._

## SortedList.Clone() method

```csharp
public virtual object Clone ();
```

Creates a shallow copy of a `SortedList` object.

Returns: A shallow copy of the `SortedList` object.

#### Remarks
A shallow copy of a collection copies only the elements of the collection, whether they are reference types or value types, but does not copy the objects that the references refer to. The references in the new collection point to the same objects that the references in the original collection point to.

In contrast, a deep copy of a collection copies the elements and everything directly or indirectly referenced by the elements.

This method is an `O(n)` operation, where `n` is `SortedList.Count`.

## SortedList.Contains(Object) method

```csharp
public virtual bool Contains (object key);
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

`SortedList.Contains` implements `IDictionary.Contains`. It behaves exactly as `SortedList.ContainsKey`.

This method uses a binary search algorithm; therefore, this method is an `O(log n)` operation, where `n` is `SortedList.Count`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether `item` exists.

#### Examples
The following code example shows how to determine whether a `SortedList` object contains a specific element.

_Code sample not included: ~/snippets/csharp/System.Collections/SortedList/Contains/source.cs._
