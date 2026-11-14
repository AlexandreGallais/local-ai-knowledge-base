---
title: "Task class (part 1 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task class

Namespace: `System.Threading.Tasks`

```csharp
public class Task : IAsyncResult, IDisposable
```

Represents an asynchronous operation.

The `Task` class represents a single operation that does not return a value and that usually executes asynchronously. `Task` objects are one of the central components of the task-based asynchronous pattern. Because the work performed by a `Task` object typically executes asynchronously on a thread pool thread rather than synchronously on the main application thread, you can use the `Status` property, as well as the `Task.IsCanceled`, `Task.IsCompleted`, and `IsFaulted` properties, to determine the state of a task. Most commonly, a lambda expression is used to specify the work that the task is to perform.

For operations that return values, you use the `Task<T>` class.

#### Task instantiation

The following example creates and executes four tasks. Three tasks execute an `Action<T>` delegate named `action`, which accepts an argument of type `Object`. A fourth task executes a lambda expression (an `Action` delegate) that is defined inline in the call to the task creation method. Each task is instantiated and run in a different way:

- Task `t1` is instantiated by calling a Task class constructor, but is started by calling its `Start` method only after task `t2` has started.

- Task `t2` is instantiated and started in a single method call by calling the `StartNew` method.

- Task `t3` is instantiated and started in a single method call by calling the `Run` method.

- Task `t4` is executed synchronously on the main thread by calling the `RunSynchronously` method.

Because task `t4` executes synchronously, it executes on the main application thread. The remaining tasks execute asynchronously typically on one or more thread pool threads.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Overview/startnew.cs._

#### Create and execute a task

You can create `Task` instances in a variety of ways. The most common approach is to call the static `Task.Run` method. The `Task.Run` method provides a simple way to start a task using default values and without requiring additional parameters. The following example uses the `Run` method to start a task that loops and then displays the number of loop iterations:

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Overview/run1.cs._

An alternative is the static `TaskFactory.StartNew` method. The `Factory` property returns a `TaskFactory` object. Overloads of the `TaskFactory.StartNew` method let you specify parameters to pass to the task creation options and a task scheduler. The following example uses the `TaskFactory.StartNew` method to start a task. It is functionally equivalent to the code in the previous example.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Overview/startnew1.cs._

For more complete examples, see Task-based Asynchronous Programming.

#### Separate task creation and execution

The `Task` class also provides constructors that initialize the task but that do not schedule it for execution. For performance reasons, the `Task.Run` or `TaskFactory.StartNew` method is the preferred mechanism for creating and scheduling computational tasks, but for scenarios where creation and scheduling must be separated, you can use the constructors and then call the `Task.Start` method to schedule the task for execution at a later time.

#### Wait for a task to complete

Because tasks typically run asynchronously on a thread pool thread, the thread that creates and starts the task continues execution as soon as the task has been instantiated. In some cases, when the calling thread is the main application thread, the app may terminate before the task actually begins execution. In others, your application's logic may require that the calling thread continue execution only when one or more tasks have completed execution. You can synchronize the execution of the calling thread and the asynchronous tasks it launches by calling a `Wait` method to wait for one or more tasks to complete.

To wait for a single task to complete, you can call its `Task.Wait` method. A call to the  `Task.Wait` method blocks the calling thread until the single class instance has completed execution.

The following example calls the parameterless `Wait` method to wait unconditionally until a task completes. The task simulates work by calling the `Thread.Sleep` method to sleep for two seconds.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Overview/Wait1.cs._

You can also conditionally wait for a task to complete. The `Wait` and `Wait` methods block the calling thread until the task finishes or a timeout interval elapses, whichever comes first. Since the following example launches a task that sleeps for two seconds but defines a one-second timeout value, the calling thread blocks until the timeout expires and before the task has completed execution.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Overview/Wait2.cs._

You can also supply a cancellation token by calling the `Wait` and `Wait` methods. If the token's `IsCancellationRequested` property is `true` or becomes `true` while the `Task.Wait` method is executing, the method throws an `OperationCanceledException`.

In some cases, you may want to wait for the first of a series of executing tasks to complete, but don't care which task it is. For this purpose, you can call one of the overloads of the `Task.WaitAny` method. The following example creates three tasks, each of which sleeps for an interval determined by a random number generator. The `WaitAny` method waits for the first task to complete. The example then displays information about the status of all three tasks.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Overview/WhenAny1.cs._

You can also wait for all of a series of tasks to complete by calling the `Task.WaitAll` method. The following example creates ten tasks, waits for all ten to complete, and then displays their status.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Overview/WaitAll1.cs._

Note that when you wait for one or more tasks to complete, any exceptions thrown in the running tasks are propagated on the thread that calls the `Wait` method, as the following example shows. It launches 12 tasks, three of which complete normally and three of which throw an exception. Of the remaining six tasks, three are cancelled before they start, and three are cancelled while they are executing. Exceptions are thrown in the `Task.WaitAll` method call and are handled by a `try`/`catch` block.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Overview/WaitAll2.cs._

For more information on exception handling in task-based asynchronous operations, see Exception Handling.

#### Tasks and culture

