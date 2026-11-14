---
title: "ServiceCollectionServiceExtensions class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceCollectionServiceExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceCollectionServiceExtensions class (part 4 of 4)

## ServiceCollectionServiceExtensions.AddSingleton<TService>(IServiceCollection, IServiceProvider,TService>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<IServiceProvider,TService> implementationFactory) where TService : class;
```

Adds a singleton service of the type specified in `TService` with a
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

## ServiceCollectionServiceExtensions.AddSingleton<TService>(IServiceCollection, TService) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, TService implementationInstance) where TService : class;
```

Adds a singleton service of the type specified in `TService` with an
instance specified in `implementationInstance` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `implementationInstance`: The instance of the service.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddSingleton<TService,TImplementation>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddSingleton<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where TService : class where TImplementation : class, TService;
```

Adds a singleton service of the type specified in `TService` with an
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

## ServiceCollectionServiceExtensions.AddSingleton<TService,TImplementation>(IServiceCollection, IServiceProvider,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddSingleton<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<IServiceProvider,TImplementation> implementationFactory) where TService : class where TImplementation : class, TService;
```

Adds a singleton service of the type specified in `TService` with an
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

## ServiceCollectionServiceExtensions.AddTransient(IServiceCollection, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTransient (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType);
```

Adds a transient service of the type specified in `serviceType` to the
specified `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service to.
- `serviceType`: The type of the service to register and the implementation to use.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddTransient(IServiceCollection, Type, Object>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTransient (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, Func<IServiceProvider,object> implementationFactory);
```

Adds a transient service of the type specified in `serviceType` with a
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

## ServiceCollectionServiceExtensions.AddTransient(IServiceCollection, Type, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTransient (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, Type implementationType);
```

Adds a transient service of the type specified in `serviceType` with an
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

## ServiceCollectionServiceExtensions.AddTransient<TService>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTransient<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where TService : class;
```

Adds a transient service of the type specified in `TService` to the
specified `IServiceCollection`.

Parameters:

- `TService`: The type of the service to add.
- `services`: The `IServiceCollection` to add the service to.

Returns: A reference to this instance after the operation has completed.

This method always adds a new registration to the `IServiceCollection`, even if a service of the same type has already been registered.
When multiple registrations exist, `IServiceProvider.GetService` returns the last registered service.
Use `ServiceProviderServiceExtensions.GetServices<T>` to retrieve all registered services.

## ServiceCollectionServiceExtensions.AddTransient<TService>(IServiceCollection, IServiceProvider,TService>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTransient<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<IServiceProvider,TService> implementationFactory) where TService : class;
```

Adds a transient service of the type specified in `TService` with a
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

## ServiceCollectionServiceExtensions.AddTransient<TService,TImplementation>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTransient<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where TService : class where TImplementation : class, TService;
```

Adds a transient service of the type specified in `TService` with an
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

## ServiceCollectionServiceExtensions.AddTransient<TService,TImplementation>(IServiceCollection, IServiceProvider,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddTransient<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<IServiceProvider,TImplementation> implementationFactory) where TService : class where TImplementation : class, TService;
```

Adds a transient service of the type specified in `TService` with an
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
