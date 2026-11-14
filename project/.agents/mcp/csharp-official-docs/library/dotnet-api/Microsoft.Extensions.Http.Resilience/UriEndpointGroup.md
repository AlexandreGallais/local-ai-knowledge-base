---
title: "UriEndpointGroup class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/UriEndpointGroup.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UriEndpointGroup class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public class UriEndpointGroup
```

Represents a collection of `WeightedUriEndpoint`.

To be added.

## UriEndpointGroup.UriEndpointGroup() constructor

```csharp
public UriEndpointGroup ();
```

To be added.

To be added.

## UriEndpointGroup.Endpoints property

```csharp
public System.Collections.Generic.IList<Microsoft.Extensions.Http.Resilience.WeightedUriEndpoint> Endpoints { get; set; }
```

Gets or sets the endpoints in this endpoint group.

Returns: To be added.

By default the endpoints are initialized with an empty list.
The client must define the endpoint for each endpoint group.
At least one endpoint must be defined on each endpoint group in order to performed hedged requests.
