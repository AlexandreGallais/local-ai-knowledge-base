---
title: "BlockingCollection<T> class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/BlockingCollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BlockingCollection<T> class (part 2 of 4)

## BlockingCollection<T>.CompleteAdding() method

```csharp
public void CompleteAdding ();
```

Marks the `BlockingCollection<T>` instances as not accepting any more additions.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.

#### Remarks
After a collection has been marked as complete for adding, adding to the collection is not permitted and attempts to remove from the collection will not wait when the collection is empty.

## BlockingCollection<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int index);
```

Copies all of the items in the `BlockingCollection<T>` instance to a compatible one-dimensional array, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the `BlockingCollection<T>` instance. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.
- `ArgumentNullException`: The `array` argument is null.
- `ArgumentOutOfRangeException`: The `index` argument is less than zero.
- `ArgumentException`: The `index` argument is equal to or greater than the length of the `array`.

The destination array is too small to hold all of the BlockingCollection elements.

The array rank doesn't match.

The array type is incompatible with the type of the BlockingCollection elements.

#### Remarks
CopyTo represents a snapshot of the collection at a precise point in time. If other threads are adding or removing items while CopyTo is executing, then the elements returned by CopyTo might not represent the state of the collection.

## BlockingCollection<T>.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `BlockingCollection<T>` class.

#### Remarks
The `Dispose` method is not thread-safe.

Call `Dispose` when you are finished using the `BlockingCollection<T>`. The `Dispose` method leaves the `BlockingCollection<T>` in an unusable state. After calling `Dispose`, you must release all references to the `BlockingCollection<T>` so the garbage collector can reclaim the memory that the `BlockingCollection<T>` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
> Always call `Dispose` before you release your last reference to the `BlockingCollection<T>`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `BlockingCollection<T>` object's `Finalize` method.

## BlockingCollection<T>.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases resources used by the `BlockingCollection<T>` instance.

Parameters:

- `disposing`: Whether being disposed explicitly (true) or due to a finalizer (false).

To be added.

## BlockingCollection<T>.GetConsumingEnumerable() method

```csharp
public System.Collections.Generic.IEnumerable<T> GetConsumingEnumerable ();
```

Provides a consuming `IEnumerable<T>` for items in the collection.

Returns: An `IEnumerable<T>` that removes and returns items from the collection.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.

#### Examples
The following example shows how to use the `BlockingCollection<T>.GetConsumingEnumerable` method:

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/BlockingCollectionT/Overview/blockingcoll.cs._

## BlockingCollection<T>.GetConsumingEnumerable(CancellationToken) method

```csharp
public System.Collections.Generic.IEnumerable<T> GetConsumingEnumerable (System.Threading.CancellationToken <example-value>);
```

Provides a consuming `IEnumerable<T>` for items in the collection.

Parameters:

- `cancellationToken`: A cancellation token to observe.

Returns: An `IEnumerable<T>` that removes and returns items from the collection.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` is canceled.
- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed or the `CancellationTokenSource` that created `cancellationToken` has been disposed

#### Remarks
This method enables client code to remove items from the collection by using a foreach loop (For Each in Visual Basic), or `Parallel.ForEach` or a PLINQ query. The enumerator will continue to provide items (if any exist) until `BlockingCollection<T>.IsCompleted` returns true, and if `BlockingCollection<T>.IsCompleted` is false the loop blocks until an item becomes available or until the `CancellationToken` is cancelled.

## BlockingCollection<T>.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Provides an `IEnumerator<T>` for items in the collection.

Returns: An `IEnumerator<T>` for the items in the collection.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.

#### Remarks
Unlike `BlockingCollection<T>.GetConsumingEnumerable`, `BlockingCollection<T>.System%23Collections%23Generic%23IEnumerable%7BT%7D%23GetEnumerator` returns a standard enumerator that does not modify the underlying collection. If other threads are adding or removing elements concurrently when GetEnumerator is called, then the elements returned by the enumerator might not represent the current state of the collection.

## BlockingCollection<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies all of the items in the `BlockingCollection<T>` instance to a compatible one-dimensional array, starting at the specified index of the target array.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the `BlockingCollection<T>` instance. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.
- `ArgumentNullException`: The `array` argument is null.
- `ArgumentOutOfRangeException`: The `index` argument is less than zero.
- `ArgumentException`: The `index` argument is equal to or greater than the length of the `array`, the array is multidimensional, or the type parameter for the collection cannot be cast automatically to the type of the destination array.

To be added.

## BlockingCollection<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Provides an `IEnumerator` for items in the collection.

Returns: An `IEnumerator` for the items in the collection.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `BlockingCollection<T>` instance is cast to an `IEnumerable` interface.

## BlockingCollection<T>.Take() method

```csharp
public T Take ();
```

Removes an item from the `BlockingCollection<T>`.

Returns: The item that was removed from the collection.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.
- `InvalidOperationException`: The underlying collection was modified outside of this `BlockingCollection<T>` instance, or the `BlockingCollection<T>` is empty and has been marked as complete with regards to additions.

#### Remarks
A call to `BlockingCollection<T>.Take` may block until an item is available to be removed.

The order in which an item is removed depends on the type of collection used to create the `BlockingCollection<T>` instance. When you create a `BlockingCollection<T>` object, you can specify the type of collection to use. For example, you could specify a `ConcurrentQueue<T>` object for first in, first out (FIFO) behavior, or a `ConcurrentStack<T>` object for last in, first out (LIFO) behavior. You can use any collection class that implements the `IProducerConsumerCollection<T>` interface. The default collection type for `BlockingCollection<T>` is `ConcurrentQueue<T>`.

