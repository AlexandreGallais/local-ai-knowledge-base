---
title: "Task Cancellation"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/task-cancellation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Task cancellation

The `System.Threading.Tasks.Task` and `System.Threading.Tasks.Task`1` classes support cancellation by using cancellation tokens. For more information, see Cancellation in Managed Threads. In the Task classes, cancellation involves cooperation between the user delegate, which represents a cancelable operation, and the code that requested the cancellation. A successful cancellation involves the requesting code calling the `System.Threading.CancellationTokenSource.Cancel*` method and the user delegate terminating the operation in a timely manner. You can terminate the operation by using one of these options:

- By returning from the delegate. In many scenarios, this option is sufficient. However, a task instance that's canceled in this way transitions to the `System.Threading.Tasks.TaskStatus.RanToCompletion` state, not to the `System.Threading.Tasks.TaskStatus.Canceled` state.

- By throwing an `System.OperationCanceledException` and passing it the token on which cancellation was requested. The preferred way to perform is to use the `System.Threading.CancellationToken.ThrowIfCancellationRequested*` method. A task that's canceled in this way transitions to the Canceled state, which the calling code can use to verify that the task responded to its cancellation request.

 The following example shows the basic <example-value> for task cancellation that throws the exception:

>**Note:**
> The token is passed to the user delegate and the task instance.

 ```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var tokenSource2 = new CancellationTokenSource();
        CancellationToken ct = tokenSource2.Token;

        var task = Task.Run(() =>
        {
            // Were we already canceled?
            ct.ThrowIfCancellationRequested();

            bool moreToDo = true;
            while (moreToDo)
            {
                // Poll on this property if you have to do
                // other cleanup before throwing.
                if (ct.IsCancellationRequested)
                {
                    // Clean up here, then...
                    ct.ThrowIfCancellationRequested();
                }
            }
        }, tokenSource2.Token); // Pass same token to Task.Run.

        tokenSource2.Cancel();

        // Just continue on this thread, or await with try-catch:
        try
        {
            await task;
        }
        catch (OperationCanceledException e)
        {
            Console.WriteLine($"{nameof(OperationCanceledException)} thrown with message: {e.Message}");
        }
        finally
        {
            tokenSource2.Dispose();
        }

        Console.ReadKey();
    }
}
```

 For a complete example, see How to: Cancel a Task and Its Children.

 When a task instance observes an `System.OperationCanceledException` thrown by the user code, it compares the exception'<example-value>'s `System.Threading.CancellationToken.IsCancellationRequested` property returns `true`, the task interprets this as acknowledging cancellation and transitions to the Canceled state. If you don't use a `System.Threading.Tasks.Task.Wait*` or `System.Threading.Tasks.Task.WaitAll*` method to wait for the task, then the task just sets its status to `System.Threading.Tasks.TaskStatus.Canceled`.

 If you're waiting on a Task that transitions to the Canceled state, a `System.Threading.Tasks.TaskCanceledException` exception (wrapped in an `System.AggregateException` exception) is thrown. This exception indicates successful cancellation instead of a faulty situation. Therefore, the task's `System.Threading.Tasks.Task.Exception` property returns `null`.

 If the token'<example-value>'s token doesn'<example-value>'s token, the `System.OperationCanceledException` is treated like a normal exception, causing the Task to transition to the Faulted state. The presence of other exceptions will also cause the Task to transition to the Faulted state. You can get the status of the completed task in the `System.Threading.Tasks.Task.Status` property.

 It's possible that a task might continue to process some items after cancellation is requested.

## See also

- Cancellation in Managed Threads
- How to: Cancel a Task and Its Children
