---
title: "ServiceEndpoint class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ServiceDiscovery/ServiceEndpoint.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceEndpoint class

Namespace: `Microsoft.Extensions.ServiceDiscovery`

```csharp
public abstract class ServiceEndpoint
```

Represents an endpoint for a service.

To be added.

## ServiceEndpoint.ServiceEndpoint() constructor

```csharp
protected ServiceEndpoint ();
```

To be added.

To be added.

## ServiceEndpoint.EndPoint property

```csharp
public abstract System.Net.EndPoint EndPoint { get; }
```

Gets the endpoint.

Returns: To be added.

To be added.

## ServiceEndpoint.Features property

```csharp
public abstract Microsoft.AspNetCore.Http.Features.IFeatureCollection Features { get; }
```

Gets the collection of endpoint features.

Returns: To be added.

To be added.

## ServiceEndpoint.Create(EndPoint, IFeatureCollection) method

```csharp
public static Microsoft.Extensions.ServiceDiscovery.ServiceEndpoint Create (System.Net.EndPoint endPoint, Microsoft.AspNetCore.Http.Features.IFeatureCollection? features = default);
```

Creates a new `ServiceEndpoint`.

Parameters:

- `endPoint`: The endpoint being represented.
- `features`: Features of the endpoint.

Returns: A newly initialized `ServiceEndpoint`.

To be added.

## ServiceEndpoint.TryParse(String, ServiceEndpoint) method

```csharp
public static bool TryParse (string? value, out Microsoft.Extensions.ServiceDiscovery.ServiceEndpoint? serviceEndpoint);
```

Tries to convert a specified string representation to its `ServiceEndpoint` equivalent,
and returns a value that indicates whether the conversion succeeded.

Parameters:

- `value`: A string that consists of an IP address or hostname, optionally followed by a colon and port number, or a URI.
- `serviceEndpoint`: When this method returns, contains the equivalent `ServiceEndpoint` if the conversion succeeded; otherwise,
`null`. This parameter is passed uninitialized; any value originally supplied will be overwritten.

Returns: `true` if the string was successfully parsed into a `ServiceEndpoint`; otherwise, `false`.

To be added.
