---
title: "Exception handling (Task Parallel Library) (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/exception-handling-task-parallel-library.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Exception handling (Task Parallel Library)

Unhandled exceptions that are thrown by user code that is running inside a task are propagated back to the calling thread, except in certain scenarios that are described later in this topic. Exceptions are propagated when you use one of the static or instance `System.Threading.Tasks.Task.Wait*` methods, and you handle them by enclosing the call in a `try`/`catch` statement. If a task is the parent of attached child tasks, or if you are waiting on multiple tasks, multiple exceptions could be thrown.

To propagate all the exceptions back to the calling thread, the Task infrastructure wraps them in an `System.AggregateException` instance. The `System.AggregateException` exception has an `System.AggregateException.InnerExceptions` property that can be enumerated to examine all the original exceptions that were thrown, and handle (or not handle) each one individually. You can also handle the original exceptions by using the `System.AggregateException.Handle*` method.

Even if only one exception is thrown, it is still wrapped in an `System.AggregateException` exception, as the following example shows.

```csharp

public static partial class Program
{
    public static void HandleThree()
    {
        var task = Task.Run(
            () => throw new CustomException("This exception is expected!"));

        try
        {
            task.Wait();
        }
        catch (AggregateException ae)
        {
            foreach (var ex in ae.InnerExceptions)
            {
                // Handle the custom exception.
                if (ex is CustomException)
                {
                    Console.WriteLine(ex.Message);
                }
                // Rethrow any other exception.
                else
                {
                    throw ex;
                }
            }
        }
    }
}
// The example displays the following output:
//        This exception is expected!
```

You could avoid an unhandled exception by just catching the `System.AggregateException` and not observing any of the inner exceptions. However, we recommend that you do not do this because it is analogous to catching the base `System.Exception` type in non-parallel scenarios. To catch an exception without taking specific actions to recover from it can leave your program in an indeterminate state.

If you do not want to call the `System.Threading.Tasks.Task.Wait*` method to wait for a task's completion, you can also retrieve the `System.AggregateException` exception from the task's `System.Threading.Tasks.Task.Exception` property, as the following example shows. For more information, see the Observing exceptions by using the Task.Exception property section in this topic.

```csharp

public static partial class Program
{
    public static void HandleFour()
    {
        var task = Task.Run(
            () => throw new CustomException("This exception is expected!"));

        while (!task.IsCompleted) { }

        if (task.Status == TaskStatus.Faulted)
        {
            foreach (var ex in task.Exception?.InnerExceptions ?? new(Array.Empty<Exception>()))
            {
                // Handle the custom exception.
                if (ex is CustomException)
                {
                    Console.WriteLine(ex.Message);
                }
                // Rethrow any other exception.
                else
                {
                    throw ex;
                }
            }
        }
    }
}
// The example displays the following output:
//        This exception is expected!
```

> **Caution:**
> The preceding example code includes a `while` loop that polls the task's `System.Threading.Tasks.Task.IsCompleted` property to determine when the task has completed. This should never be done in production code as it is very inefficient.

If you do not wait on a task that propagates an exception, or access its `System.Threading.Tasks.Task.Exception` property, the exception is escalated according to the .NET exception policy when the task is garbage-collected.

When exceptions are allowed to bubble up back to the joining thread, it is possible that a task may continue to process some items after the exception is raised.

> **Note:**
> When "Just My Code" is enabled, Visual Studio in some cases will break on the line that throws the exception and display an error message that says "exception not handled by user code." This error is benign. You can press F5 to continue and see the exception-handling behavior that is demonstrated in these examples. To prevent Visual Studio from breaking on the first error, just uncheck the **Enable Just My Code** checkbox under **Tools, Options, Debugging, General**.

## Attached child tasks and nested AggregateExceptions

