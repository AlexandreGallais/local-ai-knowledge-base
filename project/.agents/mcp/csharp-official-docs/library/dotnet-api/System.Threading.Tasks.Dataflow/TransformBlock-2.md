---
title: "TransformBlock<TInput,TOutput> class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/TransformBlock`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TransformBlock<TInput,TOutput> class

Namespace: `System.Threading.Tasks.Dataflow`

```csharp
public sealed class TransformBlock<TInput,TOutput> : System.Threading.Tasks.Dataflow.IPropagatorBlock<TInput,TOutput>, System.Threading.Tasks.Dataflow.IReceivableSourceBlock<TOutput>, System.Threading.Tasks.Dataflow.ISourceBlock<TOutput>, System.Threading.Tasks.Dataflow.ITargetBlock<TInput>
```

Provides a dataflow block that invokes a provided `Func<T1,T2>` delegate for every data element received.

Parameters:

- `TInput`: Specifies the type of data received and operated on by this `TransformBlock<T1,T2>`.
- `TOutput`: Specifies the type of data output by this  `TransformBlock<T1,T2>`.

To be added.

## TransformBlock<TInput,TOutput>.TransformBlock(Task<TOutput>>) constructor

```csharp
public TransformBlock (Func<TInput,System.Threading.Tasks.Task<TOutput>> transform);
```

Initializes a new `TransformBlock<T1,T2>` with the specified `Func<T1,T2>`.

Parameters:

- `transform`: The function to invoke with each data element received.

Exceptions:

- `ArgumentNullException`: The `transform` is `null`.

To be added.

## TransformBlock<TInput,TOutput>.TransformBlock(Func<TInput,TOutput>) constructor

```csharp
public TransformBlock (Func<TInput,TOutput> transform);
```

Initializes a new `TransformBlock<T1,T2>` with the specified  `Func<T1,T2>`.

Parameters:

- `transform`: The function to invoke with each data element received.

Exceptions:

- `ArgumentNullException`: The `transform` is `null`.

To be added.

## TransformBlock<TInput,TOutput>.TransformBlock(Task<TOutput>>, ExecutionDataflowBlockOptions) constructor

```csharp
public TransformBlock (Func<TInput,System.Threading.Tasks.Task<TOutput>> transform, System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions dataflowBlockOptions);
```

Initializes a new `TransformBlock<T1,T2>` with the specified  `Func<T1,T2>` and `ExecutionDataflowBlockOptions`.

Parameters:

- `transform`: The function to invoke with each data element received.
- `dataflowBlockOptions`: The options with which to configure this  `TransformBlock<T1,T2>`.

Exceptions:

- `ArgumentNullException`: The `transform` is `null`.

-or-

The `dataflowBlockOptions` is `null`.

To be added.

## TransformBlock<TInput,TOutput>.TransformBlock(Func<TInput,TOutput>, ExecutionDataflowBlockOptions) constructor

```csharp
public TransformBlock (Func<TInput,TOutput> transform, System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions dataflowBlockOptions);
```

Initializes a new `TransformBlock<T1,T2>` with the specified  `Func<T1,T2>` and `ExecutionDataflowBlockOptions`.

Parameters:

- `transform`: The function to invoke with each data element received.
- `dataflowBlockOptions`: The options with which to configure this  `TransformBlock<T1,T2>`.

Exceptions:

- `ArgumentNullException`: The `transform` is `null`.

-or-

The `dataflowBlockOptions` is `null`.

To be added.

## TransformBlock<TInput,TOutput>.Completion property

```csharp
public System.Threading.Tasks.Task Completion { get; }
```

Gets a `Task` that represents the asynchronous operation and completion of the dataflow block.

Returns: The task.

#### Remarks
A dataflow block is considered completed when it is not currently processing a message and when it has guaranteed that it will not process any more messages. The returned `Task` will transition to a completed state when the associated block has completed. It will transition to the `TaskStatus``RanToCompletion` state when the block completes its processing successfully according to the dataflow block's defined semantics. It will transition to the `TaskStatus``Faulted` state when the dataflow block has completed processing prematurely due to an unhandled exception, and it will transition to the `TaskStatus``Canceled` state when the dataflow block has completed processing prematurely due to receiving a cancellation request. If the task completes in the `Faulted` state, its `Exception` property will return an `AggregateException` containing the one or more exceptions that caused the block to fail.

## TransformBlock<TInput,TOutput>.InputCount property

```csharp
public int InputCount { get; }
```

Gets the number of input items waiting to be processed by this block.

Returns: The number of input items.

#### Remarks
The `TransformBlock<T1,T2>.InputCount` does not include any items currently being processed by the block or any items that have already been processed by the block.

## TransformBlock<TInput,TOutput>.OutputCount property

```csharp
public int OutputCount { get; }
```

Gets the number of output items available to be received from this block.

Returns: The number of output items.

To be added.

## TransformBlock<TInput,TOutput>.Complete() method

```csharp
public void Complete ();
```

