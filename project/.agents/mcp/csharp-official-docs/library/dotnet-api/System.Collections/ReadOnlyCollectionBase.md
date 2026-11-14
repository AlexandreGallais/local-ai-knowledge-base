---
title: "ReadOnlyCollectionBase class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/ReadOnlyCollectionBase.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlyCollectionBase class

Namespace: `System.Collections`

```csharp
public abstract class ReadOnlyCollectionBase : System.Collections.ICollection
```

Provides the `abstract` base class for a strongly typed non-generic read-only collection.

#### Remarks

A `ReadOnlyCollectionBase` instance is always read-only. See `CollectionBase` for a modifiable version of this class.

> **Important:**
>  We don't recommend that you use the `ReadOnlyCollectionBase` class for new development. Instead, we recommend that you use the generic `ReadOnlyCollection<T>` class. For more information, see Non-generic collections shouldn't be used on GitHub.

#### Examples
The following code example implements the `ReadOnlyCollectionBase` class.

_Code sample not included: ~/snippets/csharp/System.Collections/ReadOnlyCollectionBase/Overview/readonlycollectionbase.cs._

## ReadOnlyCollectionBase.ReadOnlyCollectionBase() constructor

```csharp
protected ReadOnlyCollectionBase ();
```

Initializes a new instance of the `ReadOnlyCollectionBase` class.

#### Remarks
This constructor is an `O(1)` operation.

## ReadOnlyCollectionBase.Count property

```csharp
public virtual int Count { get; }
```

Gets the number of elements contained in the `ReadOnlyCollectionBase` instance.

Returns: The number of elements contained in the `ReadOnlyCollectionBase` instance. Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example implements the `ReadOnlyCollectionBase` class.

_Code sample not included: ~/snippets/csharp/System.Collections/ReadOnlyCollectionBase/Overview/readonlycollectionbase.cs._

## ReadOnlyCollectionBase.InnerList property

```csharp
protected System.Collections.ArrayList InnerList { get; }
```

Gets the list of elements contained in the `ReadOnlyCollectionBase` instance.

Returns: An `ArrayList` representing the `ReadOnlyCollectionBase` instance itself.

#### Remarks
Retrieving the value of this property is an `O(1)` operation.

#### Examples
The following code example implements the `ReadOnlyCollectionBase` class.

_Code sample not included: ~/snippets/csharp/System.Collections/ReadOnlyCollectionBase/Overview/readonlycollectionbase.cs._

## ReadOnlyCollectionBase.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to a `ReadOnlyCollectionBase` object is synchronized (thread safe).

Returns: `true` if access to the `ReadOnlyCollectionBase` object is synchronized (thread safe); otherwise, `false`. The default is `false`.

#### Remarks
A `ReadOnlyCollectionBase` object is not synchronized. Derived classes can provide a synchronized version of the `ReadOnlyCollectionBase` class using the `SyncRoot` property.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `SyncRoot` property during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/ReadOnlyCollectionBase/Overview/source2.cs._

Retrieving the value of this property is an `O(1)` operation.

## ReadOnlyCollectionBase.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to a `ReadOnlyCollectionBase` object.

Returns: An object that can be used to synchronize access to the `ReadOnlyCollectionBase` object.

#### Remarks
Derived classes can provide their own synchronized version of the `ReadOnlyCollectionBase` class using the `SyncRoot` property. The synchronizing code must perform operations on the `SyncRoot` property of the `ReadOnlyCollectionBase` object, not directly on the `ReadOnlyCollectionBase` object. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `ReadOnlyCollectionBase` object.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `SyncRoot` property during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections/ReadOnlyCollectionBase/Overview/source2.cs._

Retrieving the value of this property is an `O(1)` operation.

## ReadOnlyCollectionBase.GetEnumerator() method

```csharp
public virtual System.Collections.IEnumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `ReadOnlyCollectionBase` instance.

Returns: An `IEnumerator` for the `ReadOnlyCollectionBase` instance.

#### Remarks
The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an `O(1)` operation.

#### Examples
The following code example implements the `ReadOnlyCollectionBase` class.

_Code sample not included: ~/snippets/csharp/System.Collections/ReadOnlyCollectionBase/Overview/readonlycollectionbase.cs._

## ReadOnlyCollectionBase.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the entire `ReadOnlyCollectionBase` to a compatible one-dimensional `Array`, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ReadOnlyCollectionBase`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `ReadOnlyCollectionBase` is greater than the available space from `index` to the end of the destination `array`.
- `InvalidCastException`: The type of the source `ReadOnlyCollectionBase` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The specified array must be of a compatible type.

This method uses `Array.Copy` to copy the elements.

This method is an `O(n)` operation, where `n` is `ReadOnlyCollectionBase.Count`.
