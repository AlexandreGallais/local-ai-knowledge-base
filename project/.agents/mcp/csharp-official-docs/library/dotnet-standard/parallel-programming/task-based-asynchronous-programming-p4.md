---
title: "Task-based asynchronous programming - .NET (part 4 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/task-based-asynchronous-programming.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Task-based asynchronous programming - .NET (part 4 of 6)

## Creating task continuations

The `System.Threading.Tasks.Task.ContinueWith*` and `System.Threading.Tasks.Task`1.ContinueWith*` methods let you specify a task to start when the *antecedent task* finishes. The delegate of the continuation task is passed a reference to the antecedent task so that it can examine the antecedent task's status. And by retrieving the value of the `System.Threading.Tasks.Task`1.Result` property, you can use the output of the antecedent as input for the continuation.

In the following example, the `getData` task is started by a call to the `System.Threading.Tasks.TaskFactory.StartNew``1(System.Func{``0})` method. The `processData` task is started automatically when `getData` finishes, and `displayData` is started when `processData` finishes. `getData` produces an integer array, which is accessible to the `processData` task through the `getData` task's `System.Threading.Tasks.Task`1.Result` property. The `processData` task processes that array and returns a result whose type is inferred from the return type of the lambda expression passed to the `System.Threading.Tasks.Task`1.ContinueWith``1(System.Func{System.Threading.Tasks.Task{`0},``0})` method. The `displayData` task executes automatically when `processData` finishes, and the `System.Tuple`3` object returned by the `processData` lambda expression is accessible to the `displayData` task through the `processData` task's `System.Threading.Tasks.Task`1.Result` property. The `displayData` task takes the result of the `processData` task. It produces a result whose type is inferred in a similar manner, and which is made available to the program in the `System.Threading.Tasks.Task`1.Result` property.

```csharp
using System;
using System.Threading.Tasks;

public class ContinuationOne
{
   public static void Main()
   {
      var getData = Task.Factory.StartNew(() => {
                                             Random rnd = new Random();
                                             int[] values = new int[100];
                                             for (int ctr = 0; ctr <= values.GetUpperBound(0); ctr++)
                                                values[ctr] = rnd.Next();

                                             return values;
                                          } );
      var processData = getData.ContinueWith((x) => {
                                                int n = x.Result.Length;
                                                long sum = 0;
                                                double mean;

                                                for (int ctr = 0; ctr <= x.Result.GetUpperBound(0); ctr++)
                                                   sum += x.Result[ctr];

                                                mean = sum / (double) n;
                                                return Tuple.Create(n, sum, mean);
                                             } );
      var displayData = processData.ContinueWith((x) => {
                                                    return String.Format("N={0:N0}, Total = {1:N0}, Mean = {2:N2}",
                                                                         x.Result.Item1, x.Result.Item2,
                                                                         x.Result.Item3);
                                                 } );
      Console.WriteLine(displayData.Result);
   }
}
// The example displays output similar to the following:
//    N=100, Total = 110,081,653,682, Mean = 1,100,816,536.82
```

Because `System.Threading.Tasks.Task.ContinueWith*` is an instance method, you can chain method calls together instead of instantiating a `System.Threading.Tasks.Task`1` object for each antecedent task. The following example is functionally identical to the previous one, except that it chains together calls to the `System.Threading.Tasks.Task.ContinueWith*` method. The `System.Threading.Tasks.Task`1` object returned by the chain of method calls is the final continuation task.

```csharp
using System;
using System.Threading.Tasks;

public class ContinuationTwo
{
   public static void Main()
   {
      var displayData = Task.Factory.StartNew(() => {
                                                 Random rnd = new Random();
                                                 int[] values = new int[100];
                                                 for (int ctr = 0; ctr <= values.GetUpperBound(0); ctr++)
                                                    values[ctr] = rnd.Next();

                                                 return values;
                                              } ).
                        ContinueWith((x) => {
                                        int n = x.Result.Length;
                                        long sum = 0;
                                        double mean;

                                        for (int ctr = 0; ctr <= x.Result.GetUpperBound(0); ctr++)
                                           sum += x.Result[ctr];

                                        mean = sum / (double) n;
                                        return Tuple.Create(n, sum, mean);
                                     } ).
                        ContinueWith((x) => {
                                        return String.Format("N={0:N0}, Total = {1:N0}, Mean = {2:N2}",
                                                             x.Result.Item1, x.Result.Item2,
                                                             x.Result.Item3);
                                     } );
      Console.WriteLine(displayData.Result);
   }
}
// The example displays output similar to the following:
//    N=100, Total = 110,081,653,682, Mean = 1,100,816,536.82
```

The `System.Threading.Tasks.TaskFactory.ContinueWhenAll*` and `System.Threading.Tasks.TaskFactory.ContinueWhenAny*` methods enable you to continue from multiple tasks.

For more information, see Chaining Tasks by Using Continuation Tasks.

## Creating detached child tasks

