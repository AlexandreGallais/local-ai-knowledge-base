---
title: "How to: use SpinLock for low-level synchronization"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/threading/how-to-use-spinlock-for-low-level-synchronization.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: use SpinLock for low-level synchronization

The following example demonstrates how to use a `System.Threading.SpinLock`. In this example, the critical section performs a minimal amount of work, which makes it a good candidate for a `System.Threading.SpinLock`. Increasing the work a small amount increases the performance of the `System.Threading.SpinLock` compared to a standard lock. However, there is a point at which a SpinLock becomes more expensive than a standard lock. You can use the concurrency profiling functionality in the profiling tools to see which type of lock provides better performance in your program. For more information, see Concurrency Visualizer.

 ```csharp
using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SpinLockDemo
{
    // C#
    public class SpinLockTest
    {
        // Specify true to enable thread tracking. This will cause
        // exception to be thrown when the first thread attempts to reenter the lock.
        // Specify false to cause deadlock due to coding error below.
        private static SpinLock _spinLock = new SpinLock(true);

        static void Main()
        {
            Parallel.Invoke(
                () => DoWork(),
                () => DoWork(),
                () => DoWork(),
                () => DoWork()
                );

            Console.WriteLine("Press any key.");
            Console.ReadKey();
        }

        public static void DoWork()
        {
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < 100; i++)
            {

                bool lockTaken = false;

                try
                {
                    _spinLock.Enter(ref lockTaken);

                    // do work here protected by the lock
                    Thread.SpinWait(50000);
                    sb.Append(Thread.CurrentThread.ManagedThreadId);
                    sb.Append(" Entered-");
                }
                catch (LockRecursionException ex)
                {
                    Console.WriteLine($"Thread {Thread.CurrentThread.ManagedThreadId} attempted to reenter the lock");
                    throw;
                }
                finally
                {
                    // INTENTIONAL CODING ERROR TO DEMONSTRATE THREAD TRACKING!
                    // UNCOMMENT THE LINES FOR CORRECT SPINLOCK BEHAVIOR
                    // Commenting out these lines causes the same thread
                    // to attempt to reenter the lock. If the SpinLock was
                    // created with thread tracking enabled, the exception
                    // is thrown. Otherwise the spinlock deadlocks.
                    if (lockTaken)
                    {
                       // _spinLock.Exit(false);
                       // sb.Append("Exited ");
                    }
                }

                // Output for diagnostic display.
                if(i % 4 != 0)
                    Console.Write(sb.ToString());
                else
                    Console.WriteLine(sb.ToString());
                sb.Clear();
            }
        }
    }
}

    class SpinLockDemo2
    {
        const int N = 100000;
        static Queue<Data> _queue = new Queue<Data>();
        static object _lock = new Object();
        static SpinLock _spinlock = new SpinLock();

        class Data
        {
            public string Name { get; set; }
            public double Number { get; set; }
        }
        static void Main(string[] args)
        {

            // First use a standard lock for comparison purposes.
            UseLock();
            _queue.Clear();
            UseSpinLock();

            Console.WriteLine("Press a key");
            Console.ReadKey();
        }

        private static void UpdateWithSpinLock(Data d, int i)
        {
            bool lockTaken = false;
            try
            {
                _spinlock.Enter(ref lockTaken);
                _queue.Enqueue( d );
            }
            finally
            {
                if (lockTaken) _spinlock.Exit(false);
            }
        }

        private static void UseSpinLock()
        {

              Stopwatch sw = Stopwatch.StartNew();

              Parallel.Invoke(
                      () => {
                          for (int i = 0; i < N; i++)
                          {
                              UpdateWithSpinLock(new Data() { Name = i.ToString(), Number = i }, i);
                          }
                      },
                      () => {
                          for (int i = 0; i < N; i++)
                          {
                              UpdateWithSpinLock(new Data() { Name = i.ToString(), Number = i }, i);
                          }
                      }
                  );
              sw.Stop();
              Console.WriteLine($"elapsed ms with spinlock: {sw.ElapsedMilliseconds}");
        }

        static void UpdateWithLock(Data d, int i)
        {
            lock (_lock)
            {
                _queue.Enqueue(d);
            }
        }

        private static void UseLock()
        {
            Stopwatch sw = Stopwatch.StartNew();

            Parallel.Invoke(
                    () => {
                        for (int i = 0; i < N; i++)
                        {
                            UpdateWithLock(new Data() { Name = i.ToString(), Number = i }, i);
                        }
                    },
                    () => {
                        for (int i = 0; i < N; i++)
                        {
                            UpdateWithLock(new Data() { Name = i.ToString(), Number = i }, i);
                        }
                    }
                );
            sw.Stop();
            Console.WriteLine($"elapsed ms with lock: {sw.ElapsedMilliseconds}");
        }
    }

    // In snippet02, the problem is actually more suited to data parallelism,
    // but that didn't show much perf benefit for spinlock.
    class ExtraForSnippet4
    {
        static void ParallelForWithLock()
        {
            //Parallel.For(0, _table.Length, (i) =>
            //{
            //    UpdateWithLock(new Data() { Name = i.ToString(), Number = i }, i);
            //}
            // );
            //sw.Stop();
            // Console.WriteLine($"elapsed ms with lock: {sw.ElapsedMilliseconds}");
        }

        static void ParallelForwithSpinLock()
        {

            //Parallel.For(0, _table.Length, (i) =>
            //    {
            //        UpdateWithSpinLock(new Data() { Name = i.ToString(), Number = i }, i);
            //    }
            //  );

          //  Task.Factory.ContinueWhenAll(
        }
    }
```

 `System.Threading.SpinLock` might be useful when a lock on a shared resource is not going to be held for very long. In such cases, on multi-core computers it can be efficient for the blocked thread to spin for a few cycles until the lock is released. By spinning, the thread does not become blocked, which is a CPU-intensive process. `System.Threading.SpinLock` will stop spinning under certain conditions to prevent starvation of logical processors or priority inversion on systems with Hyper-Threading.

 This example uses the `System.Collections.Generic.Queue`1` class, which requires user synchronization for multi-threaded access. Another option is to use the `System.Collections.Concurrent.ConcurrentQueue`1`, which does not require any user locks.

 Note the use of `false` in the call to `System.Threading.SpinLock.Exit*`. This provides the best performance. Specify `true` on IA64 architectures to use the memory fence, which flushes the write buffers to ensure that the lock is now available for other threads to enter.

## See also

- Threading objects and features
- lock statement (C#)
- SyncLock statement (Visual Basic)
