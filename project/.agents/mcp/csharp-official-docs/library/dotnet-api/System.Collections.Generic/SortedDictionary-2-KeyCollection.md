---
title: "SortedDictionary<TKey,TValue>+KeyCollection class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedDictionary`2+KeyCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedDictionary<TKey,TValue>+KeyCollection class

Namespace: `System.Collections.Generic`

```csharp
public sealed class SortedDictionary<TKey,TValue>.KeyCollection : System.Collections.Generic.ICollection<TKey>, System.Collections.Generic.IEnumerable<TKey>, System.Collections.Generic.IReadOnlyCollection<TKey>, System.Collections.ICollection
```

Represents the collection of keys in a `SortedDictionary<T1,T2>`. This class cannot be inherited.

#### Remarks
The `Keys` property returns an instance of this type, containing all the keys in that `SortedDictionary<T1,T2>`.  The order of the keys in the `KeyCollection` is the same as the order of elements in the `SortedDictionary<T1,T2>`, the same as the order of the associated values in the `ValueCollection` returned by the `Values` property.

The `KeyCollection` is not a static copy; instead, the `KeyCollection` refers back to the keys in the original `SortedDictionary<T1,T2>`. Therefore, changes to the `SortedDictionary<T1,T2>` continue to be reflected in the `KeyCollection`.

## SortedDictionary<TKey,TValue>+KeyCollection.SortedDictionary(SortedDictionary<TKey,TValue>) constructor

```csharp
public KeyCollection (System.Collections.Generic.SortedDictionary<TKey,TValue> dictionary);
```

Initializes a new instance of the `KeyCollection` class that reflects the keys in the specified `SortedDictionary<T1,T2>`.

Parameters:

- `dictionary`: The `SortedDictionary<T1,T2>` whose keys are reflected in the new `KeyCollection`.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.

#### Remarks
The `KeyCollection` is not a static copy; instead, the `KeyCollection` refers back to the keys in the original `SortedDictionary<T1,T2>`. Therefore, changes to the `SortedDictionary<T1,T2>` continue to be reflected in the `KeyCollection`.

This constructor is an O(1) operation.

## SortedDictionary<TKey,TValue>+KeyCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `KeyCollection`.

Returns: The number of elements contained in the `KeyCollection`.

#### Remarks
Getting the value of this property is an O(1) operation.

## SortedDictionary<TKey,TValue>+KeyCollection.System.Collections.Generic.ICollection<TKey>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<TKey>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.  In the default implementation of `KeyCollection`, this property always returns `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

Getting the value of this property is an O(1) operation.

## SortedDictionary<TKey,TValue>+KeyCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.  In the default implementation of `KeyCollection`, this property always returns `false`.

#### Remarks
Default implementations of collections in the `Generic` namespace are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

The `SyncRoot` property returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock the object before accessing the collection.

Getting the value of this property is an O(1) operation.

## SortedDictionary<TKey,TValue>+KeyCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.  In the default implementation of `KeyCollection`, this property always returns the current instance.

#### Remarks
Default implementations of collections in the `Generic` namespace are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

The `SyncRoot` property returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock the object before accessing the collection. The following code shows the use of the `SyncRoot` property.

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

## SortedDictionary<TKey,TValue>+KeyCollection.Contains(TKey) method

```csharp
public bool Contains (TKey item);
```

Determines whether the `ICollection<T>` contains a specific value.

Parameters:

- `item`: The object to locate in the `ICollection<T>`.

Returns: `true` if `item` is found in the `ICollection<T>`; otherwise, `false`.

To be added.

## SortedDictionary<TKey,TValue>+KeyCollection.CopyTo(TKey[], Int32) method

```csharp
public void CopyTo (TKey[] array, int index);
```

Copies the `KeyCollection` elements to an existing one-dimensional array, starting at the specified array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the `KeyCollection`. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0.
- `ArgumentException`: The number of elements in the source `KeyCollection` is greater than the available space from `index` to the end of the destination `array`.

#### Remarks
The elements are copied to the array in the same order in which the enumerator iterates through the `KeyCollection`.

This method is an O(`n`) operation, where `n` is `KeyCollection.Count`.

## SortedDictionary<TKey,TValue>+KeyCollection.GetEnumerator() method

```csharp
public System.Collections.Generic.SortedDictionary<TKey,TValue>.KeyCollection.Enumerator GetEnumerator ();
```

Returns an enumerator that iterates through the `KeyCollection`.

