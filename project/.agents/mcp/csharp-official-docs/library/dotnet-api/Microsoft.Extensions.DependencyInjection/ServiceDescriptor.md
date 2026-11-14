---
title: "ServiceDescriptor class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceDescriptor class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public class ServiceDescriptor
```

Describes a service with its service type, implementation, and lifetime.

To be added.

## ServiceDescriptor.ServiceDescriptor(Type, Object) constructor

```csharp
public ServiceDescriptor (Type serviceType, object instance);
```

Initializes a new instance of `ServiceDescriptor` with the specified `instance`
as a `ServiceLifetime.Singleton`.

Parameters:

- `serviceType`: The `Type` of the service.
- `instance`: The instance implementing the service.

To be added.

## ServiceDescriptor.ServiceDescriptor(Type, Object>, ServiceLifetime) constructor

```csharp
public ServiceDescriptor (Type serviceType, Func<IServiceProvider,object> factory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime);
```

Initializes a new instance of `ServiceDescriptor` with the specified `factory`.

Parameters:

- `serviceType`: The `Type` of the service.
- `factory`: A factory used for creating service instances.
- `lifetime`: The `ServiceLifetime` of the service.

To be added.

## ServiceDescriptor.ServiceDescriptor(Type, Object, Object) constructor

```csharp
public ServiceDescriptor (Type serviceType, object? serviceKey, object instance);
```

Initializes a new instance of `ServiceDescriptor` with the specified `instance`
as a `ServiceLifetime.Singleton`.

Parameters:

- `serviceType`: The `Type` of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `instance`: The instance implementing the service.

To be added.

## ServiceDescriptor.ServiceDescriptor(Type, Type, ServiceLifetime) constructor

```csharp
public ServiceDescriptor (Type serviceType, Type implementationType, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime);
```

Initializes a new instance of `ServiceDescriptor` with the specified `implementationType`.

Parameters:

- `serviceType`: The `Type` of the service.
- `implementationType`: The `Type` implementing the service.
- `lifetime`: The `ServiceLifetime` of the service.

To be added.

## ServiceDescriptor.ServiceDescriptor(Type, Object, Object>, ServiceLifetime) constructor

```csharp
public ServiceDescriptor (Type serviceType, object? serviceKey, Func<IServiceProvider,object?,object> factory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime);
```

Initializes a new instance of `ServiceDescriptor` with the specified `factory`.

Parameters:

- `serviceType`: The `Type` of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `factory`: A factory used for creating service instances.
- `lifetime`: The `ServiceLifetime` of the service.

To be added.

## ServiceDescriptor.ServiceDescriptor(Type, Object, Type, ServiceLifetime) constructor

```csharp
public ServiceDescriptor (Type serviceType, object? serviceKey, Type implementationType, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime);
```

Initializes a new instance of `ServiceDescriptor` with the specified `implementationType`.

Parameters:

- `serviceType`: The `Type` of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationType`: The `Type` implementing the service.
- `lifetime`: The `ServiceLifetime` of the service.

To be added.

## ServiceDescriptor.ImplementationFactory property

```csharp
public Func<IServiceProvider,object>? ImplementationFactory { get; }
```

Gets the factory used for creating service instance,
or returns `null` if `ServiceDescriptor.IsKeyedService` is `true`.

Returns: To be added.

If `ServiceDescriptor.IsKeyedService` is `true`, `ServiceDescriptor.KeyedImplementationFactory` should be called instead.

## ServiceDescriptor.ImplementationInstance property

```csharp
public object? ImplementationInstance { get; }
```

Gets the instance that implements the service,
or returns `null` if `ServiceDescriptor.IsKeyedService` is `true`.

Returns: To be added.

If `ServiceDescriptor.IsKeyedService` is `true`, `ServiceDescriptor.KeyedImplementationInstance` should be called instead.

## ServiceDescriptor.ImplementationType property

```csharp
public Type? ImplementationType { get; }
```

Gets the `Type` that implements the service,
or returns `null` if `ServiceDescriptor.IsKeyedService` is `true`.

Returns: To be added.

If `ServiceDescriptor.IsKeyedService` is `true`, `ServiceDescriptor.KeyedImplementationType` should be called instead.

## ServiceDescriptor.IsKeyedService property

```csharp
public bool IsKeyedService { get; }
```

Indicates whether the service is a keyed service.

Returns: To be added.

To be added.

## ServiceDescriptor.KeyedImplementationFactory property

```csharp
public Func<IServiceProvider,object?,object>? KeyedImplementationFactory { get; }
```

Gets the factory used for creating Keyed service instances,
or throws `InvalidOperationException` if `ServiceDescriptor.IsKeyedService` is `false`.

Returns: To be added.

If `ServiceDescriptor.IsKeyedService` is `false`, `ServiceDescriptor.ImplementationFactory` should be called instead.

## ServiceDescriptor.KeyedImplementationInstance property

```csharp
public object? KeyedImplementationInstance { get; }
```

Gets the instance that implements the service,
or throws `InvalidOperationException` if `ServiceDescriptor.IsKeyedService` is `false`.

Returns: To be added.

If `ServiceDescriptor.IsKeyedService` is `false`, `ServiceDescriptor.ImplementationInstance` should be called instead.

## ServiceDescriptor.KeyedImplementationType property

