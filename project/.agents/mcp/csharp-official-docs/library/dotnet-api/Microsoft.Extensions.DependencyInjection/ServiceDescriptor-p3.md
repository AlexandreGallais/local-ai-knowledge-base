---
title: "ServiceDescriptor class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceDescriptor class (part 3 of 3)

## ServiceDescriptor.Transient<TService>(IServiceProvider,TService>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Transient<TService> (Func<IServiceProvider,TService> implementationFactory) where TService : class;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `implementationFactory`,
and the `ServiceLifetime.Transient` lifetime.

Parameters:

- `TService`: The type of the service.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Transient<TService,TImplementation>() method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Transient<TService,TImplementation> () where TService : class where TImplementation : class, TService;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `TImplementation`,
and the `ServiceLifetime.Transient` lifetime.

Parameters:

- `TService`: The type of the service.
- `TImplementation`: The type of the implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.

## ServiceDescriptor.Transient<TService,TImplementation>(IServiceProvider,TImplementation>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceDescriptor Transient<TService,TImplementation> (Func<IServiceProvider,TImplementation> implementationFactory) where TService : class where TImplementation : class, TService;
```

Creates an instance of `ServiceDescriptor` with the specified
`TService`, `TImplementation`,
`implementationFactory`,
and the `ServiceLifetime.Transient` lifetime.

Parameters:

- `TService`: The type of the service.
- `TImplementation`: The type of the implementation.
- `implementationFactory`: A factory to create new instances of the service implementation.

Returns: A new instance of `ServiceDescriptor`.

To be added.
