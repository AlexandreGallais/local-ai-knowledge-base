---
title: "ConcurrentQueue<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/ConcurrentQueue`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConcurrentQueue<T> class

Namespace: `System.Collections.Concurrent`

```csharp
public class ConcurrentQueue<T> : System.Collections.Concurrent.IProducerConsumerCollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.ICollection
```

Represents a thread-safe first in-first out (FIFO) collection.

Parameters:

- `T`: The type of the elements contained in the queue.

#### Examples

The following example shows how to use a `ConcurrentQueue<T>` to enqueue and dequeue items:

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/ConcurrentQueueT/Overview/concqueue.cs._

## ConcurrentQueue<T>.ConcurrentQueue() constructor

```csharp
public ConcurrentQueue ();
```

Initializes a new instance of the `ConcurrentQueue<T>` class.

To be added.

## ConcurrentQueue<T>.ConcurrentQueue(IEnumerable<T>) constructor

```csharp
public ConcurrentQueue (System.Collections.Generic.IEnumerable<T> collection);
```

Initializes a new instance of the `ConcurrentQueue<T>` class that contains elements copied from the specified collection.

Parameters:

- `collection`: The collection whose elements are copied to the new `ConcurrentQueue<T>`.

Exceptions:

- `ArgumentNullException`: The `collection` argument is null.

To be added.

## ConcurrentQueue<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `ConcurrentQueue<T>`.

Returns: The number of elements contained in the `ConcurrentQueue<T>`.

#### Remarks
For determining whether the collection contains any items, use of the `IsEmpty` property is recommended rather than retrieving the number of items from the `Count` property and comparing it to 0.

## ConcurrentQueue<T>.IsEmpty property

```csharp
public bool IsEmpty { get; }
```

Gets a value that indicates whether the `ConcurrentQueue<T>` is empty.

Returns: `true` if the `ConcurrentQueue<T>` is empty; otherwise, `false`.

#### Remarks
For determining whether the collection contains any items, use of this property is recommended rather than retrieving the number of items from the `Count` property and comparing it to 0. However, as this collection is intended to be accessed concurrently, it may be the case that another thread will modify the collection after `ConcurrentQueue<T>.IsEmpty` returns, thus invalidating the result.

## ConcurrentQueue<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized with the SyncRoot.

Returns: Always returns `false` to indicate access is not synchronized.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConcurrentQueue<T>` instance is cast to an `ICollection` interface.

## ConcurrentQueue<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`. This property is not supported.

Returns: Returns `null`.

Exceptions:

- `NotSupportedException`: The SyncRoot property is not supported.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConcurrentQueue<T>` instance is cast to an `ICollection` interface.

## ConcurrentQueue<T>.Clear() method

```csharp
public void Clear ();
```

Removes all objects from the `ConcurrentQueue<T>`.

To be added.

## ConcurrentQueue<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int index);
```

Copies the `ConcurrentQueue<T>` elements to an existing one-dimensional `Array`, starting at the specified array index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from the `ConcurrentQueue<T>`. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is a null reference (Nothing in Visual Basic).
- `ArgumentOutOfRangeException`: `index` is less than zero.
- `ArgumentException`: `index` is equal to or greater than the length of the `array` -or- The number of elements in the source `ConcurrentQueue<T>` is greater than the available space from `index` to the end of the destination `array`.

To be added.

## ConcurrentQueue<T>.Enqueue(T) method

```csharp
public void Enqueue (T item);
```

Adds an object to the end of the `ConcurrentQueue<T>`.

Parameters:

- `item`: The object to add to the end of the `ConcurrentQueue<T>`. The value can be a null reference (Nothing in Visual Basic) for reference types.

To be added.

