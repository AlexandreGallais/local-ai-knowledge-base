---
title: "Chaining tasks using continuation tasks (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/chaining-tasks-by-using-continuation-tasks.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Chaining tasks using continuation tasks

In asynchronous programming, it's common for one asynchronous operation to invoke a second operation on completion. Continuations allow descendant operations to consume the results of the first operation. Traditionally, continuations have been done by using callback methods. In the Task Parallel Library (TPL), the same functionality is provided by _continuation tasks_. A continuation task (also known just as a continuation) is an asynchronous task that's invoked by another task, known as the _antecedent_, when the antecedent finishes.

Continuations are relatively easy to use but are nevertheless powerful and flexible. For example, you can:

- Pass data from the antecedent to the continuation.
- Specify the precise conditions under which the continuation will be invoked or not invoked.
- Cancel a continuation either before it starts or cooperatively as it's running.
- Provide hints about how the continuation should be scheduled.
- Invoke multiple continuations from the same antecedent.
- Invoke one continuation when all or any one of multiple antecedents complete.
- Chain continuations one after another to any arbitrary length.
- Use a continuation to handle exceptions thrown by the antecedent.

## About continuations

A continuation is a task that's created in the `System.Threading.Tasks.TaskStatus.WaitingForActivation` state. It's activated automatically when its antecedent task or tasks complete. Calling `System.Threading.Tasks.Task.Start*` on a continuation in user code throws an `System.InvalidOperationException` exception.

A continuation is itself a `System.Threading.Tasks.Task` and doesn't block the thread on which it's started. Call the `System.Threading.Tasks.Task.Wait*` method to block until the continuation task finishes.

## Create a continuation for a single antecedent

You create a continuation that executes when its antecedent has completed by calling the `System.Threading.Tasks.Task.ContinueWith*` method. The following example shows the basic pattern (for clarity, exception handling is omitted). It executes an antecedent task `taskA` that returns a `System.DayOfWeek` object that indicates the name of the current day of the week. When `taskA` completes, the `antecedent` represents its results in the `ContinueWith` continuation method. The result of the antecedent task is written to the console.

```csharp
﻿using System;
using System.Threading.Tasks;

public class SimpleExample
{
    public static async Task Main()
    {
        // Declare, assign, and start the antecedent task.
        Task<DayOfWeek> taskA = Task.Run(() => DateTime.Today.DayOfWeek);

        // Execute the continuation when the antecedent finishes.
        await taskA.ContinueWith(antecedent => Console.WriteLine($"Today is {antecedent.Result}."));
    }
}
// The example displays the following output:
//       Today is Monday.
```

## Create a continuation for multiple antecedents

You can also create a continuation that will run when any or all of a group of tasks have completed. To execute a continuation when all antecedent tasks have completed, you can call the static (`Shared` in Visual Basic) `System.Threading.Tasks.Task.WhenAll*` method or the instance `System.Threading.Tasks.TaskFactory.ContinueWhenAll*` method. To execute a continuation when any of the antecedent tasks have completed, you can call the static (`Shared` in Visual Basic) `System.Threading.Tasks.Task.WhenAny*` method or the instance `System.Threading.Tasks.TaskFactory.ContinueWhenAny*` method.

Calls to the `System.Threading.Tasks.Task.WhenAll*` and `System.Threading.Tasks.Task.WhenAny*` overloads don't block the calling thread. However, you typically call all but the `System.Threading.Tasks.Task.WhenAll(System.Collections.Generic.IEnumerable{System.Threading.Tasks.Task})` and `System.Threading.Tasks.Task.WhenAll(System.Threading.Tasks.Task[])` methods to retrieve the returned `System.Threading.Tasks.Task`1.Result` property, which does block the calling thread.

The following example calls the `System.Threading.Tasks.Task.WhenAll(System.Collections.Generic.IEnumerable{System.Threading.Tasks.Task})` method to create a continuation task that reflects the results of its 10 antecedent tasks. Each antecedent task squares an index value that ranges from one to 10. If the antecedents complete successfully (their `System.Threading.Tasks.Task.Status` property is `System.Threading.Tasks.TaskStatus.RanToCompletion`), the `System.Threading.Tasks.Task`1.Result` property of the continuation is an array of the `System.Threading.Tasks.Task`1.Result*` values returned by each antecedent. The example adds them to compute the sum of squares for all numbers between one and 10:

```csharp
﻿using System.Collections.Generic;
using System;
using System.Threading.Tasks;

public class WhenAllExample
{
    public static async Task Main()
    {
        var tasks = new List<Task<int>>();
        for (int ctr = 1; ctr <= 10; ctr++)
        {
            int baseValue = ctr;
            tasks.Add(Task.Factory.StartNew(b => (int)b! * (int)b, baseValue));
        }

        var results = await Task.WhenAll(tasks);

        int sum = 0;
        for (int ctr = 0; ctr <= results.Length - 1; ctr++)
        {
            var result = results[ctr];
            Console.Write($"{result} {((ctr == results.Length - 1) ? "=" : "+")} ");
            sum += result;
        }

        Console.WriteLine(sum);
    }
}
// The example displays the similar output:
//    1 + 4 + 9 + 16 + 25 + 36 + 49 + 64 + 81 + 100 = 385
```

