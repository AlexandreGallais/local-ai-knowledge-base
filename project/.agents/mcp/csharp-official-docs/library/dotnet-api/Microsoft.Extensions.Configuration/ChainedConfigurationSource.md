---
title: "ChainedConfigurationSource class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ChainedConfigurationSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ChainedConfigurationSource class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public class ChainedConfigurationSource : Microsoft.Extensions.Configuration.IConfigurationSource
```

Represents a chained `IConfiguration` as an `IConfigurationSource`.

To be added.

## ChainedConfigurationSource.ChainedConfigurationSource() constructor

```csharp
public ChainedConfigurationSource ();
```

Initializes a new instance of `ChainedConfigurationSource`.

To be added.

## ChainedConfigurationSource.Configuration property

```csharp
public Microsoft.Extensions.Configuration.IConfiguration? Configuration { get; set; }
```

Gets or sets the chained configuration.

Returns: To be added.

To be added.

## ChainedConfigurationSource.ShouldDisposeConfiguration property

```csharp
public bool ShouldDisposeConfiguration { get; set; }
```

Gets or sets a value that indicates whether the chained configuration
is disposed when the configuration provider is disposed.

Returns: To be added.

To be added.

## ChainedConfigurationSource.Build(IConfigurationBuilder) method

```csharp
public Microsoft.Extensions.Configuration.IConfigurationProvider Build (Microsoft.Extensions.Configuration.IConfigurationBuilder builder);
```

Builds the `ChainedConfigurationProvider` for this source.

Parameters:

- `builder`: The `IConfigurationBuilder`.

Returns: A `ChainedConfigurationProvider` instance.

To be added.
