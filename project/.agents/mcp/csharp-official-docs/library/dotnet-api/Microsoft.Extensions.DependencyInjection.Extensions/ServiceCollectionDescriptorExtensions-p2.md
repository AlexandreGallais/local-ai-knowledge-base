---
title: "ServiceCollectionDescriptorExtensions class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection.Extensions/ServiceCollectionDescriptorExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceCollectionDescriptorExtensions class (part 2 of 3)

## ServiceCollectionDescriptorExtensions.TryAddKeyedSingleton<TService>(IServiceCollection, Object, TService) method

```csharp
public static void TryAddKeyedSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, object? serviceKey, TService instance) where TService : class;
```

Adds the specified `TService` as a `ServiceLifetime.Singleton` service
with an instance specified in `instance`
to the `collection` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `collection`: The `IServiceCollection`.
- `serviceKey`: The service key.
- `instance`: The instance of the service to add.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedSingleton<TService,TImplementation>(IServiceCollection, Object) method

```csharp
public static void TryAddKeyedSingleton<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, object? serviceKey) where TService : class where TImplementation : class, TService;
```

Adds the specified `TService` as a `ServiceLifetime.Singleton` service
implementation type specified in `TImplementation`
to the `collection` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `collection`: The `IServiceCollection`.
- `serviceKey`: The service key.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedTransient(IServiceCollection, Type, Object) method

```csharp
public static void TryAddKeyedTransient (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, object? serviceKey);
```

Adds the specified `service` as a `ServiceLifetime.Transient` service
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `serviceKey`: The service key.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedTransient(IServiceCollection, Type, Object, Object>) method

```csharp
public static void TryAddKeyedTransient (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, object? serviceKey, Func<IServiceProvider,object?,object> implementationFactory);
```

Adds the specified `service` as a `ServiceLifetime.Transient` service
using the factory specified in `implementationFactory`
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `serviceKey`: The service key.
- `implementationFactory`: The factory that creates the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedTransient(IServiceCollection, Type, Object, Type) method

```csharp
public static void TryAddKeyedTransient (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, object? serviceKey, Type implementationType);
```

Adds the specified `service` as a `ServiceLifetime.Transient` service
with the `implementationType` implementation
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `serviceKey`: The service key.
- `implementationType`: The implementation type of the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedTransient<TService>(IServiceCollection, Object) method

```csharp
public static void TryAddKeyedTransient<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, object? serviceKey) where TService : class;
```

Adds the specified `TService` as a `ServiceLifetime.Transient` service
to the `collection` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `collection`: The `IServiceCollection`.
- `serviceKey`: The service key.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedTransient<TService>(IServiceCollection, Object, Object,TService>) method

```csharp
public static void TryAddKeyedTransient<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey, Func<IServiceProvider,object?,TService> implementationFactory) where TService : class;
```

Adds the specified `TService` as a `ServiceLifetime.Transient` service
using the factory specified in `implementationFactory`
to the `services` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `services`: The `IServiceCollection`.
- `serviceKey`: The service key.
- `implementationFactory`: The factory that creates the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedTransient<TService,TImplementation>(IServiceCollection, Object) method

```csharp
public static void TryAddKeyedTransient<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, object? serviceKey) where TService : class where TImplementation : class, TService;
```

Adds the specified `TService` as a `ServiceLifetime.Transient` service
implementation type specified in `TImplementation`
to the `collection` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `collection`: The `IServiceCollection`.
- `serviceKey`: The service key.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddScoped(IServiceCollection, Type) method

```csharp
public static void TryAddScoped (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service);
```

Adds the specified `service` as a `ServiceLifetime.Scoped` service
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddScoped(IServiceCollection, Type, Object>) method

```csharp
public static void TryAddScoped (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, Func<IServiceProvider,object> implementationFactory);
```

