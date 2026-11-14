---
title: "ApplicationMetadataConfigurationBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ApplicationMetadataConfigurationBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ApplicationMetadataConfigurationBuilderExtensions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class ApplicationMetadataConfigurationBuilderExtensions
```

Extensions for application metadata.

To be added.

## ApplicationMetadataConfigurationBuilderExtensions.AddApplicationMetadata(IConfigurationBuilder, IHostEnvironment, String) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddApplicationMetadata (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, Microsoft.Extensions.Hosting.IHostEnvironment hostEnvironment, string sectionName = "ambientmetadata:application");
```

Registers a configuration provider for application metadata.

Parameters:

- `builder`: The configuration builder.
- `hostEnvironment`: An instance of `IHostEnvironment`.
- `sectionName`: The section name to save configuration into. The default is "ambientmetadata:application".

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` or `hostEnvironment` is `null`.
- `ArgumentException`: `sectionName` is either `null`, empty, or whitespace.

To be added.
