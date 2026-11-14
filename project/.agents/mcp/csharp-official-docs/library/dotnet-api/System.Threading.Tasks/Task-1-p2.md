---
title: "Task<TResult> class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task<TResult> class (part 2 of 4)

## Task<TResult>.Result property

```csharp
public TResult Result { get; }
```

Gets the result value of this `Task<T>`.

Returns: The result value of this `Task<T>`, which is of the same type as the task's type parameter.

Exceptions:

- `AggregateException`: The task was canceled. The `AggregateException.InnerExceptions` collection contains a `TaskCanceledException` object.

-or-

An exception was thrown during the execution of the task. The `AggregateException.InnerExceptions` collection contains information about the exception or exceptions.

#### Remarks
Accessing the property's get accessor blocks the calling thread until the asynchronous operation is complete; it is equivalent to calling the `Task.Wait` method.

Once the result of an operation is available, it is stored and is returned immediately on subsequent calls to the `Result` property. Note that, if an exception occurred during the operation of the task, or if the task has been cancelled, the `Result` property does not return a value. Instead, attempting to access the property value throws an `AggregateException` exception.

#### Examples
The following example is a command-line utility that calculates the number of bytes in the files in each directory whose name is passed as a command-line argument. If the directory contains files, it executes a lambda expression that instantiates a `FileStream` object for each file in the directory and retrieves the value of its `Length` property. If a directory contains no files, it simply calls the `Task.FromResult` method to create a task whose `Result` property is zero (0). When the tasks finish, the total number of bytes in all a directory's files is available from the `Result` property.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/FromExceptionTResult/fromresult1.cs._

## Task<TResult>.ConfigureAwait(Boolean) method

```csharp
public System.Runtime.CompilerServices.ConfiguredTaskAwaitable<TResult> ConfigureAwait (bool continueOnCapturedContext);
```

Configures an awaiter used to await this `Task<T>`.

Parameters:

- `continueOnCapturedContext`: true to attempt to marshal the continuation back to the original context captured; otherwise, false.

Returns: An object used to await this task.

To be added.

## Task<TResult>.ConfigureAwait(ConfigureAwaitOptions) method

```csharp
public System.Runtime.CompilerServices.ConfiguredTaskAwaitable<TResult> ConfigureAwait (System.Threading.Tasks.ConfigureAwaitOptions options);
```

Configures an awaiter used to await this `Task`.

Parameters:

- `options`: Options used to configure how awaits on this task are performed.

Returns: An object used to await this task.

Exceptions:

- `ArgumentOutOfRangeException`: The `options` argument specifies an invalid value.

To be added.

## Task<TResult>.ContinueWith(Task<TResult>>) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task<TResult>> continuationAction);
```

Creates a continuation that executes asynchronously when the target task completes.

Parameters:

- `continuationAction`: An action to run when the antecedent `Task<T>` completes. When run, the delegate will be passed the completed task as an argument.

Returns: A new continuation task.

Exceptions:

- `ObjectDisposedException`: The `Task<T>` has been disposed.
- `ArgumentNullException`: The `continuationAction` argument is `null`.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting early due to being canceled.

#### Examples
The following example creates an antecedent task that uses the Sieve of Eratosthenes to calculate the prime numbers between 1 and a value entered by the user. An array is used to hold information about the prime numbers. The array index represents the number, and the element's value indicates whether that number is composite (its value is `true`) or prime (its value is `false`). This task is then passed to a continuation task, which is responsible for extracting the prime numbers from the integer array and displaying them.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskTResult/ContinueWith/continue2.cs._

## Task<TResult>.ContinueWith(Object>, Object) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task<TResult>,object?> continuationAction, object? state);
```

Creates a continuation that is passed state information and that executes when the target `Task<T>` completes.

Parameters:

- `continuationAction`: An action to run when the `Task<T>` completes. When run, the delegate is   passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation action.

Returns: A new continuation `Task`.

Exceptions:

- `ArgumentNullException`: The `continuationAction` argument is `null`.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

#### Examples
The following example creates a task that is passed an integer between 2 and 20 and returns an array that contains the first ten exponents (from n1 to n10) of that number. A continuation task is then responsible for displaying the exponents. It is passed both the antecedent and the original number whose exponents the antecedent generates.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskTResult/ContinueWith/continuewith3.cs._

