---
title: "Asynchronous programming (part 2 of 4)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/asynchronous-programming/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Asynchronous programming (part 2 of 4)

## Start tasks concurrently

For most operations, you want to start several independent tasks immediately. As each task completes, you initiate other work that's ready to start. When you apply this methodology to the breakfast example, you can prepare breakfast more quickly. You also get everything ready close to the same time, so you can enjoy a hot breakfast.

The `System.Threading.Tasks.Task` class and related types are classes you can use to apply this style of reasoning to tasks that are in progress. This approach enables you to write code that more closely resembles the way you create breakfast in real life. You start cooking the eggs, hash browns, and toast at the same time. As each food item requires action, you turn your attention to that task, take care of the action, and then wait for something else that requires your attention.

In your code, you start a task and hold on to the `System.Threading.Tasks.Task` object that represents the work. You use the `await` method on the task to delay acting on the work until the result is ready.

Apply these changes to the breakfast code. The first step is to store the tasks for operations when they start, rather than using the `await` expression:

```csharp
Coffee cup = PourCoffee();
Console.WriteLine("Coffee is ready");

Task<Egg> eggsTask = FryEggsAsync(2);
Egg eggs = await eggsTask;
Console.WriteLine("Eggs are ready");

Task<HashBrown> hashBrownTask = FryHashBrownsAsync(3);
HashBrown hashBrown = await hashBrownTask;
Console.WriteLine("Hash browns are ready");

Task<Toast> toastTask = ToastBreadAsync(2);
Toast toast = await toastTask;
ApplyButter(toast);
ApplyJam(toast);
Console.WriteLine("Toast is ready");

Juice oj = PourOJ();
Console.WriteLine("Oj is ready");
Console.WriteLine("Breakfast is ready!");
```

These revisions don't help to get your breakfast ready any faster. The `await` expression is applied to all tasks as soon as they start. The next step is to move the `await` expressions for the hash browns and eggs to the end of the method, before you serve the breakfast:

```csharp
Coffee cup = PourCoffee();
Console.WriteLine("Coffee is ready");

Task<Egg> eggsTask = FryEggsAsync(2);
Task<HashBrown> hashBrownTask = FryHashBrownsAsync(3);
Task<Toast> toastTask = ToastBreadAsync(2);

Toast toast = await toastTask;
ApplyButter(toast);
ApplyJam(toast);
Console.WriteLine("Toast is ready");
Juice oj = PourOJ();
Console.WriteLine("Oj is ready");

Egg eggs = await eggsTask;
Console.WriteLine("Eggs are ready");
HashBrown hashBrown = await hashBrownTask;
Console.WriteLine("Hash browns are ready");

Console.WriteLine("Breakfast is ready!");
```

You now have an asynchronously prepared breakfast that takes about 20 minutes to prepare. The total cook time is reduced because some tasks run concurrently.

The code updates improve the preparation process by reducing the cook time, but they introduce a regression by burning the eggs and hash browns. You start all the asynchronous tasks at once. You wait on each task only when you need the results. The code might be similar to program in a web application that makes requests to different microservices and then combines the results into a single page. You make all the requests immediately, and then apply the `await` expression on all those tasks and compose the web page.

## Support composition with tasks

The previous code revisions help get everything ready for breakfast at the same time, except the toast. The process of making the toast is a _composition_ of an asynchronous operation (toast the bread) with synchronous operations (spread butter and jam on the toast). This example illustrates an important concept about asynchronous programming:

> **Important:**
> The composition of an asynchronous operation followed by synchronous work is an asynchronous operation. Stated another way, if any portion of an operation is asynchronous, the entire operation is asynchronous.

In the previous updates, you learned how to use `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` objects to hold running tasks. You wait on each task before you use its result. The next step is to create methods that represent the combination of other work. Before you serve breakfast, you want to wait on the task that represents toasting the bread before you spread the butter and jam.

You can represent this work with the following code:

```csharp
﻿using System;
using System.Threading.Tasks;

namespace AsyncBreakfast
{
    class Program
    {
        // These classes are intentionally empty for the purpose of this example. They are simply marker classes for the purpose of demonstration, contain no properties, and serve no other purpose.
        internal class HashBrown { }
        internal class Coffee { }
        internal class Egg { }
        internal class Juice { }
        internal class Toast { }

        static async Task Main(string[] args)
        {
            Coffee cup = PourCoffee();
            Console.WriteLine("coffee is ready");

            var eggsTask = FryEggsAsync(2);
            var hashBrownTask = FryHashBrownsAsync(3);
            var toastTask = MakeToastWithButterAndJamAsync(2);

            var eggs = await eggsTask;
            Console.WriteLine("eggs are ready");

            var hashBrown = await hashBrownTask;
            Console.WriteLine("hash browns are ready");

            var toast = await toastTask;
            Console.WriteLine("toast is ready");

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
            await Task.Delay(2000);
            // Uncomment these lines for testing exception behavior.
            // Console.WriteLine("Fire! Toast is ruined!");
            // throw new InvalidOperationException("The toaster is on fire");
            await Task.Delay(1000);
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
The `MakeToastWithButterAndJamAsync` method has the `async` modifier in its signature that signals to the compiler that the method contains an `await` expression and contains asynchronous operations. The method represents the task that toasts the bread, then spreads the butter and jam. The method returns a `System.Threading.Tasks.Task`1` object that represents the composition of the three operations.

The revised main block of code now looks like this:

```csharp
﻿using System;
using System.Threading.Tasks;

namespace AsyncBreakfast
{
    class Program
    {
        // These classes are intentionally empty for the purpose of this example. They are simply marker classes for the purpose of demonstration, contain no properties, and serve no other purpose.
        internal class HashBrown { }
        internal class Coffee { }
        internal class Egg { }
        internal class Juice { }
        internal class Toast { }

        static async Task Main(string[] args)
        {
            Coffee cup = PourCoffee();
            Console.WriteLine("coffee is ready");

            var eggsTask = FryEggsAsync(2);
            var hashBrownTask = FryHashBrownsAsync(3);
            var toastTask = MakeToastWithButterAndJamAsync(2);

            var eggs = await eggsTask;
            Console.WriteLine("eggs are ready");

            var hashBrown = await hashBrownTask;
            Console.WriteLine("hash browns are ready");

            var toast = await toastTask;
            Console.WriteLine("toast is ready");

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
            await Task.Delay(2000);
            // Uncomment these lines for testing exception behavior.
            // Console.WriteLine("Fire! Toast is ruined!");
            // throw new InvalidOperationException("The toaster is on fire");
            await Task.Delay(1000);
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
This code change illustrates an important technique for working with asynchronous code. You compose tasks by separating the operations into a new method that returns a task. You can choose when to wait on that task. You can start other tasks concurrently.
