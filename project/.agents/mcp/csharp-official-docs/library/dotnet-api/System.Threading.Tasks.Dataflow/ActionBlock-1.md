---
title: "ActionBlock<TInput> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/ActionBlock`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActionBlock<TInput> class

Namespace: `System.Threading.Tasks.Dataflow`

```csharp
public sealed class ActionBlock<TInput> : System.Threading.Tasks.Dataflow.ITargetBlock<TInput>
```

Provides a dataflow block that invokes a provided `Action<T>` delegate for every data element received.

Parameters:

- `TInput`: The type of data that this `ActionBlock<T>` operates on.

#### Examples

The following example shows the use of the `ActionBlock<T>` class to perform several computations using dataflow blocks, and returns the elapsed time required to perform the computations. This code example is part of a larger example provided for the How to: Specify the Degree of Parallelism in a Dataflow Block article.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks.Dataflow/ActionBlock`1/dataflowdegreeofparallelism.cs._

## ActionBlock<TInput>.ActionBlock(Action<TInput>) constructor

```csharp
public ActionBlock (Action<TInput> action);
```

Initializes a new instance of the `ActionBlock<T>` class with the specified action.

Parameters:

- `action`: The action to invoke with each data element received.

Exceptions:

- `ArgumentNullException`: `action` is `null`.

To be added.

## ActionBlock<TInput>.ActionBlock(Task>) constructor

```csharp
public ActionBlock (Func<TInput,System.Threading.Tasks.Task> action);
```

Initializes a new instance of the `ActionBlock<T>` class with the specified action.

Parameters:

- `action`: The action to invoke with each data element received.

Exceptions:

- `ArgumentNullException`: `action` is `null`.

To be added.

## ActionBlock<TInput>.ActionBlock(Action<TInput>, ExecutionDataflowBlockOptions) constructor

```csharp
public ActionBlock (Action<TInput> action, System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions dataflowBlockOptions);
```

Initializes a new instance of the `ActionBlock<T>` class with the specified action and configuration options.

Parameters:

- `action`: The action to invoke with each data element received.
- `dataflowBlockOptions`: The options with which to configure this `ActionBlock<T>`.

Exceptions:

- `ArgumentNullException`: `action` is `null`.

-or-

`dataflowBlockOptions` is `null`.

#### Examples
The following example shows how to use the `%23ctor` constructor to create a new `ActionBlock<T>` object. This code example is part of a larger example provided for the How to: Specify the Degree of Parallelism in a Dataflow Block topic.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks.Dataflow/ActionBlock`1/dataflowdegreeofparallelism.cs._

## ActionBlock<TInput>.ActionBlock(Task>, ExecutionDataflowBlockOptions) constructor

```csharp
public ActionBlock (Func<TInput,System.Threading.Tasks.Task> action, System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions dataflowBlockOptions);
```

Initializes a new instance of the `ActionBlock<T>` class with the specified action and configuration options.

Parameters:

- `action`: The action to invoke with each data element received.
- `dataflowBlockOptions`: The options with which to configure this `ActionBlock<T>`.

Exceptions:

- `ArgumentNullException`: `action` is `null`.

-or-

`dataflowBlockOptions` is `null`.

To be added.

## ActionBlock<TInput>.Completion property

```csharp
public System.Threading.Tasks.Task Completion { get; }
```

Gets a  `Task` object that represents the asynchronous operation and completion of the dataflow block.

Returns: The completed task.

#### Remarks
A dataflow block is considered completed when it is not currently processing a message and when it has guaranteed that it will not process any more messages. The returned `Task` will transition to a completed state  when the associated block has completed. It will transition to the `RanToCompletion` state when the block completes its processing successfully according to the dataflow block's defined semantics. It will transition to the `Faulted` state when the dataflow block has completed processing prematurely due to an unhandled exception, and it will transition to the  `Canceled` state when the dataflow block has completed processing prematurely after receiving a cancellation request. If the task completes in the `Faulted` state, its `Exception` property returns an `AggregateException` exception that contains one or more exceptions that caused the block to fail.

