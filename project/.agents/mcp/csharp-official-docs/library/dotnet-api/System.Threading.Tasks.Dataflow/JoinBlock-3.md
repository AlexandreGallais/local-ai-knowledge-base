---
title: "JoinBlock<T1,T2,T3> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/JoinBlock`3.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JoinBlock<T1,T2,T3> class

Namespace: `System.Threading.Tasks.Dataflow`

```csharp
public sealed class JoinBlock<T1,T2,T3> : System.Threading.Tasks.Dataflow.IReceivableSourceBlock<Tuple<T1,T2,T3>>, System.Threading.Tasks.Dataflow.ISourceBlock<Tuple<T1,T2,T3>>
```

Provides a dataflow block that joins across multiple dataflow sources, which are not necessarily of the same type, waiting for one item to arrive for each type before they're all released together as a tuple that contains one item per type.

Parameters:

- `T1`: Specifies the type of data accepted by the block's first target.
- `T2`: Specifies the type of data accepted by the block's second target.
- `T3`: Specifies the type of data accepted by the block's third target.

To be added.

## JoinBlock<T1,T2,T3>.JoinBlock() constructor

```csharp
public JoinBlock ();
```

Initializes a new `JoinBlock<T1,T2,T3>`.

To be added.

## JoinBlock<T1,T2,T3>.JoinBlock(GroupingDataflowBlockOptions) constructor

```csharp
public JoinBlock (System.Threading.Tasks.Dataflow.GroupingDataflowBlockOptions dataflowBlockOptions);
```

Initializes a new `JoinBlock<T1,T2,T3>`.

Parameters:

- `dataflowBlockOptions`: The options with which to configure this `JoinBlock<T1,T2>`.

Exceptions:

- `ArgumentNullException`: The `dataflowBlockOptions` is `null`.

To be added.

## JoinBlock<T1,T2,T3>.Completion property

```csharp
public System.Threading.Tasks.Task Completion { get; }
```

Gets a `Task` that represents the asynchronous operation and completion of the dataflow block.

Returns: The task.

#### Remarks
A dataflow block is considered completed when it is not currently processing a message and when it has guaranteed that it will not process any more messages. The returned `Task` will transition to a completed state when the associated block has completed. It will transition to the `TaskStatus``RanToCompletion` state when the block completes its processing successfully according to the dataflow block's defined semantics. It will transition to the `TaskStatus``Faulted` state when the dataflow block has completed processing prematurely due to an unhandled exception, and it will transition to the `TaskStatus``Canceled` state when the dataflow block has completed processing prematurely due to receiving a cancellation request. If the task completes in the `Faulted` state, its `Exception` property will return an `AggregateException` containing the one or more exceptions that caused the block to fail.

## JoinBlock<T1,T2,T3>.OutputCount property

```csharp
public int OutputCount { get; }
```

Gets the number of output items available to be received from this block.

Returns: The number of output items.

To be added.

## JoinBlock<T1,T2,T3>.Target1 property

```csharp
public System.Threading.Tasks.Dataflow.ITargetBlock<T1> Target1 { get; }
```

Gets a target that may be used to offer messages of the first type.

Returns: The target.

To be added.

## JoinBlock<T1,T2,T3>.Target2 property

```csharp
public System.Threading.Tasks.Dataflow.ITargetBlock<T2> Target2 { get; }
```

Gets a target that may be used to offer messages of the second type.

Returns: The target.

To be added.

## JoinBlock<T1,T2,T3>.Target3 property

```csharp
public System.Threading.Tasks.Dataflow.ITargetBlock<T3> Target3 { get; }
```

Gets a target that may be used to offer messages of the third type.

Returns: The target.

To be added.

## JoinBlock<T1,T2,T3>.Complete() method

```csharp
public void Complete ();
```

Signals to the `IDataflowBlock` that it should not accept nor produce any more messages nor consume any more postponed messages.

#### Remarks
After `JoinBlock<T1,T2,T3>.Complete` has been called on a dataflow block, that block will complete, and its  `JoinBlock<T1,T2,T3>.Completion` task will enter a final state after it has processed all previously available data. `JoinBlock<T1,T2,T3>.Complete` will not block waiting for completion to occur, but rather will initiate the request; to wait for completion to occur, the `JoinBlock<T1,T2,T3>.Completion` task may be used.

