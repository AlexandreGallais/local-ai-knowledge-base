---
title: "TaskFactory class (part 7 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/TaskFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TaskFactory class (part 7 of 8)

## TaskFactory.FromAsync<TArg1,TArg2,TArg3,TResult>(IAsyncResult>, IAsyncResult,TResult>, TArg1, TArg2, TArg3, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task<TResult> FromAsync<TArg1,TArg2,TArg3,TResult> (Func<TArg1,TArg2,TArg3,AsyncCallback,object?,IAsyncResult> beginMethod, Func<IAsyncResult,TResult> endMethod, TArg1 arg1, TArg2 arg2, TArg3 arg3, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates a `Task<T>` that represents a pair of begin and end methods that conform to the Asynchronous Programming Model pattern.

Parameters:

- `TArg1`: The type of the second argument passed to `beginMethod` delegate.
- `TArg2`: The type of the third argument passed to `beginMethod` delegate.
- `TArg3`: The type of the first argument passed to the `beginMethod` delegate.
- `TResult`: The type of the result available through the task.
- `beginMethod`: The delegate that begins the asynchronous operation.
- `endMethod`: The delegate that ends the asynchronous operation.
- `arg1`: The first argument passed to the `beginMethod` delegate.
- `arg2`: The second argument passed to the `beginMethod` delegate.
- `arg3`: The third argument passed to the `beginMethod` delegate.
- `state`: An object containing data to be used by the `beginMethod` delegate.
- `creationOptions`: The TaskCreationOptions value that controls the behavior of the created `Task<T>`.

Returns: The created `Task<T>` that represents the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `beginMethod` is `null`.

-or-

`endMethod` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks
The `beginMethod` delegate is started on the thread that `TaskFactory.FromAsync` is running on. This method throws any exceptions thrown by the `beginMethod`.

## TaskFactory.StartNew(Action) method

```csharp
public System.Threading.Tasks.Task StartNew (Action action);
```

Creates and starts a task for the specified action delegate.

Parameters:

- `action`: The action delegate to execute asynchronously.

Returns: The started task.

Exceptions:

- `ArgumentNullException`: The `action` argument is `null`.

#### Remarks
Calling `TaskFactory.StartNew` is functionally equivalent to creating a task by using one of its constructors, and then calling the `Task.Start` method to schedule the task for execution.

You can use the `Run` method as a quick way to call `StartNew` with default parameters. Note, however, that there is a difference in behavior between the two methods regarding : `Run` by default does not allow child tasks started with the `AttachedToParent` option to attach to the current `Task` instance, whereas `StartNew` does. For more information and code examples, see Task.Run vs Task.Factory.StartNew in the Parallel Programming with .NET blog.

#### Examples
The following example uses the `StartNew` method to repeatedly invoke an `Action` delegate that generates a random number, interprets it as a Unicode code point, converts it to a UTF16-encoded code unit, and displays information about the resulting character or characters.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskFactory/StartNew/startnew1.cs._

## TaskFactory.StartNew(Action, CancellationToken) method

```csharp
public System.Threading.Tasks.Task StartNew (Action action, System.Threading.CancellationToken <example-value>);
```

Creates and starts a task for the specified action delegate and cancellation token.

Parameters:

- `action`: The action delegate to execute asynchronously.
- `cancellationToken`: The cancellation token that will be assigned to the new task.

Returns: The started task.

Exceptions:

- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.
- `ArgumentNullException`: `action` is `null`.

#### Remarks
Calling `StartNew` is functionally equivalent to creating a Task using one of its constructors and then calling `Task.Start` to schedule it for execution.

You can use the `Run` method as  a quick way to call `StartNew` with default parameters. Note, however, that there is a difference in behavior between the two methods regarding : `Run` by default does not allow child tasks started with the `AttachedToParent` option to attach to the current `Task` instance, whereas `StartNew` does. For more information and code examples, see Task.Run vs Task.Factory.StartNew in the Parallel Programming with .NET blog.

#### Examples
The following example calls the `StartNew` method to create a task that iterates the files in the C:\Windows\System32 directory. The lambda expression calls the `Parallel.ForEach` method to add information about each  file to a `List<T>` object. Each detached nested task invoked by the `Parallel.ForEach` loop checks the state of the cancellation token and, if cancellation is requested, calls the `CancellationToken.ThrowIfCancellationRequested` method. The `CancellationToken.ThrowIfCancellationRequested` method throws an `OperationCanceledException` exception that is handled in a `catch` block when the calling thread calls the `Task.Wait` method.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskFactory/StartNew/startnew2.cs._

## TaskFactory.StartNew(Action, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task StartNew (Action action, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates and starts a task for the specified action delegate and creation options.

Parameters:

- `action`: The action delegate to execute asynchronously.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.

Returns: The started task.

Exceptions:

- `ArgumentNullException`: `action` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid `TaskCreationOptions` value.

#### Remarks
Calling StartNew is functionally equivalent to creating a Task using one of its constructors and then calling `Task.Start` to schedule it for execution.

You can use the `Task.Run` method with an `Action` object as  a quick way to call `TaskFactory.StartNew` with default parameters. For more information and code examples, see Task.Run vs Task.Factory.StartNew in the Parallel Programming with .NET blog.

## TaskFactory.StartNew(Object>, Object) method

```csharp
public System.Threading.Tasks.Task StartNew (Action<object?> action, object? state);
```

Creates and starts a task for the specified action delegate and state.

Parameters:

- `action`: The action delegate to execute asynchronously.
- `state`: An object containing data to be used by the `action` delegate.

Returns: The started task.

Exceptions:

- `ArgumentNullException`: The `action` argument is `null`.

