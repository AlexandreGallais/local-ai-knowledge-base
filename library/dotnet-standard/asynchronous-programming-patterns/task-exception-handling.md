---
title: "Task exception handling"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/task-exception-handling.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Task exception handling

Use `await` as your default. `await` gives you natural exception flow, keeps your code readable, and avoids sync-over-async deadlocks.

Sometimes you still need to block on a `System.Threading.Tasks.Task`, for example, in legacy synchronous entry points. In those cases, you need to understand how each API surfaces exceptions.

## Compare exception propagation for blocking APIs

When you must block on a task, use `System.Threading.Tasks.Task.GetAwaiter*`().GetResult() to preserve the original exception type:

```csharp
public static class SingleExceptionExample
{
    public static Task<int> FaultAsync()
    {
        return Task.FromException<int>(new InvalidOperationException("Single failure"));
    }

    public static void ShowBlockingDifferences()
    {
        try
        {
            _ = FaultAsync().GetAwaiter().GetResult();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"GetAwaiter().GetResult() threw {ex.GetType().Name}");
        }
    }
}
```
```vb
Public Module SingleExceptionExample
    Public Function FaultAsync() As Task(Of Integer)
        Return Task.FromException(Of Integer)(New InvalidOperationException("Single failure"))
    End Function

    Public Sub ShowBlockingDifferences()
        Try
            Dim ignored = FaultAsync().GetAwaiter().GetResult()
        Catch ex As Exception
            Console.WriteLine($"GetAwaiter().GetResult() threw {ex.GetType().Name}")
        End Try
    End Sub
End Module
```
`System.Threading.Tasks.Task`1.Result` and `System.Threading.Tasks.Task.Wait*` wrap exceptions in `System.AggregateException`, which complicates exception handling. The following code uses these APIs and receives the wrong exception type:

```csharp
// ⚠️ DON'T copy this snippet. It demonstrates a problem where exceptions get wrapped unnecessarily.
public static class SingleExceptionBadExample
{
    public static Task<int> FaultAsync()
    {
        return Task.FromException<int>(new InvalidOperationException("Single failure"));
    }

    public static void ShowBlockingDifferences()
    {
        try
        {
            _ = FaultAsync().Result;
        }
        catch (AggregateException ex)
        {
            Console.WriteLine($".Result threw {ex.GetType().Name} with inner {ex.InnerException?.GetType().Name}");
        }
    }
}
```
```vb
' ⚠️ DON'T copy this snippet. It demonstrates a problem where exceptions get wrapped unnecessarily.
Public Module SingleExceptionBadExample
    Public Function FaultAsync() As Task(Of Integer)
        Return Task.FromException(Of Integer)(New InvalidOperationException("Single failure"))
    End Function

    Public Sub ShowBlockingDifferences()
        Try
            Dim ignored = FaultAsync().Result
        Catch ex As AggregateException
            Console.WriteLine($".Result threw {ex.GetType().Name} with inner {ex.InnerException?.GetType().Name}")
        End Try
    End Sub
End Module
```
For tasks that fault with multiple exceptions, `GetAwaiter().GetResult()` still throws one exception, but `System.Threading.Tasks.Task.Exception` stores an `System.AggregateException` that contains all inner exceptions:

```csharp
public static class MultiExceptionExample
{
    public static async Task FaultAfterDelayAsync(string name, int milliseconds)
    {
        await Task.Delay(milliseconds);
        throw new InvalidOperationException($"{name} failed");
    }

    public static void ShowMultipleExceptions()
    {
        Task combined = Task.WhenAll(
            FaultAfterDelayAsync("First", 10),
            FaultAfterDelayAsync("Second", 20));

        try
        {
            combined.GetAwaiter().GetResult();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"GetAwaiter().GetResult() surfaced: {ex.Message}");
        }

