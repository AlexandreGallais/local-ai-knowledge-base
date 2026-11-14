---
title: "BlockingCollection<T> class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Concurrent/BlockingCollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BlockingCollection<T> class

Namespace: `System.Collections.Concurrent`

```csharp
public class BlockingCollection<T> : IDisposable, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.ICollection
```

Provides blocking and bounding capabilities for thread-safe collections that implement `IProducerConsumerCollection<T>`.

Parameters:

- `T`: The type of elements in the collection.

#### Remarks

`BlockingCollection<T>` is a thread-safe collection class that provides the following:

- An implementation of the producer/consumer pattern; `BlockingCollection<T>` is a wrapper for the `IProducerConsumerCollection<T>` interface.
- Concurrent addition and removal of items from multiple threads with the `BlockingCollection<T>.Add` and  `BlockingCollection<T>.Take` methods.
- A bounded collection that blocks `BlockingCollection<T>.Add` and `BlockingCollection<T>.Take` operations when the collection is full or empty.
- Cancellation of `BlockingCollection<T>.Add` or `BlockingCollection<T>.Take` operations by using a `CancellationToken` object in the  `BlockingCollection<T>.TryAdd` or `BlockingCollection<T>.TryTake` method.

> **Important:**
>
> - This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.
> - The `Dispose` method is not thread-safe. All other public and protected members of `BlockingCollection<T>` are thread-safe and can be used concurrently from multiple threads.

`IProducerConsumerCollection<T>` represents a collection that allows for thread-safe adding and removal of data. `BlockingCollection<T>` is used as a wrapper for an `IProducerConsumerCollection<T>` instance, and allows removal attempts from the collection to block until data is available to be removed. Similarly, you can create a `BlockingCollection<T>` to enforce an upper bound on the number of data elements allowed in the `IProducerConsumerCollection<T>`; addition attempts to the collection may then block until space is available to store the added items. In this manner, `BlockingCollection<T>` is similar to a traditional blocking queue data structure, except that the underlying data storage mechanism is abstracted away as an `IProducerConsumerCollection<T>`.

`BlockingCollection<T>` supports bounding and blocking. Bounding means that you can set the maximum capacity of the collection. Bounding is important in certain scenarios because it enables you to control the maximum size of the collection in memory, and it prevents the producing threads from moving too far ahead of the consuming threads. Multiple threads or tasks can add items to the collection concurrently, and if the collection reaches its specified maximum capacity, the producing threads will block until an item is removed. Multiple consumers can remove items concurrently, and if the collection becomes empty, the consuming threads will block until a producer adds an item. A producing thread can call the `BlockingCollection<T>.CompleteAdding` method to indicate that no more items will be added. Consumers monitor the `IsCompleted` property to know when the collection is empty and no more items will be added.

`BlockingCollection<T>.Add` and `BlockingCollection<T>.Take` operations are typically performed in a loop. You can cancel a loop by passing in a `CancellationToken` object to the `BlockingCollection<T>.TryAdd` or `BlockingCollection<T>.TryTake` method, and then checking the value of the token's `IsCancellationRequested` property on each iteration. If the value is `true`, it is up to you to respond the cancellation request by cleaning up any resources and exiting the loop.

When you create a `BlockingCollection<T>` object, you can specify not only the bounded capacity but also the type of collection to use. For example, you could specify a `ConcurrentQueue<T>` object for first in, first out (FIFO) behavior, or a `ConcurrentStack<T>` object for last in, first out (LIFO) behavior. You can use any collection class that implements the `IProducerConsumerCollection<T>` interface. The default collection type for `BlockingCollection<T>` is `ConcurrentQueue<T>`.

Do not modify the underlying collection directly. Use `BlockingCollection<T>` methods to add or remove elements. The `BlockingCollection<T>` object can become corrupted if you change the underlying collection directly.

`BlockingCollection<T>` was not designed with asynchronous access in mind. If your application requires asynchronous producer/consumer scenarios, consider using `Channel<T>` instead.

