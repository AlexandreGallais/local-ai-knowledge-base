---
title: "Potential Pitfalls in Data and Task Parallelism (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/potential-pitfalls-in-data-and-task-parallelism.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Potential Pitfalls in Data and Task Parallelism (part 2 of 2)

## Avoid Executing Parallel Loops on the UI Thread

 It is important to keep your application's user interface (UI) responsive. If an operation contains enough work to warrant parallelization, then it likely should not be run on the UI thread.  Instead, it should offload that operation to be run on a background thread. For example, if you want to use a parallel loop to compute some data that should then be rendered into a UI control, you should consider executing the loop within a task instance rather than directly in a UI event handler.  Only when the core computation has completed should you then marshal the UI update back to the UI thread.

 If you do run parallel loops on the UI thread, be careful to avoid updating UI controls from within the loop. Attempting to update UI controls from within a parallel loop that is executing on the UI thread can lead to state corruption, exceptions, delayed updates, and even deadlocks, depending on how the UI update is invoked. In the following example, the parallel loop blocks the UI thread on which it's executing until all iterations are complete. However, if an iteration of the loop is running on a background thread (as `System.Threading.Tasks.Parallel.For*` may do), the call to Invoke causes a message to be submitted to the UI thread and blocks waiting for that message to be processed. Since the UI thread is blocked running the `System.Threading.Tasks.Parallel.For*`, the message can never be processed, and the UI thread deadlocks.

 ```csharp
﻿using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace pitfalls_cs
{
    class Program
    {
        Button button1 = new();
        Button button2 = new();
        int N = 100;
        static void Main(string[] args)
        {
            ManualResetEventSlim mre = new ManualResetEventSlim();
            Enumerable.Range(0, Environment.ProcessorCount * 100)
                .AsParallel()
                .ForAll((j) =>
                    {
                        if (j == Environment.ProcessorCount)
                        {
                            Console.WriteLine($"Set on {Thread.CurrentThread.ManagedThreadId} with value of {j}");
                            mre.Set();
                        }
                        else
                        {
                            Console.WriteLine($"Waiting on {Thread.CurrentThread.ManagedThreadId} with value of {j}");
                            mre.Wait();
                        }
                    }); //deadlocks
        }

        private void button1_Click(object sender, EventArgs e)
        {
            Parallel.For(0, N, i =>
            {
                // do work for i
                button1.Invoke((Action)delegate { DisplayProgress(i); });
            });
        }
        static void DisplayProgress(int i) { }

        private void button2_Click(object sender, EventArgs e)
        {
            Task.Factory.StartNew(() =>
                Parallel.For(0, N, i =>
                {
                    // do work for i
                    button1.Invoke((Action)delegate { DisplayProgress(i); });
                })
                 );
        }

        private void Urg()
        {
            string path = @"C\";
            FileStream fs = File.OpenWrite(path);
            byte[] bytes = new Byte[10000000];
            // ...
            Parallel.For(0, bytes.Length, (i) => fs.WriteByte(bytes[i]));
        }
    }
}
```

 The following example shows how to avoid the deadlock, by running the loop inside a task instance. The UI thread is not blocked by the loop, and the message can be processed.

 ```csharp
﻿using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace pitfalls_cs
{
    class Program
    {
        Button button1 = new();
        Button button2 = new();
        int N = 100;
        static void Main(string[] args)
        {
            ManualResetEventSlim mre = new ManualResetEventSlim();
            Enumerable.Range(0, Environment.ProcessorCount * 100)
                .AsParallel()
                .ForAll((j) =>
                    {
                        if (j == Environment.ProcessorCount)
                        {
                            Console.WriteLine($"Set on {Thread.CurrentThread.ManagedThreadId} with value of {j}");
                            mre.Set();
                        }
                        else
                        {
                            Console.WriteLine($"Waiting on {Thread.CurrentThread.ManagedThreadId} with value of {j}");
                            mre.Wait();
                        }
                    }); //deadlocks
        }

        private void button1_Click(object sender, EventArgs e)
        {
            Parallel.For(0, N, i =>
            {
                // do work for i
                button1.Invoke((Action)delegate { DisplayProgress(i); });
            });
        }
        static void DisplayProgress(int i) { }

        private void button2_Click(object sender, EventArgs e)
        {
            Task.Factory.StartNew(() =>
                Parallel.For(0, N, i =>
                {
                    // do work for i
                    button1.Invoke((Action)delegate { DisplayProgress(i); });
                })
                 );
        }

        private void Urg()
        {
            string path = @"C\";
            FileStream fs = File.OpenWrite(path);
            byte[] bytes = new Byte[10000000];
            // ...
            Parallel.For(0, bytes.Length, (i) => fs.WriteByte(bytes[i]));
        }
    }
}
```

## See also

- Parallel Programming
- Potential Pitfalls with PLINQ
- Patterns for Parallel Programming: Understanding and Applying Parallel Patterns with the .NET Framework 4
