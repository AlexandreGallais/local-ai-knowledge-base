---
title: "ChannelWriter<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Channels/ChannelWriter`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ChannelWriter<T> class

Namespace: `System.Threading.Channels`

```csharp
public abstract class ChannelWriter<T>
```

Provides a base class for writing to a channel.

Parameters:

- `T`: Specifies the type of data that may be written to the channel.

To be added.

## ChannelWriter<T>.ChannelWriter() constructor

```csharp
protected ChannelWriter ();
```

Initializes an instance of the `ChannelWriter<T>` class.

To be added.

## ChannelWriter<T>.Complete(Exception) method

```csharp
public void Complete (Exception? error = default);
```

Mark the channel as being complete, meaning no more items will be written to it.

Parameters:

- `error`: Optional Exception indicating a failure that's causing the channel to complete.

Exceptions:

- `InvalidOperationException`: The channel has already been marked as complete.

To be added.

## ChannelWriter<T>.TryComplete(Exception) method

```csharp
public virtual bool TryComplete (Exception? error = default);
```

Attempts to mark the channel as being completed, meaning no more data will be written to it.

Parameters:

- `error`: An `Exception` indicating the failure causing no more data to be written, or null for success.

Returns: `true` if this operation successfully completes the channel; otherwise, `false` if the channel could not be marked for completion,
for example due to having already been marked as such, or due to not supporting completion.
.

To be added.

## ChannelWriter<T>.TryWrite(T) method

```csharp
public abstract bool TryWrite (T item);
```

Attempts to write the specified item to the channel.

Parameters:

- `item`: The item to write.

Returns: `true` if the item was written; otherwise, `false`.

To be added.

## ChannelWriter<T>.WaitToWriteAsync(CancellationToken) method

```csharp
public abstract System.Threading.Tasks.ValueTask<bool> WaitToWriteAsync (System.Threading.CancellationToken <example-value> = default);
```

Returns a `ValueTask<T>` that will complete when space is available to write an item.

Parameters:

- `cancellationToken`: A `CancellationToken` used to cancel the wait operation.

Returns: A `ValueTask<T>` that will complete with a `true` result when space is available to write an item
or with a `false` result when no further writing will be permitted.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## ChannelWriter<T>.WriteAsync(T, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask WriteAsync (T item, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes an item to the channel.

Parameters:

- `item`: The value to write to the channel.
- `cancellationToken`: A `CancellationToken` used to cancel the write operation.

Returns: A `ValueTask` that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
