---
title: "TaskContinuationOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskContinuationOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskContinuationOptions enum

Namespace: `System.Threading.Tasks`

```csharp
public enum TaskContinuationOptions
```

Specifies the behavior for a task that is created by using the `Task.ContinueWith` or `Task<T>.ContinueWith` method.

To be added.

## TaskContinuationOptions.AttachedToParent field

```csharp
AttachedToParent
```

Specifies that the continuation, if it is a child task, is attached to a parent in the task hierarchy. The continuation can be a child task only if its antecedent is also a child task. By default, a child task (that is, an inner task created by an outer task) executes independently of its parent. You can use the `TaskContinuationOptions.AttachedToParent` option so that the parent and child tasks are synchronized.

Note that if a parent task is configured with the `TaskCreationOptions.DenyChildAttach` option, the `TaskCreationOptions.AttachedToParent` option in the child task has no effect, and the child task will execute as a detached child task.

For more information, see Attached and Detached Child Tasks.

## TaskContinuationOptions.DenyChildAttach field

```csharp
DenyChildAttach
```

Specifies that any child task (that is, any nested inner task created by this continuation) that is created with the `TaskCreationOptions.AttachedToParent` option and attempts to execute as an attached child task will not be able to attach to the parent task and will execute instead as a detached child task. For more information, see Attached and Detached Child Tasks.

## TaskContinuationOptions.ExecuteSynchronously field

```csharp
ExecuteSynchronously
```

Specifies that the continuation task should be executed synchronously. With this option specified, the continuation runs on the same thread that causes the antecedent task to transition into its final state. If the antecedent is already complete when the continuation is created, the continuation will run on the thread that creates the continuation. If the antecedent's `CancellationTokenSource` is disposed in a `finally` block (`Finally` in Visual Basic), a continuation with this option will run in that `finally` block. Only very short-running continuations should be executed synchronously.

Because the task executes synchronously, there is no need to call a method such as `Task.Wait` to ensure that the calling thread waits for the task to complete.

## TaskContinuationOptions.HideScheduler field

```csharp
HideScheduler
```

Specifies that tasks created by the continuation by calling methods such as `Task.Run` or `Task.ContinueWith` see the default scheduler (`TaskScheduler.Default`) rather than the scheduler on which this continuation is running as the current scheduler.

## TaskContinuationOptions.LazyCancellation field

```csharp
LazyCancellation
```

In the case of continuation cancellation, prevents completion of the continuation until the antecedent has completed.

## TaskContinuationOptions.LongRunning field

```csharp
LongRunning
```

Specifies that a continuation will be a long-running, course-grained operation. It provides a hint to the `TaskScheduler` that oversubscription may be warranted.

## TaskContinuationOptions.None field

```csharp
None
```

When no continuation options are specified, specifies that default behavior should be used when executing a continuation. The continuation runs asynchronously when the antecedent task completes, regardless of the antecedent's final `Task.Status` property value. If the continuation is a child task, it is created as a detached nested task.

## TaskContinuationOptions.NotOnCanceled field

```csharp
NotOnCanceled
```

Specifies that the continuation task should not be scheduled if its antecedent was canceled. An antecedent is canceled if its `Task.Status` property upon completion is `TaskStatus.Canceled`. This option is not valid for multi-task continuations.

## TaskContinuationOptions.NotOnFaulted field

```csharp
NotOnFaulted
```

Specifies that the continuation task should not be scheduled if its antecedent threw an unhandled exception. An antecedent throws an unhandled exception if its `Task.Status` property upon completion is `TaskStatus.Faulted`. This option is not valid for multi-task continuations.

## TaskContinuationOptions.NotOnRanToCompletion field

```csharp
NotOnRanToCompletion
```

Specifies that the continuation task should not be scheduled if its antecedent ran to completion. An antecedent runs to completion if its `Task.Status` property upon completion is `TaskStatus.RanToCompletion`. This option is not valid for multi-task continuations.

## TaskContinuationOptions.OnlyOnCanceled field

```csharp
OnlyOnCanceled
```

Specifies that the continuation should be scheduled only if its antecedent was canceled.  An antecedent is canceled if its `Task.Status` property upon completion is `TaskStatus.Canceled`. This option is not valid for multi-task continuations.

## TaskContinuationOptions.OnlyOnFaulted field

```csharp
OnlyOnFaulted
```

Specifies that the continuation task should be scheduled only if its antecedent threw an unhandled exception. An antecedent throws an unhandled exception if its `Task.Status` property upon completion is `TaskStatus.Faulted`.

The `TaskContinuationOptions.OnlyOnFaulted` option guarantees that the `Task.Exception` property in the antecedent is not `null`. You can use that property to catch the exception and see which exception caused the task to fault. If you do not access the `Task.Exception` property, the exception is unhandled. Also, if you attempt to access the `Task<T>.Result` property of a task that has been canceled or has faulted, a new exception is thrown.

This option is not valid for multi-task continuations.

## TaskContinuationOptions.OnlyOnRanToCompletion field

```csharp
OnlyOnRanToCompletion
```

Specifies that the continuation should be scheduled only if its antecedent ran to completion. An antecedent runs to completion if its `Task.Status` property upon completion is `TaskStatus.RanToCompletion`. This option is not valid for multi-task continuations.

## TaskContinuationOptions.PreferFairness field

```csharp
PreferFairness
```

A hint to a `TaskScheduler` to schedule task in the order in which they were scheduled, so that tasks scheduled sooner are more likely to run sooner, and tasks scheduled later are more likely to run later.

## TaskContinuationOptions.RunContinuationsAsynchronously field

```csharp
RunContinuationsAsynchronously
```

Specifies that the continuation task should be run asynchronously.  This option has precedence over `TaskContinuationOptions.ExecuteSynchronously`.
