---
title: "IKeyedServiceProvider interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/IKeyedServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IKeyedServiceProvider interface

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public interface IKeyedServiceProvider : IServiceProvider
```

Retrieves services using a key and a type.

To be added.

## IKeyedServiceProvider.GetKeyedService(Type, Object) method

```csharp
public object? GetKeyedService (Type serviceType, object? serviceKey);
```

Gets the service object of the specified type.

Parameters:

- `serviceType`: An object that specifies the type of service object to get.
- `serviceKey`: An object that specifies the key of service object to get.

Returns: A service object of type `serviceType`.

-or-

`null` if there is no service object of type `serviceType`.

To be added.

## IKeyedServiceProvider.GetRequiredKeyedService(Type, Object) method

```csharp
public object GetRequiredKeyedService (Type serviceType, object? serviceKey);
```

Gets service of type `serviceType` from the `IServiceProvider` implementing
this interface.

Parameters:

- `serviceType`: An object that specifies the type of service object to get.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.

Returns: A service object of type `serviceType`.
Throws an exception if the `IServiceProvider` cannot create the object.

To be added.
