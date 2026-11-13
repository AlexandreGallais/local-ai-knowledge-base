---
title: "Build async coordination primitives (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/async-coordination-primitives.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Build async coordination primitives

Synchronous coordination primitives like `System.Threading.ManualResetEventSlim`, `System.Threading.CountdownEvent`, and `System.Threading.Barrier` block the calling thread while waiting. In async code, blocking a thread wastes a resource that could be doing other work. Use `System.Threading.Tasks.TaskCompletionSource` to build async equivalents that let callers `await` instead of blocking.

A `TaskCompletionSource` produces a `System.Threading.Tasks.Task` that you complete manually by calling `System.Threading.Tasks.TaskCompletionSource.SetResult`, `System.Threading.Tasks.TaskCompletionSource.SetException*`, or `System.Threading.Tasks.TaskCompletionSource.SetCanceled*`. Code that awaits that task suspends without blocking a thread and resumes when you complete the source. This pattern forms the building block for every primitive in this article.

> **Note:**
> The primitives in this article are educational implementations. For production throttling and mutual exclusion, use the built-in types covered in Async semaphores, locks, and reader/writer coordination. Always complete every `TaskCompletionSource` you create; see Complete your tasks for guidance.

## Async manual-reset event

A manual-reset event starts in a non-signaled state. Callers wait for the event, and all waiters resume when another party signals (sets) the event. The event stays signaled until you explicitly reset it. The synchronous equivalent is `System.Threading.ManualResetEventSlim`. The .NET runtime provides `System.Threading.Tasks.TaskCompletionSource`1` directly for one-shot broadcast signaling. Create a new instance each cycle rather than building a reset wrapper around it.

`TaskCompletionSource` is itself a one-shot manual-reset event: its `Task` is incomplete until you call a `Set*` method, and then all awaiters resume. Add a `Reset` method that swaps in a new `TaskCompletionSource`, and you have a reusable async manual-reset event.

```csharp
// Educational only — use TaskCompletionSource<T> directly instead of this sample implementation; create a new instance each cycle.
public class AsyncManualResetEvent
{
    private volatile TaskCompletionSource _tcs = new(TaskCreationOptions.RunContinuationsAsynchronously);

    public Task WaitAsync() => _tcs.Task;

    public void Set() => _tcs.TrySetResult();

    public void Reset()
    {
        while (true)
        {
            TaskCompletionSource tcs = _tcs;
            if (!tcs.Task.IsCompleted ||
                Interlocked.CompareExchange(
                    ref _tcs,
                    new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously),
                    tcs) == tcs)
            {
                return;
            }
        }
    }
}
```
```vb
' Educational only — use TaskCompletionSource(Of T) directly instead of this sample implementation; create a new instance each cycle.
Public Class AsyncManualResetEvent
    Private _tcs As TaskCompletionSource = New TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously)

    Public Function WaitAsync() As Task
        Return _tcs.Task
    End Function

    Public Sub [Set]()
        _tcs.TrySetResult()
    End Sub

    Public Sub Reset()
        Do
            Dim tcs As TaskCompletionSource = _tcs
            If Not tcs.Task.IsCompleted OrElse
               Interlocked.CompareExchange(
                   _tcs,
                   New TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously),
                   tcs) Is tcs Then
                Return
            End If
        Loop
    End Sub
End Class
```
Key implementation details:

- The constructor passes `System.Threading.Tasks.TaskCreationOptions.RunContinuationsAsynchronously` to prevent `Set` from running waiter continuations synchronously on the calling thread. Without this flag, `Set` could block for an unpredictable amount of time.
- `Reset` uses `System.Threading.Interlocked.CompareExchange*` to swap in a new `TaskCompletionSource` only when the current one is already completed. This atomic swap prevents orphaning a task that a waiter already received.

The following example shows how two tasks coordinate through the event:

```csharp
public static class AsyncManualResetEventDemo
{
    public static async Task RunAsync()
    {
        var gate = new AsyncManualResetEvent();

        Task waiter = Task.Run(async () =>
        {
            Console.WriteLine("Waiter: waiting for signal...");
            await gate.WaitAsync();
            Console.WriteLine("Waiter: signal received!");
        });

        await Task.Delay(100);
        Console.WriteLine("Signaler: setting the event.");
        gate.Set();

        await waiter;
    }
}
```
```vb
Public Module AsyncManualResetEventDemo
    Public Async Function RunAsync() As Task
        Dim gate As New AsyncManualResetEvent()

        Dim waiter As Task = Task.Run(Async Function()
            Console.WriteLine("Waiter: waiting for signal...")
            Await gate.WaitAsync()
            Console.WriteLine("Waiter: signal received!")
        End Function)

        Await Task.Delay(100)
        Console.WriteLine("Signaler: setting the event.")
        gate.Set()

        Await waiter
    End Function
