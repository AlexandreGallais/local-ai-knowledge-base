---
title: "Consuming the Task-based Asynchronous Pattern (part 1 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/consuming-the-task-based-asynchronous-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Consuming the Task-based Asynchronous Pattern

When you use the Task-based Asynchronous Pattern (TAP) to work with asynchronous operations, you can use callbacks to achieve waiting without blocking. For tasks, this pattern uses methods such as `System.Threading.Tasks.Task.ContinueWith*`. Language-based asynchronous support hides callbacks by allowing asynchronous operations to be awaited within normal control flow, and compiler-generated code provides this same API-level support.

## Suspending Execution with Await

You can use the await keyword in C# and the Await Operator in Visual Basic to asynchronously await `System.Threading.Tasks.Task` and `System.Threading.Tasks.Task`1` objects. When you await a `System.Threading.Tasks.Task`, the `await` expression is of type `void`. When you await a `System.Threading.Tasks.Task`1`, the `await` expression is of type `TResult`. An `await` expression must occur inside the body of an asynchronous method.

 Under the covers, the await functionality installs a callback on the task by using a continuation. This callback resumes the asynchronous method at the point of suspension. When the asynchronous method is resumed, if the awaited operation completed successfully and was a `System.Threading.Tasks.Task`1`, its `TResult` is returned. If the `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` that was awaited ended in the `System.Threading.Tasks.TaskStatus.Canceled` state, an `System.OperationCanceledException` exception is thrown. If the `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` that was awaited ended in the `System.Threading.Tasks.TaskStatus.Faulted` state, the exception that caused it to fault is thrown. A `Task` can fault as a result of multiple exceptions, but only one of these exceptions is propagated. However, the `System.Threading.Tasks.Task.Exception` property returns an `System.AggregateException` exception that contains all the errors.

 If a synchronization context (`System.Threading.SynchronizationContext` object) is associated with the thread that was executing the asynchronous method at the time of suspension (for example, if the `System.Threading.SynchronizationContext.Current` property is not `null`), the asynchronous method resumes on that same synchronization context by using the context's `System.Threading.SynchronizationContext.Post*` method. Otherwise, it relies on the task scheduler (`System.Threading.Tasks.TaskScheduler` object) that was current at the time of suspension. Typically, this is the default task scheduler (`System.Threading.Tasks.TaskScheduler.Default*`), which targets the thread pool. This task scheduler determines whether the awaited asynchronous operation should resume where it completed or whether the resumption should be scheduled. The default scheduler typically allows the continuation to run on the thread that the awaited operation completed.

 When you call an asynchronous method, it synchronously executes the body of the function up until the first await expression on an awaitable instance that isn't yet complete, at which point the invocation returns to the caller. If the asynchronous method doesn't return `void`, it returns a `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` object to represent the ongoing computation. In a non-void asynchronous method, if a return statement is encountered or the end of the method body is reached, the task is completed in the `System.Threading.Tasks.TaskStatus.RanToCompletion` final state. If an unhandled exception causes control to leave the body of the asynchronous method, the task ends in the `System.Threading.Tasks.TaskStatus.Faulted` state. If that exception is an `System.OperationCanceledException`, the task instead ends in the `System.Threading.Tasks.TaskStatus.Canceled` state. In this manner, the result or exception is eventually published.

 Several important variations of this behavior exist. For performance reasons, if a task is already complete by the time the task is awaited, control isn't yielded, and the function continues to execute. Additionally, returning to the original context isn't always the desired behavior and can be changed; this behavior is described in more detail in the next section.

### Configuring Suspension and Resumption with Yield and ConfigureAwait

 Several methods provide more control over an asynchronous method's execution. For example, you can use the `System.Threading.Tasks.Task.Yield*` method to introduce a yield point into the asynchronous method:

```csharp
public class Task : …
{
    public static YieldAwaitable Yield();
    …
}
```

 This method is equivalent to asynchronously posting or scheduling back to the current context.

```csharp
public static async Task YieldLoopExample()
{
    await Task.Run(async delegate
    {
        for (int i = 0; i < 1000000; i++)
        {
            await Task.Yield(); // fork the continuation into a separate work item
        }
    });
}
```
```vb
Public Async Function YieldLoopExample() As Task
    Await Task.Run(Async Function()
                       For i As Integer = 0 To 999999
                           Await Task.Yield() ' fork the continuation into a separate work item
                       Next
                   End Function)
