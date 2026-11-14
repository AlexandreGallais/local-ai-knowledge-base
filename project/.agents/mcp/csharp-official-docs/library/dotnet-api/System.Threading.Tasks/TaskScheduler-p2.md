---
title: "TaskScheduler class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskScheduler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskScheduler class (part 2 of 2)

## TaskScheduler.TryDequeue(Task) method

```csharp
protected internal virtual bool TryDequeue (System.Threading.Tasks.Task task);
```

Attempts to dequeue a `Task` that was previously queued to this scheduler.

Parameters:

- `task`: The `Task` to be dequeued.

Returns: A Boolean denoting whether the `task` argument was successfully dequeued.

Exceptions:

- `ArgumentNullException`: The `task` argument is null.

#### Remarks
For more information, see `TaskScheduler`.

This method may execute in a finally block; therefore it should return as quickly as possible so that any resources such as `CancellationTokenRegistration` objects can be disposed of in a timely manner.

## TaskScheduler.TryExecuteTask(Task) method

```csharp
protected bool TryExecuteTask (System.Threading.Tasks.Task task);
```

Attempts to execute the provided `Task` on this scheduler.

Parameters:

- `task`: A `Task` object to be executed.

Returns: A Boolean that is true if `task` was successfully executed, false if it was not. A common reason for execution failure is that the task had previously been executed or is in the process of being executed by another thread.

Exceptions:

- `InvalidOperationException`: The `task` is not associated with this scheduler.

#### Remarks
Scheduler implementations are provided with `Task` instances to be executed through either the `TaskScheduler.QueueTask` method or the `TaskScheduler.TryExecuteTaskInline` method. When the scheduler deems it appropriate to run the provided task, `TaskScheduler.TryExecuteTask` should be used to do so. TryExecuteTask handles all aspects of executing a task, including action invocation, exception handling, state management, and lifecycle control.

`TaskScheduler.TryExecuteTask` must only be used for tasks provided to this scheduler by the .NET runtime. It should not be used to execute arbitrary tasks obtained through custom mechanisms.

## TaskScheduler.TryExecuteTaskInline(Task, Boolean) method

```csharp
protected abstract bool TryExecuteTaskInline (System.Threading.Tasks.Task task, bool taskWasPreviouslyQueued);
```

Determines whether the provided `Task` can be executed synchronously in this call, and if it can, executes it.

Parameters:

- `task`: The `Task` to be executed.
- `taskWasPreviouslyQueued`: A Boolean denoting whether or not task has previously been queued. If this parameter is True, then the task may have been previously queued (scheduled); if False, then the task is known not to have been queued, and this call is being made in order to execute the task inline without queuing it.

Returns: A Boolean value indicating whether the task was executed inline.

Exceptions:

- `ArgumentNullException`: The `task` argument is null.
- `InvalidOperationException`: The `task` was already executed.

#### Remarks
A class derived from `TaskScheduler` implements this function to support inline execution of a task on a thread that initiates a wait on that task object. Inline execution is optional, and the request may be rejected by returning false. However, the more tasks that can be inlined, the better the scheduler will scale. In fact, a scheduler that inlines too little may be prone to deadlocks. A proper implementation should ensure that a request executing under the policies guaranteed by the scheduler can successfully inline. For example, if a scheduler uses a dedicated thread to execute tasks, any inlining requests from that thread should succeed.

If a scheduler decides to perform the inline execution, it should do so by calling to the base TaskScheduler's `TaskScheduler.TryExecuteTask` method with the provided task object, propagating the return value. It may also be appropriate for the scheduler to remove an inlined task from its internal data structures if it decides to honor the inlining request. Note, however, that under some circumstances a scheduler may be asked to inline a task that was not previously provided to it with the `TaskScheduler.QueueTask` method.

The derived scheduler is responsible for making sure that the calling thread is suitable for executing the given task as far as its own scheduling and execution policies are concerned.

For more information, see `TaskScheduler`.

## TaskScheduler.UnobservedTaskException event

```csharp
public static event EventHandler<System.Threading.Tasks.UnobservedTaskExceptionEventArgs>? UnobservedTaskException;
```

Occurs when a faulted task's unobserved exception is about to trigger exception escalation policy, which, by default, would terminate the process.

#### Remarks

This event provides a mechanism to prevent exception escalation policy (which, by default, terminates the process) from triggering.

To make it easier for developers to write asynchronous code based on tasks, unobserved exceptions raise the `UnobservedTaskException` exception, but the process does not terminate by default. Instead, the exception is handled by the runtime after the event is raised, regardless of whether an event handler observes the exception.
