---
title: "Asynchronous programming (part 3 of 4)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/asynchronous-programming/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Asynchronous programming (part 3 of 4)

## Handle asynchronous exceptions

Up to this point, your code implicitly assumes all tasks complete successfully. Asynchronous methods throw exceptions, just like their synchronous counterparts. The goals for asynchronous support for exceptions and error handling are the same as for asynchronous support in general. The best practice is to write code that reads like a series of synchronous statements. Tasks throw exceptions when they can't complete successfully. The client code can catch those exceptions when the `await` expression is applied to a started task.

In the breakfast example, suppose the toaster catches fire while toasting the bread. You can simulate that problem by modifying the `ToastBreadAsync` method to match the following code:

```csharp
private static async Task<Toast> ToastBreadAsync(int slices)
{
    for (int slice = 0; slice < slices; slice++)
    {
        Console.WriteLine("Putting a slice of bread in the toaster");
    }
    Console.WriteLine("Start toasting...");
    await Task.Delay(2000);
    Console.WriteLine("Fire! Toast is ruined!");
    throw new InvalidOperationException("The toaster is on fire");
    await Task.Delay(1000);
    Console.WriteLine("Remove toast from toaster");

    return new Toast();
}
```

> **Note:**
> When you compile this code, you see a warning about unreachable code. This error is by design. After the toaster catches fire, operations don't proceed normally and the code returns an error.

After you make the code changes, run the application and check the output:

```console
Pouring coffee
Coffee is ready
Warming the egg pan...
putting 3 hash brown patties in the pan
Cooking first side of hash browns...
Putting a slice of bread in the toaster
Putting a slice of bread in the toaster
Start toasting...
Fire! Toast is ruined!
Flipping a hash brown patty
Flipping a hash brown patty
Flipping a hash brown patty
Cooking the second side of hash browns...
Cracking 2 eggs
Cooking the eggs ...
Put hash browns on plate
Put eggs on plate
Eggs are ready
Hash browns are ready
Unhandled exception. System.InvalidOperationException: The toaster is on fire
   at AsyncBreakfast.Program.ToastBreadAsync(Int32 slices) in Program.cs:line 65
   at AsyncBreakfast.Program.MakeToastWithButterAndJamAsync(Int32 number) in Program.cs:line 36
   at AsyncBreakfast.Program.Main(String[] args) in Program.cs:line 24
   at AsyncBreakfast.Program.<Main>(String[] args)
```

Notice that quite a few tasks finish between the time when the toaster catches fire and the system observes the exception. When a task that runs asynchronously throws an exception, that task is **faulted**. The `Task` object holds the exception thrown in the `System.Threading.Tasks.Task.Exception` property. Faulted tasks throw an exception when the `await` expression is applied to the task.

There are two important mechanisms to understand about this process:

- How an exception is stored in a faulted task
- How an exception is unpackaged and rethrown when code waits (`await`) on a faulted task

When code running asynchronously throws an exception, the exception is stored in the `Task` object. The `System.Threading.Tasks.Task.Exception` property is a `System.AggregateException` object because more than one exception might be thrown during asynchronous work. Any exception thrown is added to the `System.AggregateException.InnerExceptions` collection. If the `Exception` property is null, a new `AggregateException` object is created and the thrown exception is the first item in the collection.

The most common scenario for a faulted task is that the `Exception` property contains exactly one exception. When your code waits on a faulted task, it rethrows the first `System.AggregateException.InnerExceptions` exception in the collection. This result is the reason why the output from the example shows an `System.InvalidOperationException` object rather than an `AggregateException` object. Extracting the first inner exception makes working with asynchronous methods as similar as possible to working with their synchronous counterparts. You can examine the `Exception` property in your code when your scenario might generate multiple exceptions.

> **Tip:**
> The recommended practice is for any argument validation exceptions to emerge *synchronously* from task-returning methods. For more information and examples, see Exceptions in task-returning methods.

Before you continue to the next section, comment out the following two statements in your `ToastBreadAsync` method. You don't want to start another fire:

```csharp
Console.WriteLine("Fire! Toast is ruined!");
throw new InvalidOperationException("The toaster is on fire");
```

## Apply await expressions to tasks efficiently

You can improve the series of `await` expressions at the end of the previous code by using methods of the `Task` class. One API is the `System.Threading.Tasks.Task.WhenAll*` method, which returns a `System.Threading.Tasks.Task` object that completes when all the tasks in its argument list are complete. The following code demonstrates this method:

```csharp
await Task.WhenAll(eggsTask, hashBrownTask, toastTask);
Console.WriteLine("Eggs are ready");
Console.WriteLine("Hash browns are ready");
Console.WriteLine("Toast is ready");
Console.WriteLine("Breakfast is ready!");
```

Another option is to use the `System.Threading.Tasks.Task.WhenAny*` method, which returns a `Task<Task>` object that completes when any of its arguments complete. You can wait on the returned task because you know the task is done. The following code shows how you can use the `System.Threading.Tasks.Task.WhenAny*` method to wait on the first task to finish and then process its result. After you process the result from the completed task, you remove the completed task from the list of tasks passed to the `WhenAny` method.