When user code that's running in a task creates a new task and doesn't specify the `System.Threading.Tasks.TaskCreationOptions.AttachedToParent` option, the new task isn't synchronized with the parent task in any special way. This type of non-synchronized task is called a *detached nested task* or *detached child task*. The following example shows a task that creates one detached child task:

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace TPL_Intro
{
    class Program
    {
        static void Main(string[] args)
        {
            SimpleTaskCreation();
            ChildTaskSnippets();
            TaskDemo2();
            Console.ReadKey();
        }

        static void SimpleTaskCreation()
        {
            // Create a task and supply a user delegate by using a lambda expression.
            var taskA = new Task(() => Console.WriteLine("Hello from taskA."));

            // Start the task.
            taskA.Start();

            // Output a message from the calling thread.
            Console.WriteLine("Hello from the calling thread.");
            // Message from taskA should follow.

            /* Output:
             * Hello from the calling thread.
             * Hello from taskA.
             */

        }

        static void SimpleStartNew()
        {
            // Create and start the task in one operation.
            var taskA = Task.Factory.StartNew(() => Console.WriteLine("Hello from taskA."));

            // Output a message from the calling thread.
            Console.WriteLine("Hello from the calling thread.");
        }

       class MyCustomData
       {
        public long CreationTime;
        public int Name;
        public int ThreadNum;
        }

    static void TaskDemo2()
    {
        // Create the task object by using an Action(Of Object) to pass in custom data
        // in the Task constructor. This is useful when you need to capture outer variables
        // from within a loop. As an experiment, try modifying this code to
        // capture i directly in the lambda, and compare results.
        Task[] taskArray = new Task[10];

        for(int i = 0; i < taskArray.Length; i++)
        {
            taskArray[i] = new Task((obj) =>
                {
                                        MyCustomData mydata = (MyCustomData) obj;
                                        mydata.ThreadNum = Thread.CurrentThread.ManagedThreadId;
                                        Console.WriteLine($"Hello from Task #{mydata.Name} created at {mydata.CreationTime} running on thread #{mydata.ThreadNum}.");
                },
            new MyCustomData () {Name = i, CreationTime = DateTime.Now.Ticks}
            );
            taskArray[i].Start();
        }
    }

        static void TaskDemo2A()
        {
            Task.Factory.StartNew(state =>
            {
                dynamic data = state;
                Console.WriteLine(data.Name);
                Console.WriteLine(data.Date);
            }, new { Name = "taskB", Date = DateTime.Today });
        }

        static void TaskDemo3()
        {
            var task3 = new Task(() => MyLongRunningMethod(),
                                TaskCreationOptions.LongRunning | TaskCreationOptions.PreferFairness);
            task3.Start();
        }

        // dummy methods
        static void MyLongRunningMethod() { }
        static double DoComputation1() { return 1.0; }
        static double DoComputation2() { return 1.0; }
        static double DoComputation3() { return 1.0; }
        static byte[] GetFileData() { return new byte[100]; }
        static double[] Analyze(byte[] input) { return new double[100]; }
        static string Summarize(double[] d) { return "looks good"; }
        static void MethodA() { }
        static void MethodB() { }
        static void MethodC() { }

        static void MoreSimple()
        {

            Task<double>[] taskArray = new Task<double>[]
               {
                   Task<double>.Factory.StartNew(() => DoComputation1()),

                   // May be written more conveniently like this:
                   Task.Factory.StartNew(() => DoComputation2()),
                   Task.Factory.StartNew(() => DoComputation3())
               };

            double[] results = new double[taskArray.Length];
            for (int i = 0; i < taskArray.Length; i++)
                results[i] = taskArray[i].Result;

            Task<byte[]> getData = new Task<byte[]>(() => GetFileData());
            Task<double[]> analyzeData = getData.ContinueWith(x => Analyze(x.Result));
            Task<string> reportData = analyzeData.ContinueWith(y => Summarize(y.Result));

            getData.Start();

            //or...
            Task<string> reportData2 = Task.Factory.StartNew(() => GetFileData())
                                        .ContinueWith((x) => Analyze(x.Result))
                                        .ContinueWith((y) => Summarize(y.Result));

            System.IO.File.WriteAllText(@"C:\reportFolder\report.txt", reportData.Result);

            Task[] tasks = new Task[3]
            {
                Task.Factory.StartNew(() => MethodA()),
                Task.Factory.StartNew(() => MethodB()),
                Task.Factory.StartNew(() => MethodC())
            };

            //Block until all tasks complete.
            Task.WaitAll(tasks);

            // Continue on this thread...
        }

        static void ChildTaskSnippets()
        {
            var outer = Task.Factory.StartNew(() =>
            {
                Console.WriteLine("Outer task beginning.");

                var child = Task.Factory.StartNew(() =>
                {
                    Thread.SpinWait(5000000);
                    Console.WriteLine("Detached task completed.");
                });
            });

            outer.Wait();
            Console.WriteLine("Outer task completed.");
            // The example displays the following output:
            //    Outer task beginning.
            //    Outer task completed.
            //    Detached task completed.

            var parent = Task.Factory.StartNew(() =>
            {
                Console.WriteLine("Parent task beginning.");

                var child = Task.Factory.StartNew(() =>
                {
                    Thread.SpinWait(5000000);
                    Console.WriteLine("Attached task completed.");
                }, TaskCreationOptions.AttachedToParent);
            });

            parent.Wait();
            Console.WriteLine("Parent task completed.");

            /* Output:
                Parent task beginning.
                Attached task completed.
                Parent task completed.
             */

            var t = Task<int>.Factory.StartNew(() => 1);
        }
    }
}
```

> **Note:**
> The parent task doesn't wait for the detached child task to finish.
