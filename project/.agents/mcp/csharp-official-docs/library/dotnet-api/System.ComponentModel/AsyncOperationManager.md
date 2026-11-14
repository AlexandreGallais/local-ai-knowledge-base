---
title: "AsyncOperationManager class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/AsyncOperationManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncOperationManager class

Namespace: `System.ComponentModel`

```csharp
public static class AsyncOperationManager
```

Provides concurrency management for classes that support asynchronous method calls. This class cannot be inherited.

#### Remarks
If your class needs to provide asynchronous behavior according to the Event-based Asynchronous Pattern Overview, you will encounter a number of concurrency management issues. Among these is the requirement to ensure that event handlers are called on a thread or context that is appropriate for the application model (for example, Windows Forms applications, ASP.NET applications, console applications, and so on). The `AsyncOperationManager` provides a convenient way to create a class that runs properly under all application models supported by .NET.

The `AsyncOperationManager` class has one method, `AsyncOperationManager.CreateOperation`, which returns an `AsyncOperation` that can be used to track the duration of a particular asynchronous task. The `AsyncOperation` for a task can be used to alert clients when a task completes. It can also be used to post progress updates and incremental results without terminating the operation.

For more information about implementing asynchronous classes, see Implementing the Event-based Asynchronous Pattern.

#### Examples
The following code example demonstrates using the `AsyncOperationManager` class to create a class that supports asynchronous operations for any application model. It shows how to implement a class that tests a number to determine whether it is prime. This calculation can be time consuming, so it is done on a separate thread. Progress reports, incremental results, and completion notifications are handled by the `AsyncOperation` class, which ensures that the client's event handlers are called on the proper thread or context.

For a full code listing of a client form, see How to: Implement a Client of the Event-based Asynchronous Pattern.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._

## AsyncOperationManager.SynchronizationContext property

```csharp
public static System.Threading.SynchronizationContext SynchronizationContext { get; set; }
```

Gets or sets the synchronization context for the asynchronous operation.

Returns: The synchronization context for the asynchronous operation.

#### Remarks
The default implementation is the free-threaded implementation.

A thread should set the `SynchronizationContext` property to `null` to release the free-threaded factory when it is done, or else its factory will never be disposed.

## AsyncOperationManager.CreateOperation(Object) method

```csharp
public static System.ComponentModel.AsyncOperation CreateOperation (object? userSuppliedState);
```

Returns an `AsyncOperation` for tracking the duration of a particular asynchronous operation.

Parameters:

- `userSuppliedState`: An object used to associate a piece of client state, such as a task ID, with a particular asynchronous operation.

Returns: An `AsyncOperation` that you can use to track the duration of an asynchronous method invocation.

#### Remarks
The `AsyncOperationManager.CreateOperation` method returns an `AsyncOperation` that you can use to track the duration of a particular asynchronous operation and to alert the application model when the operation completes. You can also use it to post progress updates and incremental results without terminating the operation. The `AsyncOperation` will correctly marshal these calls to the appropriate thread or context for the application model.

If you implement a class that supports the Event-based Asynchronous Pattern, your class should call `AsyncOperationManager.CreateOperation` each time your *MethodName*`Async` method is called. The client application that makes calls to the method can use the `userSuppliedState` parameter to uniquely identify each invocation, so as to distinguish events raised during the execution of the asynchronous operation.

> **Caution:**
>  Client code must provide a unique value for the `userSuppliedState` parameter. Non-unique task IDs may cause your implementation to report progress and other events incorrectly. Your code should check for a non-unique task ID and throw an `ArgumentException` if one is detected.

Your code should track every `AsyncOperation` returned by `AsyncOperationManager.CreateOperation` and use the object in the corresponding underlying asynchronous operation to post updates and terminate the operation. This tracking can be as simple as passing the `AsyncOperation` as a parameter among delegates. In more sophisticated designs, your class can maintain a collection of `AsyncOperation` objects, adding objects when tasks are started and removing them when tasks are completed or canceled. This approach allows you to check for unique `userSuppliedState` parameter values, and is the method you should use when working with classes that support multiple concurrent invocations.

For more information about implementing asynchronous classes, see Implementing the Event-based Asynchronous Pattern.

#### Examples
The following code example demonstrates using the `AsyncOperationManager.CreateOperation` method to create an `AsyncOperation` for tracking the duration of asynchronous operations. This code example is part of a larger example provided for the `AsyncOperationManager` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AsyncCompletedEventArgs/Overview/primenumbercalculatormain.cs._
