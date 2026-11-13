---
title: "Complete your tasks"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/complete-your-tasks.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Complete your tasks

When you expose a task from `System.Threading.Tasks.TaskCompletionSource`1`, you own the task's lifetime. Complete that task on every path. If any path skips completion, callers wait forever.

## Complete every code path

Always complete the task in success and failure paths. Use a `catch` block for cleanup logic when the task fails. Use a `finally` block for cleanup logic that must always run. The following code block shows adding cleanup for a failure path:

```csharp
public sealed class MissingSetExceptionFix
{
    public Task<string> StartAsync(bool fail)
    {
        var tcs = new TaskCompletionSource<string>(TaskCreationOptions.RunContinuationsAsynchronously);

        try
        {
            if (fail)
            {
                throw new InvalidOperationException("Simulated failure");
            }

            tcs.TrySetResult("success");
        }
        catch (Exception ex)
        {
            tcs.TrySetException(ex);
        }

        return tcs.Task;
    }
}
```
```vb
Public NotInheritable Class MissingSetExceptionFix
    Public Function StartAsync(fail As Boolean) As Task(Of String)
        Dim tcs = New TaskCompletionSource(Of String)(TaskCreationOptions.RunContinuationsAsynchronously)

        Try
            If fail Then
                Throw New InvalidOperationException("Simulated failure")
            End If

            tcs.TrySetResult("success")
        Catch ex As Exception
            tcs.TrySetException(ex)
        End Try

        Return tcs.Task
    End Function
End Class
```
The following code catches an exception, logs it, and forgets to call `System.Threading.Tasks.TaskCompletionSource`1.SetException*` or `System.Threading.Tasks.TaskCompletionSource`1.TrySetException*`. This bug appears often and causes callers to wait forever. For more details about exception handling with tasks, see Task exception handling.

```csharp
// ⚠️ DON'T copy this snippet. It demonstrates a problem that causes hangs.
public sealed class MissingSetExceptionBug
{
    public Task<string> StartAsync(bool fail)
    {
        var tcs = new TaskCompletionSource<string>(TaskCreationOptions.RunContinuationsAsynchronously);

        try
        {
            if (fail)
            {
                throw new InvalidOperationException("Simulated failure");
            }

            tcs.SetResult("success");
        }
        catch (Exception)
        {
            // BUG: forgot SetException or TrySetException.
        }

        return tcs.Task;
    }
}
```
```vb
' ⚠️ DON'T copy this snippet. It demonstrates a problem that causes hangs.
Public NotInheritable Class MissingSetExceptionBug
    Public Function StartAsync(fail As Boolean) As Task(Of String)
        Dim tcs = New TaskCompletionSource(Of String)(TaskCreationOptions.RunContinuationsAsynchronously)

        Try
            If fail Then
                Throw New InvalidOperationException("Simulated failure")
            End If

            tcs.SetResult("success")
        Catch ex As Exception
            ' BUG: forgot SetException or TrySetException.
        End Try

        Return tcs.Task
    End Function
End Class
```
## Prefer `TrySet*` in completion races

Concurrent paths often race to complete the same `TaskCompletionSource`. `System.Threading.Tasks.TaskCompletionSource`1.SetResult*`, `System.Threading.Tasks.TaskCompletionSource`1.SetException*`, and `System.Threading.Tasks.TaskCompletionSource`1.SetCanceled*` throw if the task already completed. In race-prone code, use `System.Threading.Tasks.TaskCompletionSource`1.TrySetResult*`, `System.Threading.Tasks.TaskCompletionSource`1.TrySetException*`, and `System.Threading.Tasks.TaskCompletionSource`1.TrySetCanceled*`. For more patterns to avoid in concurrent scenarios, see Common async/await bugs.

```csharp
public static class TrySetRaceExample
{
    public static void ShowRaceSafeCompletion()
    {
        var tcs = new TaskCompletionSource<int>(TaskCreationOptions.RunContinuationsAsynchronously);

        bool first = tcs.TrySetResult(42);
        bool second = tcs.TrySetException(new TimeoutException("Too late"));

        Console.WriteLine($"First completion won: {first}");
        Console.WriteLine($"Second completion accepted: {second}");
        Console.WriteLine($"Result: {tcs.Task.Result}");
    }
}
```
```vb
Public Module TrySetRaceExample
    Public Sub ShowRaceSafeCompletion()
        Dim tcs = New TaskCompletionSource(Of Integer)(TaskCreationOptions.RunContinuationsAsynchronously)

        Dim first As Boolean = tcs.TrySetResult(42)
        Dim second As Boolean = tcs.TrySetException(New TimeoutException("Too late"))

        Console.WriteLine($"First completion won: {first}")
        Console.WriteLine($"Second completion accepted: {second}")
        Console.WriteLine($"Result: {tcs.Task.Result}")
    End Sub
