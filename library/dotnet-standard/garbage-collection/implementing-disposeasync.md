---
title: "Implement a DisposeAsync method (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/garbage-collection/implementing-disposeasync.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Implement a DisposeAsync method

The `System.IAsyncDisposable` interface was introduced as part of C# 8.0. You implement the `System.IAsyncDisposable.DisposeAsync` method when you need to perform resource cleanup, just as you would when implementing a Dispose method. One of the key differences, however, is that this implementation allows for asynchronous cleanup operations. The `System.IAsyncDisposable.DisposeAsync` returns a `System.Threading.Tasks.ValueTask` that represents the asynchronous disposal operation.

It's typical when implementing the `System.IAsyncDisposable` interface that classes also implement the `System.IDisposable` interface. A good implementation pattern of the `System.IAsyncDisposable` interface is to be prepared for either synchronous or asynchronous disposal, however, it's not a requirement. If no synchronous disposable of your class is possible, having only `System.IAsyncDisposable` is acceptable. All of the guidance for implementing the disposal pattern also applies to the asynchronous implementation. This article assumes that you're already familiar with how to implement a Dispose method.

> **Caution:**
> If you implement the `System.IAsyncDisposable` interface but not the `System.IDisposable` interface, your app can potentially leak resources. If a class implements `System.IAsyncDisposable`, but not `System.IDisposable`, and a consumer only calls `Dispose`, your implementation would never call `DisposeAsync`. This would result in a resource leak.

> **Tip:**
> With regard to dependency injection, when registering services in an `Microsoft.Extensions.DependencyInjection.IServiceCollection`, the service lifetime is managed implicitly on your behalf. The `System.IServiceProvider` and corresponding `Microsoft.Extensions.Hosting.IHost` orchestrate resource cleanup. Specifically, implementations of `System.IDisposable` and `System.IAsyncDisposable` are properly disposed at the end of their specified lifetime.
>
> For more information, see Dependency injection in .NET.

## Explore `DisposeAsync` and `DisposeAsyncCore` methods

The `System.IAsyncDisposable` interface declares a single parameterless method, `System.IAsyncDisposable.DisposeAsync`. Any nonsealed class should define a `DisposeAsyncCore()` method that also returns a `System.Threading.Tasks.ValueTask`.

- A `public` `System.IAsyncDisposable.DisposeAsync` implementation that has no parameters.
- A `protected virtual ValueTask DisposeAsyncCore()` method whose signature is:

  ```csharp
  protected virtual ValueTask DisposeAsyncCore()
  {
  }
  ```

### The `DisposeAsync` method

The `public` parameterless `DisposeAsync()` method is called implicitly in an `await using` statement, and its purpose is to free unmanaged resources, perform general cleanup, and to indicate that the finalizer, if one is present, need not run. Freeing the memory associated with a managed object is always the domain of the garbage collector. Because of this, it has a standard implementation:

```csharp
public async ValueTask DisposeAsync()
{
    // Perform async cleanup.
    await DisposeAsyncCore().ConfigureAwait(false);

    // Dispose of unmanaged resources.
    Dispose(false);

    // Suppress finalization.
    GC.SuppressFinalize(this);
}
```

> **Note:**
> One primary difference in the async dispose pattern compared to the dispose pattern, is that the call from `System.IAsyncDisposable.DisposeAsync` to the `Dispose(bool)` overload method is given `false` as an argument. When implementing the `System.IDisposable.Dispose` method, however, `true` is passed instead. This helps ensure functional equivalence with the synchronous dispose pattern, and further ensures that finalizer code paths still get invoked. In other words, the `DisposeAsyncCore()` method will dispose of managed resources asynchronously, so you don't want to dispose of them synchronously as well. Therefore, call `Dispose(false)` instead of `Dispose(true)`.

### The `DisposeAsyncCore` method

