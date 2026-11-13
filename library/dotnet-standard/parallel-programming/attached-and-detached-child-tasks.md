---
title: "Attached and Detached Child Tasks"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/attached-and-detached-child-tasks.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Attached and Detached Child Tasks

A *child task* (or *nested task*) is a `System.Threading.Tasks.Task` instance that is created in the user delegate of another task, which is known as the *parent task*. A child task can be either detached or attached. A *detached child task* is a task that executes independently of its parent. An *attached child task* is a nested task that is created with the `System.Threading.Tasks.TaskCreationOptions.AttachedToParent` option whose parent does not explicitly or by default prohibit it from being attached. A task may create any number of attached and detached child tasks, limited only by system resources.

 The following table lists the basic <example-value> between the two kinds of child tasks.

|Category|Detached child tasks|Attached child tasks|
|--------------|--------------------------|--------------------------|
|Parent waits for child tasks to complete.|No|Yes|
|Parent propagates exceptions thrown by child tasks.|No|Yes|
|Status of parent depends on status of child.|No|Yes|

 In most scenarios, we recommend that you use detached child tasks, because their relationships with other tasks are less complex. That is why tasks created inside parent tasks are detached by default, and you must explicitly specify the `System.Threading.Tasks.TaskCreationOptions.AttachedToParent` option to create an attached child task.

## Detached child tasks

 Although a child task is created by a parent task, by default it is independent of the parent task. In the following example, a parent task creates one simple child task. If you run the example code multiple times, you may notice that the output from the example differs from that shown, and also that the output may change each time you run the code. This occurs because the parent task and child tasks execute independently of each other; the child is a detached task. The example waits only for the parent task to complete, and the child task may not execute or complete before the console app terminates.

 ```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

public class Example4
{
    public static void Main()
    {
        Task parent = Task.Factory.StartNew(() =>
        {
            Console.WriteLine("Outer task executing.");

            Task child = Task.Factory.StartNew(() =>
            {
                Console.WriteLine("Nested task starting.");
                Thread.SpinWait(500000);
                Console.WriteLine("Nested task completing.");
            });
        });

        parent.Wait();
        Console.WriteLine("Outer has completed.");
    }
}

// The example produces output like the following:
//        Outer task executing.
//        Nested task starting.
//        Outer has completed.
//        Nested task completing.
```

 If the child task is represented by a `System.Threading.Tasks.Task`1` object rather than a `System.Threading.Tasks.Task` object, you can ensure that the parent task will wait for the child to complete by accessing the `System.Threading.Tasks.Task`1.Result` property of the child even if it is a detached child task. The `System.Threading.Tasks.Task`1.Result` property blocks until its task completes, as the following example shows.

 ```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

class Example3
{
    static void Main()
    {
        var outer = Task<int>.Factory.StartNew(() =>
        {
            Console.WriteLine("Outer task executing.");

            var nested = Task<int>.Factory.StartNew(() =>
            {
                Console.WriteLine("Nested task starting.");
                Thread.SpinWait(5000000);
                Console.WriteLine("Nested task completing.");
                return 42;
            });

            // Parent will wait for this detached child.
            return nested.Result;
        });

        Console.WriteLine($"Outer has returned {outer.Result}.");
    }
}

// The example displays the following output:
//       Outer task executing.
//       Nested task starting.
//       Nested task completing.
//       Outer has returned 42.
```

## Attached child tasks

 Unlike detached child tasks, attached child tasks are closely synchronized with the parent. You can change the detached child task in the previous example to an attached child task by using the `System.Threading.Tasks.TaskCreationOptions.AttachedToParent` option in the task creation statement, as shown in the following example. In this code, the attached child task completes before its parent. As a result, the output from the example is the same each time you run the code.

 ```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

public class Example
{
   public static void Main()
   {
      var parent = Task.Factory.StartNew(() => {
            Console.WriteLine("Parent task executing.");
            var child = Task.Factory.StartNew(() => {
                  Console.WriteLine("Attached child starting.");
                  Thread.SpinWait(5000000);
                  Console.WriteLine("Attached child completing.");
            }, TaskCreationOptions.AttachedToParent);
      });
      parent.Wait();
      Console.WriteLine("Parent has completed.");
   }
}

