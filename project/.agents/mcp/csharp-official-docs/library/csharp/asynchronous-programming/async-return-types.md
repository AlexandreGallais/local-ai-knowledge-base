---
title: "Async return types (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/asynchronous-programming/async-return-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Async return types (C#)

Async methods can have the following return types:

- `System.Threading.Tasks.Task`, for an async method that performs an operation but returns no value.
- `System.Threading.Tasks.Task`1`, for an async method that returns a value.
- `void`, for an event handler.
- Any type that has an accessible `GetAwaiter` method. The object returned by the `GetAwaiter` method must implement the `System.Runtime.CompilerServices.ICriticalNotifyCompletion` interface.
- `System.Collections.Generic.IAsyncEnumerable`1`, for an async method that returns an *async stream*.

For more information about async methods, see Asynchronous programming with async and await (C#).

Several other types also exist that are specific to Windows workloads:

- `System.Windows.Threading.DispatcherOperation`, for async operations limited to Windows.
- `Windows.Foundation.IAsyncAction`, for async actions in Universal Windows Platform (UWP) apps that don't return a value.
- `Windows.Foundation.IAsyncActionWithProgress`1`, for async actions in UWP apps that report progress but don't return a value.
- `Windows.Foundation.IAsyncOperation`1`, for async operations in UWP apps that return a value.
- `Windows.Foundation.IAsyncOperationWithProgress`2`, for async operations in UWP apps that report progress and return a value.

## Task return type

Async methods that don't contain a `return` statement or that contain a `return` statement that doesn't return an operand usually have a return type of `System.Threading.Tasks.Task`. Such methods return `void` if they run synchronously. If you use a `System.Threading.Tasks.Task` return type for an async method, a calling method can use an `await` operator to suspend the caller's completion until the called async method finishes.

In the following example, the `WaitAndApologizeAsync` method doesn't contain a `return` statement, so the method returns a `System.Threading.Tasks.Task` object. Returning a `Task` enables `WaitAndApologizeAsync` to be awaited. The `System.Threading.Tasks.Task` type doesn't include a `Result` property because it has no return value.

```csharp
﻿public class ExampleTask
{
    public static async Task DisplayCurrentInfoAsync()
    {
        await WaitAndApologizeAsync();

        Console.WriteLine($"Today is {DateTime.Now:D}");
        Console.WriteLine($"The current time is {DateTime.Now.TimeOfDay:t}");
        Console.WriteLine("The current temperature is 76 degrees.");
    }

    static async Task WaitAndApologizeAsync()
    {
        await Task.Delay(2000);

        Console.WriteLine("Sorry for the delay...\n");
    }
    // Example output:
    //    Sorry for the delay...
    //
    // Today is Monday, August 17, 2020
    // The current time is 12:59:24.2183304
    // The current temperature is 76 degrees.
}
```
`WaitAndApologizeAsync` is awaited by using an await statement instead of an await expression, similar to the calling statement for a synchronous void-returning method. The application of an await operator in this case doesn't produce a value. When the right operand of an `await` is a `System.Threading.Tasks.Task`1`, the `await` expression produces a result of `T`. When the right operand of an `await` is a `System.Threading.Tasks.Task`, the `await` and its operand are a statement.

You can separate the call to `WaitAndApologizeAsync` from the application of an await operator, as the following code shows. However, remember that a `Task` doesn't have a `Result` property, and that no value is produced when an await operator is applied to a `Task`.

The following code separates calling the `WaitAndApologizeAsync` method from awaiting the task that the method returns.

```csharp
﻿public class AwaitTaskExample
{
    public static async Task DisplayCurrentInfoAsync()
    {
        Task waitAndApologizeTask = WaitAndApologizeAsync();

        string output =
            $"Today is {DateTime.Now:D}\n" +
            $"The current time is {DateTime.Now.TimeOfDay:t}\n" +
            "The current temperature is 76 degrees.\n";

        await waitAndApologizeTask;
        Console.WriteLine(output);
    }

    static async Task WaitAndApologizeAsync()
    {
        await Task.Delay(2000);

        Console.WriteLine("Sorry for the delay...\n");
    }
    // Example output:
    //    Sorry for the delay...
    //
    // Today is Monday, August 17, 2020
    // The current time is 12:59:24.2183304
    // The current temperature is 76 degrees.
}
```
## Task\<TResult\> return type

The `System.Threading.Tasks.Task`1` return type is used for an async method that contains a return statement in which the operand is `TResult`.

In the following example, the `GetLeisureHoursAsync` method contains a `return` statement that returns an integer. The method declaration must specify a return type of `Task<int>`. The `System.Threading.Tasks.Task.FromResult*` async method is a placeholder for an operation that returns a `System.DateTime.DayOfWeek`.

```csharp
﻿public class FirstExample
{
    public static async Task ShowTodaysInfoAsync()
    {
        string message =
            $"Today is {DateTime.Today:D}\n" +
            "Today's hours of leisure: " +
            $"{await GetLeisureHoursAsync()}";

        Console.WriteLine(message);
    }

    static async Task<int> GetLeisureHoursAsync()
    {
        DayOfWeek today = await Task.FromResult(DateTime.Now.DayOfWeek);

        int leisureHours =
            today is DayOfWeek.Saturday || today is DayOfWeek.Sunday
            ? 16 : 5;

        return leisureHours;
    }
    // Example output:
    //    Today is Wednesday, May 24, 2017
    //    Today's hours of leisure: 5
}
```
When `GetLeisureHoursAsync` is called from within an await expression in the `ShowTodaysInfoAsync` method, the await expression retrieves the integer value (the value of `leisureHours`) stored in the task returned by the `GetLeisureHoursAsync` method. For more information about await expressions, see await.

You can better understand how `await` retrieves the result from a `Task<T>` by separating the call to `GetLeisureHoursAsync` from the application of `await`, as the following code shows. A call to method `GetLeisureHoursAsync` that isn't immediately awaited returns a `Task<int>`, as you would expect from the declaration of the method. The task is assigned to the `getLeisureHoursTask` variable in the example. Because `getLeisureHoursTask` is a `System.Threading.Tasks.Task`1`, it contains a `System.Threading.Tasks.Task`1.Result` property of type `TResult`. In this case, `TResult` represents an integer type. When `await` is applied to `getLeisureHoursTask`, the await expression evaluates to the contents of the `System.Threading.Tasks.Task`1.Result` property of `getLeisureHoursTask`. The value is assigned to the `ret` variable.

> **Important:**
> The `System.Threading.Tasks.Task`1.Result` property is a blocking property. If you try to access it before its task is finished, the thread that's currently active is blocked until the task completes and the value is available. In most cases, you should access the value by using `await` instead of accessing the property directly.
>
> The previous example retrieved the value of the `System.Threading.Tasks.Task`1.Result` property to block the main thread so that the `Main` method could print the `message` to the console before the application ended.

```csharp
﻿public class SecondExample
{
    public static async Task ShowTodaysInfoAsync()
    {
        var getLeisureHoursTask = GetLeisureHoursAsync();

        string message =
            $"Today is {DateTime.Today:D}\n" +
            "Today's hours of leisure: " +
            $"{await getLeisureHoursTask}";

        Console.WriteLine(message);
    }

    static async Task<int> GetLeisureHoursAsync()
    {
        DayOfWeek today = await Task.FromResult(DateTime.Now.DayOfWeek);

        int leisureHours =
            today is DayOfWeek.Saturday || today is DayOfWeek.Sunday
            ? 16 : 5;

        return leisureHours;
    }
}
```
## Void return type

You use the `void` return type in asynchronous event handlers, which require a `void` return type. For methods other than event handlers that don't return a value, you should return a `System.Threading.Tasks.Task` instead, because an async method that returns `void` can't be awaited. Any caller of such a method must continue to completion without waiting for the called async method to finish. The caller must be independent of any values or exceptions that the async method generates.

The caller of a void-returning async method can't catch exceptions thrown from the method. Such unhandled exceptions are likely to cause your application to fail. If a method that returns a `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` throws an exception, the exception is stored in the returned task. The exception is rethrown when the task is awaited. Make sure that any async method that can produce an exception has a return type of `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1` and that calls to the method are awaited.

The following example shows the behavior of an async event handler. In the example code, an async event handler must let the main thread know when it finishes. Then the main thread can wait for an async event handler to complete before exiting the program.

```csharp
﻿public class NaiveButton
{
    public event EventHandler? Clicked;

    public void Click()
    {
        Console.WriteLine("Somebody has clicked a button. Let's raise the event...");
        Clicked?.Invoke(this, EventArgs.Empty);
        Console.WriteLine("All listeners are notified.");
    }
}

public class AsyncVoidExample
{
    static readonly TaskCompletionSource<bool> s_tcs = new TaskCompletionSource<bool>();

    public static async Task MultipleEventHandlersAsync()
    {
        Task<bool> secondHandlerFinished = s_tcs.Task;

        var button = new NaiveButton();

        button.Clicked += OnButtonClicked1;
        button.Clicked += OnButtonClicked2Async;
        button.Clicked += OnButtonClicked3;

        Console.WriteLine("Before button.Click() is called...");
        button.Click();
        Console.WriteLine("After button.Click() is called...");

        await secondHandlerFinished;
    }

    private static void OnButtonClicked1(object? sender, EventArgs e)
    {
        Console.WriteLine("   Handler 1 is starting...");
        Task.Delay(100).Wait();
        Console.WriteLine("   Handler 1 is done.");
    }

    private static async void OnButtonClicked2Async(object? sender, EventArgs e)
    {
        Console.WriteLine("   Handler 2 is starting...");
        Task.Delay(100).Wait();
        Console.WriteLine("   Handler 2 is about to go async...");
        await Task.Delay(500);
        Console.WriteLine("   Handler 2 is done.");
        s_tcs.SetResult(true);
    }

    private static void OnButtonClicked3(object? sender, EventArgs e)
    {
        Console.WriteLine("   Handler 3 is starting...");
        Task.Delay(100).Wait();
        Console.WriteLine("   Handler 3 is done.");
    }
}
// Example output:
//
// Before button.Click() is called...
// Somebody has clicked a button. Let's raise the event...
//    Handler 1 is starting...
//    Handler 1 is done.
//    Handler 2 is starting...
//    Handler 2 is about to go async...
//    Handler 3 is starting...
//    Handler 3 is done.
// All listeners are notified.
// After button.Click() is called...
//    Handler 2 is done.
```
## Generalized async return types and ValueTask\<TResult\>

An async method can return any type that has an accessible `GetAwaiter` method that returns an instance of an *awaiter type*. In addition, the returned type must match the type of the parameter of `SetResult` and returned type of the `Task` property on the type specified by the `System.Runtime.CompilerServices.AsyncMethodBuilderAttribute` attribute. You can learn more in the article on Attributes read by the compiler or the C# spec for the Task type builder pattern.

This feature is the complement to awaitable expressions, which describes the requirements for the operand of `await`. Generalized async return types enable the compiler to generate `async` methods that return different types. Generalized async return types enabled performance improvements in the .NET libraries. Because `System.Threading.Tasks.Task` and `System.Threading.Tasks.Task`1` are reference types, memory allocation in performance-critical paths, particularly when allocations occur in tight loops, can adversely affect performance. Support for generalized return types means that you can return a lightweight value type instead of a reference type to avoid more memory allocations.

.NET provides the `System.Threading.Tasks.ValueTask`1` structure as a lightweight implementation of a generalized task-returning value. The following example uses the `System.Threading.Tasks.ValueTask`1` structure to retrieve the value of two dice rolls.

```csharp
﻿class Program
{
    static readonly Random s_rnd = new Random();

    static async Task Main() =>
        Console.WriteLine($"You rolled {await GetDiceRollAsync()}");

    static async ValueTask<int> GetDiceRollAsync()
    {
        Console.WriteLine("Shaking dice...");

        int roll1 = await RollAsync();
        int roll2 = await RollAsync();

        return roll1 + roll2;
    }

    static async ValueTask<int> RollAsync()
    {
        await Task.Delay(500);

        int diceRoll = s_rnd.Next(1, 7);
        return diceRoll;
    }
}
// Example output:
//    Shaking dice...
//    You rolled 8
```
Writing a generalized async return type is an advanced scenario, and is targeted for use in specialized environments. Consider using the `Task`, `Task<T>`, and `ValueTask<T>` types instead, which cover most scenarios for asynchronous code.

You can apply the `AsyncMethodBuilder` attribute to an async method (instead of the async return type declaration) to override the builder for that type. Typically you'd apply this attribute to use a different builder provided in the .NET runtime.
