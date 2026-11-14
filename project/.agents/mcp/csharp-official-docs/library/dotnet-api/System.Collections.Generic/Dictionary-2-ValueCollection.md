---
title: "Dictionary<TKey,TValue>+ValueCollection class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Dictionary`2+ValueCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Dictionary<TKey,TValue>+ValueCollection class

Namespace: `System.Collections.Generic`

```csharp
public sealed class Dictionary<TKey,TValue>.ValueCollection : System.Collections.Generic.ICollection<TValue>, System.Collections.Generic.IEnumerable<TValue>, System.Collections.Generic.IReadOnlyCollection<TValue>, System.Collections.ICollection
```

Represents the collection of values in a `Dictionary<T1,T2>`. This class cannot be inherited.

#### Remarks
The `Values` property returns an instance of this type, containing all the values in that `Dictionary<T1,T2>`.  The order of the values in the `ValueCollection` is unspecified, but it is the same order as the associated keys in the `KeyCollection` returned by the `Keys` property.

The `ValueCollection` is not a static copy; instead, the `ValueCollection` refers back to the values in the original `Dictionary<T1,T2>`. Therefore, changes to the `Dictionary<T1,T2>` continue to be reflected in the `ValueCollection`.

## Dictionary<TKey,TValue>+ValueCollection.Dictionary(Dictionary<TKey,TValue>) constructor

```csharp
public ValueCollection (System.Collections.Generic.Dictionary<TKey,TValue> dictionary);
```

Initializes a new instance of the `ValueCollection` class that reflects the values in the specified `Dictionary<T1,T2>`.

Parameters:

- `dictionary`: The `Dictionary<T1,T2>` whose values are reflected in the new `ValueCollection`.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.

#### Remarks
The `ValueCollection` is not a static copy; instead, the `ValueCollection` refers back to the values in the original `Dictionary<T1,T2>`. Therefore, changes to the `Dictionary<T1,T2>` continue to be reflected in the `ValueCollection`.

This constructor is an O(1) operation.

## Dictionary<TKey,TValue>+ValueCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `ValueCollection`.

Returns: The number of elements contained in the `ValueCollection`.

#### Remarks
Retrieving the value of this property is an O(1) operation.

## Dictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.ICollection<TValue>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<TValue>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.  In the default implementation of `ValueCollection`, this property always returns `true`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

Retrieving the value of this property is an O(1) operation.

## Dictionary<TKey,TValue>+ValueCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.  In the default implementation of `ValueCollection`, this property always returns `false`.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object, which can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection.

Retrieving the value of this property is an O(1) operation.

## Dictionary<TKey,TValue>+ValueCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.  In the default implementation of `ValueCollection`, this property always returns the current instance.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object, which can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection. The following code shows the use of the `SyncRoot` property.

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

## Dictionary<TKey,TValue>+ValueCollection.CopyTo(TValue[], Int32) method

```csharp
public void CopyTo (TValue[] array, int index);
```

Copies the `ValueCollection` elements to an existing one-dimensional `Array`, starting at the specified array index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ValueCollection`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: The number of elements in the source `ValueCollection` is greater than the available space from `index` to the end of the destination `array`.

#### Remarks
The elements are copied to the `Array` in the same order in which the enumerator iterates through the `ValueCollection`.

This method is an O(`n`) operation, where `n` is `ValueCollection.Count`.

## Dictionary<TKey,TValue>+ValueCollection.GetEnumerator() method

```csharp
public System.Collections.Generic.Dictionary<TKey,TValue>.ValueCollection.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `ValueCollection`.

Returns: A `Enumerator` for the `ValueCollection`.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, `Enumerator.Current` is undefined. You must call `Enumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `Enumerator.Current`.

The `Enumerator.Current` returns the same object until `Enumerator.MoveNext` is called. `Enumerator.MoveNext` sets `Enumerator.Current` to the next element.

If `Enumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `Enumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `Enumerator.MoveNext` also return `false`. If the last call to `Enumerator.MoveNext` returned `false`, `Enumerator.Current` is undefined. You cannot set `Enumerator.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding elements or changing the capacity, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

The only mutating methods that do not invalidate enumerators are `Dictionary<T1,T2>.Remove` and `Dictionary<T1,T2>.Clear`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in `Generic` are not synchronized.

This method is an O(1) operation.

## Dictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.ICollection<TValue>.Add(TValue) method

```csharp
void ICollection<TValue>.Add (TValue item);
```

Adds an item to the `ICollection<T>`.  This implementation always throws `NotSupportedException`.

Parameters:

- `item`: The object to add to the `ICollection<T>`.

Exceptions:

- `NotSupportedException`: Always thrown.

To be added.

## Dictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.ICollection<TValue>.Clear() method

```csharp
void ICollection<TValue>.Clear ();
```

Removes all items from the `ICollection<T>`.  This implementation always throws `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
`ICollection<T>.Count` is set to zero, and references to other objects from elements of the collection are also released.

## Dictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.ICollection<TValue>.Contains(TValue) method

```csharp
bool ICollection<TValue>.Contains (TValue item);
```

Determines whether the `ICollection<T>` contains a specific value.

Parameters:

- `item`: The object to locate in the `ICollection<T>`.

Returns: `true` if `item` is found in the `ICollection<T>`; otherwise, `false`.

#### Remarks
Implementations can vary in how they determine equality of objects; for example, `List<T>` uses `Comparer<T>.Default`, whereas, `Dictionary<T1,T2>` allows the user to specify the `IComparer<T>` implementation to use for comparing keys.

This method is an O(`n`) operation, where `n` is `ValueCollection.Count`.

## Dictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.ICollection<TValue>.Remove(TValue) method

```csharp
bool ICollection<TValue>.Remove (TValue item);
```

Removes the first occurrence of a specific object from the `ICollection<T>`. This implementation always throws `NotSupportedException`.

Parameters:

- `item`: The object to remove from the `ICollection<T>`.

Returns: `true` if `item` was successfully removed from the `ICollection<T>`; otherwise, `false`. This method also returns `false` if `item` was not found in the original `ICollection<T>`.

Exceptions:

- `NotSupportedException`: Always thrown.

#### Remarks
Implementations can vary in how they determine equality of objects; for example, `List<T>` uses `Comparer<T>.Default`, whereas, `Dictionary<T1,T2>` allows the user to specify the `IComparer<T>` implementation to use for comparing keys.

## Dictionary<TKey,TValue>+ValueCollection.System.Collections.Generic.IEnumerable<TValue>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<TValue> IEnumerable<TValue>.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator<T>` that can be used to iterate through the collection.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators.  Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, `IEnumerator<T>.Current` is undefined. Therefore, you must call `IEnumerator.MoveNext` to advance the enumerator to the first element of the collection before reading the value of `IEnumerator<T>.Current`.

`IEnumerator<T>.Current` returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IEnumerator<T>.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return `false`. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator<T>.Current` is undefined. You cannot set `IEnumerator<T>.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding elements or changing the capacity, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

The only mutating methods that do not invalidate enumerators are `Dictionary<T1,T2>.Remove` and `Dictionary<T1,T2>.Clear`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in `Generic` are not synchronized.

This method is an O(1) operation.
