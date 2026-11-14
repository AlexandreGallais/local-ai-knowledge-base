---
title: "EmptyServiceProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/EmptyServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EmptyServiceProvider class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public sealed class EmptyServiceProvider : IServiceProvider, Microsoft.Extensions.DependencyInjection.IKeyedServiceProvider, Microsoft.Extensions.DependencyInjection.IServiceProviderIsKeyedService
```

Provides an `IServiceProvider` that contains no application services.

Like the `IServiceProvider` returned by `new ServiceCollection().BuildServiceProvider()`,
this provider still exposes the built-in services (`IServiceProvider`,
`IServiceScopeFactory`, `IServiceProviderIsService` and
`IServiceProviderIsKeyedService`) and resolves requests for
`IEnumerable<T>` to an empty sequence.

Use `EmptyServiceProvider.Instance` to access the shared singleton instead of writing a custom empty provider.

## EmptyServiceProvider.Instance property

```csharp
public static Microsoft.Extensions.DependencyInjection.EmptyServiceProvider Instance { get; }
```

Gets the shared `EmptyServiceProvider` instance.

Returns: To be added.

To be added.

## EmptyServiceProvider.Microsoft.Extensions.DependencyInjection.IKeyedServiceProvider.GetKeyedService(Type, Object) method

```csharp
object IKeyedServiceProvider.GetKeyedService (Type serviceType, object serviceKey);
```

To be added.

Parameters:

- `serviceType`: To be added.
- `serviceKey`: To be added.

Returns: To be added.

To be added.

## EmptyServiceProvider.Microsoft.Extensions.DependencyInjection.IKeyedServiceProvider.GetRequiredKeyedService(Type, Object) method

```csharp
object IKeyedServiceProvider.GetRequiredKeyedService (Type serviceType, object serviceKey);
```

To be added.

Parameters:

- `serviceType`: To be added.
- `serviceKey`: To be added.

Returns: To be added.

To be added.

## EmptyServiceProvider.Microsoft.Extensions.DependencyInjection.IServiceProviderIsKeyedService.IsKeyedService(Type, Object) method

```csharp
bool IServiceProviderIsKeyedService.IsKeyedService (Type serviceType, object serviceKey);
```

To be added.

Parameters:

- `serviceType`: To be added.
- `serviceKey`: To be added.

Returns: To be added.

To be added.

## EmptyServiceProvider.Microsoft.Extensions.DependencyInjection.IServiceProviderIsService.IsService(Type) method

```csharp
bool IServiceProviderIsService.IsService (Type serviceType);
```

To be added.

Parameters:

- `serviceType`: To be added.

Returns: To be added.

To be added.

## EmptyServiceProvider.System.IServiceProvider.GetService(Type) method

```csharp
object IServiceProvider.GetService (Type serviceType);
```

To be added.

Parameters:

- `serviceType`: To be added.

Returns: To be added.

To be added.
