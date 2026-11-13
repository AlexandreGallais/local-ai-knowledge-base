---
title: "Task-based asynchronous programming - .NET (part 2 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/task-based-asynchronous-programming.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Task-based asynchronous programming - .NET (part 2 of 6)

## Creating and running tasks explicitly

A task that doesn't return a value is represented by the `System.Threading.Tasks.Task` class. A task that returns a value is represented by the `System.Threading.Tasks.Task`1` class, which inherits from `System.Threading.Tasks.Task`. The task object handles the infrastructure details and provides methods and properties that are accessible from the calling thread throughout the lifetime of the task. For example, you can access the `System.Threading.Tasks.Task.Status` property of a task at any time to determine whether it has started running, ran to completion, was canceled, or has thrown an exception. The status is represented by a `System.Threading.Tasks.TaskStatus` enumeration.

When you create a task, you give it a user delegate that encapsulates the code that the task will execute. The delegate can be expressed as a named delegate, an anonymous method, or a lambda expression. Lambda expressions can contain a call to a named method, as shown in the following example. The example includes a call to the `System.Threading.Tasks.Task.Wait*` method to ensure that the task completes execution before the console mode application ends.

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

public class Lambda
{
   public static void Main()
   {
      Thread.CurrentThread.Name = "Main";

      // Create a task and supply a user delegate by using a lambda expression.
      Task taskA = new Task( () => Console.WriteLine("Hello from taskA."));
      // Start the task.
      taskA.Start();

      // Output a message from the calling thread.
      Console.WriteLine($"Hello from thread '{Thread.CurrentThread.Name}'.");
      taskA.Wait();
   }
}
// The example displays output as follows:
//       Hello from thread 'Main'.
//       Hello from taskA.
// or
//       Hello from taskA.
//       Hello from thread 'Main'.
```

You can also use the `System.Threading.Tasks.Task.Run*` methods to create and start a task in one operation. To manage the task, the `System.Threading.Tasks.Task.Run*` methods use the default task scheduler, regardless of which task scheduler is associated with the current thread. The `System.Threading.Tasks.Task.Run*` methods are the preferred way to create and start tasks when more control over the creation and scheduling of the task isn't needed.

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Run;

public class Example
{
   public static void Main()
   {
      Thread.CurrentThread.Name = "Main";

      // Define and run the task.
      Task taskA = Task.Run( () => Console.WriteLine("Hello from taskA."));

      // Output a message from the calling thread.
      Console.WriteLine($"Hello from thread '{Thread.CurrentThread.Name}'.");
      taskA.Wait();
   }
}
// The example displays output as follows:
//       Hello from thread 'Main'.
//       Hello from taskA.
// or
//       Hello from taskA.
//       Hello from thread 'Main'.
```

You can also use the `System.Threading.Tasks.TaskFactory.StartNew*` method to create and start a task in one operation. As shown in the following example, you can use this method when:

- Creation and scheduling don't have to be separated and you require additional task creation options or the use of a specific scheduler.

- You need to pass <example-value> state into the task that you can retrieve through its `System.Threading.Tasks.Task.AsyncState` property.

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

namespace TaskIntro;

class CustomData
{
    public long CreationTime;
    public int Name;
    public int ThreadNum;
}