Starting with desktop apps that target .NET Framework 4.6, the culture of the thread that creates and invokes a task becomes part of the thread's context. That is, regardless of the current culture of the thread on which the task executes, the current culture of the task is the culture of the calling thread. For apps that target versions of .NET Framework prior to .NET Framework 4.6, the culture of the task is the culture of the thread on which the task executes. For more information, see the "Culture and task-based asynchronous operations" section in the `CultureInfo` topic.

> **Note:**
> Store apps follow the Windows Runtime in setting and getting the default culture.

#### For debugger developers

For developers implementing custom debuggers, several internal and private members of task may be useful (these may change from release to release). The `m_taskId` field serves as the backing store for the `Id` property, however accessing this field directly from a debugger may be more efficient than accessing the same value through the property's getter method (the `s_taskIdCounter` counter is used to retrieve the next available ID for a task). Similarly, the `m_stateFlags` field stores information about the current lifecycle stage of the task, information also accessible through the `Status` property. The `m_action` field stores a reference to the task's delegate, and the `m_stateObject` field stores the async state passed to the task by the developer. Finally, for debuggers that parse stack frames, the `InternalWait` method serves a potential marker for when a task is entering a wait operation.

## Task.Task(Action) constructor

```csharp
public Task (Action action);
```

Initializes a new `Task` with the specified action.

Parameters:

- `action`: The delegate that represents the code to execute in the task.

Exceptions:

- `ArgumentNullException`: The `action` argument is `null`.

#### Remarks
This constructor should only be used in advanced scenarios where it is required that the creation and starting of the task is separated.

Rather than calling this constructor, the most common way to instantiate a `Task` object and launch a task is by calling the static `Run` or `StartNew` method.

If a task with no action is needed just for the consumer of an API to have something to await, a `TaskCompletionSource<T>` should be used.

#### Examples
The following example uses the `%23ctor` constructor to create tasks that retrieve the filenames in specified directories. All tasks write the file names to a single `ConcurrentBag<T>` object. The example then calls the `WaitAll` method to ensure that all tasks have completed, and then displays a count of the total number of file names written to the `ConcurrentBag<T>` object.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/ctor1.cs._

The following example is identical, except that it used the `Run` method to instantiate and run the task in a single operation. The method returns the `Task` object that represents the task.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/run2.cs._

## Task.Task(Action, CancellationToken) constructor

```csharp
public Task (Action action, System.Threading.CancellationToken <example-value>);
```

Initializes a new `Task` with the specified action and `CancellationToken`.

Parameters:

- `action`: The delegate that represents the code to execute in the task.
- `cancellationToken`: The `CancellationToken` that the new  task will observe.

Exceptions:

- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.
- `ArgumentNullException`: The `action` argument is null.

#### Remarks
Rather than calling this constructor, the most common way to instantiate a `Task` object and launch a task is by calling the static `Run` and `StartNew` methods. The only advantage offered by this constructor is that it allows object instantiation to be separated from task invocation.

For more information, see Task Parallelism (Task Parallel Library) and Cancellation in Managed Threads.

#### Examples
The following example calls the `%23ctor` constructor to create a task that iterates the files in the C:\Windows\System32 directory. The lambda expression calls the `Parallel.ForEach` method to add information about each  file to a `List<T>` object. Each detached nested task invoked by the `Parallel.ForEach` loop checks the state of the cancellation token and, if cancellation is requested, calls the `CancellationToken.ThrowIfCancellationRequested` method. The `CancellationToken.ThrowIfCancellationRequested` method throws an `OperationCanceledException` exception that is handled in a `catch` block when the calling thread calls the `Task.Wait` method.  The `Task.Start` method is then called to start the task.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/run4.cs._

## Task.Task(Action, TaskCreationOptions) constructor

```csharp
public Task (Action action, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Initializes a new `Task` with the specified action and creation options.

Parameters:

- `action`: The delegate that represents the code to execute in the task.
- `creationOptions`: The `TaskCreationOptions` used to customize the task's behavior.

Exceptions:

- `ArgumentNullException`: The `action` argument is null.
- `ArgumentOutOfRangeException`: The `creationOptions` argument specifies an invalid value for `TaskCreationOptions`.

#### Remarks
Rather than calling this constructor, the most common way to instantiate a `Task` object and launch a task is by calling the static `StartNew` method. The only advantage offered by this constructor is that it allows object instantiation to be separated from task invocation.

## Task.Task(Object>, Object) constructor

```csharp
public Task (Action<object?> action, object? state);
```

Initializes a new `Task` with the specified action and state.

Parameters:

- `action`: The delegate that represents the code to execute in the task.
- `state`: An object representing data to be used by the action.

Exceptions:

- `ArgumentNullException`: The `action` argument is null.

#### Remarks
Rather than calling this constructor, the most common way to instantiate a `Task` object and launch a task is by calling the static `StartNew` method. The only advantage offered by this constructor is that it allows object instantiation to be separated from task invocation.

#### Examples
The following example defines an array of 6-letter words. Each word is then passed as an argument to the `%23ctor` constructor, whose `Action<T>` delegate scrambles the characters in the word, then displays the original word and its scrambled version.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/startnew3.cs._
