---
title: "ServiceCollectionHostedServiceExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceCollectionHostedServiceExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceCollectionHostedServiceExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ServiceCollectionHostedServiceExtensions
```

Extension methods for adding hosted services to an `IServiceCollection`.

To be added.

## ServiceCollectionHostedServiceExtensions.AddHostedService<THostedService>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddHostedService<THostedService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where THostedService : class, Microsoft.Extensions.Hosting.IHostedService;
```

Add an `IHostedService` registration for the given type.

Parameters:

- `THostedService`: An `IHostedService` to register.
- `services`: The `IServiceCollection` to register with.

Returns: The original `IServiceCollection`.

Note that this creates registration for `IHostedService` specifically. Not for the actual `THostedService` type.
If you want to register the actual type, you must do so separately.

The following code shows how to register a hosted service while also registering the actual `THostedService` type.

```csharp

            services.AddSingleton<SomeService>();
            services.AddHostedService(sp => sp.GetRequiredService<SomeService>());
            
```

## ServiceCollectionHostedServiceExtensions.AddHostedService<THostedService>(IServiceCollection, IServiceProvider,THostedService>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddHostedService<THostedService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<IServiceProvider,THostedService> implementationFactory) where THostedService : class, Microsoft.Extensions.Hosting.IHostedService;
```

Add an `IHostedService` registration for the given type.

Parameters:

- `THostedService`: An `IHostedService` to register.
- `services`: The `IServiceCollection` to register with.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: The original `IServiceCollection`.

Note that this creates registration for `IHostedService` specifically. Not for the actual `THostedService` type.
If you want to register the actual type, you must do so separately.

The following code shows how to register a hosted service while also registering the actual `THostedService` type.

```csharp

            services.AddSingleton<SomeService>(implementationFactory);
            services.AddHostedService(sp => sp.GetRequiredService<SomeService>());
            
```
