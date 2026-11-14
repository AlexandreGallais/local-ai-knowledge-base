---
title: "TaskCreationOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskCreationOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskCreationOptions enum

Namespace: `System.Threading.Tasks`

```csharp
public enum TaskCreationOptions
```

Specifies flags that control optional behavior for the creation and execution of tasks.

#### Remarks
The `TaskCreationOptions` enumeration is used with the following methods:

- The `TaskFactory.%23ctor` and `TaskFactory<T>.%23ctor` constructors with a `creationOptions` parameter, to specify the default options for tasks created by the task factory.

- The `Task.%23ctor` and `Task<T>.%23ctor` constructors with a `creationOptions` parameter, to specify the options used to customize the task's behavior.

- The `TaskFactory.StartNew` and `TaskFactory<T>.StartNew` methods with a `creationOptions` parameter, to specify the options used to customize the task's behavior.

- The `TaskFactory.FromAsync` and `TaskFactory<T>.FromAsync` methods with a `creationOptions` parameter, to specify the options used to customize the behavior of the task that executes an end method when a specified `IAsyncResult` completes.

- The `TaskCompletionSource<T>.%23ctor` constructors with a `creationOptions` parameter, to specify the options used to customize the behavior of the underlying task.

## TaskCreationOptions.AttachedToParent field

```csharp
AttachedToParent
```

Specifies that a task is attached to a parent in the task hierarchy. By default, a child task (that is, an inner task created by an outer task) executes independently of its parent. You can use the `TaskContinuationOptions.AttachedToParent` option so that the parent and child tasks are synchronized.

Note that if a parent task is configured with the `TaskCreationOptions.DenyChildAttach` option, the `TaskCreationOptions.AttachedToParent` option in the child task has no effect, and the child task will execute as a detached child task.

For more information, see Attached and Detached Child Tasks.

## TaskCreationOptions.DenyChildAttach field

```csharp
DenyChildAttach
```

Specifies that any child task that attempts to execute as an attached child task (that is, it is created with the `TaskCreationOptions.AttachedToParent` option) will not be able to attach to the parent task and will execute instead as a detached child task. For more information, see Attached and Detached Child Tasks.

## TaskCreationOptions.HideScheduler field

```csharp
HideScheduler
```

Prevents the ambient scheduler from being seen as the current scheduler in the created task. This means that operations like StartNew or ContinueWith that are performed in the created task will see `TaskScheduler.Default` as the current scheduler.

## TaskCreationOptions.LongRunning field

```csharp
LongRunning
```

Specifies that a task will be a long-running, coarse-grained operation involving fewer, larger components than fine-grained systems. It provides a hint to the `TaskScheduler` that oversubscription may be warranted. Oversubscription lets you create more threads than the available number of hardware threads. It also provides a hint  to the task scheduler that an additional thread might be required for the task so that it does not block the forward progress of other threads or work items on the local thread-pool queue.

## TaskCreationOptions.None field

```csharp
None
```

Specifies that the default behavior should be used.

## TaskCreationOptions.PreferFairness field

```csharp
PreferFairness
```

A hint to a `TaskScheduler` to schedule a task in as fair a manner as possible, meaning that tasks scheduled sooner will be more likely to be run sooner, and tasks scheduled later will be more likely to be run later.

## TaskCreationOptions.RunContinuationsAsynchronously field

```csharp
RunContinuationsAsynchronously
```

Forces continuations added to the current task to be executed asynchronously.
