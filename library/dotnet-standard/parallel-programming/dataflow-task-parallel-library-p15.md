---
title: "Dataflow (Task Parallel Library) (part 15 of 15)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/dataflow-task-parallel-library.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Dataflow (Task Parallel Library) (part 15 of 15)

## Configuring Dataflow  Block Behavior

 You can enable additional options by providing a `System.Threading.Tasks.Dataflow.DataflowBlockOptions` object to the constructor of dataflow block types. These options control behavior such the scheduler that manages the underlying task and the degree of parallelism. The `System.Threading.Tasks.Dataflow.DataflowBlockOptions` also has derived types that specify behavior that is specific to certain dataflow block types. The following table summarizes which options type is associated with each dataflow block type.

|Dataflow Block Type|`System.Threading.Tasks.Dataflow.DataflowBlockOptions` type|
|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`System.Threading.Tasks.Dataflow.BufferBlock`1`|`System.Threading.Tasks.Dataflow.DataflowBlockOptions`|
|`System.Threading.Tasks.Dataflow.BroadcastBlock`1`|`System.Threading.Tasks.Dataflow.DataflowBlockOptions`|
|`System.Threading.Tasks.Dataflow.WriteOnceBlock`1`|`System.Threading.Tasks.Dataflow.DataflowBlockOptions`|
|`System.Threading.Tasks.Dataflow.ActionBlock`1`|`System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions`|
|`System.Threading.Tasks.Dataflow.TransformBlock`2`|`System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions`|
|`System.Threading.Tasks.Dataflow.TransformManyBlock`2`|`System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions`|
|`System.Threading.Tasks.Dataflow.BatchBlock`1`|`System.Threading.Tasks.Dataflow.GroupingDataflowBlockOptions`|
|`System.Threading.Tasks.Dataflow.JoinBlock`2`|`System.Threading.Tasks.Dataflow.GroupingDataflowBlockOptions`|
|`System.Threading.Tasks.Dataflow.BatchedJoinBlock`2`|`System.Threading.Tasks.Dataflow.GroupingDataflowBlockOptions`|

 The following sections provide additional information about the important kinds of dataflow block options that are available through the `System.Threading.Tasks.Dataflow.DataflowBlockOptions`, `System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions`, and `System.Threading.Tasks.Dataflow.GroupingDataflowBlockOptions` classes.

### Specifying the Task Scheduler

 Every predefined dataflow block uses the TPL task scheduling mechanism to perform activities such as propagating data to a target, receiving data from a source, and running user-defined delegates when data becomes available. `System.Threading.Tasks.TaskScheduler` is an abstract class that represents a task scheduler that queues tasks onto threads. The default task scheduler, `System.Threading.Tasks.TaskScheduler.Default*`, uses the `System.Threading.ThreadPool` class to queue and execute work. You can override the default task scheduler by setting the `System.Threading.Tasks.Dataflow.DataflowBlockOptions.TaskScheduler` property when you construct a dataflow block object.

 When the same task scheduler manages multiple dataflow blocks, it can enforce policies across them. For example, if multiple dataflow blocks are each configured to target the exclusive scheduler of the same `System.Threading.Tasks.ConcurrentExclusiveSchedulerPair` object, all work that runs across these blocks is serialized. Similarly, if these blocks are configured to target the concurrent scheduler of the same `System.Threading.Tasks.ConcurrentExclusiveSchedulerPair` object, and that scheduler is configured to have a maximum concurrency level, all work from these blocks is limited to that number of concurrent operations. For an example that uses the `System.Threading.Tasks.ConcurrentExclusiveSchedulerPair` class to enable read operations to occur in parallel, but write operations to occur exclusively of all other operations, see How to: Specify a Task Scheduler in a Dataflow Block. For more information about task schedulers in the TPL, see the `System.Threading.Tasks.TaskScheduler` class topic.

### Specifying the Degree of Parallelism

 By default, the three execution block types that the TPL Dataflow Library provides, `System.Threading.Tasks.Dataflow.ActionBlock`1`, `System.Threading.Tasks.Dataflow.TransformBlock`2`, and `System.Threading.Tasks.Dataflow.TransformManyBlock`2`, process one message at a time. These dataflow block types also process messages in the order in which they are received. To enable these dataflow blocks to process messages concurrently, set the `System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions.MaxDegreeOfParallelism` property when you construct the dataflow block object.

 The default value of `System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions.MaxDegreeOfParallelism*` is 1, which guarantees that the dataflow block processes one message at a time. Setting this property to a value that is larger than 1 enables the dataflow block to process multiple messages concurrently. Setting this property to `System.Threading.Tasks.Dataflow.DataflowBlockOptions.Unbounded` enables the underlying task scheduler to manage the maximum degree of concurrency.

