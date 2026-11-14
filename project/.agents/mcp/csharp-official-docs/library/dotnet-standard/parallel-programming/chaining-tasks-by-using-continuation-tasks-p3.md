---
title: "Chaining tasks using continuation tasks (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/chaining-tasks-by-using-continuation-tasks.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Chaining tasks using continuation tasks (part 3 of 3)

## Associate state with continuations

You can associate arbitrary state with a task continuation. The `System.Threading.Tasks.Task.ContinueWith*` method provides overloaded versions that each take an `System.Object` value that represents the state of the continuation. You can later access this state object by using the `System.Threading.Tasks.Task.AsyncState` property. This state object is `null` if you don't provide a value.

Continuation state is useful when you convert existing code that uses the Asynchronous Programming Model (APM) to use the TPL. In the APM, you can provide object state in the **Begin**_Method_ method and later you can use the `System.IAsyncResult.AsyncState` property to access that state. To preserve this state when you convert a code that uses the APM to use the TPL, you use the `System.Threading.Tasks.Task.ContinueWith*` method.

Continuation state can also be useful when you work with `System.Threading.Tasks.Task` objects in the Visual Studio debugger. For example, in the **Parallel Tasks** window, the **Task** column displays the string representation of the state object for each task. For more information about the **Parallel Tasks** window, see Using the Tasks Window.

The following example shows how to use continuation state. It creates a chain of continuation tasks. Each task provides the current time, a `System.DateTime` object, for the `state` parameter of the `System.Threading.Tasks.Task.ContinueWith*` method. Each `System.DateTime` object represents the time at which the continuation task is created. Each task produces as its result a second `System.DateTime` object that represents the time at which the task finishes. After all tasks finish, this example displays the creation time and the time at which each continuation task finishes.

```csharp
﻿using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

class ContinuationStateExample
{
    static DateTime DoWork()
    {
        Thread.Sleep(2000);

        return DateTime.Now;
    }

    static async Task Main()
    {
        Task<DateTime> task = Task.Run(() => DoWork());

        var continuations = new List<Task<DateTime>>();
        for (int i = 0; i < 5; i++)
        {
            task = task.ContinueWith((antecedent, _) => DoWork(), DateTime.Now);
            continuations.Add(task);
        }

        await task;

        foreach (Task<DateTime> continuation in continuations)
        {
            DateTime start = (DateTime)continuation.AsyncState!;
            DateTime end = continuation.Result;

            Console.WriteLine($"Task was created at {start.TimeOfDay} and finished at {end.TimeOfDay}.");
        }

        Console.ReadLine();
    }
}
// The example displays the similar output:
//     Task was created at 10:56:21.1561762 and finished at 10:56:25.1672062.
//     Task was created at 10:56:21.1610677 and finished at 10:56:27.1707646.
//     Task was created at 10:56:21.1610677 and finished at 10:56:29.1743230.
//     Task was created at 10:56:21.1610677 and finished at 10:56:31.1779883.
//     Task was created at 10:56:21.1610677 and finished at 10:56:33.1837083.
```

## Continuations that return Task types

Sometimes you might need to chain a continuation that returns a `System.Threading.Tasks.Task` type. These tasks are referred as nested tasks. When a parent task calls `System.Threading.Tasks.Task`1.ContinueWith*` and provides a `continuationFunction` that's task-returning, you can call `System.Threading.Tasks.TaskExtensions.Unwrap*` to create a proxy task that represents the asynchronous operation of the `<Task<Task<T>>>` or `Task(Of Task(Of T))` (Visual Basic).

The following example shows how to use continuations that wrap additional task returning functions. Each continuation can be unwrapped, exposing the inner task that was wrapped.

```csharp
﻿using System;
using System.Threading;
using System.Threading.Tasks;

public class UnwrapExample
{
    public static async Task Main()
    {
        Task<int> taskOne = RemoteIncrement(0);
        Console.WriteLine("Started RemoteIncrement(0)");

        Task<int> taskTwo = RemoteIncrement(4)
            .ContinueWith(t => RemoteIncrement(t.Result))
            .Unwrap().ContinueWith(t => RemoteIncrement(t.Result))
            .Unwrap().ContinueWith(t => RemoteIncrement(t.Result))
            .Unwrap();

        Console.WriteLine("Started RemoteIncrement(...(RemoteIncrement(RemoteIncrement(4))...)");

        try
        {
            await taskOne;
            Console.WriteLine("Finished RemoteIncrement(0)");

            await taskTwo;
            Console.WriteLine("Finished RemoteIncrement(...(RemoteIncrement(RemoteIncrement(4))...)");
        }
        catch (Exception e)
        {
            Console.WriteLine($"A task has thrown the following (unexpected) exception:\n{e}");
        }
    }

    static Task<int> RemoteIncrement(int number) =>
        Task<int>.Factory.StartNew(
            obj =>
            {
                Thread.Sleep(1000);

                int x = (int)(obj!);
                Console.WriteLine("Thread={0}, Next={1}", Thread.CurrentThread.ManagedThreadId, ++x);
                return x;
            },
            number);
}

// The example displays the similar output:
//     Started RemoteIncrement(0)
//     Started RemoteIncrement(...(RemoteIncrement(RemoteIncrement(4))...)
//     Thread=4, Next=1
//     Finished RemoteIncrement(0)
//     Thread=5, Next=5
//     Thread=6, Next=6
//     Thread=6, Next=7
//     Thread=6, Next=8
//     Finished RemoteIncrement(...(RemoteIncrement(RemoteIncrement(4))...)
```
```vb
﻿Imports System.Threading

