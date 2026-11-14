---
title: "ServiceCollectionDescriptorExtensions class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection.Extensions/ServiceCollectionDescriptorExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceCollectionDescriptorExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection.Extensions`

```csharp
public static class ServiceCollectionDescriptorExtensions
```

Extension methods for adding and removing services to an `IServiceCollection`.

To be added.

## ServiceCollectionDescriptorExtensions.Add(IServiceCollection, ServiceDescriptor) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection Add (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Microsoft.Extensions.DependencyInjection.ServiceDescriptor descriptor);
```

Adds the specified `descriptor` to the `collection`.

Parameters:

- `collection`: The `IServiceCollection`.
- `descriptor`: The `ServiceDescriptor` to add.

Returns: A reference to the current instance of `IServiceCollection`.

To be added.

## ServiceCollectionDescriptorExtensions.Add(IServiceCollection, ServiceDescriptor>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection Add (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, System.Collections.Generic.IEnumerable<Microsoft.Extensions.DependencyInjection.ServiceDescriptor> descriptors);
```

Adds a sequence of `ServiceDescriptor` to the `collection`.

Parameters:

- `collection`: The `IServiceCollection`.
- `descriptors`: The `ServiceDescriptor`s to add.

Returns: A reference to the current instance of `IServiceCollection`.

To be added.

## ServiceCollectionDescriptorExtensions.RemoveAll(IServiceCollection, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection RemoveAll (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type serviceType);
```

Removes all services of type `serviceType` in `IServiceCollection`.

Parameters:

- `collection`: The `IServiceCollection`.
- `serviceType`: The service type to remove.

Returns: The `IServiceCollection` for chaining.

To be added.

## ServiceCollectionDescriptorExtensions.RemoveAll<T>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection RemoveAll<T> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection);
```

Removes all services of type `T` in `IServiceCollection`.

Parameters:

- `collection`: The `IServiceCollection`.

Returns: The `IServiceCollection` for chaining.

To be added.

## ServiceCollectionDescriptorExtensions.RemoveAllKeyed(IServiceCollection, Type, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection RemoveAllKeyed (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type serviceType, object? serviceKey);
```

Removes all services of type `serviceType` in `IServiceCollection`.

Parameters:

- `collection`: The `IServiceCollection`.
- `serviceType`: The service type to remove.
- `serviceKey`: The service key.

Returns: The `IServiceCollection` for chaining.

To be added.

## ServiceCollectionDescriptorExtensions.RemoveAllKeyed<T>(IServiceCollection, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection RemoveAllKeyed<T> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, object? serviceKey);
```

Removes all services of type `T` in `IServiceCollection`.

Parameters:

- `collection`: The `IServiceCollection`.
- `serviceKey`: The service key.

Returns: The `IServiceCollection` for chaining.

To be added.