## JoinBlock<T1,T2,T3>.LinkTo(Tuple<T1,T2,T3>>, DataflowLinkOptions) method

```csharp
public IDisposable LinkTo (System.Threading.Tasks.Dataflow.ITargetBlock<Tuple<T1,T2,T3>> target, System.Threading.Tasks.Dataflow.DataflowLinkOptions linkOptions);
```

Links the   source block to the specified target block.

Parameters:

- `target`: The target block to which to connect this source.
- `linkOptions`: An object that configures the link.

Returns: A disposable object that unlinks the source from the target when its `IDisposable.Dispose` method is called.

Exceptions:

- `ArgumentNullException`: `target` is `null`.

-or-

`linkOptions` is `null`.

To be added.

## JoinBlock<T1,T2,T3>.System.Threading.Tasks.Dataflow.IDataflowBlock.Fault(Exception) method

```csharp
void IDataflowBlock.Fault (Exception exception);
```

Causes the `IDataflowBlock` to complete in a  `TaskStatus.Faulted` state.

Parameters:

- `exception`: The  `Exception` that caused the faulting.

Exceptions:

- `ArgumentNullException`: The `exception` is `null`.

#### Remarks
After `JoinBlock<T1,T2,T3>.System%23Threading%23Tasks%23Dataflow%23IDataflowBlock%23Fault` has been called on a dataflow block, that block will complete, and its `JoinBlock<T1,T2,T3>.Completion` task will enter a final state. Faulting a block, as with canceling a block, causes buffered messages (unprocessed input messages as well as unoffered output messages) to be lost.

## JoinBlock<T1,T2,T3>.System.Threading.Tasks.Dataflow.ISourceBlock<System.Tuple<T1,T2,T3>>.ConsumeMessage(DataflowMessageHeader, Tuple<T1,T2,T3>>, Boolean) method

```csharp
Tuple<T1,T2,T3> ISourceBlock<Tuple<T1,T2,T3>>.ConsumeMessage (System.Threading.Tasks.Dataflow.DataflowMessageHeader messageHeader, System.Threading.Tasks.Dataflow.ITargetBlock<Tuple<T1,T2,T3>> target, out bool messageConsumed);
```

Passes the ownership of the message identified by the `DataflowMessageHeader` from this  `ISourceBlock<T>` instance to the `ITargetBlock<T>`.

Parameters:

- `messageHeader`: The `DataflowMessageHeader` of the message that is to be consumed.
- `target`: The `ITargetBlock<T>` for which the message is to be consumed.
- `messageConsumed`: `true` if the message was successfully consumed. `false` otherwise.

Returns: The value of the consumed message. This may correspond to a different `DataflowMessageHeader` instance than was previously reserved and passed as the `messageHeader` to this method. The consuming `ITargetBlock<T>` must use the returned value instead of the value passed as `messageValue` to `ITargetBlock<T>.OfferMessage`. If the message requested is not available, the return value is `null` (`Nothing` in Visual Basic).

Exceptions:

- `ArgumentException`: The `messageHeader` is not valid.
- `ArgumentNullException`: The `target` is `null` (Nothing in Visual Basic).

#### Remarks

The `ITargetBlock<T>` for which the message is to be consumed need not be linked from this `ISourceBlock<T>` instance. Moreover, this `ISourceBlock<T>` instance may have never offered the message directly to the `ITargetBlock<T>`.

## JoinBlock<T1,T2,T3>.System.Threading.Tasks.Dataflow.ISourceBlock<System.Tuple<T1,T2,T3>>.ReleaseReservation(DataflowMessageHeader, Tuple<T1,T2,T3>>) method

```csharp
void ISourceBlock<Tuple<T1,T2,T3>>.ReleaseReservation (System.Threading.Tasks.Dataflow.DataflowMessageHeader messageHeader, System.Threading.Tasks.Dataflow.ITargetBlock<Tuple<T1,T2,T3>> target);
```

Releases the right to pass the ownership of the message identified by the `DataflowMessageHeader` from this `ISourceBlock<T>` to the `ITargetBlock<T>`.

