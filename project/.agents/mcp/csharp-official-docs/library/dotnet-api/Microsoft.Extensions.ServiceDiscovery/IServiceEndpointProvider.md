---
title: "IServiceEndpointProvider interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ServiceDiscovery/IServiceEndpointProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IServiceEndpointProvider interface

Namespace: `Microsoft.Extensions.ServiceDiscovery`

```csharp
public interface IServiceEndpointProvider : IAsyncDisposable
```

Provides details about a service's endpoints.

To be added.

## IServiceEndpointProvider.PopulateAsync(IServiceEndpointBuilder, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask PopulateAsync (Microsoft.Extensions.ServiceDiscovery.IServiceEndpointBuilder endpoints, System.Threading.CancellationToken <example-value>);
```

Resolves the endpoints for the service.

Parameters:

- `endpoints`: The endpoint collection, which resolved endpoints will be added to.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: The resolution status.

To be added.