If a task has an attached child task that throws an exception, that exception is wrapped in an `System.AggregateException` before it is propagated to the parent task, which wraps that exception in its own `System.AggregateException` before it propagates it back to the calling thread. In such cases, the `System.AggregateException.InnerExceptions` property of the `System.AggregateException` exception that is caught at the `System.Threading.Tasks.Task.Wait*`, `System.Threading.Tasks.Task.WaitAny*`, or `System.Threading.Tasks.Task.WaitAll*` method contains one or more `System.AggregateException` instances, not the original exceptions that caused the fault. To avoid having to iterate over nested `System.AggregateException` exceptions, you can use the `System.AggregateException.Flatten*` method to remove all the nested `System.AggregateException` exceptions, so that the `System.AggregateException.InnerExceptions` property contains the original exceptions. In the following example, nested `System.AggregateException` instances are flattened and handled in just one loop.

```csharp

public static partial class Program
{
    public static void FlattenTwo()
    {
        var task = Task.Factory.StartNew(() =>
        {
            var child = Task.Factory.StartNew(() =>
            {
                var grandChild = Task.Factory.StartNew(() =>
                {
                    // This exception is nested inside three AggregateExceptions.
                    throw new CustomException("Attached child2 faulted.");
                }, TaskCreationOptions.AttachedToParent);

                // This exception is nested inside two AggregateExceptions.
                throw new CustomException("Attached child1 faulted.");
            }, TaskCreationOptions.AttachedToParent);
        });

        try
        {
            task.Wait();
        }
        catch (AggregateException ae)
        {
            foreach (var ex in ae.Flatten().InnerExceptions)
            {
                if (ex is CustomException)
                {
                    Console.WriteLine(ex.Message);
                }
                else
                {
                    throw;
                }
            }
        }
    }
}
// The example displays the following output:
//    Attached child1 faulted.
//    Attached child2 faulted.
```

You can also use the `System.AggregateException.Flatten*` method to rethrow the inner exceptions from multiple `System.AggregateException` instances thrown by multiple tasks in a single `System.AggregateException` instance, as the following example shows.

```csharp
public static partial class Program
{
    public static void TaskExceptionTwo()
    {
        try
        {
            ExecuteTasks();
        }
        catch (AggregateException ae)
        {
            foreach (var e in ae.InnerExceptions)
            {
                Console.WriteLine($"{e.GetType().Name}:\n   {e.Message}");
            }
        }
    }

    static void ExecuteTasks()
    {
        // Assume this is a user-entered String.
        string path = @"C:\";
        List<Task> tasks = new();

        tasks.Add(Task.Run(() =>
        {
            // This should throw an UnauthorizedAccessException.
            return Directory.GetFiles(
                path, "*.txt",
                SearchOption.AllDirectories);
        }));

        tasks.Add(Task.Run(() =>
        {
            if (path == @"C:\")
            {
                throw new ArgumentException(
                    "The system root is not a valid path.");
            }
            return new string[] { ".txt", ".dll", ".exe", ".bin", ".dat" };
        }));

        tasks.Add(Task.Run(() =>
        {
            throw new NotImplementedException(
                "This operation has not been implemented.");
        }));

        try
        {
            Task.WaitAll(tasks.ToArray());
        }
        catch (AggregateException ae)
        {
            throw ae.Flatten();
        }
    }
}
// The example displays the following output:
//       UnauthorizedAccessException:
//          Access to the path 'C:\Documents and Settings' is denied.
//       ArgumentException:
//          The system root is not a valid path.
//       NotImplementedException:
//          This operation has not been implemented.
```

## Exceptions from detached child tasks

By default, child tasks are created as detached. Exceptions thrown from detached tasks must be handled or rethrown in the immediate parent task; they are not propagated back to the calling thread in the same way as attached child tasks propagated back. The topmost parent can manually rethrow an exception from a detached child to cause it to be wrapped in an `System.AggregateException` and propagated back to the calling thread.

