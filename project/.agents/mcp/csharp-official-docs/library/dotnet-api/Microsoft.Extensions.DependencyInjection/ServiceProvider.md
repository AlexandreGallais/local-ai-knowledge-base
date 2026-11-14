---
title: "ServiceProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceProvider class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public sealed class ServiceProvider : IAsyncDisposable, IDisposable, IServiceProvider, Microsoft.Extensions.DependencyInjection.IKeyedServiceProvider
```

The default IServiceProvider.

To be added.

## ServiceProvider.Dispose() method

```csharp
public void Dispose ();
```

Disposes the service provider and all resolved services that implement `IDisposable`.

Prefer calling `ServiceProvider.DisposeAsync` over this method. If any resolved service implements
`IAsyncDisposable` but not `IDisposable`, this method throws an
`InvalidOperationException`. Use `ServiceProvider.DisposeAsync` to properly handle all
disposable services, or explicitly perform sync-over-async on the caller side if synchronous
disposal is required.

## ServiceProvider.DisposeAsync() method

```csharp
public System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously disposes the service provider and all resolved services that implement `IDisposable` or `IAsyncDisposable`.

Returns: A value task that represents the asynchronous operation.

Awaiting individual `IAsyncDisposable.DisposeAsync` calls uses `ConfigureAwait(false)`,
so when an asynchronous dispose operation yields, its continuations do not attempt to resume on the original
synchronization context. Services should not rely on disposal continuations running on any particular context.

## ServiceProvider.GetKeyedService(Type, Object) method

```csharp
public object? GetKeyedService (Type serviceType, object? serviceKey);
```

Gets the service object of the specified type with the specified key.

Parameters:

- `serviceType`: The type of the service to get.
- `serviceKey`: The key of the service to get.

Returns: The keyed service.

Exceptions:

- `InvalidOperationException`: The `KeyedService.AnyKey` value is used for `serviceKey`
when `serviceType` is not an enumerable based on `IEnumerable<T>`.

To be added.

## ServiceProvider.GetRequiredKeyedService(Type, Object) method

```csharp
public object GetRequiredKeyedService (Type serviceType, object? serviceKey);
```

Gets the service object of the specified type.

Parameters:

- `serviceType`: The type of the service to get.
- `serviceKey`: The key of the service to get.

Returns: The keyed service.

Exceptions:

- `InvalidOperationException`: The service wasn't found or the `KeyedService.AnyKey` value is used
for `serviceKey` when `serviceType` is not an enumerable based on `IEnumerable<T>`.

To be added.

## ServiceProvider.GetService(Type) method

```csharp
public object? GetService (Type serviceType);
```

Gets the service object of the specified type.

Parameters:

- `serviceType`: The type of the service to get.

Returns: The service that was produced.

To be added.
