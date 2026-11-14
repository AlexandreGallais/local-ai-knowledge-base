---
title: "BlockingCollection<T> class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/BlockingCollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BlockingCollection<T> class (part 3 of 4)

## BlockingCollection<T>.TryAdd(T, TimeSpan) method

```csharp
public bool TryAdd (T item, TimeSpan timeout);
```

Tries to add the specified item to the `BlockingCollection<T>`.

Parameters:

- `item`: The item to be added to the collection.
- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.

Returns: `true` if the `item` could be added to the collection within the specified time span; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `InvalidOperationException`: The `BlockingCollection<T>` has been marked as complete with regards to additions.

-or-

The underlying collection didn't accept the item.

To be added.

## BlockingCollection<T>.TryAdd(T, Int32, CancellationToken) method

```csharp
public bool TryAdd (T item, int millisecondsTimeout, System.Threading.CancellationToken <example-value>);
```

Tries to add the specified item to the `BlockingCollection<T>` within the specified time period, while observing a cancellation token.

Parameters:

- `item`: The item to be added to the collection.
- `millisecondsTimeout`: The number of milliseconds to wait for the collection to accept the item, or `Timeout.Infinite` (-1) to wait indefinitely.
- `cancellationToken`: A cancellation token to observe.

Returns: `true` if the `item` could be added to the collection within the specified time; otherwise, false. If the item is a duplicate, and the underlying collection does not accept duplicate items, then an `InvalidOperationException` is thrown.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` is canceled.
- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed or the underlying `CancellationTokenSource` has been disposed.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `InvalidOperationException`: The `BlockingCollection<T>` has been marked as complete with regards to additions.

-or-

The underlying collection didn't accept the item.

To be added.

## BlockingCollection<T>.TryAddToAny(BlockingCollection<T>[], T) method

```csharp
public static int TryAddToAny (System.Collections.Concurrent.BlockingCollection<T>[] collections, T item);
```

Tries to add the specified item to any one of the specified `BlockingCollection<T>` instances.

Parameters:

- `collections`: The array of collections.
- `item`: The item to be added to one of the collections.

Returns: The index of the collection in the `collections` array to which the item was added, or -1 if the item could not be added.

Exceptions:

- `ObjectDisposedException`: At least one of the `BlockingCollection<T>` instances has been disposed.
- `ArgumentNullException`: The `collections` argument is null.
- `ArgumentOutOfRangeException`: The count of `collections` is greater than the maximum size of 62 for STA and 63 for MTA.
- `ArgumentException`: The `collections` argument is a 0-length array or contains a null element, or at least one of collections has been marked as complete for adding.
- `InvalidOperationException`: At least one underlying collection didn't accept the item.

To be added.

## BlockingCollection<T>.TryAddToAny(BlockingCollection<T>[], T, Int32) method

```csharp
public static int TryAddToAny (System.Collections.Concurrent.BlockingCollection<T>[] collections, T item, int millisecondsTimeout);
```

Tries to add the specified item to any one of the specified `BlockingCollection<T>` instances.

Parameters:

- `collections`: The array of collections.
- `item`: The item to be added to one of the collections.
- `millisecondsTimeout`: The number of milliseconds to wait for the collection to accept the item, or `Timeout.Infinite` (-1) to wait indefinitely.

Returns: The index of the collection in the `collections` array to which the item was added, or -1 if the item could not be added.

Exceptions:

- `ObjectDisposedException`: At least one of the `BlockingCollection<T>` instances has been disposed.
- `ArgumentNullException`: The `collections` argument is null.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.

-or-

The count of `collections` is greater than the maximum size of 62 for STA and 63 for MTA.
- `ArgumentException`: The `collections` argument is a 0-length array or contains a null element, or at least one of collections has been marked as complete for adding.
- `InvalidOperationException`: At least one underlying collection didn't accept the item.

To be added.

## BlockingCollection<T>.TryAddToAny(BlockingCollection<T>[], T, TimeSpan) method

```csharp
public static int TryAddToAny (System.Collections.Concurrent.BlockingCollection<T>[] collections, T item, TimeSpan timeout);
```

Tries to add the specified item to any one of the specified `BlockingCollection<T>` instances.

Parameters:

- `collections`: The array of collections.
- `item`: The item to be added to one of the collections.
- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.

Returns: The index of the collection in the `collections` array to which the item was added, or -1 if the item could not be added.

Exceptions:

- `ObjectDisposedException`: At least one of the `BlockingCollection<T>` instances has been disposed.
- `ArgumentNullException`: The `collections` argument is null.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

-or-

The count of `collections` is greater than the maximum size of 62 for STA and 63 for MTA.
- `ArgumentException`: The `collections` argument is a 0-length array or contains a null element, or at least one of collections has been marked as complete for adding.
- `InvalidOperationException`: At least one underlying collection didn't accept the item.

To be added.

## BlockingCollection<T>.TryAddToAny(BlockingCollection<T>[], T, Int32, CancellationToken) method

```csharp
public static int TryAddToAny (System.Collections.Concurrent.BlockingCollection<T>[] collections, T item, int millisecondsTimeout, System.Threading.CancellationToken <example-value>);
```

Tries to add the specified item to any one of the specified `BlockingCollection<T>` instances while observing the specified cancellation token.

Parameters:

- `collections`: The array of collections.
- `item`: The item to be added to one of the collections.
- `millisecondsTimeout`: The number of milliseconds to wait for the collection to accept the item, or `Timeout.Infinite` (-1) to wait indefinitely.
- `cancellationToken`: A cancellation token to observe.

Returns: The index of the collection in the `collections` array to which the item was added, or -1 if the item could not be added.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` is canceled.
- `InvalidOperationException`: At least one underlying collection didn't accept the item.
- `ArgumentNullException`: The `collections` argument is null.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.

