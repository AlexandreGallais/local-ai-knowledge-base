---
title: "Dependency injection (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/dependency-injection/overview.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Dependency injection (part 2 of 2)

## Keyed services

You can register services and perform lookups based on a key. In other words, it's possible to register multiple services with different keys and use this key for the lookup.

For example, consider the case where you have different implementations of the interface `IMessageWriter`: `MemoryMessageWriter` and `QueueMessageWriter`.

You can register these services using the overload of the service registration methods (seen earlier) that supports a key as a parameter:

```csharp
services.AddKeyedSingleton<IMessageWriter, MemoryMessageWriter>("memory");
services.AddKeyedSingleton<IMessageWriter, QueueMessageWriter>("queue");
```

The `key` isn't limited to `string`. The `key` can be any `object` you want, as long as the type correctly implements `Equals`.

In the constructor of the class that uses `IMessageWriter`, you add the `Microsoft.Extensions.DependencyInjection.FromKeyedServicesAttribute` to specify the key of the service to resolve:

```csharp
public class ExampleService
{
    public ExampleService(
        [FromKeyedServices("queue")] IMessageWriter writer)
    {
        // Omitted for brevity...
    }
}
```

### KeyedService.AnyKey <example-value>

The `Microsoft.Extensions.DependencyInjection.KeyedService.AnyKey` property provides a special key for working with keyed services.

#### Service registration

You can register a service using `KeyedService.AnyKey` as a fallback that matches any key. This is useful when you want to provide a default implementation for any key that doesn't have an explicit registration.

```csharp
var services = new ServiceCollection();

// Register a fallback cache for any key.
services.AddKeyedSingleton<ICache>(KeyedService.AnyKey, (sp, key) =>
{
    // Create a cache instance based on the key.
    return new DefaultCache(key?.ToString() ?? "unknown");
});

// Register a specific cache for the "premium" key.
services.AddKeyedSingleton<ICache>("premium", new PremiumCache());

ServiceProvider provider = services.BuildServiceProvider();

// Requesting with "premium" key <example-value> PremiumCache.
ICache? premiumCache = provider.GetKeyedService<ICache>("premium");
Console.WriteLine($"Premium key: {premiumCache}");

// Requesting with any other key uses the AnyKey fallback.
ICache? basicCache = provider.GetKeyedService<ICache>("basic");
Console.WriteLine($"Basic key: {basicCache}");

ICache? standardCache = provider.GetKeyedService<ICache>("standard");
Console.WriteLine($"Standard key: {standardCache}");

/* This example outputs:
 * 
 * Premium key: <example-value> cache
 * Basic key: basic cache
 * Standard key: <example-value> cache
*/
```
In the preceding example:

- Requesting `ICache` with key `"premium"` returns the `PremiumCache` instance.
- Requesting `ICache` with any other key (like `"basic"` or `"standard"`) creates a new `DefaultCache` using the `AnyKey` fallback.

#### Query for services

You can query for all services that were registered *using a specific key* (that is, not with `KeyedService.AnyKey`), by passing `KeyedService.AnyKey` to `Microsoft.Extensions.DependencyInjection.ServiceProviderKeyedServiceExtensions.GetKeyedServices``1(System.IServiceProvider,System.Object)`.

```csharp
IEnumerable<ICache>? keyedCaches = provider.GetKeyedServices<ICache>(KeyedService.AnyKey);
foreach (ICache cache in keyedCaches)
{
    Console.WriteLine($"AnyKey <example-value> cache: {cache}");
}

/* This example outputs:
 * 
 * AnyKey <example-value> cache: Premium cache
*/
```
In the preceding example, calling `GetKeyedServices<T>(KeyedService.AnyKey)` returns only the `PremiumCache` instance since it's the only cache that was registered using a specific key in the service registration code example.

> **Important:**
> Starting in .NET 10, calling `GetKeyedService()` (singular) with `KeyedService.AnyKey` throws an `System.InvalidOperationException` because `AnyKey` shouldn't be used to resolve a single service. For more information, see Fix issues in GetKeyedService() and GetKeyedServices() with AnyKey.

## See also

- Quickstart: Dependency injection basics
- Tutorial: Use dependency injection in .NET
- Dependency injection guidelines
- Dependency injection in ASP.NET Core
- NDC Conference Patterns for DI app development
- Explicit dependencies principle
- Inversion of control containers and the dependency injection pattern (Martin Fowler)
