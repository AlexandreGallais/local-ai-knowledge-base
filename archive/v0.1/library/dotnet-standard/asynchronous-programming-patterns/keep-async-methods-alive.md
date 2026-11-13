---
title: "Keep async methods alive"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/keep-async-methods-alive.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Keep async methods alive

Fire-and-forget work is easy to start and easy to lose. If you start an asynchronous operation and drop the returned `System.Threading.Tasks.Task`, you lose visibility into completion, cancellation, and failures.

Most lifetime bugs in async code are ownership bugs, not compiler bugs. The `async` state machine and its `Task` stay alive while work is still reachable through continuations. Problems happen when your app no longer tracks that work.

## Why fire-and-forget causes lifetime bugs

When you start background work without tracking it, you create three risks:

- The operation can fail, and nobody observes the exception.
- The process or host can shut down before the operation finishes.
- The operation can outlive the object or scope that was meant to control it.

Use fire-and-forget only when the work is truly optional and failure is acceptable.

## Track background work explicitly

This sample defines `BackgroundTaskTracker`, a custom helper class that holds a thread-safe dictionary of in-flight tasks. When you call `Track`, it registers a `ContinueWith` continuation on the task that removes the task from the dictionary when it completes and logs any failure. When you call `DrainAsync`, it calls `Task.WhenAll` on every task still in the dictionary and returns the resulting task.

```csharp
public sealed class BackgroundTaskTracker
{
    private readonly ConcurrentDictionary<int, Task> _inFlight = new();

    public void Track(Task operationTask, string name)
    {
        int id = operationTask.Id;
        _inFlight[id] = operationTask;

        _ = operationTask.ContinueWith(completedTask =>
        {
            _inFlight.TryRemove(id, out _);

            if (completedTask.IsFaulted)
            {
                Console.WriteLine($"{name} failed: {completedTask.Exception?.GetBaseException().Message}");
            }
        }, TaskScheduler.Default);
    }

    public Task DrainAsync()
    {
        Task[] snapshot = _inFlight.Values.ToArray();
        return snapshot.Length == 0 ? Task.CompletedTask : Task.WhenAll(snapshot);
    }
}
```
```vb
Public NotInheritable Class BackgroundTaskTracker
    Private ReadOnly _inFlight As New ConcurrentDictionary(Of Integer, Task)()

    Public Sub Track(operationTask As Task, name As String)
        Dim id As Integer = operationTask.Id
        _inFlight(id) = operationTask

        Dim continuationTask As Task = operationTask.ContinueWith(Sub(completedTask)
                                                                      Dim removedTask As Task = Nothing
                                                                      _inFlight.TryRemove(id, removedTask)

                                                                      If completedTask.IsFaulted Then
                                                                          Console.WriteLine($"{name} failed: {completedTask.Exception.GetBaseException().Message}")
                                                                      End If
                                                                  End Sub,
                                                                  TaskScheduler.Default)
    End Sub

    Public Function DrainAsync() As Task
        Dim snapshot As Task() = _inFlight.Values.ToArray()

        If snapshot.Length = 0 Then
            Return Task.CompletedTask
        End If

        Return Task.WhenAll(snapshot)
    End Function
End Class
```
The following example uses `BackgroundTaskTracker` to start, observe, and drain a background operation:

```csharp
public static class FireAndForgetFix
{
    public static async Task RunAsync(BackgroundTaskTracker tracker)
    {
        Task backgroundTask = Task.Run(async () =>
        {
            await Task.Delay(100);
            throw new InvalidOperationException("Background operation failed.");
        });

        tracker.Track(backgroundTask, "Cache refresh");

        try
        {
            await tracker.DrainAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Drain observed failure: {ex.GetBaseException().Message}");
        }
    }
}
```
```vb
Public Module FireAndForgetFix
    Public Async Function RunAsync(tracker As BackgroundTaskTracker) As Task
        Dim backgroundTask As Task = Task.Run(Async Function()
                                                  Await Task.Delay(100)
                                                  Throw New InvalidOperationException("Background operation failed.")
                                              End Function)

        tracker.Track(backgroundTask, "Cache refresh")

        Try
            Await tracker.DrainAsync()
        Catch ex As Exception
            Console.WriteLine($"Drain observed failure: {ex.GetBaseException().Message}")
        End Try
    End Function
End Module
```
You might ask: if `DrainAsync` just awaits the one task you started, why not `await backgroundTask` directly and skip the tracker entirely? For a single task in a single method, you could. The tracker becomes valuable when tasks are started from many different places across a component's lifetime. Each caller hands its task to the shared tracker, and a single `DrainAsync` call at shutdown awaits all of them without knowing how many were started or who started them. The tracker also enforces a consistent exception-observation policy: every registered task gets the same failure-logging continuation, so no exception can slip through unnoticed regardless of which code path started the work.

