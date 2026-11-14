---
title: "ChannelReader<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Channels/ChannelReader`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ChannelReader<T> class

Namespace: `System.Threading.Channels`

```csharp
public abstract class ChannelReader<T>
```

Provides a base class for reading from a channel.

Parameters:

- `T`: Specifies the type of data that may be read from the channel.

To be added.

## ChannelReader<T>.ChannelReader() constructor

```csharp
protected ChannelReader ();
```

Initializes an instance of the `ChannelReader<T>` class.

To be added.

## ChannelReader<T>.CanCount property

```csharp
public virtual bool CanCount { get; }
```

Gets a value that indicates whether `ChannelReader<T>.Count` is available for use on this `ChannelReader<T>` instance.

Returns: To be added.

To be added.

## ChannelReader<T>.CanPeek property

```csharp
public virtual bool CanPeek { get; }
```

Gets a value that indicates whether `ChannelReader<T>.TryPeek` is available for use on this `ChannelReader<T>` instance.

Returns: `true` if peeking is supported by this channel instance; `false` otherwise.

To be added.

## ChannelReader<T>.Completion property

```csharp
public virtual System.Threading.Tasks.Task Completion { get; }
```

Gets a `Task` that completes when no more data will ever
be available to be read from this channel.

Returns: To be added.

To be added.

## ChannelReader<T>.Count property

```csharp
public virtual int Count { get; }
```

Gets the current number of items available from this channel reader.

Returns: To be added.

Exceptions:

- `NotSupportedException`: Counting is not supported on this instance.

To be added.

## ChannelReader<T>.ReadAllAsync(CancellationToken) method

```csharp
public virtual System.Collections.Generic.IAsyncEnumerable<T> ReadAllAsync (System.Threading.CancellationToken <example-value> = default);
```

Creates an `IAsyncEnumerable<T>` that enables reading all of the data from the channel.

Parameters:

- `cancellationToken`: The cancellation token to use to cancel the enumeration. If data is immediately ready for reading, then that data may be yielded even after cancellation has been requested.

Returns: The created async enumerable.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

Each `MoveNextAsync` call that returns `true` will read the next item out of the channel.

`MoveNextAsync` returns `false` once no more data is or will ever be available to read.

## ChannelReader<T>.ReadAsync(CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask<T> ReadAsync (System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads an item from the channel.

Parameters:

- `cancellationToken`: A `CancellationToken` used to cancel the read operation.

Returns: A `ValueTask<T>` that represents the asynchronous read operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

If the operation is canceled, the operation will not have removed an item from the channel.

## ChannelReader<T>.TryPeek(T) method

```csharp
public virtual bool TryPeek (out T item);
```

Attempts to peek at an item from the channel.

Parameters:

- `item`: The peeked item, or a default value if no item could be peeked.

Returns: `true` if an item was read; otherwise, `false`.

To be added.

## ChannelReader<T>.TryRead(T) method

```csharp
public abstract bool TryRead (out T item);
```

Attempts to read an item from the channel.

Parameters:

- `item`: The read item, or a default value if no item could be read.

Returns: `true` if an item was read; otherwise, `false`.

To be added.

## ChannelReader<T>.WaitToReadAsync(CancellationToken) method

```csharp
public abstract System.Threading.Tasks.ValueTask<bool> WaitToReadAsync (System.Threading.CancellationToken <example-value> = default);
```

Returns a `ValueTask<T>` that will complete when data is available to read.

Parameters:

- `cancellationToken`: A `CancellationToken` used to cancel the wait operation.

Returns: A `ValueTask<T>` that will complete with a `true` result when data is available to read
or with a `false` result when no further data will ever be available to be read due to the channel completing successfully.

If the channel completes with an exception, the task will also complete with an exception.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
