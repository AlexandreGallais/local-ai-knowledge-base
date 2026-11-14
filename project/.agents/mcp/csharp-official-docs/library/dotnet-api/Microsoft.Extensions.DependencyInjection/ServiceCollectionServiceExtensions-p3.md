---
title: "ServiceCollectionServiceExtensions class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceCollectionServiceExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceCollectionServiceExtensions class (part 3 of 4)

## ServiceCollectionServiceExtensions.AddKeyedTransient<TService,TImplementation>(IServiceCollection, Object, Object,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddKeyedTransient<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey, Func<IServiceProvider,object?,TImplementation> implementationFactory) where TService : class where TImplementation : class, TService;
```

Adds a transient service of the type specified in `TService` with an
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

## ServiceCollectionServiceExtensions.AddScoped(IServiceCollection, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddScoped (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType);
```

Adds a scoped service of the type specified in `serviceType` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register and the implementation to use.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddScoped(IServiceCollection, Type, Object>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddScoped (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, Func<IServiceProvider,object> implementationFactory);
```

Adds a scoped service of the type specified in `serviceType` with a
factory specified in `implementationFactory` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register.
- `implementationFactory`: The factory that creates the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddScoped(IServiceCollection, Type, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddScoped (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, Type implementationType);
```

Adds a scoped service of the type specified in `serviceType` with an
implementation of the type specified in `implementationType` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register.
- `implementationType`: The implementation type of the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddScoped<TService>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddScoped<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where TService : class;
```

Adds a scoped service of the type specified in `TService` to the
specified `IServiceCollection`.

Parameters:

- `TService`: The type of the service to add.
- `services`: The `IServiceCollection` to add the service to.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddScoped<TService>(IServiceCollection, IServiceProvider,TService>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddScoped<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<IServiceProvider,TService> implementationFactory) where TService : class;
```

Adds a scoped service of the type specified in `TService` with a
factory specified in `implementationFactory` to the
specified `IServiceCollection`.

Parameters:

- `TService`: The type of the service to add.
- `services`: The `IServiceCollection` to add the service to.
- `implementationFactory`: The factory that creates the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddScoped<TService,TImplementation>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddScoped<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where TService : class where TImplementation : class, TService;
```

Adds a scoped service of the type specified in `TService` with an
implementation type specified in `TImplementation` to the
specified `IServiceCollection`.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `services`: The `IServiceCollection` to add the service to.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddScoped<TService,TImplementation>(IServiceCollection, IServiceProvider,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddScoped<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<IServiceProvider,TImplementation> implementationFactory) where TService : class where TImplementation : class, TService;
```

Adds a scoped service of the type specified in `TService` with an
implementation type specified in `TImplementation` using the
factory specified in `implementationFactory` to the
specified `IServiceCollection`.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `services`: The `IServiceCollection` to add the service to.
- `implementationFactory`: The factory that creates the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddSingleton(IServiceCollection, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType);
```

Adds a singleton service of the type specified in `serviceType` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register and the implementation to use.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddSingleton(IServiceCollection, Type, Object>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, Func<IServiceProvider,object> implementationFactory);
```

Adds a singleton service of the type specified in `serviceType` with a
factory specified in `implementationFactory` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register.
- `implementationFactory`: The factory that creates the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddSingleton(IServiceCollection, Type, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object implementationInstance);
```

Adds a singleton service of the type specified in `serviceType` with an
instance specified in `implementationInstance` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register.
- `implementationInstance`: The instance of the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddSingleton(IServiceCollection, Type, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, Type implementationType);
```

Adds a singleton service of the type specified in `serviceType` with an
implementation of the type specified in `implementationType` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register.
- `implementationType`: The implementation type of the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddSingleton<TService>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where TService : class;
```

Adds a singleton service of the type specified in `TService` to the
specified `IServiceCollection`.

Parameters:

- `TService`: The type of the service to add.
- `services`: The `IServiceCollection` to add the service to.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.
