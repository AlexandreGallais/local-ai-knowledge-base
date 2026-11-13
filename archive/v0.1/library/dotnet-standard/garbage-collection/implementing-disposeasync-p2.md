---
title: "Implement a DisposeAsync method (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/garbage-collection/implementing-disposeasync.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Implement a DisposeAsync method (part 2 of 2)

## Stacked usings

In situations where you create and use multiple objects that implement `System.IAsyncDisposable`, it's possible that stacking `await using` statements with `System.Threading.Tasks.ValueTask.ConfigureAwait*` could prevent calls to `System.IAsyncDisposable.DisposeAsync` in errant conditions. To ensure that `System.IAsyncDisposable.DisposeAsync` is always called, you should avoid stacking. The following three code examples show acceptable patterns to use instead.

### Acceptable pattern one

```csharp

class ExampleOneProgram
{
    static async Task Main()
    {
        var objOne = new ExampleAsyncDisposable();
        await using (objOne.ConfigureAwait(false))
        {
            // Interact with the objOne instance.

            var objTwo = new ExampleAsyncDisposable();
            await using (objTwo.ConfigureAwait(false))
            {
                // Interact with the objOne and/or objTwo instance(s).
            }
        }

        Console.ReadLine();
    }
}
```
In the preceding example, each asynchronous clean-up operation is explicitly scoped under the `await using` block. The outer scope follows how `objOne` sets its braces, enclosing `objTwo`, as such `objTwo` is disposed first, followed by `objOne`. Both `IAsyncDisposable` instances have their `System.IAsyncDisposable.DisposeAsync` method awaited, so each instance performs its asynchronous clean-up operation. The calls are nested, not stacked.

### Acceptable pattern two

```csharp
class ExampleTwoProgram
{
    static async Task Main()
    {
        var objOne = new ExampleAsyncDisposable();
        await using (objOne.ConfigureAwait(false))
        {
            // Interact with the objOne instance.
        }

        var objTwo = new ExampleAsyncDisposable();
        await using (objTwo.ConfigureAwait(false))
        {
            // Interact with the objTwo instance.
        }

        Console.ReadLine();
    }
}
```
In the preceding example, each asynchronous clean-up operation is explicitly scoped under the `await using` block. At the end of each block, the corresponding `IAsyncDisposable` instance has its `System.IAsyncDisposable.DisposeAsync` method awaited, thus performing its asynchronous clean-up operation. The calls are sequential, not stacked. In this scenario `objOne` is disposed first, then `objTwo` is disposed.

### Acceptable pattern three

```csharp
class ExampleThreeProgram
{
    static async Task Main()
    {
        var objOne = new ExampleAsyncDisposable();
        await using var ignored1 = objOne.ConfigureAwait(false);

        var objTwo = new ExampleAsyncDisposable();
        await using var ignored2 = objTwo.ConfigureAwait(false);

        // Interact with objOne and/or objTwo instance(s).

        Console.ReadLine();
    }
}
```
In the preceding example, each asynchronous clean-up operation is implicitly scoped with the containing method body. At the end of the enclosing block, the `IAsyncDisposable` instances perform their asynchronous clean-up operations. This example runs in reverse order from which they were declared, meaning that `objTwo` is disposed before `objOne`.

### Unacceptable pattern

The highlighted lines in the following code show what it means to have "stacked usings". If an exception is thrown from the `AnotherAsyncDisposable` constructor, neither object is properly disposed of. The variable `objTwo` is never assigned because the constructor didn't complete successfully. As a result, the constructor for `AnotherAsyncDisposable` is responsible for disposing any resources allocated before it throws an exception. If the `ExampleAsyncDisposable` type has a finalizer, it's eligible for finalization.

```csharp
class DoNotDoThisProgram
{
    static async Task Main()
    {
        var objOne = new ExampleAsyncDisposable();
        // Exception thrown on .ctor
        var objTwo = new AnotherAsyncDisposable();

        await using (objOne.ConfigureAwait(false))
        await using (objTwo.ConfigureAwait(false))
        {
            // Neither object has its DisposeAsync called.
        }

        Console.ReadLine();
    }
}
```
> **Tip:**
> Avoid this pattern as it could lead to unexpected behavior. If you use one of the acceptable patterns, the problem of undisposed objects is non-existent. The clean-up operations are correctly performed when `using` statements aren't stacked.

## See also

For a dual implementation example of `IDisposable` and `IAsyncDisposable`, see the `System.Text.Json.Utf8JsonWriter` source code on GitHub.

- Disposal of services
- `System.IAsyncDisposable`
- `System.IAsyncDisposable.DisposeAsync`
- `System.Threading.Tasks.TaskAsyncEnumerableExtensions.ConfigureAwait(System.IAsyncDisposable,System.Boolean)`
