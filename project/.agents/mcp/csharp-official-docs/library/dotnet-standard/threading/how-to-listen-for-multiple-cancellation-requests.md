---
title: "How to: Listen for Multiple Cancellation Requests"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/threading/how-to-listen-for-multiple-cancellation-requests.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Listen for Multiple Cancellation Requests

This example shows how to listen to two cancellation tokens simultaneously so that you can cancel an operation if either token <example-value> it.

> **Note:**
> When "Just My Code" is enabled, Visual Studio in some cases will break on the line that throws the exception and display an error message that says "exception not handled by user code." This error is benign. You can press F5 to continue from it, and see the exception-handling behavior that is demonstrated in the examples below. To prevent Visual Studio from breaking on the first error, just uncheck the "Just My Code" checkbox under **Tools, Options, Debugging, General**.

## Example

 In the following example, the `System.Threading.CancellationTokenSource.CreateLinkedTokenSource*` method is used to join two tokens into one token. This enables the token to be passed to methods that take just one cancellation token as an argument. The example demonstrates a common scenario in which a method must observe both a token <example-value> in from outside the class, and a token <example-value> inside the class.

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

 When the linked token <example-value> an `System.OperationCanceledException`, the token that is passed to the exception is the linked token, not either of the predecessor tokens. To determine which of the tokens was canceled, check the status of the predecessor tokens directly.

 In this example, `System.AggregateException` should never be thrown, but it is caught here because in real-world scenarios any other exceptions besides `System.OperationCanceledException` that are thrown from the task delegate are wrapped in an `System.AggregateException`.

## See also

- Cancellation in Managed Threads
