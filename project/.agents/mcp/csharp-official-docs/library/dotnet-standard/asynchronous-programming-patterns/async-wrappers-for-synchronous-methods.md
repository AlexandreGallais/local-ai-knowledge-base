---
title: "Asynchronous wrappers for synchronous methods"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/async-wrappers-for-synchronous-methods.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Asynchronous wrappers for synchronous methods

When you have a synchronous method in a library, you might be tempted to expose an asynchronous counterpart that wraps it in `System.Threading.Tasks.Task.Run*`:

```csharp
public T Foo() { /* synchronous work */ }

// Don't do this in a library:
public Task<T> FooAsync()
{
    return Task.Run(() => Foo());
}
```

This article explains why that approach is almost always wrong for libraries and how to think about the tradeoffs.

## Scalability vs. offloading

Asynchronous programming provides two distinct benefits:

- **Scalability** — Reduce resource consumption by freeing threads during I/O waits.
- **Offloading** — Move work to a different thread to maintain responsiveness (for example, keeping a UI thread free) or achieve parallelism.

These benefits require different approaches. The critical distinction: **wrapping a synchronous method in `Task.Run` helps with offloading but does nothing for scalability.**

### Why `Task.Run` doesn't improve scalability

A truly asynchronous implementation reduces the number of threads consumed during a long-running operation. A `Task.Run` wrapper still blocks a thread — it just moves the blocking from one thread to another:

```csharp
public static class TimerExampleWrong
{
    public static Task SleepAsync(int millisecondsTimeout)
    {
        return Task.Run(() => Thread.Sleep(millisecondsTimeout));
    }
}
```
```vb
Public Module TimerExampleWrong
    Public Function SleepAsync(millisecondsTimeout As Integer) As Task
        Return Task.Run(Sub() Thread.Sleep(millisecondsTimeout))
    End Function
End Module
```
Compare that approach with a truly asynchronous implementation that consumes no threads while waiting:

```csharp
public static class TimerExampleRight
{
    public static Task SleepAsync(int millisecondsTimeout)
    {
        var tcs = new TaskCompletionSource<bool>();
        var timer = new Timer(
            _ => tcs.TrySetResult(true), null, millisecondsTimeout, Timeout.Infinite);

        tcs.Task.ContinueWith(
            _ => timer.Dispose(), TaskScheduler.Default);

        return tcs.Task;
    }
}
```
```vb
Public Module TimerExampleRight
    Public Function SleepAsync(millisecondsTimeout As Integer) As Task
        Dim tcs As New TaskCompletionSource(Of Boolean)()
        Dim tmr As New Timer(
            Sub(state) tcs.TrySetResult(True), Nothing, millisecondsTimeout, Timeout.Infinite)

        tcs.Task.ContinueWith(
            Sub(t) tmr.Dispose(), TaskScheduler.Default)

        Return tcs.Task
    End Function
End Module
```
Both implementations complete after the specified delay, but the second implementation doesn't block any thread while waiting. For server applications handling many concurrent requests, that difference directly affects how many requests a server can process simultaneously.

### Offloading is the consumer's responsibility

Wrapping synchronous calls in `Task.Run` is useful for offloading work from a UI thread. However, the consumer, not the library, should handle this wrapping:

```csharp
public static class UIOffloadExample
{
    public static int ComputeIntensive(int input)
    {
        int result = 0;
        for (int i = 0; i < input; i++)
        {
            result += i;
        }
        return result;
    }

    public static async Task ConsumeFromUIThreadAsync()
    {
        int result = await Task.Run(() => ComputeIntensive(10_000));
        Console.WriteLine($"Result: {result}");
    }
}
```
```vb
Public Module UIOffloadExample
    Public Function ComputeIntensive(input As Integer) As Integer
        Dim result As Integer = 0
        For i As Integer = 0 To input - 1
            result += i
        Next
        Return result
    End Function

    Public Async Function ConsumeFromUIThreadAsync() As Task
        Dim result As Integer = Await Task.Run(Function() ComputeIntensive(10_000))
        Console.WriteLine($"Result: {result}")
    End Function
End Module
```
The consumer knows their context: whether they're on a UI thread, how much granularity they need, and whether offloading adds value. The library doesn't.

## Why libraries shouldn't expose async-over-sync wrappers

When a library exposes only the synchronous method (and not an async wrapper), consumers benefit in several ways:

- **Reduced API surface area**: Fewer methods to learn, test, and maintain.
- **No misleading scalability expectations**: Users know that only the methods exposed as asynchronous actually provide scalability benefits.
- **Consumer control**: Callers choose *whether* and *how* to offload, at the right level of granularity. A high-throughput server application can call the synchronous method directly, avoiding unnecessary overhead from `Task.Run`.
- **Better performance**: Asynchronous wrappers add overhead through allocations, context switches, and thread pool scheduling. For fine-grained operations, that overhead can be significant.

## Exceptions to the rule

Some base classes expose asynchronous methods so that derived classes can override them with truly asynchronous implementations. The base class provides an async-over-sync default.

For example, `System.IO.Stream` exposes `System.IO.Stream.ReadAsync*` and `System.IO.Stream.WriteAsync*`. The base implementations wrap the synchronous `System.IO.Stream.Read*` and `System.IO.Stream.Write*` methods. Derived classes like `System.IO.FileStream` and `System.Net.Sockets.NetworkStream` override these methods with asynchronous I/O implementations that provide real scalability benefits.

Similarly, `System.IO.TextReader` provides `System.IO.TextReader.ReadToEndAsync*` on the base class as a wrapper, and `System.IO.StreamReader` overrides it with a truly asynchronous implementation that calls `System.IO.Stream.ReadAsync*` internally.

These exceptions are valid because:

- The pattern is designed for polymorphism. Callers interact with the base type.
- Derived types provide truly asynchronous overrides.

## Guideline

Expose asynchronous methods from a library only when the implementation provides real scalability benefits over its synchronous counterpart. Don't expose asynchronous methods purely for offloading. Leave that choice to the consumer.

## See also

- Task-based asynchronous pattern (TAP)
- Implement the task-based asynchronous pattern
- Synchronous wrappers for asynchronous methods