Adds the specified `service` as a `ServiceLifetime.Scoped` service
using the factory specified in `implementationFactory`
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `implementationFactory`: The factory that creates the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddScoped(IServiceCollection, Type, Type) method

```csharp
public static void TryAddScoped (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, Type implementationType);
```

Adds the specified `service` as a `ServiceLifetime.Scoped` service
with the `implementationType` implementation
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `implementationType`: The implementation type of the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddScoped<TService>(IServiceCollection) method

```csharp
public static void TryAddScoped<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection) where TService : class;
```

Adds the specified `TService` as a `ServiceLifetime.Scoped` service
to the `collection` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `collection`: The `IServiceCollection`.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddScoped<TService>(IServiceCollection, IServiceProvider,TService>) method

```csharp
public static void TryAddScoped<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<IServiceProvider,TService> implementationFactory) where TService : class;
```

Adds the specified `TService` as a `ServiceLifetime.Scoped` service
using the factory specified in `implementationFactory`
to the `services` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `services`: The `IServiceCollection`.
- `implementationFactory`: The factory that creates the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddScoped<TService,TImplementation>(IServiceCollection) method

```csharp
public static void TryAddScoped<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection) where TService : class where TImplementation : class, TService;
```

Adds the specified `TService` as a `ServiceLifetime.Scoped` service
implementation type specified in `TImplementation`
to the `collection` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `collection`: The `IServiceCollection`.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddSingleton(IServiceCollection, Type) method

```csharp
public static void TryAddSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service);
```

Adds the specified `service` as a `ServiceLifetime.Singleton` service
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddSingleton(IServiceCollection, Type, Object>) method

```csharp
public static void TryAddSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, Func<IServiceProvider,object> implementationFactory);
```

Adds the specified `service` as a `ServiceLifetime.Singleton` service
using the factory specified in `implementationFactory`
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `implementationFactory`: The factory that creates the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddSingleton(IServiceCollection, Type, Type) method

```csharp
public static void TryAddSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, Type implementationType);
```

Adds the specified `service` as a `ServiceLifetime.Singleton` service
with the `implementationType` implementation
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `implementationType`: The implementation type of the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddSingleton<TService>(IServiceCollection) method

```csharp
public static void TryAddSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection) where TService : class;
```

Adds the specified `TService` as a `ServiceLifetime.Singleton` service
to the `collection` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `collection`: The `IServiceCollection`.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddSingleton<TService>(IServiceCollection, IServiceProvider,TService>) method

```csharp
public static void TryAddSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<IServiceProvider,TService> implementationFactory) where TService : class;
```

Adds the specified `TService` as a `ServiceLifetime.Singleton` service
using the factory specified in `implementationFactory`
to the `services` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `services`: The `IServiceCollection`.
- `implementationFactory`: The factory that creates the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddSingleton<TService>(IServiceCollection, TService) method

```csharp
public static void TryAddSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, TService instance) where TService : class;
```

Adds the specified `TService` as a `ServiceLifetime.Singleton` service
with an instance specified in `instance`
to the `collection` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `collection`: The `IServiceCollection`.
- `instance`: The instance of the service to add.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddSingleton<TService,TImplementation>(IServiceCollection) method

```csharp
public static void TryAddSingleton<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection) where TService : class where TImplementation : class, TService;
```

Adds the specified `TService` as a `ServiceLifetime.Singleton` service
implementation type specified in `TImplementation`
to the `collection` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `collection`: The `IServiceCollection`.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddTransient(IServiceCollection, Type) method

```csharp
public static void TryAddTransient (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service);
```

Adds the specified `service` as a `ServiceLifetime.Transient` service
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddTransient(IServiceCollection, Type, Object>) method

```csharp
public static void TryAddTransient (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, Func<IServiceProvider,object> implementationFactory);
```

Adds the specified `service` as a `ServiceLifetime.Transient` service
using the factory specified in `implementationFactory`
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `implementationFactory`: The factory that creates the service.

To be added.