#### Examples
The following example shows how to add and take items concurrently from a blocking collection:

_Code sample not included: ~/snippets/csharp/System.Collections.Concurrent/BlockingCollectionT/Overview/blockingcoll.cs._

## BlockingCollection<T>.BlockingCollection() constructor

```csharp
public BlockingCollection ();
```

Initializes a new instance of the `BlockingCollection<T>` class without an upper-bound.

#### Remarks
The default underlying collection is a `ConcurrentQueue<T>` object, which provides first in, first out (FIFO) behavior.

## BlockingCollection<T>.BlockingCollection(IProducerConsumerCollection<T>) constructor

```csharp
public BlockingCollection (System.Collections.Concurrent.IProducerConsumerCollection<T> collection);
```

Initializes a new instance of the `BlockingCollection<T>` class without an upper-bound and using the provided `IProducerConsumerCollection<T>` as its underlying data store.

Parameters:

- `collection`: The collection to use as the underlying data store.

Exceptions:

- `ArgumentNullException`: The `collection` argument is null.

To be added.

## BlockingCollection<T>.BlockingCollection(Int32) constructor

```csharp
public BlockingCollection (int boundedCapacity);
```

Initializes a new instance of the `BlockingCollection<T>` class with the specified upper-bound.

Parameters:

- `boundedCapacity`: The bounded size of the collection.

Exceptions:

- `ArgumentOutOfRangeException`: The `boundedCapacity` is not a positive value.

#### Remarks
The default underlying collection is a `ConcurrentQueue<T>`.

## BlockingCollection<T>.BlockingCollection(IProducerConsumerCollection<T>, Int32) constructor

```csharp
public BlockingCollection (System.Collections.Concurrent.IProducerConsumerCollection<T> collection, int boundedCapacity);
```

Initializes a new instance of the `BlockingCollection<T>` class with the specified upper-bound and using the provided `IProducerConsumerCollection<T>` as its underlying data store.

Parameters:

- `collection`: The collection to use as the underlying data store.
- `boundedCapacity`: The bounded size of the collection.

Exceptions:

- `ArgumentNullException`: The `collection` argument is null.
- `ArgumentOutOfRangeException`: The `boundedCapacity` is not a positive value.
- `ArgumentException`: The supplied `collection` contains more values than is permitted by `boundedCapacity`.

To be added.

## BlockingCollection<T>.BoundedCapacity property

```csharp
public int BoundedCapacity { get; }
```

Gets the bounded capacity of this `BlockingCollection<T>` instance.

Returns: The bounded capacity of this collection, or -1 if no bound was supplied.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.

To be added.

## BlockingCollection<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of items contained in the `BlockingCollection<T>`.

Returns: The number of items contained in the `BlockingCollection<T>`.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.

#### Remarks
If any method in BlockingCollection is executing while the Count property is being accessed, the return value is approximate. Count may reflect a number that is either greater than or less than the actual number of items in the BlockingCollection.

## BlockingCollection<T>.IsAddingCompleted property

```csharp
public bool IsAddingCompleted { get; }
```

Gets whether this `BlockingCollection<T>` has been marked as complete for adding.

Returns: Whether this collection has been marked as complete for adding.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.

To be added.

## BlockingCollection<T>.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets whether this `BlockingCollection<T>` has been marked as complete for adding and is empty.

Returns: Whether this collection has been marked as complete for adding and is empty.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.

To be added.

## BlockingCollection<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: Always returns `false` to indicate the access is not synchronized.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `BlockingCollection<T>` instance is cast to an `ICollection` interface.

## BlockingCollection<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`. This property is not supported.

Returns: Returns `null`.

Exceptions:

- `NotSupportedException`: The SyncRoot property is not supported.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `BlockingCollection<T>` instance is cast to an `ICollection` interface.

## BlockingCollection<T>.Add(T) method