public class AsyncState
{
    public static void Main()
    {
        Task[] taskArray = new Task[10];
        for (int i = 0; i < taskArray.Length; i++)
        {
            taskArray[i] = Task.Factory.StartNew((Object obj) =>
            {
                CustomData data = obj as CustomData;
                if (data == null) return;

                data.ThreadNum = Thread.CurrentThread.ManagedThreadId;
            },
            new CustomData() { Name = i, CreationTime = DateTime.Now.Ticks });
        }
        Task.WaitAll(taskArray);
        foreach (var task in taskArray)
        {
            var data = task.AsyncState as CustomData;
            if (data != null)
                Console.WriteLine("Task #{0} created at {1}, ran on thread #{2}.",
                                  data.Name, data.CreationTime, data.ThreadNum);
        }
    }
}
// The example displays output like the following:
//     Task #0 created at 635116412924597583, ran on thread #3.
//     Task #1 created at 635116412924607584, ran on thread #4.
//     Task #2 created at 635116412924607584, ran on thread #4.
//     Task #3 created at 635116412924607584, ran on thread #4.
//     Task #4 created at 635116412924607584, ran on thread #3.
//     Task #5 created at 635116412924607584, ran on thread #3.
//     Task #6 created at 635116412924607584, ran on thread #4.
//     Task #7 created at 635116412924607584, ran on thread #4.
//     Task #8 created at 635116412924607584, ran on thread #3.
//     Task #9 created at 635116412924607584, ran on thread #4.
```

`System.Threading.Tasks.Task` and `System.Threading.Tasks.Task`1` each expose a static `System.Threading.Tasks.Task.Factory` property that returns a default instance of `System.Threading.Tasks.TaskFactory`, so that you can call the method as `Task.Factory.StartNew()`. Also, in the following example, because the tasks are of type `System.Threading.Tasks.Task`1`, they each have a public `System.Threading.Tasks.Task`1.Result` property that contains the result of the computation. The tasks run asynchronously and might complete in any order. If the `System.Threading.Tasks.Task`1.Result` property is accessed before the computation finishes, the property blocks the calling thread until the value is available.

```csharp
using System;
using System.Threading.Tasks;

public class Result
{
   public static void Main()
   {
        Task<Double>[] taskArray = { Task<Double>.Factory.StartNew(() => DoComputation(1.0)),
                                     Task<Double>.Factory.StartNew(() => DoComputation(100.0)),
                                     Task<Double>.Factory.StartNew(() => DoComputation(1000.0)) };

        var results = new Double[taskArray.Length];
        Double sum = 0;

        for (int i = 0; i < taskArray.Length; i++) {
            results[i] = taskArray[i].Result;
            Console.Write("{0:N1} {1}", results[i],
                              i == taskArray.Length - 1 ? "= " : "+ ");
            sum += results[i];
        }
        Console.WriteLine($"{sum:N1}");
   }

   private static Double DoComputation(Double start)
   {
      Double sum = 0;
      for (var value = start; value <= start + 10; value += .1)
         sum += value;

      return sum;
   }
}
// The example displays the following output:
//        606.0 + 10,605.0 + 100,495.0 = 111,706.0
```

For more information, see How to: Return a Value from a Task.

When you use a lambda expression to create a delegate, you have access to all the variables that are visible at that point in your source code. However, in some cases, most notably within loops, a lambda doesn't capture the variable as expected. It only captures the reference of the variable, not the value, as it mutates after each iteration. The following example illustrates the problem. It passes a loop counter to a lambda expression that instantiates a `CustomData` object and uses the loop counter as the object's identifier. As the output from the example shows, each `CustomData` object has an identical identifier.

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Example.Iterations;

class CustomData
{
   public long CreationTime;
   public int Name;
   public int ThreadNum;
}

public class IterationTwo
{
   public static void Main()
   {
      // Create the task object by using an Action(Of Object) to pass in the loop
      // counter. This produces an unexpected result.
      Task[] taskArray = new Task[10];
      for (int i = 0; i < taskArray.Length; i++) {
         taskArray[i] = Task.Factory.StartNew( (Object obj) => {
                                                 var data = new CustomData() {Name = i, CreationTime = DateTime.Now.Ticks};
                                                 data.ThreadNum = Thread.CurrentThread.ManagedThreadId;
                                                 Console.WriteLine($"Task #{data.Name} created at {data.CreationTime} on thread #{data.ThreadNum}.");
                                               },
                                              i );
      }
      Task.WaitAll(taskArray);
   }
}
// The example displays output like the following:
//       Task #10 created at 635116418427727841 on thread #4.
//       Task #10 created at 635116418427737842 on thread #4.
//       Task #10 created at 635116418427737842 on thread #4.
//       Task #10 created at 635116418427737842 on thread #4.
//       Task #10 created at 635116418427737842 on thread #4.
//       Task #10 created at 635116418427737842 on thread #4.
//       Task #10 created at 635116418427727841 on thread #3.
//       Task #10 created at 635116418427747843 on thread #3.
//       Task #10 created at 635116418427747843 on thread #3.
//       Task #10 created at 635116418427737842 on thread #4.
```

