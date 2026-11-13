---
title: "Object reuse with ObjectPool in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/ObjectPool.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Object reuse with ObjectPool in ASP.NET Core

By Günther Foidl, Steve Gordon, and Samson Amaugo

-->
-->

`Microsoft.Extensions.ObjectPool` is part of the ASP.NET Core infrastructure that supports keeping a group of objects in memory for reuse rather than allowing the objects to be garbage collected. All the static and instance methods in `Microsoft.Extensions.ObjectPool` are thread-safe.

Apps might want to use the object pool if the objects that are being managed are:

* Expensive to allocate/initialize.
* Represent a limited resource.
* Used predictably and frequently.

For example, the ASP.NET Core framework uses the object pool in some places to reuse `System.Text.StringBuilder` instances. `StringBuilder` allocates and manages its own buffers to hold character data. ASP.NET Core regularly uses `StringBuilder` to implement features, and reusing them provides a performance benefit.

Object pooling doesn't always improve performance:

* Unless the initialization cost of an object is high, it's usually slower to get the object from the pool.
* Objects managed by the pool aren't de-allocated until the pool is de-allocated.

Use object pooling only after collecting performance data using realistic scenarios for your app or library.

**NOTE: The ObjectPool doesn't place a limit on the number of objects that it allocates, it places a limit on the number of objects it retains.**

## ObjectPool concepts

When `Microsoft.Extensions.ObjectPool.DefaultObjectPoolProvider` is used and `T` implements `IDisposable`:

* Items that are ***not*** returned to the pool will be disposed.
* When the pool gets disposed by DI, all items in the pool are disposed.

NOTE: After the pool is disposed:

* Calling `Get` throws an `ObjectDisposedException`.
* Calling `Return` disposes the given item.

Important `ObjectPool` types and interfaces:

* `Microsoft.Extensions.ObjectPool.ObjectPool`1` : The basic <example-value> pool abstraction. Used to get and return objects.
* `Microsoft.Extensions.ObjectPool.PooledObjectPolicy`1` : Implement this to customize how an object is created and how it's reset when returned to the pool. This can be passed into an object pool that's constructed directly.
* `Microsoft.Extensions.ObjectPool.IResettable` : Automatically resets the object when returned to an object pool.

The ObjectPool can be used in an app in multiple ways:

* Instantiating a pool.
* Registering a pool in Dependency injection (DI) as an instance.
* Registering the `ObjectPoolProvider<>` in DI and using it as a factory.

## How to use ObjectPool

Call `Microsoft.Extensions.ObjectPool.ObjectPool`1.Get*` to get an object and `Microsoft.Extensions.ObjectPool.ObjectPool`1.Return*` to return the object.  There's no requirement to return every object. If an object isn't returned, it will be garbage collected.

## ObjectPool sample

The following code:

* Adds `ObjectPoolProvider` to the Dependency injection (DI) container.
* Implements the `IResettable` interface to automatically clear the contents of the buffer when returned to the object pool.

```csharp
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.ObjectPool;
using System.Security.Cryptography;

var builder = WebApplication.CreateBuilder(args);

builder.Services.TryAddSingleton<ObjectPoolProvider, DefaultObjectPoolProvider>();

builder.Services.TryAddSingleton<ObjectPool<ReusableBuffer>>(serviceProvider =>
{
    var provider = serviceProvider.GetRequiredService<ObjectPoolProvider>();
    var policy = new DefaultPooledObjectPolicy<ReusableBuffer>();
    return provider.Create(policy);
});

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

// return the SHA256 hash of a word 
// https://localhost:7214/hash/SamsonAmaugo
app.MapGet("/hash/{name}", (string name, ObjectPool<ReusableBuffer> bufferPool) =>
{

    var buffer = bufferPool.Get();
    try
    {
        // Set the buffer data to the ASCII values of a word
        for (var i = 0; i < name.Length; i++)
        {
            buffer.Data[i] = (byte)name[i];
        }

        Span<byte> hash = stackalloc byte[32];
        SHA256.HashData(buffer.Data.AsSpan(0, name.Length), hash);
        return "Hash: " + Convert.ToHexString(hash);
    }
    finally
    {
        // Data is automatically reset because this type implemented IResettable
        bufferPool.Return(buffer); 
    }
});
app.Run();

public class ReusableBuffer : IResettable
{
    public byte[] Data { get; } = new byte[1024 * 1024]; // 1 MB

    public bool TryReset()
    {
        Array.Clear(Data);
        return true;
    }
}
```

**NOTE:** When the pooled type `T` doesn't implement `IResettable`, then a custom `PooledObjectPolicy<T>` can be used to reset the state of the objects before they are returned to the pool.
