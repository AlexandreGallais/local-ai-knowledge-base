---
title: "IServiceEndpointProviderFactory interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ServiceDiscovery/IServiceEndpointProviderFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IServiceEndpointProviderFactory interface

Namespace: `Microsoft.Extensions.ServiceDiscovery`

```csharp
public interface IServiceEndpointProviderFactory
```

Creates `IServiceEndpointProvider` instances.

To be added.

## IServiceEndpointProviderFactory.TryCreateProvider(ServiceEndpointQuery, IServiceEndpointProvider) method

```csharp
public bool TryCreateProvider (Microsoft.Extensions.ServiceDiscovery.ServiceEndpointQuery query, out Microsoft.Extensions.ServiceDiscovery.IServiceEndpointProvider? provider);
```

Tries to create an `IServiceEndpointProvider` instance for the specified `query`.

Parameters:

- `query`: The service to create the provider for.
- `provider`: The provider.

Returns: `true` if the provider was created, `false` otherwise.

To be added.