> **Important:**
> When you specify a maximum degree of parallelism that is larger than 1, multiple messages are processed simultaneously, and therefore messages might not be processed in the order in which they are received. The order in which the messages are output from the block is, however, the same one in which they are received.

 Because the `System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions.MaxDegreeOfParallelism` property represents the maximum degree of parallelism, the dataflow block might execute with a lesser degree of parallelism than you specify. The dataflow block might use a lesser degree of parallelism to meet its functional requirements or because there is a lack of available system resources. A dataflow block never chooses more parallelism than you specify.

 The value of the `System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions.MaxDegreeOfParallelism` property is exclusive to each dataflow block object. For example, if four dataflow block objects each specify 1 for the maximum degree of parallelism, all four dataflow block objects can potentially run in parallel.

 For an example that sets the maximum degree of parallelism to enable lengthy operations to occur in parallel, see How to: Specify the Degree of Parallelism in a Dataflow Block.

### Specifying the Number of Messages per Task

 The predefined dataflow block types use tasks to process multiple input elements. This helps minimize the number of task objects that are required to process data, which enables applications to run more efficiently. However, when the tasks from one set of dataflow blocks are processing data, the tasks from other dataflow blocks might need to wait for processing time by queuing messages. To enable better fairness among dataflow tasks, set the `System.Threading.Tasks.Dataflow.DataflowBlockOptions.MaxMessagesPerTask` property. When `System.Threading.Tasks.Dataflow.DataflowBlockOptions.MaxMessagesPerTask*` is set to `System.Threading.Tasks.Dataflow.DataflowBlockOptions.Unbounded`, which is the default, the task used by a dataflow block processes as many messages as are available. When `System.Threading.Tasks.Dataflow.DataflowBlockOptions.MaxMessagesPerTask*` is set to a value other than `System.Threading.Tasks.Dataflow.DataflowBlockOptions.Unbounded`, the dataflow block processes at most this number of messages per `System.Threading.Tasks.Task` object. Although setting the `System.Threading.Tasks.Dataflow.DataflowBlockOptions.MaxMessagesPerTask` property can increase fairness among tasks, it can cause the system to create more tasks than are necessary, which can decrease performance.

### Enabling Cancellation

 The TPL provides a mechanism that enables tasks to coordinate cancellation in a cooperative manner. To enable dataflow blocks to participate in this cancellation mechanism, set the `System.Threading.Tasks.Dataflow.DataflowBlockOptions.CancellationToken` property. When this `System.Threading.CancellationToken` object is set to the canceled state, all dataflow blocks that monitor this token finish execution of their current item but don't start processing subsequent items. These dataflow blocks also clear any buffered messages, release connections to any source and target blocks, and transition to the canceled state. By transitioning to the canceled state, the `System.Threading.Tasks.Dataflow.IDataflowBlock.Completion` property has the `System.Threading.Tasks.Task.Status` property set to `System.Threading.Tasks.TaskStatus.Canceled`, unless an exception occurred during processing. In that case, `System.Threading.Tasks.Task.Status*` is set to `System.Threading.Tasks.TaskStatus.Faulted`.

 For an example that demonstrates how to use cancellation in a Windows Forms application, see How to: Cancel a Dataflow Block. For more information about cancellation in the TPL, see Task Cancellation.