```csharp
var breakfastTasks = new List<Task> { eggsTask, hashBrownTask, toastTask };
while (breakfastTasks.Count > 0)
{
    Task finishedTask = await Task.WhenAny(breakfastTasks);
    if (finishedTask == eggsTask)
    {
        Console.WriteLine("Eggs are ready");
    }
    else if (finishedTask == hashBrownTask)
    {
        Console.WriteLine("Hash browns are ready");
    }
    else if (finishedTask == toastTask)
    {
        Console.WriteLine("Toast is ready");
    }
    await finishedTask;
    breakfastTasks.Remove(finishedTask);
}
```

Near the end of the code snippet, notice the `await finishedTask;` expression. This line is important because `Task.WhenAny` returns a `Task<Task>` - a wrapper task that contains the completed task. When you `await Task.WhenAny`, you're waiting for the wrapper task to complete, and the result is the actual task that finished first. However, to retrieve that task's result or ensure any exceptions are properly thrown, you must `await` the completed task itself (stored in `finishedTask`). Even though you know the task has finished, awaiting it again allows you to access its result or handle any exceptions that might have caused it to fault.

### Review final code

Here's what the final version of the code looks like:

```csharp
﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AsyncBreakfast
{
    // These classes are intentionally empty for the purpose of this example. They are simply marker classes for the purpose of demonstration, contain no properties, and serve no other purpose.
    internal class HashBrown { }
    internal class Coffee { }
    internal class Egg { }
    internal class Juice { }
    internal class Toast { }

    class Program
    {
        static async Task Main(string[] args)
        {
            Coffee cup = PourCoffee();
            Console.WriteLine("coffee is ready");

            var eggsTask = FryEggsAsync(2);
            var hashBrownTask = FryHashBrownsAsync(3);
            var toastTask = MakeToastWithButterAndJamAsync(2);

            var breakfastTasks = new List<Task> { eggsTask, hashBrownTask, toastTask };
            while (breakfastTasks.Count > 0)
            {
                Task finishedTask = await Task.WhenAny(breakfastTasks);
                if (finishedTask == eggsTask)
                {
                    Console.WriteLine("eggs are ready");
                }
                else if (finishedTask == hashBrownTask)
                {
                    Console.WriteLine("hash browns are ready");
                }
                else if (finishedTask == toastTask)
                {
                    Console.WriteLine("toast is ready");
                }
                await finishedTask;
                breakfastTasks.Remove(finishedTask);
            }

            Juice oj = PourOJ();
            Console.WriteLine("oj is ready");
            Console.WriteLine("Breakfast is ready!");
        }

        static async Task<Toast> MakeToastWithButterAndJamAsync(int number)
        {
            var toast = await ToastBreadAsync(number);
            ApplyButter(toast);
            ApplyJam(toast);

            return toast;
        }

        private static Juice PourOJ()
        {
            Console.WriteLine("Pouring orange juice");
            return new Juice();
        }

        private static void ApplyJam(Toast toast) =>
            Console.WriteLine("Putting jam on the toast");

        private static void ApplyButter(Toast toast) =>
            Console.WriteLine("Putting butter on the toast");

        private static async Task<Toast> ToastBreadAsync(int slices)
        {
            for (int slice = 0; slice < slices; slice++)
            {
                Console.WriteLine("Putting a slice of bread in the toaster");
            }
            Console.WriteLine("Start toasting...");
            await Task.Delay(3000);
            Console.WriteLine("Remove toast from toaster");

            return new Toast();
        }

        private static async Task<HashBrown> FryHashBrownsAsync(int patties)
        {
            Console.WriteLine($"putting {patties} hash brown patties in the pan");
            Console.WriteLine("cooking first side of hash browns...");
            await Task.Delay(3000);
            for (int patty = 0; patty < patties; patty++)
            {
                Console.WriteLine("flipping a hash brown patty");
            }
            Console.WriteLine("cooking the second side of hash browns...");
            await Task.Delay(3000);
            Console.WriteLine("Put hash browns on plate");

            return new HashBrown();
        }

        private static async Task<Egg> FryEggsAsync(int howMany)
        {
            Console.WriteLine("Warming the egg pan...");
            await Task.Delay(3000);
            Console.WriteLine($"cracking {howMany} eggs");
            Console.WriteLine("cooking the eggs ...");
            await Task.Delay(3000);
            Console.WriteLine("Put eggs on plate");

            return new Egg();
        }

        private static Coffee PourCoffee()
        {
            Console.WriteLine("Pouring coffee");
            return new Coffee();
        }
    }
}
```
The code completes the asynchronous breakfast tasks in about 15 minutes. The total time is reduced because some tasks run concurrently. The code simultaneously monitors multiple tasks and takes action only as needed.

The final code is asynchronous. It more accurately reflects how a person might cook breakfast. Compare the final code with the first code sample in the article. The core actions are still clear by reading the code. You can read the final code the same way you read the list of instructions for making a breakfast, as shown at the beginning of the article. The language features for the `async` and `await` keywords provide the translation every person makes to follow the written instructions: Start tasks as you can and don't block while waiting for tasks to complete.