Signals to the `IDataflowBlock` that it should not accept nor produce any more messages nor consume any more postponed messages.

#### Remarks
After `TransformBlock<T1,T2>.Complete` has been called on a dataflow block, that block will complete, and its `TransformBlock<T1,T2>.Completion` task will enter a final state after it has processed all previously available data. `TransformBlock<T1,T2>.Complete` will not block waiting for completion to occur, but rather will initiate the request; to wait for completion to occur, the `TransformBlock<T1,T2>.Completion` task may be used.

## TransformBlock<TInput,TOutput>.LinkTo(ITargetBlock<TOutput>, DataflowLinkOptions) method

```csharp
public IDisposable LinkTo (System.Threading.Tasks.Dataflow.ITargetBlock<TOutput> target, System.Threading.Tasks.Dataflow.DataflowLinkOptions linkOptions);
```

Links the  `ISourceBlock<T>` to the specified  `ITargetBlock<T>` .

Parameters:

- `target`: The  `ITargetBlock<T>` to which to connect this source.
- `linkOptions`: A `DataflowLinkOptions` instance that configures the link.

Returns: An IDisposable that, upon calling Dispose, will unlink the source from the target.

Exceptions:

- `ArgumentNullException`: `target` is null (Nothing in Visual Basic) or  `linkOptions` is null (Nothing in Visual Basic).

To be added.

## TransformBlock<TInput,TOutput>.System.Threading.Tasks.Dataflow.IDataflowBlock.Fault(Exception) method

```csharp
void IDataflowBlock.Fault (Exception exception);
```

Causes the `IDataflowBlock` to complete in a  `TaskStatus.Faulted` state.

Parameters:

- `exception`: The `Exception` that caused the faulting.

Exceptions:

- `ArgumentNullException`: The `exception` is `null`.

#### Remarks
After `TransformBlock<T1,T2>.System%23Threading%23Tasks%23Dataflow%23IDataflowBlock%23Fault` has been called on a dataflow block, that block will complete, and its `TransformBlock<T1,T2>.Completion` task will enter a final state. Faulting a block, as with canceling a block, causes buffered messages (unprocessed input messages as well as unoffered output messages) to be lost.

## TransformBlock<TInput,TOutput>.System.Threading.Tasks.Dataflow.ISourceBlock<TOutput>.ConsumeMessage(DataflowMessageHeader, ITargetBlock<TOutput>, Boolean) method

```csharp
TOutput ISourceBlock<TOutput>.ConsumeMessage (System.Threading.Tasks.Dataflow.DataflowMessageHeader messageHeader, System.Threading.Tasks.Dataflow.ITargetBlock<TOutput> target, out bool messageConsumed);
```

Called by a linked `ITargetBlock<T>` to accept and consume a `DataflowMessageHeader` previously offered by this `ISourceBlock<T>`.

Parameters:

- `messageHeader`: The `DataflowMessageHeader` of the message being consumed.
- `target`: The `ITargetBlock<T>` consuming the message.
- `messageConsumed`: `true` if the message was successfully consumed; otherwise, `false`.

Returns: The value of the consumed message. This may correspond to a different `DataflowMessageHeader` instance than was previously reserved and passed as the `messageHeader` to `ISourceBlock<T>.ConsumeMessage`. The consuming `ITargetBlock<T>` must use the returned value instead of the value passed as `messageValue` through `TransformBlock<T1,T2>.System#Threading#Tasks#Dataflow#ITargetBlock{TInput}#OfferMessage`.

If the message requested is not available, the return value will be `null`.

Exceptions:

- `ArgumentException`: The `messageHeader` is not valid.
- `ArgumentNullException`: The `target` is `null`.

#### Remarks
Only `ITargetBlock<T>` instances linked to this `ISourceBlock<T>` instance may use `ISourceBlock<T>.ConsumeMessage`, and it must only be used to consume `DataflowMessageHeader` instances previously offered by this source to the target.

## TransformBlock<TInput,TOutput>.System.Threading.Tasks.Dataflow.ISourceBlock<TOutput>.ReleaseReservation(DataflowMessageHeader, ITargetBlock<TOutput>) method

```csharp
void ISourceBlock<TOutput>.ReleaseReservation (System.Threading.Tasks.Dataflow.DataflowMessageHeader messageHeader, System.Threading.Tasks.Dataflow.ITargetBlock<TOutput> target);
```

Called by a linked `ITargetBlock<T>` to release a previously reserved `DataflowMessageHeader` by this  `ISourceBlock<T>`.

Parameters:

- `messageHeader`: The `DataflowMessageHeader` of the reserved message being released.
- `target`: The `ITargetBlock<T>` releasing the message it previously reserved.

Exceptions:

- `ArgumentException`: The `messageHeader` is not valid.
- `ArgumentNullException`: The `target` is `null`.
- `InvalidOperationException`: The `target` did not have the message reserved.

