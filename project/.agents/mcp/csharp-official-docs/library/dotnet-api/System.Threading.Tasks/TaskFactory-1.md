---
title: "TaskFactory<TResult> class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskFactory`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskFactory<TResult> class

Namespace: `System.Threading.Tasks`

```csharp
public class TaskFactory<TResult>
```

Provides support for creating and scheduling `Task<T>` objects.

Parameters:

- `TResult`: The return value of the `Task<T>` objects that the methods of this class create.

#### Remarks

.NET provides two factories for creating and scheduling tasks:

- The `TaskFactory` class, which creates `Task` and `Task<T>` objects.

- The `TaskFactory<T>` class, which creates `Task<T>` objects.

The `TaskFactory<T>` class allows you to do the following:

- Create a task and start it immediately by calling the `TaskFactory.StartNew` method. You can call the overloads of this method to create and execute a task that requires non-default arguments.

> **Warning:**
> The `Task.Run` method provides the easiest way to create a task with default configuration values and start it immediately.

- Create a task that starts when any one of the tasks in an array has completed by calling the `TaskFactory.ContinueWhenAny` or   `TaskFactory.ContinueWhenAny` method.

- Create a task that starts when all the tasks in an array have completed by calling the `TaskFactory.ContinueWhenAll` or `TaskFactory.ContinueWhenAll` method.

