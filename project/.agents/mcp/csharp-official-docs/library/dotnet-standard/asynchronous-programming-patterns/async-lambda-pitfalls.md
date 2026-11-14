---
title: "Async lambda pitfalls"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/async-lambda-pitfalls.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Async lambda pitfalls

Async lambdas and anonymous methods are powerful features that let you create delegates representing asynchronous operations. Use them with APIs that are designed for asynchronous delegates. This article shows the right patterns first, and then explains what goes wrong when you pass async lambdas to APIs that expect synchronous delegates.

## Async lambdas assigned to `Action` delegates

Create an overload that accepts `Func<Task>` and await the result:

```csharp
public static class TimingHelperFixed
{
    public static double Time(Action action, int iterations = 10)
    {
        var sw = Stopwatch.StartNew();
        for (int i = 0; i < iterations; i++)
            action();
        return sw.Elapsed.TotalSeconds / iterations;
    }

    public static async Task<double> TimeAsync(Func<Task> func, int iterations = 10)
    {
        var sw = Stopwatch.StartNew();
        for (int i = 0; i < iterations; i++)
            await func();
        return sw.Elapsed.TotalSeconds / iterations;
    }
}

public static class ActionFixDemo
{
    public static async Task Run()
    {
        // Now the async lambda maps to Func<Task>, and
        // the timer awaits each iteration to complete.
        double seconds = await TimingHelperFixed.TimeAsync(async () =>
        {
            await Task.Delay(100);
        }, iterations: 3);
        Console.WriteLine($"Async (fixed): {seconds:F4}s per iteration");
    }
}
```
```vb
Public Module TimingHelperFixed
    Public Function Time(action As Action, Optional iterations As Integer = 10) As Double
        Dim sw = Stopwatch.StartNew()
        For i As Integer = 0 To iterations - 1
            action()
        Next
        Return sw.Elapsed.TotalSeconds / iterations
    End Function

    Public Async Function Time(func As Func(Of Task), Optional iterations As Integer = 10) As Task(Of Double)
        Dim sw = Stopwatch.StartNew()
        For i As Integer = 0 To iterations - 1
            Await func()
        Next
        Return sw.Elapsed.TotalSeconds / iterations
    End Function
End Module

Public Module ActionFixDemo
    Public Async Function Run() As Task
        ' Now the async lambda maps to Func(Of Task), and
        ' the timer waits for each iteration to complete.
        Dim seconds As Double = Await TimingHelperFixed.Time(
            Async Function()
                Await Task.Delay(100)
            End Function, iterations:=3)
        Console.WriteLine($"Async (fixed): {seconds:F4}s per iteration")
    End Function
End Module
```
Whenever you pass an async lambda to a method, verify the parameter's delegate type. If the parameter is `Action`, `Action<T>`, or any other void-returning delegate, switch to a task-returning delegate for asynchronous operations.

An async lambda can match a `void`-returning delegate type like `System.Action` in addition to `Func<Task>`. When the target parameter is an `Action`, the compiler maps the async lambda to an async void method. The caller has no way to track completion.

Consider a timing helper that accepts an `Action`:

```csharp
public static class TimingHelper
{
    public static double Time(Action action, int iterations = 10)
    {
        var sw = Stopwatch.StartNew();
        for (int i = 0; i < iterations; i++)
            action();
        return sw.Elapsed.TotalSeconds / iterations;
    }
}

public static class ActionPitfallDemo
{
    public static void Run()
    {
        // Synchronous lambda — timing is accurate.
        double syncSeconds = TimingHelper.Time(() =>
        {
            Thread.Sleep(100);
        }, iterations: 3);
        Console.WriteLine($"Sync: {syncSeconds:F4}s per iteration");

        // Async lambda — becomes async void, returns immediately.
        double asyncSeconds = TimingHelper.Time(async () =>
        {
            await Task.Delay(100);
        }, iterations: 3);
        Console.WriteLine($"Async (buggy): {asyncSeconds:F4}s per iteration");
    }
}
```
```vb
Public Module TimingHelper
    Public Function Time(action As Action, Optional iterations As Integer = 10) As Double
        Dim sw = Stopwatch.StartNew()
        For i As Integer = 0 To iterations - 1
            action()
        Next
        Return sw.Elapsed.TotalSeconds / iterations
    End Function
End Module

Public Module ActionPitfallDemo
    Public Sub Run()
        ' Synchronous lambda — timing is accurate.
        Dim syncSeconds As Double = TimingHelper.Time(
            Sub() Thread.Sleep(100), iterations:=3)
        Console.WriteLine($"Sync: {syncSeconds:F4}s per iteration")

        ' Async lambda — becomes Async Sub, returns immediately.
        Dim asyncSeconds As Double = TimingHelper.Time(
            Async Sub() Await Task.Delay(100), iterations:=3)
        Console.WriteLine($"Async (buggy): {asyncSeconds:F4}s per iteration")
    End Sub
End Module
```
When you pass a synchronous lambda, the measured time is accurate. With an async lambda, the `Action` delegate returns as soon as the first `await` yields, so the timer captures only the synchronous portion instead of the full operation.

