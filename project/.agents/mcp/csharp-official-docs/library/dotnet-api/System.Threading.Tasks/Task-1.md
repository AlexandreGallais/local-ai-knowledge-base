---
title: "Task<TResult> class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task<TResult> class

Namespace: `System.Threading.Tasks`

```csharp
public class Task<TResult> : System.Threading.Tasks.Task
```

Represents an asynchronous operation that can return a value.

Parameters:

- `TResult`: The type of the result produced by this `Task<T>`.

#### Remarks
The `Task<T>` class represents a single operation that returns a value and that usually executes asynchronously. `Task<T>` objects are one of the central components of the task-based asynchronous pattern. Because the work performed by a `Task<T>` object typically executes asynchronously on a thread pool thread rather than synchronously on the main application thread, you can use the `Status` property, as well as the `Task.IsCanceled`, `Task.IsCompleted`, and `Task.IsFaulted` properties, to determine the   state of a task. Most commonly, a lambda expression is used to specify the work that the task is to perform.

`Task<T>` instances can be created in a variety of ways. The most common approach is to call the static `Run<T>` or `Run<T>` method. These methods provide a simple way to start a task by using default values and without acquiring additional parameters. The following example uses the `Run<T>` method to start a task that loops and then displays the number of loop iterations:

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskTResult/Overview/run1.cs._

An alternative approach is to call the static `TaskFactory.StartNew` or `TaskFactory<T>.StartNew` method. The `Factory` property returns a `TaskFactory` object, and the `Factory` property returns a `TaskFactory<T>` object. Overloads of their `StartNew` method let you pass <example-value>, define task creation options, and specify a task scheduler. The following example uses the `StartNew` method to start a task. It is functionally equivalent to the code in the previous example.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskTResult/Overview/startnew1.cs._

For more complete examples, see Task-based Asynchronous Programming.

The `Task<T>` class also provides constructors that initialize the task but that do not schedule it for execution. For performance reasons, the `Task.Run` and `Task.Factory.StartNew` methods are the preferred mechanisms for creating and scheduling computational tasks, but for scenarios where task creation and scheduling must be separated, the constructors may be used, and the task's `Task.Start` method may then be used to schedule the task for execution at a later time.

The culture of the thread that creates and invokes a task becomes part of the thread's context. That is, regardless of the current culture of the thread on which the task executes, the current culture of the task is the culture of the calling thread.

For operations that do not return a value, you use the `Task` class. For a more lightweight task that's a value type rather than a reference type, use the `ValueTask<T>` structure.

## Task<TResult>.Task(Func<TResult>) constructor

```csharp
public Task (Func<TResult> function);
```

Initializes a new `Task<T>` with the specified function.

Parameters:

- `function`: The delegate that represents the code to execute in the task. When the function has completed, the task's `Task<T>.Result` property will be set to return the result value of the function.

Exceptions:

- `ArgumentNullException`: The `function` argument is `null`.
- `ArgumentException`: The `function` argument is `null`.

#### Remarks
This constructor should only be used in advanced scenarios where it is required that the creation and starting of the task is separated.

Rather than calling this constructor, the most common way to instantiate a `Task<T>` object and launch a task is by calling the static `Run<T>` and `StartNew` methods.

If a task with no action is needed just for the consumer of an API to have something to await, a `TaskCompletionSource<T>` should be used.

#### Examples
The following example counts the approximate number of words in text files that represent published books. Each task is responsible for opening a file, reading its entire contents asynchronously, and calculating the word count by using a regular expression. The `WaitAll` method is called to ensure that all tasks have completed before displaying the word count of each book to the console.

Object instantiation is separated from object execution in this example so that the example can ensure that each file exists. If they do not,  it displays the name of the missing file. Otherwise, it calls the `Task.Start` method to launch each task.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/run3.cs._

The regular expression pattern `\p{P}*\s+` matches zero, one, or more punctuation characters followed by one or more white-space characters. It assumes that the total number of matches equals the approximate word count.

