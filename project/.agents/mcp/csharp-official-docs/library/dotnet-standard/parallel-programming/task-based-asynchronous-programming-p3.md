---
title: "Task-based asynchronous programming - .NET (part 3 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/task-based-asynchronous-programming.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Task-based asynchronous programming - .NET (part 3 of 6)

## Task creation options

Most APIs that create tasks provide overloads that accept a `System.Threading.Tasks.TaskCreationOptions` parameter. By specifying one or more of these options, you tell the task scheduler how to schedule the task on the thread pool. Options might be combined by using a bitwise **OR** operation.

The following example shows a task that has the `System.Threading.Tasks.TaskCreationOptions.LongRunning` and `System.Threading.Tasks.TaskCreationOptions.PreferFairness` options:

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

## Tasks, threads, and culture

Each thread has an associated culture and UI culture, which are defined by the `System.Threading.Thread.CurrentCulture*` and `System.Threading.Thread.CurrentUICulture` properties, respectively. A thread's culture is used in operations such as formatting, parsing, sorting, and string comparison operations. A thread's UI culture is used in resource lookup.

The system culture defines the default culture and UI culture of a thread. However, you can specify a default culture for all the threads in an application domain by using the `System.Globalization.CultureInfo.DefaultThreadCurrentCulture*` and `System.Globalization.CultureInfo.DefaultThreadCurrentUICulture` properties. If you explicitly set a thread's culture and launch a new thread, the new thread doesn't inherit the culture of the calling thread; instead, its culture is the default system culture. However, in task-based programming, tasks use the calling thread's culture, even if the task runs asynchronously on a different thread.

The following example provides a simple illustration. It changes the app's current culture to French (France). If French (France) is already the current culture, it changes to English (United States). It then invokes a delegate named `formatDelegate` that returns some numbers formatted as currency values in the new culture. Whether the delegate is invoked by a task either synchronously or asynchronously, the task uses the culture of the calling thread.

```csharp
using System;
using System.Globalization;
using System.Threading;
using System.Threading.Tasks;

public class Example
{
   public static void Main()
   {
       decimal[] values = { 163025412.32m, 18905365.59m };
       string formatString = "C2";
       Func<String> formatDelegate = () => { string output = String.Format("Formatting using the {0} culture on thread {1}.\n",
                                                                           CultureInfo.CurrentCulture.Name,
                                                                           Thread.CurrentThread.ManagedThreadId);
                                             foreach (var value in values)
                                                output += String.Format("{0}   ", value.ToString(formatString));

                                             output += Environment.NewLine;
                                             return output;
                                           };

       Console.WriteLine($"The example is running on thread {Thread.CurrentThread.ManagedThreadId}");
       // Make the current culture different from the system culture.
       Console.WriteLine($"The current culture is {CultureInfo.CurrentCulture.Name}");
       if (CultureInfo.CurrentCulture.Name == "fr-FR")
          Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");
       else
          Thread.CurrentThread.CurrentCulture = new CultureInfo("fr-FR");

       Console.WriteLine($"Changed the current culture to {CultureInfo.CurrentCulture.Name}.\n");

       // Execute the delegate synchronously.
       Console.WriteLine("Executing the delegate synchronously:");
       Console.WriteLine(formatDelegate());

       // Call an async delegate to format the values using one format string.
       Console.WriteLine("Executing a task asynchronously:");
       var t1 = Task.Run(formatDelegate);
       Console.WriteLine(t1.Result);

       Console.WriteLine("Executing a task synchronously:");
       var t2 = new Task<String>(formatDelegate);
       t2.RunSynchronously();
       Console.WriteLine(t2.Result);
   }
}
// The example displays the following output:
//         The example is running on thread 1
//         The current culture is en-US
//         Changed the current culture to fr-FR.
//
//         Executing the delegate synchronously:
//         Formatting using the fr-FR culture on thread 1.
//         163 025 412,32 €   18 905 365,59 €
//
//         Executing a task asynchronously:
//         Formatting using the fr-FR culture on thread 3.
//         163 025 412,32 €   18 905 365,59 €
//
//         Executing a task synchronously:
//         Formatting using the fr-FR culture on thread 1.
//         163 025 412,32 €   18 905 365,59 €
```
```vbnet
﻿' Visual Basic .NET Document
Option Strict On
Option Infer On

Imports System.Globalization
Imports System.Threading

Module Example
    Public Sub Main()
        Dim values() As Decimal = {163025412.32D, 18905365.59D}
        Dim formatString As String = "C2"
        Dim formatDelegate As Func(Of String) = Function()
                                                    Dim output As String = String.Format("Formatting using the {0} culture on thread {1}.",
                                                                                         CultureInfo.CurrentCulture.Name,
                                                                                         Thread.CurrentThread.ManagedThreadId)
                                                    output += Environment.NewLine
                                                    For Each value In values
                                                        output += String.Format("{0}   ", value.ToString(formatString))
                                                    Next
                                                    output += Environment.NewLine
                                                    Return output
                                                End Function

        Console.WriteLine("The example is running on thread {0}",
                          Thread.CurrentThread.ManagedThreadId)
        ' Make the current culture different from the system culture.
        Console.WriteLine("The current culture is {0}",
                          CultureInfo.CurrentCulture.Name)
        If CultureInfo.CurrentCulture.Name = "fr-FR" Then
            Thread.CurrentThread.CurrentCulture = New CultureInfo("en-US")
        Else
            Thread.CurrentThread.CurrentCulture = New CultureInfo("fr-FR")
        End If
        Console.WriteLine("Changed the current culture to {0}.",
                          CultureInfo.CurrentCulture.Name)
        Console.WriteLine()

        ' Execute the delegate synchronously.
        Console.WriteLine("Executing the delegate synchronously:")
        Console.WriteLine(formatDelegate())

        ' Call an async delegate to format the values using one format string.
        Console.WriteLine("Executing a task asynchronously:")
        Dim t1 = Task.Run(formatDelegate)
        Console.WriteLine(t1.Result)

        Console.WriteLine("Executing a task synchronously:")
        Dim t2 = New Task(Of String)(formatDelegate)
        t2.RunSynchronously()
        Console.WriteLine(t2.Result)
    End Sub
End Module

' The example displays the following output:
'
'          The example is running on thread 1
'          The current culture is en-US
'          Changed the current culture to fr-FR.
'
'          Executing the delegate synchronously:
'          Formatting Imports the fr-FR culture on thread 1.
'          163 025 412,32 €   18 905 365,59 €
'
'          Executing a task asynchronously:
'          Formatting Imports the fr-FR culture on thread 3.
'          163 025 412,32 €   18 905 365,59 €
'
'          Executing a task synchronously:
'          Formatting Imports the fr-FR culture on thread 1.
'          163 025 412,32 €   18 905 365,59 €
```
> **Note:**
> In versions of .NET Framework earlier than .NET Framework 4.6, a task's culture is determined by the culture of the thread on which it runs, not the culture of the calling thread. For asynchronous tasks, the culture used by the task could be different from the calling thread's culture.

For more information on asynchronous tasks and culture, see the "Culture and asynchronous task-based operations" section in the `System.Globalization.CultureInfo` article.