#### Remarks
Only `ITargetBlock<T>` instances linked to this `ISourceBlock<T>` instance may use `ISourceBlock<T>.ReleaseReservation`, and it must only be used to release `DataflowMessageHeader` instances previously and successfully reserved by the target.

## TransformBlock<TInput,TOutput>.System.Threading.Tasks.Dataflow.ISourceBlock<TOutput>.ReserveMessage(DataflowMessageHeader, ITargetBlock<TOutput>) method

```csharp
bool ISourceBlock<TOutput>.ReserveMessage (System.Threading.Tasks.Dataflow.DataflowMessageHeader messageHeader, System.Threading.Tasks.Dataflow.ITargetBlock<TOutput> target);
```

Called by a linked `ITargetBlock<T>` to reserve a previously offered `DataflowMessageHeader` by this  `ISourceBlock<T>`.

Parameters:

- `messageHeader`: The `DataflowMessageHeader` of the message being reserved.
- `target`: The `ITargetBlock<T>` reserving the message.

Returns: `true` if the message was successfully reserved; otherwise, `false`.

Exceptions:

- `ArgumentException`: The `messageHeader` is not valid.
- `ArgumentNullException`: The `target` is `null`.

#### Remarks
Only `ITargetBlock<T>` instances linked to this `ISourceBlock<T>` instance may use `ISourceBlock<T>.ReserveMessage`, and it must only be used to reserve `DataflowMessageHeader` instances previously offered by this source to the target.

If `true` is returned, the `ITargetBlock<T>` must subsequently call either `ISourceBlock<T>.ConsumeMessage` or `ISourceBlock<T>.ReleaseReservation` for this message. Failure to do so may result in the source being unable to propagate any further messages to this or other targets.

`ISourceBlock<T>.ReserveMessage` must not be called while the target is holding any internal locks. Doing so will violate the lock hierarchy necessary to avoid deadlocks in a dataflow network.

## TransformBlock<TInput,TOutput>.System.Threading.Tasks.Dataflow.ITargetBlock<TInput>.OfferMessage(DataflowMessageHeader, TInput, ISourceBlock<TInput>, Boolean) method

```csharp
System.Threading.Tasks.Dataflow.DataflowMessageStatus ITargetBlock<TInput>.OfferMessage (System.Threading.Tasks.Dataflow.DataflowMessageHeader messageHeader, TInput messageValue, System.Threading.Tasks.Dataflow.ISourceBlock<TInput> source, bool consumeToAccept);
```

Offers a message to the `ITargetBlock<T>`, giving the target the opportunity to consume or postpone the message.

Parameters:

- `messageHeader`: A `DataflowMessageHeader` instance that represents the header of the message being offered.
- `messageValue`: The value of the message being offered.
- `source`: The `ISourceBlock<T>` offering the message. This may be `null`.
- `consumeToAccept`: `true` if the target must call `ISourceBlock<T>.ConsumeMessage` synchronously during the call to `TransformBlock<T1,T2>.System#Threading#Tasks#Dataflow#ITargetBlock{TInput}#OfferMessage`, prior to returning `DataflowMessageStatus.Accepted`, in order to consume the message.

Returns: The status of the offered message. If the message was accepted by the target, `DataflowMessageStatus.Accepted` is returned, and the source should no longer use the offered message, because it is now owned by the target. If the message was postponed by the target, `DataflowMessageStatus.Postponed` is returned as a notification that the target may later attempt to consume or reserve the message; in the meantime, the source still owns the message and may offer it to other blocks.

If the target would have otherwise postponed but source was `null`, `DataflowMessageStatus.Declined` is instead returned.

If the target tried to accept the message but missed it due to the source delivering the message to another target or simply discarding it, `DataflowMessageStatus.NotAvailable` is returned.

If the target chose not to accept the message, `DataflowMessageStatus.Declined` is returned. If the target chose not to accept the message and will never accept another message from this source, `DataflowMessageStatus.DecliningPermanently` is returned.

Exceptions:

- `ArgumentException`: The `messageHeader` is not valid.

-or- `consumeToAccept` may only be true if provided with a non-null `source`.

To be added.

## TransformBlock<TInput,TOutput>.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the formatted name of this  `IDataflowBlock` instance.

Returns: A string that represents the formatted name of this  `IDataflowBlock` instance.

#### Remarks
Inherited from  `Object` . Uses the  `DataflowBlockOptions.NameFormat` option.

## TransformBlock<TInput,TOutput>.TryReceive(Predicate<TOutput>, TOutput) method

```csharp
public bool TryReceive (Predicate<TOutput>? filter, out TOutput item);
```

Attempts to synchronously receive an available output item from the `IReceivableSourceBlock<T>`.

Parameters:

- `filter`: The predicate value must successfully pass in order for it to be received.  `filter` may be `null`, in which case all items will pass.
- `item`: The item received from the source.

Returns: `true` if an item could be received; otherwise, `false`.

#### Remarks
This method does not block waiting for the source to provide an item.

It will return after checking for an element, whether or not an element was available.