// The example displays the following output:
//       Parent task executing.
//       Attached child starting.
//       Attached child completing.
//       Parent has completed.
```

 You can use attached child tasks to create tightly synchronized graphs of asynchronous operations.

 However, a child task can attach to its parent only if its parent does not prohibit attached child tasks. Parent tasks can explicitly prevent child tasks from attaching to them by specifying the `System.Threading.Tasks.TaskCreationOptions.DenyChildAttach` option in the parent task's class constructor or the `System.Threading.Tasks.TaskFactory.StartNew*` method. Parent tasks implicitly prevent child tasks from attaching to them if they are created by calling the `System.Threading.Tasks.Task.Run*` method. The following example illustrates this. It is identical to the previous example, except that the parent task is created by calling the `System.Threading.Tasks.Task.Run(System.Action)` method rather than the `System.Threading.Tasks.TaskFactory.StartNew(System.Action)` method. Because the child task is not able to attach to its parent, the output from the example is unpredictable. Because the default task creation options for the `System.Threading.Tasks.Task.Run*` overloads include `System.Threading.Tasks.TaskCreationOptions.DenyChildAttach`, this example is functionally equivalent to the first example in the "Detached child tasks" section.

 ```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

public class Example2
{
   public static void Main()
   {
      var parent = Task.Run(() => {
            Console.WriteLine("Parent task executing.");
            var child = Task.Factory.StartNew(() => {
                  Console.WriteLine("Attached child starting.");
                  Thread.SpinWait(5000000);
                  Console.WriteLine("Attached child completing.");
            }, TaskCreationOptions.AttachedToParent);
      });
      parent.Wait();
      Console.WriteLine("Parent has completed.");
   }
}

// The example displays output like the following:
//       Parent task executing.
//       Parent has completed.
//       Attached child starting.
```

## Exceptions in child tasks

 If a detached child task throws an exception, that exception must be observed or handled directly in the parent task just as with any non-nested task. If an attached child task throws an exception, the exception is automatically propagated to the parent task and back to the thread that waits or tries to access the task's `System.Threading.Tasks.Task`1.Result` property. Therefore, by using attached child tasks, you can handle all exceptions at just one point in the call to `System.Threading.Tasks.Task.Wait*` on the calling thread. For more information, see Exception Handling.

## Cancellation and child tasks

 Task cancellation is cooperative. That is, to be cancelable, every attached or detached child task must monitor the status of the cancellation token. If you want to cancel a parent and all its children by using one cancellation request, you pass the same token as an argument to all tasks and provide in each task the logic to respond to the request in each task. For more information, see Task Cancellation and How to: Cancel a Task and Its Children.

### When the parent cancels

 If a parent cancels itself before its child task is started, the child never starts. If a parent cancels itself after its child task has already started, the child runs to completion unless it has its own cancellation logic. For more information, see Task Cancellation.

### When a detached child task cancels

 If a detached child task cancels itself by using the same token that was passed to the parent, and the parent does not wait for the child task, no exception is propagated, because the exception is treated as benign cooperation cancellation. This behavior is the same as that of any top-level task.

### When an attached child task cancels

 When an attached child task cancels itself by using the same token that was passed to its parent task, a `System.Threading.Tasks.TaskCanceledException` is propagated to the joining thread inside an `System.AggregateException`. You must wait for the parent task so that you can handle all benign exceptions in addition to all faulting exceptions that are propagated up through a graph of attached child tasks.

 For more information, see Exception Handling.

## Preventing a child task from attaching to its parent

 An unhandled exception that is thrown by a child task is propagated to the parent task. You can use this behavior to observe all child task exceptions from one root task instead of traversing a tree of tasks. However, exception propagation can be problematic when a parent task does not expect attachment from other code. For example, consider an app that calls a third-party library component from a `System.Threading.Tasks.Task` object. If the third-party library component also creates a `System.Threading.Tasks.Task` object and specifies `System.Threading.Tasks.TaskCreationOptions.AttachedToParent` to attach it to the parent task, any unhandled exceptions that occur in the child task propagate to the parent. This could lead to unexpected behavior in the main app.

 To prevent a child task from attaching to its parent task, specify the `System.Threading.Tasks.TaskCreationOptions.DenyChildAttach` option when you create the parent `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` object. When a task tries to attach to its parent and the parent specifies the `System.Threading.Tasks.TaskCreationOptions.DenyChildAttach` option, the child task will not be able to attach to a parent and will execute just as if the `System.Threading.Tasks.TaskCreationOptions.AttachedToParent` option was not specified.

 You might also want to prevent a child task from attaching to its parent when the child task does not finish in a timely manner. Because a parent task does not finish until all child tasks finish, a long-running child task can cause the overall app to perform poorly. For an example that shows how to improve app performance by preventing a task from attaching to its parent task, see How to: Prevent a Child Task from Attaching to its Parent.

## See also

- Parallel Programming
- Data Parallelism
