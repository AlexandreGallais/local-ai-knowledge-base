---
title: "CountdownEvent (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/threading/countdownevent.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CountdownEvent

`System.Threading.CountdownEvent` is a synchronization primitive that unblocks its waiting threads after it has been signaled a certain number of times. `System.Threading.CountdownEvent` is designed for scenarios in which you would otherwise have to use a `System.Threading.ManualResetEvent` or `System.Threading.ManualResetEventSlim` and manually decrement a variable before signaling the event. For example, in a fork/join scenario, you can just create a `System.Threading.CountdownEvent` that has a signal count of 5, and then start five work items on the thread pool and have each work item call `System.Threading.CountdownEvent.Signal*` when it completes. Each call to `System.Threading.CountdownEvent.Signal*` decrements the signal count by 1. On the main thread, the call to `System.Threading.CountdownEvent.Wait*` will block until the signal count is zero.

> **Note:**
> For code that does not have to interact with legacy .NET Framework synchronization APIs, consider using `System.Threading.Tasks.Task` objects or the `System.Threading.Tasks.Parallel.Invoke*` method for an even easier approach to expressing fork-join parallelism.

 `System.Threading.CountdownEvent` has these additional features:

- The wait operation can be canceled by using cancellation tokens.

- Its signal count can be incremented after the instance is created.

- Instances can be reused after `System.Threading.CountdownEvent.Wait*` has returned by calling the `System.Threading.CountdownEvent.Reset*` method.

- Instances expose a `System.Threading.WaitHandle` for integration with other .NET synchronization APIs, such as `System.Threading.WaitHandle.WaitAll*`.

## Basic Usage

 The following example demonstrates how to use a `System.Threading.CountdownEvent` with `System.Threading.ThreadPool` work items.

 ```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace CDSCountdownEvent
{
    class Data
    {
        public int Num { get; set; }
        public Data(int i) { Num = i; }
        public Data() { }
    }

    class Program
    {
        static void Main(string[] args)
        {

            //   SemaphoreWithCancel();

            Console.WriteLine("Press enter to exit.");
            Console.ReadLine();
        }
        static void ProcessData(object obj)
        {
            Data d = (Data)obj;
            Thread.SpinWait(50000000);
            Console.WriteLine($"Processed {d.Num}");
        }

        static IEnumerable<Data> GetData()
        {
            return new List<Data>() { new Data(1), new Data(2), new Data(3), new Data(4), new Data(5) };
        }

        void SnippetOne()
        {
            IEnumerable<Data> source = GetData();
            using (CountdownEvent e = new CountdownEvent(1))
            {
                // fork work:
                foreach (Data element in source)
                {
                    // Dynamically increment signal count.
                    e.AddCount();
                    ThreadPool.QueueUserWorkItem(delegate(object state)
                     {
                         try
                         {
                             ProcessData(state);
                         }
                         finally
                         {
                             e.Signal();
                         }
                     },
                     element);
                }
                e.Signal();

                // The first element could be run on this thread.

                // Join with work.
                e.Wait();
            }
            // .,.
        } //end method
    }

    class CancelableCountdownEvent
    {
        class Data
        {
            public int Num { get; set; }
            public Data(int i) { Num = i; }
            public Data() { }
        }

        class DataWithToken
        {
            public CancellationToken Token { get; set; }
            public Data Data { get; private set; }
            public DataWithToken(Data data, CancellationToken ct)
            {
                this.Data = data;
                this.Token = ct;
            }
        }
        static IEnumerable<Data> GetData()
        {
            return new List<Data>() { new Data(1), new Data(2), new Data(3), new Data(4), new Data(5) };
        }
        static void ProcessData(object obj)
        {
            DataWithToken <example-value> = (DataWithToken)obj;
            if (dataWithToken.Token.IsCancellationRequested)
            {
                Console.WriteLine($"<example-value>");
                return;
            }

            for (int i = 0; i < 10000; i++)
            {
                if (dataWithToken.Token.IsCancellationRequested)
                {
                    Console.WriteLine($"<example-value>");
                    return;
                }
                // Increase this value to slow down the program.
                Thread.SpinWait(100000);
            }
            Console.WriteLine($"<example-value>");
        }

        static void Main(string[] args)
        {
            EventWithCancel();

            Console.WriteLine("Press enter to exit.");
            Console.ReadLine();
        }

        static void EventWithCancel()
        {
            IEnumerable<Data> source = GetData();
            CancellationTokenSource cts = new CancellationTokenSource();

            //Enable cancellation request from a simple UI thread.
            Task.Factory.StartNew(() =>
                 {
                     if (Console.ReadKey().KeyChar == 'c')
                         cts.Cancel();
                 });

            // Event must have a count of at least 1
            CountdownEvent e = new CountdownEvent(1);

            // fork work:
            foreach (Data element in source)
            {
                DataWithToken item = new DataWithToken(element, cts.Token);
                // Dynamically increment signal count.
                e.AddCount();
                ThreadPool.QueueUserWorkItem(delegate(object state)
                 {
                     ProcessData(state);
                     if (!cts.Token.IsCancellationRequested)
                         e.Signal();
                 },
                 item);
            }
            // Decrement the signal count by the one we added
            // in the constructor.
            e.Signal();

            // The first element could be run on this thread.

            // Join with work or catch cancellation.
            try
            {
                e.Wait(cts.Token);
            }
            catch (OperationCanceledException oce)
            {
                if (oce.CancellationToken == cts.Token)
                {
                    Console.WriteLine("User canceled.");
                }
                else
                {
                    throw; //We don't know who canceled us!
                }
            }
            finally {
                e.Dispose();
                cts.Dispose();
            }
            //...
        } //end method
    } //end class

    class CancelSemaphore
    {
        static IEnumerable<Data> GetData()
        {
            return new List<Data>() { new Data(1), new Data(2), new Data(3), new Data(4), new Data(5) };
        }

        static void SemaphoreWithCancel()
        {

            IEnumerable<Data> source = GetData();
            CancellationTokenSource cts = new CancellationTokenSource();

            //Enable cancellation request from a simple UI thread.
            Task.Factory.StartNew(() =>
                 {
                     if (Console.ReadKey().KeyChar == 'c')
                         cts.Cancel();
                 });

            // CountdownEvent e = new CountdownEvent(1);
            SemaphoreSlim ss = new SemaphoreSlim(2);
            Task t = Task.Factory.StartNew(() =>
                {
                    ss.Release();
                    Thread.SpinWait(5000000);
                });

            try
            {

                ss.Wait(1000, cts.Token);
            }

            catch (AggregateException ae)
            {
                Console.WriteLine(ae.InnerException.Message);
            }
            catch (OperationCanceledException oce)
            {
                if (oce.CancellationToken == cts.Token)
                {
                    Console.WriteLine("User canceled.");
                }
                else
                {
                    throw; //We don't know who canceled us!
                }
            }
            finally
            {
                ss.Dispose();
                cts.Dispose();
            }
            //...
        } //end method
    } //end class
} //end namespace
```