## Task<TResult>.Task(Object,TResult>, Object) constructor

```csharp
public Task (Func<object?,TResult> function, object? state);
```

Initializes a new `Task<T>` with the specified function and state.

Parameters:

- `function`: The delegate that represents the code to execute in the task. When the function has completed, the task's `Task<T>.Result` property will be set to return the result value of the function.
- `state`: An object representing data to be used by the action.

Exceptions:

- `ArgumentNullException`: The `function` argument is `null`.
- `ArgumentException`: The `function` argument is `null`.

#### Remarks
Rather than calling this constructor, the most common way to instantiate a `Task<T>` object and launch a task is by calling the static `StartNew` method. The only advantage offered by this constructor is that it allows object instantiation to be separated from task invocation.

## Task<TResult>.Task(Func<TResult>, CancellationToken) constructor

```csharp
public Task (Func<TResult> function, System.Threading.CancellationToken <example-value>);
```

Initializes a new `Task<T>` with the specified function.

Parameters:

- `function`: The delegate that represents the code to execute in the task. When the function has completed, the task's `Task<T>.Result` property will be set to return the result value of the function.
- `cancellationToken`: The `CancellationToken` to be assigned to this task.

Exceptions:

- `ObjectDisposedException`: The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `function` argument is `null`.
- `ArgumentException`: The `function` argument is `null`.

#### Remarks
Rather than calling this constructor, the most common way to instantiate a `Task<T>` object and launch a task is by calling the static `Run<T>` and `StartNew` methods. The only advantage offered by this constructor is that it allows object instantiation to be separated from task invocation.

## Task<TResult>.Task(Func<TResult>, TaskCreationOptions) constructor

```csharp
public Task (Func<TResult> function, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Initializes a new `Task<T>` with the specified function and creation options.

Parameters:

- `function`: The delegate that represents the code to execute in the task. When the function has completed, the task's `Task<T>.Result` property will be set to return the result value of the function.
- `creationOptions`: The `TaskCreationOptions` used to customize the task's behavior.

Exceptions:

- `ArgumentOutOfRangeException`: The `creationOptions` argument specifies an invalid value for `TaskCreationOptions`.
- `ArgumentNullException`: The `function` argument is `null`.
- `ArgumentException`: The `function` argument is `null`.

#### Remarks
Rather than calling this constructor, the most common way to instantiate a `Task<T>` object and launch a task is by calling the static `StartNew` method. The only advantage offered by this constructor is that it allows object instantiation to be separated from task invocation.

## Task<TResult>.Task(Object,TResult>, Object, CancellationToken) constructor

```csharp
public Task (Func<object?,TResult> function, object? state, System.Threading.CancellationToken <example-value>);
```

Initializes a new `Task<T>` with the specified action, state, and options.

Parameters:

- `function`: The delegate that represents the code to execute in the task. When the function has completed, the task's `Task<T>.Result` property will be set to return the result value of the function.
- `state`: An object representing data to be used by the function.
- `cancellationToken`: The `CancellationToken` to be assigned to the new task.

Exceptions:

- `ObjectDisposedException`: The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentNullException`: The `function` argument is `null`.
- `ArgumentException`: The `function` argument is `null`.

#### Remarks
Rather than calling this constructor, the most common way to instantiate a `Task<T>` object and launch a task is by calling the static `StartNew` method. The only advantage offered by this constructor is that it allows object instantiation to be separated from task invocation.

## Task<TResult>.Task(Object,TResult>, Object, TaskCreationOptions) constructor

