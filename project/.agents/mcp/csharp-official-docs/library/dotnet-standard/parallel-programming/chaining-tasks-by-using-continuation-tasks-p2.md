---
title: "Chaining tasks using continuation tasks (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/chaining-tasks-by-using-continuation-tasks.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Chaining tasks using continuation tasks (part 2 of 3)

## Cancel a continuation

The `System.Threading.Tasks.Task.Status` property of a continuation is set to `System.Threading.Tasks.TaskStatus.Canceled` in the following situations:

- It throws an `System.OperationCanceledException` exception in response to a cancellation request. As with any task, if the exception contains the same token that was passed to the continuation, it's treated as an acknowledgment of cooperative cancellation.

- The continuation is passed a `System.Threading.CancellationToken` whose `System.Threading.CancellationToken.IsCancellationRequested` property is `true`. In this case, the continuation doesn't start, and it transitions to the `System.Threading.Tasks.TaskStatus.Canceled` state.

- The continuation never runs because the condition set by its `System.Threading.Tasks.TaskContinuationOptions` argument wasn't met. For example, if an antecedent goes into a `System.Threading.Tasks.TaskStatus.Faulted` state, its continuation that was passed the `System.Threading.Tasks.TaskContinuationOptions.NotOnFaulted` option won't run but will transition to the `System.Threading.Tasks.TaskStatus.Canceled` state.

If a task and its continuation represent two parts of the same logical operation, you can pass the same cancellation token to both tasks, as shown in the following example. It consists of an antecedent that generates a list of integers that are divisible by 33, which it passes to the continuation. The continuation in turn displays the list. Both the antecedent and the continuation pause regularly for random intervals. In addition, a `System.Threading.Timer` object is used to execute the `Elapsed` method after a five-second timeout interval. This example calls the `System.Threading.CancellationTokenSource.Cancel*` method, which causes the currently executing task to call the `System.Threading.CancellationToken.ThrowIfCancellationRequested*` method. Whether the `System.Threading.CancellationTokenSource.Cancel*` method is called when the antecedent or its continuation is executing depends on the duration of the randomly generated pauses. If the antecedent is canceled, the continuation won'<example-value>'t canceled, the token can still be used to cancel the continuation.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

public class CancellationExample
{
    static readonly Random s_random = new Random((int)DateTime.Now.Ticks);

    public static async Task Main()
    {
        using var cts = new CancellationTokenSource();
        CancellationToken token = cts.Token;
        var timer = new Timer(Elapsed, cts, 5000, Timeout.Infinite);

        var task = Task.Run(
            async () =>
            {
                var product33 = new List<int>();
                for (int index = 1; index < short.MaxValue; index++)
                {
                    if (token.IsCancellationRequested)
                    {
                        Console.WriteLine("\nCancellation requested in antecedent...\n");
                        token.ThrowIfCancellationRequested();
                    }
                    if (index % 2000 == 0)
                    {
                        int delay = s_random.Next(16, 501);
                        await Task.Delay(delay);
                    }
                    if (index % 33 == 0)
                    {
                        product33.Add(index);
                    }
                }

                return product33.ToArray();
            }, token);

        Task<double> continuation = task.ContinueWith(
            async antecedent =>
            {
                Console.WriteLine("Multiples of 33:\n");
                int[] array = antecedent.Result;
                for (int index = 0; index < array.Length; index++)
                {
                    if (token.IsCancellationRequested)
                    {
                        Console.WriteLine("\nCancellation requested in continuation...\n");
                        token.ThrowIfCancellationRequested();
                    }
                    if (index % 100 == 0)
                    {
                        int delay = s_random.Next(16, 251);
                        await Task.Delay(delay);
                    }

                    Console.Write($"{array[index]:N0}{(index != array.Length - 1 ? ", " : "")}");

                    if (Console.CursorLeft >= 74)
                    {
                        Console.WriteLine();
                    }
                }
                Console.WriteLine();
                return array.Average();
            }, token).Unwrap();

        try
        {
            await task;
            double result = await continuation;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }

        Console.WriteLine($"\nAntecedent Status: {task.Status}");
        Console.WriteLine($"Continuation Status: {continuation.Status}");
    }