You can access the value on each iteration by providing a state object to a task through its constructor. The following example modifies the previous example by using the loop counter when creating the `CustomData` object, which, in turn, is passed to the lambda expression. As the output from the example shows, each `CustomData` object now has a unique identifier based on the value of the loop counter at the time the object was instantiated.

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

class CustomData
{
   public long CreationTime;
   public int Name;
   public int ThreadNum;
}

public class IterationOne
{
   public static void Main()
   {
      // Create the task object by using an Action(Of Object) to pass in custom data
      // to the Task constructor. This is useful when you need to capture outer variables
      // from within a loop.
      Task[] taskArray = new Task[10];
      for (int i = 0; i < taskArray.Length; i++) {
         taskArray[i] = Task.Factory.StartNew( (Object obj ) => {
                                                  CustomData data = obj as CustomData;
                                                  if (data == null)
                                                     return;

                                                  data.ThreadNum = Thread.CurrentThread.ManagedThreadId;
                                                  Console.WriteLine($"Task #{data.Name} created at {data.CreationTime} on thread #{data.ThreadNum}.");
                                               },
                                               new CustomData() {Name = i, CreationTime = DateTime.Now.Ticks} );
      }
      Task.WaitAll(taskArray);
   }
}
// The example displays output like the following:
//       Task #0 created at 635116412924597583 on thread #3.
//       Task #1 created at 635116412924607584 on thread #4.
//       Task #3 created at 635116412924607584 on thread #4.
//       Task #4 created at 635116412924607584 on thread #4.
//       Task #2 created at 635116412924607584 on thread #3.
//       Task #6 created at 635116412924607584 on thread #3.
//       Task #5 created at 635116412924607584 on thread #4.
//       Task #8 created at 635116412924607584 on thread #4.
//       Task #7 created at 635116412924607584 on thread #3.
//       Task #9 created at 635116412924607584 on thread #4.
```

This state is passed as an argument to the task delegate, and it can be accessed from the task object by using the `System.Threading.Tasks.Task.AsyncState` property. The following example is a variation on the previous example. It uses the `System.Threading.Tasks.Task.AsyncState` property to display information about the `CustomData` objects passed to the lambda expression.

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

namespace TaskIntro;

class CustomData
{
    public long CreationTime;
    public int Name;
    public int ThreadNum;
}

public class AsyncState
{
    public static void Main()
    {
        Task[] taskArray = new Task[10];
        for (int i = 0; i < taskArray.Length; i++)
        {
            taskArray[i] = Task.Factory.StartNew((Object obj) =>
            {
                CustomData data = obj as CustomData;
                if (data == null) return;

                data.ThreadNum = Thread.CurrentThread.ManagedThreadId;
            },
            new CustomData() { Name = i, CreationTime = DateTime.Now.Ticks });
        }
        Task.WaitAll(taskArray);
        foreach (var task in taskArray)
        {
            var data = task.AsyncState as CustomData;
            if (data != null)
                Console.WriteLine("Task #{0} created at {1}, ran on thread #{2}.",
                                  data.Name, data.CreationTime, data.ThreadNum);
        }
    }
}
// The example displays output like the following:
//     Task #0 created at 635116412924597583, ran on thread #3.
//     Task #1 created at 635116412924607584, ran on thread #4.
//     Task #2 created at 635116412924607584, ran on thread #4.
//     Task #3 created at 635116412924607584, ran on thread #4.
//     Task #4 created at 635116412924607584, ran on thread #3.
//     Task #5 created at 635116412924607584, ran on thread #3.
//     Task #6 created at 635116412924607584, ran on thread #4.
//     Task #7 created at 635116412924607584, ran on thread #4.
//     Task #8 created at 635116412924607584, ran on thread #3.
//     Task #9 created at 635116412924607584, ran on thread #4.
```

## Task ID

Every task receives an integer ID that uniquely identifies it in an application domain and can be accessed by using the `System.Threading.Tasks.Task.Id` property. The ID is useful for viewing task information in the Visual Studio debugger **Parallel Stacks** and **Tasks** windows. The ID is created lazily, which means it isn't created until it's requested. Therefore, a task might have a different ID every time the program is run. For more information about how to view task IDs in the debugger, see Using the Tasks Window and Using the Parallel Stacks Window.
