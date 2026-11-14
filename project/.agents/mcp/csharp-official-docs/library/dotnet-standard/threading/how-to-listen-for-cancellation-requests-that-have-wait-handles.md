---
title: "How to: Listen for Cancellation Requests That Have Wait Handles"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/threading/how-to-listen-for-cancellation-requests-that-have-wait-handles.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Listen for Cancellation Requests That Have Wait Handles

If a method is blocked while it is waiting for an event to be signaled, it cannot check the value of the cancellation token and respond in a timely manner. The first example shows how to solve this problem when you are working with events such as `System.Threading.ManualResetEvent` that do not natively support the unified cancellation framework. The second example shows a more streamlined approach that uses `System.Threading.ManualResetEventSlim`, which does support unified cancellation.

> **Note:**
> When "Just My Code" is enabled, Visual Studio in some cases will break on the line that throws the exception and display an error message that says "exception not handled by user code." This error is benign. You can press F5 to continue from it, and see the exception-handling behavior that is demonstrated in the examples below. To prevent Visual Studio from breaking on the first error, just uncheck the "Just My Code" checkbox under **Tools, Options, Debugging, General**.

## Example 1

 The following example uses a `System.Threading.ManualResetEvent` to demonstrate how to unblock wait handles that do not support unified cancellation.

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

## Example 2

 The following example uses a `System.Threading.ManualResetEventSlim` to demonstrate how to unblock coordination primitives that do support unified cancellation. The same approach can be used with other lightweight coordination primitives, such as `System.Threading.Semaphore``Slim` and `System.Threading.CountdownEvent`.

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

## See also

- Cancellation in Managed Threads