    static void Elapsed(object? state)
    {
        if (state is CancellationTokenSource cts)
        {
            cts.Cancel();
            Console.WriteLine("\nCancellation request issued...\n");
        }
    }
}
// The example displays the similar output:
//     Multiples of 33:
//     
//     33, 66, 99, 132, 165, 198, 231, 264, 297, 330, 363, 396, 429, 462, 495, 528,
//     561, 594, 627, 660, 693, 726, 759, 792, 825, 858, 891, 924, 957, 990, 1,023,
//     1,056, 1,089, 1,122, 1,155, 1,188, 1,221, 1,254, 1,287, 1,320, 1,353, 1,386,
//     1,419, 1,452, 1,485, 1,518, 1,551, 1,584, 1,617, 1,650, 1,683, 1,716, 1,749,
//     1,782, 1,815, 1,848, 1,881, 1,914, 1,947, 1,980, 2,013, 2,046, 2,079, 2,112,
//     2,145, 2,178, 2,211, 2,244, 2,277, 2,310, 2,343, 2,376, 2,409, 2,442, 2,475,
//     2,508, 2,541, 2,574, 2,607, 2,640, 2,673, 2,706, 2,739, 2,772, 2,805, 2,838,
//     2,871, 2,904, 2,937, 2,970, 3,003, 3,036, 3,069, 3,102, 3,135, 3,168, 3,201,
//     3,234, 3,267, 3,300, 3,333, 3,366, 3,399, 3,432, 3,465, 3,498, 3,531, 3,564,
//     3,597, 3,630, 3,663, 3,696, 3,729, 3,762, 3,795, 3,828, 3,861, 3,894, 3,927,
//     3,960, 3,993, 4,026, 4,059, 4,092, 4,125, 4,158, 4,191, 4,224, 4,257, 4,290,
//     4,323, 4,356, 4,389, 4,422, 4,455, 4,488, 4,521, 4,554, 4,587, 4,620, 4,653,
//     4,686, 4,719, 4,752, 4,785, 4,818, 4,851, 4,884, 4,917, 4,950, 4,983, 5,016,
//     5,049, 5,082, 5,115, 5,148, 5,181, 5,214, 5,247, 5,280, 5,313, 5,346, 5,379,
//     5,412, 5,445, 5,478, 5,511, 5,544, 5,577, 5,610, 5,643, 5,676, 5,709, 5,742,
//     Cancellation request issued...
//
//     5,775,
//     Cancellation requested in continuation...
//       
//     The operation was canceled.
//       
//     Antecedent Status: RanToCompletion
//     Continuation Status: Canceled
```

You can also prevent a continuation from executing if its antecedent is canceled without providing the continuation a cancellation token. Provide the token by specifying the `System.Threading.Tasks.TaskContinuationOptions.NotOnCanceled` option when you create the continuation, as shown in the following example:

```csharp
﻿using System;
using System.Threading;
using System.Threading.Tasks;

public class CancellationTwoExample
{
    public static async Task Main()
    {
        using var cts = new CancellationTokenSource();
        CancellationToken token = cts.Token;
        cts.Cancel();

        var task = Task.FromCanceled(token);
        Task continuation =
            task.ContinueWith(
                antecedent => Console.WriteLine("The continuation is running."),
                TaskContinuationOptions.NotOnCanceled);

        try
        {
            await task;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"{ex.GetType().Name}: {ex.Message}");
            Console.WriteLine();
        }