## ConcurrentQueue<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<T> GetEnumerator ();
```

Returns an enumerator that iterates through the `ConcurrentQueue<T>`.

Returns: An enumerator for the contents of the `ConcurrentQueue<T>`.

#### Remarks
The enumeration represents a moment-in-time snapshot of the contents of the queue. It does not reflect any updates to the collection after `ConcurrentQueue<T>.GetEnumerator` was called. The enumerator is safe to use concurrently with reads from and writes to the queue.

The enumerator returns the collection elements in the order in which they were added, which is FIFO order (first-in, first-out).

## ConcurrentQueue<T>.System.Collections.Concurrent.IProducerConsumerCollection<T>.TryAdd(T) method

```csharp
bool IProducerConsumerCollection<T>.TryAdd (T item);
```

Attempts to add an object to the `IProducerConsumerCollection<T>`.

Parameters:

- `item`: The object to add to the `IProducerConsumerCollection<T>`. The value can be a null reference (Nothing in Visual Basic) for reference types.

Returns: `true` if the object was added successfully; otherwise, `false`.

#### Remarks
For `ConcurrentQueue<T>`, this operation will always add the object to the end of the `ConcurrentQueue<T>` and return true.

## ConcurrentQueue<T>.System.Collections.Concurrent.IProducerConsumerCollection<T>.TryTake(T) method

```csharp
bool IProducerConsumerCollection<T>.TryTake (out T item);
```

Attempts to remove and return an object from the `IProducerConsumerCollection<T>`.

Parameters:

- `item`: When this method returns, if the operation was successful, `item` contains the object removed. If no object was available to be removed, the value is unspecified.

Returns: `true` if an element was removed and returned successfully; otherwise, `false`.

#### Remarks
For `ConcurrentQueue<T>`, this operation will attempt to remove the object from the beginning of the `ConcurrentQueue<T>`.

## ConcurrentQueue<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

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

## ConcurrentQueue<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ConcurrentQueue<T>` instance is cast to an `IEnumerable` interface.

## ConcurrentQueue<T>.ToArray() method

```csharp
public T[] ToArray ();
```

Copies the elements stored in the `ConcurrentQueue<T>` to a new array.

Returns: A new array containing a snapshot of elements copied from the `ConcurrentQueue<T>`.

To be added.

## ConcurrentQueue<T>.TryDequeue(T) method

```csharp
public bool TryDequeue (out T result);
```

Tries to remove and return the object at the beginning of the concurrent queue.

Parameters:

- `result`: When this method returns, if the operation was successful, `result` contains the object removed. If no object was available to be removed, the value is unspecified.

Returns: `true` if an element was removed and returned from the beginning of the `ConcurrentQueue<T>` successfully; otherwise, `false`.

#### Remarks
`ConcurrentQueue<T>` handles all synchronization internally. If two threads call `ConcurrentQueue<T>.TryDequeue` at precisely the same moment, neither operation is blocked. When a conflict is detected between two threads, one thread has to try again to retrieve the next element, and the synchronization is handled internally.

`ConcurrentQueue<T>.TryDequeue` tries to remove an element from the queue. If the method is successful, the item is removed and the method returns `true`; otherwise, it returns `false`. That happens atomically with respect to other operations on the queue. If the queue was populated with code such as `q.Enqueue("a"); q.Enqueue("b"); q.Enqueue("c");` and two threads concurrently try to dequeue an element, one thread will dequeue `a` and the other thread will dequeue `b`. Both calls to `ConcurrentQueue<T>.TryDequeue` will return `true`, because they were both able to dequeue an element. If each thread goes back to dequeue an additional element, one of the threads will dequeue `c` and return `true`, whereas the other thread will find the queue empty and will return `false`.

## ConcurrentQueue<T>.TryPeek(T) method

```csharp
public bool TryPeek (out T result);
```

Tries to return an object from the beginning of the `ConcurrentQueue<T>` without removing it.

Parameters:

- `result`: When this method returns, `result` contains an object from the beginning of the `ConcurrentQueue<T>` or an unspecified value if the operation failed.

Returns: `true` if an object was returned successfully; otherwise, `false`.

#### Remarks

For determining whether the collection contains any items, use of the `IsEmpty` property is recommended rather than peeking.
