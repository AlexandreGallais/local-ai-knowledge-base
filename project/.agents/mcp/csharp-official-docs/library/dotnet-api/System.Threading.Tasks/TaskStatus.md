---
title: "TaskStatus enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskStatus.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskStatus enum

Namespace: `System.Threading.Tasks`

```csharp
public enum TaskStatus
```

Represents the current stage in the lifecycle of a `Task`.

#### Remarks
The `Status` property returns a member of the `TaskStatus` enumeration to indicate the task's current status.

#### Examples
The following example creates 20 tasks that will loop until a counter is incremented to a value of 2 million. When the first 10 tasks reach 2 million, the cancellation token is cancelled, and any tasks whose counters have not reached 2 million are cancelled. The example then examines the `Status` property of each task to indicate whether the task has completed successfully or been cancelled. For those that have completed, it displays the value returned by the task.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/Run7.cs._

## TaskStatus.Canceled field

```csharp
Canceled
```

The task acknowledged cancellation by throwing an OperationCanceledException with its own CancellationToken while the token was in signaled state, or the task's CancellationToken was already signaled before the task started executing. For more information, see Task Cancellation.

## TaskStatus.Created field

```csharp
Created
```

The task has been initialized but has not yet been scheduled.

## TaskStatus.Faulted field

```csharp
Faulted
```

The task completed due to an unhandled exception.

## TaskStatus.RanToCompletion field

```csharp
RanToCompletion
```

The task completed execution successfully.

## TaskStatus.Running field

```csharp
Running
```

The task is running but has not yet completed.

## TaskStatus.WaitingForActivation field

```csharp
WaitingForActivation
```

The task is waiting to be activated and scheduled internally by the .NET infrastructure.

## TaskStatus.WaitingForChildrenToComplete field

```csharp
WaitingForChildrenToComplete
```

The task has finished executing and is implicitly waiting for attached child tasks to complete.

## TaskStatus.WaitingToRun field

```csharp
WaitingToRun
```

The task has been scheduled for execution but has not yet begun executing.
