---
title: "ConfigurationServiceEndpointProviderOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.ServiceDiscovery/ConfigurationServiceEndpointProviderOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigurationServiceEndpointProviderOptions class

Namespace: `Microsoft.Extensions.ServiceDiscovery`

```csharp
public sealed class ConfigurationServiceEndpointProviderOptions
```

Options for `ConfigurationServiceEndpointProvider`.

To be added.

## ConfigurationServiceEndpointProviderOptions.ConfigurationServiceEndpointProviderOptions() constructor

```csharp
public ConfigurationServiceEndpointProviderOptions ();
```

To be added.

To be added.

## ConfigurationServiceEndpointProviderOptions.SectionName property

```csharp
public string SectionName { get; set; }
```

Gets or sets the name of the configuration section that contains service endpoints.

Returns: The default value is `"Services"`.

To be added.

## ConfigurationServiceEndpointProviderOptions.ShouldApplyHostNameMetadata property

```csharp
public Func<Microsoft.Extensions.ServiceDiscovery.ServiceEndpoint,bool> ShouldApplyHostNameMetadata { get; set; }
```

Gets or sets a delegate used to determine whether to apply host name metadata to each resolved endpoint.

Returns: The default delegate returns `false`.

To be added.
