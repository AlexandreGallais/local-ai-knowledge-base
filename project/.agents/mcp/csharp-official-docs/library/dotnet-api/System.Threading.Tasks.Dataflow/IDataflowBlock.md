---
title: "IDataflowBlock interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks.Dataflow/IDataflowBlock.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IDataflowBlock interface

Namespace: `System.Threading.Tasks.Dataflow`

```csharp
public interface IDataflowBlock
```

Represents a dataflow block.

To be added.

## IDataflowBlock.Completion property

```csharp
public System.Threading.Tasks.Task Completion { get; }
```

Gets a  `Task` that represents the asynchronous operation and completion of the dataflow block.

Returns: The task.

#### Remarks
A dataflow block is considered completed when it is not currently processing a message and when it has guaranteed that it will not process any more messages. The returned `Task` will transition to a completed state when the associated block has completed. It will transition to the `TaskStatus``RanToCompletion` state when the block completes its processing successfully according to the dataflow block's defined semantics. It will transition to the `TaskStatus``Faulted` state when the dataflow block has completed processing prematurely due to an unhandled exception, and it will transition to the `TaskStatus``Canceled` state when the dataflow block has completed processing prematurely due to receiving a cancellation request. If the task completes in the `Faulted` state, its `Exception` property will return an `AggregateException` containing the one or more exceptions that caused the block to fail.

## IDataflowBlock.Complete() method

```csharp
public void Complete ();
```

Signals to the `IDataflowBlock` that it should not accept nor produce any more messages nor consume any more postponed messages.

#### Remarks
After `IDataflowBlock.Complete` has been called on a dataflow block, that block will complete, and its `IDataflowBlock.Completion` task will enter a final state after it has processed all previously available data. `IDataflowBlock.Complete` will not block waiting for completion to occur, but rather will initiate the request; to wait for completion to occur, the `IDataflowBlock.Completion` task may be used.

## IDataflowBlock.Fault(Exception) method

```csharp
public void Fault (Exception exception);
```

Causes the `IDataflowBlock` to complete in a  `TaskStatus.Faulted` state.

Parameters:

- `exception`: The  `Exception` that caused the faulting.

Exceptions:

- `ArgumentNullException`: The `exception` is `null`.

#### Remarks
After `IDataflowBlock.Fault` has been called on a dataflow block, that block will complete, and its `IDataflowBlock.Completion` task will enter a final state. Faulting a block, as with canceling a block, causes buffered messages (unprocessed input messages as well as unoffered output messages) to be lost.
