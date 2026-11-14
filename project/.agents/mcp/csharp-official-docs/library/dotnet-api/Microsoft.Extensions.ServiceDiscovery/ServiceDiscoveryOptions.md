---
title: "ServiceDiscoveryOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ServiceDiscovery/ServiceDiscoveryOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceDiscoveryOptions class

Namespace: `Microsoft.Extensions.ServiceDiscovery`

```csharp
public sealed class ServiceDiscoveryOptions
```

Options for service endpoint resolution.

To be added.

## ServiceDiscoveryOptions.ServiceDiscoveryOptions() constructor

```csharp
public ServiceDiscoveryOptions ();
```

To be added.

To be added.

## ServiceDiscoveryOptions.AllowAllSchemes property

```csharp
public bool AllowAllSchemes { get; set; }
```

Gets or sets a value that indicates whether all URI schemes for URIs resolved by the service discovery system are allowed.

Returns: `true` to allow all URI schemes; `false` to allow only schemes specified in `ServiceDiscoveryOptions.AllowedSchemes`.

To be added.

## ServiceDiscoveryOptions.AllowedSchemes property

```csharp
public System.Collections.Generic.IList<string> AllowedSchemes { get; set; }
```

Gets or sets the collection of allowed URI schemes for URIs resolved by the service discovery system when multiple schemes are specified, for example "https+http://_endpoint.service".

Returns: To be added.

When `ServiceDiscoveryOptions.AllowAllSchemes` is `true`, this property is ignored.

## ServiceDiscoveryOptions.RefreshPeriod property

```csharp
public TimeSpan RefreshPeriod { get; set; }
```

Gets or sets the period between polling attempts for providers which do not support refresh notifications via `IChangeToken.ActiveChangeCallbacks`.

Returns: To be added.

To be added.

## ServiceDiscoveryOptions.ApplyAllowedSchemes(String>) method

```csharp
public System.Collections.Generic.IReadOnlyList<string> ApplyAllowedSchemes (System.Collections.Generic.IReadOnlyList<string> requestedSchemes);
```

Filters the specified URI schemes to include only those that are applicable, based on the current settings.

Parameters:

- `requestedSchemes`: The URI schemes to be evaluated against the allowed schemes.

Returns: The URI schemes that are applicable. If no schemes are requested, all allowed schemes are returned.
If all schemes are allowed, only the requested schemes are returned.
Otherwise, the intersection of requested and allowed schemes is returned.

To be added.