Parameters:

- `messageHeader`: The `DataflowMessageHeader` of the reserved message.
- `target`: The `ITargetBlock<T>` that currently holds the reservation.

Exceptions:

- `ArgumentException`: The `messageHeader` is not valid.
- `ArgumentNullException`: The `target` is `null` (Nothing in Visual Basic).
- `InvalidOperationException`: The `target` did not have the message reserved.

#### Remarks

The `ITargetBlock<T>` that holds the reservation need not be linked from this `ISourceBlock<T>` instance. Moreover, this `ISourceBlock<T>` instance may have never offered the message directly to the `ITargetBlock<T>`.
It is required that this message has been previously reserved for the same `ITargetBlock<T>`.

## JoinBlock<T1,T2,T3>.System.Threading.Tasks.Dataflow.ISourceBlock<System.Tuple<T1,T2,T3>>.ReserveMessage(DataflowMessageHeader, Tuple<T1,T2,T3>>) method

```csharp
bool ISourceBlock<Tuple<T1,T2,T3>>.ReserveMessage (System.Threading.Tasks.Dataflow.DataflowMessageHeader messageHeader, System.Threading.Tasks.Dataflow.ITargetBlock<Tuple<T1,T2,T3>> target);
```

Reserves the right to pass the ownership of the message identified by the `DataflowMessageHeader` from this `ISourceBlock<T>` to the `ITargetBlock<T>`.

Parameters:

- `messageHeader`: The `DataflowMessageHeader` of the message that is to be reserved.
- `target`: The `ITargetBlock<T>` for which the message is to be reserved.

Returns: `true` if the message was successfully reserved; otherwise, `false`.

Exceptions:

- `ArgumentException`: The `messageHeader` is not valid.
- `ArgumentNullException`: The `target` is `null` (Nothing in Visual Basic).

#### Remarks

The `ITargetBlock<T>` for which the message is to be reserved need not be linked from this `ISourceBlock<T>` instance. Moreover, this `ISourceBlock<T>` instance may have never offered the message directly to the `ITargetBlock<T>`.

If `true` is returned, you must subsequently call either `ISourceBlock<T>.ConsumeMessage` or `ISourceBlock<T>.ReleaseReservation` for this message with the same `DataflowMessageHeader` and `ITargetBlock<T>`. If you don't, the source may be unable to propagate any further messages to any target.

Don't call `ISourceBlock<T>.ReserveMessage` while the target is holding any internal locks. Doing so will violate the lock hierarchy necessary to avoid deadlocks in a dataflow network.

## JoinBlock<T1,T2,T3>.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the formatted name of this  `IDataflowBlock` instance.

Returns: A string that represents the formatted name of this `IDataflowBlock` instance.

#### Remarks
Inherited from  `Object` . Uses the  `DataflowBlockOptions.NameFormat` option.

## JoinBlock<T1,T2,T3>.TryReceive(Tuple<T1,T2,T3>>, Tuple<T1,T2,T3>) method

```csharp
public bool TryReceive (Predicate<Tuple<T1,T2,T3>>? filter, out Tuple<T1,T2,T3>? item);
```

Attempts to synchronously receive an available output item from the `IReceivableSourceBlock<T>`.

Parameters:

- `filter`: The predicate value must successfully pass in order for it to be received.  `filter` may be `null`, in which case all items will pass.
- `item`: The item received from the source.

Returns: `true` if an item could be received; otherwise, `false`.

#### Remarks
This method does not block waiting for the source to provide an item.

It will return after checking for an element, whether or not an element was available.

## JoinBlock<T1,T2,T3>.TryReceiveAll(Tuple<T1,T2,T3>>) method

```csharp
public bool TryReceiveAll (out System.Collections.Generic.IList<Tuple<T1,T2,T3>>? items);
```

Attempts to synchronously receive all available items from the `IReceivableSourceBlock<T>`.

Parameters:

- `items`: The items received from the source.

Returns: `true` if one or more items could be received; otherwise, `false`.

#### Remarks
This method does not block waiting for the source to provide an item.

It will return after checking for elements, whether or not an element was available.