## BlockingCollection<T>.Take(CancellationToken) method

```csharp
public T Take (System.Threading.CancellationToken <example-value>);
```

Removes an item from the `BlockingCollection<T>`.

Parameters:

- `cancellationToken`: A token that can be used to cancel the "<example-value>" operation.

Returns: The item that was removed from the collection.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` is canceled.
- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.
- `InvalidOperationException`: The underlying collection was modified outside of this `BlockingCollection<T>` instance, or the `BlockingCollection<T>` is empty and has been marked as complete with regards to additions.

#### Remarks
A call to `BlockingCollection<T>.Take` may block until an item is available to be removed or the token is canceled.

The order in which an item is removed depends on the type of collection used to create the `BlockingCollection<T>` instance. When you create a `BlockingCollection<T>` object, you can specify the type of collection to use. For example, you could specify a `ConcurrentQueue<T>` object for first in, first out (FIFO) behavior, or a `ConcurrentStack<T>` object for last in, first out (LIFO) behavior. You can use any collection class that implements the `IProducerConsumerCollection<T>` interface. The default collection type for `BlockingCollection<T>` is `ConcurrentQueue<T>`.

## BlockingCollection<T>.TakeFromAny(BlockingCollection<T>[], T) method

```csharp
public static int TakeFromAny (System.Collections.Concurrent.BlockingCollection<T>[] collections, out T? item);
```

Takes an item from any one of the specified `BlockingCollection<T>` instances.

Parameters:

- `collections`: The array of collections.
- `item`: The item that was removed from one of the collections.

Returns: The index of the collection in the `collections` array from which the item was removed.

Exceptions:

- `ObjectDisposedException`: At least one of the `BlockingCollection<T>` instances has been disposed.
- `ArgumentNullException`: The `collections` argument is null.
- `ArgumentOutOfRangeException`: The count of `collections` is greater than the maximum size of 62 for STA and 63 for MTA.
- `ArgumentException`: The `collections` argument is a 0-length array or contains a null element or `BlockingCollection<T>.CompleteAdding` has been called on the collection.
- `InvalidOperationException`: At least one of the underlying collections was modified outside of its `BlockingCollection<T>` instance.

#### Remarks
A call to TakeFromAny may block until an item is available to be removed.

## BlockingCollection<T>.TakeFromAny(BlockingCollection<T>[], T, CancellationToken) method

```csharp
public static int TakeFromAny (System.Collections.Concurrent.BlockingCollection<T>[] collections, out T? item, System.Threading.CancellationToken <example-value>);
```

Takes an item from any one of the specified `BlockingCollection<T>` instances while observing the specified cancellation token.

Parameters:

- `collections`: The array of collections.
- `item`: The item that was removed from one of the collections.
- `cancellationToken`: A cancellation token to observe.

Returns: The index of the collection in the `collections` array from which the item was removed.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` is canceled.
- `InvalidOperationException`: At least one of the underlying collections was modified outside of its `BlockingCollection<T>` instance.
- `ArgumentNullException`: The `collections` argument is null.
- `ArgumentOutOfRangeException`: The count of `collections` is greater than the maximum size of 62 for STA and 63 for MTA.
- `ArgumentException`: The `collections` argument is a 0-length array or contains a null element, or `BlockingCollection<T>.CompleteAdding` has been called on the collection.
- `ObjectDisposedException`: At least one of the `BlockingCollection<T>` instances has been disposed.

#### Remarks
A call to TakeFromAny may block until an item is available to be removed. The method will return early with an OperationCanceledException if the token is canceled.

## BlockingCollection<T>.ToArray() method

```csharp
public T[] ToArray ();
```

Copies the items from the `BlockingCollection<T>` instance into a new array.

Returns: An array containing copies of the elements of the collection.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.

#### Remarks
The copied elements are not removed from the collection.

If any method in BlockingCollection is executing while the ToArray method executes, the return value is approximate. ToArray  may include items that have already been removed, or exclude items that have already been inserted.

## BlockingCollection<T>.TryAdd(T) method

```csharp
public bool TryAdd (T item);
```

Tries to add the specified item to the `BlockingCollection<T>`.

Parameters:

- `item`: The item to be added to the collection.

Returns: `true` if `item` could be added; otherwise, `false`. If the item is a duplicate, and the underlying collection does not accept duplicate items, then an `InvalidOperationException` is thrown.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.
- `InvalidOperationException`: The `BlockingCollection<T>` has been marked as complete with regards to additions.

-or-

The underlying collection didn't accept the item.

#### Remarks
If the collection is a bounded collection, and is full, this method immediately returns false without adding the item.

## BlockingCollection<T>.TryAdd(T, Int32) method

```csharp
public bool TryAdd (T item, int millisecondsTimeout);
```

Tries to add the specified item to the `BlockingCollection<T>` within the specified time period.

Parameters:

- `item`: The item to be added to the collection.
- `millisecondsTimeout`: The number of milliseconds to wait for the collection to accept the item, or `Timeout.Infinite` (-1) to wait indefinitely.

Returns: `true` if the `item` could be added to the collection within the specified time; otherwise, false. If the item is a duplicate, and the underlying collection does not accept duplicate items, then an `InvalidOperationException` is thrown.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `InvalidOperationException`: The `BlockingCollection<T>` has been marked as complete with regards to additions.

-or-

The underlying collection didn't accept the item.

To be added.
