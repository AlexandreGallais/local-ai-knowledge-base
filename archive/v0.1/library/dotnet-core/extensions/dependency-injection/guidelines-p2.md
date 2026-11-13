---
title: "Dependency injection guidelines (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/dependency-injection/guidelines.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Dependency injection guidelines (part 2 of 2)

## Example anti-patterns

In addition to the guidelines in this article, there are several anti-patterns you **should avoid**. Some of these anti-patterns are learnings from developing the runtimes themselves.

> **Warning:**
> These are example anti-patterns. *Do not* copy the code, *do not* use these patterns, and avoid these patterns at all costs.

### Disposable transient services captured by container

When you register *transient* services that implement `System.IDisposable`, by default the DI container holds onto these references. It doesn't dispose of them until the container is disposed when application stops if they were resolved from the container, or until the scope is disposed if they were resolved from a scope. A memory leak can result if resolved from container level.

In the preceding anti-pattern, 1,000 `ExampleDisposable` objects are instantiated and rooted. They won't be disposed of until the `serviceProvider` instance is disposed.

For more information on debugging memory leaks, see Debug a memory leak in .NET.

### Async DI factories can cause deadlocks

The term "DI factories" refers to the overload methods that exist when calling `Add{LIFETIME}`. There are overloads that accept a `Func<IServiceProvider, T>` where `T` is the service being registered, and the parameter is named `implementationFactory`. The `implementationFactory` can be provided as a lambda expression, local function, or method. If the factory is asynchronous, and you use `System.Threading.Tasks.Task`1.Result`, it will cause a deadlock.

In the preceding code, the `implementationFactory` is given a lambda expression where the body calls `System.Threading.Tasks.Task`1.Result` on a `Task<Bar>` returning method. This ***causes a deadlock***. The `GetBarAsync` method simply emulates an asynchronous work operation with `System.Threading.Tasks.Task.Delay*`, and then calls `Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService``1(System.IServiceProvider)`.

For more information on asynchronous guidance, see Asynchronous programming: Important info and advice. For more information debugging deadlocks, see Debug a deadlock in .NET.

When you're running this anti-pattern and the deadlock occurs, you can view the two threads waiting from Visual Studio's Parallel Stacks window. For more information, see View threads and tasks in the Parallel Stacks window.

### Captive dependency

The term "captive dependency", coined by Mark Seemann, refers to the misconfiguration of service lifetimes, where a longer-lived service holds a shorter-lived service captive.

In the preceding code, `Foo` is registered as a singleton and `Bar` is scoped - which on the surface seems valid. However, consider the implementation of `Foo`.

```csharp
﻿namespace DependencyInjection.AntiPatterns;

public class Foo(Bar bar)
{
}
```
The `Foo` object requires a `Bar` object, and since `Foo` is a singleton, and `Bar` is scoped, this is a misconfiguration. As is, `Foo` is only instantiated once, and it holds onto `Bar` for its lifetime, which is longer than the intended scoped lifetime of `Bar`. Consider validating scopes by passing `validateScopes: true` to the `Microsoft.Extensions.DependencyInjection.ServiceCollectionContainerBuilderExtensions.BuildServiceProvider(Microsoft.Extensions.DependencyInjection.IServiceCollection,System.Boolean)`. When you validate the scopes, you get an `System.InvalidOperationException` with a message similar to "Cannot consume scoped service 'Bar' from singleton 'Foo'.".

For more information, see Scope validation.

### Scoped service as singleton

When using scoped services, if you're not creating a scope or within an existing scope, the service becomes a singleton.

In the preceding code, `Bar` is retrieved within an `Microsoft.Extensions.DependencyInjection.IServiceScope`, which is correct. The anti-pattern is the retrieval of `Bar` outside of the scope, and the variable is named `avoid` to show which example retrieval is incorrect.

## See also

- Dependency injection in .NET
- Quickstart: Dependency injection basics
- Tutorial: Use dependency injection in .NET