The `DisposeAsyncCore()` method is intended to perform the asynchronous cleanup of managed resources or for cascading calls to `DisposeAsync()`. It encapsulates the common asynchronous cleanup operations when a subclass inherits a base class that is an implementation of `System.IAsyncDisposable`. The `DisposeAsyncCore()` method is `virtual` so that derived classes can define custom cleanup in their overrides.

> **Tip:**
> If an implementation of `System.IAsyncDisposable` is `sealed`, the `DisposeAsyncCore()` method is not needed, and the asynchronous cleanup can be performed directly in the `System.IAsyncDisposable.DisposeAsync` method.

## Implement the async dispose pattern

All nonsealed classes should be considered a potential base class, because they could be inherited. If you implement the async dispose pattern for any potential base class, you must provide the `protected virtual ValueTask DisposeAsyncCore()` method. Some of the following examples use a `NoopAsyncDisposable` class that is defined as follows:

```csharp
public sealed class NoopAsyncDisposable : IAsyncDisposable
{
    ValueTask IAsyncDisposable.DisposeAsync() => ValueTask.CompletedTask;
}
```
Here's an example implementation of the async dispose pattern that uses the `NoopAsyncDisposable` type. The type implements `DisposeAsync` by returning `System.Threading.Tasks.ValueTask.CompletedTask`.

```csharp
﻿public class ExampleAsyncDisposable : IAsyncDisposable
{
    private IAsyncDisposable? _example;

    public ExampleAsyncDisposable() =>
        _example = new NoopAsyncDisposable();

    public async ValueTask DisposeAsync()
    {
        await DisposeAsyncCore().ConfigureAwait(false);

        GC.SuppressFinalize(this);
    }

    protected virtual async ValueTask DisposeAsyncCore()
    {
        if (_example is not null)
        {
            await _example.DisposeAsync().ConfigureAwait(false);
        }

        _example = null;
    }
}
```
In the preceding example:

- The `ExampleAsyncDisposable` is a nonsealed class that implements the `System.IAsyncDisposable` interface.
- It contains a private `IAsyncDisposable` field, `_example`, that's initialized in the constructor.
- The `DisposeAsync` method delegates to the `DisposeAsyncCore` method and calls `System.GC.SuppressFinalize*` to notify the garbage collector that the finalizer doesn't have to run.
- It contains a `DisposeAsyncCore()` method that calls the `_example.DisposeAsync()` method, and sets the field to `null`.
- The `DisposeAsyncCore()` method is `virtual`, which allows subclasses to override it with custom behavior.

### Sealed alternative async dispose pattern

If your implementing class can be `sealed`, you can implement the async dispose pattern by overriding the `System.IAsyncDisposable.DisposeAsync` method. The following example shows how to implement the async dispose pattern for a sealed class:

```csharp
﻿public sealed class SealedExampleAsyncDisposable : IAsyncDisposable
{
    private readonly IAsyncDisposable _example;

    public SealedExampleAsyncDisposable() =>
        _example = new NoopAsyncDisposable();

    public ValueTask DisposeAsync() => _example.DisposeAsync();
}
```
In the preceding example:

- The `SealedExampleAsyncDisposable` is a sealed class that implements the `System.IAsyncDisposable` interface.
- The containing `_example` field is `readonly` and is initialized in the constructor.
- The `DisposeAsync` method calls the `_example.DisposeAsync()` method, implementing the pattern through the containing field (cascading disposal).

## Implement both dispose and async dispose patterns

You may need to implement both the `System.IDisposable` and `System.IAsyncDisposable` interfaces, especially when your class scope contains instances of these implementations. Doing so ensures that you can properly cascade clean up calls. Here's an example class that implements both interfaces and demonstrates the proper guidance for cleanup.

