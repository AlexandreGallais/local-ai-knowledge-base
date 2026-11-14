---
title: "ApplicationMetadataHostBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/ApplicationMetadataHostBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ApplicationMetadataHostBuilderExtensions class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public static class ApplicationMetadataHostBuilderExtensions
```

Extensions for application metadata.

To be added.

## ApplicationMetadataHostBuilderExtensions.UseApplicationMetadata(IHostBuilder, String) method

```csharp
public static Microsoft.Extensions.Hosting.IHostBuilder UseApplicationMetadata (this Microsoft.Extensions.Hosting.IHostBuilder builder, string sectionName = "ambientmetadata:application");
```

Registers a configuration provider for application metadata and binds a model object onto the configuration.

Parameters:

- `builder`: The host builder.
- `sectionName`: Section name to bind configuration from. Default set to "ambientmetadata:application".

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` is `null`.
- `ArgumentException`: `sectionName` is either `null`, empty, or whitespace.

To be added.

## ApplicationMetadataHostBuilderExtensions.UseApplicationMetadata<TBuilder>(TBuilder, String) method

```csharp
public static TBuilder UseApplicationMetadata<TBuilder> (this TBuilder builder, string sectionName = "ambientmetadata:application") where TBuilder : Microsoft.Extensions.Hosting.IHostApplicationBuilder;
```

Registers a configuration provider for application metadata and binds a model object onto the configuration.

Parameters:

- `TBuilder`: `IHostApplicationBuilder`.
- `builder`: The host builder.
- `sectionName`: Section name to bind configuration from. Default set to "ambientmetadata:application".

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` is `null`.
- `ArgumentException`: `sectionName` is either `null`, empty, or whitespace.

To be added.
