---
title: "ServiceProviderKeyedServiceExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceProviderKeyedServiceExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceProviderKeyedServiceExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ServiceProviderKeyedServiceExtensions
```

Extension methods for getting services from an `IServiceProvider`.

To be added.

## ServiceProviderKeyedServiceExtensions.GetKeyedService(IServiceProvider, Type, Object) method

```csharp
public static object? GetKeyedService (this IServiceProvider provider, Type serviceType, object? serviceKey);
```

Get service of type `serviceType` from the `IServiceProvider`.

Parameters:

- `provider`: The `IServiceProvider` to retrieve the service object from.
- `serviceType`: An object that specifies the type of service object to get.
- `serviceKey`: An object that specifies the key of service object to get.

Returns: A service object of type `serviceType` or null if there is no such service.

To be added.

## ServiceProviderKeyedServiceExtensions.GetKeyedService<T>(IServiceProvider, Object) method

```csharp
public static T? GetKeyedService<T> (this IServiceProvider provider, object? serviceKey);
```

Get service of type `T` from the `IServiceProvider`.

Parameters:

- `T`: The type of service object to get.
- `provider`: The `IServiceProvider` to retrieve the service object from.
- `serviceKey`: An object that specifies the key of service object to get.

Returns: A service object of type `T` or null if there is no such service.

To be added.

## ServiceProviderKeyedServiceExtensions.GetKeyedServices(IServiceProvider, Type, Object) method

```csharp
public static System.Collections.Generic.IEnumerable<object?> GetKeyedServices (this IServiceProvider provider, Type serviceType, object? serviceKey);
```

Get an enumeration of services of type `serviceType` from the `IServiceProvider`.

Parameters:

- `provider`: The `IServiceProvider` to retrieve the services from.
- `serviceType`: An object that specifies the type of service object to get.
- `serviceKey`: An object that specifies the key of service object to get.

Returns: An enumeration of services of type `serviceType`.

To be added.

## ServiceProviderKeyedServiceExtensions.GetKeyedServices<T>(IServiceProvider, Object) method

```csharp
public static System.Collections.Generic.IEnumerable<T> GetKeyedServices<T> (this IServiceProvider provider, object? serviceKey);
```

Get an enumeration of services of type `T` from the `IServiceProvider`.

Parameters:

- `T`: The type of service object to get.
- `provider`: The `IServiceProvider` to retrieve the services from.
- `serviceKey`: An object that specifies the key of service object to get.

Returns: An enumeration of services of type `T`.

To be added.

## ServiceProviderKeyedServiceExtensions.GetRequiredKeyedService(IServiceProvider, Type, Object) method

```csharp
public static object GetRequiredKeyedService (this IServiceProvider provider, Type serviceType, object? serviceKey);
```

Get service of type `serviceType` from the `IServiceProvider`.

Parameters:

- `provider`: The `IServiceProvider` to retrieve the service object from.
- `serviceType`: An object that specifies the type of service object to get.
- `serviceKey`: An object that specifies the key of service object to get.

Returns: A service object of type `serviceType`.

Exceptions:

- `InvalidOperationException`: There is no service of type `serviceType`.

To be added.

## ServiceProviderKeyedServiceExtensions.GetRequiredKeyedService<T>(IServiceProvider, Object) method

```csharp
public static T GetRequiredKeyedService<T> (this IServiceProvider provider, object? serviceKey);
```

Get service of type `T` from the `IServiceProvider`.

Parameters:

- `T`: The type of service object to get.
- `provider`: The `IServiceProvider` to retrieve the service object from.
- `serviceKey`: An object that specifies the key of service object to get.

Returns: A service object of type `T`.

Exceptions:

- `InvalidOperationException`: There is no service of type `T`.

To be added.
