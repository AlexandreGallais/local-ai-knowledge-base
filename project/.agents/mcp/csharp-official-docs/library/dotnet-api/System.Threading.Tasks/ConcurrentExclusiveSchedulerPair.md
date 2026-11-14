---
title: "ConcurrentExclusiveSchedulerPair class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/ConcurrentExclusiveSchedulerPair.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConcurrentExclusiveSchedulerPair class

Namespace: `System.Threading.Tasks`

```csharp
public class ConcurrentExclusiveSchedulerPair
```

Provides task schedulers that coordinate to execute tasks while ensuring that concurrent tasks may run concurrently and exclusive tasks never do.

#### Examples
The following example shows the use of the `ConcurrentExclusiveSchedulerPair` class. Readers run on the concurrent part of the scheduler. The writer runs on the exclusive part of the scheduler. This code example is part of a larger example provided for the How to: Specify a Task Scheduler in a Dataflow Block article.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/ConcurrentExclusiveSchedulerPair/form1.cs._

## ConcurrentExclusiveSchedulerPair.ConcurrentExclusiveSchedulerPair() constructor

```csharp
public ConcurrentExclusiveSchedulerPair ();
```

Initializes a new instance of the `ConcurrentExclusiveSchedulerPair` class.

#### Examples
The following example shows the use of the `ConcurrentExclusiveSchedulerPair.%23ctor` constructor to create a new `ConcurrentExclusiveSchedulerPair` object. This code example is part of a larger example provided for the How to: Specify a Task Scheduler in a Dataflow Block article.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/ConcurrentExclusiveSchedulerPair/form1.cs._

## ConcurrentExclusiveSchedulerPair.ConcurrentExclusiveSchedulerPair(TaskScheduler) constructor

```csharp
public ConcurrentExclusiveSchedulerPair (System.Threading.Tasks.TaskScheduler taskScheduler);
```

Initializes a new instance of the `ConcurrentExclusiveSchedulerPair` class that targets the specified scheduler.

Parameters:

- `taskScheduler`: The target scheduler on which this pair should execute.

To be added.

## ConcurrentExclusiveSchedulerPair.ConcurrentExclusiveSchedulerPair(TaskScheduler, Int32) constructor

```csharp
public ConcurrentExclusiveSchedulerPair (System.Threading.Tasks.TaskScheduler taskScheduler, int maxConcurrencyLevel);
```

Initializes a new instance of the `ConcurrentExclusiveSchedulerPair` class that targets the specified scheduler with a maximum concurrency level.

Parameters:

- `taskScheduler`: The target scheduler on which this pair should execute.
- `maxConcurrencyLevel`: The maximum number of tasks to run concurrently.

To be added.

## ConcurrentExclusiveSchedulerPair.ConcurrentExclusiveSchedulerPair(TaskScheduler, Int32, Int32) constructor

```csharp
public ConcurrentExclusiveSchedulerPair (System.Threading.Tasks.TaskScheduler taskScheduler, int maxConcurrencyLevel, int maxItemsPerTask);
```

Initializes a new instance of the `ConcurrentExclusiveSchedulerPair` class that targets the specified scheduler with a maximum concurrency level and a maximum number of scheduled tasks that may be processed as a unit.

Parameters:

- `taskScheduler`: The target scheduler on which this pair should execute.
- `maxConcurrencyLevel`: The maximum number of tasks to run concurrently.
- `maxItemsPerTask`: The maximum number of tasks to process for each underlying scheduled task used by the pair.

To be added.

## ConcurrentExclusiveSchedulerPair.Completion property

```csharp
public System.Threading.Tasks.Task Completion { get; }
```

Gets a `Task` that will complete when the scheduler has completed processing.

Returns: The asynchronous operation that will complete when the scheduler finishes processing.

To be added.

## ConcurrentExclusiveSchedulerPair.ConcurrentScheduler property

```csharp
public System.Threading.Tasks.TaskScheduler ConcurrentScheduler { get; }
```

Gets a `TaskScheduler` that can be used to schedule tasks to this pair that may run concurrently with other tasks on this pair.

Returns: An object that can be used to schedule tasks concurrently.

#### Examples
The following example shows the use of the `ConcurrentScheduler` property to run a reader. This code example is part of a larger example provided for the How to: Specify a Task Scheduler in a Dataflow Block article.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/ConcurrentExclusiveSchedulerPair/form1.cs._

## ConcurrentExclusiveSchedulerPair.ExclusiveScheduler property

```csharp
public System.Threading.Tasks.TaskScheduler ExclusiveScheduler { get; }
```

Gets a `TaskScheduler` that can be used to schedule tasks to this pair that must run exclusively with regards to other tasks on this pair.

Returns: An object that can be used to schedule tasks that do not run concurrently with other tasks.

#### Examples
The following example shows the use of the `ExclusiveScheduler` property to run a writer. This code example is part of a larger example provided for the How to: Specify a Task Scheduler in a Dataflow Block article.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/ConcurrentExclusiveSchedulerPair/form1.cs._

## ConcurrentExclusiveSchedulerPair.Complete() method

```csharp
public void Complete ();
```

Informs the scheduler pair that it should not accept any more tasks.

#### Remarks
Calling `ConcurrentExclusiveSchedulerPair.Complete` is optional. It is necessary only if you're relying on the `Completion` property for notification that all processing has been completed.
