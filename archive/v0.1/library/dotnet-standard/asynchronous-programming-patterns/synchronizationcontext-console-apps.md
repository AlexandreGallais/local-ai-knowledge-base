---
title: "SynchronizationContext and console apps"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/synchronizationcontext-console-apps.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# SynchronizationContext and console apps

UI frameworks like Windows Forms, WPF, and .NET MAUI install a `System.Threading.SynchronizationContext` on their UI thread. When you `await` a task in those environments, the continuation automatically posts back to the UI thread. Console apps don't install a `System.Threading.SynchronizationContext`, which means `await` continuations run on the thread pool. This article explains the consequences and shows how to build a single-threaded message pump when you need one.

## Default behavior in a console app

In a console app, `System.Threading.SynchronizationContext.Current` returns `null`. When a method yields at an `await`, the continuation runs on whatever thread pool thread is available:

```csharp
static void DefaultBehaviorDemo()
{
    DemoAsync().GetAwaiter().GetResult();
}

static async Task DemoAsync()
{
    var d = new Dictionary<int, int>();
    for (int i = 0; i < 10_000; i++)
    {
        int id = Thread.CurrentThread.ManagedThreadId;
        d[id] = d.TryGetValue(id, out int count) ? count + 1 : 1;

        await Task.Yield();
    }

    foreach (var pair in d)
        Console.WriteLine(pair);
}
```
Representative output from running this program:

```output
[1, 1]
[3, 2687]
[4, 2399]
[5, 2397]
[6, 2516]
```

Thread 1 (the main thread) appears only once, during the first synchronous iteration before `await Task.Yield()` suspends the method. All subsequent iterations run on thread pool threads.

## Modern async entry points

Starting with C# 7.1, you can declare `Main` as `async Task` or `async Task<int>`. In C# 9 and later, you can use top-level statements with `await` directly:

```csharp
// Top-level statements (C# 9+)
await DemoAsync();
```

```csharp
// async Task Main (C# 7.1+)
static async Task Main()
{
    await DemoAsync();
}
```

These entry points don't install a `System.Threading.SynchronizationContext`. The runtime generates a bootstrap that calls your async method and blocks on the returned `System.Threading.Tasks.Task`, similar to calling `.GetAwaiter().GetResult()`. Continuations still run on the thread pool.

## When you need thread affinity

For many console apps, running continuations on the thread pool is fine. However, some scenarios require that all continuations run on a single thread:

- **Serialized execution**: Multiple concurrent async operations share state without locks by running their continuations on the same thread.
- **Library requirements**: Some libraries or COM objects require affinity to a particular thread.
- **Unit testing**: Test frameworks might need deterministic, single-threaded execution of async code.

## Build a single-threaded SynchronizationContext

To run all continuations on one thread, you need two things:

1. A `System.Threading.SynchronizationContext` whose `System.Threading.SynchronizationContext.Post*` method queues work to a thread-safe collection.
1. A message pump loop that processes that queue on the target thread.

### The custom context

The context uses a `System.Collections.Concurrent.BlockingCollection`1` to coordinate producers (the async continuations) and a consumer (the pumping loop):

```csharp
sealed class SingleThreadSynchronizationContext : SynchronizationContext
{
    private readonly
        BlockingCollection<KeyValuePair<SendOrPostCallback, object?>> _queue = new();

    public override void Post(SendOrPostCallback d, object? state)
    {
        _queue.Add(new KeyValuePair<SendOrPostCallback, object?>(d, state));
    }

    public void RunOnCurrentThread()
    {
        while (_queue.TryTake(out KeyValuePair<SendOrPostCallback, object?> workItem,
            Timeout.Infinite))
        {
            workItem.Key(workItem.Value);
        }
    }