## `Parallel.ForEach` with async lambdas

In .NET 6 and later, use `System.Threading.Tasks.Parallel.ForEachAsync*`, which accepts a `Func<TSource, CancellationToken, ValueTask>`:

```csharp
public static class ParallelForEachFixDemo
{
    public static async Task RunAsync()
    {
        var sw = Stopwatch.StartNew();
        await Parallel.ForEachAsync(
            Enumerable.Range(0, 10),
            new ParallelOptions { MaxDegreeOfParallelism = 4 },
            async (i, ct) =>
            {
                await Task.Delay(200, ct);
            });
        Console.WriteLine($"Parallel.ForEachAsync (fixed): {sw.Elapsed.TotalSeconds:F2}s");
    }
}
```
```vb
Public Module ParallelForEachFixDemo
    Private Function ProcessItemAsync(i As Integer, ct As CancellationToken) As ValueTask
        Return New ValueTask(Task.Delay(200, ct))
    End Function

    Public Async Function RunAsync() As Task
        Dim sw = Stopwatch.StartNew()
        Await Parallel.ForEachAsync(
            Enumerable.Range(0, 10),
            New ParallelOptions With {.MaxDegreeOfParallelism = 4},
            AddressOf ProcessItemAsync)
        Console.WriteLine($"Parallel.ForEachAsync (fixed): {sw.Elapsed.TotalSeconds:F2}s")
    End Function
End Module
```
Alternatively, project the items into tasks and use `System.Threading.Tasks.Task.WhenAll*`:

```csharp
public static class WhenAllAlternativeDemo
{
    public static async Task RunAsync()
    {
        var sw = Stopwatch.StartNew();
        var tasks = Enumerable.Range(0, 10)
            .Select(async i =>
            {
                await Task.Delay(200);
            });
        await Task.WhenAll(tasks);
        Console.WriteLine($"Task.WhenAll: {sw.Elapsed.TotalSeconds:F2}s");
    }
}
```
```vb
Public Module WhenAllAlternativeDemo
    Public Async Function RunAsync() As Task
        Dim sw = Stopwatch.StartNew()
        Dim tasks = Enumerable.Range(0, 10).
            Select(Async Function(i)
                       Await Task.Delay(200)
                   End Function)
        Await Task.WhenAll(tasks)
        Console.WriteLine($"Task.WhenAll: {sw.Elapsed.TotalSeconds:F2}s")
    End Function
End Module
```
`System.Threading.Tasks.Parallel.ForEach*` accepts an `Action<T>` for its body parameter. Passing an async lambda creates an async void delegate. `Parallel.ForEach` returns as soon as each delegate hits its first yielding `await`:

```csharp
public static class ParallelForEachBugDemo
{
    public static void Run()
    {
        var sw = Stopwatch.StartNew();
        Parallel.ForEach(Enumerable.Range(0, 10), async i =>
        {
            await Task.Delay(200);
        });
        // Completes almost immediately — the async lambdas are fire-and-forget.
        Console.WriteLine($"Parallel.ForEach (buggy): {sw.Elapsed.TotalSeconds:F2}s");
    }
}
```
```vb
Public Module ParallelForEachBugDemo
    Public Sub Run()
        Dim sw = Stopwatch.StartNew()
        Parallel.ForEach(Enumerable.Range(0, 10),
            Async Sub(i As Integer)
                Await Task.Delay(200)
            End Sub)
        ' Completes almost immediately — the async lambdas are fire-and-forget.
        Console.WriteLine($"Parallel.ForEach (buggy): {sw.Elapsed.TotalSeconds:F2}s")
    End Sub
End Module
```
The loop completes in milliseconds instead of the expected duration because the async lambdas become fire-and-forget operations.