End Module
```
## Async auto-reset event

An auto-reset event is similar to a manual-reset event, but it automatically returns to the non-signaled state after releasing exactly one waiter. If multiple callers are waiting when the event is signaled, only one waiter resumes. The synchronous equivalent is `System.Threading.AutoResetEvent`. The .NET runtime includes `System.Threading.SemaphoreSlim` for single-waiter async signaling. Initialize it to `0` with a maximum count of `1` and call `WaitAsync` to wait and `Release` to signal.

Because each signal releases only one waiter, you need a collection of `TaskCompletionSource` instances—one per waiter—so you can complete them individually:

```csharp
// Educational only — use SemaphoreSlim(0, 1) instead of this sample implementation: call WaitAsync() to wait and Release() to signal.
public class AsyncAutoResetEvent
{
    private readonly Queue<TaskCompletionSource> _waiters = new();
    private bool _signaled;

    public Task WaitAsync()
    {
        lock (_waiters)
        {
            if (_signaled)
            {
                _signaled = false;
                return Task.CompletedTask;
            }
            else
            {
                var tcs = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
                _waiters.Enqueue(tcs);
                return tcs.Task;
            }
        }
    }

    public void Set()
    {
        TaskCompletionSource? toRelease = null;

        lock (_waiters)
        {
            if (_waiters.Count > 0)
            {
                toRelease = _waiters.Dequeue();
            }
            else if (!_signaled)
            {
                _signaled = true;
            }
        }

        toRelease?.TrySetResult();
    }
}
```
```vb
' Educational only — use SemaphoreSlim(0, 1) instead of this sample implementation: call WaitAsync() to wait and Release() to signal.
Public Class AsyncAutoResetEvent
    Private ReadOnly _waiters As New Queue(Of TaskCompletionSource)()
    Private _signaled As Boolean

    Public Function WaitAsync() As Task
        SyncLock _waiters
            If _signaled Then
                _signaled = False
                Return Task.CompletedTask
            Else
                Dim tcs As New TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously)
                _waiters.Enqueue(tcs)
                Return tcs.Task
            End If
        End SyncLock
    End Function

    Public Sub [Set]()
        Dim toRelease As TaskCompletionSource = Nothing

        SyncLock _waiters
            If _waiters.Count > 0 Then
                toRelease = _waiters.Dequeue()
            ElseIf Not _signaled Then
                _signaled = True
            End If
        End SyncLock

        toRelease?.TrySetResult()
    End Sub
End Class
```
Key implementation details:

- The `Set` method completes the `TaskCompletionSource` (TCS) *outside* the lock. Completing a TCS inside the lock runs synchronous continuations while the lock is held, which could cause deadlocks or unexpected reentrancy.
- When `Set` is called and no waiter is queued, the signal is stored so the next `WaitAsync` call completes immediately.

The following example shows a producer signaling a consumer through the event:

```csharp
public static class AsyncAutoResetEventDemo
{
    public static async Task RunAsync()
    {
        var autoEvent = new AsyncAutoResetEvent();

        Task consumer = Task.Run(async () =>
        {
            for (int i = 0; i < 3; i++)
            {
                await autoEvent.WaitAsync();
                Console.WriteLine($"Consumer: received signal {i + 1}");
            }
        });

        for (int i = 0; i < 3; i++)
        {
            await Task.Delay(50);
            Console.WriteLine($"Producer: sending signal {i + 1}");
            autoEvent.Set();
        }

        await consumer;
    }
}
```
```vb
Public Module AsyncAutoResetEventDemo
    Public Async Function RunAsync() As Task
        Dim autoEvent As New AsyncAutoResetEvent()

        Dim consumer As Task = Task.Run(Async Function()
            For i As Integer = 0 To 2
                Await autoEvent.WaitAsync()
                Console.WriteLine($"Consumer: received signal {i + 1}")
            Next
        End Function)

        For i As Integer = 0 To 2
            Await Task.Delay(50)
            Console.WriteLine($"Producer: sending signal {i + 1}")
            autoEvent.Set()
        Next

        Await consumer
    End Function