End Module
```
## Don't drop references during reset

A common bug appears in resettable async primitives. Fix the reset path by atomically swapping references and completing the previous task (for example, with cancellation):

```csharp
public sealed class ResetFix
{
    private TaskCompletionSource<bool> _signal = NewSignal();

    public Task WaitAsync() => _signal.Task;

    public void Reset()
    {
        TaskCompletionSource<bool> previous = Interlocked.Exchange(ref _signal, NewSignal());
        previous.TrySetCanceled();
    }

    public void Pulse()
    {
        _signal.TrySetResult(true);
    }

    private static TaskCompletionSource<bool> NewSignal() =>
        new(TaskCreationOptions.RunContinuationsAsynchronously);
}
```
```vb
Public NotInheritable Class ResetFix
    Private _signal As TaskCompletionSource(Of Boolean) = NewSignal()

    Public Function WaitAsync() As Task
        Return _signal.Task
    End Function

    Public Sub Reset()
        Dim previous As TaskCompletionSource(Of Boolean) = Interlocked.Exchange(_signal, NewSignal())
        previous.TrySetCanceled()
    End Sub

    Public Sub Pulse()
        _signal.TrySetResult(True)
    End Sub

    Private Shared Function NewSignal() As TaskCompletionSource(Of Boolean)
        Return New TaskCompletionSource(Of Boolean)(TaskCreationOptions.RunContinuationsAsynchronously)
    End Function
End Class
```
**Don't do this:** If you replace a `TaskCompletionSource` instance before completing the previous one, waiters that hold the old task might never complete.

```csharp
// ⚠️ DON'T copy this snippet. It demonstrates a problem where old waiters never complete.
public sealed class ResetBug
{
    private TaskCompletionSource<bool> _signal = NewSignal();

    public Task WaitAsync() => _signal.Task;

    public void Reset()
    {
        // BUG: waiters on the old task might never complete.
        _signal = NewSignal();
    }

    public void Pulse()
    {
        _signal.TrySetResult(true);
    }

    private static TaskCompletionSource<bool> NewSignal() =>
        new(TaskCreationOptions.RunContinuationsAsynchronously);
}
```
```vb
' ⚠️ DON'T copy this snippet. It demonstrates a problem where old waiters never complete.
Public NotInheritable Class ResetBug
    Private _signal As TaskCompletionSource(Of Boolean) = NewSignal()

    Public Function WaitAsync() As Task
        Return _signal.Task
    End Function

    Public Sub Reset()
        ' BUG: waiters on the old task might never complete.
        _signal = NewSignal()
    End Sub

    Public Sub Pulse()
        _signal.TrySetResult(True)
    End Sub

    Private Shared Function NewSignal() As TaskCompletionSource(Of Boolean)
        Return New TaskCompletionSource(Of Boolean)(TaskCreationOptions.RunContinuationsAsynchronously)
    End Function
End Class
```
## Checklist

- Complete every exposed `TaskCompletionSource` task on success, failure, and cancellation paths.
- Use `TrySet*` APIs in paths that might race.
- During reset, complete or cancel the old task before you drop its reference.
- Add timeout-based tests so hangs fail fast in CI.

## See also

- Task exception handling
- Implement the TAP
- Common async/await bugs
