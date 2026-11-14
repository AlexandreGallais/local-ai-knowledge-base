---
title: "IServiceProviderIsKeyedService interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/IServiceProviderIsKeyedService.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IServiceProviderIsKeyedService interface

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public interface IServiceProviderIsKeyedService : Microsoft.Extensions.DependencyInjection.IServiceProviderIsService
```

Provides methods to determine if the specified type with the specified service key is available
from the `IServiceProvider`.

To be added.

## IServiceProviderIsKeyedService.IsKeyedService(Type, Object) method

```csharp
public bool IsKeyedService (Type serviceType, object? serviceKey);
```

Determines if the specified service type with the specified service key is available from the
`IServiceProvider`.

Parameters:

- `serviceType`: An object that specifies the type of service object to test.
- `serviceKey`: The `ServiceDescriptor.ServiceKey` of the service.

Returns: true if the specified service is a available, false if it is not.

To be added.