Returns: A `Enumerator` structure for the `KeyCollection`.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, `Enumerator.Current` is undefined. You must call the `Enumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `Enumerator.Current`.

The `Current` property returns the same object until `Enumerator.MoveNext` is called. `Enumerator.MoveNext` sets `Enumerator.Current` to the next element.

If `Enumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `Enumerator.MoveNext` returns `false`. When the enumerator is at this position, subsequent calls to `Enumerator.MoveNext` also return `false`. If the last call to `Enumerator.MoveNext` returned `false`, `Enumerator.Current` is undefined. You cannot set `Enumerator.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `Enumerator.MoveNext` or `Enumerator.System%23Collections%23IEnumerator%23Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

This method is an O(log n) operation where n is a number of elements in a collection.

## SortedDictionary<TKey,TValue>+KeyCollection.System.Collections.Generic.ICollection<TKey>.Add(TKey) method

```csharp
void ICollection<TKey>.Add (TKey item);
```

Adds an item to the `ICollection<T>`.  This implementation always throws a `NotSupportedException`.

Parameters:

- `item`: The object to add to the `ICollection<T>`.

Exceptions:

- `NotSupportedException`: Always thrown; the collection is read-only.

To be added.

## SortedDictionary<TKey,TValue>+KeyCollection.System.Collections.Generic.ICollection<TKey>.Clear() method

```csharp
void ICollection<TKey>.Clear ();
```

Removes all items from the `ICollection<T>`.  This implementation always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Always thrown; the collection is read-only.

#### Remarks
The `Count` property is set to 0, and references to other objects from elements of the collection are also released.

## SortedDictionary<TKey,TValue>+KeyCollection.System.Collections.Generic.ICollection<TKey>.Remove(TKey) method

```csharp
bool ICollection<TKey>.Remove (TKey item);
```

Removes the first occurrence of a specific object from the `ICollection<T>`.  This implementation always throws a `NotSupportedException`.

Parameters:

- `item`: The object to remove from the `ICollection<T>`.

Returns: `true` if item is successfully removed from the `ICollection<T>`; otherwise, `false`. This method also returns `false` if item is not found in the `ICollection<T>`.

Exceptions:

- `NotSupportedException`: Always thrown; the collection is read-only.

#### Remarks
Implementations can vary in how they determine equality of objects; for example, `List<T>` uses `Comparer<T>.Default`, whereas `SortedDictionary<T1,T2>` allows the user to specify the `IComparer<T>` implementation to use for comparing keys.

## SortedDictionary<TKey,TValue>+KeyCollection.System.Collections.Generic.IEnumerable<TKey>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<TKey> IEnumerable<TKey>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An `IEnumerator<T>` that can be used to iterate through the collection.

#### Remarks
The `foreach` statement of the C# language (`For Each` in Visual Basic) hides the complexity of the enumerators. Therefore, using `foreach` is recommended, instead of directly manipulating the enumerator.

Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

Initially, the enumerator is positioned before the first element in the collection. At this position, the `Current` property is undefined. Therefore, you must call the `IEnumerator.MoveNext` method to advance the enumerator to the first element of the collection before reading the value of `IEnumerator<T>.Current`.

The `Current` property returns the same object until `IEnumerator.MoveNext` is called. `IEnumerator.MoveNext` sets `IEnumerator<T>.Current` to the next element.

If `IEnumerator.MoveNext` passes the end of the collection, the enumerator is positioned after the last element in the collection and `IEnumerator.MoveNext` returns false. When the enumerator is at this position, subsequent calls to `IEnumerator.MoveNext` also return false. If the last call to `IEnumerator.MoveNext` returned `false`, `IEnumerator<T>.Current` is undefined. You cannot set `IEnumerator<T>.Current` to the first element of the collection again; you must create a new enumerator instance instead.

An enumerator remains valid as long as the collection remains unchanged. If changes are made to the collection, such as adding, modifying, or deleting elements, the enumerator is irrecoverably invalidated and the next call to `IEnumerator.MoveNext` or `IEnumerator.Reset` throws an `InvalidOperationException`.

The enumerator does not have exclusive access to the collection; therefore, enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

Default implementations of collections in the `Generic` namespace are not synchronized.

This method is an O(log n) operation where n is a number of elements in a collection.

## SortedDictionary<TKey,TValue>+KeyCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection` to an array, starting at a particular array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the `ICollection`. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0.
- `ArgumentException`: `array` is multidimensional.

-or-

`array` does not have zero-based indexing.

-or-

The number of elements in the source `ICollection` is greater than the available space from `index` to the end of the destination `array`.

-or-

The type of the source `ICollection` cannot be cast automatically to the type of the destination `array`.

#### Remarks

> **Note:**
>  If the type of the source `ICollection` cannot be cast automatically to the type of the destination `array`, the nongeneric implementations of `ICollection.CopyTo` throw an `InvalidCastException`, whereas the generic implementations throw an `ArgumentException`.

This method is an O(`n`) operation, where `n` is `KeyCollection.Count`.
