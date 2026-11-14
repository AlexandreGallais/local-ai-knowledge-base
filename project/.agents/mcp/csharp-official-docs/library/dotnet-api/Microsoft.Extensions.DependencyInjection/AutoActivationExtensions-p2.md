---
title: "AutoActivationExtensions class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/AutoActivationExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AutoActivationExtensions class (part 2 of 2)

## AutoActivationExtensions.TryAddActivatedKeyedSingleton<TService>(IServiceCollection, Object, Object,TService>) method

```csharp
public static void TryAddActivatedKeyedSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey, Func<IServiceProvider,object?,TService> implementationFactory) where TService : class;
```

Tries to add an auto-activated keyed singleton service.

Parameters:

- `TService`: The type of the service to add.
- `services`: The service collection to add the service to.
- `serviceKey`: An object used to uniquely identify the specific service.
- `implementationFactory`: The factory that creates the service.

To be added.

## AutoActivationExtensions.TryAddActivatedKeyedSingleton<TService,TImplementation>(IServiceCollection, Object) method

```csharp
public static void TryAddActivatedKeyedSingleton<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey) where TService : class where TImplementation : class, TService;
```

Tries to add an auto-activated keyed singleton service.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `services`: The service collection to add the service to.
- `serviceKey`: An object used to uniquely identify the specific service.

To be added.

## AutoActivationExtensions.TryAddActivatedSingleton(IServiceCollection, Type) method

```csharp
public static void TryAddActivatedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType);
```

Tries to add an auto-activated singleton service.

Parameters:

- `services`: The service collection to add the service to.
- `serviceType`: The type of the service to register.

To be added.

## AutoActivationExtensions.TryAddActivatedSingleton(IServiceCollection, Type, Object>) method

```csharp
public static void TryAddActivatedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, Func<IServiceProvider,object> implementationFactory);
```

Tries to add an auto-activated singleton service.

Parameters:

- `services`: The service collection to add the service to.
- `serviceType`: The type of the service to register.
- `implementationFactory`: The factory that creates the service.

To be added.

## AutoActivationExtensions.TryAddActivatedSingleton(IServiceCollection, Type, Type) method

```csharp
public static void TryAddActivatedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, Type implementationType);
```

Tries to add an auto-activated singleton service.

Parameters:

- `services`: The service collection to add the service to.
- `serviceType`: The type of the service to register.
- `implementationType`: The implementation type of the service.

To be added.

## AutoActivationExtensions.TryAddActivatedSingleton<TService>(IServiceCollection) method

```csharp
public static void TryAddActivatedSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where TService : class;
```

Tries to add an auto-activated singleton service.

Parameters:

- `TService`: The type of the service to add.
- `services`: The service collection to add the service to.

To be added.

## AutoActivationExtensions.TryAddActivatedSingleton<TService>(IServiceCollection, IServiceProvider,TService>) method

```csharp
public static void TryAddActivatedSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<IServiceProvider,TService> implementationFactory) where TService : class;
```

Tries to add an auto-activated singleton service.

Parameters:

- `TService`: The type of the service to add.
- `services`: The service collection to add the service to.
- `implementationFactory`: The factory that creates the service.

To be added.

## AutoActivationExtensions.TryAddActivatedSingleton<TService,TImplementation>(IServiceCollection) method

```csharp
public static void TryAddActivatedSingleton<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where TService : class where TImplementation : class, TService;
```

Tries to add an auto-activated singleton service.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `services`: The service collection to add the service to.

To be added.
