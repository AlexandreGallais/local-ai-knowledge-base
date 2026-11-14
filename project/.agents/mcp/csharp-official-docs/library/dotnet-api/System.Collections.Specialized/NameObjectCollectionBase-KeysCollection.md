---
title: "NameObjectCollectionBase+KeysCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/NameObjectCollectionBase+KeysCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NameObjectCollectionBase+KeysCollection class

Namespace: `System.Collections.Specialized`

```csharp
public class NameObjectCollectionBase.KeysCollection : System.Collections.ICollection
```

Represents a collection of the `String` keys of a collection.

To be added.

## NameObjectCollectionBase+KeysCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of keys in the `KeysCollection`.

Returns: The number of keys in the `KeysCollection`.

#### Remarks
Retrieving the value of this property is an O(1) operation.

## NameObjectCollectionBase+KeysCollection.Item property

```csharp
public string? this[int index] { get; }
```

Gets the entry at the specified index of the collection.

Parameters:

- `index`: The zero-based index of the entry to locate in the collection.

Returns: The `String` key of the entry at the specified index of the collection.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the valid range of indexes for the collection.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]` (In Visual Basic, `myCollection(index)`).

The C# language uses the this keyword to define the indexers instead of implementing the `KeysCollection.Item` property. Visual Basic <example-value> `KeysCollection.Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an O(1) operation; setting the property is also an O(1) operation.

## NameObjectCollectionBase+KeysCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `KeysCollection` is synchronized (thread safe).

Returns: `true` if access to the `KeysCollection` is synchronized (thread safe); otherwise, `false`. The default is `false`.

#### Remarks
Derived classes can provide their own synchronized version of the `KeysCollection` using the `SyncRoot` property. The synchronizing code must perform operations on the `ICollection.SyncRoot` of the `KeysCollection`, not directly on the `KeysCollection`. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `KeysCollection` object.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `ICollection.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameObjectCollectionBase+KeysCollection/System.Collections.ICollection.IsSynchronized/source.cs._

Retrieving the value of this property is an O(1) operation.

## NameObjectCollectionBase+KeysCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `KeysCollection`.

Returns: An object that can be used to synchronize access to the `KeysCollection`.

#### Remarks
Derived classes can provide their own synchronized version of the `KeysCollection` using the `SyncRoot` property. The synchronizing code must perform operations on the `ICollection.SyncRoot` of the `KeysCollection`, not directly on the `KeysCollection`. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `KeysCollection` object.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `ICollection.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/NameObjectCollectionBase+KeysCollection/System.Collections.ICollection.IsSynchronized/source.cs._

Retrieving the value of this property is an O(1) operation.

## NameObjectCollectionBase+KeysCollection.Get(Int32) method

```csharp
public virtual string? Get (int index);
```

Gets the key at the specified index of the collection.

Parameters:

- `index`: The zero-based index of the key to get from the collection.

Returns: A `String` that contains the key at the specified index of the collection.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is outside the valid range of indexes for the collection.

#### Remarks
This method is an O(1) operation.

## NameObjectCollectionBase+KeysCollection.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `KeysCollection`.

Returns: An `IEnumerator` for the `KeysCollection`.

#### Remarks
This enumerator returns the keys of the collection as strings.

The `foreach` statement of the C# language (`for each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. `IEnumerator.Reset` also brings the enumerator back to this position.  At this position, `IEnumerator.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator.Current`.

`IEnumerator.Current` returns the same object until either `IEnumerator.MoveNext` or `IEnumerator.Reset` is called. `IEnumerator.MoveNext` sets `IEnumerator.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator.Current` is undefined. To set `IEnumerator.Current` to the first element of the collection again, you can call `IEnumerator.Reset` followed by `IEnumerator.MoveNext`.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and its behavior is undefined.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

This method is an O(1) operation.

## NameObjectCollectionBase+KeysCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the entire `KeysCollection` to a compatible one-dimensional `Array`, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `KeysCollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source `KeysCollection` is greater than the available space from `index` to the end of the destination `array`.
- `InvalidCastException`: The type of the source `KeysCollection` cannot be cast automatically to the type of the destination `array`.

#### Remarks
The specified array must be of a compatible type.

This method uses `Array.Copy` to copy the elements.

This method is an O(`n`) operation, where `n` is `KeysCollection.Count`.
