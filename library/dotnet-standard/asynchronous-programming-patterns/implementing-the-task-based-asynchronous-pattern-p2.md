---
title: "Implementing the Task-based Asynchronous Pattern (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/implementing-the-task-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Implementing the Task-based Asynchronous Pattern (part 2 of 2)

## Workloads

You can implement both compute-bound and I/O-bound asynchronous operations as TAP methods. However, when you expose TAP methods publicly from a library, provide them only for workloads that involve I/O-bound operations. These operations might also involve computation, but they shouldn't be purely computational. If a method is purely compute-bound, expose it only as a synchronous implementation. The code that consumes it can then choose whether to wrap an invocation of that synchronous method into a task to offload the work to another thread or to achieve parallelism. If a method is I/O-bound, expose it only as an asynchronous implementation.

### Compute-bound tasks

The `System.Threading.Tasks.Task` class works well for representing computationally intensive operations. By default, it takes advantage of special support within the `System.Threading.ThreadPool` class to provide efficient execution. It also provides significant control over when, where, and how asynchronous computations execute.

Generate compute-bound tasks in the following ways:

- In .NET Framework 4.5 and later versions (including .NET Core and .NET 5+), use the static `System.Threading.Tasks.Task.Run*` method as a shortcut to `System.Threading.Tasks.TaskFactory.StartNew*`. Use `System.Threading.Tasks.Task.Run*` to easily launch a compute-bound task that targets the thread pool. This method is the preferred mechanism for launching a compute-bound task. Use `StartNew` directly only when you want more fine-grained control over the task.

- In .NET Framework 4, use the `System.Threading.Tasks.TaskFactory.StartNew*` method. It accepts a delegate (typically an `System.Action`1` or a `System.Func`1`) to execute asynchronously. If you provide an `System.Action`1` delegate, the method returns a `System.Threading.Tasks.Task` object that represents the asynchronous execution of that delegate. If you provide a `System.Func`1` delegate, the method returns a `System.Threading.Tasks.Task`1` object. Overloads of the `System.Threading.Tasks.TaskFactory.StartNew*` method accept a cancellation token (`System.Threading.CancellationToken`), task creation options (`System.Threading.Tasks.TaskCreationOptions`), and a task scheduler (`System.Threading.Tasks.TaskScheduler`). These parameters provide fine-grained control over the scheduling and execution of the task. A factory instance that targets the current task scheduler is available as a static property (`System.Threading.Tasks.Task.Factory*`) of the `System.Threading.Tasks.Task` class. For example: `Task.Factory.StartNew(…)`.

- Use the constructors of the `Task` type and the `Start` method if you want to generate and schedule the task separately. Public methods must only return tasks that are already started.

- Use the overloads of the `System.Threading.Tasks.Task.ContinueWith*` method. This method creates a new task that is scheduled when another task completes. Some of the `System.Threading.Tasks.Task.ContinueWith*` overloads accept a cancellation token, continuation options, and a task scheduler for better control over the scheduling and execution of the continuation task.

- Use the `System.Threading.Tasks.TaskFactory.ContinueWhenAll*` and `System.Threading.Tasks.TaskFactory.ContinueWhenAny*` methods. These methods create a new task that is scheduled when all or any of a supplied set of tasks completes. These methods also provide overloads to control the scheduling and execution of these tasks.

In compute-bound tasks, the system can prevent the execution of a scheduled task if it receives a cancellation request before it starts running the task. As such, if you provide a cancellation token (`System.Threading.CancellationToken` object), you can pass that token to the asynchronous code that monitors the token. You can also provide the token to one of the previously mentioned methods such as `StartNew` or `Run` so that the `Task` runtime can also monitor the token.

For example, consider an asynchronous method that renders an image. The body of the task can poll the cancellation token so that the code exits early if a cancellation request arrives during rendering. In addition, if the cancellation request arrives before rendering starts, you want to prevent the rendering operation:

```csharp
internal static Task<Bitmap> RenderAsync(ImageData data, CancellationToken cancellationToken)
{
    return Task.Run(() =>
    {
        var bmp = new Bitmap(data.Width, data.Height);
        for (int y = 0; y < data.Height; y++)
        {
            cancellationToken.ThrowIfCancellationRequested();
            for (int x = 0; x < data.Width; x++)
            {
                // render pixel [x,y] into bmp
            }
        }
        return bmp;
    }, cancellationToken);
}
```
```vb
Friend Function RenderAsync(data As ImageData, cancellationToken As CancellationToken) As Task(Of Bitmap)
    Return Task.Run(Function()
                        Dim bmp As New Bitmap(data.Width, data.Height)
                        For y As Integer = 0 To data.Height - 1
                            cancellationToken.ThrowIfCancellationRequested()
                            For x As Integer = 0 To data.Width - 1
                                ' render pixel [x,y] into bmp
                            Next
                        Next
                        Return bmp
                    End Function, cancellationToken)