The three key <example-value> of the tracked pattern are:

- **Assign the task to a variable** — keeping a reference to `backgroundTask` is what makes tracking possible. A task you can't refer to is a task you can't drain or observe.
- **Register with the tracker** — `tracker.Track` attaches the failure-logging continuation and adds the task to the in-flight set. Any exception the background work throws surfaces through that continuation rather than disappearing silently.
- **Drain at shutdown** — `tracker.DrainAsync` awaits everything still running. Call it before your component or process exits to guarantee no in-flight work is abandoned mid-flight.

### Consequences of untracked fire-and-forget

If you discard the returned `Task` instead of tracking it, you create silent failure:

```csharp
public static class FireAndForgetPitfall
{
    public static async Task RunAsync()
    {
        _ = Task.Run(async () =>
        {
            await Task.Delay(100);
            throw new InvalidOperationException("Background operation failed.");
        });

        await Task.Delay(150);
        Console.WriteLine("Caller finished without observing background completion.");
    }
}
```
```vb
Public Module FireAndForgetPitfall
    Public Async Function RunAsync() As Task
        Dim discardedTask As Task = Task.Run(Async Function()
                                                 Await Task.Delay(100)
                                                 Throw New InvalidOperationException("Background operation failed.")
                                             End Function)

        Await Task.Delay(150)
        Console.WriteLine("Caller finished without observing background completion.")
    End Function
End Module
```
Three problems follow from dropping the task:

- **Silent exceptions** — the `InvalidOperationException` from the background operation is never observed. The runtime routes it to `System.Threading.Tasks.TaskScheduler.UnobservedTaskException` at finalization, which is non-deterministic and far too late to handle gracefully.
- **No shutdown coordination** — the caller continues and exits without waiting for the operation to finish. On a short-lived process or a host with a shutdown timeout, the background work is canceled or lost entirely.
- **No visibility** — without a reference to the task, you can't determine whether the operation succeeded, failed, or is still running.

Untracked fire-and-forget is acceptable only when all three of the following conditions hold: the work is genuinely optional, failure is safe to ignore, and the operation completes well within any expected process lifetime. Logging a non-critical telemetry ping is one example where these conditions can all hold.

## Keep ownership explicit

Use one of these ownership models:

- Return the `Task` and require callers to await it.
- Track background tasks in a dedicated owner service.
- Use a host-managed background abstraction so the host owns lifetime.

If work must continue after the caller returns, transfer ownership explicitly. For example, hand the task to a tracker that logs errors and participates in shutdown.

## Surface exceptions from background tasks

Dropped tasks can fail silently until finalization and unobserved-exception handling occurs. That timing is non-deterministic and too late for normal request or workflow handling.

Attach observation logic when you queue background work. At minimum, log failures in a continuation. Prefer a centralized tracker so every queued operation gets the same policy.

For exception propagation details, see Task exception handling.

## Coordinate cancellation and shutdown

Tie background work to a cancellation token that represents app or operation lifetime. During shutdown:

1. Stop accepting new work.
1. Signal cancellation.
1. Await tracked tasks with a bounded timeout.
1. Log incomplete operations.

This flow keeps shutdown predictable and prevents partial writes or orphaned operations.

## Can the GC collect an async method before it finishes?

The runtime keeps the async state machine alive while continuations still reference it. You usually don't lose an in-flight async operation to garbage collection of the state machine itself.

You can still lose correctness if you lose ownership of the returned task, dispose required resources early, or let the process end before completion. Focus on task ownership and coordinated shutdown.

## See also

- Task-based asynchronous pattern (TAP)
- Consuming the Task-based Asynchronous Pattern
- Common async/await bugs
- ExecutionContext and SynchronizationContext
- Task exception handling
