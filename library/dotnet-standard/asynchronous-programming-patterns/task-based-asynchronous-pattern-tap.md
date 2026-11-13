---
title: "Task-based Asynchronous Pattern (TAP): Introduction and overview (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Task-based asynchronous pattern (TAP) in .NET: Introduction and overview

In .NET, the task-based asynchronous pattern is the recommended asynchronous design pattern for new development. It's based on the `System.Threading.Tasks.Task` and `System.Threading.Tasks.Task`1` types in the `System.Threading.Tasks` namespace, which represent asynchronous operations.

## Naming, parameters, and return types

TAP uses a single method to represent the initiation and completion of an asynchronous operation. This approach contrasts with both the Asynchronous Programming Model (APM or `IAsyncResult`) pattern and the Event-based Asynchronous Pattern (EAP). APM requires `Begin` and `End` methods. EAP requires a method that has the `Async` suffix and also requires one or more events, event handler delegate types, and `EventArg`-derived types. Asynchronous methods in TAP include the `Async` suffix after the operation name for methods that return awaitable types, such as `System.Threading.Tasks.Task`, `System.Threading.Tasks.Task`1`, `System.Threading.Tasks.ValueTask`, and `System.Threading.Tasks.ValueTask`1`. For example, an asynchronous `Get` operation that returns a `Task<String>` can be named `GetAsync`. If you're adding a TAP method to a class that already contains an EAP method name with the `Async` suffix, use the suffix `TaskAsync` instead. For example, if the class already has a `GetAsync` method, use the name `GetTaskAsync`. If a method starts an asynchronous operation but doesn't return an awaitable type, its name should start with `Begin`, `Start`, or some other verb to suggest that this method doesn't return or throw the result of the operation.

A TAP method returns either a `System.Threading.Tasks.Task` or a `System.Threading.Tasks.Task`1`, based on whether the corresponding synchronous method returns void or a type `TResult`.

The parameters of a TAP method should match the parameters of its synchronous counterpart and should be provided in the same order.  However, `out` and `ref` parameters are exempt from this rule and should be avoided entirely. Any data that an `out` or `ref` parameter returns should instead be part of the `TResult` returned by `System.Threading.Tasks.Task`1`, and should use a tuple or a custom data structure to accommodate multiple values. Also, consider adding a `System.Threading.CancellationToken` parameter even if the TAP method's synchronous counterpart doesn't offer one.

Methods that are devoted exclusively to the creation, manipulation, or combination of tasks (where the asynchronous intent of the method is clear in the method name or in the name of the type to which the method belongs) need not follow this naming pattern. Such methods are often referred to as *combinators*. Examples of combinators include `System.Threading.Tasks.Task.WhenAll*` and `System.Threading.Tasks.Task.WhenAny*`, and are discussed in the Using the Built-in Task-based Combinators section of the article Consuming the Task-based Asynchronous Pattern.

For examples of how the TAP syntax differs from the syntax used in legacy asynchronous programming patterns such as the Asynchronous Programming Model (APM) and the Event-based Asynchronous Pattern (EAP), see Asynchronous Programming Patterns.

### Async behavior, return types, and naming

The `async` keyword doesn't force a method to run asynchronously on another thread. It enables `await`, and the method runs synchronously until it reaches an incomplete awaitable. If the method doesn't reach an incomplete awaitable, it can complete synchronously.

For most APIs, prefer these return types:

- Use `System.Threading.Tasks.Task` for asynchronous operations that don't produce a value.
- Use `System.Threading.Tasks.Task`1` for asynchronous operations that produce a value.
- Use `System.Threading.Tasks.ValueTask` or `System.Threading.Tasks.ValueTask`1` only when measurements show allocation pressure and when consumers can handle the extra usage constraints.

Keep TAP naming predictable:

- Use the `Async` suffix for methods that return awaitable types.
- Don't append `Async` to synchronous methods.
- Add the new `MethodNameAsync` overload alongside the existing `MethodName. Don't remove or rename the synchronous API. Keeping both lets callers migrate at their own pace without a breaking change.

## Initiating an asynchronous operation

An asynchronous method that is based on TAP can do a small amount of work synchronously, such as validating arguments and initiating the asynchronous operation, before it returns the resulting task. Keep synchronous work to a minimum so the asynchronous method can return quickly. Reasons for a quick return include:

- You might invoke asynchronous methods from user interface (UI) threads, and any long-running synchronous work could harm the responsiveness of the application.
- You might launch multiple asynchronous methods concurrently. Therefore, any long-running work in the synchronous portion of an asynchronous method could delay the initiation of other asynchronous operations, thereby decreasing the benefits of concurrency.

In some cases, the amount of work required to complete the operation is less than the amount of work required to launch the operation asynchronously. Reading from a stream where the read operation can be satisfied by data that's already buffered in memory is an example of such a scenario. In such cases, the operation might complete synchronously, and might return a task that is already completed.

## Exceptions

An asynchronous method should throw an exception directly from the asynchronous method call only in response to a usage error. Usage errors should never occur in production code. For example, if passing a null reference (`Nothing` in Visual Basic) as one of the method's arguments causes an error state (usually represented by an `System.ArgumentNullException` exception), you can modify the calling code to ensure that a null reference is never passed. For all other errors, assign exceptions that occur when an asynchronous method is running to the returned task, even if the asynchronous method happens to complete synchronously before the task is returned. Typically, a task contains at most one exception. However, if the task represents multiple operations (for example, `System.Threading.Tasks.Task.WhenAll*`), multiple exceptions might be associated with a single task.

## Target environment

When you implement a TAP method, you can determine where asynchronous execution occurs. You might choose to execute the workload on the thread pool, implement it by using asynchronous I/O (without being bound to a thread for the majority of the operation's execution), run it on a specific thread (such as the UI thread), or use any number of potential contexts. A TAP method might even have nothing to execute, and might just return a `System.Threading.Tasks.Task` that represents the occurrence of a condition elsewhere in the system (for example, a task that represents data arriving at a queued data structure).

The caller of the TAP method can block waiting for the TAP method to complete by synchronously waiting on the resulting task, or can run additional (continuation) code when the asynchronous operation completes. The creator of the continuation code has control over where that code executes. You can create the continuation code either explicitly, through methods on the `System.Threading.Tasks.Task` class (for example, `System.Threading.Tasks.Task.ContinueWith*`), or implicitly, by using language support built on top of continuations (for example, `await` in C#, `Await` in Visual Basic, `AwaitValue` in F#).

## Task status

The `System.Threading.Tasks.Task` class provides a life cycle for asynchronous operations, and that cycle is represented by the `System.Threading.Tasks.TaskStatus` enumeration. To support corner cases of types that derive from `System.Threading.Tasks.Task` and `System.Threading.Tasks.Task`1`,  and to support the separation of construction from scheduling, the `System.Threading.Tasks.Task` class exposes a `System.Threading.Tasks.Task.Start*` method. Tasks that are created by the public `System.Threading.Tasks.Task` constructors are referred to as *cold tasks*, because they begin their life cycle in the non-scheduled `System.Threading.Tasks.TaskStatus.Created` state and are scheduled only when `System.Threading.Tasks.Task.Start*` is called on these instances.

