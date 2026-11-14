---
title: "CollectionBase class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/CollectionBase.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CollectionBase class

Namespace: `System.Collections`

```csharp
public abstract class CollectionBase : System.Collections.IList
```

Provides the `abstract` base class for a strongly typed collection.

#### Remarks

> **Important:**
>  We don't recommend that you use the `CollectionBase` class for new development. Instead, we recommend that you use the generic `Collection<T>` class. For more information, see Non-generic collections shouldn't be used on GitHub.

A `CollectionBase` instance is always modifiable. See `ReadOnlyCollectionBase` for a read-only version of this class.

The capacity of a `CollectionBase` is the number of elements the `CollectionBase` can hold. As elements are added to a `CollectionBase`, the capacity is automatically increased as required through reallocation. The capacity can be decreased by setting the `Capacity` property explicitly.

#### Examples
The following code example implements the `CollectionBase` class and uses that implementation to create a collection of `Int16` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/collectionbase.cs._

## CollectionBase.CollectionBase() constructor

```csharp
protected CollectionBase ();
```

Initializes a new instance of the `CollectionBase` class with the default initial capacity.

#### Remarks
The capacity of a `CollectionBase` is the number of elements that the `CollectionBase` can hold. As elements are added to a `CollectionBase`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `CollectionBase`.

This constructor is an `O(1)` operation.

## CollectionBase.CollectionBase(Int32) constructor

```csharp
protected CollectionBase (int capacity);
```

Initializes a new instance of the `CollectionBase` class with the specified capacity.

Parameters:

- `capacity`: The number of elements that the new list can initially store.

#### Remarks
The capacity of a `CollectionBase` is the number of elements that the `CollectionBase` can hold. As elements are added to a `CollectionBase`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `CollectionBase`.

This constructor is an `O(n)` operation, where `n` is `capacity`.

## CollectionBase.Capacity property

```csharp
public int Capacity { get; set; }
```

Gets or sets the number of elements that the `CollectionBase` can contain.

Returns: The number of elements that the `CollectionBase` can contain.

Exceptions:

- `ArgumentOutOfRangeException`: `CollectionBase.Capacity` is set to a value that is less than `CollectionBase.Count`.
- `OutOfMemoryException`: There is not enough memory available on the system.

#### Remarks
`CollectionBase.Capacity` is the number of elements that the `CollectionBase` can store. `CollectionBase.Count` is the number of elements that are actually in the `CollectionBase`.

`CollectionBase.Capacity` is always greater than or equal to `CollectionBase.Count`. If `CollectionBase.Count` exceeds `CollectionBase.Capacity` while adding elements, the capacity is automatically increased by reallocating the internal array before copying the old elements and adding the new elements.

The capacity can be decreased by setting the `Capacity` property explicitly. When the value of `CollectionBase.Capacity` is set explicitly, the internal array is also reallocated to accommodate the specified capacity.

Retrieving the value of this property is an `O(1)` operation; setting the property is an `O(n)` operation, where `n` is the new capacity.

## CollectionBase.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `CollectionBase` instance. This property cannot be overridden.

Returns: The number of elements contained in the `CollectionBase` instance. Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example implements the `CollectionBase` class and uses that implementation to create a collection of `Int16` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/collectionbase.cs._

## CollectionBase.InnerList property

```csharp
protected System.Collections.ArrayList InnerList { get; }
```

Gets an `ArrayList` containing the list of elements in the `CollectionBase` instance.

Returns: An `ArrayList` representing the `CollectionBase` instance itself. Retrieving the value of this property is an O(1) operation.

#### Remarks
The On* methods are invoked only on the instance returned by the `List` property, but not on the instance returned by the `InnerList` property.

## CollectionBase.List property

```csharp
protected System.Collections.IList List { get; }
```

Gets an `IList` containing the list of elements in the `CollectionBase` instance.

Returns: An `IList` representing the `CollectionBase` instance itself.

#### Remarks
The On* methods are invoked only on the instance returned by the `List` property, but not on the instance returned by the `InnerList` property.

Retrieving the value of this property is an `O(1)` operation.

#### Examples
The following code example implements the `CollectionBase` class and uses that implementation to create a collection of `Int16` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/collectionbase.cs._

## CollectionBase.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `CollectionBase` is synchronized (thread safe).

Returns: `true` if access to the `CollectionBase` is synchronized (thread safe); otherwise, `false`. The default is `false`.

#### Remarks
A `CollectionBase` instance is not synchronized. Derived classes can provide a synchronized version of the `CollectionBase` using the `SyncRoot` property.

Enumerating through a collection is intrinsically not a thread safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The following code example shows how to lock the collection using the `ICollection.SyncRoot` during the entire enumeration:

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/remarks.cs._

Retrieving the value of this property is an `O(1)` operation.

## CollectionBase.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `CollectionBase`.

Returns: An object that can be used to synchronize access to the `CollectionBase`.

#### Remarks
Derived classes can provide their own synchronized version of the `CollectionBase` using the `SyncRoot` property. The synchronizing code must perform operations on the `ICollection.SyncRoot` of the `CollectionBase`, not directly on the `CollectionBase`. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `CollectionBase` object.

Enumerating through a collection is intrinsically not a thread safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

The following code example shows how to lock the collection using the `ICollection.SyncRoot` during the entire enumeration:

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/remarks.cs._

Retrieving the value of this property is an `O(1)` operation.

## CollectionBase.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the `CollectionBase` has a fixed size.

Returns: `true` if the `CollectionBase` has a fixed size; otherwise, `false`. The default is `false`.

#### Remarks
A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but it allows the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

Retrieving the value of this property is an `O(1)` operation.

## CollectionBase.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value indicating whether the `CollectionBase` is read-only.

Returns: `true` if the `CollectionBase` is read-only; otherwise, `false`. The default is `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an `O(1)` operation.

## CollectionBase.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `CollectionBase.Count`.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.

Retrieving the value of this property is an `O(1)` operation; setting the property is also an `O(1)` operation.

#### Examples
The following code example implements the `CollectionBase` class and uses that implementation to create a collection of `Int16` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/collectionbase.cs._

## CollectionBase.Clear() method

```csharp
public void Clear ();
```

Removes all objects from the `CollectionBase` instance. This method cannot be overridden.

#### Remarks
`CollectionBase.Count` is set to zero.

This method is an `O(n)` operation, where `n` is `CollectionBase.Count`.

To perform custom actions before or after the collection is cleared, override the protected `CollectionBase.OnClear` or `CollectionBase.OnClearComplete` method.

## CollectionBase.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `CollectionBase` instance.

Returns: An `IEnumerator` for the `CollectionBase` instance.

#### Remarks

The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position. At this position, calling `IEnumerator.Current` throws an exception. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, calling `IEnumerator.Current` throws an exception. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`. If the collection is modified between `IEnumerator.MoveNext` and `IEnumerator.Current`, `IEnumerator.Current` returns the element that it is set to, even if the enumerator is already invalidated.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

While the `CollectionBase.GetEnumerator` method is not visible to COM clients by default, inheriting the `CollectionBase` class can expose it and can cause undesirable behavior in COM clients.

This method is an `O(1)` operation.

#### Examples
The following code example implements the `CollectionBase` class and uses that implementation to create a collection of `Int16` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/collectionbase.cs._