```csharp

public static partial class Program
{
    public static void DetachedTwo()
    {
        var task = Task.Run(() =>
        {
            var nestedTask = Task.Run(
                () => throw new CustomException("Detached child task faulted."));

            // Here the exception will be escalated back to the calling thread.
            // We could use try/catch here to prevent that.
            nestedTask.Wait();
        });

        try
        {
            task.Wait();
        }
        catch (AggregateException ae)
        {
            foreach (var e in ae.Flatten().InnerExceptions)
            {
                if (e is CustomException)
                {
                    Console.WriteLine(e.Message);
                }
            }
        }
    }
}
// The example displays the following output:
//    Detached child task faulted.
```

Even if you use a continuation to observe an exception in a child task, the exception still must be observed by the parent task.

## Exceptions that indicate cooperative cancellation

When user code in a task responds to a cancellation request, the correct procedure is to throw an `System.OperationCanceledException` passing in the cancellation token on which the request was communicated. Before it attempts to propagate the exception, the task instance compares the token in the exception to the one that was passed to it when it was created. If they are the same, the task propagates a `System.Threading.Tasks.TaskCanceledException` wrapped in the `System.AggregateException`, and it can be seen when the inner exceptions are examined. However, if the calling thread is not waiting on the task, this specific exception will not be propagated. For more information, see Task Cancellation.

```csharp
﻿using System.Collections.Concurrent;

public static partial class Program
{
    public static void ThrowDemo()
    {
        var task = Task.Factory.StartNew(
            () => throw new CustomException("I'm bad, but not too bad!"));

        try
        {
            task.Wait();
        }
        catch (AggregateException ae)
        {
            // Assume we know what's going on with this particular exception.
            // Rethrow anything else. AggregateException.Handle provides
            // another way to express this. See later example.
            foreach (var ex in ae.InnerExceptions)
            {
                if (ex is CustomException)
                {
                    Console.WriteLine(ex.Message);
                }
                else
                {
                    throw;
                }
            }
        }
    }

    static void CancelDemo()
    {
        bool someCondition = true;
        var tokenSource = new CancellationTokenSource();
        var token = tokenSource.Token;
        var task = Task.Factory.StartNew(() =>
        {
            CancellationToken ct = token;
            while (someCondition)
            {
                // Do some work...
                Thread.SpinWait(50_000);
                ct.ThrowIfCancellationRequested();
            }
        },
        token);

        // No waiting required.
        tokenSource.Dispose();
    }
}

public static partial class Program
{
    public static void ExceptionTwo()
    {
        // Create some random data to process in parallel.
        // There is a good probability this data will cause some exceptions to be thrown.
        byte[] data = new byte[5_000];
        Random r = Random.Shared;
        r.NextBytes(data);

        try
        {
            ProcessDataInParallel(data);
        }
        catch (AggregateException ae)
        {
            var ignoredExceptions = new List<Exception>();
            // This is where you can choose which exceptions to handle.
            foreach (var ex in ae.Flatten().InnerExceptions)
            {
                if (ex is ArgumentException) Console.WriteLine(ex.Message);
                else ignoredExceptions.Add(ex);
            }
            if (ignoredExceptions.Count > 0)
            {
                throw new AggregateException(ignoredExceptions);
            }
        }

        Console.WriteLine("Press any key to exit.");
        Console.ReadKey();
    }

    private static void ProcessDataInParallel(byte[] data)
    {
        // Use ConcurrentQueue to enable safe enqueueing from multiple threads.
        var exceptions = new ConcurrentQueue<Exception>();

        // Execute the complete loop and capture all exceptions.
        Parallel.ForEach(data, d =>
        {
            try
            {
                // Cause a few exceptions, but not too many.
                if (d < 3) throw new ArgumentException($"Value is {d}. Value must be greater than or equal to 3.");
                else Console.Write(d + " ");
            }
            // Store the exception and continue with the loop.
            catch (Exception e)
            {
                exceptions.Enqueue(e);
            }
        });
        Console.WriteLine();

        // Throw the exceptions here after the loop completes.
        if (!exceptions.IsEmpty)
        {
            throw new AggregateException(exceptions);
        }
    }
}
```