Module UnwrapExample
    Sub Main()
        Dim taskOne As Task(Of Integer) = RemoteIncrement(0)
        Console.WriteLine("Started RemoteIncrement(0)")

        Dim taskTwo As Task(Of Integer) = RemoteIncrement(4).
            ContinueWith(Function(t) RemoteIncrement(t.Result)).
            Unwrap().ContinueWith(Function(t) RemoteIncrement(t.Result)).
            Unwrap().ContinueWith(Function(t) RemoteIncrement(t.Result)).
            Unwrap()

        Console.WriteLine("Started RemoteIncrement(...(RemoteIncrement(RemoteIncrement(4))...)")

        Try
            taskOne.Wait()
            Console.WriteLine("Finished RemoteIncrement(0)")

            taskTwo.Wait()
            Console.WriteLine("Finished RemoteIncrement(...(RemoteIncrement(RemoteIncrement(4))...)")
        Catch e As AggregateException
            Console.WriteLine($"A task has thrown the following (unexpected) exception:{vbLf}{e}")
        End Try
    End Sub

    Function RemoteIncrement(ByVal number As Integer) As Task(Of Integer)
        Return Task(Of Integer).Factory.StartNew(
            Function(obj)
                Thread.Sleep(1000)

                Dim x As Integer = CInt(obj)
                Console.WriteLine("Thread={0}, Next={1}", Thread.CurrentThread.ManagedThreadId, Interlocked.Increment(x))
                Return x
            End Function, number)
    End Function
End Module

' The example displays the similar output:
'     Started RemoteIncrement(0)
'     Started RemoteIncrement(...(RemoteIncrement(RemoteIncrement(4))...)
'     Thread=4, Next=1
'     Finished RemoteIncrement(0)
'     Thread=5, Next=5
'     Thread=6, Next=6
'     Thread=6, Next=7
'     Thread=6, Next=8
'     Finished RemoteIncrement(...(RemoteIncrement(RemoteIncrement(4))...)
```
For more information on using `System.Threading.Tasks.TaskExtensions.Unwrap*`, see How to: Unwrap a nested Task.

## Handle exceptions thrown from continuations

An antecedent-continuation relationship isn't a parent-child relationship. Exceptions thrown by continuations aren't propagated to the antecedent. Therefore, handle exceptions thrown by continuations as you would handle them in any other task, as follows:

- You can use the `System.Threading.Tasks.Task.Wait*`, `System.Threading.Tasks.Task.WaitAll*`, or `System.Threading.Tasks.Task.WaitAny*` method, or its generic counterpart, to wait on the continuation. You can wait for an antecedent and its continuations in the same `try` statement, as shown in the following example:

```csharp
﻿using System;
using System.Threading.Tasks;

public class ExceptionExample
{
    public static async Task Main()
    {
        Task<int> task = Task.Run(
            () =>
            {
                Console.WriteLine($"Executing task {Task.CurrentId}");
                return 54;
            });

        var continuation = task.ContinueWith(
            antecedent =>
            {
                Console.WriteLine($"Executing continuation task {Task.CurrentId}");
                Console.WriteLine($"Value from antecedent: {antecedent.Result}");

                throw new InvalidOperationException();
            });

        try
        {
            await task;
            await continuation;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
}
// The example displays the similar output:
//       Executing task 1
//       Executing continuation task 2
//       Value from antecedent: 54
//       Operation is not valid due to the current state of the object.
```

- You can use a second continuation to observe the `System.Threading.Tasks.Task.Exception` property of the first continuation. In the following example, a task attempts to read from a non-existent file. The continuation then displays information about the exception in the antecedent task.

```csharp
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

public class ExceptionTwoExample
{
    public static async Task Main()
    {
        var task = Task.Run(
            () =>
            {
                string fileText = File.ReadAllText(@"C:\NonexistentFile.txt");
                return fileText;
            });

        Task continuation = task.ContinueWith(
            antecedent =>
            {
                var fileNotFound =
                    antecedent.Exception
                        ?.InnerExceptions
                        ?.FirstOrDefault(e => e is FileNotFoundException) as FileNotFoundException;

                if (fileNotFound != null)
                {
                    Console.WriteLine(fileNotFound.Message);
                }
            }, TaskContinuationOptions.OnlyOnFaulted);

        await continuation;

        Console.ReadLine();
    }
}
// The example displays the following output:
//        Could not find file 'C:\NonexistentFile.txt'.
```

Because it was run with the `System.Threading.Tasks.TaskContinuationOptions.OnlyOnFaulted` option, the continuation executes only if an exception occurs in the antecedent. Therefore it can assume that the antecedent's `System.Threading.Tasks.Task.Exception` property isn't `null`. If the continuation executes whether or not an exception is thrown in the antecedent, it must check whether the antecedent's `System.Threading.Tasks.Task.Exception` property isn't `null` before attempting to handle the exception, as the following code fragment shows:

```csharp
var fileNotFound =
    antecedent.Exception
        ?.InnerExceptions
        ?.FirstOrDefault(e => e is FileNotFoundException) as FileNotFoundException;

if (fileNotFound != null)
{
    Console.WriteLine(fileNotFound.Message);
}
```

For more information, see Exception Handling.

- If the continuation is an attached child task that was created by using the `System.Threading.Tasks.TaskContinuationOptions.AttachedToParent` option, its exceptions will be propagated by the parent back to the calling thread, as is the case in any other attached child. For more information, see Attached and Detached Child Tasks.

## See also

- Task Parallel Library (TPL)
