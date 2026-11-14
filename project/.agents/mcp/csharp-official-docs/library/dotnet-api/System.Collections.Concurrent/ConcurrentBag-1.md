---
title: "ConcurrentBag<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/ConcurrentBag`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConcurrentBag<T> class

Namespace: `System.Collections.Concurrent`

```csharp
public class ConcurrentBag<T> : System.Collections.Concurrent.IProducerConsumerCollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.ICollection
```

Represents a thread-safe, unordered collection of objects.

Parameters:

- `T`: The type of the elements to be stored in the collection.

#### Remarks
Bags are useful for storing objects when ordering doesn't matter, and unlike sets, bags support duplicates. `ConcurrentBag<T>` is a thread-safe bag implementation, optimized for scenarios where the same thread will be both producing and consuming data stored in the bag.

`ConcurrentBag<T>` accepts `null` as a valid value for reference types.

For more information, see the entry FAQ: Are all of the new concurrent collections lock-free? in the Parallel Programming with .NET blog.

#### Examples
The following example shows how to add and remove items from a `ConcurrentBag<T>`:

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/ConcurrentBag/concbag.cs._

## ConcurrentBag<T>.ConcurrentBag() constructor

```csharp
public ConcurrentBag ();
```

Initializes a new instance of the `ConcurrentBag<T>` class.

To be added.

## ConcurrentBag<T>.ConcurrentBag(IEnumerable<T>) constructor

```csharp
public ConcurrentBag (System.Collections.Generic.IEnumerable<T> collection);
```

Initializes a new instance of the `ConcurrentBag<T>` class that contains elements copied from the specified collection.

Parameters:

- `collection`: The collection whose elements are copied to the new `ConcurrentBag<T>`.

Exceptions:

- `ArgumentNullException`: `collection` is a null reference (Nothing in Visual Basic).

To be added.

## ConcurrentBag<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `ConcurrentBag<T>`.

Returns: The number of elements contained in the `ConcurrentBag<T>`.

#### Remarks
The count returned represents a moment-in-time snapshot of the contents of the bag. It is possible that other threads might add or remove items immediately after you access the `Count` property.

## ConcurrentBag<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether the `ConcurrentBag<T>` is empty.

Returns: `true` if the `ConcurrentBag<T>` is empty; otherwise, `false`.

To be added.

## ConcurrentBag<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized with the SyncRoot.

Returns: Always returns `false` to indicate access is not synchronized.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConcurrentBag<T>` instance is cast to an `ICollection` interface.

## ConcurrentBag<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`. This property is not supported.

Returns: Returns `null`.

Exceptions:

- `NotSupportedException`: The SyncRoot property is not supported.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConcurrentBag<T>` instance is cast to an `ICollection` interface.

## ConcurrentBag<T>.Add(T) method

```csharp
public void Add (T item);
```

Adds an object to the `ConcurrentBag<T>`.

Parameters:

- `item`: The object to be added to the `ConcurrentBag<T>`. The value can be a null reference (Nothing in Visual Basic) for reference types.

To be added.

## ConcurrentBag<T>.Clear() method

```csharp
public void Clear ();
```

Removes all values from the `ConcurrentBag<T>`.

To be added.

## ConcurrentBag<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int index);
```

Copies the `ConcurrentBag<T>` elements to an existing one-dimensional `Array`, starting at the specified array index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from the `ConcurrentBag<T>`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is a null reference (Nothing in Visual Basic).
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `index` is equal to or greater than the length of the `array` -or- the number of elements in the source `ConcurrentBag<T>` is greater than the available space from `index` to the end of the destination `array`.

To be added.

## ConcurrentBag<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<T> GetEnumerator ();
```

Returns an enumerator that iterates through the `ConcurrentBag<T>`.

Returns: An enumerator for the contents of the `ConcurrentBag<T>`.

#### Remarks
The enumeration represents a moment-in-time snapshot of the contents of the bag. It does not reflect any updates to the collection after `ConcurrentBag<T>.GetEnumerator` was called. The enumerator is safe to use concurrently with reads from and writes to the bag.

## ConcurrentBag<T>.System.Collections.Concurrent.IProducerConsumerCollection<T>.TryAdd(T) method

```csharp
bool IProducerConsumerCollection<T>.TryAdd (T item);
```

Attempts to add an object to the `ConcurrentBag<T>`.

Parameters:

- `item`: The object to be added to the `ConcurrentBag<T>`. The value can be a null reference (Nothing in Visual Basic) for reference types.

Returns: Always returns true.

To be added.

## ConcurrentBag<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection` to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from the `ConcurrentBag<T>`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is a null reference (Nothing in Visual Basic).
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `array` is multidimensional. -or- `array` does not have zero-based indexing. -or- `index` is equal to or greater than the length of the `array` -or- The number of elements in the source `ICollection` is greater than the available space from `index` to the end of the destination `array`. -or- The type of the source `ICollection` cannot be cast automatically to the type of the destination `array`.

To be added.

## ConcurrentBag<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the `ConcurrentBag<T>`.

Returns: An enumerator for the contents of the `ConcurrentBag<T>`.

#### Remarks
The items enumerated represent a moment-in-time snapshot of the contents of the bag. It does not reflect any update to the collection after `ConcurrentBag<T>.GetEnumerator` was called.

## ConcurrentBag<T>.ToArray() method

```csharp
public T[] ToArray ();
```

Copies the `ConcurrentBag<T>` elements to a new array.

Returns: A new array containing a snapshot of elements copied from the `ConcurrentBag<T>`.

To be added.

## ConcurrentBag<T>.TryPeek(T) method

```csharp
public bool TryPeek (out T result);
```

Attempts to return an object from the `ConcurrentBag<T>` without removing it.

Parameters:

- `result`: When this method returns, `result` contains an object from the `ConcurrentBag<T>` or the default value of `T` if the operation failed.

Returns: `true` if an object was returned successfully; otherwise, `false`.

To be added.

## ConcurrentBag<T>.TryTake(T) method

```csharp
public bool TryTake (out T result);
```

Attempts to remove and return an object from the `ConcurrentBag<T>`.

Parameters:

- `result`: When this method returns, `result` contains the object removed from the `ConcurrentBag<T>` or the default value of `T` if the bag is empty.

Returns: `true` if an object was removed successfully; otherwise, `false`.

To be added.
