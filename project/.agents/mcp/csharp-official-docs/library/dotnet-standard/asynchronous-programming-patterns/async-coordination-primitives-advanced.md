---
title: "Async semaphores, locks, and reader/writer coordination (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/async-coordination-primitives-advanced.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Async semaphores, locks, and reader/writer coordination

When async code needs throttling, mutual exclusion, or reader/writer coordination, use the built-in .NET types rather than building your own. This article shows how to apply those types, and then walks through custom implementations to explain how they work internally.

## Async semaphore — throttle concurrent access

A semaphore limits how many callers can access a resource concurrently. `System.Threading.SemaphoreSlim` provides a `System.Threading.SemaphoreSlim.WaitAsync*` method that lets you await entry without blocking a thread:

```csharp
public static class SemaphoreSlimDemo
{
    public static async Task RunAsync()
    {
        using var semaphore = new SemaphoreSlim(3);

        Task[] tasks = Enumerable.Range(1, 6).Select(id => Task.Run(async () =>
        {
            await semaphore.WaitAsync();
            try
            {
                Console.WriteLine($"Task {id}: entered (count = {semaphore.CurrentCount})");
                await Task.Delay(100);
            }
            finally
            {
                semaphore.Release();
                Console.WriteLine($"Task {id}: released");
            }
        })).ToArray();

        await Task.WhenAll(tasks);
    }
}
```
```vb
Public Module SemaphoreSlimDemo
    Public Async Function RunAsync() As Task
        Using semaphore As New SemaphoreSlim(3)
            Dim tasks As Task() = Enumerable.Range(1, 6).Select(
                Function(id) Task.Run(Async Function()
                    Await semaphore.WaitAsync()
                    Try
                        Console.WriteLine($"Task {id}: entered (count = {semaphore.CurrentCount})")
                        Await Task.Delay(100)
                    Finally
                        semaphore.Release()
                        Console.WriteLine($"Task {id}: released")
                    End Try
                End Function)).ToArray()

            Await Task.WhenAll(tasks)
        End Using
    End Function
End Module
```
Always pair `WaitAsync` with `Release` in a `try`/`finally` block. If you forget to release, the semaphore count never increases, and other callers wait indefinitely.

### How an async semaphore works

Internally, an async semaphore maintains a count and a queue of waiters. When the count is above zero, `WaitAsync` decrements the count and returns immediately. When the count is zero, `WaitAsync` enqueues a `System.Threading.Tasks.TaskCompletionSource` and returns its task. `Release` either dequeues a waiter and completes it, or increments the count:

```csharp
// Educational only — use SemaphoreSlim instead of this sample implementation.
public class AsyncSemaphore
{
    private readonly Queue<TaskCompletionSource> _waiters = new();
    private int _currentCount;

    public AsyncSemaphore(int initialCount)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(initialCount, nameof(initialCount));
        _currentCount = initialCount;
    }

    public Task WaitAsync()
    {
        lock (_waiters)
        {
            if (_currentCount > 0)
            {
                _currentCount--;
                return Task.CompletedTask;
            }
            else
            {
                var waiter = new TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously);
                _waiters.Enqueue(waiter);
                return waiter.Task;
            }
        }
    }

    public void Release()
    {
        TaskCompletionSource? toRelease = null;

        lock (_waiters)
        {
            if (_waiters.Count > 0)
                toRelease = _waiters.Dequeue();
            else
                _currentCount++;
        }

        toRelease?.TrySetResult();
    }
}
```
```vb
' Educational only — use SemaphoreSlim instead of this sample implementation.
Public Class AsyncSemaphore
    Private ReadOnly _waiters As New Queue(Of TaskCompletionSource)()
    Private _currentCount As Integer

    Public Sub New(initialCount As Integer)
        If initialCount < 0 Then Throw New ArgumentOutOfRangeException(NameOf(initialCount))
        _currentCount = initialCount
    End Sub

    Public Function WaitAsync() As Task
        SyncLock _waiters
            If _currentCount > 0 Then
                _currentCount -= 1
                Return Task.CompletedTask
            Else
                Dim waiter As New TaskCompletionSource(TaskCreationOptions.RunContinuationsAsynchronously)
                _waiters.Enqueue(waiter)
                Return waiter.Task
            End If
        End SyncLock
    End Function

    Public Sub Release()
        Dim toRelease As TaskCompletionSource = Nothing

        SyncLock _waiters
            If _waiters.Count > 0 Then
                toRelease = _waiters.Dequeue()
            Else
                _currentCount += 1
            End If
        End SyncLock

        toRelease?.TrySetResult()
    End Sub
End Class
```
The `Release` method completes the `TaskCompletionSource` outside the lock, just like the `AsyncAutoResetEvent` in Build async coordination primitives. This approach prevents synchronous continuations from running while the lock is held.

> **Note:**
> `AsyncSemaphore` is an educational implementation. Use `System.Threading.SemaphoreSlim` instead—it supports cancellation tokens, timeouts, and has been thoroughly tested.

## Async lock: mutual exclusion across awaits

A lock with a count of 1 provides mutual exclusion. The C# `lock` statement and `System.Threading.Lock` (.NET 9+) don't work across `await` boundaries because they're thread-affine. A *thread-affine* lock the same thread that acquires the lock must be the one that releases it. Across an `await`, the thread that resumes the continuation might not be the thread that acquired the lock, which violates that requirement. Use `System.Threading.SemaphoreSlim` with a count of 1 instead:

```csharp
public static class SemaphoreSlimAsLockDemo
{
    private static readonly SemaphoreSlim s_lock = new(1, 1);
    private static int s_sharedCounter;

    public static async Task RunAsync()
    {
        Task[] tasks = Enumerable.Range(1, 5).Select(_ => Task.Run(async () =>
        {
            await s_lock.WaitAsync();
            try
            {
                int before = s_sharedCounter;
                await Task.Delay(10);
                s_sharedCounter = before + 1;
            }
            finally
            {
                s_lock.Release();
            }
        })).ToArray();

        await Task.WhenAll(tasks);
        Console.WriteLine($"Counter = {s_sharedCounter} (expected 5)");
    }
}
```
```vb
Public Module SemaphoreSlimAsLockDemo
    Private ReadOnly s_lock As New SemaphoreSlim(1, 1)
    Private s_sharedCounter As Integer

    Public Async Function RunAsync() As Task
        Dim tasks As Task() = Enumerable.Range(1, 5).Select(
            Function(unused) Task.Run(Async Function()
                Await s_lock.WaitAsync()
                Try
                    Dim before As Integer = s_sharedCounter
                    Await Task.Delay(10)
                    s_sharedCounter = before + 1
                Finally
                    s_lock.Release()
                End Try
            End Function)).ToArray()

        Await Task.WhenAll(tasks)
        Console.WriteLine($"Counter = {s_sharedCounter} (expected 5)")
    End Function
End Module
```
### How an async lock works

You can wrap the semaphore pattern in a type that supports `using` for automatic release. The `LockAsync` method returns a disposable `Releaser`; when the `Releaser` is disposed, it releases the semaphore:

```csharp
// Educational only — use SemaphoreSlim(1, 1) with try/finally instead of this sample implementation.
public class AsyncLock : IDisposable
{
    private readonly SemaphoreSlim _semaphore = new(1, 1);
    private readonly Task<Releaser> _releaser;

    public AsyncLock()
    {
        _releaser = Task.FromResult(new Releaser(this));
    }

    public Task<Releaser> LockAsync()
    {
        Task wait = _semaphore.WaitAsync();
        return wait.IsCompleted
            ? _releaser
            : wait.ContinueWith(
                  (_, state) => new Releaser((AsyncLock)state!),
                  this,
                  CancellationToken.None,
                  TaskContinuationOptions.ExecuteSynchronously,
                  TaskScheduler.Default);
    }

    public struct Releaser : IDisposable
    {
        private readonly AsyncLock? _toRelease;

        internal Releaser(AsyncLock toRelease) => _toRelease = toRelease;

        public void Dispose() => _toRelease?._semaphore.Release();
    }

    public void Dispose() => _semaphore.Dispose();
}
```
```vb
' Educational only — use SemaphoreSlim(1, 1) with Try/Finally instead of this sample implementation.
Public Class AsyncLock
    Implements IDisposable

    Private ReadOnly _semaphore As New SemaphoreSlim(1, 1)
    Private ReadOnly _releaser As Task(Of Releaser)

    Public Sub New()
        _releaser = Task.FromResult(New Releaser(Me))
    End Sub

    Public Function LockAsync() As Task(Of Releaser)
        Dim wait As Task = _semaphore.WaitAsync()
        If wait.IsCompleted Then
            Return _releaser
        Else
            Return wait.ContinueWith(
                Function(unused, state) New Releaser(DirectCast(state, AsyncLock)),
                Me,
                CancellationToken.None,
                TaskContinuationOptions.ExecuteSynchronously,
                TaskScheduler.Default)
        End If
    End Function

    Public Structure Releaser
        Implements IDisposable

        Private ReadOnly _toRelease As AsyncLock

        Friend Sub New(toRelease As AsyncLock)
            _toRelease = toRelease
        End Sub

        Public Sub Dispose() Implements IDisposable.Dispose
            _toRelease?._semaphore.Release()
        End Sub
    End Structure

    Public Sub Dispose() Implements IDisposable.Dispose
        _semaphore.Dispose()
    End Sub
End Class
```
Usage is concise and safe:

```csharp
public static class AsyncLockDemo
{
    private static readonly AsyncLock s_lock = new();
    private static int s_sharedValue;

    public static async Task RunAsync()
    {
        Task[] tasks = Enumerable.Range(1, 5).Select(id => Task.Run(async () =>
        {
            using (await s_lock.LockAsync())
            {
                int before = s_sharedValue;
                await Task.Delay(10);
                s_sharedValue = before + 1;
                Console.WriteLine($"Task {id}: incremented to {s_sharedValue}");
            }
        })).ToArray();

        await Task.WhenAll(tasks);
        Console.WriteLine($"Final value = {s_sharedValue} (expected 5)");
    }
}
```
```vb
Public Module AsyncLockDemo
    Private ReadOnly s_lock As New AsyncLock()
    Private s_sharedValue As Integer

    Public Async Function RunAsync() As Task
        Dim tasks As Task() = Enumerable.Range(1, 5).Select(
            Function(id) Task.Run(Async Function()
                Using Await s_lock.LockAsync()
                    Dim before As Integer = s_sharedValue
                    Await Task.Delay(10)
                    s_sharedValue = before + 1
                    Console.WriteLine($"Task {id}: incremented to {s_sharedValue}")
                End Using
            End Function)).ToArray()

        Await Task.WhenAll(tasks)
        Console.WriteLine($"Final value = {s_sharedValue} (expected 5)")
    End Function
End Module
```
> **Note:**
> `AsyncLock` is an educational implementation. Use `System.Threading.SemaphoreSlim` initialized to `1` with `try`/`finally` directly—the `AsyncLock` type shown here illustrates the disposable-releaser pattern but adds no capabilities beyond what `SemaphoreSlim` provides.