## Task<TResult>.ContinueWith(Task<TResult>>, CancellationToken) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task<TResult>> continuationAction, System.Threading.CancellationToken <example-value>);
```

Creates a cancelable continuation that executes asynchronously when the target `Task<T>` completes.

Parameters:

- `continuationAction`: An action to run when the `Task<T>` completes. When run, the delegate is passed the completed task as an argument.
- `cancellationToken`: The cancellation token that is passed to the new continuation task.

Returns: A new continuation task.

Exceptions:

- `ObjectDisposedException`: The `Task<T>` has been disposed.

-or-

The `CancellationTokenSource` that created `cancellationToken` has been disposed.
- `ArgumentNullException`: The `continuationAction` argument is `null`.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

#### Examples
The following example creates an antecedent task that uses the Sieve of Eratosthenes to calculate the prime numbers between 1 and a value entered by the user. An array is used to hold information about the prime numbers. The array index represents the number, and the element's value indicates whether that number is composite (its value is `true`) or prime (its value is `false`). This task is then passed to a continuation task, which is responsible for extracting the prime numbers from the integer array and displaying them.

A cancellation token is passed to both the antecedent and the continuation task. A `Timer` object is used to define a timeout value of 100 milliseconds. If the event fires, the `CancellationTokenSource.Cancel` method is called, and the cancellation token is used to request cancellation of the tasks.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskTResult/ContinueWith/continue1.cs._

Typically, supplying a value of about 100,000 causes the timeout interval to expire and the `Elapsed` event to fire, and the cancellation request to be set.

## Task<TResult>.ContinueWith(Task<TResult>>, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task<TResult>> continuationAction, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation that executes according the condition specified in `continuationOptions`.

Parameters:

- `continuationAction`: An action to according the condition specified in `continuationOptions`. When run, the delegate will be passed the completed task as an argument.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.

Returns: A new continuation `Task`.

Exceptions:

- `ObjectDisposedException`: The `Task<T>` has been disposed.
- `ArgumentNullException`: The `continuationAction` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed. If the continuation criteria specified through the `continuationOptions` parameter are not met, the continuation task will be canceled instead of scheduled.

For more information, see Chaining Tasks by Using Continuation Tasks.

## Task<TResult>.ContinueWith(Task<TResult>>, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task<TResult>> continuationAction, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that executes asynchronously when the target `Task<T>` completes.

Parameters:

- `continuationAction`: An action to run when the `Task<T>` completes. When run, the delegate will be passed the completed task as an argument.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its execution.

Returns: A new continuation `Task`.

Exceptions:

- `ObjectDisposedException`: The `Task<T>` has been disposed.
- `ArgumentNullException`: The `continuationAction` argument is `null`.

-or-

The `scheduler` argument is `null`.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

## Task<TResult>.ContinueWith(Object>, Object, CancellationToken) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task<TResult>,object?> continuationAction, object? state, System.Threading.CancellationToken <example-value>);
```

Creates a continuation that executes when the target `Task<T>` completes.

Parameters:

- `continuationAction`: An action to run when the `Task<T>` completes. When run, the delegate will be  passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation action.
- `cancellationToken`: The `CancellationToken` that will be assigned to the new continuation task.

Returns: A new continuation `Task`.

Exceptions:

- `ArgumentNullException`: The `continuationAction` argument is `null`.
- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.

## Task<TResult>.ContinueWith(Object>, Object, TaskContinuationOptions) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task<TResult>,object?> continuationAction, object? state, System.Threading.Tasks.TaskContinuationOptions continuationOptions);
```

Creates a continuation that executes when the target `Task<T>` completes.

Parameters:

- `continuationAction`: An action to run when the `Task<T>` completes. When run, the delegate will be  passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation action.
- `continuationOptions`: Options for when the continuation is scheduled and how it behaves. This includes criteria, such  as `TaskContinuationOptions.OnlyOnCanceled`, as well as execution options, such as `TaskContinuationOptions.ExecuteSynchronously`.

Returns: A new continuation `Task`.

Exceptions:

- `ArgumentNullException`: The `continuationAction` argument is `null`.
- `ArgumentOutOfRangeException`: The `continuationOptions` argument specifies an invalid value for `TaskContinuationOptions`.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed. If the continuation criteria specified through the `continuationOptions` parameter are not met, the continuation task will be canceled instead of scheduled.

## Task<TResult>.ContinueWith(Object>, Object, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task ContinueWith (Action<System.Threading.Tasks.Task<TResult>,object?> continuationAction, object? state, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates a continuation that executes when the target `Task<T>` completes.

Parameters:

- `continuationAction`: An action to run when the `Task<T>` completes. When run, the delegate will be passed the completed task and the caller-supplied state object as arguments.
- `state`: An object representing data to be used by the continuation action.
- `scheduler`: The `TaskScheduler` to associate with the continuation task and to use for its execution.

Returns: A new continuation `Task`.

Exceptions:

- `ArgumentNullException`: The `scheduler` argument is `null`.

#### Remarks
The returned `Task` will not be scheduled for execution until the current task has completed, whether it completes due to running to completion successfully, faulting due to an unhandled exception, or exiting out early due to being canceled.