End Function
```
 You can also use the `System.Threading.Tasks.Task.ConfigureAwait*` method for better control over suspension and resumption in an asynchronous method. As mentioned previously, by default, the current context is captured at the time an asynchronous  method is suspended, and that captured context is used to invoke the asynchronous  method's continuation upon resumption. In many cases, this is the exact behavior you want. In other cases, you might not care about the continuation context, and you can achieve better performance by avoiding such posts back to the original context. To enable this behavior, use the `System.Threading.Tasks.Task.ConfigureAwait*` method to inform the await operation not to capture and resume on the context, but to continue execution wherever the asynchronous operation that was being awaited completed:

```csharp
await someTask.ConfigureAwait(continueOnCapturedContext:false);
```

### Awaitables, ConfigureAwait, and SynchronizationContext

`await` works with any type that satisfies the awaitable expression pattern, not just `System.Threading.Tasks.Task`. A type is awaitable if it provides a compatible `GetAwaiter` method that returns a type with `IsCompleted`, `OnCompleted`, and `GetResult` members. In most public APIs, return `System.Threading.Tasks.Task`, `System.Threading.Tasks.Task`1`, `System.Threading.Tasks.ValueTask`, or `System.Threading.Tasks.ValueTask`1`. Use custom awaitables only for specialized scenarios.

Use `System.Threading.Tasks.Task.ConfigureAwait*` when the continuation doesn't need the caller's context. In app code that updates a UI, context capture is often required. In reusable library code, `ConfigureAwait(false)` is usually preferred because it avoids unnecessary context hops and reduces deadlock risk for callers that block.

`ConfigureAwait(false)` changes continuation scheduling, not `System.Threading.ExecutionContext` flow. For a deeper explanation of context behavior, see ExecutionContext and SynchronizationContext.

## Canceling an asynchronous operation

TAP methods that support cancellation provide at least one overload that accepts a cancellation token (`System.Threading.CancellationToken` object).

 You create a cancellation token <example-value> a cancellation token <example-value> (`System.Threading.CancellationTokenSource` object). The source'<example-value>'s `System.Threading.CancellationTokenSource.Cancel*` method is called.

```csharp
var cts = new CancellationTokenSource();
string result = await DownloadStringTaskAsync(url, cts.Token);
… // at some point later, potentially on another thread
cts.Cancel();
```

 For example, if you want to download a single webpage and you want to be able to cancel the operation, create a `System.Threading.CancellationTokenSource` object, pass its token to the TAP method, and then call the source'<example-value>'re ready to cancel the operation:

```csharp
var cts = new CancellationTokenSource();
    IList<string> results = await Task.WhenAll(from url in urls select DownloadStringTaskAsync(url, cts.Token));
    // at some point later, potentially on another thread
    …
    cts.Cancel();
```

 Or, you can pass the same token to a selective subset of operations:

```csharp
var cts = new CancellationTokenSource();
    byte [] data = await DownloadDataAsync(url, cts.Token);
    await SaveToDiskAsync(outputPath, data, CancellationToken.None);
    … // at some point later, potentially on another thread
    cts.Cancel();
```

> **Important:**
> Any thread can initiate cancellation requests.

 You can pass the `System.Threading.CancellationToken.None*` value to any method that accepts a cancellation token to indicate that cancellation is never requested. This value causes the `System.Threading.CancellationToken.CanBeCanceled` property to return `false`, and the called method can optimize accordingly. For testing purposes, you can also pass in a pre-canceled cancellation token that is instantiated by using the constructor that accepts a Boolean value to indicate whether the token <example-value> start in an already-canceled or not-cancelable state.

 This approach to cancellation has several advantages:

- You can pass the same cancellation token to any number of asynchronous and synchronous operations.

- The same cancellation request can go to any number of listeners.

- The developer of the asynchronous API has complete control over whether cancellation can be requested and when it takes effect.

- The code that consumes the API can selectively determine the asynchronous invocations that cancellation requests go to.

## Monitoring progress

 Some asynchronous methods expose progress through a progress interface that you pass into the asynchronous method. For example, consider a function that asynchronously downloads a string of text, and along the way raises progress updates that include the percentage of the download that has completed thus far. You can consume such a method in a Windows Presentation Foundation (WPF) application as follows:

```csharp
private async void btnDownload_Click(object sender, RoutedEventArgs e)
{
    btnDownload.IsEnabled = false;
    try
    {
        txtResult.Text = await DownloadStringTaskAsync(txtUrl.Text,
            new Progress<int>(p => pbDownloadProgress.Value = p));
    }
    finally { btnDownload.IsEnabled = true; }
}
```
