---
title: "WeightedUriEndpoint class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/WeightedUriEndpoint.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WeightedUriEndpoint class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public class WeightedUriEndpoint
```

Represents a URI-based endpoint with a weight assigned.

To be added.

## WeightedUriEndpoint.WeightedUriEndpoint() constructor

```csharp
public WeightedUriEndpoint ();
```

To be added.

To be added.

## WeightedUriEndpoint.Uri property

```csharp
public Uri? Uri { get; set; }
```

Gets or sets the URL of the endpoint.

Returns: To be added.

Only schema, domain name, and port are used. The rest of the URL is constructed from the request URL.

## WeightedUriEndpoint.Weight property

```csharp
public int Weight { get; set; }
```

Gets or sets the weight of the endpoint.

Returns: The default is 32000.

Default value is 32000.
