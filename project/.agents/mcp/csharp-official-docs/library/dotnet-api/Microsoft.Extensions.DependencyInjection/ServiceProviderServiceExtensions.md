---
title: "ServiceProviderServiceExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceProviderServiceExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceProviderServiceExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ServiceProviderServiceExtensions
```

Extension methods for getting services from an `IServiceProvider`.

To be added.

## ServiceProviderServiceExtensions.CreateAsyncScope(IServiceScopeFactory) method

```csharp
public static Microsoft.Extensions.DependencyInjection.AsyncServiceScope CreateAsyncScope (this Microsoft.Extensions.DependencyInjection.IServiceScopeFactory serviceScopeFactory);
```

Creates a new `AsyncServiceScope` that can be used to resolve scoped services.

Parameters:

- `serviceScopeFactory`: The `IServiceScopeFactory` to create the scope from.

Returns: An `AsyncServiceScope` that can be used to resolve scoped services.

To be added.

## ServiceProviderServiceExtensions.CreateAsyncScope(IServiceProvider) method

```csharp
public static Microsoft.Extensions.DependencyInjection.AsyncServiceScope CreateAsyncScope (this IServiceProvider provider);
```

Creates a new `AsyncServiceScope` that can be used to resolve scoped services.

Parameters:

- `provider`: The `IServiceProvider` to create the scope from.

Returns: An `AsyncServiceScope` that can be used to resolve scoped services.

To be added.

## ServiceProviderServiceExtensions.CreateScope(IServiceProvider) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceScope CreateScope (this IServiceProvider provider);
```

Creates a new `IServiceScope` that can be used to resolve scoped services.

Parameters:

- `provider`: The `IServiceProvider` to create the scope from.

Returns: A `IServiceScope` that can be used to resolve scoped services.

To be added.

## ServiceProviderServiceExtensions.GetRequiredService(IServiceProvider, Type) method

```csharp
public static object GetRequiredService (this IServiceProvider provider, Type serviceType);
```

Get service of type `serviceType` from the `IServiceProvider`.

Parameters:

- `provider`: The `IServiceProvider` to retrieve the service object from.
- `serviceType`: An object that specifies the type of service object to get.

Returns: A service object of type `serviceType`.

Exceptions:

- `ObjectDisposedException`: `provider` has already been disposed.
- `InvalidOperationException`: There is no service of type `serviceType`.

To be added.

## ServiceProviderServiceExtensions.GetRequiredService<T>(IServiceProvider) method

```csharp
public static T GetRequiredService<T> (this IServiceProvider provider);
```

Get service of type `T` from the `IServiceProvider`.

Parameters:

- `T`: The type of service object to get.
- `provider`: The `IServiceProvider` to retrieve the service object from.

Returns: A service object of type `T`.

Exceptions:

- `ObjectDisposedException`: `provider` has already been disposed.
- `InvalidOperationException`: There is no service of type `T`.

To be added.

## ServiceProviderServiceExtensions.GetService<T>(IServiceProvider) method

```csharp
public static T? GetService<T> (this IServiceProvider provider);
```

Get service of type `T` from the `IServiceProvider`.

Parameters:

- `T`: The type of service object to get.
- `provider`: The `IServiceProvider` to retrieve the service object from.

Returns: A service object of type `T` or null if there is no such service.

To be added.

## ServiceProviderServiceExtensions.GetServices(IServiceProvider, Type) method

```csharp
public static System.Collections.Generic.IEnumerable<object?> GetServices (this IServiceProvider provider, Type serviceType);
```

Get an enumeration of services of type `serviceType` from the `IServiceProvider`.

Parameters:

- `provider`: The `IServiceProvider` to retrieve the services from.
- `serviceType`: An object that specifies the type of service object to get.

Returns: An enumeration of services of type `serviceType`.

To be added.

## ServiceProviderServiceExtensions.GetServices<T>(IServiceProvider) method

```csharp
public static System.Collections.Generic.IEnumerable<T> GetServices<T> (this IServiceProvider provider);
```

Get an enumeration of services of type `T` from the `IServiceProvider`.

Parameters:

- `T`: The type of service object to get.
- `provider`: The `IServiceProvider` to retrieve the services from.

Returns: An enumeration of services of type `T`.

To be added.
