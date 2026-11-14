---
title: "IServiceEndpointBuilder interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ServiceDiscovery/IServiceEndpointBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IServiceEndpointBuilder interface

Namespace: `Microsoft.Extensions.ServiceDiscovery`

```csharp
public interface IServiceEndpointBuilder
```

Represents a builder that creates `ServiceEndpointSource` instances.

To be added.

## IServiceEndpointBuilder.Endpoints property

```csharp
public System.Collections.Generic.IList<Microsoft.Extensions.ServiceDiscovery.ServiceEndpoint> Endpoints { get; }
```

Gets the endpoints.

Returns: To be added.

To be added.

## IServiceEndpointBuilder.Features property

```csharp
public Microsoft.AspNetCore.Http.Features.IFeatureCollection Features { get; }
```

Gets the feature collection.

Returns: To be added.

To be added.

## IServiceEndpointBuilder.AddChangeToken(IChangeToken) method

```csharp
public void AddChangeToken (Microsoft.Extensions.Primitives.IChangeToken <example-value>);
```

Adds a change token to the resulting `ServiceEndpointSource`.

Parameters:

- `changeToken`: The change token.

To be added.
