---
title: "Task-based asynchronous programming - .NET (part 5 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/task-based-asynchronous-programming.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Task-based asynchronous programming - .NET (part 5 of 6)

## Creating child tasks

When user code that's running in a task creates a task with the `System.Threading.Tasks.TaskCreationOptions.AttachedToParent` option, the new task is known as an *attached child task* of the parent task. You can use the `System.Threading.Tasks.TaskCreationOptions.AttachedToParent` option to express structured task parallelism because the parent task implicitly waits for all attached child tasks to finish. The following example shows a parent task that creates 10 attached child tasks. The example calls the `System.Threading.Tasks.Task.Wait*` method to wait for the parent task to finish. It doesn't have to explicitly wait for the attached child tasks to complete.

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

public class Child
{
   public static void Main()
   {
      var parent = Task.Factory.StartNew(() => {
                      Console.WriteLine("Parent task beginning.");
                      for (int ctr = 0; ctr < 10; ctr++) {
                         int taskNo = ctr;
                         Task.Factory.StartNew((x) => {
                                                  Thread.SpinWait(5000000);
                                                  Console.WriteLine($"Attached child #{x} completed.");
                                               },
                                               taskNo, TaskCreationOptions.AttachedToParent);
                      }
                   });

      parent.Wait();
      Console.WriteLine("Parent task completed.");
   }
}
// The example displays output like the following:
//       Parent task beginning.
//       Attached child #9 completed.
//       Attached child #0 completed.
//       Attached child #8 completed.
//       Attached child #1 completed.
//       Attached child #7 completed.
//       Attached child #2 completed.
//       Attached child #6 completed.
//       Attached child #3 completed.
//       Attached child #5 completed.
//       Attached child #4 completed.
//       Parent task completed.
```

A parent task can use the `System.Threading.Tasks.TaskCreationOptions.DenyChildAttach` option to prevent other tasks from attaching to the parent task. For more information, see Attached and Detached Child Tasks.

## Waiting for tasks to finish

The `System.Threading.Tasks.Task` and `System.Threading.Tasks.Task`1` types provide several overloads of the `System.Threading.Tasks.Task.Wait*` methods that enable you to wait for a task to finish. In addition, overloads of the static `System.Threading.Tasks.Task.WaitAll*` and `System.Threading.Tasks.Task.WaitAny*` methods let you wait for any or all of an array of tasks to finish.

Typically, you would wait for a task for one of these reasons:

- The main thread depends on the final result computed by a task.

- You have to handle exceptions that might be thrown from the task.

- The application might terminate before all tasks have completed execution. For example, console applications will terminate after all synchronous code in `Main` (the application entry point) has executed.

The following example shows the basic <example-value> that doesn't involve exception handling:

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

For an example that shows exception handling, see Exception Handling.

Some overloads let you specify a time-out, and others take an additional `System.Threading.CancellationToken` as an input parameter so that the wait itself can be canceled either programmatically or in response to user input.

When you wait for a task, you implicitly wait for all children of that task that were created by using the `System.Threading.Tasks.TaskCreationOptions.AttachedToParent` option. `System.Threading.Tasks.Task.Wait*` returns immediately if the task has already completed. A `System.Threading.Tasks.Task.Wait*` method throws any exceptions raised by a task, even if the `System.Threading.Tasks.Task.Wait*` method was called after the task completed.

## Composing tasks

The `System.Threading.Tasks.Task` and `System.Threading.Tasks.Task`1` classes provide several methods to help you compose multiple tasks. These methods implement common patterns and make better use of the asynchronous language features that are provided by C#, Visual Basic, and F#. This section describes the `System.Threading.Tasks.Task.WhenAll*`, `System.Threading.Tasks.Task.WhenAny*`, `System.Threading.Tasks.Task.Delay*`, and `System.Threading.Tasks.Task.FromResult*` methods.

### Task.WhenAll

The `System.Threading.Tasks.Task.WhenAll*` method asynchronously waits for multiple `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` objects to finish. It provides overloaded versions that enable you to wait for non-uniform sets of tasks. For example, you can wait for multiple `System.Threading.Tasks.Task` and `System.Threading.Tasks.Task`1` objects to complete from one method call.

### Task.WhenAny

The `System.Threading.Tasks.Task.WhenAny*` method asynchronously waits for one of multiple `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` objects to finish. As in the `System.Threading.Tasks.Task.WhenAll*` method, this method provides overloaded versions that enable you to wait for non-uniform sets of tasks. The `System.Threading.Tasks.Task.WhenAny*` method is especially useful in the following scenarios:

- **Redundant operations**: Consider an algorithm or operation that can be performed in many ways. You can use the `System.Threading.Tasks.Task.WhenAny*` method to select the operation that finishes first and then cancel the remaining operations.

- **Interleaved operations**: You can start multiple operations that must finish and use the `System.Threading.Tasks.Task.WhenAny*` method to process results as each operation finishes. After one operation finishes, you can start one or more tasks.

- **Throttled operations**: You can use the `System.Threading.Tasks.Task.WhenAny*` method to extend the previous scenario by limiting the number of concurrent operations.

- **Expired operations**: You can use the `System.Threading.Tasks.Task.WhenAny*` method to select between one or more tasks and a task that finishes after a specific time, such as a task that's returned by the `System.Threading.Tasks.Task.Delay*` method. The `System.Threading.Tasks.Task.Delay*` method is described in the following section.

### Task.Delay

The `System.Threading.Tasks.Task.Delay*` method produces a `System.Threading.Tasks.Task` object that finishes after the specified time. You can use this method to build loops that poll for data, to specify time-outs, to delay the handling of user input, and so on.

### Task(T).FromResult

By using the `System.Threading.Tasks.Task.FromResult*` method, you can create a `System.Threading.Tasks.Task`1` object that holds a pre-computed result. This method is useful when you perform an asynchronous operation that returns a `System.Threading.Tasks.Task`1` object, and the result of that `System.Threading.Tasks.Task`1` object is already computed. For an example that uses `System.Threading.Tasks.Task.FromResult*` to retrieve the results of asynchronous download operations that are held in a cache, see How to: Create Pre-Computed Tasks.

## Handling exceptions in tasks

When a task throws one or more exceptions, the exceptions are wrapped in an `System.AggregateException` exception. That exception is propagated back to the thread that joins with the task. Typically, it's the thread waiting for the task to finish or the thread accessing the `System.Threading.Tasks.Task`1.Result` property. This behavior enforces the .NET Framework policy that all unhandled exceptions by default should terminate the process. The calling code can handle the exceptions by using any of the following in a `try`/`catch` block:

- The `System.Threading.Tasks.Task.Wait*` method

- The `System.Threading.Tasks.Task.WaitAll*` method

- The `System.Threading.Tasks.Task.WaitAny*` method

- The `System.Threading.Tasks.Task`1.Result` property

The joining thread can also handle exceptions by accessing the `System.Threading.Tasks.Task.Exception` property before the task is garbage-collected. By accessing this property, you prevent the unhandled exception from triggering the exception propagation behavior that terminates the process when the object is finalized.

For more information about exceptions and tasks, see Exception Handling.
