---
title: "How to: Listen for Cancellation Requests by Polling"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/threading/how-to-listen-for-cancellation-requests-by-polling.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Listen for Cancellation Requests by Polling

The following example shows one way that user code can poll a cancellation token at regular intervals to see whether cancellation has been requested from the calling thread. This example uses the `System.Threading.Tasks.Task` type, but the same pattern applies to asynchronous operations created directly by the `System.Threading.ThreadPool` type or the `System.Threading.Thread` type.

## Example

 Polling requires some kind of loop or recursive code that can periodically read the value of the Boolean `System.Threading.CancellationToken.IsCancellationRequested` property. If you are using the `System.Threading.Tasks.Task` type and you are waiting for the task to complete on the calling thread, you can use the `System.Threading.CancellationToken.ThrowIfCancellationRequested*` method to check the property and throw the exception. By using this method, you ensure that the correct exception is thrown in response to a request. If you are using a `System.Threading.Tasks.Task`, then calling this method is better than manually throwing an `System.OperationCanceledException`. If you do not have to throw the exception, then you can just check the property and return from the method if the property is `true`.

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

 Calling `System.Threading.CancellationToken.ThrowIfCancellationRequested*` is extremely fast and does not introduce significant overhead in loops.

 If you are calling `System.Threading.CancellationToken.ThrowIfCancellationRequested*`, you only have to explicitly check the `System.Threading.CancellationToken.IsCancellationRequested` property if you have other work to do in response to the cancellation besides throwing the exception. In this example, you can see that the code actually accesses the property twice: once in the explicit access and again in the `System.Threading.CancellationToken.ThrowIfCancellationRequested*` method. But because the act of reading the `System.Threading.CancellationToken.IsCancellationRequested` property involves only one volatile read instruction per access, the double access is not significant from a performance perspective. It is still preferable to call the method rather than manually throw the `System.OperationCanceledException`.

## See also

- Cancellation in Managed Threads
