---
title: "IServiceProvider interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IServiceProvider interface

Namespace: `System`

```csharp
public interface IServiceProvider
```

Defines a mechanism for retrieving a service object; that is, an object that provides custom support to other objects.

#### Remarks
This interface is implemented by a class or value type that provides a service to other objects.

The `IServiceProvider.GetService` method of this interface obtains the object that provides the service.

The `IServiceProvider` interface is implemented by a number of types, including `HttpContext`, `LicenseContext`, `MarshalByValueComponent`, and `ServiceContainer`.

## IServiceProvider.GetService(Type) method

```csharp
public object? GetService (Type serviceType);
```

Gets the service object of the specified type.

Parameters:

- `serviceType`: An object that specifies the type of service object to get.

Returns: A service object of type `serviceType`.

-or-

`null` if there is no service object of type `serviceType`.

To be added.