```csharp
public Task (Func<object?,TResult> function, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Initializes a new `Task<T>` with the specified action, state, and options.

Parameters:

- `function`: The delegate that represents the code to execute in the task. When the function has completed, the task's `Task<T>.Result` property will be set to return the result value of the function.
- `state`: An object representing data to be used by the function.
- `creationOptions`: The `TaskCreationOptions` used to customize the task's behavior.

Exceptions:

- `ArgumentOutOfRangeException`: The `creationOptions` argument specifies an invalid value for `TaskCreationOptions`.
- `ArgumentNullException`: The `function` argument is `null`.
- `ArgumentException`: The `function` argument is `null`.

#### Remarks
Rather than calling this constructor, the most common way to instantiate a `Task<T>` object and launch a task is by calling the static `StartNew` method. The only advantage offered by this constructor is that it allows object instantiation to be separated from task invocation.

## Task<TResult>.Task(Func<TResult>, CancellationToken, TaskCreationOptions) constructor

```csharp
public Task (Func<TResult> function, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Initializes a new `Task<T>` with the specified function and creation options.

Parameters:

- `function`: The delegate that represents the code to execute in the task. When the function has completed, the task's `Task<T>.Result` property will be set to return the result value of the function.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new task.
- `creationOptions`: The `TaskCreationOptions` used to customize the task's behavior.

Exceptions:

- `ObjectDisposedException`: The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentOutOfRangeException`: The `creationOptions` argument specifies an invalid value for `TaskCreationOptions`.
- `ArgumentNullException`: The `function` argument is `null`.
- `ArgumentException`: The `function` argument is `null`.

#### Remarks
Rather than calling this constructor, the most common way to instantiate a `Task<T>` object and launch a task is by calling the static `StartNew<T>` method.  The only advantage offered by this constructor is that it allows object instantiation to be separated from task invocation.

## Task<TResult>.Task(Object,TResult>, Object, CancellationToken, TaskCreationOptions) constructor

```csharp
public Task (Func<object?,TResult> function, object? state, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Initializes a new `Task<T>` with the specified action, state, and options.

Parameters:

- `function`: The delegate that represents the code to execute in the task. When the function has completed, the task's `Task<T>.Result` property will be set to return the result value of the function.
- `state`: An object representing data to be used by the function.
- `cancellationToken`: The `CancellationToken` to be assigned to the new task.
- `creationOptions`: The `TaskCreationOptions` used to customize the task's behavior.

Exceptions:

- `ObjectDisposedException`: The `CancellationTokenSource` that created `cancellationToken` has already been disposed.
- `ArgumentOutOfRangeException`: The `creationOptions` argument specifies an invalid value for `TaskCreationOptions`.
- `ArgumentNullException`: The `function` argument is `null`.
- `ArgumentException`: The `function` argument is `null`.

#### Remarks
Rather than calling this constructor, the most common way to instantiate a `Task<T>` object and launch a task is by calling the static `StartNew` method. The only advantage offered by this constructor is that it allows object instantiation to be separated from task invocation.

## Task<TResult>.Factory property

```csharp
public static System.Threading.Tasks.TaskFactory<TResult> Factory { get; }
```

Gets a factory method for creating and configuring `Task<T>` instances.

Returns: A factory object that can create a variety of `Task<T>` objects.

#### Remarks
This property returns a default instance of the `TaskFactory<T>` class that is identical to the one created by calling the parameterless `%23ctor` constructor. It has the following property values:

|Property|Value|
|--------------|-----------|
|`TaskFactory<T>.CancellationToken`|`CancellationToken.None`|
|`TaskFactory<T>.ContinuationOptions`|`None`|
|`TaskFactory<T>.CreationOptions`|`None`|
|`TaskFactory<T>.Scheduler`|`null`, or `TaskScheduler.Current`|

The most common use of this property is to create and start a new task in a single call to the `TaskFactory<T>.StartNew` method.

> **Note:**
> The `Task.Run` method provides the easiest way to create a `Task<T>` object with default configuration values.

The following example uses the static `Factory` property to make three calls to the `TaskFactory<T>.StartNew` method. The first starts a `Task<Int32>` object, which executes a lambda expression that returns 1. The second starts a `Task<Test>` object, which executes a lambda expression that instantiates a new `Test` instance. The third starts a `Task<String[]>` object, which enumerates the files in the C:\Users\Public\Pictures\Sample Pictures\ directory. (Note that successful execution of the example requires that the directory exist and that it contain files.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task`1/Factory/returnavalue10.cs._
