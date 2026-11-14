---
title: "Task class (part 2 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task class (part 2 of 11)

## Task.Task(Action, CancellationToken, TaskCreationOptions) constructor

```csharp
public Task (Action action, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Initializes a new `Task` with the specified action and creation options.

Parameters:

- `action`: The delegate that represents the code to execute in the task.
- `cancellationToken`: The `TaskFactory.CancellationToken` that the new task will observe.
- `creationOptions`: The `TaskCreationOptions` used to customize the task's behavior.

Exceptions:

- `ObjectDisposedException`: The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `action` argument is null.
- `ArgumentOutOfRangeException`: The `creationOptions` argument specifies an invalid value for `TaskCreationOptions`.

#### Remarks
Rather than calling this constructor, the most common way to instantiate a `Task` object and launch a task is by calling the static `StartNew` method. The only advantage offered by this constructor is that it allows object instantiation to be separated from task invocation.

For more information, see Task Parallelism (Task Parallel Library) and Task Cancellation.

## Task.Task(Object>, Object, CancellationToken) constructor

```csharp
public Task (Action<object?> action, object? state, System.Threading.CancellationToken <example-value>);
```

Initializes a new `Task` with the specified action, state, and `CancellationToken`.

Parameters:

- `action`: The delegate that represents the code to execute in the task.
- `state`: An object representing data to be used by the action.
- `cancellationToken`: The `TaskFactory.CancellationToken` that the new task will observe.

Exceptions:

- `ObjectDisposedException`: The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `action` argument is null.

#### Remarks
Rather than calling this constructor, the most common way to instantiate a `Task` object and launch a task is by calling the static `StartNew` method. The only advantage offered by this constructor is that it allows object instantiation to be separated from task invocation.

## Task.Task(Object>, Object, TaskCreationOptions) constructor

```csharp
public Task (Action<object?> action, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Initializes a new `Task` with the specified action, state, and options.

Parameters:

- `action`: The delegate that represents the code to execute in the task.
- `state`: An object representing data to be used by the action.
- `creationOptions`: The `TaskCreationOptions` used to customize the task's behavior.

Exceptions:

- `ArgumentNullException`: The `action` argument is null.
- `ArgumentOutOfRangeException`: The `creationOptions` argument specifies an invalid value for `TaskCreationOptions`.

#### Remarks
Rather than calling this constructor, the most common way to instantiate a `Task` object and launch a task is by calling the static `StartNew` method. The only advantage offered by this constructor is that it allows object instantiation to be separated from task invocation.

## Task.Task(Object>, Object, CancellationToken, TaskCreationOptions) constructor

```csharp
public Task (Action<object?> action, object? state, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Initializes a new `Task` with the specified action, state, and options.

Parameters:

- `action`: The delegate that represents the code to execute in the task.
- `state`: An object representing data to be used by the action.
- `cancellationToken`: The `TaskFactory.CancellationToken` that the new task will observe.
- `creationOptions`: The `TaskCreationOptions` used to customize the task's behavior.

Exceptions:

- `ObjectDisposedException`: The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `action` argument is null.
- `ArgumentOutOfRangeException`: The `creationOptions` argument specifies an invalid value for `TaskCreationOptions`.

#### Remarks
Rather than calling this constructor, the most common way to instantiate a `Task` object and launch a task is by calling the static `StartNew` method. The only advantage offered by this constructor is that it allows object instantiation to be separated from task invocation.

## Task.AsyncState property

```csharp
public object? AsyncState { get; }
```

Gets the state object supplied when the `Task` was created, or null if none was supplied.

Returns: An `Object` that represents the state data that was passed in to the task when it was created.

#### Remarks

To retrieve the object's data, cast it back to the original type.

## Task.CompletedTask property

```csharp
public static System.Threading.Tasks.Task CompletedTask { get; }
```

Gets a task that has already completed successfully.

Returns: The successfully completed task.

#### Remarks
This property returns a task whose `Status` property is set to `RanToCompletion`. To create a task that returns a value and runs to completion, call the `Task.FromResult` method.

Repeated attempts to retrieve this property value may not always return the same instance.

## Task.CreationOptions property

```csharp
public System.Threading.Tasks.TaskCreationOptions CreationOptions { get; }
```

Gets the `TaskCreationOptions` used to create this task.

Returns: The `TaskCreationOptions` used to create this task.

To be added.

## Task.CurrentId property

```csharp
public static int? CurrentId { get; }
```

Returns the ID of the currently executing `Task`.

Returns: An integer that was assigned by the system to the currently-executing task.

#### Remarks
`Task.CurrentId` is a `static` (`Shared` in Visual Basic) property that is used to get the identifier of the currently executing task from the code that the task is executing. It differs from the `Id` property, which returns the identifier of a particular `Task` instance. If you attempt to retrieve the `Task.CurrentId` value from outside the code that a task is executing, the property returns `null`.

Note that although collisions are very rare, task identifiers are not guaranteed to be unique.

## Task.Exception property

```csharp
public AggregateException? Exception { get; }
```

Gets the `AggregateException` that caused the `Task` to end prematurely. If the `Task` completed successfully or has not yet thrown any exceptions, this will return `null`.

Returns: The `AggregateException` that caused the `Task` to end prematurely.

#### Remarks
Tasks that throw unhandled exceptions store the resulting exception and propagate it wrapped in a `AggregateException` in calls to `Task.Wait` or in accesses to the `Exception` property. Unobserved exceptions are not rethrown from the Finalizer. For more information and an example, see Exception Handling (Task Parallel Library).

## Task.Factory property

```csharp
public static System.Threading.Tasks.TaskFactory Factory { get; }
```

Provides access to factory methods for creating and configuring `Task` and `Task<T>` instances.

Returns: A factory object that can create a variety of `Task` and `Task<T>` objects.

#### Remarks
This property returns a default instance of the `TaskFactory` class that is identical to the one created by calling the parameterless `%23ctor` constructor. It has the following property values:

|Property|Value|
|--------------|-----------|
|`TaskFactory.CancellationToken`|`CancellationToken.None`|
|`TaskFactory.ContinuationOptions`|`None`|
|`TaskFactory.CreationOptions`|`None`|
|`TaskFactory.Scheduler`|`null`, or `TaskScheduler.Current`|

The most common use of this property is to create and start a new task in a single call to the `TaskFactory.StartNew` method.

> **Note:**
> The `Task.Run` method provides the easiest way to create a `Task` object with default configuration values.

The following example uses the static `Factory` property to make two calls to the `TaskFactory.StartNew` method. The first populates an array with the names of files in the user's MyDocuments directory, while the second populates an array with the names of subdirectories of the user's MyDocuments directory. It then calls the `ContinueWhenAll` method, which displays information about the number of files and directories in the two arrays after the first two tasks have completed execution.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Factory/factory1.cs._

## Task.Id property

```csharp
public int Id { get; }
```

Gets an ID for this `Task` instance.

Returns: The identifier that is assigned by the system to this `Task` instance.

#### Remarks
Task IDs are assigned on-demand and do not necessarily represent the order in which task instances are created. Note that although collisions are very rare, task identifiers are not guaranteed to be unique.

To get the task ID of the currently executing task from within code that task is executing, use the `CurrentId` property.

## Task.IsCanceled property

```csharp
public bool IsCanceled { get; }
```

Gets whether this `Task` instance has completed execution due to being canceled.

Returns: `true` if the task has completed due to being canceled; otherwise `false`.

#### Remarks
A `Task` will complete in the `Canceled` state under any of the following conditions:

- Its `TaskFactory.CancellationToken` was marked for cancellation before the task started executing,

- The task acknowledged the cancellation request on its already signaled `TaskFactory.CancellationToken` by throwing an `OperationCanceledException` that bears the same `CancellationToken`.

- The task acknowledged the cancellation request on its already signaled `TaskFactory.CancellationToken` by calling the `CancellationToken.ThrowIfCancellationRequested` method on the `CancellationToken`.

> **Important:**
>  Retrieving the value of the `IsCanceled` property does not block the calling thread until the task has completed.

## Task.IsCompleted property

```csharp
public bool IsCompleted { get; }
```

Gets a value that indicates whether the task has completed.

Returns: `true` if the task has completed (that is, the task is in one of the three final states: `TaskStatus.RanToCompletion`, `TaskStatus.Faulted`, or `TaskStatus.Canceled`); otherwise, `false`.

#### Remarks

> **Important:**
> Retrieving the value of the `IsCompleted` property does not block the calling thread until the task has completed.

## Task.IsCompletedSuccessfully property

```csharp
public bool IsCompletedSuccessfully { get; }
```

Gets whether the task ran to completion.

Returns: `true` if the task ran to completion; otherwise `false`.

To be added.

## Task.IsFaulted property

```csharp
public bool IsFaulted { get; }
```

Gets whether the `Task` completed due to an unhandled exception.

Returns: `true` if the task has thrown an unhandled exception; otherwise `false`.

#### Remarks
If `Task.IsFaulted` is `true`, the task's `Task.Status` is equal to `Faulted`, and its `Exception` property will be non-null.

> **Important:**
> Retrieving the value of the `IsFaulted` property does not block the calling thread until the task has completed.

## Task.Status property

```csharp
public System.Threading.Tasks.TaskStatus Status { get; }
```

Gets the `TaskStatus` of this task.

Returns: The current `TaskStatus` of this task instance.

#### Remarks
Retrieving the value of the `Status` property does not block the calling thread until the task has completed.

For more information and an example, see Chaining Tasks by Using Continuation Tasks and How to: Cancel a Task and Its Children.

#### Examples
The following example creates 20 tasks that will loop until a counter is incremented to a value of 2 million. When the first 10 tasks reach 2 million, the cancellation token is cancelled, and any tasks whose counters have not reached 2 million are cancelled. The example then examines the `Status` property of each task to indicate whether it completed successfully or was cancelled. For those that completed, it displays the value returned by the task.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/Run7.cs._

## Task.System.IAsyncResult.AsyncWaitHandle property

```csharp
System.Threading.WaitHandle System.IAsyncResult.AsyncWaitHandle { get; }
```

Gets a `WaitHandle` that can be used to wait for the task to complete.

Returns: A `WaitHandle` that can be used to wait for the task to complete.

Exceptions:

- `ObjectDisposedException`: The `Task` has been disposed.

#### Remarks
Using the wait functionality provided by `Task.Wait` is preferable to using `IAsyncResult.AsyncWaitHandle` for similar functionality. For more information, see the "Waiting on Tasks" section in Task-based Asynchronous Programming and Using TPL with Other Asynchronous Patterns.

## Task.System.IAsyncResult.CompletedSynchronously property

```csharp
bool System.IAsyncResult.CompletedSynchronously { get; }
```

Gets an indication of whether the operation completed synchronously.

Returns: `true` if the operation completed synchronously; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `Task` instance is cast to an `IAsyncResult` interface.

## Task.ConfigureAwait(Boolean) method

```csharp
public System.Runtime.CompilerServices.ConfiguredTaskAwaitable ConfigureAwait (bool continueOnCapturedContext);
```

Configures an awaiter used to await this `Task`.

Parameters:

- `continueOnCapturedContext`: `true` to attempt to marshal the continuation back to the original context captured; otherwise, `false`.

Returns: An object used to await this task.

#### Remarks

When an asynchronous method awaits a `Task` directly, continuation usually occurs in the same thread that created the task, depending on the async context. This behavior can be costly in terms of performance and can result in a deadlock on the UI thread. To avoid these problems, call `Task.ConfigureAwait(false)`. For more information, see ConfigureAwait FAQ.

## Task.ConfigureAwait(ConfigureAwaitOptions) method

```csharp
public System.Runtime.CompilerServices.ConfiguredTaskAwaitable ConfigureAwait (System.Threading.Tasks.ConfigureAwaitOptions options);
```

Configures an awaiter used to await this `Task`.

Parameters:

- `options`: Options used to configure how awaits on this task are performed.

Returns: An object used to await this task.

Exceptions:

- `ArgumentOutOfRangeException`: The `options` argument specifies an invalid value.

To be added.