The static `Factory` property returns a default `TaskFactory<T>` object. You can also call one of the `TaskFactory<T>` class constructors to configure the `Task<T>` objects that  the `TaskFactory<T>` class creates. The following example configures a new `TaskFactory<T>` object to create tasks that have a specified cancellation token, task creation options, continuation options, and a customized task scheduler.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskFactory`1/Overview/factoriestresult.cs._

In most cases, you do not have to instantiate a new `TaskFactory<T>` instance. Instead, you can use the static `Factory` property, which returns a factory object that uses default values. You can then call its methods to start new tasks or define task continuations. For an illustration, see the example.

#### Examples
The following example uses the static `Factory` property to make two calls to the `TaskFactory<T>.StartNew` method. The first task returns a string array that is populated with the names of files in the user's MyDocuments directory, while the second returns a string array that is populated with the names of subdirectories of the user's MyDocuments directory. It then calls the `ContinueWhenAll` method, which displays information about the number of files and directories in the arrays returned by the two tasks after they have completed execution.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/Factory/factory2.cs._

## TaskFactory<TResult>.TaskFactory() constructor

```csharp
public TaskFactory ();
```

Initializes a `TaskFactory<T>` instance with the default configuration.

#### Remarks
This constructor creates a `TaskFactory<T>` instance with a default configuration. The `TaskCreationOptions` property is initialized to `None`, the `TaskContinuationOptions` property is initialized to `None`, and the `TaskScheduler` property is initialized to the current scheduler (see `TaskScheduler.Current`).

## TaskFactory<TResult>.TaskFactory(CancellationToken) constructor

```csharp
public TaskFactory (System.Threading.CancellationToken <example-value>);
```

Initializes a `TaskFactory<T>` instance with the default configuration.

Parameters:

- `cancellationToken`: The default cancellation token that will be assigned to tasks created by this `TaskFactory` unless another cancellation token is explicitly specified when calling the factory methods.

#### Remarks
This constructor creates a `TaskFactory<T>` instance with a default configuration. The `TaskCreationOptions` property is initialized to `None`, the `TaskContinuationOptions` property is initialized to `None`, and the `TaskScheduler` property is initialized to the current scheduler (see `TaskScheduler.Current`).

## TaskFactory<TResult>.TaskFactory(TaskScheduler) constructor

```csharp
public TaskFactory (System.Threading.Tasks.TaskScheduler? scheduler);
```

Initializes a `TaskFactory<T>` instance with the specified configuration.

Parameters:

- `scheduler`: The scheduler to use to schedule any tasks created with this `TaskFactory<T>`. A null value indicates that the current `TaskScheduler` should be used.

#### Remarks
With this constructor, the `TaskCreationOptions` property is initialized to `None`, the `TaskContinuationOptions` property is initialized to `None`, and the `TaskScheduler` property is initialized to `scheduler`, unless it's `null`, in which case the property is initialized to the current scheduler (see `TaskScheduler.Current`).

## TaskFactory<TResult>.TaskFactory(TaskCreationOptions, TaskContinuationOptions) constructor

```csharp
public TaskFactory (System.Threading.Tasks.TaskCreationOptions creationOptions, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Initializes a `TaskFactory<T>` instance with the specified configuration.

Parameters:

- `creationOptions`: The default options to use when creating tasks with this `TaskFactory<T>`.
- `continuationOptions`: The default options to use when creating continuation tasks with this `TaskFactory<T>`.

Exceptions:

- `ArgumentOutOfRangeException`: `creationOptions` or `continuationOptions` specifies an invalid value.

#### Remarks
With this constructor, the `TaskCreationOptions` property is initialized to `creationOptions`, the `TaskContinuationOptions` property is initialized to `continuationOptions`, and the `TaskScheduler` property is initialized to the current scheduler (see `TaskScheduler.Current`).

## TaskFactory<TResult>.TaskFactory(CancellationToken, TaskCreationOptions, TaskContinuationOptions, TaskScheduler) constructor

```csharp
public TaskFactory (System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskCreationOptions creationOptions, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler? scheduler);
```

Initializes a `TaskFactory<T>` instance with the specified configuration.

Parameters:

- `cancellationToken`: The default cancellation token that will be assigned to tasks created by this `TaskFactory` unless another cancellation token is explicitly specified when calling the factory methods.
- `creationOptions`: The default options to use when creating tasks with this `TaskFactory<T>`.
- `continuationOptions`: The default options to use when creating continuation tasks with this `TaskFactory<T>`.
- `scheduler`: The default scheduler to use to schedule any tasks created with this `TaskFactory<T>`. A null value indicates that `TaskScheduler.Current` should be used.

Exceptions:

- `ArgumentOutOfRangeException`: `creationOptions` or `continuationOptions` specifies an invalid value.

#### Remarks
With this constructor, the `TaskCreationOptions` property is initialized to `creationOptions`, the `TaskContinuationOptions` property is initialized to `continuationOptions`, and the `TaskScheduler` property is initialized to `scheduler`, unless it's `null`, in which case the property is initialized to the current scheduler (see `TaskScheduler.Current`).

## TaskFactory<TResult>.CancellationToken <example-value>

```csharp
public System.Threading.CancellationToken <example-value> { get; }
```

Gets the default cancellation token for this task factory.

Returns: The default cancellation token for this task factory.

#### Remarks
This property returns the default cancellation token that will be assigned to all tasks created by this factory unless another cancellation token value is explicitly specified during the call to the task factory methods.

## TaskFactory<TResult>.ContinuationOptions property

```csharp
public System.Threading.Tasks.TaskContinuationOptions ContinuationOptions { get; }
```

Gets the `TaskContinuationOptions` enumeration value for this task factory.

Returns: One of the enumeration values that specifies the default continuation options for this task factory.

#### Remarks
This property returns the default continuation options for this factory. They will be used to create all continuation tasks unless other options are explicitly specified during calls to this factory's methods.

## TaskFactory<TResult>.CreationOptions property

```csharp
public System.Threading.Tasks.TaskCreationOptions CreationOptions { get; }
```

Gets the `TaskCreationOptions` enumeration value for this task factory.

Returns: One of the enumeration values that specifies the default creation options for this task factory.

#### Remarks
This property returns the default creation options for this factory. They will be used to create all tasks unless other options are explicitly specified during calls to this factory's methods.

## TaskFactory<TResult>.Scheduler property

```csharp
public System.Threading.Tasks.TaskScheduler? Scheduler { get; }
```

Gets the task scheduler for this task factory.

Returns: The task scheduler for this task factory.

#### Remarks
This property returns the default scheduler for this factory. It will be used to schedule all tasks unless another scheduler is explicitly specified during calls to this factory's methods.

If this property returns `null`, `TaskScheduler.Current` will be used.

## TaskFactory<TResult>.ContinueWhenAll(Task[], Task[],TResult>) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAll (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task[],TResult> continuationFunction);
```

Creates a continuation task that will be started upon the completion of a set of provided tasks.

Parameters:

- `tasks`: The array of tasks from which to continue.
- `continuationFunction`: The function delegate to execute asynchronously when all tasks in the `tasks` array have completed.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.
- `ArgumentNullException`: `tasks` array is `null`.

-or-

The `continuationFunction` is `null`.
- `ArgumentException`: The `tasks` array contains a null value or is empty.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.

## TaskFactory<TResult>.ContinueWhenAll(Task[], Task[],TResult>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAll (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task[],TResult> continuationFunction, System.Threading.CancellationToken <example-value>);
```

Creates a continuation task that will be started upon the completion of a set of provided tasks.

Parameters:

- `tasks`: The array of tasks from which to continue.
- `continuationFunction`: The function delegate to execute asynchronously when all tasks in the `tasks` array have completed.
- `cancellationToken`: The cancellation token that will be assigned to the new continuation task.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

`continuationFunction` is `null`.
- `ArgumentException`: The `tasks` array contains a null value or is empty.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.

## TaskFactory<TResult>.ContinueWhenAll(Task[], Task[],TResult>, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAll (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task[],TResult> continuationFunction, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation task that will be started upon the completion of a set of provided Tasks.

Parameters:

- `tasks`: The array of tasks from which to continue.
- `continuationFunction`: The function delegate to execute asynchronously when all tasks in the `tasks` array have completed.
- `continuationOptions`: One of the enumeration values that controls the behavior of the created continuation task. The `NotOn*` and `OnlyOn*` values are not valid.

Returns: The new continuation task.

Exceptions:

- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.
- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value.
- `ArgumentException`: The `tasks` array contains a null value or is empty.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.

## TaskFactory<TResult>.ContinueWhenAll(Task[], Task[],TResult>, CancellationToken, TaskContinuationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task<TResult> ContinueWhenAll (System.Threading.Tasks.Task[] tasks, Func<System.Threading.Tasks.Task[],TResult> continuationFunction, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskContinuationOptions continuationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation task that will be started upon the completion of a set of provided Tasks.

Parameters:

- `tasks`: The array of tasks from which to continue.
- `continuationFunction`: The function delegate to execute asynchronously when all tasks in the `tasks` array have completed.
- `cancellationToken`: The cancellation token that will be assigned to the new continuation task.
- `continuationOptions`: One of the enumeration values that controls the behavior of the created continuation task. The `NotOn*` and `OnlyOn*` values are not valid.
- `scheduler`: The scheduler that is used to schedule the created continuation task.

Returns: The new continuation task.

Exceptions:

- `ArgumentNullException`: The `tasks` array is `null`.

-or-

The `continuationFunction` argument is `null`.

-or-

The `scheduler` argument is `null`.
- `ArgumentException`: The `tasks` array contains a null value or is empty.
- `ArgumentOutOfRangeException`: `continuationOptions` specifies an invalid value.
- `ObjectDisposedException`: One of the elements in the `tasks` array has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has already been disposed.

#### Remarks
After completion, a task is in one of these states: `RanToCompletion`, `Faulted`, or `Canceled` states.
