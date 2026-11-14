---
title: "Cancellation in Managed Threads (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/threading/cancellation-in-managed-threads.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Cancellation in Managed Threads (part 3 of 3)

### Listen to multiple tokens simultaneously

 In some cases, a listener might have to listen to multiple cancellation tokens simultaneously. For example, a cancelable operation might have to monitor an internal cancellation token in addition to a token <example-value> in externally as an argument to a method parameter. To accomplish this, create a linked token <example-value> that can join two or more tokens into one token.

 The following example shows the most common use of a linked token: a child token that is cancelled when the parent token is cancelled. You can also cancel the child independently by calling `Cancel` on the child `CancellationTokenSource`.

```csharp
using System.Threading;

// Create the parent CancellationTokenSource.
using var parentCts = new CancellationTokenSource();
CancellationToken <example-value> = parentCts.Token;

// Create a linked child CancellationTokenSource.
// The child token is cancelled when the parent token is cancelled.
using var childCts = CancellationTokenSource.CreateLinkedTokenSource(parentToken);
CancellationToken <example-value> = childCts.Token;

Console.WriteLine($"<example-value>");
Console.WriteLine($"<example-value>");

// Cancel the parent.
parentCts.Cancel();

Console.WriteLine($"<example-value>");
Console.WriteLine($"<example-value>");

// Output:
// Parent is cancelled: False
// Child is cancelled: False
// Parent is cancelled: True
// Child is cancelled: True
```
```vb
Imports System.Threading

Module Program
    Sub Main()
        ' Create the parent CancellationTokenSource.
        Using parentCts As New CancellationTokenSource()
            Dim parentToken As CancellationToken = parentCts.Token

            ' Create a linked child CancellationTokenSource.
            ' The child token is cancelled when the parent token is cancelled.
            Using childCts As CancellationTokenSource = CancellationTokenSource.CreateLinkedTokenSource(parentToken)
                Dim childToken As CancellationToken = childCts.Token

                Console.WriteLine($"<example-value>")
                Console.WriteLine($"<example-value>")

                ' Cancel the parent.
                parentCts.Cancel()

                Console.WriteLine($"<example-value>")
                Console.WriteLine($"<example-value>")
            End Using
        End Using
    End Sub
End Module
' Output:
' Parent is cancelled: False
' Child is cancelled: False
' Parent is cancelled: True
' Child is cancelled: True
```
 A more complex scenario involves a cancelable operation that must monitor both an external token <example-value> in from a caller and an internal token. The following example shows how to create such a linked token.

 ```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

class LinkedTokenSourceDemo
{
    static void Main()
    {
        WorkerWithTimer worker = new WorkerWithTimer();
        CancellationTokenSource cts = new CancellationTokenSource();

        // Task for UI thread, so we can call Task.Wait wait on the main thread.
        Task.Run(() =>
        {
            Console.WriteLine("Press 'c' to cancel within 3 seconds after work begins.");
            Console.WriteLine("Or let the task time out by doing nothing.");
            if (Console.ReadKey(true).KeyChar == 'c')
                cts.Cancel();
        });

        // Let the user read the UI message.
        Thread.Sleep(1000);

        // Start the worker task.
        Task task = Task.Run(() => worker.DoWork(cts.Token), cts.Token);

        try
        {
            task.Wait(cts.Token);
        }
        catch (OperationCanceledException e)
        {
            if (e.CancellationToken == cts.Token)
                Console.WriteLine("Canceled from UI thread throwing OCE.");
        }
        catch (AggregateException ae)
        {
            Console.WriteLine("AggregateException caught: " + ae.InnerException);
            foreach (var inner in ae.InnerExceptions)
            {
                Console.WriteLine(inner.Message + inner.Source);
            }
        }

        Console.WriteLine("Press any key to exit.");
        Console.ReadKey();
        cts.Dispose();
    }
}

class WorkerWithTimer
{
    CancellationTokenSource internalTokenSource = new CancellationTokenSource();
    CancellationToken <example-value>;
    CancellationToken <example-value>;
    Timer timer;

    public WorkerWithTimer()
    {
        // A toy cancellation trigger that times out after 3 seconds
        // if the user does not press 'c'.
        timer = new Timer(new TimerCallback(CancelAfterTimeout), null, 3000, 3000);
    }

    public void DoWork(CancellationToken <example-value>)
    {
        // Create a new token that combines the internal and external tokens.
        this.internalToken = internalTokenSource.Token;
        this.externalToken = <example-value>;

        using (CancellationTokenSource linkedCts =
                CancellationTokenSource.CreateLinkedTokenSource(internalToken, externalToken))
        {
            try
            {
                DoWorkInternal(linkedCts.Token);
            }
            catch (OperationCanceledException)
            {
                if (internalToken.IsCancellationRequested)
                {
                    Console.WriteLine("Operation timed out.");
                }
                else if (externalToken.IsCancellationRequested)
                {
                    Console.WriteLine("Cancelling per user request.");
                    externalToken.ThrowIfCancellationRequested();
                }
            }
        }
    }

    private void DoWorkInternal(CancellationToken token)
    {
        for (int i = 0; i < 1000; i++)
        {
            if (token.IsCancellationRequested)
            {
                // We need to dispose the timer if cancellation
                // was requested by the external token.
                timer.Dispose();

                // Throw the exception.
                token.ThrowIfCancellationRequested();
            }

            // Simulating work.
            Thread.SpinWait(7500000);
            Console.Write("working... ");
        }
    }

    public void CancelAfterTimeout(object? state)
    {
        Console.WriteLine("\r\nTimer fired.");
        internalTokenSource.Cancel();
        timer.Dispose();
    }
}
```

 Notice that you must call `Dispose` on the linked token <example-value> when you're done with it. For a more complete example, see How to: Listen for Multiple Cancellation Requests.

## Cooperation Between Library Code and User Code

 The unified cancellation framework makes it possible for library code to cancel user code, and for user code to cancel library code in a cooperative manner. Smooth cooperation depends on each side following these guidelines:

- If library code provides cancelable operations, it should also provide public methods that accept an external cancellation token so that user code can request cancellation.

- If library code calls into user code, the library code should interpret an OperationCanceledException(externalToken) as *cooperative cancellation*, and not necessarily as a failure exception.

- User-delegates should attempt to respond to cancellation requests from library code in a timely manner.

 `System.Threading.Tasks.Task` and `System.Linq.ParallelEnumerable` are examples of classes that follow these guidelines. For more information, see Task Cancellation and How to: Cancel a PLINQ Query.

## See also

- Managed Threading Basics