        Console.WriteLine($"Task {task.Id}: {task.Status:G}");
        Console.WriteLine($"Task {continuation.Id}: {continuation.Status:G}");
    }
}
// The example displays the similar output:
//       TaskCanceledException: A task was canceled.
//
//       Task 1: Canceled
//       Task 2: Canceled
```

After a continuation goes into the `System.Threading.Tasks.TaskStatus.Canceled` state, it might affect continuations that follow, depending on the `System.Threading.Tasks.TaskContinuationOptions` that were specified for those continuations.

Continuations that are disposed won't start.

## Continuations and child tasks

A continuation doesn't run until the antecedent and all of its attached child tasks have completed. A continuation doesn't wait for detached child tasks to finish. The following two examples illustrate child tasks that are attached to and detached from an antecedent that creates a continuation. In the following example, the continuation runs only after all child tasks have completed, and multiple runs of the example produces identical output each time. The example launches the antecedent by calling the `System.Threading.Tasks.TaskFactory.StartNew*` method because by default the `System.Threading.Tasks.Task.Run*` method creates a parent task whose default task creation option is `System.Threading.Tasks.TaskCreationOptions.DenyChildAttach`.

```csharp
﻿using System;
using System.Threading.Tasks;

public class AttachedExample
{
    public static async Task Main()
    {
        await Task.Factory
                  .StartNew(
            () =>
            {
                Console.WriteLine($"Running antecedent task {Task.CurrentId}...");
                Console.WriteLine("Launching attached child tasks...");
                for (int ctr = 1; ctr <= 5; ctr++)
                {
                    int index = ctr;
                    Task.Factory.StartNew(async value =>
                    {
                        Console.WriteLine($"   Attached child task #{value} running");
                        await Task.Delay(1000);
                    }, index, TaskCreationOptions.AttachedToParent);
                }
                Console.WriteLine("Finished launching attached child tasks...");
            }).ContinueWith(
                antecedent =>
                    Console.WriteLine($"Executing continuation of Task {antecedent.Id}"));
    }
}
// The example displays the similar output:
//     Running antecedent task 1...
//     Launching attached child tasks...
//     Finished launching attached child tasks...
//        Attached child task #1 running
//        Attached child task #5 running
//        Attached child task #3 running
//        Attached child task #2 running
//        Attached child task #4 running
//     Executing continuation of Task 1
```

If child tasks are detached from the antecedent, however, the continuation runs as soon as the antecedent has terminated, regardless of the state of the child tasks. As a result, multiple runs of the following example can produce variable output that depends on how the task scheduler handled each child task:

```csharp
﻿using System;
using System.Threading.Tasks;

public class DetachedExample
{
    public static async Task Main()
    {
        Task task =
            Task.Factory.StartNew(
                () =>
                {
                    Console.WriteLine($"Running antecedent task {Task.CurrentId}...");
                    Console.WriteLine("Launching attached child tasks...");
                    for (int ctr = 1; ctr <= 5; ctr++)
                    {
                        int index = ctr;
                        Task.Factory.StartNew(
                            async value =>
                            {
                                Console.WriteLine($"   Attached child task #{value} running");
                                await Task.Delay(1000);
                            }, index);
                    }
                    Console.WriteLine("Finished launching detached child tasks...");
                }, TaskCreationOptions.DenyChildAttach);

        Task continuation =
            task.ContinueWith(
                antecedent =>
                    Console.WriteLine($"Executing continuation of Task {antecedent.Id}"));

        await continuation;

        Console.ReadLine();
    }
}
// The example displays the similar output:
//     Running antecedent task 1...
//     Launching attached child tasks...
//     Finished launching detached child tasks...
//     Executing continuation of Task 1
//        Attached child task #1 running
//        Attached child task #5 running
//        Attached child task #2 running
//        Attached child task #3 running
//        Attached child task #4 running
```

The final status of the antecedent task depends on the final status of any attached child tasks. The status of detached child tasks doesn't affect the parent. For more information, see Attached and Detached Child Tasks.
