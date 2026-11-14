---
title: "Task-based asynchronous programming - .NET (part 6 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/task-based-asynchronous-programming.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Task-based asynchronous programming - .NET (part 6 of 6)

## Canceling tasks

The `System.Threading.Tasks.Task` class supports cooperative cancellation and is fully integrated with the `System.Threading.CancellationTokenSource` and `System.Threading.CancellationToken` classes, which were introduced in the .NET Framework 4. Many of the constructors in the `System.Threading.Tasks.Task` class take a `System.Threading.CancellationToken` object as an input parameter. Many of the `System.Threading.Tasks.TaskFactory.StartNew*` and `System.Threading.Tasks.Task.Run*` overloads also include a `System.Threading.CancellationToken` parameter.

You can create the token and issue the cancellation request at some later time, by using the `System.Threading.CancellationTokenSource` class. Pass the token to the `System.Threading.Tasks.Task` as an argument, and also reference the same token in your user delegate, which does the work of responding to a cancellation request.

For more information, see Task Cancellation and How to: Cancel a Task and Its Children.

## The TaskFactory class

The `System.Threading.Tasks.TaskFactory` class provides static methods that encapsulate common patterns for creating and starting tasks and continuation tasks.

- The most common pattern is `System.Threading.Tasks.TaskFactory.StartNew*`, which creates and starts a task in one statement.

- When you create continuation tasks from multiple antecedents, use the `System.Threading.Tasks.TaskFactory.ContinueWhenAll*` method or `System.Threading.Tasks.TaskFactory.ContinueWhenAny*` method or their equivalents in the `System.Threading.Tasks.Task`1` class. For more information, see Chaining Tasks by Using Continuation Tasks.

- To encapsulate Asynchronous Programming Model `BeginX` and `EndX` methods in a `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` instance, use the `System.Threading.Tasks.TaskFactory.FromAsync*` methods. For more information, see TPL and Traditional .NET Framework Asynchronous Programming.

The default `System.Threading.Tasks.TaskFactory` can be accessed as a static property on the `System.Threading.Tasks.Task` class or `System.Threading.Tasks.Task`1` class. You can also instantiate a `System.Threading.Tasks.TaskFactory` directly and specify various options that include a `System.Threading.CancellationToken`, a `System.Threading.Tasks.TaskCreationOptions` option, a `System.Threading.Tasks.TaskContinuationOptions` option, or a `System.Threading.Tasks.TaskScheduler`. Whatever options are specified when you create the task factory are applied to all tasks that it creates unless the `System.Threading.Tasks.Task` is created by using the `System.Threading.Tasks.TaskCreationOptions` enumeration, in which case the task's options override those of the task factory.

## Tasks without delegates

In some cases, you might want to use a `System.Threading.Tasks.Task` to encapsulate some asynchronous operation that's performed by an external component instead of your user delegate. If the operation is based on the Asynchronous Programming Model Begin/End pattern, you can use the `System.Threading.Tasks.TaskFactory.FromAsync*` methods. If that's not the case, you can use the `System.Threading.Tasks.TaskCompletionSource`1` object to wrap the operation in a task and thereby gain some of the benefits of `System.Threading.Tasks.Task` programmability. For example, support for exception propagation and continuations. For more information, see `System.Threading.Tasks.TaskCompletionSource`1`.

## Custom schedulers

Most application or library developers don't care which processor the task runs on, how it synchronizes its work with other tasks, or how it's scheduled on the `System.Threading.ThreadPool`. They only require that it execute as efficiently as possible on the host computer. If you require more fine-grained control over the scheduling details, the TPL lets you configure some settings on the default task scheduler, and even lets you supply a custom scheduler. For more information, see `System.Threading.Tasks.TaskScheduler`.

## Related data structures

The TPL has several new public types that are useful in parallel and sequential scenarios. These include several thread-safe, fast, and scalable collection classes in the `System.Collections.Concurrent` namespace and several new synchronization types. For example, `System.Threading.Semaphore` and `System.Threading.ManualResetEventSlim`, which are more efficient than their predecessors for specific kinds of workloads. Other new types in the .NET Framework 4, for example, `System.Threading.Barrier` and `System.Threading.SpinLock`, provide functionality that wasn't available in earlier releases. For more information, see Data Structures for Parallel Programming.

## Custom task types

We recommend that you don't inherit from `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1`. Instead, we recommend that you use the `System.Threading.Tasks.Task.AsyncState` property to associate additional data or state with a `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` object. You can also use extension methods to extend the functionality of the `System.Threading.Tasks.Task` and `System.Threading.Tasks.Task`1` classes. For more information about extension methods, see Extension Methods and Extension Methods.

If you must inherit from `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1`, you can't use `System.Threading.Tasks.Task.Run*` or the `System.Threading.Tasks.TaskFactory`, `System.Threading.Tasks.TaskFactory`1`, or `System.Threading.Tasks.TaskCompletionSource`1` classes to create instances of your custom task type. You can't use them because these classes create only `System.Threading.Tasks.Task` and `System.Threading.Tasks.Task`1` objects. In addition, you can't use the task continuation mechanisms that are provided by `System.Threading.Tasks.Task`, `System.Threading.Tasks.Task`1`, `System.Threading.Tasks.TaskFactory`, and `System.Threading.Tasks.TaskFactory`1` to create instances of your custom task type. You can't use them because these classes also create only `System.Threading.Tasks.Task` and `System.Threading.Tasks.Task`1` objects.

## Related sections

|Title|Description|
|-|-|
|Chaining Tasks by Using Continuation Tasks|Describes how continuations work.|
|Attached and Detached Child Tasks|Describes the difference between attached and detached child tasks.|
|Task Cancellation|Describes the cancellation support that's built into the `System.Threading.Tasks.Task` object.|
|Exception Handling|Describes how exceptions on concurrent threads are handled.|
|How to: Use Parallel.Invoke to Execute Parallel Operations|Describes how to use `System.Threading.Tasks.Parallel.Invoke*`.|
|How to: Return a Value from a Task|Describes how to return values from tasks.|
|How to: Cancel a Task and Its Children|Describes how to cancel tasks.|
|How to: Create Pre-Computed Tasks|Describes how to use the `System.Threading.Tasks.Task.FromResult*` method to retrieve the results of asynchronous download operations that are held in a cache.|
|How to: Traverse a Binary Tree with Parallel Tasks|Describes how to use tasks to traverse a binary tree.|
|How to: Unwrap a Nested Task|Demonstrates how to use the `System.Threading.Tasks.TaskExtensions.Unwrap*` extension method.|
|Data Parallelism|Describes how to use `System.Threading.Tasks.Parallel.For*` and `System.Threading.Tasks.Parallel.ForEach*` to create parallel loops over data.|
|Parallel Programming|Top-level node for .NET Framework parallel programming.|

## See also

- Parallel Programming
- Samples for Parallel Programming with the .NET Core & .NET Standard
