---
title: "ISupportRequiredService interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ISupportRequiredService.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ISupportRequiredService interface

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public interface ISupportRequiredService
```

Optional contract used by `ServiceProviderServiceExtensions.GetRequiredService<T>`
to resolve services if supported by `IServiceProvider`.

To be added.

## ISupportRequiredService.GetRequiredService(Type) method

```csharp
public object GetRequiredService (Type serviceType);
```

Gets service of type `serviceType` from the `IServiceProvider` implementing
this interface.

Parameters:

- `serviceType`: An object that specifies the type of service object to get.

Returns: A service object of type `serviceType`.
Throws an exception if the `IServiceProvider` cannot create the object.

To be added.
