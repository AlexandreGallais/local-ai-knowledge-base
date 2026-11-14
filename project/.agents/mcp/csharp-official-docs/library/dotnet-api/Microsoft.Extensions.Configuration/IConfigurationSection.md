---
title: "IConfigurationSection interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/IConfigurationSection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IConfigurationSection interface

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public interface IConfigurationSection : Microsoft.Extensions.Configuration.IConfiguration
```

Represents a section of application configuration values.

To be added.

## IConfigurationSection.Key <example-value>

```csharp
public string Key { get; }
```

Gets the key this section occupies in its parent.

Returns: To be added.

To be added.

## IConfigurationSection.Path property

```csharp
public string Path { get; }
```

Gets the full path to this section within the `IConfiguration`.

Returns: To be added.

To be added.

## IConfigurationSection.Value property

```csharp
public string? Value { get; set; }
```

Gets or sets the section value.

Returns: To be added.

To be added.