        if (combined.IsFaulted && combined.Exception is not null)
        {
            AggregateException allErrors = combined.Exception.Flatten();
            Console.WriteLine($"Task.Exception contains {allErrors.InnerExceptions.Count} exceptions.");
        }
        else
        {
            Console.WriteLine("Task.Exception is null because the task didn't fault.");
        }
    }
}
```
```vb
Public Module MultiExceptionExample
    Public Async Function FaultAfterDelayAsync(name As String, milliseconds As Integer) As Task
        Await Task.Delay(milliseconds)
        Throw New InvalidOperationException($"{name} failed")
    End Function

    Public Sub ShowMultipleExceptions()
        Dim combined As Task = Task.WhenAll(
            FaultAfterDelayAsync("First", 10),
            FaultAfterDelayAsync("Second", 20))

        Try
            combined.GetAwaiter().GetResult()
        Catch ex As Exception
            Console.WriteLine($"GetAwaiter().GetResult() surfaced: {ex.Message}")
        End Try

        If combined.IsFaulted AndAlso combined.Exception IsNot Nothing Then
            Dim allErrors As AggregateException = combined.Exception.Flatten()
            Console.WriteLine($"Task.Exception contains {allErrors.InnerExceptions.Count} exceptions.")
        Else
            Console.WriteLine("Task.Exception was not available because the task did not fault.")
        End If
    End Sub
End Module
```
## `Task.Result` vs `GetAwaiter().GetResult()`

Use this guidance when you choose between the two APIs:

- Prefer `await` when you can. It avoids blocking and deadlock risk.
- If you must block and you want original exception types, use `GetAwaiter().GetResult()`. In WinForms applications, note the Common pitfalls and deadlocks section of the article on event handlers.
- If your existing code expects `System.AggregateException`, use `Result` or `Wait()` and inspect `InnerExceptions`.

These rules affect exception shape only. Both APIs still block the current thread, so both can deadlock on single-threaded `System.Threading.SynchronizationContext` environments. To understand how to properly complete tasks on all code paths, see Complete your tasks.

## Unobserved task exceptions in modern .NET

The runtime raises `System.Threading.Tasks.TaskScheduler.UnobservedTaskException` when a faulted `Task` gets finalized before code observes its exception.

In modern .NET, unobserved exceptions no longer crash the process by default. The runtime reports them through the event, and then continues execution.

```csharp
public static class UnobservedTaskExceptionExample
{
    public static void ShowEventBehavior()
    {
        bool eventRaised = false;

        TaskScheduler.UnobservedTaskException += (_, args) =>
        {
            eventRaised = true;
            Console.WriteLine($"UnobservedTaskException raised with {args.Exception.InnerExceptions.Count} exception(s).");
            args.SetObserved();
        };

        _ = Task.Run(() => throw new ApplicationException("Background failure"));

        GC.Collect();
        GC.WaitForPendingFinalizers();
        GC.Collect();

        Console.WriteLine(eventRaised
            ? "Event was raised. The process continued."
            : "Event was not observed in this short run. The process still continued.");
    }
}
```
```vb
Public Module UnobservedTaskExceptionExample
    Public Sub ShowEventBehavior()
        Dim eventRaised As Boolean = False

        AddHandler TaskScheduler.UnobservedTaskException,
            Sub(sender, args)
                eventRaised = True
                Console.WriteLine($"UnobservedTaskException raised with {args.Exception.InnerExceptions.Count} exception(s).")
                args.SetObserved()
            End Sub

        Task.Run(Sub() Throw New ApplicationException("Background failure"))

        GC.Collect()
        GC.WaitForPendingFinalizers()
        GC.Collect()

        If eventRaised Then
            Console.WriteLine("Event was raised. The process continued.")
        Else
            Console.WriteLine("Event was not observed in this short run. The process still continued.")
        End If
    End Sub
End Module
```
Use the event for diagnostics and telemetry. Don't use the event as a replacement for normal exception handling in async flows.

## See also

- Common async/await bugs
- Consume the TAP
- Exception handling (Task Parallel Library)