## `Task.Factory.StartNew` with async lambdas

`System.Threading.Tasks.Task.Run*` automatically unwraps async lambdas. It accepts `Func<Task>` and `Func<Task<TResult>>` overloads and returns the inner task:

```csharp
public static class StartNewFix1Demo
{
    public static async Task RunAsync()
    {
        var sw = Stopwatch.StartNew();
        await Task.Run(async () =>
        {
            await Task.Delay(1000);
        });
        Console.WriteLine($"Task.Run (fixed): {sw.Elapsed.TotalSeconds:F2}s");
    }
}
```
```vb
Public Module StartNewFix1Demo
    Public Async Function RunAsync() As Task
        Dim sw = Stopwatch.StartNew()
        Await Task.Run(Async Function()
                           Await Task.Delay(1000)
                       End Function)
        Console.WriteLine($"Task.Run (fixed): {sw.Elapsed.TotalSeconds:F2}s")
    End Function
End Module
```
If you need `StartNew`-specific options (such as `System.Threading.Tasks.TaskCreationOptions.LongRunning`), call `System.Threading.Tasks.TaskExtensions.Unwrap*` on the result:

```csharp
public static class StartNewFix2Demo
{
    public static async Task RunAsync()
    {
        var sw = Stopwatch.StartNew();
        await Task.Factory.StartNew(async () =>
        {
            await Task.Delay(1000);
        }).Unwrap();
        Console.WriteLine($"StartNew + Unwrap (fixed): {sw.Elapsed.TotalSeconds:F2}s");
    }
}
```
```vb
Public Module StartNewFix2Demo
    Public Async Function RunAsync() As Task
        Dim sw = Stopwatch.StartNew()
        Await Task.Factory.StartNew(Async Function()
                                        Await Task.Delay(1000)
                                    End Function).Unwrap()
        Console.WriteLine($"StartNew + Unwrap (fixed): {sw.Elapsed.TotalSeconds:F2}s")
    End Function
End Module
```
When you pass an async lambda to `System.Threading.Tasks.TaskFactory.StartNew*`, the return type is `Task<Task>` (or `Task<Task<TResult>>`). The outer task represents only the synchronous part of the delegate—it completes at the first yielding `await`. The inner task represents the full asynchronous operation:

```csharp
public static class StartNewBugDemo
{
    public static async Task RunAsync()
    {
        var sw = Stopwatch.StartNew();
        // t is Task<Task> — the outer task completes at the first yielding await.
        Task<Task> t = Task.Factory.StartNew(async () =>
        {
            await Task.Delay(1000);
        });
        await t; // Awaits only the outer task.
        Console.WriteLine($"StartNew (buggy): {sw.Elapsed.TotalSeconds:F2}s");
    }
}
```
```vb
Public Module StartNewBugDemo
    Public Async Function RunAsync() As Task
        Dim sw = Stopwatch.StartNew()
        ' t is Task(Of Task) — the outer task completes at the first yielding Await.
        Dim t As Task(Of Task) = Task.Factory.StartNew(Async Function()
                                                           Await Task.Delay(1000)
                                                       End Function)
        Await t ' Awaits only the outer task.
        Console.WriteLine($"StartNew (buggy): {sw.Elapsed.TotalSeconds:F2}s")
    End Function
End Module
```
If you treat the outer task as the whole operation, you'll observe completion before the async work actually finishes.

## Summary

When you pass an async lambda to any method, verify the target parameter's delegate type:

| Delegate type                             | Async behavior                                              | Risk   |
|-------------------------------------------|-------------------------------------------------------------|--------|
| `Func<Task>`, `Func<Task<T>>`             | Caller receives a task that represents completion           | Safe   |
| `Action`, `Action<T>`                     | Becomes async void—caller can't observe completion          | High   |
| `Func<TResult>` where `TResult` is `Task` | Returns `Task<Task>`—outer task doesn't represent full work | Medium |

## See also

- Common async/await bugs
- Task-based asynchronous pattern (TAP)
- Consume the task-based asynchronous pattern