```csharp
public Type? KeyedImplementationType { get; }
```

Gets the `Type` that implements the service,
or throws `InvalidOperationException` if `ServiceDescriptor.IsKeyedService` is `false`.

Returns: To be added.

If `ServiceDescriptor.IsKeyedService` is `false`, `ServiceDescriptor.ImplementationType` should be called instead.

## ServiceDescriptor.Lifetime property

```csharp
public Microsoft.Extensions.DependencyInjection.ServiceLifetime Lifetime { get; }
```

Gets the `ServiceLifetime` of the service.

Returns: To be added.

To be added.

## ServiceDescriptor.ServiceKey <example-value>

```csharp
public object? ServiceKey { get; }
```

Get the key of the service, if applicable.

Returns: To be added.

To be added.

## ServiceDescriptor.ServiceType property

```csharp
public Type ServiceType { get; }
```

Gets the `Type` of the service.

Returns: To be added.

To be added.

## ServiceDescriptor.Describe(Type, Object>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Describe (Type serviceType, Func<IServiceProvider,object> implementationFactory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime);
```

Creates an instance of `ServiceDescriptor` with the specified
`serviceType`, `implementationFactory`,
and `lifetime`.

Parameters:

- `serviceType`: The type of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.
- `lifetime`: The lifetime of the service.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Describe(Type, Type, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Describe (Type serviceType, Type implementationType, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime);
```

Creates an instance of `ServiceDescriptor` with the specified
`serviceType`, `implementationType`,
and `lifetime`.

Parameters:

- `serviceType`: The type of the service.
- `implementationType`: The type of the implementation.
- `lifetime`: The lifetime of the service.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.DescribeKeyed(Type, Object, Object>, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor DescribeKeyed (Type serviceType, object? serviceKey, Func<IServiceProvider,object?,object> implementationFactory, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime);
```

Creates an instance of `ServiceDescriptor` with the specified
`serviceType`, `implementationFactory`,
and `lifetime`.

Parameters:

- `serviceType`: The type of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.
- `lifetime`: The lifetime of the service.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.DescribeKeyed(Type, Object, Type, ServiceLifetime) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor DescribeKeyed (Type serviceType, object? serviceKey, Type implementationType, Microsoft.Extensions.DependencyInjection.ServiceLifetime lifetime);
```

Creates an instance of `ServiceDescriptor` with the specified
`serviceType`, `implementationType`,
and `lifetime`.

Parameters:

- `serviceType`: The type of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationType`: The type of the implementation.
- `lifetime`: The lifetime of the service.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedScoped(Type, Object, Object>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedScoped (Type service, object? serviceKey, Func<IServiceProvider,object?,object> implementationFactory);
```

Creates an instance of `ServiceDescriptor` with the specified
`service`, `implementationFactory`,
and the `ServiceLifetime.Scoped` lifetime.

Parameters:

- `service`: The type of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedScoped(Type, Object, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedScoped (Type service, object? serviceKey, Type implementationType);
```

Creates an instance of `ServiceDescriptor` with the specified
`service` and `implementationType`
and the `ServiceLifetime.Scoped` lifetime.

Parameters:

- `service`: The type of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationType`: The type of the implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedScoped<TService>(Object, Object,TService>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedScoped<TService> (object? serviceKey, Func<IServiceProvider,object?,TService> implementationFactory) where TService : class;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `implementationFactory`,
and the `ServiceLifetime.Scoped` lifetime.

Parameters:

- `TService`: The type of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedScoped<TService,TImplementation>(Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedScoped<TService,TImplementation> (object? serviceKey) where TService : class where TImplementation : class, TService;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `TImplementation`,
and the `ServiceLifetime.Scoped` lifetime.

Parameters:

- `TService`: The type of the service.
- `TImplementation`: The type of the implementation.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedScoped<TService,TImplementation>(Object, Object,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedScoped<TService,TImplementation> (object? serviceKey, Func<IServiceProvider,object?,TImplementation> implementationFactory) where TService : class where TImplementation : class, TService;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `TImplementation`,
`implementationFactory`,
and the `ServiceLifetime.Scoped` lifetime.

Parameters:

- `TService`: The type of the service.
- `TImplementation`: The type of the implementation.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedSingleton(Type, Object, Object>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedSingleton (Type serviceType, object? serviceKey, Func<IServiceProvider,object?,object> implementationFactory);
```

Creates an instance of `ServiceDescriptor` with the specified
`serviceType`, `implementationFactory`,
and the `ServiceLifetime.Singleton` lifetime.

Parameters:

- `serviceType`: The type of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedSingleton(Type, Object, Object) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedSingleton (Type serviceType, object? serviceKey, object implementationInstance);
```

Creates an instance of `ServiceDescriptor` with the specified
`serviceType`, `implementationInstance`,
and the `ServiceLifetime.Singleton` lifetime.

Parameters:

- `serviceType`: The type of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationInstance`: The instance of the implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.KeyedSingleton(Type, Object, Type) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor KeyedSingleton (Type service, object? serviceKey, Type implementationType);
```

Creates an instance of `ServiceDescriptor` with the specified
`service` and `implementationType`
and the `ServiceLifetime.Singleton` lifetime.

Parameters:

- `service`: The type of the service.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.
- `implementationType`: The type of the implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.
