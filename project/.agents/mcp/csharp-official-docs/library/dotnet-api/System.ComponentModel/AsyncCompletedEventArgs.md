---
title: "AsyncCompletedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/AsyncCompletedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncCompletedEventArgs class

Namespace: `System.ComponentModel`

```csharp
public class AsyncCompletedEventArgs : EventArgs
```

Provides data for the *MethodName*`Completed` event.

#### Remarks
If you are using a class that implements the Event-based Asynchronous Pattern Overview, the class will provide a *MethodName*`Completed` event. If you add an instance of the `AsyncCompletedEventHandler` delegate to the event, you will receive information about the outcome of asynchronous operations in the `AsyncCompletedEventArgs` parameter of the corresponding event-handler method.

The client application's event-handler delegate can check the `Cancelled` property to determine if the asynchronous task was cancelled.

The client application's event-handler delegate can check the `Error` property to determine if an exception occurred during execution of the asynchronous task.

If the class supports multiple asynchronous methods, or multiple calls to the same asynchronous method, you can determine which task raised the *MethodName*`Completed` event by checking the value of the `UserState` property. Your code will need to track these tokens, known as task IDs, as their corresponding asynchronous tasks start and complete.

#### Examples
The following code example demonstrates using an `AsyncOperation` to track the lifetime of asynchronous operations. This code example is part of a larger example provided for the `AsyncOperationManager` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._

## AsyncCompletedEventArgs.AsyncCompletedEventArgs(Exception, Boolean, Object) constructor

```csharp
public AsyncCompletedEventArgs (Exception? error, bool cancelled, object? userState);
```

Initializes a new instance of the `AsyncCompletedEventArgs` class.

Parameters:

- `error`: Any error that occurred during the asynchronous operation.
- `cancelled`: A value indicating whether the asynchronous operation was canceled.
- `userState`: The optional user-supplied state object passed to the `BackgroundWorker.RunWorkerAsync` method.

To be added.

## AsyncCompletedEventArgs.Cancelled property

```csharp
public bool Cancelled { get; }
```

Gets a value indicating whether an asynchronous operation has been canceled.

Returns: `true` if the background operation has been canceled; otherwise `false`. The default is `false`.

#### Remarks
When the `Cancelled` property is `true`, the asynchronous operation was interrupted.

The client application's event-handler delegate should check the `Cancelled` property before accessing any properties in a class derived from `AsyncCompletedEventArgs`; otherwise, the property will raise an `InvalidOperationException` if the asynchronous operation was interrupted.

#### Examples
The following code example demonstrates the using an `AsyncOperation` to track the lifetime of asynchronous operations. This code example is part of a larger example provided for the `AsyncOperationManager` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._

## AsyncCompletedEventArgs.Error property

```csharp
public Exception? Error { get; }
```

Gets a value indicating which error occurred during an asynchronous operation.

Returns: An `Exception` instance, if an error occurred during an asynchronous operation; otherwise `null`.

#### Remarks
If an exception is raised during an asynchronous operation, the class will assign the exception to the `Error` property. The client application's event-handler delegate should check the `Error` property before accessing any properties in a class derived from `AsyncCompletedEventArgs`; otherwise, the property will raise a `TargetInvocationException` with its `InnerException` property holding a reference to `AsyncCompletedEventArgs.Error`.

The value of the `Error` property is `null` if the operation was canceled.

#### Examples
The following code example demonstrates using an `AsyncOperation` to track the lifetime of asynchronous operations. This code example is part of a larger example provided for the `AsyncOperationManager` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._

## AsyncCompletedEventArgs.UserState property

```csharp
public object? UserState { get; }
```

Gets the unique identifier for the asynchronous task.

Returns: An object reference that uniquely identifies the asynchronous task; otherwise, `null` if no value has been set.

#### Remarks
If a class supports multiple asynchronous methods, or multiple invocations of a single method, you can determine which task raised the *MethodName*`Completed` event by checking the value of the `UserState` property. Your code will need track these tokens, known as task IDs, as their corresponding asynchronous tasks start and complete.

The value of this property is set during the original call to the asynchronous method that started the task.

#### Examples
The following code example demonstrates using an `AsyncOperation` to track the lifetime of asynchronous operations. This code example is part of a larger example provided for the `AsyncOperationManager` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._

## AsyncCompletedEventArgs.RaiseExceptionIfNecessary() method

```csharp
protected void RaiseExceptionIfNecessary ();
```

Raises a user-supplied exception if an asynchronous operation failed.

Exceptions:

- `InvalidOperationException`: The `AsyncCompletedEventArgs.Cancelled` property is `true`.
- `TargetInvocationException`: The `AsyncCompletedEventArgs.Error` property has been set by the asynchronous operation. The `Exception.InnerException` property holds a reference to `AsyncCompletedEventArgs.Error`.

#### Examples
The following code example demonstrates using `AsyncCompletedEventArgs.RaiseExceptionIfNecessary` in derived class properties.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._
