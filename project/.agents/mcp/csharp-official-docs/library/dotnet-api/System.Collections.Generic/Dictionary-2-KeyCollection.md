---
title: "Dictionary<TKey,TValue>+KeyCollection class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Dictionary`2+KeyCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Dictionary<TKey,TValue>+KeyCollection class

Namespace: `System.Collections.Generic`

```csharp
public sealed class Dictionary<TKey,TValue>.KeyCollection : System.Collections.Generic.ICollection<TKey>, System.Collections.Generic.IEnumerable<TKey>, System.Collections.Generic.IReadOnlyCollection<TKey>, System.Collections.ICollection
```

Represents the collection of keys in a `Dictionary<T1,T2>`. This class cannot be inherited.

#### Remarks
The `Keys` property returns an instance of this type, containing all the keys in that `Dictionary<T1,T2>`.  The order of the keys in the `KeyCollection` is unspecified, but it is the same order as the associated values in the `ValueCollection` returned by the `Values` property.

The `KeyCollection` is not a static copy; instead, the `KeyCollection` refers back to the keys in the original `Dictionary<T1,T2>`. Therefore, changes to the `Dictionary<T1,T2>` continue to be reflected in the `KeyCollection`.

## Dictionary<TKey,TValue>+KeyCollection.Dictionary(Dictionary<TKey,TValue>) constructor

```csharp
public KeyCollection (System.Collections.Generic.Dictionary<TKey,TValue> dictionary);
```

Initializes a new instance of the `KeyCollection` class that reflects the keys in the specified `Dictionary<T1,T2>`.

Parameters:

- `dictionary`: The `Dictionary<T1,T2>` whose keys are reflected in the new `KeyCollection`.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.

#### Remarks
The `KeyCollection` is not a static copy; instead, the `KeyCollection` refers back to the keys in the original `Dictionary<T1,T2>`. Therefore, changes to the `Dictionary<T1,T2>` continue to be reflected in the `KeyCollection`.

This constructor is an O(1) operation.

## Dictionary<TKey,TValue>+KeyCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `KeyCollection`.

Returns: The number of elements contained in the `KeyCollection`.

Retrieving the value of this property is an O(1) operation.

To be added.

## Dictionary<TKey,TValue>+KeyCollection.System.Collections.Generic.ICollection<TKey>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<TKey>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.  In the default implementation of `KeyCollection`, this property always returns `true`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

Retrieving the value of this property is an O(1) operation.

## Dictionary<TKey,TValue>+KeyCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.  In the default implementation of `KeyCollection`, this property always returns `false`.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection.

Retrieving the value of this property is an O(1) operation.

## Dictionary<TKey,TValue>+KeyCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.  In the default implementation of `KeyCollection`, this property always returns the current instance.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection. The following code shows the use of the `SyncRoot` property.

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

## Dictionary<TKey,TValue>+KeyCollection.Contains(TKey) method

```csharp
public bool Contains (TKey item);
```

Determines whether the `ICollection<T>` contains a specific value.

Parameters:

- `item`: The object to locate in the `ICollection<T>`.

Returns: `true` if `item` is found in the `ICollection<T>`; otherwise, `false`.

To be added.

## Dictionary<TKey,TValue>+KeyCollection.CopyTo(TKey[], Int32) method

```csharp
public void CopyTo (TKey[] array, int index);
```

Copies the `KeyCollection` elements to an existing one-dimensional `Array`, starting at the specified array index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `KeyCollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: The number of elements in the source `KeyCollection` is greater than the available space from `index` to the end of the destination `array`.

#### Remarks
The elements are copied to the `Array` in the same order in which the enumerator iterates through the `KeyCollection`.

This method is an O(`n`) operation, where `n` is `KeyCollection.Count`.

## Dictionary<TKey,TValue>+KeyCollection.GetEnumerator() method

```csharp
public System.Collections.Generic.Dictionary<TKey,TValue>.KeyCollection.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `KeyCollection`.

Returns: A `Enumerator` for the `KeyCollection`.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, `Enumerator.Current` is undefined. You must call `Enumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `Enumerator.Current`.

`Enumerator.Current` returns the same object until `Enumerator.MoveNext` is called. `Enumerator.MoveNext` sets `Enumerator.Current` to the next element.

If `Enumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `Enumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `Enumerator.MoveNext` also return `false`. If the last call to `Enumerator.MoveNext` returned `false`, `Enumerator.Current` is undefined. You cannot set `Enumerator.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding elements or changing the capacity, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

The only mutating methods that do not invalidate enumerators are `Dictionary<T1,T2>.Remove` and `Dictionary<T1,T2>.Clear`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in `Generic` are not synchronized.

This method is an O(1) operation.

## Dictionary<TKey,TValue>+KeyCollection.System.Collections.Generic.ICollection<TKey>.Add(TKey) method

```csharp
void ICollection<TKey>.Add (TKey item);
```

Adds an item to the `ICollection<T>`. This implementation always throws `NotSupportedException`.

Parameters:

- `item`: The object to add to the `ICollection<T>`.

Exceptions:

- `NotSupportedException`: Always thrown.

To be added.

## Dictionary<TKey,TValue>+KeyCollection.System.Collections.Generic.ICollection<TKey>.Clear() method

```csharp
void ICollection<TKey>.Clear ();
```

Removes all items from the `ICollection<T>`. This implementation always throws `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
`ICollection<T>.Count` is set to zero, and references to other objects from elements of the collection are also released.

## Dictionary<TKey,TValue>+KeyCollection.System.Collections.Generic.ICollection<TKey>.Remove(TKey) method

```csharp
bool ICollection<TKey>.Remove (TKey item);
```

Removes the first occurrence of a specific object from the `ICollection<T>`. This implementation always throws `NotSupportedException`.

Parameters:

- `item`: The object to remove from the `ICollection<T>`.

Returns: `true` if `item` was successfully removed from the `ICollection<T>`; otherwise, `false`. This method also returns `false` if item was not found in the original `ICollection<T>`.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
Implementations can vary in how they determine equality of objects; for example, `List<T>` uses `Comparer<T>.Default`, whereas, `Dictionary<T1,T2>` allows the user to specify the `IComparer<T>` implementation to use for comparing keys.

## Dictionary<TKey,TValue>+KeyCollection.System.Collections.Generic.IEnumerable<TKey>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<TKey> IEnumerable<TKey>.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator<T>` that can be used to iterate through the collection.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, `IEnumerator<T>.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator<T>.Current`.

`IEnumerator<T>.Current` returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IEnumerator<T>.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator<T>.Current` is undefined. You cannot set `IEnumerator<T>.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding elements or changing the capacity, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

The only mutating methods that do not invalidate enumerators are `Dictionary<T1,T2>.Remove` and `Dictionary<T1,T2>.Clear`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in `Generic` are not synchronized.

This method is an O(1) operation.

## Dictionary<TKey,TValue>+KeyCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ICollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional.

-or-

`array` does not have zero-based indexing.

-or-

The number of elements in the source `ICollection` is greater than the available space from `index` to the end of the destination `array`.

-or-

The type of the source `ICollection` cannot be cast automatically to the type of the destination `array`.

#### Remarks

> **Note:**
>  If the type of the source `ICollection` cannot be cast automatically to the type of the destination `array`, the non-generic implementations of `ICollection.CopyTo` throw `InvalidCastException`, whereas the generic implementations throw `ArgumentException`.

This method is an O(`n`) operation, where `n` is `KeyCollection.Count`.
