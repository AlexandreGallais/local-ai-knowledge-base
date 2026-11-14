---
title: "Asynchronous programming (part 4 of 4)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/asynchronous-programming/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Asynchronous programming (part 4 of 4)

## Async/await vs ContinueWith

The `async` and `await` keywords provide syntactic simplification over using `System.Threading.Tasks.Task.ContinueWith*` directly. While `async`/`await` and `ContinueWith` have similar semantics for handling asynchronous operations, the compiler doesn't necessarily translate `await` expressions directly into `ContinueWith` method calls. Instead, the compiler generates optimized state machine code that provides the same logical behavior. This transformation provides significant readability and maintainability benefits, especially when chaining multiple asynchronous operations.

Consider a scenario where you need to perform multiple sequential asynchronous operations. Here's how the same logic looks when implemented with `ContinueWith` compared to `async`/`await`:

### Using ContinueWith

With `ContinueWith`, each step in a sequence of asynchronous operations requires nested continuations:

```csharp
// Using ContinueWith - demonstrates the complexity when chaining operations
static Task MakeBreakfastWithContinueWith()
{
    return StartCookingEggsAsync()
        .ContinueWith(eggsTask =>
        {
            var eggs = eggsTask.Result;
            Console.WriteLine("Eggs ready, starting bacon...");
            return StartCookingBaconAsync();
        })
        .Unwrap()
        .ContinueWith(baconTask =>
        {
            var bacon = baconTask.Result;
            Console.WriteLine("Bacon ready, starting toast...");
            return StartToastingBreadAsync();
        })
        .Unwrap()
        .ContinueWith(toastTask =>
        {
            var toast = toastTask.Result;
            Console.WriteLine("Toast ready, applying butter...");
            return ApplyButterAsync(toast);
        })
        .Unwrap()
        .ContinueWith(butteredToastTask =>
        {
            var butteredToast = butteredToastTask.Result;
            Console.WriteLine("Butter applied, applying jam...");
            return ApplyJamAsync(butteredToast);
        })
        .Unwrap()
        .ContinueWith(finalToastTask =>
        {
            var finalToast = finalToastTask.Result;
            Console.WriteLine("Breakfast completed with ContinueWith!");
        });
}
```
### Using async/await

The same sequence of operations using `async`/`await` reads much more naturally:

```csharp
// Using async/await - much cleaner and easier to read
static async Task MakeBreakfastWithAsyncAwait()
{
    var eggs = await StartCookingEggsAsync();
    Console.WriteLine("Eggs ready, starting bacon...");
    
    var bacon = await StartCookingBaconAsync();
    Console.WriteLine("Bacon ready, starting toast...");
    
    var toast = await StartToastingBreadAsync();
    Console.WriteLine("Toast ready, applying butter...");
    
    var butteredToast = await ApplyButterAsync(toast);
    Console.WriteLine("Butter applied, applying jam...");
    
    var finalToast = await ApplyJamAsync(butteredToast);
    Console.WriteLine("Breakfast completed with async/await!");
}
```
### Why async/await is preferred

The `async`/`await` approach offers several advantages:

- **Readability**: The code reads like synchronous code, making it easier to understand the flow of operations.
- **Maintainability**: Adding or removing steps in the sequence requires minimal code changes.
- **Error handling**: Exception handling with `try`/`catch` blocks works naturally, whereas `ContinueWith` requires careful handling of faulted tasks.
- **Debugging**: The call stack and debugger experience is much better with `async`/`await`.
- **Performance**: The compiler optimizations for `async`/`await` are more sophisticated than manual `ContinueWith` chains.

The benefit becomes even more apparent as the number of chained operations increases. While a single continuation might be manageable with `ContinueWith`, sequences of 3-4 or more asynchronous operations quickly become difficult to read and maintain. This pattern, known as "monadic do-notation" in functional programming, allows you to compose multiple asynchronous operations in a sequential, readable manner.

## Next step

> Explore real world scenarios for asynchronous programs