-or-

The count of `collections` is greater than the maximum size of 62 for STA and 63 for MTA.
- `ArgumentException`: The `collections` argument is a 0-length array or contains a null element, or at least one of collections has been marked as complete for adding.
- `ObjectDisposedException`: At least one of the `BlockingCollection<T>` instances has been disposed.

#### Remarks
This method throws an `OperationCanceledException` if `cancellationToken` is canceled before space becomes available for the add operation.

## BlockingCollection<T>.TryTake(T) method

```csharp
public bool TryTake (out T item);
```

Tries to remove an item from the `BlockingCollection<T>`.

Parameters:

- `item`: The item to be removed from the collection.

Returns: `true` if an item could be removed; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.
- `InvalidOperationException`: The underlying collection was modified outside of this `BlockingCollection<T>` instance.

#### Remarks
If the collection is empty, this method immediately returns false.

The order in which an item is removed depends on the type of collection used to create the `BlockingCollection<T>` instance. When you create a `BlockingCollection<T>` object, you can specify the type of collection to use. For example, you could specify a `ConcurrentQueue<T>` object for first in, first out (FIFO) behavior, or a `ConcurrentStack<T>` object for last in, first out (LIFO) behavior. You can use any collection class that implements the `IProducerConsumerCollection<T>` interface. The default collection type for `BlockingCollection<T>` is `ConcurrentQueue<T>`.

## BlockingCollection<T>.TryTake(T, Int32) method

```csharp
public bool TryTake (out T item, int millisecondsTimeout);
```

Tries to remove an item from the `BlockingCollection<T>` in the specified time period.

Parameters:

- `item`: The item to be removed from the collection.
- `millisecondsTimeout`: The number of milliseconds to wait for the item to be removed, or `Timeout.Infinite` (-1) to wait indefinitely.

Returns: `true` if an item could be removed from the collection within the specified  time; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `InvalidOperationException`: The underlying collection was modified outside of this `BlockingCollection<T>` instance.

#### Remarks
The order in which an item is removed depends on the type of collection used to create the `BlockingCollection<T>` instance. When you create a `BlockingCollection<T>`, you can specify the type of collection to use. For example, you could specify a `ConcurrentQueue<T>` object for first in, first out (FIFO) behavior, or a `ConcurrentStack<T>` object for last in, first out (LIFO) behavior. You can use any collection class that implements the `IProducerConsumerCollection<T>` interface. The default collection type for `BlockingCollection<T>` is `ConcurrentQueue<T>`.

## BlockingCollection<T>.TryTake(T, TimeSpan) method

```csharp
public bool TryTake (out T item, TimeSpan timeout);
```

Tries to remove an item from the `BlockingCollection<T>` in the specified time period.

Parameters:

- `item`: The item to be removed from the collection.
- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait for the item to be removed, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.

Returns: `true` if an item could be removed from the collection within the specified time; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `InvalidOperationException`: The underlying collection was modified outside of this `BlockingCollection<T>` instance.

#### Remarks
The order in which an item is removed depends on the type of collection used to create the `BlockingCollection<T>` instance. When you create a `BlockingCollection<T>` object, you can specify the type of collection to use. For example, you could specify a `ConcurrentQueue<T>` object for first in, first out (FIFO) behavior, or a `ConcurrentStack<T>` object for last in, first out (LIFO) behavior. You can use any collection class that implements the `IProducerConsumerCollection<T>` interface. The default collection type for `BlockingCollection<T>` is `ConcurrentQueue<T>`.

## BlockingCollection<T>.TryTake(T, Int32, CancellationToken) method

```csharp
public bool TryTake (out T item, int millisecondsTimeout, System.Threading.CancellationToken <example-value>);
```

Tries to remove an item from the `BlockingCollection<T>` in the specified time period while observing a cancellation token.

Parameters:

- `item`: The item to be removed from the collection.
- `millisecondsTimeout`: The number of milliseconds to wait for the item to be removed, or `Timeout.Infinite` (-1) to wait indefinitely.
- `cancellationToken`: A cancellation token to observe.

Returns: `true` if an item could be removed from the collection within the specified  time; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` has been canceled.
- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed or the underlying `CancellationTokenSource` has been disposed.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `InvalidOperationException`: The underlying collection was modified outside this `BlockingCollection<T>` instance.

#### Remarks
The order in which an item is removed depends on the type of collection used to create the `BlockingCollection<T>` instance. When you create a `BlockingCollection<T>` object, you can specify the type of collection to use. For example, you could specify a `ConcurrentQueue<T>` object for first in, first out (FIFO) behavior, or a `ConcurrentStack<T>` object for last in, first out (LIFO) behavior. You can use any collection class that implements the `IProducerConsumerCollection<T>` interface. The default collection type for `BlockingCollection<T>` is `ConcurrentQueue<T>`.
