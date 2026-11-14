---
title: "AutoActivationExtensions class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/AutoActivationExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AutoActivationExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class AutoActivationExtensions
```

Extension methods for automatically activating singletons after application starts.

To be added.

## AutoActivationExtensions.ActivateKeyedSingleton(IServiceCollection, Type, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection ActivateKeyedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object? serviceKey);
```

Enforces keyed singleton activation at startup time rather than at runtime.

Parameters:

- `services`: The service collection to add the service to.
- `serviceType`: The type of the service to activate.
- `serviceKey`: An object used to uniquely identify the specific service.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.ActivateKeyedSingleton<TService>(IServiceCollection, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection ActivateKeyedSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey) where TService : class;
```

Enforces keyed singleton activation at startup time rather than at runtime.

Parameters:

- `TService`: The type of the service to activate.
- `services`: The service collection containing the service.
- `serviceKey`: An object used to uniquely identify the specific service.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.ActivateSingleton(IServiceCollection, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection ActivateSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType);
```

Enforces singleton activation at startup time rather than at runtime.

Parameters:

- `services`: The service collection containing the service.
- `serviceType`: The type of the service to activate.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.ActivateSingleton<TService>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection ActivateSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where TService : class;
```

Enforces singleton activation at startup time rather than at runtime.

Parameters:

- `TService`: The type of the service to activate.
- `services`: The service collection containing the service.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.AddActivatedKeyedSingleton(IServiceCollection, Type, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddActivatedKeyedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object? serviceKey);
```

Adds an auto-activated keyed singleton service.

Parameters:

- `services`: The service collection to add the service to.
- `serviceType`: The type of the service to register and the implementation to use.
- `serviceKey`: An object used to uniquely identify the specific service.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.AddActivatedKeyedSingleton(IServiceCollection, Type, Object, Object>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddActivatedKeyedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object? serviceKey, Func<IServiceProvider,object?,object> implementationFactory);
```

Adds an auto-activated keyed singleton service.

Parameters:

- `services`: The service collection to add the service to.
- `serviceType`: The type of the service to register.
- `serviceKey`: An object used to uniquely identify the specific service.
- `implementationFactory`: The factory that creates the service.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.AddActivatedKeyedSingleton(IServiceCollection, Type, Object, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddActivatedKeyedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object? serviceKey, Type implementationType);
```

Adds an auto-activated keyed singleton service.

Parameters:

- `services`: The service collection to add the service to.
- `serviceType`: The type of the service to register.
- `serviceKey`: An object used to uniquely identify the specific service.
- `implementationType`: The implementation type of the service.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.AddActivatedKeyedSingleton<TService>(IServiceCollection, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddActivatedKeyedSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey) where TService : class;
```

Adds an auto-activated keyed singleton service.

Parameters:

- `TService`: The type of the service to add.
- `services`: The service collection to add the service to.
- `serviceKey`: An object used to uniquely identify the specific service.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.AddActivatedKeyedSingleton<TService>(IServiceCollection, Object, Object,TService>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddActivatedKeyedSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey, Func<IServiceProvider,object?,TService> implementationFactory) where TService : class;
```

Adds an auto-activated keyed singleton service.

Parameters:

- `TService`: The type of the service to add.
- `services`: The service collection to add the service to.
- `serviceKey`: An object used to uniquely identify the specific service.
- `implementationFactory`: The factory that creates the service.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.AddActivatedKeyedSingleton<TService,TImplementation>(IServiceCollection, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddActivatedKeyedSingleton<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey) where TService : class where TImplementation : class, TService;
```

Adds an auto-activated keyed singleton service.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `services`: The service collection to add the service to.
- `serviceKey`: An object used to uniquely identify the specific service.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.AddActivatedKeyedSingleton<TService,TImplementation>(IServiceCollection, Object, Object,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddActivatedKeyedSingleton<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey, Func<IServiceProvider,object?,TImplementation> implementationFactory) where TService : class where TImplementation : class, TService;
```

