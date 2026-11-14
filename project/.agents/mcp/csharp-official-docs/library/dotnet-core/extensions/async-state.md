---
title: "Asynchronous state management"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/async-state.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Asynchronous state management

The 📦 `Microsoft.Extensions.AsyncState` NuGet package provides functionality to store and retrieve objects within the current asynchronous context. This package offers performance and usability improvements over using `System.Threading.AsyncLocal`1` directly, particularly when multiple objects need to be shared across asynchronous operations.

## Why use AsyncState

While .NET provides `AsyncLocal<T>` for managing ambient data in asynchronous contexts, using it directly can have drawbacks:

- **Performance**: Each `AsyncLocal<T>` instance adds overhead. When multiple objects need to flow through async contexts, managing many `AsyncLocal<T>` instances can impact performance.
- **Abstraction**: Direct use of `AsyncLocal<T>` couples your code to a specific implementation, making it harder to optimize or change in the future.
- **Lifetime management**: The AsyncState package provides better control over the lifetime of ambient data through explicit APIs.

The `Microsoft.Extensions.AsyncState` package addresses these concerns by providing:

- An optimized implementation that reduces the number of `AsyncLocal<T>` instances needed.
- A clean abstraction for storing and retrieving ambient data.
- Integration with dependency injection for easier testing and configuration.

## Get started

To get started with asynchronous state management, install the `Microsoft.Extensions.AsyncState` NuGet package.

### .NET CLI

```dotnetcli
dotnet add package Microsoft.Extensions.AsyncState
```

### PackageReference

```xml
<PackageReference Include="Microsoft.Extensions.AsyncState" Version="10.0.0" />
```

---

For more information, see dotnet add package or Manage package dependencies in .NET applications.

## Register async state services

Register the async state services with your dependency injection container using the `Microsoft.Extensions.DependencyInjection.AsyncStateExtensions.AddAsyncState*` extension method:

```csharp
using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();

services.AddAsyncState();

ServiceProvider provider = services.BuildServiceProvider();
```

This registration makes the `Microsoft.Extensions.AsyncState.IAsyncContext`1` and `Microsoft.Extensions.AsyncState.IAsyncState` interfaces available for dependency injection.

## Use IAsyncContext

The `Microsoft.Extensions.AsyncState.IAsyncContext`1` interface provides methods to get and set values in the current asynchronous context:

```csharp
var context = provider.GetRequiredService<IAsyncContext<UserContext>>();

// Set a value in the async context
var userContext = new UserContext { UserId = "12345", UserName = "Alice" };
context.Set(userContext);

// Retrieve the value
if (context.TryGet(out var retrievedContext))
{
    Console.WriteLine($"User: {retrievedContext.UserName}");
}
```
```csharp
public record class UserContext
{
    public required string UserId { get; set; }
    public required string UserName { get; set; }
}
```
The value set in the context flows through asynchronous operations, making it available to all code executing within the same async context.

## Use IAsyncState

The `Microsoft.Extensions.AsyncState.IAsyncState` interface is the base lifecycle interface that `IAsyncContext<T>` extends. It provides `Initialize()` and `Reset()` methods for managing the async state lifecycle. For typed access to async state values, use `IAsyncContext<T>` instead.

## Practical example: Request correlation

A common use case for async state is maintaining correlation information across an HTTP request:

```csharp
public class RequestProcessor(IAsyncContext<CorrelationContext> asyncContext)
{

    public async Task ProcessRequestAsync(string correlationId)
    {
        // Set correlation context at the beginning of request processing
        asyncContext.Set(new CorrelationContext { CorrelationId = correlationId });

        // The correlation ID flows through all async operations
        await Step1Async();
        await Step2Async();
    }

    private async Task Step1Async()
    {
        await Task.Yield();
        
        if (asyncContext.TryGet(out var context))
        {
            Console.WriteLine($"Step 1 - Correlation ID: {context.CorrelationId}");
        }
    }

    private async Task Step2Async()
    {
        await Task.Yield();
        
        if (asyncContext.TryGet(out var context))
        {
            Console.WriteLine($"Step 2 - Correlation ID: {context.CorrelationId}");
        }
    }
}
```
```csharp
public class CorrelationContext
{
    public required string CorrelationId { get; set; }
}
```
In this example, the correlation ID is set once at the beginning of request processing and is automatically available in all subsequent async operations without needing to pass it as a parameter.

## ASP.NET Core integration

In ASP.NET Core applications, you can use async state to flow request-specific information through your application:

```csharp
public class RequestHandler(IAsyncContext<RequestMetadata> asyncContext)
{

    public async Task<object> GetDataAsync()
    {
        await Task.Yield();
        
        if (asyncContext.TryGet(out var metadata))
        {
            var duration = DateTimeOffset.UtcNow - metadata.StartTime;
            return new
            {
                RequestId = metadata.RequestId,
                RequestPath = metadata.RequestPath,
                Duration = duration.TotalMilliseconds
            };
        }

        return new { Error = "No request metadata available" };
    }
}
```
```csharp
public record class RequestMetadata
{
    public required string RequestId { get; set; }
    public required string RequestPath { get; set; }
    public DateTimeOffset StartTime { get; set; }
}
```
## Best practices

When using async state, consider the following best practices:

- **Limit state size**: Keep async state objects small to reduce memory overhead and maintain performance.
- **Initialize state early**: Set async state values as early as possible to ensure they're available to all downstream async operations.
- **Clean up state**: Reset or clear async state when it's no longer needed to avoid memory leaks in long-running applications.
- **Use appropriate interfaces**: Use `IAsyncContext<T>` to get and set typed values within the current async context. Use `IAsyncState` when you need to directly manage the initialization and reset lifecycle.
- **Type safety**: Create specific context types rather than using generic dictionaries to maintain type safety and improve code clarity.

## See also

- Dependency injection in .NET
- `System.Threading.AsyncLocal`1`
- ASP.NET Core middleware
