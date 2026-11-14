---
title: "XmlConfigurationExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/XmlConfigurationExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlConfigurationExtensions class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public static class XmlConfigurationExtensions
```

Extension methods for adding `XmlConfigurationProvider`.

#### Remarks

For more information and examples, see XML configuration provider.

## XmlConfigurationExtensions.AddXmlFile(IConfigurationBuilder, XmlConfigurationSource>) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddXmlFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, Action<Microsoft.Extensions.Configuration.Xml.XmlConfigurationSource>? configureSource);
```

Adds an XML configuration source to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `configureSource`: Configures the source.

Returns: The `IConfigurationBuilder`.

To be added.

## XmlConfigurationExtensions.AddXmlFile(IConfigurationBuilder, String) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddXmlFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, string path);
```

Adds the XML configuration provider at `path` to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `path`: Path relative to the base path stored in
`IConfigurationBuilder.Properties` of `builder`.

Returns: The `IConfigurationBuilder`.

To be added.

## XmlConfigurationExtensions.AddXmlFile(IConfigurationBuilder, String, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddXmlFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, string path, bool optional);
```

Adds the XML configuration provider at `path` to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `path`: Path relative to the base path stored in
`IConfigurationBuilder.Properties` of `builder`.
- `optional`: `true` if the file is optional.

Returns: The `IConfigurationBuilder`.

To be added.

## XmlConfigurationExtensions.AddXmlFile(IConfigurationBuilder, String, Boolean, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddXmlFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, string path, bool optional, bool reloadOnChange);
```

Adds the XML configuration provider at `path` to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `path`: Path relative to the base path stored in
`IConfigurationBuilder.Properties` of `builder`.
- `optional`: `true` if the file is optional.
- `reloadOnChange`: Whether the configuration should be reloaded if the file changes.

Returns: The `IConfigurationBuilder`.

To be added.

## XmlConfigurationExtensions.AddXmlFile(IConfigurationBuilder, IFileProvider, String, Boolean, Boolean) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddXmlFile (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, Microsoft.Extensions.FileProviders.IFileProvider? provider, string path, bool optional, bool reloadOnChange);
```

Adds an XML configuration source to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `provider`: The `IFileProvider` to use to access the file.
- `path`: Path relative to the base path stored in
`IConfigurationBuilder.Properties` of `builder`.
- `optional`: `true` if the file is optional.
- `reloadOnChange`: Whether the configuration should be reloaded if the file changes.

Returns: The `IConfigurationBuilder`.

To be added.

## XmlConfigurationExtensions.AddXmlStream(IConfigurationBuilder, Stream) method

```csharp
public static Microsoft.Extensions.Configuration.IConfigurationBuilder AddXmlStream (this Microsoft.Extensions.Configuration.IConfigurationBuilder builder, System.IO.Stream stream);
```

Adds an XML configuration source to `builder`.

Parameters:

- `builder`: The `IConfigurationBuilder` to add to.
- `stream`: The `Stream` to read the XML configuration data from.

Returns: The `IConfigurationBuilder`.

To be added.
