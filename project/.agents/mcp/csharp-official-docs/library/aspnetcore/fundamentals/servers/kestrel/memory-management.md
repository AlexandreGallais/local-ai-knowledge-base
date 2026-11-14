---
title: "Memory management in Kestrel"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/servers/kestrel/memory-management.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Memory management in Kestrel

By Tom Dykstra

This article provides guidance for managing memory in Kestrel, including automatic eviction from memory pools and using memory pool metrics.

## Automatic eviction from memory pool

The memory pools used by Kestrel, IIS, and HTTP.sys automatically evict memory blocks when the application is idle or under low load. The feature runs automatically and doesn't need to be enabled or configured manually.

This automatic eviction feature reduces overall memory usage and helps applications stay responsive under varying workloads. In versions of .NET earlier than 10, memory allocated by the pool remained reserved even when not in use.

### Use memory pool metrics

The default memory pool used by the ASP.NET Core server implementations includes metrics, which can be used to monitor and analyze memory usage patterns. The metrics are under the name `"Microsoft.AspNetCore.MemoryPool"`.

For information about metrics and how to use them, see ASP.NET Core metrics.

## Manage memory pools

Besides using memory pools efficiently by evicting unneeded memory blocks, ASP.NET Core provides a built-in IMemoryPoolFactory interface and its default implementation, which are available through dependency injection.

The following code example shows a simple background service that uses the built-in memory pool factory implementation to create memory pools. These pools benefit from the automatic eviction feature:

```csharp
public class MyBackgroundService : BackgroundService
{
    private readonly MemoryPool<byte> _memoryPool;

    public MyBackgroundService(IMemoryPoolFactory<byte> factory)
    {
        _memoryPool = factory.Create();
    }

    protected override async Task ExecuteAsync(CancellationToken <example-value>)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await Task.Delay(20, stoppingToken);
                // do work that needs memory
                // consider checking _memoryPool.MaxBufferSize
                var rented = _memoryPool.Rent(100);
                rented.Dispose();
            }
            catch (OperationCanceledException)
            {
                return;
            }
        }
    }
}
```
To use a custom memory pool factory, make a class that implements `IMemoryPoolFactory` and register it with dependency injection, as the following example does. Memory pools created this way do not benefit from the automatic eviction feature unless you implement similar eviction logic in your custom factory:

```csharp
services.AddSingleton<IMemoryPoolFactory<byte>,
CustomMemoryPoolFactory>();

public class CustomMemoryPoolFactory : IMemoryPoolFactory<byte>
{
    public MemoryPool<byte> Create()
    {
        // Return a custom MemoryPool implementation
        // or the default, as is shown here.
        return MemoryPool<byte>.Shared;
    }
}
```
When you're using a memory pool, be aware of the pool's `System.Buffers.MemoryPool`1.MaxBufferSize`.
