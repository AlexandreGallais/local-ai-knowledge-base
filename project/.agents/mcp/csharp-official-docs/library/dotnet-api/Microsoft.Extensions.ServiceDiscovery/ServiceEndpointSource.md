---
title: "ServiceEndpointSource class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ServiceDiscovery/ServiceEndpointSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceEndpointSource class

Namespace: `Microsoft.Extensions.ServiceDiscovery`

```csharp
public sealed class ServiceEndpointSource
```

Represents a collection of service endpoints.

To be added.

## ServiceEndpointSource.ServiceEndpointSource(ServiceEndpoint>, IChangeToken, IFeatureCollection) constructor

```csharp
public ServiceEndpointSource (System.Collections.Generic.List<Microsoft.Extensions.ServiceDiscovery.ServiceEndpoint>? endpoints, Microsoft.Extensions.Primitives.IChangeToken <example-value>, Microsoft.AspNetCore.Http.Features.IFeatureCollection features);
```

Initializes a new `ServiceEndpointSource` instance.

Parameters:

- `endpoints`: The endpoints.
- `changeToken`: The change token.
- `features`: The feature collection.

To be added.

## ServiceEndpointSource.ChangeToken <example-value>

```csharp
public Microsoft.Extensions.Primitives.IChangeToken <example-value> { get; }
```

Gets the change token which indicates when this collection should be refreshed.

Returns: To be added.

To be added.

## ServiceEndpointSource.Endpoints property

```csharp
public System.Collections.Generic.IReadOnlyList<Microsoft.Extensions.ServiceDiscovery.ServiceEndpoint> Endpoints { get; }
```

Gets the endpoints.

Returns: To be added.

To be added.

## ServiceEndpointSource.Features property

```csharp
public Microsoft.AspNetCore.Http.Features.IFeatureCollection Features { get; }
```

Gets the feature collection.

Returns: To be added.

To be added.

## ServiceEndpointSource.ToString() method

```csharp
public override string ToString ();
```

To be added.

Returns: To be added.

To be added.