#### Examples
The following example shows how to use the `Completion` property to wait for all messages to propagate through the network. This code example is part of a larger example provided for the How to: Specify the Degree of Parallelism in a Dataflow Block topic.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks.Dataflow/ActionBlock`1/dataflowdegreeofparallelism.cs._

## ActionBlock<TInput>.InputCount property

```csharp
public int InputCount { get; }
```

Gets the number of input items waiting to be processed by this block.

Returns: The number of input items waiting to be processed by this block.

#### Remarks
The `ActionBlock<T>.InputCount` does not include any items that are currently being processed by the block or any items that have already been processed by the block.

## ActionBlock<TInput>.Complete() method

```csharp
public void Complete ();
```

Signals to the dataflow block  that it shouldn't accept or produce any more messages and shouldn't consume any more postponed messages.

#### Remarks
After `ActionBlock<T>.Complete` has been called on a dataflow block, that block will complete (so that its  `ActionBlock<T>.Completion` task will enter a final state) after it has processed all previously available data. This method will not block waiting for completion to occur, but will initiate the request. To wait for completion to occur, use the `Completion` property.

#### Examples
The following example shows the use of the `ActionBlock<T>.Complete` method to signal to the dataflow block  that it shouldn't accept or produce any more messages nor consume any more postponed messages. This code example is part of a larger example provided for the How to: Specify the Degree of Parallelism in a Dataflow Block topic.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks.Dataflow/ActionBlock`1/dataflowdegreeofparallelism.cs._

## ActionBlock<TInput>.Post(TInput) method

```csharp
public bool Post (TInput item);
```

Posts an item to the target dataflow block.

Parameters:

- `item`: The item being offered to the target.

Returns: `true` if the item is posted to the dataflow block; otherwise, `false`.

#### Examples
The following example shows how to use the `ActionBlock<T>.Post` method to post an item to the target dataflow block. This code example is part of a larger example provided for the How to: Specify the Degree of Parallelism in a Dataflow Block topic.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks.Dataflow/ActionBlock`1/dataflowdegreeofparallelism.cs._

## ActionBlock<TInput>.System.Threading.Tasks.Dataflow.IDataflowBlock.Fault(Exception) method

```csharp
void IDataflowBlock.Fault (Exception exception);
```

Causes the dataflow block to complete in a faulted state.

Parameters:

- `exception`: The exception that caused the faulting.

Exceptions:

- `ArgumentNullException`: `exception` is `null`.

#### Remarks
After `IDataflowBlock.Fault` has been called on a dataflow block, that block will complete and its  `ActionBlock<T>.Completion` task will enter a final state. Faulting a block, as with canceling a block, causes buffered messages (unprocessed input messages as well as unoffered output messages) to be lost.

## ActionBlock<TInput>.System.Threading.Tasks.Dataflow.ITargetBlock<TInput>.OfferMessage(DataflowMessageHeader, TInput, ISourceBlock<TInput>, Boolean) method

```csharp
System.Threading.Tasks.Dataflow.DataflowMessageStatus ITargetBlock<TInput>.OfferMessage (System.Threading.Tasks.Dataflow.DataflowMessageHeader messageHeader, TInput messageValue, System.Threading.Tasks.Dataflow.ISourceBlock<TInput> source, bool consumeToAccept);
```

Offers a message to the dataflow block, and gives it the opportunity to consume or postpone the message.

Parameters:

- `messageHeader`: The header of the message being offered.
- `messageValue`: The value of the message being offered.
- `source`: The dataflow block that is offering the message. This may be `null`.
- `consumeToAccept`: `true` to instruct the target to call `ISourceBlock<T>.ConsumeMessage` synchronously during the call to `ITargetBlock<T>.OfferMessage`, prior to returning `DataflowMessageStatus.Accepted`, in order to consume the message; otherwise, `false`.

Returns: The status of the offered message.  If the message was accepted by the target, `DataflowMessageStatus.Accepted` is returned, and the source should no longer use the offered message, because it is now owned by the target. If the message was postponed by the target, `DataflowMessageStatus.Postponed` is returned as a notification that the target may later attempt to consume or reserve the message; in the meantime, the source still owns the message and may offer it to other blocks.

If the target would have otherwise postponed message, but source was `null`, `DataflowMessageStatus.Declined` is returned.

If the target tried to accept the message but missed it due to the source delivering the message to another target or simply discarding it, `DataflowMessageStatus.NotAvailable` is returned.

If the target chose not to accept the message, `DataflowMessageStatus.Declined` is returned. If the target chose not to accept the message and will never accept another message from this source, `DataflowMessageStatus.DecliningPermanently` is returned.

Exceptions:

- `ArgumentException`: `messageHeader` is not valid.

-or- `consumeToAccept` may be `true` only if provided with a non-null `source`.

To be added.

## ActionBlock<TInput>.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the formatted name of this `IDataflowBlock` instance.

Returns: A string that represents the formatted name of this `IDataflowBlock` instance.

#### Remarks
Inherited from `Object`. Uses the  `DataflowBlockOptions.NameFormat` option.
