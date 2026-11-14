---
title: "How to: Use SpinWait to Implement a Two-Phase Wait Operation"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/threading/how-to-use-spinwait-to-implement-a-two-phase-wait-operation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Use SpinWait to Implement a Two-Phase Wait Operation

The following example shows how to use a `System.Threading.SpinWait` object to implement a two-phase wait operation. In the first phase, the synchronization object, a `Latch`, spins for a few cycles while it checks whether the lock has become available. In the second phase, if the lock becomes available, then the `Wait` method returns without using the `System.Threading.ManualResetEvent` to perform its wait; otherwise, `Wait` performs the wait.

## Example

 This example shows a very basic <example-value> of a Latch synchronization primitive. You can use this data structure when wait times are expected to be very short. This example is for demonstration purposes only. If you require latch-type functionality in your program, consider using `System.Threading.ManualResetEventSlim`.

 ```csharp
#define LOGGING

using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;

class Latch
{
   private object latchLock = new object();
   // 0 = unset, 1 = set.
   private int m_state = 0;
   private volatile int totalKernelWaits = 0;

   // Block threads waiting for ManualResetEvent.
   private ManualResetEvent m_ev = new ManualResetEvent(false);
#if LOGGING
   // For fast logging with minimal impact on latch behavior.
   // Spin counts greater than 20 might be encountered depending on machine config.
   private long[] spinCountLog = new long[20];

   public void DisplayLog()
   {
      for (int i = 0; i < spinCountLog.Length; i++)
      {
          Console.WriteLine($"Wait succeeded with spin count of {i} on {spinCountLog[i]:N0} attempts");
      }
      Console.WriteLine($"Wait used the kernel event on {totalKernelWaits:N0} attempts.");
      Console.WriteLine("Logging complete");
   }
#endif

   public void Set()
   {
      lock(latchLock) {
         m_state = 1;
         m_ev.Set();
      }
   }

   public void Wait()
   {
      Trace.WriteLine("Wait timeout infinite");
      Wait(Timeout.Infinite);
   }

   public bool Wait(int timeout)
   {
      SpinWait spinner = new SpinWait();
      Stopwatch watch;

      while (m_state == 0)
      {
          // Lazily allocate and start stopwatch to track timeout.
          watch = Stopwatch.StartNew();

          // Spin only until the SpinWait is ready
          // to initiate its own context switch.
          if (!spinner.NextSpinWillYield)
          {
              spinner.SpinOnce();
          }
          // Rather than let SpinWait do a context switch now,
          //  we initiate the kernel Wait operation, because
          // we plan on doing this anyway.
          else
          {
              Interlocked.Increment(ref totalKernelWaits);
              // Account for elapsed time.
              long realTimeout = timeout - watch.ElapsedMilliseconds;

              // Do the wait.
              if (realTimeout <= 0 || !m_ev.WaitOne((int)realTimeout))
              {
                  Trace.WriteLine("wait timed out.");
                  return false;
              }
          }
      }

#if LOGGING
      Interlocked.Increment(ref spinCountLog[spinner.Count]);
#endif
      // Take the latch.
      Interlocked.Exchange(ref m_state, 0);

      return true;
   }
}

class Example
{
   static Latch latch = new Latch();
   static int count = 2;
   static CancellationTokenSource cts = new CancellationTokenSource();

   static void TestMethod()
   {
      while (!cts.IsCancellationRequested)
      {
         // Obtain the latch.
         if (latch.Wait(50))
         {
            // Do the work. Here we vary the workload a slight amount
            // to help cause varying spin counts in latch.
            double d = 0;
            if (count % 2 != 0) {
               d = Math.Sqrt(count);
            }
            Interlocked.Increment(ref count);

            // Release the latch.
            latch.Set();
         }
      }
   }

   static void Main()
   {
      // Demonstrate latch with a simple scenario: multiple
      // threads updating a shared integer. Both operations
      // are relatively fast, which enables the latch to
      // demonstrate successful waits by spinning only.
      latch.Set();

      // UI thread. Press 'c' to cancel the loop.
      Task.Factory.StartNew(() =>
      {
         Console.WriteLine("Press 'c' to cancel.");
         if (Console.ReadKey(true).KeyChar == 'c') {
            cts.Cancel();
         }
      });

      Parallel.Invoke( () => TestMethod(),
                       () => TestMethod(),
                       () => TestMethod() );

#if LOGGING
      latch.DisplayLog();
      if (cts != null) cts.Dispose();
#endif
   }
}
```

 The latch uses the `System.Threading.SpinWait` object to spin in place only until the next call to `SpinOnce` causes the `System.Threading.SpinWait` to yield the time slice of the thread. At that point, the latch causes its own context switch by calling `System.Threading.WaitHandle.WaitOne*` on the `System.Threading.ManualResetEvent` and passing in the remainder of the time-out value.

 The logging output shows how often the Latch was able to increase performance by acquiring the lock without using the `System.Threading.ManualResetEvent`.

## See also

- SpinWait
- Threading Objects and Features