## Continuation options

When you create a single-task continuation, you can use a `System.Threading.Tasks.Task.ContinueWith*` overload that takes a `System.Threading.Tasks.TaskContinuationOptions` enumeration value to specify the conditions under which the continuation starts. For example, you can specify that the continuation is to run only if the antecedent completes successfully, or only if it completes in a faulted state. If the condition isn't true when the antecedent is ready to invoke the continuation, the continuation transitions directly to the `System.Threading.Tasks.TaskStatus.Canceled` state and can't be started later.

Many multi-task continuation methods, such as overloads of the `System.Threading.Tasks.TaskFactory.ContinueWhenAll*` method, also include a `System.Threading.Tasks.TaskContinuationOptions` parameter. However, only a subset of all `System.Threading.Tasks.TaskContinuationOptions` enumeration members is valid. You can specify `System.Threading.Tasks.TaskContinuationOptions` values that have counterparts in the `System.Threading.Tasks.TaskCreationOptions` enumeration, such as `System.Threading.Tasks.TaskContinuationOptions.AttachedToParent`, `System.Threading.Tasks.TaskContinuationOptions.LongRunning`, and `System.Threading.Tasks.TaskContinuationOptions.PreferFairness`. If you specify any of the `NotOn` or `OnlyOn` options with a multi-task continuation, an `System.ArgumentOutOfRangeException` exception will be thrown at runtime.

For more information on task continuation options, see the `System.Threading.Tasks.TaskContinuationOptions` article.

## Pass data to a continuation

The `System.Threading.Tasks.Task.ContinueWith*` method passes a reference to the antecedent as an argument to the user delegate of the continuation. If the antecedent is a `System.Threading.Tasks.Task`1` object, and the task ran until it was completed, then the continuation can access the `System.Threading.Tasks.Task`1.Result` property of the task.

The `System.Threading.Tasks.Task`1.Result` property blocks until the task has completed. However, if the task was canceled or faulted, attempting to access the `System.Threading.Tasks.Task`1.Result` property throws an `System.AggregateException` exception. You can avoid this problem by using the `System.Threading.Tasks.TaskContinuationOptions.OnlyOnRanToCompletion` option, as shown in the following example:

```csharp
﻿using System;
using System.Threading.Tasks;

public class ResultExample
{
    public static async Task Main()
    {
       var task = Task.Run(
           () =>
           {
                DateTime date = DateTime.Now;
                return date.Hour > 17
                    ? "evening"
                    : date.Hour > 12
                        ? "afternoon"
                        : "morning";
            });
        
        await task.ContinueWith(
            antecedent =>
            {
                Console.WriteLine($"Good {antecedent.Result}!");
                Console.WriteLine($"And how are you this fine {antecedent.Result}?");
            }, TaskContinuationOptions.OnlyOnRanToCompletion);
   }
}
// The example displays the similar output:
//       Good afternoon!
//       And how are you this fine afternoon?
```

If you want the continuation to run even if the antecedent didn't run to successful completion, you must guard against the exception. One approach is to test the `System.Threading.Tasks.Task.Status` property of the antecedent, and only attempt to access the `System.Threading.Tasks.Task`1.Result` property if the status isn't `System.Threading.Tasks.TaskStatus.Faulted` or `System.Threading.Tasks.TaskStatus.Canceled`. You can also examine the `System.Threading.Tasks.Task.Exception` property of the antecedent. For more information, see Exception Handling. The following example modifies the preceding example to access antecedent's `System.Threading.Tasks.Task`1.Result` property only if its status is `System.Threading.Tasks.TaskStatus.RanToCompletion`:

```csharp
﻿using System;
using System.Threading.Tasks;

public class ResultTwoExample
{
    public static async Task Main() =>
        await Task.Run(
            () =>
            {
                DateTime date = DateTime.Now;
                return date.Hour > 17
                   ? "evening"
                   : date.Hour > 12
                       ? "afternoon"
                       : "morning";
            })
            .ContinueWith(
                antecedent =>
                {
                    if (antecedent.Status == TaskStatus.RanToCompletion)
                    {
                        Console.WriteLine($"Good {antecedent.Result}!");
                        Console.WriteLine($"And how are you this fine {antecedent.Result}?");
                    }
                    else if (antecedent.Status == TaskStatus.Faulted)
                    {
                        Console.WriteLine(antecedent.Exception!.GetBaseException().Message);
                    }
                });
}
// The example displays output like the following:
//       Good afternoon!
//       And how are you this fine afternoon?
```