    public void Complete() => _queue.CompleteAdding();
}
```
```vb
Class SingleThreadSynchronizationContext
    Inherits SynchronizationContext

    Private ReadOnly _queue As New _
        BlockingCollection(Of KeyValuePair(Of SendOrPostCallback, Object))()

    Public Overrides Sub Post(d As SendOrPostCallback, state As Object)
        _queue.Add(New KeyValuePair(Of SendOrPostCallback, Object)(d, state))
    End Sub

    Public Sub RunOnCurrentThread()
        Dim workItem As New KeyValuePair(Of SendOrPostCallback, Object)(Nothing, Nothing)
        While _queue.TryTake(workItem, Timeout.Infinite)
            workItem.Key.Invoke(workItem.Value)
        End While
    End Sub

    Public Sub Complete()
        _queue.CompleteAdding()
    End Sub
End Class
```
### The AsyncPump.Run method

`AsyncPump.Run` installs the custom context, invokes the async method, and pumps continuations on the calling thread until the method completes:

```csharp
static class AsyncPump
{
    public static void Run(Func<Task> func)
    {
        SynchronizationContext? prevCtx = SynchronizationContext.Current;
        try
        {
            var syncCtx = new SingleThreadSynchronizationContext();
            SynchronizationContext.SetSynchronizationContext(syncCtx);

            Task t;
            try
            {
                t = func();
            }
            catch
            {
                syncCtx.Complete();
                throw;
            }

            t.ContinueWith(
                _ => syncCtx.Complete(), TaskScheduler.Default);

            syncCtx.RunOnCurrentThread();

            t.GetAwaiter().GetResult();
        }
        finally
        {
            SynchronizationContext.SetSynchronizationContext(prevCtx);
        }
    }
```
```vb
Class AsyncPump
    Public Shared Sub Run(func As Func(Of Task))
        Dim prevCtx As SynchronizationContext = SynchronizationContext.Current
        Try
            Dim syncCtx As New SingleThreadSynchronizationContext()
            SynchronizationContext.SetSynchronizationContext(syncCtx)

            Dim t As Task
            Try
                t = func()
            Catch
                syncCtx.Complete()
                Throw
            End Try

            t.ContinueWith(
                Sub(unused) syncCtx.Complete(), TaskScheduler.Default)

            syncCtx.RunOnCurrentThread()

            t.GetAwaiter().GetResult()
        Finally
            SynchronizationContext.SetSynchronizationContext(prevCtx)
        End Try
    End Sub
```
### See it in action

Replace the default call with `AsyncPump.Run`:

```csharp
static void AsyncPumpDemo()
{
    AsyncPump.Run(async () =>
    {
        var d = new Dictionary<int, int>();
        for (int i = 0; i < 10_000; i++)
        {
            int id = Thread.CurrentThread.ManagedThreadId;
            d[id] = d.TryGetValue(id, out int count) ? count + 1 : 1;

            await Task.Yield();
        }

        foreach (var pair in d)
            Console.WriteLine(pair);
    });
}
```
```vb
Sub AsyncPumpDemo()
    AsyncPump.Run(
        Async Function() As Task
            Dim d As New Dictionary(Of Integer, Integer)()
            For i As Integer = 0 To 9999
                Dim id As Integer = Thread.CurrentThread.ManagedThreadId
                Dim count As Integer
                If d.TryGetValue(id, count) Then
                    d(id) = count + 1
                Else
                    d(id) = 1
                End If

                Await Task.Yield()
            Next

            For Each pair In d
                Console.WriteLine(pair)
            Next
        End Function)
End Sub
```
Output:

```output
[1, 10000]
```

The specific thread ID might differ depending on the runtime and platform, but the key <example-value> is that all 10,000 iterations run on a single thread: the main thread.

## Handle async void methods

The `Func<Task>` overload tracks completion through the returned `System.Threading.Tasks.Task`. Async `void` methods don't return a task; instead, they notify the current `System.Threading.SynchronizationContext` through `System.Threading.SynchronizationContext.OperationStarted` and `System.Threading.SynchronizationContext.OperationCompleted`. To support async `void` methods, extend the context to track outstanding operations:

```csharp
    public static void Run(Action asyncMethod)
    {
        SynchronizationContext? prevCtx = SynchronizationContext.Current;
        try
        {
            var syncCtx = new AsyncVoidSynchronizationContext();
            SynchronizationContext.SetSynchronizationContext(syncCtx);

            Exception? caughtException = null;

            syncCtx.OperationStarted();
            try
            {
                asyncMethod();
            }
            catch (Exception ex)
            {
                caughtException = ex;
                syncCtx.Complete();
            }
            finally
            {
                syncCtx.OperationCompleted();
            }

            syncCtx.RunOnCurrentThread();

            if (caughtException is not null)
            {
                System.Runtime.ExceptionServices.ExceptionDispatchInfo.Capture(caughtException).Throw();
            }
        }
        finally
        {
            SynchronizationContext.SetSynchronizationContext(prevCtx);
        }
    }
}

