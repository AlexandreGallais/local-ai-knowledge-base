---
title: "The Task Asynchronous Programming (TAP) model with async and await\" (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/asynchronous-programming/task-asynchronous-programming-model.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# The Task Asynchronous Programming (TAP) model with async and await" (part 2 of 2)

## Return types and parameters

An async method typically returns a `System.Threading.Tasks.Task` or a `System.Threading.Tasks.Task`1`. Inside an async method, an `await` operator is applied to a task that's returned from a call to another async method.

You specify `System.Threading.Tasks.Task`1` as the return type if the method contains a `return` statement that specifies an operand of type `TResult`.

You use `System.Threading.Tasks.Task`  as the return type if the method has no return statement or has a return statement that doesn't return an operand.

You can also specify any other return type, if the type includes a `GetAwaiter` method. `System.Threading.Tasks.ValueTask`1` is an example of such a type. It's available in the System.Threading.Tasks.Extension NuGet package.

The following example shows how you declare and call a method that returns a `System.Threading.Tasks.Task`1` or a `System.Threading.Tasks.Task`:

```csharp
async Task<int> GetTaskOfTResultAsync()
{
    int hours = 0;
    await Task.Delay(0);

    return hours;
}

Task<int> returnedTaskTResult = GetTaskOfTResultAsync();
int intResult = await returnedTaskTResult;
// Single line
// int intResult = await GetTaskOfTResultAsync();

async Task GetTaskAsync()
{
    await Task.Delay(0);
    // No return statement needed
}

Task returnedTask = GetTaskAsync();
await returnedTask;
// Single line
await GetTaskAsync();
```

Each returned task represents ongoing work. A task encapsulates information about the state of the asynchronous process and, eventually, either the final result from the process or the exception that the process raises if it doesn't succeed.

An async method can also have a `void` return type. This return type is used primarily to define event handlers, where a `void` return type is required. Async event handlers often serve as the starting point for async programs.

An async method that has a `void` return type can't be awaited, and the caller of a void-returning method can't catch any exceptions that the method throws.

An async method can't declare in, ref or out parameters, but the method can call methods that have such parameters. Similarly, an async method can't return a value by reference, although it can call methods with ref return values.

For more information and examples, see Async return types (C#).

Asynchronous APIs in Windows Runtime programming have one of the following return types, which are similar to tasks:

- `Windows.Foundation.IAsyncOperation`1`, which corresponds to `System.Threading.Tasks.Task`1`
- `Windows.Foundation.IAsyncAction`, which corresponds to `System.Threading.Tasks.Task`
- `Windows.Foundation.IAsyncActionWithProgress`1`
- `Windows.Foundation.IAsyncOperationWithProgress`2`

## Naming convention

By convention, methods that return commonly awaitable types (for example, `Task`, `Task<T>`, `ValueTask`, `ValueTask<T>`) should have names that end with "Async". Methods that start an asynchronous operation but don't return an awaitable type shouldn't have names that end with "Async", but might start with "Begin", "Start", or some other verb to suggest this method doesn't return or throw the result of the operation.

You can ignore the convention where an event, base class, or interface contract suggests a different name. For example, you shouldn't rename common event handlers, such as `OnButtonClick`.

## Related articles (Visual Studio)

| Title | Description |
|--|--|
| How to make multiple web requests in parallel by using async and await (C#) | Demonstrates how to start several tasks at the same time. |
| Async return types (C#) | Illustrates the types that async methods can return, and explains when each type is appropriate. |
| Cancel tasks with a cancellation token as a signaling mechanism. | Shows how to add the following functionality to your async solution: - Cancel a list of tasks (C#)- Cancel tasks after a period of time (C#)- Process asynchronous task as they complete (C#) |
| Using async for file access (C#) | Lists and demonstrates the benefits of using async and await to access files. |
| Task-based asynchronous pattern (TAP) | Describes an asynchronous pattern. The pattern is based on the `System.Threading.Tasks.Task` and `System.Threading.Tasks.Task`1` types. |
| Async Videos on Channel 9 | Provides links to various videos about async programming. |

## See also

- Asynchronous programming with async and await
- async
- await
