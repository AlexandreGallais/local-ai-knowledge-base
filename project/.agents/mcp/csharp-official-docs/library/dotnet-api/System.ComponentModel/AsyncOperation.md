---
title: "AsyncOperation class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/AsyncOperation.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncOperation class

Namespace: `System.ComponentModel`

```csharp
public sealed class AsyncOperation
```

Tracks the lifetime of an asynchronous operation.

#### Remarks
When you implement a class according to the Event-based Asynchronous Pattern Overview, you may need to track the lifetime of each asynchronous operation invoked on an instance of your class. The `AsyncOperation` class provides ways to track and report the progress of an asynchronous task.

The following list identifies ways to use an `AsyncOperation` object:

- To report progress and interim results to the client, call `AsyncOperation.Post` from your asynchronous worker code.

- To indicate that an asynchronous task has completed, or to cancel a pending asynchronous task, call `AsyncOperation.PostOperationCompleted`.

Your class should get an `AsyncOperation` object for each asynchronous task by calling `AsyncOperationManager.CreateOperation` when each task starts. To allow the client to distinguish separate asynchronous tasks, `AsyncOperationManager.CreateOperation` takes a parameter for a unique client-provided token, which becomes the `UserSuppliedState` property. It can then be used by client code to identify the particular asynchronous task that is raising progress or completion events.

#### Examples
The following code example demonstrates using an `AsyncOperation` object to track the lifetime of asynchronous operations. This code example is part of a larger example provided for the `AsyncOperationManager` class.

For a full code listing of a client form, see How to: Implement a Client of the Event-based Asynchronous Pattern.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._

## AsyncOperation.SynchronizationContext property

```csharp
public System.Threading.SynchronizationContext SynchronizationContext { get; }
```

Gets the `SynchronizationContext` object that was passed to the constructor.

Returns: The `SynchronizationContext` object that was passed to the constructor.

To be added.

## AsyncOperation.UserSuppliedState property

```csharp
public object? UserSuppliedState { get; }
```

Gets or sets an object used to uniquely identify an asynchronous operation.

Returns: The state object passed to the asynchronous method invocation.

#### Remarks
If your class supports multiple asynchronous methods or multiple invocations of a single asynchronous method, clients will need a way to determine which asynchronous task is raising events. Your `MethodNameAsync` method should take a parameter of type `Object` that will act as a task ID. You will use this task ID when you call the `AsyncOperationManager.CreateOperation`, method and this will associate the client's task ID with a particular invocation of your asynchronous operation. This task ID is made available to your implementation through the `UserSuppliedState` property.

> **Caution:**
>  Client code must be careful to provide a unique value for the `UserSuppliedState` property. Non-unique task IDs may cause your implementation to report progress and other events incorrectly. Your code should check for a non-unique task ID and raise an `ArgumentException` if one is detected.

#### Examples
The following code example demonstrates using `AsyncOperation.UserSuppliedState` to track the lifetime of asynchronous operations. This code example is part of a larger example provided for the `AsyncOperationManager` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._

## AsyncOperation.Finalize() method

```csharp
~AsyncOperation ();
```

Finalizes the asynchronous operation.

To be added.

## AsyncOperation.OperationCompleted() method

```csharp
public void OperationCompleted ();
```

Ends the lifetime of an asynchronous operation.

Exceptions:

- `InvalidOperationException`: `AsyncOperation.OperationCompleted` has been called previously for this task.

#### Remarks
Call the `AsyncOperation.OperationCompleted` method to end the lifetime of an asynchronous operation. After this method is called for a particular task, calls to its corresponding `AsyncOperation` will raise an exception.

## AsyncOperation.Post(SendOrPostCallback, Object) method

```csharp
public void Post (System.Threading.SendOrPostCallback d, object? arg);
```

Invokes a delegate on the thread or context appropriate for the application model.

Parameters:

- `d`: A `SendOrPostCallback` object that wraps the delegate to be called when the operation ends.
- `arg`: An argument for the delegate contained in the `d` parameter.

Exceptions:

- `InvalidOperationException`: The `AsyncOperation.PostOperationCompleted` method has been called previously for this task.
- `ArgumentNullException`: `d` is `null`.

#### Remarks
The `AsyncOperation.Post` method invokes the delegate specified by the `arg` parameter without ending the lifetime of the asynchronous operation.

You can call the `AsyncOperation.Post` method as often as you like while the lifetime of the asynchronous operation has not been ended by a call to `AsyncOperation.PostOperationCompleted`. You can use the method to report progress or interim results back to clients.

The `d` parameter wraps the delegate you want called when you want to post an update about the status of the asynchronous task. The `AsyncOperation` object will ensure that your delegate is invoked on the thread or context appropriate for the application model. Your method can optionally raise an event that notifies clients of a status change, progress update, or newly available incremental results.

The `arg` parameter should be used to pass state to the delegate wrapped by the `d` parameter. It might be a reference to an `AsyncOperation`, or it might be a `ProgressChangedEventArgs` object. It may be desirable to derive your own class from `ProgressChangedEventArgs` to provide additional state storage.

#### Examples
The following code example demonstrates using the `AsyncOperation.Post` method for reporting progress and incremental results of an asynchronous operation. This code example is part of a larger example provided for the `AsyncOperationManager` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._

## AsyncOperation.PostOperationCompleted(SendOrPostCallback, Object) method

```csharp
public void PostOperationCompleted (System.Threading.SendOrPostCallback d, object? arg);
```

Ends the lifetime of an asynchronous operation.

Parameters:

- `d`: A `SendOrPostCallback` object that wraps the delegate to be called when the operation ends.
- `arg`: An argument for the delegate contained in the `d` parameter.

Exceptions:

- `InvalidOperationException`: `AsyncOperation.OperationCompleted` has been called previously for this task.
- `ArgumentNullException`: `d` is `null`.

#### Remarks
Call the `AsyncOperation.PostOperationCompleted` method to end the lifetime of an asynchronous operation. After this method is called for a particular task, calls to its corresponding `AsyncOperation` object will raise an exception.

The `d` parameter wraps the delegate you want your class to call when the task's lifetime ends due to completion, cancellation, or failure of the task. The `AsyncOperation` object will ensure that your delegate is invoked on the thread or context appropriate for the application model. Your delegate can optionally raise an event that notifies clients that the asynchronous task's lifetime has ended.

The `arg` parameter is used to pass state information to the completion delegate `d`. You can use an `AsyncOperation` object, or an `AsyncCompletedEventArgs` object as the parameter value. Alternatively, if you want to provide additional state storage, you can use an instance of a class you derive from the `AsyncCompletedEventArgs` class.

#### Examples
The following code example demonstrates using the `AsyncOperation.PostOperationCompleted` method to end the lifetime of an asynchronous operation. This code example is part of a larger example provided for the `AsyncOperationManager` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._
