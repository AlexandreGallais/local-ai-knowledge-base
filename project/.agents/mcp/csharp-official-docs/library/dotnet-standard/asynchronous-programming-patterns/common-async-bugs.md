---
title: "Common async/await bugs"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/common-async-bugs.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Common async/await bugs

Async/await simplifies asynchronous programming, but certain mistakes appear repeatedly. This article describes the five most common bugs in async code and shows you how to fix each one.

## Async method runs synchronously

Adding the `async` keyword to a method doesn't make the method run on a background thread. It tells the compiler to allow `await` inside the method body and to wrap the return value in a `System.Threading.Tasks.Task`. When you invoke an async method, it runs synchronously until it reaches the first `await` on an incomplete awaitable. If the method contains no `await` expressions, or if every awaitable it awaits is already complete, the method completes entirely on the calling thread:

```csharp
public static class SyncExecutionExample
{
    public static Task<int> ComputeAsync()
    {
        // No await in this method — it runs entirely synchronously.
        return Task.FromResult(42);
    }
}
```
```vb
Public Module SyncExecutionExample
    Public Function ComputeAsync() As Task(Of Integer)
        ' No Await in this method — it runs entirely synchronously.
        Return Task.FromResult(42)
    End Function
End Module
```
Here the method returns a completed task immediately because it never yields. The compiler emits a warning when an async method lacks `await` expressions.

If your goal is to offload CPU-bound work to a thread pool thread, use `System.Threading.Tasks.Task.Run*` instead of `async`:

```csharp
public static class OffloadExample
{
    public static int ComputeIntensive()
    {
        int sum = 0;
        for (int i = 0; i < 1_000; i++)
            sum += i;
        return sum;
    }

    public static Task<int> ComputeOnThreadPoolAsync()
    {
        return Task.Run(() => ComputeIntensive());
    }
}
```
```vb
Public Module OffloadExample
    Public Function ComputeIntensive() As Integer
        Dim sum As Integer = 0
        For i As Integer = 0 To 999
            sum += i
        Next
        Return sum
    End Function

    Public Function ComputeOnThreadPoolAsync() As Task(Of Integer)
        Return Task.Run(Function() ComputeIntensive())
    End Function
End Module
```
For more guidance on when to use `Task.Run`, see Asynchronous wrappers for synchronous methods.

## Can't await an async void method

When you convert a synchronous `void`-returning method to async, change the return type to `System.Threading.Tasks.Task`. If you leave the return type as `void`, the method becomes "async void," which you can't await:

```csharp
public static class AsyncVoidExample
{
    // BAD: async void — can't be awaited.
    public static async void DoWorkBadAsync()
    {
        await Task.Delay(100);
    }

    // GOOD: async Task — callers can await this.
    public static async Task DoWorkGoodAsync()
    {
        await Task.Delay(100);
    }
}
```
```vb
Public Module AsyncVoidExample
    ' BAD: Async Sub — can't be awaited.
    Public Async Sub DoWorkBadAsync()
        Await Task.Delay(100)
    End Sub

    ' GOOD: Async Function returning Task — callers can await this.
    Public Async Function DoWorkGoodAsync() As Task
        Await Task.Delay(100)
    End Function
End Module
```
Async void methods serve a specific purpose: top-level event handlers in UI frameworks. Outside of event handlers, always return `Task` or `Task<T>` from async methods. Async void methods have these drawbacks:

- **Exceptions go unobserved.** Exceptions thrown in an async void method propagate to the `System.Threading.SynchronizationContext` that was active when the method started. The caller can't catch these exceptions.
- **Callers can't track completion.** Without a `Task`, there's no mechanism to know when the operation finishes.
- **Testing is difficult.** You can't await the method in a test to verify its behavior.

## Deadlocks from blocking on async code