```csharp
public void Add (T item);
```

Adds the item to the `BlockingCollection<T>`.

Parameters:

- `item`: The item to be added to the collection. The value can be a null reference.

Exceptions:

- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed.
- `InvalidOperationException`: The `BlockingCollection<T>` has been marked as complete with regards to additions.

-or-

The underlying collection didn't accept the item.

#### Remarks
If a bounded capacity was specified when this instance of `BlockingCollection<T>` was initialized, a call to Add may block until space is available to store the provided item.

## BlockingCollection<T>.Add(T, CancellationToken) method

```csharp
public void Add (T item, System.Threading.CancellationToken <example-value>);
```

Adds the item to the `BlockingCollection<T>`.

Parameters:

- `item`: The item to be added to the collection. The value can be a null reference.
- `cancellationToken`: A cancellation token to observe.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` is canceled.
- `ObjectDisposedException`: The `BlockingCollection<T>` has been disposed or the `CancellationTokenSource` that owns `cancellationToken` has been disposed.
- `InvalidOperationException`: The `BlockingCollection<T>` has been marked as complete with regards to additions.

-or-

The underlying collection didn't accept the item.

#### Remarks
If a bounded capacity was specified when this instance of `BlockingCollection<T>` was initialized, a call to `BlockingCollection<T>.Add` may block until space is available to store the provided item.

This method can return early with an `OperationCanceledException` if the `cancellationToken` is canceled.

## BlockingCollection<T>.AddToAny(BlockingCollection<T>[], T) method

```csharp
public static int AddToAny (System.Collections.Concurrent.BlockingCollection<T>[] collections, T item);
```

Adds the specified item to any one of the specified `BlockingCollection<T>` instances.

Parameters:

- `collections`: The array of collections.
- `item`: The item to be added to one of the collections.

Returns: The index of the collection in the `collections` array to which the item was added.

Exceptions:

- `ObjectDisposedException`: At least one of the `BlockingCollection<T>` instances has been disposed.
- `ArgumentNullException`: The `collections` argument is null.
- `ArgumentOutOfRangeException`: The count of `collections` is greater than the maximum size of 62 for STA and 63 for MTA.
- `ArgumentException`: The `collections` argument is a 0-length array or contains a null element, or at least one of collections has been marked as complete for adding.
- `InvalidOperationException`: At least one underlying collection didn't accept the item.

#### Remarks
If a bounded capacity was specified when all of the `BlockingCollection<T>` instances were initialized, a call to AddToAny may block until space is available in one of the collections to store the provided item.

## BlockingCollection<T>.AddToAny(BlockingCollection<T>[], T, CancellationToken) method

```csharp
public static int AddToAny (System.Collections.Concurrent.BlockingCollection<T>[] collections, T item, System.Threading.CancellationToken <example-value>);
```

Adds the specified item to any one of the specified `BlockingCollection<T>` instances.

Parameters:

- `collections`: The array of collections.
- `item`: The item to be added to one of the collections.
- `cancellationToken`: A cancellation token to observe.

Returns: The index of the collection in the `collections` array to which the item was added.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` is canceled.
- `InvalidOperationException`: At least one underlying collection didn't accept the item.
- `ArgumentNullException`: The `collections` argument is null.
- `ArgumentOutOfRangeException`: The count of `collections` is greater than the maximum size of 62 for STA and 63 for MTA.
- `ArgumentException`: The `collections` argument is a 0-length array or contains a null element, or at least one of collections has been marked as complete for adding.
- `ObjectDisposedException`: At least one of the `BlockingCollection<T>` instances has been disposed, or the `CancellationTokenSource` that created `cancellationToken` has been disposed.

#### Remarks
If a bounded capacity was specified when all of the `BlockingCollection<T>` instances were initialized, a call to AddToAny may block until space is available in one of the collections to store the provided item. This method may return before the item is added to any collection if the `cancellationToken` is canceled before space is available.
