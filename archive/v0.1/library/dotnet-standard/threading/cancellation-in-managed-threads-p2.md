---
title: "Cancellation in Managed Threads (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/threading/cancellation-in-managed-threads.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Cancellation in Managed Threads (part 2 of 3)

## Listening and Responding to Cancellation Requests

 In the user delegate, the implementer of a cancelable operation determines how to terminate the operation in response to a cancellation request. In many cases, the user delegate can just perform any required cleanup and then return immediately.

 However, in more complex cases, it might be necessary for the user delegate to notify library code that cancellation has occurred. In such cases, the correct way to terminate the operation is for the delegate to call the `System.Threading.CancellationToken.ThrowIfCancellationRequested*`, method, which will cause an `System.OperationCanceledException` to be thrown. Library code can catch this exception on the user delegate thread and examine the exception's token to determine whether the exception indicates cooperative cancellation or some other exceptional situation.

 The `System.Threading.Tasks.Task` class handles `System.OperationCanceledException` in this way. For more information, see Task Cancellation.

### Listening by Polling

 For long-running computations that loop or recurse, you can listen for a cancellation request by periodically polling the value of the `System.Threading.CancellationToken.IsCancellationRequested` property. If its value is `true`, the method should clean up and terminate as quickly as possible. The optimal frequency of polling depends on the type of application. It is up to the developer to determine the best polling frequency for any given program. Polling itself does not significantly impact performance. The following example shows one possible way to poll.

 ```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

public struct Rectangle
{
   public int columns;
   public int rows;
}

class CancelByPolling
{
   static void Main()
   {
      var tokenSource = new CancellationTokenSource();
      // Toy object for demo purposes
      Rectangle rect = new Rectangle() { columns = 1000, rows = 500 };

      // Simple cancellation scenario #1. Calling thread does not wait
      // on the task to complete, and the user delegate simply returns
      // on cancellation request without throwing.
      Task.Run(() => NestedLoops(rect, tokenSource.Token), tokenSource.Token);

      // Simple cancellation scenario #2. Calling thread does not wait
      // on the task to complete, and the user delegate throws
      // OperationCanceledException to shut down task and transition its state.
      // Task.Run(() => PollByTimeSpan(tokenSource.Token), tokenSource.Token);

      Console.WriteLine("Press 'c' to cancel");
      if (Console.ReadKey(true).KeyChar == 'c') {
          tokenSource.Cancel();
          Console.WriteLine("Press any key to exit.");
      }

      Console.ReadKey();
      tokenSource.Dispose();
  }

   static void NestedLoops(Rectangle rect, CancellationToken token)
   {
      for (int col = 0; col < rect.columns && !token.IsCancellationRequested; col++) {
         // Assume that we know that the inner loop is very fast.
         // Therefore, polling once per column in the outer loop condition
         // is sufficient.
         for (int row = 0; row < rect.rows; row++) {
            // Simulating work.
            Thread.SpinWait(5_000);
            Console.Write("{0},{1} ", col, row);
         }
      }

      if (token.IsCancellationRequested) {
         // Cleanup or undo here if necessary...
         Console.WriteLine("\r\nOperation canceled");
         Console.WriteLine("Press any key to exit.");

         // If using Task:
         // token.ThrowIfCancellationRequested();
      }
   }
}
```

 For a more complete example, see How to: Listen for Cancellation Requests by Polling.

### Listening by Registering a Callback

 Some operations can become blocked in such a way that they cannot check the value of the cancellation token in a timely manner. For these cases, you can register a callback method that unblocks the method when a cancellation request is received.

 The `System.Threading.CancellationToken.Register*` method returns a `System.Threading.CancellationTokenRegistration` object that is used specifically for this purpose. The following example shows how to use the `System.Threading.CancellationToken.Register*` method to cancel an asynchronous web request.

 ```csharp
using System;
using System.Net.Http;
using System.Threading;

class Example4
{
    static void Main()
    {
        CancellationTokenSource cts = new CancellationTokenSource();

        StartWebRequest(cts.Token);

        // Cancellation will cause the web
        // request to be cancelled.
        cts.Cancel();
    }

    static void StartWebRequest(CancellationToken token)
    {
        var client = new HttpClient();

        token.Register(() =>
        {
            client.CancelPendingRequests();
            Console.WriteLine("Request cancelled!");
        });

        Console.WriteLine("Starting request.");
        client.GetStringAsync(new Uri("http://www.contoso.com"));
    }
}
```

 The `System.Threading.CancellationTokenRegistration` object manages thread synchronization and ensures that the callback will stop executing at a precise point in time.

 In order to ensure system responsiveness and to avoid deadlocks, the following guidelines must be followed when registering callbacks:

- The callback method should be fast because it is called synchronously and therefore the call to `System.Threading.CancellationTokenSource.Cancel*` does not return until the callback returns.

- If you call `System.Threading.CancellationTokenRegistration.Dispose*` while the callback is running, and you hold a lock that the callback is waiting on, your program can deadlock. After `Dispose` returns, you can free any resources required by the callback.

