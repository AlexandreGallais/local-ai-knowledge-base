---
title: "DataflowBlock class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/DataflowBlock.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataflowBlock class (part 3 of 3)

## DataflowBlock.SendAsync<TInput>(ITargetBlock<TInput>, TInput) method

```csharp
public static System.Threading.Tasks.Task<bool> SendAsync<TInput> (this System.Threading.Tasks.Dataflow.ITargetBlock<TInput> target, TInput item);
```

Asynchronously offers a message to the target message block, allowing for postponement.

Parameters:

- `TInput`: Specifies the type of the data to post to the target.
- `target`: The target to which to post the data.
- `item`: The item being offered to the target.

Returns: A `Task<T>` that represents the asynchronous send. If the target accepts and consumes the offered element during the call to `DataflowBlock.SendAsync<T>`, upon return from the call the resulting `Task<T>` will be completed and its `Task<T>.Result` property will return `true`. If the target declines the offered element during the call, upon return from the call the resulting `Task<T>` will be completed and its `Task<T>.Result` property will return `false`. If the target postpones the offered element, the element will be buffered until such time that the target consumes or releases it, at which point the task will complete, with its `Task<T>.Result` indicating whether the message was consumed. If the target never attempts to consume or release the message, the returned task will never complete.

Exceptions:

- `ArgumentNullException`: The `target` is `null`.

To be added.

## DataflowBlock.SendAsync<TInput>(ITargetBlock<TInput>, TInput, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<bool> SendAsync<TInput> (this System.Threading.Tasks.Dataflow.ITargetBlock<TInput> target, TInput item, System.Threading.CancellationToken <example-value>);
```

Asynchronously offers a message to the target message block, allowing for postponement.

Parameters:

- `TInput`: Specifies the type of the data to post to the target.
- `target`: The target to which to post the data.
- `item`: The item being offered to the target.
- `cancellationToken`: The cancellation token with which to request cancellation of the send operation.

Returns: A `Task<T>` that represents the asynchronous send.  If the target accepts and consumes the offered element during the call to SendAsync, upon return from the call the resulting `Task<T>` will be completed and its `Result` property will return true.  If the target declines the offered element during the call, upon return from the call the resulting `Task<T>` will be completed and its `Result` property will return false. If the target postpones the offered element, the element will be buffered until such time that the target consumes or releases it, at which point the Task will complete, with its `Result` indicating whether the message was consumed. If the target never attempts to consume or release the message, the returned task will never complete.

If cancellation is requested before the target has successfully consumed the sent data, the returned task will complete in the Canceled state and the data will no longer be available to the target.

Exceptions:

- `ArgumentNullException`: The  `target` is null (Nothing in Visual Basic).
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## DataflowBlock.TryReceive<TOutput>(IReceivableSourceBlock<TOutput>, TOutput) method

```csharp
public static bool TryReceive<TOutput> (this System.Threading.Tasks.Dataflow.IReceivableSourceBlock<TOutput> source, out TOutput item);
```

Attempts to synchronously receive an item from the `ISourceBlock<T>`.

Parameters:

- `TOutput`: Specifies the type of data contained in the source.
- `source`: The source from which to receive.
- `item`: The item received from the source.

Returns: `true` if an item could be received; otherwise, `false`.

#### Remarks
This method does not wait until the source has an item to provide.

It will return whether or not an element was available.
