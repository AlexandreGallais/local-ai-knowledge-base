---
title: "ServiceDescriptor class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceDescriptor class (part 2 of 3)

## ServiceDescriptor.KeyedSingleton<TService>(Object, Object,TService>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedSingleton<TService> (object? serviceKey, Func<IServiceProvider,object?,TService> implementationFactory) where TService : class;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `implementationFactory`,
and the `ServiceLifetime.Singleton` lifetime.

Parameters:

- `TService`: The type of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedSingleton<TService>(Object, TService) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedSingleton<TService> (object? serviceKey, TService implementationInstance) where TService : class;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `implementationInstance`,
and the `ServiceLifetime.Singleton` lifetime.

Parameters:

- `TService`: The type of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationInstance`: The instance of the implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedSingleton<TService,TImplementation>(Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedSingleton<TService,TImplementation> (object? serviceKey) where TService : class where TImplementation : class, TService;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `TImplementation`,
and the `ServiceLifetime.Singleton` lifetime.

Parameters:

- `TService`: The type of the service.
- `TImplementation`: The type of the implementation.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedSingleton<TService,TImplementation>(Object, Object,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedSingleton<TService,TImplementation> (object? serviceKey, Func<IServiceProvider,object?,TImplementation> implementationFactory) where TService : class where TImplementation : class, TService;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `TImplementation`,
`implementationFactory`,
and the `ServiceLifetime.Singleton` lifetime.

Parameters:

- `TService`: The type of the service.
- `TImplementation`: The type of the implementation.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedTransient(Type, Object, Object>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedTransient (Type service, object? serviceKey, Func<IServiceProvider,object?,object> implementationFactory);
```

Creates an instance of `ServiceDescriptor` with the specified
`service`, `implementationFactory`,
and the `ServiceLifetime.Transient` lifetime.

Parameters:

- `service`: The type of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedTransient(Type, Object, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedTransient (Type service, object? serviceKey, Type implementationType);
```

Creates an instance of `ServiceDescriptor` with the specified
`service` and `implementationType`
and the `ServiceLifetime.Transient` lifetime.

Parameters:

- `service`: The type of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationType`: The type of the implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedTransient<TService>(Object, Object,TService>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedTransient<TService> (object? serviceKey, Func<IServiceProvider,object?,TService> implementationFactory) where TService : class;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `implementationFactory`,
and the `ServiceLifetime.Transient` lifetime.

Parameters:

- `TService`: The type of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedTransient<TService,TImplementation>(Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedTransient<TService,TImplementation> (object? serviceKey) where TService : class where TImplementation : class, TService;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `TImplementation`,
and the `ServiceLifetime.Transient` lifetime.

Parameters:

- `TService`: The type of the service.
- `TImplementation`: The type of the implementation.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedTransient<TService,TImplementation>(Object, Object,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedTransient<TService,TImplementation> (object? serviceKey, Func<IServiceProvider,object?,TImplementation> implementationFactory) where TService : class where TImplementation : class, TService;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `TImplementation`,
`implementationFactory`,
and the `ServiceLifetime.Transient` lifetime.

Parameters:

- `TService`: The type of the service.
- `TImplementation`: The type of the implementation.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Scoped(Type, Object>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Scoped (Type service, Func<IServiceProvider,object> implementationFactory);
```

Creates an instance of `ServiceDescriptor` with the specified
`service`, `implementationFactory`,
and the `ServiceLifetime.Scoped` lifetime.

Parameters:

- `service`: The type of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Scoped(Type, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Scoped (Type service, Type implementationType);
```

Creates an instance of `ServiceDescriptor` with the specified
`service` and `implementationType`
and the `ServiceLifetime.Scoped` lifetime.

Parameters:

- `service`: The type of the service.
- `implementationType`: The type of the implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Scoped<TService>(IServiceProvider,TService>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Scoped<TService> (Func<IServiceProvider,TService> implementationFactory) where TService : class;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `implementationFactory`,
and the `ServiceLifetime.Scoped` lifetime.

Parameters:

- `TService`: The type of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Scoped<TService,TImplementation>() method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Scoped<TService,TImplementation> () where TService : class where TImplementation : class, TService;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `TImplementation`,
and the `ServiceLifetime.Scoped` lifetime.

Parameters:

- `TService`: The type of the service.
- `TImplementation`: The type of the implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Scoped<TService,TImplementation>(IServiceProvider,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Scoped<TService,TImplementation> (Func<IServiceProvider,TImplementation> implementationFactory) where TService : class where TImplementation : class, TService;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `TImplementation`,
`implementationFactory`,
and the `ServiceLifetime.Scoped` lifetime.

Parameters:

- `TService`: The type of the service.
- `TImplementation`: The type of the implementation.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Singleton(Type, Object>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Singleton (Type serviceType, Func<IServiceProvider,object> implementationFactory);
```

Creates an instance of `ServiceDescriptor` with the specified
`serviceType`, `implementationFactory`,
and the `ServiceLifetime.Singleton` lifetime.

Parameters:

- `serviceType`: The type of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Singleton(Type, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Singleton (Type serviceType, object implementationInstance);
```

Creates an instance of `ServiceDescriptor` with the specified
`serviceType`, `implementationInstance`,
and the `ServiceLifetime.Singleton` lifetime.

Parameters:

- `serviceType`: The type of the service.
- `implementationInstance`: The instance of the implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Singleton(Type, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Singleton (Type service, Type implementationType);
```

Creates an instance of `ServiceDescriptor` with the specified
`service` and `implementationType`
and the `ServiceLifetime.Singleton` lifetime.

Parameters:

- `service`: The type of the service.
- `implementationType`: The type of the implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Singleton<TService>(IServiceProvider,TService>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Singleton<TService> (Func<IServiceProvider,TService> implementationFactory) where TService : class;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `implementationFactory`,
and the `ServiceLifetime.Singleton` lifetime.

Parameters:

- `TService`: The type of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Singleton<TService>(TService) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Singleton<TService> (TService implementationInstance) where TService : class;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `implementationInstance`,
and the `ServiceLifetime.Singleton` lifetime.

Parameters:

- `TService`: The type of the service.
- `implementationInstance`: The instance of the implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Singleton<TService,TImplementation>() method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Singleton<TService,TImplementation> () where TService : class where TImplementation : class, TService;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `TImplementation`,
and the `ServiceLifetime.Singleton` lifetime.

Parameters:

- `TService`: The type of the service.
- `TImplementation`: The type of the implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Singleton<TService,TImplementation>(IServiceProvider,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Singleton<TService,TImplementation> (Func<IServiceProvider,TImplementation> implementationFactory) where TService : class where TImplementation : class, TService;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `TImplementation`,
`implementationFactory`,
and the `ServiceLifetime.Singleton` lifetime.

Parameters:

- `TService`: The type of the service.
- `TImplementation`: The type of the implementation.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current object.

Returns: A string that represents the current object.

To be added.

## ServiceDescriptor.Transient(Type, Object>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Transient (Type service, Func<IServiceProvider,object> implementationFactory);
```

Creates an instance of `ServiceDescriptor` with the specified
`service`, `implementationFactory`,
and the `ServiceLifetime.Transient` lifetime.

Parameters:

- `service`: The type of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Transient(Type, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Transient (Type service, Type implementationType);
```

Creates an instance of `ServiceDescriptor` with the specified
`service` and `implementationType`
and the `ServiceLifetime.Transient` lifetime.

Parameters:

- `service`: The type of the service.
- `implementationType`: The type of the implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.