sealed class AsyncVoidSynchronizationContext : SynchronizationContext
{
    private readonly
        BlockingCollection<KeyValuePair<SendOrPostCallback, object?>> _queue = new();
    private int _operationCount;

    public override void Post(SendOrPostCallback d, object? state)
    {
        _queue.Add(new KeyValuePair<SendOrPostCallback, object?>(d, state));
    }

    public override void OperationStarted() =>
        Interlocked.Increment(ref _operationCount);

    public override void OperationCompleted()
    {
        if (Interlocked.Decrement(ref _operationCount) == 0)
            Complete();
    }

    public void RunOnCurrentThread()
    {
        while (_queue.TryTake(out KeyValuePair<SendOrPostCallback, object?> workItem,
            Timeout.Infinite))
        {
            workItem.Key(workItem.Value);
        }
    }

    public void Complete() => _queue.CompleteAdding();
}
```
```vb
    Public Shared Sub Run(asyncMethod As Action)
        Dim prevCtx As SynchronizationContext = SynchronizationContext.Current
        Try
            Dim syncCtx As New AsyncVoidSynchronizationContext()
            SynchronizationContext.SetSynchronizationContext(syncCtx)

            syncCtx.OperationStarted()
            Try
                asyncMethod()
            Catch
                syncCtx.Complete()
                Throw
            Finally
                syncCtx.OperationCompleted()
            End Try

            syncCtx.RunOnCurrentThread()
        Finally
            SynchronizationContext.SetSynchronizationContext(prevCtx)
        End Try
    End Sub
End Class

Class AsyncVoidSynchronizationContext
    Inherits SynchronizationContext

    Private ReadOnly _queue As New _
        BlockingCollection(Of KeyValuePair(Of SendOrPostCallback, Object))()
    Private _operationCount As Integer

    Public Overrides Sub Post(d As SendOrPostCallback, state As Object)
        _queue.Add(New KeyValuePair(Of SendOrPostCallback, Object)(d, state))
    End Sub

    Public Overrides Sub OperationStarted()
        Interlocked.Increment(_operationCount)
    End Sub

    Public Overrides Sub OperationCompleted()
        If Interlocked.Decrement(_operationCount) = 0 Then
            Complete()
        End If
    End Sub

    Public Sub RunOnCurrentThread()
        Dim workItem As New KeyValuePair(Of SendOrPostCallback, Object)(Nothing, Nothing)
        While _queue.TryTake(workItem, Timeout.Infinite)
            workItem.Key.Invoke(workItem.Value)
        End While
    End Sub

    Public Sub Complete()
        _queue.CompleteAdding()
    End Sub
End Class
```
With operation tracking enabled, the pump exits only when all outstanding async `void` methods complete, not just the top-level task.

## Practical considerations

- **Deadlock risk**: If code running inside `AsyncPump.Run` blocks synchronously (for example, by calling `.Result` or `.Wait()` on a task whose continuation must post back to the pump), the pump thread can't process that continuation. The result is a deadlock. The same problem is described in Synchronous wrappers for asynchronous methods.
- **Performance**: A single-threaded pump limits throughput to one thread. Use this approach only when thread affinity matters.
- **Cross-platform**: The `AsyncPump` implementation shown here uses only types from the `System.Collections.Concurrent` and `System.Threading` namespaces. It works on all platforms that .NET supports.

## See also

- ExecutionContext and SynchronizationContext
- Task-based asynchronous pattern (TAP)
- Consume the task-based asynchronous pattern
