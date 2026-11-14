---
title: "ServiceCollectionDescriptorExtensions class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection.Extensions/ServiceCollectionDescriptorExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceCollectionDescriptorExtensions class (part 3 of 3)

## ServiceCollectionDescriptorExtensions.TryAddTransient(IServiceCollection, Type, Type) method

```csharp
public static void TryAddTransient (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, Type implementationType);
```

Adds the specified `service` as a `ServiceLifetime.Transient` service
with the `implementationType` implementation
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `implementationType`: The implementation type of the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddTransient<TService>(IServiceCollection) method

```csharp
public static void TryAddTransient<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection) where TService : class;
```

Adds the specified `TService` as a `ServiceLifetime.Transient` service
to the `collection` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `collection`: The `IServiceCollection`.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddTransient<TService>(IServiceCollection, IServiceProvider,TService>) method

```csharp
public static void TryAddTransient<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<IServiceProvider,TService> implementationFactory) where TService : class;
```

Adds the specified `TService` as a `ServiceLifetime.Transient` service
using the factory specified in `implementationFactory`
to the `services` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `services`: The `IServiceCollection`.
- `implementationFactory`: The factory that creates the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddTransient<TService,TImplementation>(IServiceCollection) method

```csharp
public static void TryAddTransient<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection) where TService : class where TImplementation : class, TService;
```

Adds the specified `TService` as a `ServiceLifetime.Transient` service
implementation type specified in `TImplementation`
to the `collection` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `collection`: The `IServiceCollection`.

To be added.
