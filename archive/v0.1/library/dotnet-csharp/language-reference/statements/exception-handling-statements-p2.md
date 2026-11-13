---
title: "Exception-handling statements - throw and try, catch, finally (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/statements/exception-handling-statements.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Exception-handling statements - throw and try, catch, finally (part 2 of 2)

## Advantages of exception filters

- **Better debugging experience**: Since the stack isn't unwound until a filter matches, debuggers can show the original point of failure with all local variables intact.
- **Performance benefits**: If no filter matches, the exception continues propagating without the overhead of stack unwinding and restoration.
- **Cleaner code**: Multiple filters can handle different conditions of the same exception type without requiring nested if-else statements.
- **Logging and diagnostics**: You can examine and log exception details before deciding whether to handle the exception:

```csharp
public static void DemonstrateDebuggingAdvantage()
{
    var contextData = new Dictionary<string, object>
    {
        ["RequestId"] = Guid.NewGuid(),
        ["UserId"] = "user123",
        ["Timestamp"] = DateTime.Now
    };

    try
    {
        // Simulate a deep call stack.
        Level1Method(contextData);
    }
    catch (Exception ex) when (LogAndFilter(ex, contextData))
    {
        // This catch block may never execute if LogAndFilter returns false.
        // But LogAndFilter can examine the exception while the stack is intact.
        Console.WriteLine("Exception handled after logging");
    }
}

private static void Level1Method(Dictionary<string, object> context)
{
    Level2Method(context);
}

private static void Level2Method(Dictionary<string, object> context)
{
    Level3Method(context);
}

private static void Level3Method(Dictionary<string, object> context)
{
    throw new InvalidOperationException("Error in deep call stack");
}

private static bool LogAndFilter(Exception ex, Dictionary<string, object> context)
{
    // This method runs before stack unwinding.
    // Full call stack and local variables are still available.
    Console.WriteLine($"Exception occurred: {ex.Message}");
    Console.WriteLine($"Request ID: {context["RequestId"]}");
    Console.WriteLine($"Full stack trace preserved: {ex.StackTrace}");
    
    // Return true to handle the exception, false to continue search.
    return ex.Message.Contains("deep call stack");
}
```
### When to use exception filters

Use exception filters when you need to:

- Handle exceptions based on specific conditions or properties.
- Preserve the original call stack for debugging.
- Log or examine exceptions before deciding whether to handle them.
- Handle the same exception type differently based on context.

```csharp
public static void HandleFileOperations(string filePath)
{
    try
    {
        // Simulate file operation that might fail.
        ProcessFile(filePath);
    }
    catch (IOException ex) when (ex.Message.Contains("access denied"))
    {
        Console.WriteLine("File access denied. Check permissions.");
    }
    catch (IOException ex) when (ex.Message.Contains("not found"))
    {
        Console.WriteLine("File not found. Verify the path.");
    }
    catch (IOException ex) when (IsNetworkPath(filePath))
    {
        Console.WriteLine($"Network file operation failed: {ex.Message}");
    }
    catch (IOException)
    {
        Console.WriteLine("Other I/O error occurred.");
    }
}

private static void ProcessFile(string filePath)
{
    // Simulate different types of file exceptions.
    if (filePath.Contains("denied"))
        throw new IOException("File access denied");
    if (filePath.Contains("missing"))
        throw new IOException("File not found");
    if (IsNetworkPath(filePath))
        throw new IOException("Network timeout occurred");
}

private static bool IsNetworkPath(string path)
{
    return path.StartsWith(@"\\") || path.StartsWith("http");
}
```
### Stack trace preservation

Exception filters preserve the original `ex.StackTrace` property. If a `catch` clause can't process the exception and re-throws it, the original stack information is lost. The `when` filter doesn't unwind the stack, so if a `when` filter is `false`, the original stack trace isn't changed.

The exception filter approach is valuable in applications where preserving debugging information is crucial for diagnosing code errors.

#### Exceptions in async and iterator methods

If an exception occurs in an async function, the exception propagates to the caller of the function when you await the result of the function, as the following example shows:

```csharp
public static async Task Run()
{
    try
    {
        Task<int> processing = ProcessAsync(-1);
        Console.WriteLine("Launched processing.");

        int result = await processing;
        Console.WriteLine($"Result: {result}.");
    }
    catch (ArgumentException e)
    {
        Console.WriteLine($"Processing failed: {e.Message}");
    }
    // Output:
    // Launched processing.
    // Processing failed: Input must be non-negative. (Parameter 'input')
}

private static async Task<int> ProcessAsync(int input)
{
    if (input < 0)
    {
        throw new ArgumentOutOfRangeException(nameof(input), "Input must be non-negative.");
    }

    await Task.Delay(500);
    return input;
}
```
If an exception occurs in an iterator method, the exception propagates to the caller only when the iterator advances to the next element.

### The `try-finally` statement

In a `try-finally` statement, the `finally` block runs when control leaves the `try` block. Control might leave the `try` block as a result of

- normal execution,
- execution of a jump statement (that is, `return`, `break`, `continue`, or `goto`), or
- propagation of an exception out of the `try` block.

The following example uses the `finally` block to reset the state of an object before control leaves the method:

```csharp
public async Task HandleRequest(int itemId, CancellationToken ct)
{
    Busy = true;

    try
    {
        await ProcessAsync(itemId, ct);
    }
    finally
    {
        Busy = false;
    }
}
```
You can also use the `finally` block to clean up allocated resources used in the `try` block.

> **Note:**
> When the type of a resource implements the `System.IDisposable` or `System.IAsyncDisposable` interface, consider the `using` statement. The `using` statement ensures that acquired resources are disposed when control leaves the `using` statement. The compiler transforms a `using` statement into a `try-finally` statement.

Whether the `finally` block executes depends on whether the operating system chooses to trigger an exception unwind operation. The only cases where `finally` blocks don't execute involve immediate termination of a program. For example, such a termination might happen because of the `System.Environment.FailFast*` call or an `System.OverflowException` or `System.InvalidProgramException` exception. Most operating systems perform reasonable resource clean-up as part of stopping and unloading the process.

### The `try-catch-finally` statement

Use a `try-catch-finally` statement both to handle exceptions that might occur during execution of the `try` block and to specify the code that must run when control leaves the `try` statement:

```csharp
public async Task ProcessRequest(int itemId, CancellationToken ct)
{
    Busy = true;

    try
    {
        await ProcessAsync(itemId, ct);
    }
    catch (Exception e) when (e is not OperationCanceledException)
    {
        LogError(e, $"Failed to process request for item ID {itemId}.");
        throw;
    }
    finally
    {
        Busy = false;
    }

}
```
When a `catch` block handles an exception, the `finally` block runs after the `catch` block finishes (even if another exception occurs during execution of the `catch` block). For information about `catch` and `finally` blocks, see The `try-catch` statement and The `try-finally` statement sections, respectively.

## C# language specification

For more information, see the following sections of the C# language specification:

- The `throw` statement
- The `try` statement
- Exceptions

## See also

- Exceptions and exception handling
- Handling and throwing exceptions in .NET
- throw preferences (style rule IDE0016)
- `System.AppDomain.FirstChanceException`
- `System.AppDomain.UnhandledException`
- `System.Threading.Tasks.TaskScheduler.UnobservedTaskException`
