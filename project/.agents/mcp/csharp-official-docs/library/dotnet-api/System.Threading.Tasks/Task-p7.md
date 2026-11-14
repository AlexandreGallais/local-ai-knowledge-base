---
title: "Task class (part 7 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task class (part 7 of 11)

## Task.Run<TResult>(Func<TResult>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<TResult> Run<TResult> (Func<TResult> function, System.Threading.CancellationToken <example-value>);
```

Queues the specified work to run on the thread pool and returns a `Task(TResult)` object that represents that work.

Parameters:

- `TResult`: The result type of the task.
- `function`: The work to execute asynchronously.
- `cancellationToken`: A cancellation token that can be used to cancel the work if it has not yet started. `Task.Run<T>` does not pass `cancellationToken` to `action`.

Returns: A `Task(TResult)` that represents the work queued to execute in the thread pool.

Exceptions:

- `ArgumentNullException`: The `function` parameter is `null`.
- `OperationCanceledException`: The task has been canceled. This exception is stored into the returned task.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with `cancellationToken` was disposed.
- `TaskCanceledException`: The task has been canceled.

#### Remarks
If cancellation is requested before the task begins execution, the task does not execute. Instead it is set to the `Canceled` state and throws a `TaskCanceledException` exception.

The `Task.Run` method is a simpler alternative to the `TaskFactory.StartNew` method. It creates a task with the following default values:

- Its `CreationOptions` property value is `DenyChildAttach`.

- It uses the default task scheduler.

For information on handling exceptions thrown by task operations, see Exception Handling.

#### Examples
The following example creates 20 tasks that will loop until a counter is incremented to a value of 2 million. When the first 10 tasks reach 2 million, the cancellation token is cancelled, and any tasks whose counters have not reached 2 million are cancelled. The example shows possible output.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/Run7.cs._

Instead of using the `InnerExceptions` property to   examine exceptions, the example iterates all tasks to determine which have completed successfully and which have been cancelled. For those that have completed, it displays the value returned by the task.

Because cancellation is cooperative, each task can decide how to respond to cancellation. The following example is like the first, except that, once the token is cancelled, tasks return the number of iterations they've completed rather than throw an exception.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/Run28.cs._

The example still must handle the `AggregateException` exception,   since any tasks that have not started when cancellation is requested still throw an exception.

## Task.RunSynchronously() method

```csharp
public void RunSynchronously ();
```

Runs the `Task` synchronously on the current `TaskScheduler`.

Exceptions:

- `ObjectDisposedException`: The `Task` instance has been disposed.
- `InvalidOperationException`: The `Task` is not in a valid state to be started. It may have already been started, executed, or canceled, or it may have been created in a manner that doesn't support direct scheduling.

#### Remarks
Ordinarily, tasks are executed asynchronously on a thread pool thread and do not block the calling thread. Tasks executed by calling the `RunSynchronously` method are associated with the current `TaskScheduler` and are run on the calling thread. If the target scheduler does not support running this task on the calling thread, the task will be scheduled for execution on the scheduler, and the calling thread will block until the task has completed execution. Even though the task runs synchronously, the calling thread should still call `Task.Wait` to handle any exceptions that the task might throw.  For more information on exception handling, see Exception Handling.

Tasks executed by calling the `Task.RunSynchronously` method are instantiated by calling a `Task` or `Task<T>` class constructor. The task to be run synchronously must be in the `Created` state. A task may be started and run only once. Any attempts to schedule a task a second time results in an exception.

#### Examples
The following example compares a task executed by calling the `Task.RunSynchronously` method with one executed asynchronously. In both cases, the tasks execute identical lambda expressions that display the task ID and the ID of the thread on which the task is running. The task calculates the sum of the integers between 1 and 1,000,000. As the output from the example shows, the task executed by calling the `Task.RunSynchronously` method runs on the application thread, while the asynchronous task does not.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/RunSynchronously/runsynchronously1.cs._

## Task.RunSynchronously(TaskScheduler) method

```csharp
public void RunSynchronously (System.Threading.Tasks.TaskScheduler scheduler);
```

Runs the `Task` synchronously on the `TaskScheduler` provided.

Parameters:

- `scheduler`: The scheduler on which to attempt to run this task inline.

Exceptions:

- `ObjectDisposedException`: The `Task` instance has been disposed.
- `ArgumentNullException`: The `scheduler` argument is `null`.
- `InvalidOperationException`: The `Task` is not in a valid state to be started. It may have already been started, executed, or canceled, or it may have been created in a manner that doesn't support direct scheduling.

#### Remarks
Tasks executed by calling the `Task.RunSynchronously` method are instantiated by calling a `Task` or `Task<T>` class constructor. The task to be run synchronously must be in the `Created` state. A task may be started and run only once. Any attempts to schedule a task a second time results in an exception.

If the target scheduler does not support running this task on the current thread, the task will be scheduled for execution on the scheduler, and the current thread will block until the task has completed execution. Because of this, the calling thread does not need to call a method such as `Task.Wait` to ensure that the task has completed execution. For more information on exception handling for task operations, see Exception Handling.

## Task.Start() method

```csharp
public void Start ();
```

Starts the `Task`, scheduling it for execution to the current `TaskScheduler`.

Exceptions:

- `ObjectDisposedException`: The `Task` instance has been disposed.
- `InvalidOperationException`: The `Task` is not in a valid state to be started. It may have already been started, executed, or canceled, or it may have been created in a manner that doesn't support direct scheduling.

#### Remarks
A task may be started and run only once. Any attempts to schedule a task a second time will result in an exception.

The `Task.Start` is used to execute a task that has been created by calling one of the `Task` constructors. Typically, you do this when you need to separate the task's creation from its execution, such as when you conditionally execute tasks that you've created. For the more common case in which you don't need to separate  task instantiation from execution, we recommend that you call an overload of the `Task.Run` or `TaskFactory.StartNew` method.

For information on handling exceptions thrown by task operations, see Exception Handling.

#### Examples
The following example calls the `%23ctor` constructor to instantiate a new `Task` object that displays its task ID and managed thread ID and then executes a loop. It then calls the `Task.Start` method to execute the task.  Since this is a console app, the call to the `Task.Wait` method is necessary to prevent the app from terminating before the task finishes execution.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Start/Start1.cs._

## Task.Start(TaskScheduler) method

```csharp
public void Start (System.Threading.Tasks.TaskScheduler scheduler);
```

Starts the `Task`, scheduling it for execution to the specified `TaskScheduler`.

Parameters:

- `scheduler`: The `TaskScheduler` with which to associate and execute this task.

Exceptions:

- `ArgumentNullException`: The `scheduler` argument is `null`.
- `InvalidOperationException`: The `Task` is not in a valid state to be started. It may have already been started, executed, or canceled, or it may have been created in a manner that doesn't support direct scheduling.
- `ObjectDisposedException`: The `Task` instance has been disposed.
- `TaskSchedulerException`: The scheduler was unable to queue this task.

#### Remarks
A task may only be started and run only once. Any attempts to schedule a task a second time will result in an exception.

For information on handling exceptions thrown by task operations, see Exception Handling.

## Task.Wait() method

```csharp
public void Wait ();
```

Waits for the `Task` to complete execution.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.
- `AggregateException`: The task was canceled. The `AggregateException.InnerExceptions` collection contains a `TaskCanceledException` object.

-or-

An exception was thrown during the execution of the task. The `AggregateException.InnerExceptions` collection contains information about the exception or exceptions.

#### Remarks
`Task.Wait` is a synchronization method that causes the calling thread to wait until the current task has completed. If the current task has not started execution, the Wait method attempts to remove the task from the scheduler and execute it inline on the current thread. If it is unable to do that, or if the current task has already started execution, it blocks the calling thread until the task completes. For more information, see Task.Wait and "Inlining" in the Parallel Programming with .NET blog.

#### Examples
The following example starts a task that generates one million random integers between 0 and 100 and computes their mean. The example uses the `Task.Wait` method to ensure that the task completes before the application terminates. Otherwise, because this is a console application, the example would terminate before the task can compute and display the mean.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Wait/wait1.cs._

## Task.Wait(Int32) method

```csharp
public bool Wait (int millisecondsTimeout);
```

Waits for the `Task` to complete execution within a specified number of milliseconds.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.

Returns: `true` if the `Task` completed execution within the allotted time; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `AggregateException`: The task was canceled. The `AggregateException.InnerExceptions` collection contains a `TaskCanceledException` object.

-or-

An exception was thrown during the execution of the task. The `AggregateException.InnerExceptions` collection contains information about the exception or exceptions.

#### Remarks
`Wait` is a synchronization method that causes the calling thread to wait for the current task instance to complete until one of the following occurs:

- The task completes successfully.

- The task itself is canceled or throws an exception. In this case, you handle an `AggregateException` exception. The `InnerExceptions` property contains details about the exception or exceptions.

- The interval defined by `millisecondsTimeout` elapses. In this case, the current thread resumes execution and the method returns `false`.

#### Examples
The following example starts a task that generates five million random integers between 0 and 100 and computes their mean. The example uses the `Wait` method to wait for the application to complete within 150 milliseconds. If the application completes normally, the task displays the sum and mean of the random numbers that it has generated. If the timeout interval has elapsed, the example displays a message before it terminates.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Wait/Wait5.cs._

## Task.Wait(CancellationToken) method

```csharp
public void Wait (System.Threading.CancellationToken <example-value>);
```

Waits for the `Task` to complete execution. The wait terminates if a cancellation token is canceled before the task completes.

Parameters:

- `cancellationToken`: A cancellation token to observe while waiting for the task to complete.

Exceptions:

- `OperationCanceledException`: The `cancellationToken` was canceled.
- `ObjectDisposedException`: The task has been disposed.
- `AggregateException`: The task was canceled. The `AggregateException.InnerExceptions` collection contains a `TaskCanceledException` object.

-or-

An exception was thrown during the execution of the task. The `AggregateException.InnerExceptions` collection contains information about the exception or exceptions.

#### Remarks
The `Wait` method creates a cancelable wait; that is, it causes the current thread to wait until one of the following occurs:

- The task completes.

- The cancellation token is canceled. In this case, the call to the `Wait` method throws an `OperationCanceledException`.

> **Note:**
>  Canceling the `cancellationToken` cancellation token has no effect on the running task unless it has also been passed the cancellation token and is prepared to handle cancellation. Passing the `cancellationToken` object to this method simply allows the wait to be canceled.

#### Examples
The following example illustrates the simple use of a cancellation token to cancel waiting for a task'<example-value>'s cancellation tokens, and then delays for five seconds. Note that the task itself has not been passed the cancellation token and is not cancelable. The application thread calls the task's `Task.Wait` method to wait for the task to complete, but the wait is canceled once the cancellation token is cancelled and an `OperationCanceledException` is thrown. The exception handler reports the exception and then sleeps for six seconds. As the output from the example shows, that delay allows the task to complete in the `RanToCompletion` state.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Wait/wait3.cs._