End Function
```
> **Note:**
> This sample uses `System.Drawing.Bitmap`, which requires the `System.Drawing.Common` package and is supported only on Windows. The compute-bound task pattern—using `Task.Run` with a `CancellationToken`—applies on all platforms; substitute a cross-platform imaging library for non-Windows targets.

Compute-bound tasks end in a `System.Threading.Tasks.TaskStatus.Canceled` state if at least one of the following conditions is true:

- A cancellation request arrives through the `System.Threading.CancellationToken` object, which is provided as an argument to the creation method (for example, `StartNew` or `Run`) before the task transitions to the `System.Threading.Tasks.TaskStatus.Running` state.

- An `System.OperationCanceledException` exception goes unhandled within the body of such a task. That exception contains the same `System.Threading.CancellationToken` that is passed to the task, and that token shows that cancellation is requested.

If another exception goes unhandled within the body of the task, the task ends in the `System.Threading.Tasks.TaskStatus.Faulted` state. Any attempts to wait on the task or access its result causes an exception to be thrown.

### I/O-bound tasks

To create a task that shouldn't directly use a thread for the entire execution, use the `System.Threading.Tasks.TaskCompletionSource`1` type. This type exposes a `System.Threading.Tasks.TaskCompletionSource`1.Task` property that returns an associated `System.Threading.Tasks.Task`1` instance. You control the life cycle of this task by using `System.Threading.Tasks.TaskCompletionSource`1` methods such as `System.Threading.Tasks.TaskCompletionSource`1.SetResult*`, `System.Threading.Tasks.TaskCompletionSource`1.SetException*`, `System.Threading.Tasks.TaskCompletionSource`1.SetCanceled*`, and their `TrySet` variants.

Suppose you want to create a task that completes after a specified period of time. For example, you might want to delay an activity in the user interface. The `System.Threading.Timer` class already provides the ability to asynchronously invoke a delegate after a specified period of time. By using `System.Threading.Tasks.TaskCompletionSource`1`, you can put a `System.Threading.Tasks.Task`1` front on the timer. For example:

```csharp
public static Task<DateTimeOffset> Delay(int millisecondsTimeout)
{
    TaskCompletionSource<DateTimeOffset>? tcs = null;
    Timer? timer = null;

    timer = new Timer(delegate
    {
        timer!.Dispose();
        tcs!.TrySetResult(DateTimeOffset.UtcNow);
    }, null, Timeout.Infinite, Timeout.Infinite);

    tcs = new TaskCompletionSource<DateTimeOffset>(timer);
    timer.Change(millisecondsTimeout, Timeout.Infinite);
    return tcs.Task;
}
```
```vb
Public Function Delay(millisecondsTimeout As Integer) As Task(Of DateTimeOffset)
    Dim tcs As TaskCompletionSource(Of DateTimeOffset) = Nothing
    Dim timer As Timer = Nothing

    timer = New Timer(Sub(obj)
                          timer.Dispose()
                          tcs.TrySetResult(DateTimeOffset.UtcNow)
                      End Sub, Nothing, Timeout.Infinite, Timeout.Infinite)

    tcs = New TaskCompletionSource(Of DateTimeOffset)(timer)
    timer.Change(millisecondsTimeout, Timeout.Infinite)
    Return tcs.Task
End Function
```
The `System.Threading.Tasks.Task.Delay*` method is provided for this purpose. You can use it inside another asynchronous method, for example, to implement an asynchronous polling loop:

