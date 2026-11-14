---
title: "ServiceCollectionServiceExtensions class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceCollectionServiceExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceCollectionServiceExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ServiceCollectionServiceExtensions
```

Extension methods for adding services to an `IServiceCollection`.

To be added.

## ServiceCollectionServiceExtensions.AddKeyedScoped(IServiceCollection, Type, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKeyedScoped (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object? serviceKey);
```

Adds a scoped service of the type specified in `serviceType` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register and the implementation to use.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type and key has already been registered.
When multiple registrations exist for the same type and key, `ServiceProviderKeyedServiceExtensions.GetKeyedService<T>` returns the last registered service.
Use `ServiceProviderKeyedServiceExtensions.GetKeyedServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddKeyedScoped(IServiceCollection, Type, Object, Object>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKeyedScoped (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object? serviceKey, Func<IServiceProvider,object?,object> implementationFactory);
```

Adds a scoped service of the type specified in `serviceType` with a
factory specified in `implementationFactory` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationFactory`: The factory that creates the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type and key has already been registered.
When multiple registrations exist for the same type and key, `ServiceProviderKeyedServiceExtensions.GetKeyedService<T>` returns the last registered service.
Use `ServiceProviderKeyedServiceExtensions.GetKeyedServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddKeyedScoped(IServiceCollection, Type, Object, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKeyedScoped (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object? serviceKey, Type implementationType);
```

Adds a scoped service of the type specified in `serviceType` with an
implementation of the type specified in `implementationType` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationType`: The implementation type of the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type and key has already been registered.
When multiple registrations exist for the same type and key, `ServiceProviderKeyedServiceExtensions.GetKeyedService<T>` returns the last registered service.
Use `ServiceProviderKeyedServiceExtensions.GetKeyedServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddKeyedScoped<TService>(IServiceCollection, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKeyedScoped<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey) where TService : class;
```

Adds a scoped service of the type specified in `TService` to the
specified `IServiceCollection`.

Parameters:

- `TService`: The type of the service to add.
- `services`: The `IServiceCollection` to add the service to.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type and key has already been registered.
When multiple registrations exist for the same type and key, `ServiceProviderKeyedServiceExtensions.GetKeyedService<T>` returns the last registered service.
Use `ServiceProviderKeyedServiceExtensions.GetKeyedServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddKeyedScoped<TService>(IServiceCollection, Object, Object,TService>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKeyedScoped<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey, Func<IServiceProvider,object?,TService> implementationFactory) where TService : class;
```

Adds a scoped service of the type specified in `TService` with a
factory specified in `implementationFactory` to the
specified `IServiceCollection`.

Parameters:

- `TService`: The type of the service to add.
- `services`: The `IServiceCollection` to add the service to.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationFactory`: The factory that creates the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type and key has already been registered.
When multiple registrations exist for the same type and key, `ServiceProviderKeyedServiceExtensions.GetKeyedService<T>` returns the last registered service.
Use `ServiceProviderKeyedServiceExtensions.GetKeyedServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddKeyedScoped<TService,TImplementation>(IServiceCollection, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKeyedScoped<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey) where TService : class where TImplementation : class, TService;
```

Adds a scoped service of the type specified in `TService` with an
implementation type specified in `TImplementation` to the
specified `IServiceCollection`.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `services`: The `IServiceCollection` to add the service to.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type and key has already been registered.
When multiple registrations exist for the same type and key, `ServiceProviderKeyedServiceExtensions.GetKeyedService<T>` returns the last registered service.
Use `ServiceProviderKeyedServiceExtensions.GetKeyedServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddKeyedScoped<TService,TImplementation>(IServiceCollection, Object, Object,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKeyedScoped<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey, Func<IServiceProvider,object?,TImplementation> implementationFactory) where TService : class where TImplementation : class, TService;
```

Adds a scoped service of the type specified in `TService` with an
implementation type specified in `TImplementation` using the
factory specified in `implementationFactory` to the
specified `IServiceCollection`.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `services`: The `IServiceCollection` to add the service to.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationFactory`: The factory that creates the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type and key has already been registered.
When multiple registrations exist for the same type and key, `ServiceProviderKeyedServiceExtensions.GetKeyedService<T>` returns the last registered service.
Use `ServiceProviderKeyedServiceExtensions.GetKeyedServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddKeyedSingleton(IServiceCollection, Type, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKeyedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object? serviceKey);
```

Adds a singleton service of the type specified in `serviceType` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register and the implementation to use.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type and key has already been registered.
When multiple registrations exist for the same type and key, `ServiceProviderKeyedServiceExtensions.GetKeyedService<T>` returns the last registered service.
Use `ServiceProviderKeyedServiceExtensions.GetKeyedServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddKeyedSingleton(IServiceCollection, Type, Object, Object>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKeyedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object? serviceKey, Func<IServiceProvider,object?,object> implementationFactory);
```

Adds a singleton service of the type specified in `serviceType` with a
factory specified in `implementationFactory` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationFactory`: The factory that creates the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type and key has already been registered.
When multiple registrations exist for the same type and key, `ServiceProviderKeyedServiceExtensions.GetKeyedService<T>` returns the last registered service.
Use `ServiceProviderKeyedServiceExtensions.GetKeyedServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddKeyedSingleton(IServiceCollection, Type, Object, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKeyedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object? serviceKey, object implementationInstance);
```

Adds a singleton service of the type specified in `serviceType` with an
instance specified in `implementationInstance` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationInstance`: The instance of the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type and key has already been registered.
When multiple registrations exist for the same type and key, `ServiceProviderKeyedServiceExtensions.GetKeyedService<T>` returns the last registered service.
Use `ServiceProviderKeyedServiceExtensions.GetKeyedServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddKeyedSingleton(IServiceCollection, Type, Object, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKeyedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object? serviceKey, Type implementationType);
```

Adds a singleton service of the type specified in `serviceType` with an
implementation of the type specified in `implementationType` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationType`: The implementation type of the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type and key has already been registered.
When multiple registrations exist for the same type and key, `ServiceProviderKeyedServiceExtensions.GetKeyedService<T>` returns the last registered service.
Use `ServiceProviderKeyedServiceExtensions.GetKeyedServices<T>` to retrieve all registered services.
