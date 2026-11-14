---
title: "Task class (part 6 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Task.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Task class (part 6 of 11)

## Task.FromException(Exception) method

```csharp
public static System.Threading.Tasks.Task FromException (Exception exception);
```

Creates a `Task` that has completed with a specified exception.

Parameters:

- `exception`: The exception with which to complete the task.

Returns: The faulted task.

#### Remarks
This method creates a `Task` object whose `Status` property is `Faulted` and whose `Exception` property contains `exception`. The method is commonly used when you immediately know that the work that a task performs will throw an exception before executing a longer code path. For an example, see the `FromException<T>` overload.

## Task.FromException<TResult>(Exception) method

```csharp
public static System.Threading.Tasks.Task<TResult> FromException<TResult> (Exception exception);
```

Creates a `Task<T>` that's completed with a specified exception.

Parameters:

- `TResult`: The type of the result returned by the task.
- `exception`: The exception with which to complete the task.

Returns: The faulted task.

#### Remarks
This method creates a `Task<T>` object whose `Status` property is `Faulted` and whose `Exception` property contains `exception`. The method is commonly used when you immediately know that the work that a task performs will throw an exception before executing a longer code path. The example provides an illustration.

#### Examples
The following example is a command-line utility that calculates the number of bytes in the files in each directory whose name is passed as a command-line argument. Rather than executing a longer code path that instantiates a `FileInfo` object and retrieves the value of its `Length` property for each file in the directory, the example simply calls the `FromException<T>` method to create a faulted task if a particular subdirectory does not exist.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/FromExceptionTResult/fromresult1.cs._

## Task.FromResult<TResult>(TResult) method

```csharp
public static System.Threading.Tasks.Task<TResult> FromResult<TResult> (TResult result);
```

Creates a `Task<T>` that's completed successfully with the specified result.

Parameters:

- `TResult`: The type of the result returned by the task.
- `result`: The result to store into the completed task.

Returns: The successfully completed task.

#### Remarks

This method creates a `Task<T>` object whose `Result` property is `result` and whose `Status` property is `RanToCompletion`. The method is commonly used when the return value of a task is immediately known without executing a longer code path. The example provides an illustration.

To create a `Task` object that does not return a value, retrieve the `Task` object from the `CompletedTask` property.

For some `TResult` types and some result values, this method might return a cached singleton object rather than allocating a new object.

#### Examples
The following example is a command-line utility that calculates the number of bytes in the files in each directory whose name is passed as a command-line argument. Rather than executing a longer code path that instantiates a `FileStream` object and retrieves the value of its `Length` property for each file in the directory, the example simply calls the `Task.FromResult` method to create a task whose `Result` property is zero (0) if a directory has no files.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/FromExceptionTResult/fromresult1.cs._

## Task.GetAwaiter() method

```csharp
public System.Runtime.CompilerServices.TaskAwaiter GetAwaiter ();
```

Gets an awaiter used to await this `Task`.

Returns: An awaiter instance.

#### Remarks

This method is intended for compiler use rather than use directly in code.

## Task.Run(Action) method

```csharp
public static System.Threading.Tasks.Task Run (Action action);
```

Queues the specified work to run on the thread pool and returns a `Task` object that represents that work.

Parameters:

- `action`: The work to execute asynchronously.

Returns: A task that represents the work queued to execute in the ThreadPool.

Exceptions:

- `ArgumentNullException`: The `action` parameter was `null`.

#### Remarks
The `Task.Run` method allows you to create and execute a task in a single method call and is a simpler alternative to the `TaskFactory.StartNew` method. It creates a task with the following default values:

- Its cancellation token is `CancellationToken.None`.
- Its `CreationOptions` property value is `DenyChildAttach`.
- It uses the default task scheduler.

For information on handling exceptions thrown by task operations, see Exception Handling.

#### Examples
The following example defines a `ShowThreadInfo` method  that displays the `Thread.ManagedThreadId` of the current thread. It is called directly from the application thread, and is called from the `Action` delegate passed to the `Run` method.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/Run11.cs._

The following example is similar to the previous one, except that it uses a lambda expression to define the code that the task is to execute.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/run6.cs._

The examples show that the asynchronous task executes on a different thread than the main application thread.

The call to the `Task.Wait` method ensures that the task completes and displays its output before the application ends. Otherwise, it is possible that the `Main` method will complete before the task finishes.

The following example illustrates the `Run` method. It defines an array of directory names and starts a separate task to retrieve the file names in each directory. All tasks write the file names to a single `ConcurrentBag<T>` object. The example then calls the `WaitAll` method to ensure that all tasks have completed, and then displays a count of the total number of file names written to the `ConcurrentBag<T>` object.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/run2.cs._

## Task.Run(Task>) method

```csharp
public static System.Threading.Tasks.Task Run (Func<System.Threading.Tasks.Task?> function);
```

Queues the specified work to run on the thread pool and returns a proxy for the task returned by `function`.

Parameters:

- `function`: The work to execute asynchronously.

Returns: A task that represents a proxy for the task returned by `function`.

Exceptions:

- `ArgumentNullException`: The `function` parameter was `null`.

#### Remarks
For information on handling exceptions thrown by task operations, see Exception Handling.

