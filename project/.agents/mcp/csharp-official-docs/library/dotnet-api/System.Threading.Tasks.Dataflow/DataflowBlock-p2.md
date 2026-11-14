---
title: "DataflowBlock class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/DataflowBlock.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataflowBlock class (part 2 of 3)

## DataflowBlock.OutputAvailableAsync<TOutput>(ISourceBlock<TOutput>) method

```csharp
public static System.Threading.Tasks.Task<bool> OutputAvailableAsync<TOutput> (this System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source);
```

Provides a `Task<T>` that asynchronously monitors the source for available output.

Parameters:

- `TOutput`: Specifies the type of data contained in the source.
- `source`: The source to monitor.

Returns: A `Task<T>` that informs of whether and when more output is available. If, when the task completes, its `Task<T>.Result` is `true`, more output is available in the source (though another consumer of the source may retrieve the data).

If it returns `false`, more output is not and will never be available, due to the source completing prior to output being available.

To be added.

## DataflowBlock.OutputAvailableAsync<TOutput>(ISourceBlock<TOutput>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<bool> OutputAvailableAsync<TOutput> (this System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source, System.Threading.CancellationToken <example-value>);
```

Provides a  `Task<T>` that asynchronously monitors the source for available output.

Parameters:

- `TOutput`: Specifies the type of data contained in the source.
- `source`: The source to monitor.
- `cancellationToken`: The cancellation token with which to cancel the asynchronous operation.

Returns: A `Task<T>` that informs of whether and when more output is available. If, when the task completes, its `Task<T>.Result` is `true`, more output is available in the source (though another consumer of the source may retrieve the data). If it returns `false`, more output is not and will never be available, due to the source completing prior to output being available.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## DataflowBlock.Post<TInput>(ITargetBlock<TInput>, TInput) method

```csharp
public static bool Post<TInput> (this System.Threading.Tasks.Dataflow.ITargetBlock<TInput> target, TInput item);
```

Posts an item to the `ITargetBlock<T>`.

Parameters:

- `TInput`: Specifies the type of data accepted by the target block.
- `target`: The target block.
- `item`: The item being offered to the target.

Returns: `true` if the item was accepted by the target block; otherwise, `false`.

#### Remarks
This method will return once the target block has decided to accept or decline the item, but unless otherwise dictated by special semantics of the target block, it does not wait for the item to actually be processed. For example, `ActionBlock<T>` will return from `DataflowBlock.Post` as soon as it has stored the posted item into its input queue). From the perspective of the block's processing, `Post` is asynchronous. For target blocks that support postponing offered messages, or for blocks that may do more processing in their `Post` implementation, consider using `DataflowBlock.SendAsync`, which will return immediately and will enable the target to postpone the posted message and later consume it after `SendAsync` returns.

## DataflowBlock.Receive<TOutput>(ISourceBlock<TOutput>) method

```csharp
public static TOutput Receive<TOutput> (this System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source);
```

Synchronously receives a value from a specified source.

Parameters:

- `TOutput`: The type of data contained in the source.
- `source`: The source from which to receive the value.

Returns: The received value.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: No item could be received from the source.

To be added.

## DataflowBlock.Receive<TOutput>(ISourceBlock<TOutput>, CancellationToken) method

```csharp
public static TOutput Receive<TOutput> (this System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source, System.Threading.CancellationToken <example-value>);
```

Synchronously receives a value from a specified source and provides a token to cancel the operation.

Parameters:

- `TOutput`: The type of data contained in the source.
- `source`: The source from which to receive the value.
- `cancellationToken`: The token to use to cancel the receive operation.

Returns: The received value.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: No item could be received from the source.
- `OperationCanceledException`: The operation was canceled before an item was received from the source.

#### Remarks
If the source successfully offered an item that was received by this operation, that item is returned even if a concurrent cancellation request occurs.

## DataflowBlock.Receive<TOutput>(ISourceBlock<TOutput>, TimeSpan) method

```csharp
public static TOutput Receive<TOutput> (this System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source, TimeSpan timeout);
```

Synchronously receives a value from a specified source, observing an optional time-out period.

Parameters:

- `TOutput`: The type of data contained in the source.
- `source`: The source from which to receive the value.
- `timeout`: The maximum time interval, in milliseconds, to wait for the synchronous operation to complete, or an interval that represents -1 milliseconds to wait indefinitely.

Returns: The received value.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out period.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: No item could be received from the source.
- `TimeoutException`: The specified time-out expired before an item was received from the source.

#### Remarks
If the source successfully offered an item that was received by this operation, that item is returned even if a concurrent time-out occurs.

## DataflowBlock.Receive<TOutput>(ISourceBlock<TOutput>, TimeSpan, CancellationToken) method

```csharp
public static TOutput Receive<TOutput> (this System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source, TimeSpan timeout, System.Threading.CancellationToken <example-value>);
```

Synchronously receives a value from a specified source, providing a token to cancel the operation and observing an optional time-out interval.

Parameters:

- `TOutput`: The type of data contained in the source.
- `source`: The source from which to receive the value.
- `timeout`: The maximum time interval, in milliseconds, to wait for the synchronous operation to complete, or an interval that represents -1 milliseconds to wait indefinitely.
- `cancellationToken`: The token to use to cancel the receive operation.

Returns: The received value.

Exceptions:

- `ArgumentNullException`: The `source` is `null`.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out period.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `InvalidOperationException`: No item could be received from the source.
- `TimeoutException`: The specified time-out expired before an item was received from the source.
- `OperationCanceledException`: The operation was canceled before an item was received from the source.

#### Remarks
If the source successfully offered an item value that was received by this operation, that value is returned even if a concurrent time-out or cancellation request occurs.

## DataflowBlock.ReceiveAllAsync<TOutput>(IReceivableSourceBlock<TOutput>, CancellationToken) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TOutput> ReceiveAllAsync<TOutput> (this System.Threading.Tasks.Dataflow.IReceivableSourceBlock<TOutput> source, System.Threading.CancellationToken <example-value> = default);
```