End Module
```
## Async countdown event

A countdown event waits for a specified number of signals before it allows waiters to proceed. This pattern is useful for fork/join scenarios where you start N operations and want to await all N completions. The synchronous equivalent is `System.Threading.CountdownEvent`. The .NET runtime provides `System.Threading.Tasks.Task.WhenAll*` for fork/join coordination with a fixed set of tasks. Use it instead.

Build the async version by composing the `AsyncManualResetEvent` from the previous section with an atomic counter:

```csharp
// Educational only — use Task.WhenAll() instead of this sample implementation to coordinate a fixed set of tasks.
public class AsyncCountdownEvent
{
    private readonly AsyncManualResetEvent _event = new();
    private int _count;

    public AsyncCountdownEvent(int initialCount)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(initialCount, nameof(initialCount));
        _count = initialCount;
    }

    public Task WaitAsync() => _event.WaitAsync();

    public void Signal()
    {
        if (_count <= 0)
            throw new InvalidOperationException("The event is already signaled.");

        int newCount = Interlocked.Decrement(ref _count);

        if (newCount == 0)
            _event.Set();
        else if (newCount < 0)
            throw new InvalidOperationException("Too many signals.");
    }

    public Task SignalAndWait()
    {
        Signal();
        return WaitAsync();
    }
}
```
```vb
' Educational only — use Task.WhenAll() instead of this sample implementation to coordinate a fixed set of tasks.
Public Class AsyncCountdownEvent
    Private ReadOnly _event As New AsyncManualResetEvent()
    Private _count As Integer

    Public Sub New(initialCount As Integer)
        If initialCount <= 0 Then Throw New ArgumentOutOfRangeException(NameOf(initialCount))
        _count = initialCount
    End Sub

    Public Function WaitAsync() As Task
        Return _event.WaitAsync()
    End Function

    Public Sub Signal()
        If _count <= 0 Then
            Throw New InvalidOperationException("The event is already signaled.")
        End If

        Dim newCount As Integer = Interlocked.Decrement(_count)

        If newCount = 0 Then
            _event.Set()
        ElseIf newCount < 0 Then
            Throw New InvalidOperationException("Too many signals.")
        End If
    End Sub

    Public Function SignalAndWait() As Task
        Signal()
        Return WaitAsync()
    End Function
End Class
```
The `Signal` method decrements the count atomically with `System.Threading.Interlocked.Decrement*`. When the count reaches zero, it sets the inner event, and all waiters resume.

The following example uses a countdown event to await three concurrent operations:

```csharp
public static class AsyncCountdownEventDemo
{
    public static async Task RunAsync()
    {
        var countdown = new AsyncCountdownEvent(3);

        for (int i = 1; i <= 3; i++)
        {
            int id = i;
            _ = Task.Run(async () =>
            {
                await Task.Delay(id * 30);
                Console.WriteLine($"Worker {id}: done.");
                countdown.Signal();
            });
        }

        await countdown.WaitAsync();
        Console.WriteLine("All workers finished.");
    }
}
```
```vb
Public Module AsyncCountdownEventDemo
    Public Async Function RunAsync() As Task
        Dim countdown As New AsyncCountdownEvent(3)

        For i As Integer = 1 To 3
            Dim id As Integer = i
            Dim backgroundTask As Task = Task.Run(Async Function()
                Await Task.Delay(id * 30)
                Console.WriteLine($"Worker {id}: done.")
                countdown.Signal()
            End Function)
        Next

        Await countdown.WaitAsync()
        Console.WriteLine("All workers finished.")
    End Function
End Module
```