## Task.Run(Action, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task Run (Action action, System.Threading.CancellationToken <example-value>);
```

Queues the specified work to run on the thread pool and returns a `Task` object that represents that work. A cancellation token <example-value> the work to be cancelled if it has not yet started.

Parameters:

- `action`: The work to execute asynchronously.
- `cancellationToken`: A cancellation token that can be used to cancel the work if it has not yet started. `Task.Run` does not pass `cancellationToken` to `action`.

Returns: A task that represents the work queued to execute in the thread pool.

Exceptions:

- `ArgumentNullException`: The `action` parameter is `null`.
- `OperationCanceledException`: The task has been canceled. This exception is stored into the returned task.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with `cancellationToken` was disposed.
- `TaskCanceledException`: The task has been canceled.

#### Remarks
If cancellation is requested before the task begins execution, the task does not execute. Instead it is set to the `Canceled` state and throws a `TaskCanceledException` exception.

The `Run` method is a simpler alternative to the `StartNew` method. It creates a task with the following default values:

- Its `CreationOptions` property value is `DenyChildAttach`.
- It uses the default task scheduler.

For information on handling exceptions thrown by task operations, see Exception Handling.

#### Examples
The following example calls the `Run` method to create a task that iterates the files in the C:\Windows\System32 directory. The lambda expression calls the `Parallel.ForEach` method to add information about each  file to a `List<T>` object. Each detached nested task invoked by the `Parallel.ForEach` loop checks the state of the cancellation token and, if cancellation is requested, calls the `CancellationToken.ThrowIfCancellationRequested` method. The `CancellationToken.ThrowIfCancellationRequested` method throws an `OperationCanceledException` exception that is handled in a `catch` block when the calling thread calls the `Task.Wait` method.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/run41.cs._

## Task.Run(Task>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task Run (Func<System.Threading.Tasks.Task?> function, System.Threading.CancellationToken <example-value>);
```

Queues the specified work to run on the thread pool and returns a proxy for the task returned by `function`. A cancellation token <example-value> the work to be cancelled if it has not yet started.

Parameters:

- `function`: The work to execute asynchronously.
- `cancellationToken`: A cancellation token that can be used to cancel the work if it has not yet started. `Task.Run` does not pass `cancellationToken` to `action`.

Returns: A task that represents a proxy for the task returned by `function`.

Exceptions:

- `ArgumentNullException`: The `function` parameter was `null`.
- `OperationCanceledException`: The task has been canceled. This exception is stored into the returned task.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with `cancellationToken` was disposed.
- `TaskCanceledException`: The task has been canceled.

#### Remarks
For information on handling exceptions thrown by task operations, see Exception Handling.

## Task.Run<TResult>(Task<TResult>>) method

```csharp
public static System.Threading.Tasks.Task<TResult> Run<TResult> (Func<System.Threading.Tasks.Task<TResult>?> function);
```

Queues the specified work to run on the thread pool and returns a proxy for the `Task(TResult)` returned by `function`. A cancellation token <example-value> the work to be cancelled if it has not yet started.

Parameters:

- `TResult`: The type of the result returned by the proxy task.
- `function`: The work to execute asynchronously.

Returns: A `Task(TResult)` that represents a proxy for the `Task(TResult)` returned by `function`.

Exceptions:

- `ArgumentNullException`: The `function` parameter was `null`.

#### Remarks
For information on handling exceptions thrown by task operations, see Exception Handling.

## Task.Run<TResult>(Func<TResult>) method

```csharp
public static System.Threading.Tasks.Task<TResult> Run<TResult> (Func<TResult> function);
```

Queues the specified work to run on the thread pool and returns a `Task<T>` object that represents that work. A cancellation token <example-value> the work to be cancelled if it has not yet started.

Parameters:

- `TResult`: The return type of the task.
- `function`: The work to execute asynchronously.

Returns: A task object that represents the work queued to execute in the thread pool.

Exceptions:

- `ArgumentNullException`: The `function` parameter is `null`.

#### Remarks
The `Task.Run` method is a simpler alternative to the `StartNew` method. It creates a task with the following default values:

- Its cancellation token is `CancellationToken.None`.

- Its `CreationOptions` property value is `DenyChildAttach`.

- It uses the default task scheduler.

For information on handling exceptions thrown by task operations, see Exception Handling.

#### Examples
The following example counts the approximate number of words in text files that represent published books. Each task is responsible for opening a file, reading its entire contents asynchronously, and calculating the word count by using a regular expression. The `WaitAll` method is called to ensure that all tasks have completed before  displaying the word count of each book to the console.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Task/.ctor/run31.cs._

The regular expression `\p{P}*\s+` matches zero, one, or more punctuation characters followed by one or more white-space characters. It assumes that the total number of matches equals the approximate word count.

## Task.Run<TResult>(Task<TResult>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<TResult> Run<TResult> (Func<System.Threading.Tasks.Task<TResult>?> function, System.Threading.CancellationToken <example-value>);
```

Queues the specified work to run on the thread pool and returns a proxy for the `Task(TResult)` returned by `function`.

Parameters:

- `TResult`: The type of the result returned by the proxy task.
- `function`: The work to execute asynchronously.
- `cancellationToken`: A cancellation token that can be used to cancel the work if it has not yet started. `Task.Run<T>` does not pass `cancellationToken` to `action`.

Returns: A `Task(TResult)` that represents a proxy for the `Task(TResult)` returned by `function`.

Exceptions:

- `ArgumentNullException`: The `function` parameter was `null`.
- `OperationCanceledException`: The task has been canceled. This exception is stored into the returned task.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with `cancellationToken` was disposed.
- `TaskCanceledException`: The task has been canceled.

#### Remarks
For information on handling exceptions thrown by task operations, see Exception Handling.
