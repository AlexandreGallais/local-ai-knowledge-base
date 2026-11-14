---
title: "BlockingCollection<T> class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/BlockingCollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BlockingCollection<T> class (part 4 of 4)

## BlockingCollection<T>.TryTakeFromAny(BlockingCollection<T>[], T) method

```csharp
public static int TryTakeFromAny (System.Collections.Concurrent.BlockingCollection<T>[] collections, out T? item);
```

Tries to remove an item from any one of the specified `BlockingCollection<T>` instances.

Parameters:

- `collections`: The array of collections.
- `item`: The item that was removed from one of the collections.

Returns: The index of the collection in the `collections` array from which the item was removed, or -1 if an item could not be removed.

Exceptions:

- `ObjectDisposedException`: At least one of the `BlockingCollection<T>` instances has been disposed.
- `ArgumentNullException`: The `collections` argument is null.
- `ArgumentOutOfRangeException`: The count of `collections` is greater than the maximum size of 62 for STA and 63 for MTA.
- `ArgumentException`: The `collections` argument is a 0-length array or contains a null element.
- `InvalidOperationException`: At least one of the underlying collections was modified outside of its `BlockingCollection<T>` instance.

#### Remarks
A call to TryTakeFromAny may block until an item is available to be removed.

#### Examples
The following example shows how to use the `BlockingCollection<T>.TryTakeFromAny` method:

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/BlockingCollectionT/Overview/blockingcoll.cs._

## BlockingCollection<T>.TryTakeFromAny(BlockingCollection<T>[], T, Int32) method

```csharp
public static int TryTakeFromAny (System.Collections.Concurrent.BlockingCollection<T>[] collections, out T? item, int millisecondsTimeout);
```

Tries to remove an item from any one of the specified `BlockingCollection<T>` instances.

Parameters:

- `collections`: The array of collections to remove an item from.
- `item`: The item that was removed from one of the collections.
- `millisecondsTimeout`: The number of milliseconds to wait for the item to be removed, or `Timeout.Infinite` (-1) to wait indefinitely.

Returns: The index of the collection in the `collections` array from which the item was removed, or -1 if an item could not be removed.

Exceptions:

- `ObjectDisposedException`: At least one of the `BlockingCollection<T>` instances has been disposed.
- `ArgumentNullException`: The `collections` argument is null.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.

-or-

The count of `collections` is greater than the maximum size of 62 for STA and 63 for MTA.
- `ArgumentException`: The `collections` argument is a 0-length array or contains a null element.
- `InvalidOperationException`: At least one of the underlying collections was modified outside of its `BlockingCollection<T>` instance.

#### Remarks
A call to TryTakeFromAny may block until an item is available to be removed.

## BlockingCollection<T>.TryTakeFromAny(BlockingCollection<T>[], T, TimeSpan) method

```csharp
public static int TryTakeFromAny (System.Collections.Concurrent.BlockingCollection<T>[] collections, out T? item, TimeSpan timeout);
```

Tries to remove an item from any one of the specified `BlockingCollection<T>` instances.

Parameters:

- `collections`: The array of collections.
- `item`: The item that was removed from one of the collections.
- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.

Returns: The index of the collection in the `collections` array from which the item was removed, or -1 if an item could not be removed.

Exceptions:

- `ObjectDisposedException`: At least one of the `BlockingCollection<T>` instances has been disposed.
- `ArgumentNullException`: The `collections` argument is null.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

-or-

The count of `collections` is greater than the maximum size of 62 for STA and 63 for MTA.
- `ArgumentException`: The `collections` argument is a 0-length array or contains a null element.
- `InvalidOperationException`: At least one of the underlying collections was modified outside of its `BlockingCollection<T>` instance.

#### Remarks
A call to TryTakeFromAny may block until an item is available to be removed.

## BlockingCollection<T>.TryTakeFromAny(BlockingCollection<T>[], T, Int32, CancellationToken) method

```csharp
public static int TryTakeFromAny (System.Collections.Concurrent.BlockingCollection<T>[] collections, out T? item, int millisecondsTimeout, System.Threading.CancellationToken <example-value>);
```

Tries to remove an item from any one of the specified `BlockingCollection<T>` instances.

Parameters:

- `collections`: The array of collections to remove an item from.
- `item`: The item that was removed from one of the collections.
- `millisecondsTimeout`: The number of milliseconds to wait for the item to be removed, or `Timeout.Infinite` (-1) to wait indefinitely.
- `cancellationToken`: A cancellation token to observe.

Returns: The index of the collection in the `collections` array from which the item was removed, or -1 if an item could not be removed.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` is canceled.
- `InvalidOperationException`: At least one of the underlying collections was modified outside of its `BlockingCollection<T>` instance.
- `ArgumentNullException`: The `collections` argument is null.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.

-or-

The count of `collections` is greater than the maximum size of 62 for STA and 63 for MTA.
- `ArgumentException`: The `collections` argument is a 0-length array or contains a null element.
- `ObjectDisposedException`: At least one of the `BlockingCollection<T>` instances has been disposed.

#### Remarks
A call to TryTakeFromAny may block until an item is available to be removed.
