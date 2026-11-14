---
title: "IConfigurationRoot interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/IConfigurationRoot.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IConfigurationRoot interface

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public interface IConfigurationRoot : Microsoft.Extensions.Configuration.IConfiguration
```

Represents the root of an `IConfiguration` hierarchy.

To be added.

## IConfigurationRoot.Providers property

```csharp
public System.Collections.Generic.IEnumerable<Microsoft.Extensions.Configuration.IConfigurationProvider> Providers { get; }
```

Gets the `IConfigurationProvider` providers for this configuration.

Returns: To be added.

To be added.

## IConfigurationRoot.Reload() method

```csharp
public void Reload ();
```

Forces the configuration values to be reloaded from the underlying `IConfigurationProvider` providers.

To be added.
