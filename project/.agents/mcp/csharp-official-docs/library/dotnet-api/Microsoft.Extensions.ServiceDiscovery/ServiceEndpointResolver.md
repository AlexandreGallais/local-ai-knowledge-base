---
title: "ServiceEndpointResolver class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ServiceDiscovery/ServiceEndpointResolver.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceEndpointResolver class

Namespace: `Microsoft.Extensions.ServiceDiscovery`

```csharp
public sealed class ServiceEndpointResolver : IAsyncDisposable
```

Resolves service names to collections of endpoints.

To be added.

## ServiceEndpointResolver.DisposeAsync() method

```csharp
public System.Threading.Tasks.ValueTask DisposeAsync ();
```

To be added.

Returns: To be added.

To be added.

## ServiceEndpointResolver.GetEndpointsAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<Microsoft.Extensions.ServiceDiscovery.ServiceEndpointSource> GetEndpointsAsync (string serviceName, System.Threading.CancellationToken <example-value>);
```

Resolves and returns service endpoints for the specified service.

Parameters:

- `serviceName`: The service name.
- `cancellationToken`: A `CancellationToken`.

Returns: The resolved service endpoints.

To be added.