#### Remarks
Calling `TaskFactory.StartNew` is functionally equivalent to creating a `Task` using one of its constructors and then calling the `Task.Start` method to schedule it for execution.

You can use the `Task.Run` method with an `Action` object as  a quick way to call `TaskFactory.StartNew` with default parameters. For more information and code examples, see Task.Run vs Task.Factory.StartNew in the Parallel Programming with .NET blog.

#### Examples
The following example defines an array of 6-letter words. Each word is then passed to an `Action<T>` delegate, which scrambles the word and displays the original word and its scrambled version.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskFactory/StartNew/startnew3.cs._

Note that the example initializes a single random number generator, which is protected by a lock. For the need of a lock, see "The System.Random class and thread safety" in the `Random` class topic.

## TaskFactory.StartNew(Object>, Object, CancellationToken) method

```csharp
public System.Threading.Tasks.Task StartNew (Action<object?> action, object? state, System.Threading.CancellationToken <example-value>);
```

Creates and starts a task for the specified action delegate, state and cancellation token.

Parameters:

- `action`: The action delegate to execute asynchronously.
- `state`: An object containing data to be used by the `action` delegate.
- `cancellationToken`: The cancellation token that will be assigned to the new task.

Returns: The started task.

Exceptions:

- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.
- `ArgumentNullException`: `action` is `null`.

#### Remarks
Calling StartNew is functionally equivalent to creating a Task using one of its constructors and then calling `Task.Start` to schedule it for execution.

You can use the `Task.Run` method with an `Action` object as  a quick way to call `TaskFactory.StartNew` with default parameters. For more information and code examples, see Task.Run vs Task.Factory.StartNew in the Parallel Programming with .NET blog.

#### Examples
The following example defines an array of 6-letter words. Each word is then passed to an `Action<T>` delegate, which scrambles the word and displays the original word and its scrambled version.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/TaskFactory/StartNew/startnew4.cs._

Note that the example initializes a single random number generator, which is protected by a lock. For the need of a lock, see "<example-value>" in the `Random` class topic. To handle the possibility of corruption of the random number generator, a cancellation token is passed to task. If two random numbers equal zero, the method assumes that the random number generator is corrupted and sets the cancellation token. Before sorting the `chars` array that contains the six characters in a word, the method calls the `CancellationToken.ThrowIfCancellationRequested` method to throw an `OperationCanceledException` if the token has been canceled.

## TaskFactory.StartNew(Object>, Object, TaskCreationOptions) method

```csharp
public System.Threading.Tasks.Task StartNew (Action<object?> action, object? state, System.Threading.Tasks.TaskCreationOptions creationOptions);
```

Creates and starts a task for the specified action delegate, state and creation options.

Parameters:

- `action`: The action delegate to execute asynchronously.
- `state`: An object containing data to be used by the `action` delegate.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.

Returns: The started task.

Exceptions:

- `ArgumentNullException`: `action` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid `TaskCreationOptions` value.

#### Remarks
Calling StartNew is functionally equivalent to creating a Task using one of its constructors and then calling `Task.Start` to schedule it for execution.

You can use the `Task.Run` method with an `Action` object as  a quick way to call `TaskFactory.StartNew` with default parameters. For more information and code examples, see Task.Run vs Task.Factory.StartNew in the Parallel Programming with .NET blog.

## TaskFactory.StartNew(Action, CancellationToken, TaskCreationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task StartNew (Action action, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskCreationOptions creationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates and starts a task for the specified action delegate, cancellation token, creation options and state.

Parameters:

- `action`: The action delegate to execute asynchronously.
- `cancellationToken`: The cancellation token that will be assigned to the new task.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.
- `scheduler`: The task scheduler that is used to schedule the created task.

Returns: The started task.

Exceptions:

- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.
- `ArgumentNullException`: `action` is `null`.

-or-

`scheduler` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` specifies an invalid TaskCreationOptions value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks
Calling StartNew is functionally equivalent to creating a Task using one of its constructors and then calling `Task.Start` to schedule it for execution.

You can use the `Task.Run` method with an `Action` object as  a quick way to call `TaskFactory.StartNew` with default parameters. For more information and code examples, see Task.Run vs Task.Factory.StartNew in the Parallel Programming with .NET blog.

## TaskFactory.StartNew(Object>, Object, CancellationToken, TaskCreationOptions, TaskScheduler) method

```csharp
public System.Threading.Tasks.Task StartNew (Action<object?> action, object? state, System.Threading.CancellationToken <example-value>, System.Threading.Tasks.TaskCreationOptions creationOptions, System.Threading.Tasks.TaskScheduler scheduler);
```

Creates and starts a task for the specified action delegate, state, cancellation token, creation options and task scheduler.

Parameters:

- `action`: The action delegate to execute asynchronously.
- `state`: An object containing data to be used by the `action` delegate.
- `cancellationToken`: The cancellation token that will be assigned to the new task.
- `creationOptions`: One of the enumeration values that controls the behavior of the created task.
- `scheduler`: The task scheduler that is used to schedule the created task.

Returns: The started task.

Exceptions:

- `ObjectDisposedException`: The provided `CancellationToken` has already been disposed.
- `ArgumentNullException`: `action` is `null`.

-or-

`scheduler` is `null`.
- `ArgumentOutOfRangeException`: `creationOptions` argument specifies an invalid `TaskCreationOptions` value. For more information, see the Remarks for `TaskFactory.FromAsync`

#### Remarks
Calling StartNew is functionally equivalent to creating a Task using one of its constructors and then calling `Task.Start` to schedule it for execution.

You can use the `Task.Run` method with an `Action` object as  a quick way to call `TaskFactory.StartNew` with default parameters. For more information and code examples, see Task.Run vs Task.Factory.StartNew in the Parallel Programming with .NET blog.