Adds an auto-activated keyed singleton service.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `services`: The service collection to add the service to.
- `serviceKey`: An object used to uniquely identify the specific service.
- `implementationFactory`: The factory that creates the service.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.AddActivatedSingleton(IServiceCollection, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddActivatedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType);
```

Adds an auto-activated singleton service of the type specified in serviceType to the specified
`IServiceCollection`.

Parameters:

- `services`: The service collection to add the service to.
- `serviceType`: The type of the service to register and the implementation to use.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.AddActivatedSingleton(IServiceCollection, Type, Object>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddActivatedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, Func<IServiceProvider,object> implementationFactory);
```

Adds an auto-activated singleton service.

Parameters:

- `services`: The service collection to add the service to.
- `serviceType`: The type of the service to register.
- `implementationFactory`: The factory that creates the service.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.AddActivatedSingleton(IServiceCollection, Type, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddActivatedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, Type implementationType);
```

Adds an auto-activated singleton service.

Parameters:

- `services`: The service collection to add the service to.
- `serviceType`: The type of the service to register.
- `implementationType`: The implementation type of the service.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.AddActivatedSingleton<TService>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddActivatedSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where TService : class;
```

Adds an auto-activated singleton service.

Parameters:

- `TService`: The type of the service to add.
- `services`: The service collection to add the service to.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.AddActivatedSingleton<TService>(IServiceCollection, IServiceProvider,TService>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddActivatedSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<IServiceProvider,TService> implementationFactory) where TService : class;
```

Adds an auto-activated singleton service.

Parameters:

- `TService`: The type of the service to add.
- `services`: The service collection to add the service to.
- `implementationFactory`: The factory that creates the service.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.AddActivatedSingleton<TService,TImplementation>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddActivatedSingleton<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where TService : class where TImplementation : class, TService;
```

Adds an auto-activated singleton service.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `services`: The service collection to add the service to.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.AddActivatedSingleton<TService,TImplementation>(IServiceCollection, IServiceProvider,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddActivatedSingleton<TService,TImplementation> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Func<IServiceProvider,TImplementation> implementationFactory) where TService : class where TImplementation : class, TService;
```

Adds an auto-activated singleton service.

Parameters:

- `TService`: The type of the service to add.
- `TImplementation`: The type of the implementation to use.
- `services`: The service collection to add the service to.
- `implementationFactory`: The factory that creates the service.

Returns: The value of `services`.

To be added.

## AutoActivationExtensions.TryAddActivatedKeyedSingleton(IServiceCollection, Type, Object) method

```csharp
public static void TryAddActivatedKeyedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object? serviceKey);
```

Tries to add an auto-activated keyed singleton service.

Parameters:

- `services`: The service collection to add the service to.
- `serviceType`: The type of the service to register.
- `serviceKey`: An object used to uniquely identify the specific service.

To be added.

## AutoActivationExtensions.TryAddActivatedKeyedSingleton(IServiceCollection, Type, Object, Object>) method

```csharp
public static void TryAddActivatedKeyedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object? serviceKey, Func<IServiceProvider,object?,object> implementationFactory);
```

Tries to add an auto-activated keyed singleton service.

Parameters:

- `services`: The service collection to add the service to.
- `serviceType`: The type of the service to register.
- `serviceKey`: An object used to uniquely identify the specific service.
- `implementationFactory`: The factory that creates the service.

To be added.

## AutoActivationExtensions.TryAddActivatedKeyedSingleton(IServiceCollection, Type, Object, Type) method

```csharp
public static void TryAddActivatedKeyedSingleton (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Type serviceType, object? serviceKey, Type implementationType);
```

Tries to add an auto-activated keyed singleton service.

Parameters:

- `services`: The service collection to add the service to.
- `serviceType`: The type of the service to register.
- `serviceKey`: An object used to uniquely identify the specific service.
- `implementationType`: The implementation type of the service.

To be added.

## AutoActivationExtensions.TryAddActivatedKeyedSingleton<TService>(IServiceCollection, Object) method

```csharp
public static void TryAddActivatedKeyedSingleton<TService> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, object? serviceKey) where TService : class;
```

Tries to add an auto-activated keyed singleton service.

Parameters:

- `TService`: The type of the service to add.
- `services`: The service collection to add the service to.
- `serviceKey`: An object used to uniquely identify the specific service.

To be added.