### Specifying Greedy Versus Non-Greedy Behavior

 Several grouping dataflow block types can operate in either *greedy* or *non-greedy* mode. By default, the predefined dataflow block types operate in greedy mode.

 For join block types such as `System.Threading.Tasks.Dataflow.JoinBlock`2`, greedy mode means that the block immediately accepts data even if the corresponding data with which to join isn't yet available. Non-greedy mode means that the block postpones all incoming messages until one is available on each of its targets to complete the join. If any of the postponed messages are no longer available, the join block releases all postponed messages and restarts the process. For the `System.Threading.Tasks.Dataflow.BatchBlock`1` class, greedy and non-greedy behavior is similar, except that under non-greedy mode, a `System.Threading.Tasks.Dataflow.BatchBlock`1` object postpones all incoming messages until enough are available from distinct sources to complete a batch.

 To specify non-greedy mode for a dataflow block, set `System.Threading.Tasks.Dataflow.GroupingDataflowBlockOptions.Greedy*` to `False`. For an example that demonstrates how to use non-greedy mode to enable multiple join blocks to share a data source more efficiently, see How to: Use JoinBlock to Read Data From Multiple Sources.

## Custom Dataflow Blocks

 Although the TPL Dataflow Library provides many predefined block types, you can create additional block types that perform custom behavior. Implement the `System.Threading.Tasks.Dataflow.ISourceBlock`1` or `System.Threading.Tasks.Dataflow.ITargetBlock`1` interfaces directly or use the  `System.Threading.Tasks.Dataflow.DataflowBlock.Encapsulate*` method to build a complex block that encapsulates the behavior of existing block types. For examples that show how to implement custom dataflow block functionality, see Walkthrough: Creating a Custom Dataflow Block Type.

## Related Topics

|Title|Description|
|-----------|-----------------|
|How to: Write Messages to and Read Messages from a Dataflow Block|Demonstrates how to write messages to and read messages from a `System.Threading.Tasks.Dataflow.BufferBlock`1` object.|
|How to: Implement a Producer-Consumer Dataflow Pattern|Describes how to use the dataflow model to implement a producer-consumer pattern, where the producer sends messages to a dataflow block, and the consumer reads messages from that block.|
|How to: Perform Action When a Dataflow Block Receives Data|Describes how to provide delegates to the execution dataflow block types, `System.Threading.Tasks.Dataflow.ActionBlock`1`, `System.Threading.Tasks.Dataflow.TransformBlock`2`, and `System.Threading.Tasks.Dataflow.TransformManyBlock`2`.|
|Walkthrough: Creating a Dataflow Pipeline|Describes how to create a dataflow pipeline that downloads text from the web and performs operations on that text.|
|How to: Unlink Dataflow Blocks|Demonstrates how to use the `System.Threading.Tasks.Dataflow.ISourceBlock`1.LinkTo*` method to unlink a target block from its source after the source offers a message to the target.|
|Walkthrough: Using Dataflow in a Windows Forms Application|Demonstrates how to create a network of dataflow blocks that perform image processing in a Windows Forms application.|
|How to: Cancel a Dataflow Block|Demonstrates how to use cancellation in a Windows Forms application.|
|How to: Use JoinBlock to Read Data From Multiple Sources|Explains how to use the `System.Threading.Tasks.Dataflow.JoinBlock`2` class to perform an operation when data is available from multiple sources, and how to use non-greedy mode to enable multiple join blocks to share a data source more efficiently.|
|How to: Specify the Degree of Parallelism in a Dataflow Block|Describes how to set the `System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions.MaxDegreeOfParallelism` property to enable an execution dataflow block to process more than one message at a time.|
|How to: Specify a Task Scheduler in a Dataflow Block|Demonstrates how to associate a specific task scheduler when you use dataflow in your application.|
|Walkthrough: Using BatchBlock and BatchedJoinBlock to Improve Efficiency|Describes how to use the `System.Threading.Tasks.Dataflow.BatchBlock`1` class to improve the efficiency of database insert operations, and how to use the `System.Threading.Tasks.Dataflow.BatchedJoinBlock`2` class to capture both the results and any exceptions that occur while the program reads from a database.|
|Walkthrough: Creating a Custom Dataflow Block Type|Demonstrates two ways to create a dataflow block type that implements custom behavior.|
|Task Parallel Library (TPL)|Introduces the TPL, a library that simplifies parallel and concurrent programming in .NET Framework applications.|