## ServiceCollectionDescriptorExtensions.Replace(IServiceCollection, ServiceDescriptor) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection Replace (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Microsoft.Extensions.DependencyInjection.ServiceDescriptor descriptor);
```

Removes the first service in `IServiceCollection` with the same service type
as `descriptor` and adds `descriptor` to the collection.

Parameters:

- `collection`: The `IServiceCollection`.
- `descriptor`: The `ServiceDescriptor` to replace with.

Returns: The `IServiceCollection` for chaining.

To be added.

## ServiceCollectionDescriptorExtensions.TryAdd(IServiceCollection, ServiceDescriptor) method

```csharp
public static void TryAdd (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Microsoft.Extensions.DependencyInjection.ServiceDescriptor descriptor);
```

Adds the specified `descriptor` to the `collection` if the
service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `descriptor`: The `ServiceDescriptor` to add.

To be added.

## ServiceCollectionDescriptorExtensions.TryAdd(IServiceCollection, ServiceDescriptor>) method

```csharp
public static void TryAdd (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, System.Collections.Generic.IEnumerable<Microsoft.Extensions.DependencyInjection.ServiceDescriptor> descriptors);
```

Adds the specified `descriptors` to the `collection` if the
service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `descriptors`: The `ServiceDescriptor`s to add.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddEnumerable(IServiceCollection, ServiceDescriptor) method

```csharp
public static void TryAddEnumerable (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.DependencyInjection.ServiceDescriptor descriptor);
```

Adds a `ServiceDescriptor` if an existing descriptor with the same
`ServiceDescriptor.ServiceType` and an implementation that does not already exist
in `services`.

Parameters:

- `services`: The `IServiceCollection`.
- `descriptor`: The `ServiceDescriptor`.

Use `ServiceCollectionDescriptorExtensions.TryAddEnumerable` when registering a service implementation of a
service type that
supports multiple registrations of the same service type. Using
`ServiceCollectionDescriptorExtensions.Add` is not idempotent and can add
duplicate
`ServiceDescriptor` instances if called twice. Using
`ServiceCollectionDescriptorExtensions.TryAddEnumerable` will prevent registration
of multiple implementation types.

## ServiceCollectionDescriptorExtensions.TryAddEnumerable(IServiceCollection, ServiceDescriptor>) method

```csharp
public static void TryAddEnumerable (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, System.Collections.Generic.IEnumerable<Microsoft.Extensions.DependencyInjection.ServiceDescriptor> descriptors);
```

Adds the specified `ServiceDescriptor`s if an existing descriptor with the same
`ServiceDescriptor.ServiceType` and an implementation that does not already exist
in `services`.

Parameters:

- `services`: The `IServiceCollection`.
- `descriptors`: The `ServiceDescriptor`s.

Use `ServiceCollectionDescriptorExtensions.TryAddEnumerable` when registering a service
implementation of a service type that
supports multiple registrations of the same service type. Using
`ServiceCollectionDescriptorExtensions.Add` is not idempotent and can add
duplicate
`ServiceDescriptor` instances if called twice. Using
`ServiceCollectionDescriptorExtensions.TryAddEnumerable` will prevent registration
of multiple implementation types.

## ServiceCollectionDescriptorExtensions.TryAddKeyedScoped(IServiceCollection, Type, Object) method

```csharp
public static void TryAddKeyedScoped (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, object? serviceKey);
```

Adds the specified `service` as a `ServiceLifetime.Scoped` service
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `serviceKey`: The service key.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedScoped(IServiceCollection, Type, Object, Object>) method

```csharp
public static void TryAddKeyedScoped (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, object? serviceKey, Func<IServiceProvider,object?,object> implementationFactory);
```

Adds the specified `service` as a `ServiceLifetime.Scoped` service
using the factory specified in `implementationFactory`
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `serviceKey`: The service key.
- `implementationFactory`: The factory that creates the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedScoped(IServiceCollection, Type, Object, Type) method

```csharp
public static void TryAddKeyedScoped (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, object? serviceKey, Type implementationType);
```

Adds the specified `service` as a `ServiceLifetime.Scoped` service
with the `implementationType` implementation
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `serviceKey`: The service key.
- `implementationType`: The implementation type of the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedScoped<TService>(IServiceCollection, Object) method

```csharp
public static void TryAddKeyedScoped<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, object? serviceKey) where TService : class;
```

Adds the specified `TService` as a `ServiceLifetime.Scoped` service
to the `collection` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `collection`: The `IServiceCollection`.
- `serviceKey`: The service key.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedScoped<TService>(IServiceCollection, Object, Object,TService>) method

```csharp
public static void TryAddKeyedScoped<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey, Func<IServiceProvider,object?,TService> implementationFactory) where TService : class;
```

Adds the specified `TService` as a `ServiceLifetime.Scoped` service
using the factory specified in `implementationFactory`
to the `services` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `services`: The `IServiceCollection`.
- `implementationFactory`: The factory that creates the service.
- `serviceKey`: The service key.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedScoped<TService,TImplementation>(IServiceCollection, Object) method

```csharp
public static void TryAddKeyedScoped<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, object? serviceKey) where TService : class where TImplementation : class, TService;
```

Adds the specified `TService` as a `ServiceLifetime.Scoped` service
implementation type specified in `TImplementation`
to the `collection` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `collection`: The `IServiceCollection`.
- `serviceKey`: The service key.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedSingleton(IServiceCollection, Type, Object) method

```csharp
public static void TryAddKeyedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, object? serviceKey);
```

Adds the specified `service` as a `ServiceLifetime.Singleton` service
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `serviceKey`: The service key.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedSingleton(IServiceCollection, Type, Object, Object>) method

```csharp
public static void TryAddKeyedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, object? serviceKey, Func<IServiceProvider,object?,object> implementationFactory);
```

Adds the specified `service` as a `ServiceLifetime.Singleton` service
using the factory specified in `implementationFactory`
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `serviceKey`: The service key.
- `implementationFactory`: The factory that creates the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedSingleton(IServiceCollection, Type, Object, Type) method

```csharp
public static void TryAddKeyedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, Type service, object? serviceKey, Type implementationType);
```

Adds the specified `service` as a `ServiceLifetime.Singleton` service
with the `implementationType` implementation
to the `collection` if the service type hasn't already been registered.

Parameters:

- `collection`: The `IServiceCollection`.
- `service`: The type of the service to register.
- `serviceKey`: The service key.
- `implementationType`: The implementation type of the service.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedSingleton<TService>(IServiceCollection, Object) method

```csharp
public static void TryAddKeyedSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection collection, object? serviceKey) where TService : class;
```

Adds the specified `TService` as a `ServiceLifetime.Singleton` service
to the `collection` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `collection`: The `IServiceCollection`.
- `serviceKey`: The service key.

To be added.

## ServiceCollectionDescriptorExtensions.TryAddKeyedSingleton<TService>(IServiceCollection, Object, Object,TService>) method

```csharp
public static void TryAddKeyedSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey, Func<IServiceProvider,object?,TService> implementationFactory) where TService : class;
```

Adds the specified `TService` as a `ServiceLifetime.Singleton` service
using the factory specified in `implementationFactory`
to the `services` if the service type hasn't already been registered.

Parameters:

- `TService`: The type of the service to add.
- `services`: The `IServiceCollection`.
- `serviceKey`: The service key.
- `implementationFactory`: The factory that creates the service.

To be added.