Creates an `IAsyncEnumerable<T>` that enables receiving all of the data from the source.

Parameters:

- `TOutput`: Specifies the type of data contained in the source.
- `source`: The source from which to asynchronously receive.
- `cancellationToken`: The `CancellationToken` that can be used to cancel the receive operation.

Returns: The created async enumerable.

Exceptions:

- `ArgumentNullException`: The `source` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## DataflowBlock.ReceiveAsync<TOutput>(ISourceBlock<TOutput>) method

```csharp
public static System.Threading.Tasks.Task<TOutput> ReceiveAsync<TOutput> (this System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source);
```

Asynchronously receives a value from a specified source.

Parameters:

- `TOutput`: The type of data contained in the source.
- `source`: The source from which to receive the value.

Returns: A task that represents the asynchronous receive operation. When an item value is successfully received from the source, the returned task is completed and its `Task<T>.Result` returns the received value. If an item value cannot be retrieved because the source is empty and completed , an `InvalidOperationException` exception is thrown in the returned task.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## DataflowBlock.ReceiveAsync<TOutput>(ISourceBlock<TOutput>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<TOutput> ReceiveAsync<TOutput> (this System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source, System.Threading.CancellationToken <example-value>);
```

Asynchronously receives a value from a specified source and provides a token to cancel the operation.

Parameters:

- `TOutput`: Specifies the type of data contained in the source.
- `source`: The source from which to receive the value.
- `cancellationToken`: The token to use to cancel the receive operation.

Returns: A task that represents the asynchronous receive operation. When a value is successfully received from the source, the returned task is completed and its `Task<T>.Result` returns the value. If a value cannot be retrieved because cancellation was requested, the returned task is canceled. If the value cannot be retrieved because the source is empty and completed , an `InvalidOperationException` exception is thrown in the returned task.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## DataflowBlock.ReceiveAsync<TOutput>(ISourceBlock<TOutput>, TimeSpan) method

```csharp
public static System.Threading.Tasks.Task<TOutput> ReceiveAsync<TOutput> (this System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source, TimeSpan timeout);
```

Asynchronously receives a value from a specified source, observing an optional time-out period.

Parameters:

- `TOutput`: The type of data contained in the source.
- `source`: The source from which to receive the value.
- `timeout`: The maximum time interval, in milliseconds, to wait for the synchronous operation to complete, or an interval that represents -1 milliseconds to wait indefinitely.

Returns: A task that represents the asynchronous receive operation. When a value is successfully received from the source, the returned task is completed and its `Task<T>.Result` returns the value. If a value cannot be retrieved because the time-out expired, the returned task is canceled. If the value cannot be retrieved because the source is empty and completed , an `InvalidOperationException` exception is thrown in the returned task.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out period.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

To be added.

## DataflowBlock.ReceiveAsync<TOutput>(ISourceBlock<TOutput>, TimeSpan, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<TOutput> ReceiveAsync<TOutput> (this System.Threading.Tasks.Dataflow.ISourceBlock<TOutput> source, TimeSpan timeout, System.Threading.CancellationToken <example-value>);
```

Asynchronously receives a value from a specified source, providing a token to cancel the operation and observing an optional time-out interval.

Parameters:

- `TOutput`: The type of data contained in the source.
- `source`: The source from which to receive the value.
- `timeout`: The maximum time interval, in milliseconds, to wait for the synchronous operation to complete, or an interval that represents -1 milliseconds to wait indefinitely.
- `cancellationToken`: The token which may be used to cancel the receive operation.

Returns: A task that represents the asynchronous receive operation. When a value is successfully received from the source, the returned task is completed and its `Task<T>.Result` returns the value. If a value cannot be retrieved because the time-out expired or cancellation was requested, the returned task is canceled. If the value cannot be retrieved because the source is empty and completed, an `InvalidOperationException` exception is thrown in the returned task.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out period.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
