---
title: "TaskFactory class (part 1 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskFactory class

Namespace: `System.Threading.Tasks`

```csharp
public class TaskFactory
```

Provides support for creating and scheduling `Task` objects.

#### Remarks

.NET provides two factories for creating and scheduling tasks:

- The `TaskFactory` class, which creates `Task` and `Task<T>` objects. You can call the overloads of this method to create and execute a task that requires non-default arguments.

> **Warning:**
> The `Task.Run` method provides the easiest way to create a task with default configuration values and start it immediately.

- The `TaskFactory<T>` class, which creates `Task<T>` objects.

The `TaskFactory` class allows you to do the following:

- Create a task and start it immediately by calling the `TaskFactory.StartNew` method.

> **Warning:**
> The `Task.Run` method provides the easiest way to create a task with default configuration values and start it immediately.

- Create a task that starts when any one of the tasks in an array has completed by calling the `TaskFactory.ContinueWhenAny` method.

- Create a task that starts when all the tasks in an array have completed by calling the `TaskFactory.ContinueWhenAll` method.

The static `Factory` property returns a default `TaskFactory<T>` object. You can also call one of the `TaskFactory` class constructors to configure the `Task` objects that  the `TaskFactory` class creates. The following example configures a new `TaskFactory` object to create tasks that have a specified cancellation token, task creation options, continuation options, and a customized task scheduler.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskFactory/Overview/program.cs._

In most cases, you do not have to instantiate a new `TaskFactory` instance. Instead, you can use the `Factory` property, which returns a factory object that uses default values. You can then call its methods to start new tasks or define task continuations. For an illustration, see the example.

#### Examples
The following example uses the static `Factory` property to make two calls to the `TaskFactory.StartNew` method. The first populates an array with the names of files in the user's MyDocuments directory, while the second populates an array with the names of subdirectories of the user's MyDocuments directory. It then calls the `ContinueWhenAll` method, which displays information about the number of files and directories in the two arrays after the first two tasks have completed execution.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Factory/factory1.cs._

## TaskFactory.TaskFactory() constructor

```csharp
public TaskFactory ();
```

Initializes a `TaskFactory` instance with the default configuration.

#### Remarks
This constructor creates a `TaskFactory` instance with a default configuration. The `TaskCreationOptions` property is initialized to `None`, the `TaskContinuationOptions` property is initialized to `None`, and the `TaskScheduler` property is initialized to the current scheduler (see `TaskScheduler.Current`).

## TaskFactory.TaskFactory(CancellationToken) constructor

```csharp
public TaskFactory (System.Threading.CancellationToken <example-value>);
```

Initializes a `TaskFactory` instance with the specified configuration.

Parameters:

- `cancellationToken`: The `TaskFactory.CancellationToken` that will be assigned to tasks created by this `TaskFactory` unless another CancellationToken is explicitly specified while calling the factory methods.

#### Remarks
This constructor creates a `TaskFactory` instance with a default configuration. The `TaskCreationOptions` property is initialized to `None`, the `TaskContinuationOptions` property is initialized to `None`, and the `TaskScheduler` property is initialized to the current scheduler (see `TaskScheduler.Current`).

## TaskFactory.TaskFactory(TaskScheduler) constructor

```csharp
public TaskFactory (System.Threading.Tasks.TaskScheduler? scheduler);
```

Initializes a `TaskFactory` instance with the specified configuration.

Parameters:

- `scheduler`: The `TaskScheduler` to use to schedule any tasks created with this TaskFactory. A null value indicates that the current TaskScheduler should be used.

#### Remarks
With this constructor, the `TaskCreationOptions` property is initialized to `None`, the `TaskContinuationOptions` property is initialized to `None`, and the `TaskScheduler` property is initialized to `scheduler`, unless it's null, in which case the property is initialized to the current scheduler (see `TaskScheduler.Current`).

## TaskFactory.TaskFactory(TaskCreationOptions, TaskContinuationOptions) constructor

```csharp
public TaskFactory (System.Threading.Tasks.TaskCreationOptions creationOptions, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Initializes a `TaskFactory` instance with the specified configuration.

Parameters:

- `creationOptions`: The default `TaskCreationOptions` to use when creating tasks with this TaskFactory.
- `continuationOptions`: The default `TaskContinuationOptions` to use when creating continuation tasks with this TaskFactory.

Exceptions:

- `ArgumentOutOfRangeException`: The `creationOptions` argument specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`.

-or-

The `continuationOptions` argument specifies an invalid value.

#### Remarks
With this constructor, the `TaskCreationOptions` property is initialized to `creationOptions`, the `TaskContinuationOptions` property is initialized to `continuationOptions`, and the `TaskScheduler` property is initialized to the current scheduler (see `TaskScheduler.Current`).

## TaskFactory.TaskFactory(CancellationToken, TaskCreationOptions, TaskContinuationOptions, TaskScheduler) constructor

```csharp
public TaskFactory (System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskCreationOptions creationOptions, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler? scheduler);
```

Initializes a `TaskFactory` instance with the specified configuration.

Parameters:

- `cancellationToken`: The default `TaskFactory.CancellationToken` that will be assigned to tasks created by this `TaskFactory` unless another CancellationToken is explicitly specified while calling the factory methods.
- `creationOptions`: The default `TaskCreationOptions` to use when creating tasks with this TaskFactory.
- `continuationOptions`: The default `TaskContinuationOptions` to use when creating continuation tasks with this TaskFactory.
- `scheduler`: The default `TaskScheduler` to use to schedule any Tasks created with this TaskFactory. A null value indicates that TaskScheduler.Current should be used.

Exceptions:

