---
title: "ProviderAliasAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/ProviderAliasAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProviderAliasAttribute class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public class ProviderAliasAttribute : Attribute
```

Defines an alias for `ILoggerProvider` implementation to be used in filtering rules.

By default, filtering rules are defined using the logging provider type's `Assembly.FullName` as configuration section name.

The `ProviderAliasAttribute` provides for specifying a second, additional, more concise and user-friendly configuration section name for specifying filter rules.

The logging provider type's `Assembly.FullName` can still be used as configuration section name when the `ProviderAliasAttribute` is specified for the provider, and its configuration section filtering rules have priority over the filtering rules specified for the alias.

## ProviderAliasAttribute.ProviderAliasAttribute(String) constructor

```csharp
public ProviderAliasAttribute (string alias);
```

Creates a new `ProviderAliasAttribute` instance.

Parameters:

- `alias`: The alias to set.

To be added.

## ProviderAliasAttribute.Alias property

```csharp
public string Alias { get; }
```

Gets the alias of the provider.

Returns: To be added.

To be added.