All other tasks begin their life cycle in a hot state, which means that the asynchronous operations they represent are already initiated and their task status is an enumeration value other than `System.Threading.Tasks.TaskStatus.Created`. All tasks that are returned from TAP methods must be activated. **If a TAP method internally uses a task's constructor to instantiate the task to be returned, the TAP method must call `System.Threading.Tasks.Task.Start*` on the `System.Threading.Tasks.Task` object before returning it.** Consumers of a TAP method can safely assume that the returned task is active and shouldn't try to call `System.Threading.Tasks.Task.Start*` on any `System.Threading.Tasks.Task` that is returned from a TAP method. Calling `System.Threading.Tasks.Task.Start*` on an active task results in an `System.InvalidOperationException` exception.

For guidance on fire-and-forget lifetime and ownership concerns after task activation, see Keeping async methods alive.

## Cancellation (optional)

In TAP, cancellation is optional for both asynchronous method implementers and asynchronous method consumers. If an operation allows cancellation, it exposes an overload of the asynchronous method that accepts a cancellation token (`System.Threading.CancellationToken` instance). By convention, the parameter is named `cancellationToken`.

```csharp
public static Task ReadAsync(byte[] buffer, int offset, int count,
                             CancellationToken cancellationToken)
```
```vb
Public Function ReadAsync(buffer As Byte(), offset As Integer, count As Integer,
                          cancellationToken As CancellationToken) As Task
```
The asynchronous operation monitors this token for cancellation requests. If it receives a cancellation request, it might choose to honor that request and cancel the operation. If the cancellation request results in work ending prematurely, the TAP method returns a task that ends in the `System.Threading.Tasks.TaskStatus.Canceled` state; there's no available result and no exception is thrown.  The `System.Threading.Tasks.TaskStatus.Canceled` state is considered to be a final (completed) state for a task, along with the `System.Threading.Tasks.TaskStatus.Faulted` and `System.Threading.Tasks.TaskStatus.RanToCompletion` states. Therefore, if a task is in the `System.Threading.Tasks.TaskStatus.Canceled` state, its `System.Threading.Tasks.Task.IsCompleted` property returns `true`. When a task completes in the `System.Threading.Tasks.TaskStatus.Canceled` state, any continuations registered with the task are scheduled or executed, unless a continuation option such as `System.Threading.Tasks.TaskContinuationOptions.NotOnCanceled` was specified to opt out of continuation. Any code that is asynchronously waiting for a canceled task through use of language features continues to run but receives an `System.OperationCanceledException` or an exception derived from it. Code that is blocked synchronously waiting on the task through methods such as `System.Threading.Tasks.Task.Wait*` and `System.Threading.Tasks.Task.WaitAll*` also continue to run with an exception.

If a cancellation token requests cancellation before the TAP method that accepts that token is called, the TAP method should return a `System.Threading.Tasks.TaskStatus.Canceled` task.  However, if cancellation is requested while the asynchronous operation is running, the asynchronous operation need not accept the cancellation request.  The returned task should end in the `System.Threading.Tasks.TaskStatus.Canceled` state only if the operation ends as a result of the cancellation request. If cancellation is requested but a result or an exception is still produced, the task should end in the `System.Threading.Tasks.TaskStatus.RanToCompletion` or `System.Threading.Tasks.TaskStatus.Faulted` state.

For asynchronous methods that want to expose the ability to be canceled first and foremost, you don't have to provide an overload that doesn't accept a cancellation token. For methods that can't be canceled, don't provide overloads that accept a cancellation token; this helps indicate to the caller whether the target method is actually cancelable.  Consumer code that doesn't desire cancellation can call a method that accepts a `System.Threading.CancellationToken` and provide `System.Threading.CancellationToken.None*` as the argument value. `System.Threading.CancellationToken.None*` is functionally equivalent to the default `System.Threading.CancellationToken`.
