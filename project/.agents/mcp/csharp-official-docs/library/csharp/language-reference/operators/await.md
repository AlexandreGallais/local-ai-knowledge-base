---
title: "await operator - asynchronously wait for a task to complete"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/await.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# await operator - asynchronously await for a task to complete

The `await` operator suspends evaluation of the enclosing async method until the asynchronous operation represented by its operand completes. When the asynchronous operation completes, the `await` operator returns the result of the operation, if any. When the `await` operator is applied to the operand that represents an already completed operation, it returns the result of the operation immediately without suspension of the enclosing method. The `await` operator doesn't block the thread that evaluates the async method. When the `await` operator suspends the enclosing async method, the control returns to the caller of the method.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

In the following example, the `System.Net.Http.HttpClient.GetByteArrayAsync*` method returns the `Task<byte[]>` instance, which represents an asynchronous operation that produces a byte array when it completes. Until the operation completes, the `await` operator suspends the `DownloadDocsMainPageAsync` method. When `DownloadDocsMainPageAsync` gets suspended, control is returned to the `Main` method, which is the caller of `DownloadDocsMainPageAsync`. The `Main` method executes until it needs the result of the asynchronous operation performed by the `DownloadDocsMainPageAsync` method. When `System.Net.Http.HttpClient.GetByteArrayAsync*` gets all the bytes, the rest of the `DownloadDocsMainPageAsync` method is evaluated. After that, the rest of the `Main` method is evaluated.

```csharp
﻿public class AwaitOperator
{
    public static async Task Main()
    {
        Task<int> downloading = DownloadDocsMainPageAsync();
        Console.WriteLine($"{nameof(Main)}: Launched downloading.");

        int bytesLoaded = await downloading;
        Console.WriteLine($"{nameof(Main)}: Downloaded {bytesLoaded} bytes.");
    }

    private static async Task<int> DownloadDocsMainPageAsync()
    {
        Console.WriteLine($"{nameof(DownloadDocsMainPageAsync)}: About to start downloading.");

        var client = new HttpClient();
        byte[] content = await client.GetByteArrayAsync("https://learn.microsoft.com/en-us/");

        Console.WriteLine($"{nameof(DownloadDocsMainPageAsync)}: Finished downloading.");
        return content.Length;
    }
}
// Output similar to:
// DownloadDocsMainPageAsync: About to start downloading.
// Main: Launched downloading.
// DownloadDocsMainPageAsync: Finished downloading.
// Main: Downloaded 27700 bytes.
```
The operand of an `await` expression must provide for notification when a task completes. In general, a delegate is invoked when the task completes, either successfully or unsuccessfully. The `await` section of the C# language spec provides the details on how these notifications are implemented.

The preceding example uses the async `Main` method. For more information, see the await operator in the Main method section.

> **Note:**
> For an introduction to asynchronous programming, see Asynchronous programming with async and await. Asynchronous programming with `async` and `await` follows the task-based asynchronous pattern.

You can use the `await` operator only in a method, lambda expression, or anonymous method that is modified by the async keyword. Within an async method, you can't use the `await` operator in the body of a synchronous local function or inside the block of a lock statement. In earlier language versions, you also couldn't use `await` in an unsafe context. Under the C# 15 preview memory safety changes, `await` is allowed in an unsafe context. The remaining restriction is that you can't use `await` in the body or initializer of a `fixed` statement; for that rule and related diagnostics, see Resolve errors and warnings in unsafe code constructs.

The operand of the `await` operator is usually of one of the following .NET types: `System.Threading.Tasks.Task`, `System.Threading.Tasks.Task`1`, `System.Threading.Tasks.ValueTask`, or `System.Threading.Tasks.ValueTask`1`. However, any awaitable expression can be the operand of the `await` operator. For more information, see the Awaitable expressions section of the C# language specification.

The type of expression `await t` is `TResult` if the type of expression `t` is `System.Threading.Tasks.Task`1` or `System.Threading.Tasks.ValueTask`1`. If the type of `t` is `System.Threading.Tasks.Task` or `System.Threading.Tasks.ValueTask`, the type of `await t` is `void`. In both cases, if `t` throws an exception, `await t` rethrows the exception.

## Asynchronous streams and disposables

You use the `await foreach` statement to consume an asynchronous stream of data. For more information, see the `foreach` statement section of the Iteration statements article.

You use the `await using` statement to work with an asynchronously disposable object, that is, an object of a type that implements an `System.IAsyncDisposable` interface. For more information, see the Using async disposable section of the Implement a DisposeAsync method article.

## await operator in the Main method

The `Main` method serves as the application entry point. It can return `Task` or `Task<int>`, which makes it async. By making the `Main` method async, you can use the `await` operator in its body. In earlier C# versions, to ensure that the `Main` method waits for the completion of an asynchronous operation, retrieve the value of the `System.Threading.Tasks.Task`1.Result` property of the `System.Threading.Tasks.Task`1` instance that the corresponding async method returns. For asynchronous operations that don't produce a value, call the `System.Threading.Tasks.Task.Wait*` method. For information about how to select the language version, see C# language versioning.

## C# language specification

For more information, see the Await expressions section of the C# language specification.

## See also

- C# operators and expressions
- async
- Task asynchronous programming model
- Asynchronous programming
- Walkthrough: accessing the Web by using async and await
- Tutorial: Generate and consume async streams
- .NET blog: How async/await really works in C#
