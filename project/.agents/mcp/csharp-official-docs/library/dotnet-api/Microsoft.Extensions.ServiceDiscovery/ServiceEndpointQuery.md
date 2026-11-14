---
title: "ServiceEndpointQuery class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ServiceDiscovery/ServiceEndpointQuery.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceEndpointQuery class

Namespace: `Microsoft.Extensions.ServiceDiscovery`

```csharp
public sealed class ServiceEndpointQuery
```

Describes a query for endpoints of a service.

To be added.

## ServiceEndpointQuery.EndpointName property

```csharp
public string? EndpointName { get; }
```

Gets the endpoint name, or `null` if no endpoint name is specified.

Returns: To be added.

To be added.

## ServiceEndpointQuery.IncludedSchemes property

```csharp
public System.Collections.Generic.IReadOnlyList<string> IncludedSchemes { get; }
```

Gets the ordered list of included URI schemes.

Returns: To be added.

To be added.

## ServiceEndpointQuery.ServiceName property

```csharp
public string ServiceName { get; }
```

Gets the service name.

Returns: To be added.

To be added.

## ServiceEndpointQuery.ToString() method

```csharp
public override string? ToString ();
```

To be added.

Returns: To be added.

To be added.

## ServiceEndpointQuery.TryParse(String, ServiceEndpointQuery) method

```csharp
public static bool TryParse (string input, out Microsoft.Extensions.ServiceDiscovery.ServiceEndpointQuery? query);
```

Tries to parse the provided input as a service endpoint query.

Parameters:

- `input`: The value to parse.
- `query`: The resulting query.

Returns: `true` if the value was successfully parsed; otherwise `false`.

To be added.