- `ArgumentOutOfRangeException`: The `creationOptions` argument specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`.

-or-

The `continuationOptions` argument specifies an invalid value.

#### Remarks
With this constructor, the `TaskCreationOptions` property is initialized to `creationOptions`, the `TaskContinuationOptions` property is initialized to `continuationOptions`, and the `TaskScheduler` property is initialized to `scheduler`, unless it's null, in which case the property is initialized to the current scheduler (see `TaskScheduler.Current`).

## TaskFactory.CancellationToken <example-value>

```csharp
public System.Threading.CancellationToken <example-value> { get; }
```

Gets the default cancellation token for this task factory.

Returns: The default task cancellation token for this task factory.

#### Remarks
This property returns the default `CancellationToken` that will be assigned to all tasks created by this factory, unless another `CancellationToken` value is explicitly specified during the call to the factory methods.

## TaskFactory.ContinuationOptions property

```csharp
public System.Threading.Tasks.TaskContinuationOptions ContinuationOptions { get; }
```

Gets the default task continuation options for this task factory.

Returns: The default task continuation options for this task factory.

#### Remarks
The property value is used to create all continuation tasks, unless other options are explicitly specified during calls to this factory's methods.

## TaskFactory.CreationOptions property

```csharp
public System.Threading.Tasks.TaskCreationOptions CreationOptions { get; }
```

Gets the default task creation options for this task factory.

Returns: The default task creation options for this task factory.

#### Remarks
The property value is used to create all tasks, unless other options are explicitly specified during calls to this factory's methods.

## TaskFactory.Scheduler property

```csharp
public System.Threading.Tasks.TaskScheduler? Scheduler { get; }
```

Gets the default task scheduler for this task factory.

Returns: The default task scheduler for this task factory.

#### Remarks
The property value is used to schedule all tasks, unless another scheduler is explicitly specified during calls to this factory's methods.

If this property value is `null`, the value of the `Current` property is used.

## TaskFactory.ContinueWhenAll(Task[], Task[]>) method

```csharp
public System.Threading.Tasks.Task ContinueWhenAll (System.Threading.Tasks.Task[] tasks, Action<System.Threading.Tasks.Task[]> continuationAction);
```

Creates a continuation task that starts when a set of specified tasks has completed.

Parameters:

- `tasks`: The array of tasks from which to continue.
- `continuationAction`: The action delegate to execute when all tasks in the `tasks` array have completed.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: An element in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationAction` argument is `null`.
- `ArgumentException`: The `tasks` array is empty or contains a null value.

#### Remarks
The `TaskFactory.ContinueWhenAll` method executes the `continuationAction` delegate when all tasks in the `tasks` array have completed, regardless of their completion status.

Exceptions thrown by tasks in the `tasks` array are not available to the continuation task through structured exception handling. You can determine which exceptions were thrown by examining the `Exception` property of each task in the `tasks` array. To use structured exception handling to handle exceptions thrown by tasks in the `tasks` array, call the `WaitAll` method.

#### Examples
The following example launches separate tasks that use a regular expression to count the number of words in a set of text files. The `TaskFactory.ContinueWhenAll` method is used to launch a task that displays the total word count when all the antecedent tasks have completed.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskFactory/ContinueWhenAll/continuewhenall1.cs._

The call to the continuation task's `Task.Wait` method does not allow it to handle exceptions thrown by the antecedent tasks, so the example examines the `Status` property of each antecedent task to determine whether the task succeeded.

## TaskFactory.ContinueWhenAll(Task[], Task[]>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task ContinueWhenAll (System.Threading.Tasks.Task[] tasks, Action<System.Threading.Tasks.Task[]> continuationAction, System.Threading.CancellationToken <example-value>);
```

Creates a continuation task that starts when a set of specified tasks has completed.

Parameters:

- `tasks`: The array of tasks from which to continue.
- `continuationAction`: The action delegate to execute when all tasks in the `tasks` array have completed.
- `cancellationToken`: The cancellation token to assign to the new continuation task.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: An element in the `tasks` array has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationAction` argument is `null`.
- `ArgumentException`: The `tasks` array is empty or contains a null value.

#### Remarks

This method executes the `continuationAction` delegate when all tasks in the `tasks` array have completed, regardless of their completion status.

#### Examples

The following example creates a cancellation token, which it passes to separate tasks that use a regular expression to count the number of words in a set of text files. The cancellation token is set if a file cannot be found. The `ContinueWhenAll(Task[], Action{Task[]}, CancellationToken)` method is used to launch a task that displays the total word count when all the antecedent tasks have completed. If the cancellation token is set, which indicates that one or more tasks have been cancelled, it handles the `AggregateException` exception and displays an error message.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskFactory/ContinueWhenAll/continuewhenall2.cs._

## TaskFactory.ContinueWhenAll(Task[], Task[]>, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task ContinueWhenAll (System.Threading.Tasks.Task[] tasks, Action<System.Threading.Tasks.Task[]> continuationAction, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation task that starts when a set of specified tasks has completed.

Parameters:

- `tasks`: The array of tasks from which to continue.
- `continuationAction`: The action delegate to execute when all tasks in the `tasks` array have completed.
- `continuationOptions`: A bitwise combination of the enumeration values that control the behavior of the new continuation task. The NotOn* and OnlyOn* members are not supported.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: An element in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationAction` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value.
- `ArgumentException`: The `tasks` array is empty or contains a null value.

#### Remarks

The NotOn\* and OnlyOn\* `TaskContinuationOptions`, which constrain for which `TaskStatus` states a continuation will be executed, are illegal with `ContinueWhenAll`.