```csharp
public static async Task Poll(Uri url, CancellationToken cancellationToken, IProgress<bool> progress)
{
    while (true)
    {
        await Task.Delay(TimeSpan.FromSeconds(10), cancellationToken);
        bool success = false;
        try
        {
            await DownloadStringAsync(url);
            success = true;
        }
        catch { /* ignore errors */ }
        progress.Report(success);
    }
}
```
```vb
Public Async Function Poll(url As Uri, cancellationToken As CancellationToken,
                           progress As IProgress(Of Boolean)) As Task
    Do While True
        Await Task.Delay(TimeSpan.FromSeconds(10), cancellationToken)
        Dim success As Boolean = False
        Try
            Await DownloadStringAsync(url)
            success = True
        Catch
            ' ignore errors
        End Try
        progress.Report(success)
    Loop
End Function
```
The `System.Threading.Tasks.TaskCompletionSource`1` class doesn't have a non-generic counterpart. However, `System.Threading.Tasks.Task`1` derives from `System.Threading.Tasks.Task`, so you can use the generic `System.Threading.Tasks.TaskCompletionSource`1` object for I/O-bound methods that simply return a task. To do this, use a source with a dummy `TResult` (`System.Boolean` is a good default choice, but if you're concerned about the user of the `System.Threading.Tasks.Task` downcasting it to a `System.Threading.Tasks.Task`1`, you can use a private `TResult` type instead). For example, the `Delay` method in the previous example returns the current time along with the resulting offset (`Task<DateTimeOffset>`). If such a result value is unnecessary, the method could instead be coded as follows (note the change of return type and the change of argument to `System.Threading.Tasks.TaskCompletionSource`1.TrySetResult*`):

```csharp
public static Task<bool> DelaySimple(int millisecondsTimeout)
{
    TaskCompletionSource<bool>? tcs = null;
    Timer? timer = null;

    timer = new Timer(delegate
    {
        timer!.Dispose();
        tcs!.TrySetResult(true);
    }, null, Timeout.Infinite, Timeout.Infinite);

    tcs = new TaskCompletionSource<bool>(timer);
    timer.Change(millisecondsTimeout, Timeout.Infinite);
    return tcs.Task;
}
```
```vb
Public Function DelaySimple(millisecondsTimeout As Integer) As Task(Of Boolean)
    Dim tcs As TaskCompletionSource(Of Boolean) = Nothing
    Dim timer As Timer = Nothing

    timer = New Timer(Sub(obj)
                          timer.Dispose()
                          tcs.TrySetResult(True)
                      End Sub, Nothing, Timeout.Infinite, Timeout.Infinite)

    tcs = New TaskCompletionSource(Of Boolean)(timer)
    timer.Change(millisecondsTimeout, Timeout.Infinite)
    Return tcs.Task
End Function
```
### Mixed compute-bound and I/O-bound tasks

Asynchronous methods aren't limited to just compute-bound or I/O-bound operations. They can represent a mixture of the two. In fact, you often combine multiple asynchronous operations into larger mixed operations. For example, the `RenderAsync` method in a previous example performs a computationally intensive operation to render an image based on some input `imageData`. This `imageData` could come from a web service that you asynchronously access:

```csharp
public static async Task<Bitmap> DownloadDataAndRenderImageAsync(CancellationToken cancellationToken)
{
    var imageData = await DownloadImageDataAsync(cancellationToken);
    return await RenderAsync(imageData, cancellationToken);
}
```
```vb
Public Async Function DownloadDataAndRenderImageAsync(cancellationToken As CancellationToken) As Task(Of Bitmap)
    Dim imageData As ImageData = Await DownloadImageDataAsync(cancellationToken)
    Return Await RenderAsync(imageData, cancellationToken)
End Function
```
> **Note:**
> This sample uses `System.Drawing.Bitmap`, which requires the `System.Drawing.Common` package and is supported only on Windows. The pattern of chaining an async download with an async compute-bound operation applies on all platforms; substitute a cross-platform imaging library for non-Windows targets.

This example also demonstrates how a single cancellation token can be threaded through multiple asynchronous operations. For more information, see the cancellation usage section in Consuming the Task-based Asynchronous Pattern.

## See also

- Task-based Asynchronous Pattern (TAP)
- Consuming the Task-based Asynchronous Pattern
- Interop with Other Asynchronous Patterns and Types