This bug is the most common cause of async code that "never completes." It happens when you synchronously block (call `System.Threading.Tasks.Task.Wait*`, `System.Threading.Tasks.Task`1.Result`, or `System.Threading.Tasks.Task.GetAwaiter*`.`System.Runtime.CompilerServices.TaskAwaiter.GetResult*`) on a thread that has a single-threaded `System.Threading.SynchronizationContext`.

The sequence that causes a deadlock:

1. Code on the UI thread (or an ASP.NET request thread in older ASP.NET) calls an async method and blocks on the returned task.
1. The async method awaits an incomplete task without using `ConfigureAwait(false)`.
1. When the awaited task completes, the continuation tries to post back to the original `SynchronizationContext`.
1. That context's thread is blocked waiting for the task to complete—deadlock.

```csharp
public static class DeadlockExample
{
    public static async Task<string> GetDataAsync()
    {
        // Without ConfigureAwait(false), this continuation
        // posts back to the original SynchronizationContext.
        await Task.Delay(100);
        return "data";
    }

    public static void CallerThatDeadlocks()
    {
        // On a single-threaded SynchronizationContext (e.g. UI thread),
        // the following line deadlocks because the continuation needs
        // the same thread that .Result is blocking.
        string result = GetDataAsync().Result;
    }
}
```
```vb
Public Module DeadlockExample
    Public Async Function GetDataAsync() As Task(Of String)
        ' Without ConfigureAwait(False), this continuation
        ' posts back to the original SynchronizationContext.
        Await Task.Delay(100)
        Return "data"
    End Function

    Public Sub CallerThatDeadlocks()
        ' On a single-threaded SynchronizationContext (e.g. UI thread),
        ' the following line deadlocks because the continuation needs
        ' the same thread that .Result is blocking.
        Dim result As String = GetDataAsync().Result
    End Sub
End Module
```
### How to avoid deadlocks

Use one or more of these strategies:

- **Don't block.** Use `await` instead of `.Result` or `.Wait()`:

```csharp
public static class DeadlockFix1
{
    public static async Task CallerFixedAsync()
    {
        // Use await instead of .Result
        string result = await DeadlockExample.GetDataAsync();
        Console.WriteLine(result);
    }
}
```
```vb
Public Module DeadlockFix1
    Public Async Function CallerFixedAsync() As Task
        ' Use Await instead of .Result
        Dim result As String = Await DeadlockExample.GetDataAsync()
        Console.WriteLine(result)
    End Function
End Module
```
- **Use `ConfigureAwait(false)` in library code.** When your library method doesn't need to resume on the caller's context, specify `ConfigureAwait(false)` on every `await`:

```csharp
public static class DeadlockFix2
{
    public static async Task<string> GetDataSafeAsync()
    {
        await Task.Delay(100).ConfigureAwait(false);
        return "data";
    }
}
```
```vb
Public Module DeadlockFix2
    Public Async Function GetDataSafeAsync() As Task(Of String)
        Await Task.Delay(100).ConfigureAwait(False)
        Return "data"
    End Function
End Module
```
  Using `ConfigureAwait(false)` tells the runtime not to marshal the continuation back to the original `SynchronizationContext`. This approach protects callers who block, and it improves performance by avoiding unnecessary thread hops.

> **Warning:**
> **Static constructor deadlocks.** The CLR holds a lock while running static constructors (`cctor`s). If a static constructor blocks on a task, and that task's continuation needs to run code in the same type (or a type involved in the construction chain), the continuation can't proceed because the `cctor` lock is held. Avoid blocking calls inside static constructors entirely.

## Task\<Task> unwrapping

When you pass an async lambda to a method like `System.Threading.Tasks.TaskFactory.StartNew*`, the returned object is a `Task<Task>` (or `Task<Task<TResult>>`), not a simple `Task`. The outer task completes as soon as the async lambda hits its first yielding `await`. It doesn't wait for the inner task to finish:

```csharp
public static class TaskTaskBugExample
{
    public static async Task DemoAsync()
    {
        var sw = Stopwatch.StartNew();
        // StartNew returns Task<Task>, not Task.
        // The outer task completes immediately when the lambda yields.
        await Task.Factory.StartNew(async () =>
        {
            await Task.Delay(1000);
        });
        // Elapsed shows ~0 seconds, not ~1 second.
        Console.WriteLine($"Elapsed: {sw.Elapsed.TotalSeconds:F2}s");
    }
}
```
```vb
Public Module TaskTaskBugExample
    Public Async Function DemoAsync() As Task
        Dim sw = Stopwatch.StartNew()
        ' StartNew returns Task(Of Task), not Task.
        ' The outer task completes immediately when the lambda yields.
        Await Task.Factory.StartNew(Async Function()
                                        Await Task.Delay(1000)
                                    End Function)
        ' Elapsed shows ~0 seconds, not ~1 second.
        Console.WriteLine($"Elapsed: {sw.Elapsed.TotalSeconds:F2}s")
    End Function
End Module
```
Fix this problem in one of three ways:

- **Use `System.Threading.Tasks.Task.Run*` instead.** `Task.Run` automatically unwraps `Task<Task>`:

```csharp
public static class TaskTaskFix1
{
    public static async Task DemoAsync()
    {
        var sw = Stopwatch.StartNew();
        await Task.Run(async () =>
        {
            await Task.Delay(1000);
        });
        Console.WriteLine($"Elapsed: {sw.Elapsed.TotalSeconds:F2}s");
    }
}
```
```vb
Public Module TaskTaskFix1
    Public Async Function DemoAsync() As Task
        Dim sw = Stopwatch.StartNew()
        Await Task.Run(Async Function()
                           Await Task.Delay(1000)
                       End Function)
        Console.WriteLine($"Elapsed: {sw.Elapsed.TotalSeconds:F2}s")
    End Function
End Module
```
- **Call `System.Threading.Tasks.TaskExtensions.Unwrap*` on the result:**

```csharp
public static class TaskTaskFix2
{
    public static async Task DemoAsync()
    {
        var sw = Stopwatch.StartNew();
        await Task.Factory.StartNew(async () =>
        {
            await Task.Delay(1000);
        }).Unwrap();
        Console.WriteLine($"Elapsed: {sw.Elapsed.TotalSeconds:F2}s");
    }
}
```
```vb
Public Module TaskTaskFix2
    Public Async Function DemoAsync() As Task
        Dim sw = Stopwatch.StartNew()
        Await Task.Factory.StartNew(Async Function()
                                        Await Task.Delay(1000)
                                    End Function).Unwrap()
        Console.WriteLine($"Elapsed: {sw.Elapsed.TotalSeconds:F2}s")
    End Function
End Module
```
- **Await twice** (first the outer task, then the inner):

```csharp
public static class TaskTaskFix3
{
    public static async Task DemoAsync()
    {
        var sw = Stopwatch.StartNew();
        Task<Task> outerTask = Task.Factory.StartNew(async () =>
        {
            await Task.Delay(1000);
        });
        Task innerTask = await outerTask;
        await innerTask;
        Console.WriteLine($"Elapsed: {sw.Elapsed.TotalSeconds:F2}s");
    }
}
```
```vb
Public Module TaskTaskFix3
    Public Async Function DemoAsync() As Task
        Dim sw = Stopwatch.StartNew()
        Dim outerTask As Task(Of Task) = Task.Factory.StartNew(Async Function()
                                                                   Await Task.Delay(1000)
                                                               End Function)
        Dim innerTask As Task = Await outerTask
        Await innerTask
        Console.WriteLine($"Elapsed: {sw.Elapsed.TotalSeconds:F2}s")
    End Function
End Module
```
## Missing await on a task-returning call

If you call a task-returning method in an `async` method without awaiting it, the method starts the asynchronous operation but doesn't wait for it to complete. The compiler warns you about this case with `CS4014` in C# and `BC42358` in Visual Basic:

```csharp
public static class MissingAwaitExample
{
    // BAD: Task.Delay is started but never awaited.
    public static async Task PauseOneSecondBuggyAsync()
    {
        Task.Delay(1000); // CS4014 warning
    }

    // GOOD: await the task.
    public static async Task PauseOneSecondAsync()
    {
        await Task.Delay(1000);
    }
}
```
```vb
Public Module MissingAwaitExample
    ' BAD: Task.Delay is started but never awaited.
    Public Async Function PauseOneSecondBuggyAsync() As Task
        Task.Delay(1000) ' Warning BC42358
    End Function

    ' GOOD: Await the task.
    Public Async Function PauseOneSecondAsync() As Task
        Await Task.Delay(1000)
    End Function
End Module
```
Storing the result in a variable suppresses the warning but doesn't fix the underlying bug. Always `await` the task unless you intentionally want fire-and-forget behavior.

## See also

- Task-based asynchronous pattern (TAP)
- Async lambda pitfalls
- Keeping async methods alive
- Asynchronous wrappers for synchronous methods
- Synchronous wrappers for asynchronous methods