```csharp
﻿class ExampleConjunctiveDisposableusing : IDisposable, IAsyncDisposable
{
    IDisposable? _disposableResource = new MemoryStream();
    IAsyncDisposable? _asyncDisposableResource = new MemoryStream();

    public void Dispose()
    {
        Dispose(disposing: true);
        GC.SuppressFinalize(this);
    }

    public async ValueTask DisposeAsync()
    {
        await DisposeAsyncCore().ConfigureAwait(false);

        Dispose(disposing: false);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (disposing)
        {
            _disposableResource?.Dispose();
            _disposableResource = null;

            if (_asyncDisposableResource is IDisposable disposable)
            {
                disposable.Dispose();
                _asyncDisposableResource = null;
            }
        }
    }

    protected virtual async ValueTask DisposeAsyncCore()
    {
        if (_asyncDisposableResource is not null)
        {
            await _asyncDisposableResource.DisposeAsync().ConfigureAwait(false);
        }

        if (_disposableResource is IAsyncDisposable disposable)
        {
            await disposable.DisposeAsync().ConfigureAwait(false);
        }
        else
        {
            _disposableResource?.Dispose();
        }

        _asyncDisposableResource = null;
        _disposableResource = null;
    }
}
```
The `System.IDisposable.Dispose` and `System.IAsyncDisposable.DisposeAsync` implementations are both simple boilerplate code.

In the `Dispose(bool)` overload method, the `System.IDisposable` instance is conditionally disposed of if it isn't `null`. The `System.IAsyncDisposable` instance is cast as `System.IDisposable`, and if it's also not `null`, it's disposed of as well. Both instances are then assigned to `null`.

With the `DisposeAsyncCore()` method, the same logical approach is followed. If the `System.IAsyncDisposable` instance isn't `null`, its call to `DisposeAsync().ConfigureAwait(false)` is awaited. If the `System.IDisposable` instance is also an implementation of `System.IAsyncDisposable`, it's also disposed of asynchronously. Both instances are then assigned to `null`.

Each implementation strives to dispose of all possible disposable objects. This ensures that the cleanup is cascaded properly.

## Using async disposable

To properly consume an object that implements the `System.IAsyncDisposable` interface, you use the await and using keywords together. Consider the following example, where the `ExampleAsyncDisposable` class is instantiated and then wrapped in an `await using` statement.

```csharp
﻿class ExampleConfigureAwaitProgram
{
    static async Task Main()
    {
        var exampleAsyncDisposable = new ExampleAsyncDisposable();
        await using (exampleAsyncDisposable.ConfigureAwait(false))
        {
            // Interact with the exampleAsyncDisposable instance.
        }

        Console.ReadLine();
    }
}
```
> **Important:**
> Use the `System.Threading.Tasks.TaskAsyncEnumerableExtensions.ConfigureAwait(System.IAsyncDisposable,System.Boolean)` extension method of the `System.IAsyncDisposable` interface to configure how the continuation of the task is marshalled on its original context or scheduler. For more information on `ConfigureAwait`, see ConfigureAwait FAQ.

For situations where the usage of `ConfigureAwait` isn't needed, the `await using` statement could be simplified as follows:

```csharp
﻿class ExampleUsingStatementProgram
{
    static async Task Main()
    {
        await using (var exampleAsyncDisposable = new ExampleAsyncDisposable())
        {
            // Interact with the exampleAsyncDisposable instance.
        }

        Console.ReadLine();
    }
}
```
Furthermore, it could be written to use the implicit scoping of a using declaration.

```csharp
﻿class ExampleUsingDeclarationProgram
{
    static async Task Main()
    {
        await using var exampleAsyncDisposable = new ExampleAsyncDisposable();

        // Interact with the exampleAsyncDisposable instance.

        Console.ReadLine();
    }
}
```
## Multiple await keywords in a single line

Sometimes the `await` keyword may appear multiple times within a single line. For example, consider the following code:

```csharp
await using var transaction = await context.Database.BeginTransactionAsync(token);
```

In the preceding example:

- The `System.Data.Common.DbConnection.BeginTransactionAsync*` method is awaited.
- The return type is `System.Data.Common.DbTransaction`, which implements `IAsyncDisposable`.
- The `transaction` is used asynchronously, and also awaited.