- Callbacks should not perform any manual thread or `System.Threading.SynchronizationContext` usage in a callback. If a callback must run on a particular thread, use the `System.Threading.CancellationTokenRegistration` constructor that enables you to specify that the target syncContext is the active `System.Threading.SynchronizationContext.Current*`. Performing manual threading in a callback can cause deadlock.

 For a more complete example, see How to: Register Callbacks for Cancellation Requests.

### Listening by Using a Wait Handle

 When a cancelable operation can block while it waits on a synchronization primitive such as a `System.Threading.ManualResetEvent` or `System.Threading.Semaphore`, you can use the `System.Threading.CancellationToken.WaitHandle` property to enable the operation to wait on both the event and the cancellation request. The wait handle of the cancellation token will become signaled in response to a cancellation request, and the method can use the return value of the `System.Threading.WaitHandle.WaitAny*` method to determine whether it was the cancellation token that signaled. The operation can then just exit, or throw an `System.OperationCanceledException`, as appropriate.

 ```csharp
﻿// How to: Cancel by using a WaitHandle

using System;
using System.Threading;
using System.Threading.Tasks;

class CancelOldStyleEvents
{
    // Old-style MRE that doesn't support unified cancellation.
    static ManualResetEvent mre = new ManualResetEvent(false);

    static void Main()
    {
        var cts = new CancellationTokenSource();

        // Pass the same token <example-value> to the delegate and to the task instance.
        Task.Run(() => DoWork(cts.Token), cts.Token);
        Console.WriteLine("Press s to start/restart, p to pause, or c to cancel.");
        Console.WriteLine("Or any other key to exit.");

        // Old-style UI thread.
        bool goAgain = true;
        while (goAgain)
        {
            char ch = Console.ReadKey(true).KeyChar;

            switch (ch)
            {
                case 'c':
                    cts.Cancel();
                    break;
                case 'p':
                    mre.Reset();
                    break;
                case 's':
                    mre.Set();
                    break;
                default:
                    goAgain = false;
                    break;
            }

            Thread.Sleep(100);
        }
        cts.Dispose();
    }

    static void DoWork(CancellationToken token)
    {
        while (true)
        {
            // Wait on the event if it is not signaled.
            int eventThatSignaledIndex =
                   WaitHandle.WaitAny(new WaitHandle[] { mre, token.WaitHandle },
                                      new TimeSpan(0, 0, 20));

            // Were we canceled while waiting?
            if (eventThatSignaledIndex == 1)
            {
                Console.WriteLine("The wait operation was canceled.");
                throw new OperationCanceledException(token);
            }
            // Were we canceled while running?
            else if (token.IsCancellationRequested)
            {
                Console.WriteLine("I was canceled while running.");
                token.ThrowIfCancellationRequested();
            }
            // Did we time out?
            else if (eventThatSignaledIndex == WaitHandle.WaitTimeout)
            {
                Console.WriteLine("I timed out.");
                break;
            }
            else
            {
                Console.Write("Working... ");
                // Simulating work.
                Thread.SpinWait(5000000);
            }
        }
    }
}
```

`System.Threading.ManualResetEventSlim` and `System.Threading.SemaphoreSlim` both support the cancellation framework in their `Wait` methods. You can pass the `System.Threading.CancellationToken` to the method, and when the cancellation is requested, the event wakes up and throws an `System.OperationCanceledException`.

 ```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

class CancelNewStyleEvents
{
   // New-style MRESlim that supports unified cancellation
   // in its Wait methods.
   static ManualResetEventSlim mres = new ManualResetEventSlim(false);

   static void Main()
   {
      var cts = new CancellationTokenSource();

      // Pass the same token <example-value> to the delegate and to the task instance.
      Task.Run(() => DoWork(cts.Token), cts.Token);
      Console.WriteLine("Press c to cancel, p to pause, or s to start/restart,");
      Console.WriteLine("or any other key to exit.");

      // New-style UI thread.
         bool goAgain = true;
         while (goAgain)
         {
             char ch = Console.ReadKey(true).KeyChar;

             switch (ch)
             {
                 case 'c':
                     // Token can only be canceled once.
                     cts.Cancel();
                     break;
                 case 'p':
                     mres.Reset();
                     break;
                 case 's':
                     mres.Set();
                     break;
                 default:
                     goAgain = false;
                     break;
             }

             Thread.Sleep(100);
         }
         cts.Dispose();
     }

     static void DoWork(CancellationToken token)
     {

         while (true)
         {
             if (token.IsCancellationRequested)
             {
                 Console.WriteLine("Canceled while running.");
                 token.ThrowIfCancellationRequested();
             }

             // Wait on the event to be signaled
             // or the token to be canceled,
             // whichever comes first. The token
             // will throw an exception if it is canceled
             // while the thread is waiting on the event.
             try
             {
                 // mres is a ManualResetEventSlim
                 mres.Wait(token);
             }
             catch (OperationCanceledException)
             {
                 // Throw immediately to be responsive. The
                 // alternative is to do one more item of work,
                 // and throw on next iteration, because
                 // IsCancellationRequested will be true.
                 Console.WriteLine("The wait operation was canceled.");
                 throw;
             }

             Console.Write("Working...");
             // Simulating work.
             Thread.SpinWait(500000);
         }
     }
 }
```

 For a more complete example, see How to: Listen for Cancellation Requests That Have Wait Handles.
